import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import { negativeControls, trustBenchmarks } from "../../lib/site-data"

export default function TrustPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Validation and trust"
        title="Every certificate is backed by validation, controls, and conservative failure states."
        body="Holmes measures known-rule accuracy, proof yield, false-positive controls, and review outcomes before it allows a strong mechanistic claim."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricCard label="Latest smoke run" value="1/1" detail="decision accuracy on a tiny benchmark case" tone="success" />
          <MetricCard label="Certificate" value="review" detail="the suite refused to certify when controls failed" tone="warning" />
        </div>
      </PageHero>

      <Section
        eyebrow="Benchmark suite"
        title="Accuracy is reported as measured performance."
        body="Known-rule prompts, expected outputs, proof yield, and failure cases are reported as measurable validation results."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {trustBenchmarks.map((item) => (
            <article key={item.name} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.result}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">
                {item.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Negative controls"
        title="No negative-control pass, no causal circuit certificate."
        body="This is the core trust rule. If random internal nodes can pass the same proof, Holmes must reject the certificate."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {negativeControls.map((control) => (
            <article key={control.check} className="grid min-h-[250px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div>
                <StatusPill tone="danger">negative control</StatusPill>
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-white">
                  {control.check}
                </h3>
              </div>
              <div>
                <p className="text-sm font-semibold leading-6 text-[var(--accent)]">
                  Pass condition: {control.pass}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  {control.reason}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Conservative output"
        title="A failed proof is still a useful product result."
        body="If a model does not expose a stable causal circuit, the certificate should say review. That protects customer trust more than overclaiming."
      >
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Decision accuracy" value="PASS" detail="the model produced the expected benchmark answer" tone="success" />
          <MetricCard label="Circuit proof" value="FAIL" detail="not enough evidence for a necessary and sufficient circuit" tone="danger" />
          <MetricCard label="Negative controls" value="FAIL" detail="selected nodes did not beat random controls" tone="danger" />
          <MetricCard label="Final status" value="REVIEW" detail="the system refused a fake proof" tone="warning" />
        </div>
      </Section>
    </PageShell>
  )
}
