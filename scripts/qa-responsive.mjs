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

  await context.close();
  return { name, ...result };
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
  if (overflow > 1 || result.offenders.length > 0) {
    failed = true;
    console.error(`FAIL ${line}`);
    console.error(JSON.stringify(result.offenders, null, 2));
  } else {
    console.log(`PASS ${line}`);
  }
}

if (failed) {
  process.exit(1);
}
