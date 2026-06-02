import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const url = process.env.URL ?? "http://localhost:3001";
const edgePath =
  process.env.EDGE_PATH ??
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

if (!existsSync(edgePath)) {
  throw new Error(`Edge executable not found: ${edgePath}`);
}

const qaDir = join(process.cwd(), "qa");
mkdirSync(qaDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: edgePath,
  headless: true,
});

async function checkViewport(name, width, height) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(qaDir, `${name}.png`), fullPage: false });

  const result = await page.evaluate(() => {
    const width = window.innerWidth;
    const doc = document.documentElement;
    const offenders = [];

    for (const element of Array.from(document.querySelectorAll("body *"))) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.left < -1 || rect.right > width + 1) {
        offenders.push({
          tag: element.tagName.toLowerCase(),
          className: String(element.getAttribute("class") ?? "").slice(0, 120),
          text: String(element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 120),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
        });
      }
      if (offenders.length >= 8) break;
    }

    return {
      innerWidth: width,
      clientWidth: doc.clientWidth,
      scrollWidth: doc.scrollWidth,
      offenders,
    };
  });

  const navIssues = [];
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(100);

  const headerState = await page.evaluate(() => {
    const header = document.querySelector("header");
    if (!header) return { present: false };

    const rect = header.getBoundingClientRect();
    const styles = window.getComputedStyle(header);
    return {
      present: true,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      height: Math.round(rect.height),
      position: styles.position,
      visible: rect.height > 0 && rect.bottom > 0 && rect.top <= 1,
    };
  });

  if (!headerState.present) {
    navIssues.push("header is missing");
  } else if (!headerState.visible) {
    navIssues.push(`header is not visible after scroll: ${JSON.stringify(headerState)}`);
  } else if (!["fixed", "sticky"].includes(headerState.position)) {
    navIssues.push(`header is not persistent: ${headerState.position}`);
  }

  if (width < 1024) {
    const menuButton = page.locator('button[aria-controls="mobile-navigation"]');
    if ((await menuButton.count()) === 0) {
      navIssues.push("mobile menu button is missing");
    } else if (!(await menuButton.first().isVisible())) {
      navIssues.push("mobile menu button is hidden");
    } else {
      await menuButton.first().click();
      const mobileMenu = page.locator("#mobile-navigation");
      if (!(await mobileMenu.isVisible())) {
        navIssues.push("mobile navigation panel did not open");
      }

      const visibleLinks = await page
        .locator("#mobile-navigation a:visible")
        .evaluateAll((links) => links.map((link) => link.textContent?.trim()));
      if (visibleLinks.length < 6) {
        navIssues.push(`mobile navigation exposes ${visibleLinks.length} links`);
      }

      const projectsLink = page.locator('#mobile-navigation a[href="#projects"]');
      if ((await projectsLink.count()) === 0) {
        navIssues.push("mobile Projects link is missing");
      } else {
        await projectsLink.first().click();
        await page.waitForTimeout(200);

        if (await mobileMenu.isVisible()) {
          navIssues.push("mobile navigation panel stays open after link click");
        }

        const anchorState = await page.evaluate(() => {
          const header = document.querySelector("header");
          const target = document.querySelector("#projects");
          if (!header || !target) return { present: false };

          const headerRect = header.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          return {
            present: true,
            headerBottom: Math.round(headerRect.bottom),
            targetTop: Math.round(targetRect.top),
          };
        });

        if (!anchorState.present) {
          navIssues.push("mobile Projects anchor target is missing");
        } else if (anchorState.targetTop < anchorState.headerBottom - 1) {
          navIssues.push(`mobile Projects anchor is hidden by header: ${JSON.stringify(anchorState)}`);
        }
      }
    }
  } else {
    const desktopLinks = await page
      .locator('nav[aria-label="Primary"] ul a:visible')
      .evaluateAll((links) => links.map((link) => link.textContent?.trim()));
    if (desktopLinks.length < 6) {
      navIssues.push(`desktop navigation exposes ${desktopLinks.length} links`);
    }
  }

  await context.close();
  return { name, ...result, navIssues };
}

const results = [
  await checkViewport("mobile-375-playwright", 375, 1400),
  await checkViewport("desktop-1440-playwright", 1440, 1400),
];

await browser.close();

let failed = false;
for (const result of results) {
  const overflow = result.scrollWidth - result.innerWidth;
  const line = `${result.name}: inner=${result.innerWidth} scroll=${result.scrollWidth} overflow=${overflow}`;
  if (overflow > 1 || result.offenders.length > 0 || result.navIssues.length > 0) {
    failed = true;
    console.error(`FAIL ${line}`);
    console.error(JSON.stringify({
      offenders: result.offenders,
      navIssues: result.navIssues,
    }, null, 2));
  } else {
    console.log(`PASS ${line}`);
  }
}

if (failed) {
  process.exit(1);
}
