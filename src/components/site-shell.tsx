import Link from "next/link"
import type { ReactNode } from "react"

import { footerGroups, legalLinks, navItems } from "../lib/site-data"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(11,13,14,0.9)] backdrop-blur-md">
      <nav className="section-shell flex h-16 min-w-0 items-center justify-between gap-3 overflow-hidden">
        <Link href="/" className="font-display text-lg font-semibold tracking-normal text-white">
          Veridion
        </Link>
        <div className="hidden min-w-0 max-w-[60vw] flex-1 items-center justify-end gap-4 overflow-hidden lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[var(--text-secondary)] hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/pilot"
          className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-[var(--text-primary)] hover:border-white/30 hover:bg-white/[0.04]"
        >
          Start pilot
        </Link>
      </nav>
    </header>
  )
}

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#090b0b] py-12">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link href="/" className="font-display text-2xl font-semibold text-white">
              Veridion
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--text-secondary)]">
              Decision forensics for AI systems: signed evidence, release gates, bias-pressure monitoring,
              and bounded mechanistic certificates for open-weight models.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-medium text-[var(--text-muted)] transition hover:text-[var(--accent)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
                  {group.title}
                </h3>
                <div className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <Link
                      key={`${group.title}-${link.label}`}
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
          <p className="text-xs text-[var(--text-muted)]">(c) 2026 Veridion. All rights reserved.</p>
          <p className="text-xs text-[var(--text-muted)]">
            Built for on-prem, private-cloud, and governance-platform workflows.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function PageHero({
  eyebrow,
  title,
  body,
  children
}: {
  eyebrow: string
  title: string
  body: string
  children?: ReactNode
}) {
  return (
    <section className="relative max-w-full overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 forensic-grid" aria-hidden="true" />
      <div className="section-shell relative min-w-0 pb-16 pt-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <div className="mt-5 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <div className="min-w-0">
            <h1 className="break-words font-display text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[70px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              {body}
            </p>
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  )
}

export function PositioningBanner() {
  return (
    <section className="max-w-full overflow-hidden border-b border-white/10 bg-[var(--bg-surface)] py-10">
      <div className="section-shell">
        <div className="interactive-card rounded-md border border-white/10 bg-[rgba(18,23,22,0.92)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            The wedge
          </p>
          <h2 className="mt-4 max-w-6xl font-display text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-[56px]">
            Governance platforms certify around the model. Veridion certifies decision evidence inside the model.
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
            Existing AI governance tools prove policies, inventories, approvals, monitoring, and audit workflows.
            Veridion adds the missing mechanistic proof layer: which internal circuit carried the decision, and whether
            changing that circuit changed the outcome.
          </p>
        </div>
      </div>
    </section>
  )
}

export function Section({
  eyebrow,
  title,
  body,
  children,
  surface = false
}: {
  eyebrow: string
  title: string
  body?: string
  children: ReactNode
  surface?: boolean
}) {
  return (
    <section className={`max-w-full overflow-hidden border-b border-white/10 py-20 ${surface ? "bg-[var(--bg-surface)]" : ""}`}>
      <div className="section-shell min-w-0">
        <div className="max-w-3xl min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 break-words font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {title}
          </h2>
          {body ? (
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              {body}
            </p>
          ) : null}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "neutral"
}: {
  label: string
  value: string
  detail: string
  tone?: "neutral" | "success" | "warning" | "danger"
}) {
  const compactValue = value.length > 4 || /^[A-Za-z][A-Za-z\s-]+$/.test(value)
  const toneClass =
    tone === "success"
      ? "text-[var(--success)]"
      : tone === "warning"
        ? "text-[var(--warning)]"
        : tone === "danger"
          ? "text-[var(--danger)]"
          : "text-white"
  const valueClass = compactValue ? "text-xl leading-tight sm:text-2xl" : "text-3xl"

  return (
    <article className="interactive-card min-w-0 rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className={`mt-3 break-words font-display font-semibold ${valueClass} ${toneClass}`}>{value}</p>
      <p className="mt-3 break-words text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
    </article>
  )
}

export function StatusPill({
  children,
  tone = "success"
}: {
  children: ReactNode
  tone?: "success" | "warning" | "danger" | "muted"
}) {
  const classes =
    tone === "success"
      ? "border-white/15 bg-white/[0.035] text-[var(--success)]"
      : tone === "warning"
        ? "border-white/15 bg-white/[0.035] text-[var(--warning)]"
        : tone === "danger"
          ? "border-white/15 bg-white/[0.035] text-[var(--danger)]"
          : "border-white/10 bg-white/[0.03] text-[var(--text-muted)]"

  return (
    <span className={`inline-flex max-w-full min-w-0 justify-center whitespace-normal break-words rounded-md border px-2 py-1 text-center text-xs font-semibold uppercase tracking-[0.08em] ${classes}`}>
      {children}
    </span>
  )
}

export function ProofGate({ title, detail }: { title: string; detail: string }) {
  return (
    <article className="interactive-card rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
        <StatusPill>PASS</StatusPill>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
    </article>
  )
}

export function UseCaseLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-t border-white/10 pt-3 sm:grid-cols-[110px_1fr]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        {label}
      </p>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{value}</p>
    </div>
  )
}
