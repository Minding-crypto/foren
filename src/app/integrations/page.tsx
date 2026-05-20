import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import { integrationTiles, releaseTimeline } from "../../lib/site-data"

const ciSnippet = `name: Veridion Gate
on: [pull_request]
jobs:
  ai-evidence:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Start Veridion audit
        run: veridion audit --policy veridion.policy.json --changed-files
      - name: Block unsafe release
        run: veridion gate --report latest --fail-on-review`

const apiSnippet = `POST /v1/audits
{
  "mode": "mechanistic_proof",
  "model": "Qwen/Qwen2.5-0.5B-Instruct",
  "prompt": "...",
  "proof_target": "deny"
}`

export default function IntegrationsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Workflow integration"
        title="Veridion should fit into the tools customers already use."
        body="The product does not need buyers to replace governance, MLOps, tracing, or ticketing systems. Veridion supplies the missing decision-forensics evidence and sends the result wherever their workflow already lives."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Integration promise
            </p>
            <StatusPill>no rip-and-replace</StatusPill>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-white">
            Keep the platform. Add the proof.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
            ValidMind, ModelOp, Monitaur, MLflow, LangSmith, and internal GRC tools can keep owning workflow.
            Veridion becomes the evidence engine behind the gate.
          </p>
        </div>
      </PageHero>

      <Section
        eyebrow="Integration map"
        title="Six plugs make Veridion operational without disrupting current teams."
        body="The first customers should not need a platform migration. They need an API, a CI gate, and exportable evidence."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {integrationTiles.map((tile) => (
            <article key={tile.name} className="grid min-h-[280px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <StatusPill tone="warning">{tile.type}</StatusPill>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{tile.name}</h3>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{tile.detail}</p>
              </div>
              <p className="mt-5 text-sm font-semibold leading-6 text-[var(--accent)]">
                Artifact: {tile.artifact}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Release flow"
        title="The customer keeps shipping the same way. Veridion adds an evidence gate."
        body="Cheap behavioral screens run first. Only risky, fragile, or high-impact open-weight decisions escalate to expensive white-box proof."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {releaseTimeline.map((item) => (
            <article key={item.step} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-black/20 font-mono text-sm text-[var(--accent)]">
                {item.step}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Developer surface"
        title="Two integration paths: command-line gate or API call."
        body="Start with a simple release check, then expand into an enterprise evidence registry as audit volume grows."
        surface
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              GitHub Actions style
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {ciSnippet}
            </pre>
          </article>
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Runner API style
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {apiSnippet}
            </pre>
          </article>
        </div>
      </Section>
    </PageShell>
  )
}
