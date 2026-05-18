import { PageHero, PageShell, Section, MetricCard, ProofGate, StatusPill } from "../../components/site-shell"
import { circuitNodes, mathLayers, proofChecks } from "../../lib/site-data"

export default function ProofPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Mechanistic proof workflow"
        title="From final answer to tested internal circuit."
        body="This page shows the actual mathematical layers Holmes uses before it allows a strong mechanistic claim."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <MetricCard label="Claim type" value="bounded" detail="valid for this model, prompt family, and decision metric" />
          <MetricCard label="Strongest gate" value="controls" detail="random circuits and wrong targets must fail" tone="warning" />
        </div>
      </PageHero>

      <Section
        eyebrow="Math stack"
        title="Every layer answers a simple buyer question."
        body="The technical methods matter, but the investor version is simple: can the report show what moved the answer, where it appeared inside the model, and whether intervention changes the decision?"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mathLayers.map((layer) => (
            <article key={layer.step} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <p className="font-mono text-sm text-[var(--accent)]">{layer.step}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-white">
                {layer.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{layer.plain}</p>
              <p className="mt-4 rounded-md border border-white/10 bg-black/20 p-3 font-mono text-xs leading-5 text-[var(--accent-2)]">
                {layer.technical}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Intervention proof"
        title="The circuit has to restore the decision and break the decision."
        body="A correlation-only explanation is not enough. Holmes tests the internal states by changing the model run itself."
        surface
      >
        <div className="grid gap-4 md:grid-cols-4">
          {proofChecks.map((check) => (
            <MetricCard
              key={check.title}
              label={check.title}
              value={check.value}
              detail={`${check.result}. ${check.detail}`}
              tone={check.value.startsWith("-") ? "danger" : "success"}
            />
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ProofGate title="Sufficiency" detail="Patch the selected clean states into the corrupted run. The original decision must come back." />
          <ProofGate title="Necessity" detail="Replace selected clean states with corrupted states. The original decision must collapse." />
          <ProofGate title="Minimality" detail="Remove each candidate node. A certified node must contribute measurable recovery." />
        </div>
      </Section>

      <Section
        eyebrow="Circuit nodes"
        title="The report names the internal sites that earned the certificate."
        body="A buyer should not see a mystical explanation. They should see layer, token, recovery, and pass/fail status."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {circuitNodes.map((node) => (
            <article key={node.site} className="grid min-h-[220px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">{node.site}</h3>
                  <StatusPill>{node.token}</StatusPill>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{node.meaning}</p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Recovery</p>
                <p className="mt-2 font-mono text-2xl font-semibold text-[var(--accent)]">{node.recovery}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
