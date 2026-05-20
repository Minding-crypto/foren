import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import {
  biasAuditRows,
  exampleArtifacts,
  exampleSteps,
  exampleSummary,
  proofChecks,
  reportPanels,
  wowFindings
} from "../../lib/site-data"

const rawReportExcerpt = [
  "MATCHED-PAIR DEMOGRAPHIC PROXY BIAS AUDIT",
  "Status     : POTENTIAL_DIFFERENTIAL_TREATMENT_FLAGGED",
  "Provider   : local / Qwen/Qwen2.5-0.5B-Instruct",
  "Metric     : exact_local_next_token_logit_margin",
  "Correction : Benjamini-Hochberg FDR across proxy groups (q=0.05)",
  "FLAG female_proxy mean_margin=+3.3378 delta=-0.4073 p_adj=0.035019"
]

export default function ExamplePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Complete example report"
        title="The kind of evidence normal AI logs cannot show."
        body="This is the investor-friendly version of a Veridion report: not just what the model answered, but the hidden pressure, the controlled flips, the internal intervention tests, and the exact boundary of what can be certified."
      >
        <div className="audit-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Run summary
          </p>
          <dl className="mt-4 grid gap-3 text-sm">
            <SummaryLine label="Model" value={exampleSummary.model} />
            <SummaryLine label="Provider" value={exampleSummary.provider} />
            <SummaryLine label="Output" value={exampleSummary.output} />
            <SummaryLine label="Metric" value={exampleSummary.decisionMetric} />
          </dl>
        </div>
      </PageHero>

      <Section
        eyebrow="The wow moment"
        title="The output looked fine. The internals were already warning you."
        body="Most AI monitoring stops at the visible answer. Veridion measures the pressure behind that answer and asks whether the claimed internal evidence actually controls the decision."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {wowFindings.map((finding) => (
            <article key={finding.label} className="grid min-h-[310px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {finding.label}
                </p>
                <p className="mt-3 font-display text-4xl font-semibold text-white">{finding.value}</p>
                <h3 className="mt-5 font-display text-xl font-semibold leading-tight text-white">
                  {finding.title}
                </h3>
              </div>
              <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">
                {finding.detail}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Before and after Veridion"
        title="The difference is not prettier dashboards. It is unavailable evidence."
        body="Ordinary logs capture the answer. Veridion creates a replayable decision evidence pack that exposes hidden margin shifts, internal signal locations, and whether those signals causally control the output."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {reportPanels.map((panel) => (
            <article key={panel.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-white">{panel.title}</h3>
                <StatusPill tone={panel.title.includes("Veridion") ? "success" : "warning"}>
                  {panel.verdict}
                </StatusPill>
              </div>
              <div className="mt-5 grid gap-3">
                {panel.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/15 p-3">
                    <span className={`h-2.5 w-2.5 rounded-full ${panel.title.includes("Veridion") ? "bg-[var(--accent)]" : "bg-[var(--warning)]"}`} />
                    <p className="text-sm font-medium text-white">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Prompt under test"
        title="The report starts with the exact decision context."
        body="This keeps the claim bounded. Veridion is not saying it explained every possible behavior of the model. It is explaining this decision under this tested setup."
      >
        <div className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">Prompt</p>
          <p className="mt-4 font-mono text-sm leading-7 text-white">{exampleSummary.prompt}</p>
        </div>
      </Section>

      <Section
        eyebrow="Report steps"
        title="The full audit is a sequence of tests, not one magic score."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {exampleSteps.map((step) => (
            <article key={step.name} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <h3 className="font-display text-2xl font-semibold leading-tight text-white">{step.name}</h3>
              <p className="mt-3 text-sm font-semibold text-[var(--accent)]">{step.output}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{step.why}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Decision certificate"
        title="The report turns model behavior into numbers a reviewer can inspect."
        body="These are the kinds of values that appear in a decision evidence pack."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {exampleArtifacts.map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} detail={item.note} />
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {proofChecks.map((check) => (
            <MetricCard
              key={check.title}
              label={check.title}
              value={check.value}
              detail={check.detail}
              tone={check.value.startsWith("-") ? "danger" : "success"}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Bias pressure example"
        title="This is the discovery ordinary output testing would miss."
        body="Same qualifications. Same prompt. Same final answer. But the decision pressure moved against a proxy group and survived FDR correction. That is the kind of artifact compliance teams, model-risk teams, and AI vendors can act on."
        surface
      >
        <div className="grid gap-3">
          {biasAuditRows.map((row) => (
            <article key={row.group} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold leading-tight text-white">{row.group}</h3>
                <StatusPill tone={row.verdict === "flag" ? "danger" : row.verdict === "watch" ? "warning" : "success"}>
                  {row.verdict}
                </StatusPill>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <MetricCard label="Margin delta" value={row.delta} detail="change from baseline" />
                <MetricCard label="FDR p-value" value={row.pAdjusted} detail="corrected statistical test" />
                <MetricCard label="Visible output" value={row.output} detail="final answer stayed constant" tone="success" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Raw-style artifact"
        title="The product should export a signed report, not just a dashboard."
        body="This excerpt is based on a real local report artifact generated in the workspace."
      >
        <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/35 p-5 font-mono text-xs leading-6 text-[var(--text-secondary)]">
          {rawReportExcerpt.join("\n")}
        </pre>
      </Section>
    </PageShell>
  )
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-t border-white/10 pt-3 sm:grid-cols-[92px_1fr]">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">{label}</dt>
      <dd className="font-mono text-sm leading-6 text-white">{value}</dd>
    </div>
  )
}
