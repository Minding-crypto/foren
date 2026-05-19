import { PageHero, PageShell, Section, StatusPill } from "../../components/site-shell"
import { apiFlow, customerWorkflow, productPackages, runnerCommands } from "../../lib/site-data"

const mechanisticRequest = `{
  "mode": "mechanistic_proof",
  "provider": "local",
  "model": "Qwen/Qwen2.5-0.5B-Instruct",
  "decision_target": "deny",
  "proof_top_k": 48,
  "proof_max_nodes": 16,
  "negative_controls": 24,
  "prompt": "Fraud review rule: DENY if chargeback_risk=high ..."
}`

const gateRequest = `{
  "report_id": "mechanistic_proof_437bb845",
  "policy": {
    "require_mechanistic_proof": true,
    "require_negative_controls": true,
    "max_negative_control_p": 0.05
  }
}`

export default function DocsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Product docs"
        title="From one local command to a signed decision-evidence artifact."
        body="This is the buyer and developer path: run Holmes beside the customer's model, create bounded certificates, store the artifacts, and let policy gates decide what can ship."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Customer path
            </p>
            <StatusPill>private runner</StatusPill>
          </div>
          <div className="mt-5 grid gap-3">
            {["Run local", "Generate evidence", "Gate release"].map((item, index) => (
              <div key={item} className="rounded-md border border-white/10 bg-black/15 p-4">
                <p className="font-mono text-xs text-[var(--accent)]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">{item}</h2>
              </div>
            ))}
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Workflow"
        title="How a customer actually uses Holmes."
        body="The first sellable version is a private evidence pack for their high-risk prompt suite. The platform version turns that same evidence into a registry and release gate."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {customerWorkflow.map((item) => (
            <article key={item.step} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-black/20 font-mono text-sm text-[var(--accent)]">
                {item.step}
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Commands"
        title="The local developer surface is intentionally small."
        body="Customers can start with the local runner and one policy file. The private analyzer stays on their machine; the website and control plane consume only certificate metadata."
      >
        <div className="grid gap-3">
          {runnerCommands.map((item) => (
            <article key={item.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-center">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
                </div>
                <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/30 p-3 font-mono text-xs leading-6 text-[var(--accent)]">
                  {item.command}
                </pre>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="API"
        title="The API is a runner control surface, not a model-hosting service."
        body="Holmes should sit beside the model. The API starts jobs, lists artifacts, evaluates release gates, and returns bounded certificate objects."
        surface
      >
        <div className="grid gap-3 md:grid-cols-2">
          {apiFlow.map((item) => (
            <article key={`${item.method}-${item.endpoint}`} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone={item.method === "POST" ? "warning" : "success"}>{item.method}</StatusPill>
                <p className="font-mono text-sm text-white">{item.endpoint}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.purpose}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Audit request
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {mechanisticRequest}
            </pre>
          </article>
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Gate request
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {gateRequest}
            </pre>
          </article>
        </div>
      </Section>

      <Section
        eyebrow="Commercial packaging"
        title="The final product has three sellable tiers."
        body="This keeps the wedge sharp: start with private evidence packs, expand into a team registry, and then sell enterprise-grade private deployment."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {productPackages.map((pkg) => (
            <article key={pkg.name} className="grid min-h-[390px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <StatusPill tone="warning">{pkg.price}</StatusPill>
                <h3 className="mt-4 font-display text-3xl font-semibold text-white">{pkg.name}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[var(--accent)]">{pkg.buyer}</p>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{pkg.promise}</p>
              </div>
              <div className="mt-6 grid gap-2">
                {pkg.includes.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/15 px-3 py-2 text-sm text-white">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Evidence schema"
        title="Every certificate should be machine-readable and customer-verifiable."
        body="The current product schema lives at schemas/holmes-evidence-v0.1.schema.json and describes the stable fields buyers can depend on: scope, decision metric, gate outcomes, policy result, and artifact hash."
        surface
      >
        <div className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
          <p className="font-mono text-sm text-[var(--accent)]">schemas/holmes-evidence-v0.1.schema.json</p>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--text-secondary)]">
            This is deliberately separate from the private analyzer. Customers receive a stable evidence object.
            Holmes can improve the math internally without breaking downstream governance workflows.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
