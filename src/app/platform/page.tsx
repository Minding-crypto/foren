import { PageHero, PageShell, Section, MetricCard, PositioningBanner, StatusPill } from "../../components/site-shell"
import {
  apiFlow,
  deploymentGateRules,
  integrationModes,
  mechanisticEvidenceStandard,
  platformModules,
  registryReports
} from "../../lib/site-data"

const sampleRequest = `{
  "mode": "mechanistic_proof",
  "provider": "local",
  "model": "Qwen/Qwen2.5-0.5B-Instruct",
  "decision_target": "deny",
  "prompt": "Fraud review rule: approve only when ..."
}`

const sampleResponse = `{
  "job_id": "audit_3f9b",
  "status": "completed",
  "grade": "MECHANISTICALLY_CERTIFIED",
  "report_url": "/reports/forensicai_fb62a5fe",
  "gate": "pass"
}`

export default function PlatformPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Product architecture"
        title="Holmes is a runner, registry, dashboard, and deployment gate."
        body="Run Holmes beside your model, keep sensitive data in your environment, generate signed evidence artifacts, and block risky AI releases before they ship."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Operating model
            </p>
            <StatusPill>on-prem ready</StatusPill>
          </div>
          <div className="mt-5 grid gap-3">
            <MetricCard label="1. Run" value="Local" detail="weights and prompts stay in the customer environment" />
            <MetricCard label="2. Certify" value="Gate" detail="proof, controls, bias, and regression checks decide pass/fail" />
            <MetricCard label="3. Store" value="Registry" detail="signed evidence is indexed for audit and incident response" />
          </div>
        </div>
      </PageHero>

      <PositioningBanner />

      <Section
        eyebrow="Core modules"
        title="The product is not a report generator. It is an evidence system."
        body="Each module maps to a buyer workflow: run the audit, preserve the artifact, compare versions, and decide whether a deployment is allowed."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2">
          {platformModules.map((module) => (
            <article key={module.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                    {module.stage}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">{module.title}</h3>
                </div>
                <StatusPill tone="success">module</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{module.summary}</p>
              <div className="mt-5 grid gap-2">
                {module.outputs.map((output) => (
                  <div key={output} className="rounded-md border border-white/10 bg-black/15 px-3 py-2 text-sm text-white">
                    {output}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="How customers plug in"
        title="Three integration modes cover startup APIs and locked-down enterprises."
        body="A customer can call Holmes like an API, run it inside their release pipeline, or keep it fully on-prem beside their open-weight model."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {integrationModes.map((mode) => (
            <article key={mode.name} className="grid min-h-[320px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{mode.name}</h3>
                <p className="mt-3 rounded-md border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-[var(--accent)]">
                  {mode.command}
                </p>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{mode.detail}</p>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                {mode.bestFor}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Certification standard"
        title="Mechanistic evidence certification means every internal claim has to pass gates."
        body="Holmes does not certify a model forever. It certifies a bounded evidence claim for a specific model checkpoint, prompt or contrast family, target decision, and decision-margin metric."
      >
        <div className="grid gap-3">
          {mechanisticEvidenceStandard.map((item, index) => (
            <article key={item.gate} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid gap-4 md:grid-cols-[64px_minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-black/20 font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{item.gate}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.plain}</p>
                </div>
                <p className="rounded-md border border-white/10 bg-black/20 p-3 font-mono text-xs leading-6 text-[var(--accent)]">
                  {item.technical}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Runner API"
        title="The local runner wraps the private analyzer without exposing model weights."
        body="The control plane sends an audit request. The customer's runner executes Holmes locally, stores artifacts locally or in their bucket, and returns only the certificate metadata they choose to share."
        surface
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Request
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {sampleRequest}
            </pre>
          </article>
          <article className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Response
            </p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
              {sampleResponse}
            </pre>
          </article>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {apiFlow.map((item) => (
            <article key={`${item.method}-${item.endpoint}`} className="rounded-md border border-white/10 bg-black/15 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone={item.method === "POST" ? "warning" : "success"}>{item.method}</StatusPill>
                <p className="font-mono text-sm text-white">{item.endpoint}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.purpose}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Report registry"
        title="Every audit becomes an indexed evidence artifact."
        body="The report registry is what makes Holmes operational: audit history, comparison, incident reconstruction, and board-ready evidence packets."
      >
        <div className="grid gap-3">
          {registryReports.map((report) => (
            <article key={report.id} className="min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,auto)] lg:items-center">
                <div className="min-w-0">
                  <p className="break-words font-mono text-xs text-[var(--text-muted)]">{report.id}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-white">{report.domain}</h3>
                  <p className="mt-2 break-words text-sm text-[var(--text-secondary)]">{report.model}</p>
                </div>
                <MetricCard label="Output" value={report.output} detail={report.margin} />
                <MetricCard label="Proof" value={report.proof} detail={`controls: ${report.controls}`} tone="success" />
                <StatusPill tone={report.grade.includes("CERTIFIED") ? "success" : "warning"}>{report.grade}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Deployment gate"
        title="Holmes becomes the pass/fail layer before a model goes live."
        body="This is how it becomes a product companies renew: every model update, prompt change, RAG refresh, or policy edit must pass evidence gates."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2">
          {deploymentGateRules.map((rule) => (
            <article key={rule.rule} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-white">{rule.rule}</h3>
                <StatusPill tone="warning">blocking</StatusPill>
              </div>
              <p className="mt-4 font-mono text-xs leading-6 text-[var(--accent)]">{rule.threshold}</p>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{rule.failure}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
