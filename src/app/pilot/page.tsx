import Link from "next/link"

import { MetricCard, PageHero, PageShell, Section, StatusPill } from "../../components/site-shell"
import {
  pilotAcceptanceCriteria,
  pilotDeliverables,
  pilotIdealCustomers,
  pilotOutcomes,
  productPackages,
  runnerCommands,
  salesProofPoints
} from "../../lib/site-data"

export default function PilotPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Paid pilot program"
        title="Turn one customer model into a decision-evidence packet in seven days."
        body="The fastest commercial path is simple: run Veridion beside a customer's existing model, test one high-risk prompt family, and deliver a bounded certificate packet their team can use for release, audit, sales, or incident review."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Pilot output
            </p>
            <StatusPill>sellable packet</StatusPill>
          </div>
          <div className="mt-5 grid gap-3">
            {pilotOutcomes.map((item) => (
              <MetricCard key={item.label} label={item.label} value={item.value} detail={item.detail} />
            ))}
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Pilot deliverables"
        title="What the customer actually receives."
        body="A paid pilot should feel like infrastructure from day one: private runner, real prompt suite, certificate attempts, hidden-risk screens, and a release decision."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pilotDeliverables.map((item) => (
            <article key={item.title} className="interactive-card grid min-h-[285px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
              </div>
              <p className="mt-5 rounded-md border border-white/10 bg-black/15 p-3 text-sm leading-6 text-[var(--accent)]">
                Proof: {item.proof}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Who buys first"
        title="The best first customers have local models, high-risk decisions, and something to prove."
        body="Veridion should not start as a broad compliance suite. It should start where the proof is sharp and painful enough to pay for."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {pilotIdealCustomers.map((item) => (
            <article key={item.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <h3 className="font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              <div className="mt-5 grid gap-3">
                <div className="rounded-md border border-white/10 bg-black/15 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Pain
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.pain}</p>
                </div>
                <div className="rounded-md border border-white/10 bg-black/15 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Veridion close
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white">{item.close}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Acceptance criteria"
        title="The pilot only counts if the evidence is usable."
        body="This gives buyers confidence and protects Veridion from overclaiming. A weak result is still valuable if it clearly says review or not certifiable."
        surface
      >
        <div className="grid gap-3">
          {pilotAcceptanceCriteria.map((item, index) => (
            <article key={item.gate} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid gap-4 md:grid-cols-[64px_minmax(0,0.6fr)_minmax(0,1.4fr)] md:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-black/20 font-mono text-sm text-[var(--accent)]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-semibold text-white">{item.gate}</h3>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{item.threshold}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Sales proof"
        title="The investor and buyer message is sharp."
        body="Veridion is the evidence layer for AI decisions: not a transcript, not a generic policy checklist, and not an unbounded claim that every model behavior is fully explained."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {salesProofPoints.map((point) => (
            <article key={point.claim} className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <h3 className="font-display text-xl font-semibold leading-tight text-white">{point.claim}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{point.evidence}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Commercial packages"
        title="Start narrow, then expand into the customer's release workflow."
        body="The pricing path should match the buyer's maturity: local proof pack, team release gate, then enterprise private deployment."
        surface
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {productPackages.map((pkg) => (
            <article key={pkg.name} className="grid min-h-[390px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <StatusPill tone="warning">{pkg.price}</StatusPill>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-white">{pkg.name}</h3>
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
        eyebrow="Start command"
        title="The first pilot can be run from the local runner."
        body="These are the commands a technical customer needs for the first private run. The analyzer stays local; the product consumes certificate metadata and artifacts."
      >
        <div className="grid gap-3">
          {runnerCommands.slice(0, 5).map((item) => (
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
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[var(--accent-hover)]"
          >
            Open implementation docs
          </Link>
          <Link
            href="/example"
            className="rounded-md border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.04]"
          >
            View sample certificate
          </Link>
        </div>
      </Section>
    </PageShell>
  )
}
