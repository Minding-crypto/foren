import { MetricCard, PageHero, PageShell, Section, StatusPill } from "../../components/site-shell"
import { insightCapabilities, insightCommands, insightDemoCards } from "../../lib/site-data"

export default function InsightsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Evidence intelligence"
        title="The math becomes a release decision, a risk story, and a fix list."
        body="Certificates impress technical reviewers. Evidence Intelligence is what makes buyers act: what Veridion knows, what it refuses to claim, what can ship, and what must be fixed before production."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Buyer answer
            </p>
            <StatusPill>actionable output</StatusPill>
          </div>
          <div className="mt-5 grid gap-3">
            <MetricCard label="Ship decision" value="allow / review / block" detail="no raw-math interpretation needed" />
            <MetricCard label="Risk story" value="hidden failures" detail="what a normal model dashboard missed" tone="warning" />
            <MetricCard label="Fix list" value="next gates" detail="what to change before rerunning" />
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="What Veridion can know"
        title="The useful output is not just why. It is what to do next."
        body="This is the product layer that turns interpretability into operations: deployment decisions, claim boundaries, hidden risk, and remediation."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {insightCapabilities.map((item) => (
            <article key={item.title} className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.buyerQuestion}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.answer}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Demo outputs"
        title="Same system, three buyer-ready stories."
        body="The insight layer works whether the report is a passing black-box behavioral packet, a weak black-box packet, or an open-weight mechanistic proof attempt."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {insightDemoCards.map((card) => (
            <article key={card.label} className="grid min-h-[430px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {card.label}
                  </p>
                  <StatusPill tone={card.status.includes("ALLOW") || card.status.includes("CERTIFY") ? "success" : "warning"}>
                    {card.status}
                  </StatusPill>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-white">{card.headline}</h3>
                <div className="mt-5 grid gap-2">
                  {card.details.map((detail) => (
                    <p key={detail} className="rounded-md border border-white/10 bg-black/15 p-3 text-sm leading-6 text-[var(--text-secondary)]">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
              <p className="mt-5 rounded-md border border-white/10 bg-black/20 p-3 text-sm leading-6 text-[var(--accent)]">
                Next: {card.action}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Commands"
        title="Run the insight layer from the same local runner."
        body="This is the command-line path for tomorrow's demo. One command shows a passing behavioral gate; the other shows honest refusal with the exact missing evidence."
        surface
      >
        <div className="grid gap-3">
          {insightCommands.map((item) => (
            <article key={item.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-center">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.result}</p>
                </div>
                <pre className="overflow-x-auto rounded-md border border-white/10 bg-black/30 p-3 font-mono text-xs leading-6 text-[var(--accent)]">
                  {item.command}
                </pre>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
