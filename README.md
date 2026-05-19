# Holmes

Investor landing page for Holmes, the proof layer for AI agents.

Holmes explains AI-agent and open-weight model decisions with bounded evidence:
decision margins, controlled ablations, activation patching, circuit tests,
and cryptographically replayable audit artifacts.

## Product Shape

Holmes is intended to be more than a public website:

- **Website** - investor and buyer-facing explanation.
- **Local runner API** - optional on-prem service that wraps the private analyzer
  without moving model weights or regulated prompts out of the customer's
  environment.
- **Report registry** - indexed evidence artifacts for audits, incidents, and
  model-version comparisons.
- **Deployment gate** - CI/CD pass-fail checks for proof status, negative
  controls, bias pressure, and regression drift.
- **Enterprise readiness layer** - self-serve runner, procurement packet,
  bank/VPC deployment path, third-party validation workflow, and black-box
  behavioral coverage with explicit claim boundaries.
- **Mechanistic evidence certificate** - a bounded certificate for one model
  checkpoint, prompt or contrast family, target decision, and decision-margin
  metric. It is not a global certificate for all model behavior.

The private analyzer itself is intentionally not committed to this repository.
Local runner files under `backend/` are also ignored by git unless deliberately
packaged elsewhere.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Product Docs

The public repository contains the buyer-facing website, sample evidence schema,
example request payloads, policy examples, benchmark summary assets, and
deployment pages.

The private analyzer and local runner implementation are intentionally not
published here. The website describes the intended product surface without
exposing the engine that generates certificates.

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
- `src/app/platform/page.tsx` - the product architecture, API, report registry,
  and deployment-gate page.
- `src/app/docs/page.tsx` - product docs, API examples, workflow, and
  packaging.
- `src/app/dashboard/page.tsx` - dashboard-style report registry and release
  queue.
- `src/app/integrations/page.tsx` - CI/CD, governance, agent-trace, and storage
  integration story.
- `src/app/enterprise/page.tsx` - self-serve SaaS, SOC 2 readiness, regulated
  bank deployment, third-party validation, and black-box coverage path.
- `src/app/policy/page.tsx` - policy-as-code release gates.
- `src/app/benchmark/page.tsx` - benchmark validation and negative-control
  suite.
- `src/app/globals.css` - global styling and theme tokens.
- `src/app/layout.tsx` - metadata and root layout.
- `holmes.policy.example.json` - example customer release policy.
- `examples/holmes-gate.github-actions.yml` - example CI deployment gate.
- `examples/audit-request.*.json` - sample runner audit requests.
- `examples/gate-request.json` - sample deployment-gate request.
- `schemas/holmes-evidence-v0.1.schema.json` - stable evidence artifact schema.
- `security/*.md` - procurement, bank deployment, legal-claim, third-party
  validation, and black-box coverage scaffolds.
- `public/one-pagers/*.pdf` - buyer one-pagers for agent safety, hiring bias
  pressure, and open-weight mechanistic certification.
- `.github/workflows/deploy-pages.yml` - static GitHub Pages deployment.

Backend analyzers, reports, private keys, caches, and local experiment artifacts
are excluded from git.
