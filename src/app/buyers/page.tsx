import { PageHero, PageShell, Section, UseCaseLine } from "../../components/site-shell"
import { agenticLayers, regulations, useCases } from "../../lib/site-data"

export default function BuyersPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Buyer urgency"
        title="AI decisions are becoming evidence problems."
        body="The customer does not buy philosophy. They buy a defensible artifact before deployment, after incidents, and during audits."
      >
        <div className="rounded-md border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            What Veridion sells
          </p>
          <p className="mt-3 text-xl font-semibold leading-8 text-white">
            A decision evidence pack: what changed, what mattered, where it appeared internally,
            and whether the behavior survived controlled tests.
          </p>
        </div>
      </PageHero>

      <Section
        eyebrow="Use cases"
        title="The first buyers are teams already forced to explain automated decisions."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item, index) => (
            <article key={item.title} className="grid min-h-[270px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
                  <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  <UseCaseLine label="Trigger" value={item.trigger} />
                  <UseCaseLine label="Artifact" value={item.artifact} />
                </div>
              </div>
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">Buyer</p>
                <p className="mt-2 text-sm font-medium leading-6 text-white">{item.buyer}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Agentic AI"
        title="Agents do not just answer. They choose, call tools, and act."
        body="Veridion can become the evidence layer around agent plans, tool calls, memory use, and policy gates."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2">
          {agenticLayers.map((layer) => (
            <article key={layer.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <h3 className="font-display text-2xl font-semibold text-white">{layer.title}</h3>
              <p className="mt-3 text-sm font-semibold text-[var(--accent)]">{layer.question}</p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{layer.evidence}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Regulatory pressure"
        title="These rules create the pain, even when they do not name Veridion."
        body="They create the buyer need: document, test, monitor, explain, and defend automated decisions."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {regulations.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                {item.region}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-white">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.need}</p>
            </a>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
