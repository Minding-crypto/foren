import { PageHero, PageShell, Section } from "../../components/site-shell"
import { mathLayers, papers } from "../../lib/site-data"

export default function ResearchPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Research foundation"
        title="Built from circuits, sparse features, and proof-style tests."
        body="This page gives investors the vocabulary: Shapley and ablation for behavior, activation patching for mechanism, and negative controls for trust."
      >
        <div className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            Plain-English thesis
          </p>
          <p className="mt-3 text-xl font-semibold leading-8 text-white">
            Explanations are useful only when changing the claimed evidence changes the model decision.
          </p>
        </div>
      </PageHero>

      <Section
        eyebrow="Simple glossary"
        title="The terms investors will ask about."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mathLayers.map((layer) => (
            <article key={layer.step} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <h3 className="font-display text-2xl font-semibold leading-tight text-white">{layer.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{layer.plain}</p>
              <p className="mt-4 rounded-md border border-white/10 bg-black/20 p-3 font-mono text-xs leading-5 text-[var(--accent-2)]">
                {layer.technical}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Papers"
        title="The credible research story is much bigger than one method."
        body="The updated stack now includes recent work on Qwen sparse features, circuit tracing, causal abstraction, SAE benchmarks, code correctness, and agent security."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {papers.map((paper) => (
            <a
              key={paper.title}
              href={paper.link}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6 transition hover:border-[var(--accent-2)]/55"
            >
              <p className="font-mono text-sm text-[var(--accent-2)]">{paper.year}</p>
              <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-white">
                {paper.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{paper.why}</p>
            </a>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
