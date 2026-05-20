import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import latestBenchmarkRun from "../../lib/latest-benchmark-run.json"
import { benchmarkSuites, negativeControls, trustBenchmarks } from "../../lib/site-data"

export default function BenchmarkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Benchmark validation"
        title="The fastest way to earn trust is to show when Veridion refuses to certify."
        body="A real certification product needs validation data: known-rule accuracy, proof yield, false-positive controls, bias-pressure detection, prompt-boundary discovery, and model-update regression."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Validation snapshot
            </p>
            <StatusPill>benchmark mode</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Known-rule cases" value="6" detail="seed benchmark families" tone="success" />
            <MetricCard label="False-proof gates" value="4" detail="controls that must fail" tone="warning" />
            <MetricCard label="Escalation path" value="tiered" detail="cheap screen before white-box proof" />
            <MetricCard label="Output" value="evidence" detail="not vibes, not generic docs" tone="success" />
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Latest run"
        title="Published benchmark result"
        body="The benchmark summary reports three numbers buyers care about: certified rule-aligned cases, model rule violations, and cases where Veridion withheld certification instead of overclaiming."
      >
        <div className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-[var(--text-muted)]">{latestBenchmarkRun.runId}</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">{latestBenchmarkRun.model}</h3>
            </div>
            <StatusPill tone={latestBenchmarkRun.status === "RUNNING" ? "warning" : "success"}>
              {latestBenchmarkRun.status}
            </StatusPill>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <MetricCard label="Cases" value={`${latestBenchmarkRun.casesCompleted}/${latestBenchmarkRun.casesRequested}`} detail="completed out of requested" />
            <MetricCard label="Certified" value={String(latestBenchmarkRun.certifiedAndAligned)} detail="rule-aligned with mechanistic proof" tone="success" />
            <MetricCard label="Model alerts" value={String(latestBenchmarkRun.ruleViolations)} detail="model violated the declared rule" tone="danger" />
            <MetricCard label="Withheld" value={String(latestBenchmarkRun.certificationWithheld)} detail="Veridion declined to overclaim proof" tone="warning" />
            <MetricCard label="Certified" value={String(latestBenchmarkRun.certified)} detail="mechanistic circuits allowed" tone="success" />
          </div>
          <p className="mt-6 max-w-4xl text-sm leading-6 text-[var(--text-secondary)]">
            {latestBenchmarkRun.summary}
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {latestBenchmarkRun.examples.map((example) => (
              <article key={`${example.caseId}-${example.type}`} className="rounded-md border border-white/10 bg-black/15 p-4">
                <p className="font-mono text-xs text-[var(--text-muted)]">{example.caseId}</p>
                <h4 className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--accent)]">
                  {example.type}
                </h4>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{example.finding}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Benchmark suites"
        title="Trust comes from measured performance and honest refusals."
        body="The benchmark suite turns certification into a measured product discipline. Every claim has a test family, metric, and known failure mode."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {benchmarkSuites.map((suite) => (
            <article key={suite.suite} className="grid min-h-[300px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <StatusPill tone="warning">{suite.metric}</StatusPill>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{suite.suite}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{suite.coverage}</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-[var(--accent)]">{suite.why}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Trust metrics"
        title="The benchmark reports certified cases, withheld claims, and false-positive controls."
        body="Certification rate, false-positive controls, and conservative claim-withholding behavior are part of the evidence record."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {trustBenchmarks.map((item) => (
            <article key={item.name} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.result}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Controls"
        title="The benchmark must prove Veridion catches fake explanations."
        body="Negative controls are the credibility moat. If random internal states pass the proof gate, the certificate must be rejected."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {negativeControls.map((control) => (
            <article key={control.check} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <StatusPill tone="danger">must reject</StatusPill>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-white">{control.check}</h3>
              <p className="mt-4 text-sm font-semibold leading-6 text-[var(--accent)]">{control.pass}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{control.reason}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
