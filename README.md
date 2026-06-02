# HNG14 Stage 8b Backend Portfolio

Focused portfolio page for Kelechi Uba's HNG14 backend work. It is built for a 3-5 minute review: profile, HNG projects, backend skills, one featured deep-dive, reflection, and contact.

## Stack

- Next.js 16 static export
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react icons
- Vercel-ready static output in `out/`

The visual system reuses the existing `Kaycee-dev/portfolio` stack and tokens: dark navy background, amber accent, blue highlight, Syne-style display type, Geist-style body type, and IBM Plex Mono-style technical labels.

## Run Locally

```bash
npm install
npm run dev
```

Local dev server defaults to `http://localhost:3001`.

## Build And Verify

```bash
npm run build
npm run lint
npm audit --omit=dev
npm run ship-check
```

`npm run ship-check` checks required sections, deep-dive parts, claim markers, buzzwords, secrets, anchors, live links, missing images, and visible read-time.

## Source And Output

- Source repo: `https://github.com/Kaycee-dev/hng14_backend_stage8b-porfolio`
- Live URL: filled after deployment

