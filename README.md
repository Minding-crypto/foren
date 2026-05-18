# Holmes

Investor landing page for Holmes, the proof layer for AI agents.

Holmes explains AI-agent and open-weight model decisions with bounded evidence:
decision margins, controlled ablations, activation patching, circuit tests,
and cryptographically replayable audit artifacts.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## GitHub Pages Deployment

This repo deploys through GitHub Actions.

1. Open the repository settings on GitHub.
2. Go to **Pages**.
3. Set **Source** to **GitHub Actions**.
4. Run the **Deploy Holmes landing page** workflow, or push to `main`.

The public URL will be:

`https://minding-crypto.github.io/foren/`

## Project Structure

- `src/app/page.tsx` - the Holmes landing page content.
- `src/app/globals.css` - global styling and theme tokens.
- `src/app/layout.tsx` - metadata and root layout.
- `.github/workflows/deploy-pages.yml` - static GitHub Pages deployment.

This repository is intentionally frontend-only. Backend analyzers, reports,
private keys, caches, and local experiment artifacts are excluded.
