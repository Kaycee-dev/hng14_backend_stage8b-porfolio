# HNG14 Stage 8b Backend Portfolio

Static portfolio page for Kelechi Uba's HNG14 Stage 8b backend submission. The page is built for a 3-5 minute review of profile, HNG projects, backend skills, one featured deep-dive, reflection, and contact.

## Links

- Live site: https://kaycee-dev.github.io/hng14_backend_stage8b-porfolio/
- Source repo: https://github.com/Kaycee-dev/hng14_backend_stage8b-porfolio

## Stack

- Next.js 16 static export
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react icons
- GitHub Pages deployment from the exported `out/` directory

The visual system follows the existing Kaycee-dev portfolio direction: dark navy background, amber accent, blue highlight, display/body/mono type roles, restrained cards, and dense reviewer-focused sections.

## Run Locally

```bash
npm install
npm run dev
```

The local dev server defaults to `http://localhost:3001`.

## Verify

```bash
npm run lint
npm run build
npm audit --omit=dev
npm run ship-check
```

Responsive browser QA uses Microsoft Edge through Playwright Core. Run it against the local dev server or set `URL` to the live page:

```bash
npm run qa:responsive
```

The responsive QA checks mobile and desktop width, horizontal overflow, persistent navbar visibility after scroll, mobile hamburger availability, mobile menu open/close behavior, and fixed-header anchor offsets.

## Deploy

GitHub Pages serves this as a project page, so production exports need the repository base path:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/hng14_backend_stage8b-porfolio'
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

Publish the resulting `out/` contents to the `gh-pages` branch.
