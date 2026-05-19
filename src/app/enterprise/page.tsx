import Link from "next/link"

import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import { enterpriseControls, enterpriseRollout, enterpriseTracks, onePagers } from "../../lib/site-data"

export default function EnterprisePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Enterprise readiness"
        title="From investor demo to deployable evidence infrastructure."
        body="Holmes can start as a self-serve runner and grow into the evidence layer for procurement, model-risk review, policy gates, and third-party validation."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Buyer path
            </p>
            <StatusPill tone="warning">bounded claims</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Self-serve" value="API + runner" detail="start audits without moving model weights" />
            <MetricCard label="Procurement" value="SOC 2 path" detail="controls, logs, data flow, and vendor packet" />
            <MetricCard label="Bank fit" value="VPC" detail="private deployment beside approved models" />
            <MetricCard label="Legal claims" value="validated" detail="third-party protocol before legal-grade use" tone="warning" />
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Product tracks"
        title="Five enterprise layers, each with a clear claim boundary."
        body="The strongest product is not one that overclaims. It is one that tells buyers exactly what is certified, what is only screened, and what requires outside validation."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {enterpriseTracks.map((track) => (
            <article key={track.title} className="grid min-h-[310px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div>
                <StatusPill tone={track.status.includes("required") ? "danger" : track.status.includes("readiness") ? "warning" : "success"}>
                  {track.status}
                </StatusPill>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{track.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{track.detail}</p>
              </div>
              <p className="mt-5 rounded-md border border-white/10 bg-black/15 p-3 text-sm leading-6 text-[var(--accent)]">
                Artifact: {track.artifact}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Procurement controls"
        title="What a security, legal, or bank reviewer expects to see."
        body="These are the controls Holmes should expose in a customer packet before claiming enterprise readiness."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {enterpriseControls.map((item) => (
            <article key={item.control} className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <h3 className="font-display text-xl font-semibold text-white">{item.control}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.evidence}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Rollout"
        title="The go-to-market path is pilot, gate, packet, validation."
        body="This keeps the first sale realistic while still pointing toward regulated production."
        surface
      >
        <div className="grid gap-4 md:grid-cols-4">
          {enterpriseRollout.map((phase) => (
            <article key={phase.phase} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                {phase.phase}
              </p>
              <h3 className="mt-4 font-display text-xl font-semibold leading-tight text-white">{phase.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{phase.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="One-page PDFs"
        title="Three buyer briefs for demos and follow-up emails."
        body="Each PDF is short enough for a founder call but precise enough to show the product surface, artifact, and mathematical boundary."
      >
        <div id="one-pagers" className="grid gap-4 md:grid-cols-3">
          {onePagers.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-6"
            >
              <StatusPill tone="success">PDF</StatusPill>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{item.detail}</p>
              <p className="mt-5 text-sm font-semibold text-[var(--accent)]">Open one-pager</p>
            </Link>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
