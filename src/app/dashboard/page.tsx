import { PageHero, PageShell, Section, MetricCard, StatusPill } from "../../components/site-shell"
import { dashboardMetrics, dashboardQueue, registryReports } from "../../lib/site-data"

function statusTone(status: string) {
  if (status === "PASS") return "success" as const
  if (status === "BLOCK") return "danger" as const
  return "warning" as const
}

function metricTone(tone?: string) {
  if (tone === "success" || tone === "warning" || tone === "danger") return tone
  return "neutral"
}

export default function DashboardPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Customer dashboard"
        title="One command creates an audit trail. One dashboard shows what can ship."
        body="Release gates, certificate registry records, blocked deployments, proxy alerts, and incident-ready evidence packets live in one operating console."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              Release state
            </p>
            <StatusPill tone="warning">live governance queue</StatusPill>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <MetricCard label="Ready" value="31" detail="certified releases" tone="success" />
            <MetricCard label="Blocked" value="7" detail="evidence gates failed" tone="danger" />
            <MetricCard label="Review" value="19" detail="human owner assigned" tone="warning" />
            <MetricCard label="Artifacts" value="842" detail="signed report records" />
          </div>
        </div>
      </PageHero>

      <Section
        eyebrow="Executive overview"
        title="See what is safe, what changed, and what needs review."
        body="The goal is not to force teams into a new ML platform. Veridion sits beside their release process and turns model behavior into reviewable evidence."
        surface
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              detail={metric.detail}
              tone={metricTone(metric.tone)}
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Release queue"
        title="Veridion becomes the pass, block, or review layer."
        body="Each row is the kind of artifact a compliance lead, ML owner, or security reviewer can act on immediately."
      >
        <div className="grid gap-3">
          {dashboardQueue.map((item) => (
            <article key={item.id} className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_160px_160px] lg:items-center">
                <div className="min-w-0">
                  <p className="break-words font-mono text-xs text-[var(--text-muted)]">{item.id}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-white">
                    {item.finding}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {item.model} | Owner: {item.owner}
                  </p>
                </div>
                <div className="rounded-md border border-white/10 bg-white/[0.025] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Risk
                  </p>
                  <div className="mt-3">
                    <StatusPill tone={item.risk === "critical" ? "danger" : "warning"}>{item.risk}</StatusPill>
                  </div>
                  <p className="mt-3 text-xs text-[var(--text-secondary)]">Policy tier</p>
                </div>
                <div className="flex justify-start lg:justify-end">
                  <StatusPill tone={statusTone(item.status)}>{item.status}</StatusPill>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Certificate registry"
        title="Every report is searchable by model, prompt family, proof status, and policy result."
        body="This is where Veridion starts to look like infrastructure: not a PDF generator, but a registry of signed decision evidence."
        surface
      >
        <div className="registry-table">
          <div className="registry-row registry-header">
            <p>Report</p>
            <p>Decision</p>
            <p>Evidence</p>
            <p>Status</p>
          </div>
          {registryReports.map((report) => (
            <article key={report.id} className="registry-row interactive-card">
              <div className="min-w-0">
                <p className="break-words font-mono text-xs text-[var(--text-muted)]">{report.id}</p>
                <h3 className="mt-1 font-display text-xl font-semibold text-white">{report.domain}</h3>
                <p className="mt-1 break-words text-sm text-[var(--text-secondary)]">{report.model}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] md:hidden">
                  Decision
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-white md:mt-0">{report.output}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">{report.margin}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)] md:hidden">
                  Evidence
                </p>
                <p className="mt-1 text-sm font-semibold text-white md:mt-0">{report.proofLabel}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{report.proofDetail}</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Controls: {report.controls}</p>
              </div>
              <div className="flex justify-start md:justify-end">
                <StatusPill tone={report.grade.includes("CERTIFIED") ? "success" : "warning"}>{report.grade}</StatusPill>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
