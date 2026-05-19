import Link from "next/link"

import { PageHero, PageShell, Section, MetricCard, PositioningBanner, StatusPill } from "../components/site-shell"
import { biasAuditRows, certificateGates, exampleArtifacts } from "../lib/site-data"

const productPages = [
  {
    href: "/platform",
    title: "Product architecture",
    detail:
      "Deploy a local runner, report registry, release gate, and dashboard inside your existing AI workflow.",
    cta: "Open platform view"
  },
  {
    href: "/dashboard",
    title: "Governance dashboard",
    detail:
      "See the report registry, release queue, blocked deployments, proxy alerts, and searchable certificate artifacts.",
    cta: "Open dashboard"
  },
  {
    href: "/integrations",
    title: "Workflow integrations",
    detail:
      "Connect Holmes to CI/CD, model registries, agent traces, governance platforms, and review tickets.",
    cta: "Open integrations"
  },
  {
    href: "/policy",
    title: "Policy as code",
    detail:
      "Turn evidence standards into enforceable release rules that block weak proofs, bias pressure, and drift.",
    cta: "Open policy gates"
  },
  {
    href: "/benchmark",
    title: "Benchmark validation",
    detail:
      "Validate certificates with known-rule tests, proof yield, false-positive controls, and regression suites.",
    cta: "Open benchmark suite"
  },
  {
    href: "/proof",
    title: "Mechanistic proof workflow",
    detail:
      "See the exact layers of the math: decision margins, ablations, layer timing, activation patching, and circuit gates.",
    cta: "Open proof workflow"
  },
  {
    href: "/example",
    title: "Complete example report",
    detail:
      "Walk through a prompt, model, result, intervention steps, bias screen, and the final certificate boundary.",
    cta: "View example report"
  },
  {
    href: "/trust",
    title: "Validation and controls",
    detail:
      "Review the benchmark suites, random controls, and false-positive gates behind every certificate.",
    cta: "See validation suite"
  }
]

export default function Home() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Mechanistic evidence for AI decisions"
        title="Show why the model decided."
        body="Holmes turns an open-weight model decision into evidence: what information mattered, where the model represented it inside, and whether changing those internal signals changes the decision."
      >
        <div className="audit-surface">
          <div className="border-b border-white/10 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Proof example
              </p>
              <StatusPill>working artifact</StatusPill>
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
              Same answer. Different internal pressure.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
              Output-only testing says HIRE. Holmes shows the hidden margin moved against a protected proxy.
            </p>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-3">
            <MetricCard label="Visible output" value="HIRE" detail="same final answer" tone="success" />
            <MetricCard label="Hidden shift" value="-0.407" detail="female-name proxy margin delta" tone="danger" />
            <MetricCard label="Corrected test" value="0.035" detail="FDR-adjusted p-value" tone="warning" />
          </div>
        </div>
      </PageHero>

      <PositioningBanner />

      <Section
        eyebrow="Product modules"
        title="Decision forensics that fits into the AI stack you already use."
        body="Start with a local runner and API. Add release gates, evidence storage, bias-pressure monitoring, regression tests, and mechanistic certificates where the risk is highest."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {productPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="grid min-h-[260px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight text-white">
                  {page.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                  {page.detail}
                </p>
              </div>
              <p className="mt-6 text-sm font-semibold text-[var(--accent)]">{page.cta}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Example artifact"
        title="A concrete report, not a vague explanation."
        body="For a model decision, Holmes can show the prompt, model, visible output, decision score, intervention tests, and the limits of the claim."
      >
        <div className="grid gap-4 md:grid-cols-4">
          {exampleArtifacts.map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} detail={item.note} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/example"
            className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#7fd8bf]"
          >
            Open the full example report
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Bias pressure monitor"
        title="The output can look correct while the internals shift."
        body="Holmes flags cases where the visible answer stays unchanged but the decision margin moves against a protected proxy after statistical correction."
        surface
      >
        <div className="grid gap-3">
          {biasAuditRows.slice(0, 3).map((row) => (
            <article key={row.group} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-white">{row.group}</h3>
                <StatusPill tone={row.verdict === "flag" ? "danger" : row.verdict === "watch" ? "warning" : "success"}>
                  {row.verdict}
                </StatusPill>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <MetricCard label="Margin delta" value={row.delta} detail="change from baseline" />
                <MetricCard label="FDR p" value={row.pAdjusted} detail="multiple-test corrected" />
                <MetricCard label="Output" value={row.output} detail="visible answer" tone="success" />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Certificate gates"
        title="Holmes only makes the strong claim after the hard tests pass."
        body="If a result fails negative controls or cannot beat random internal nodes, the product says review instead of pretending."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {certificateGates.map((gate) => (
            <article key={gate.label} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold leading-tight text-white">{gate.label}</h3>
                <StatusPill tone={gate.status === "REQUIRED" ? "warning" : "success"}>{gate.status}</StatusPill>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{gate.detail}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
