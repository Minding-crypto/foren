import Link from "next/link"
import type { ReactNode } from "react"

import { navItems } from "../lib/site-data"

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(11,13,14,0.9)] backdrop-blur-md">
      <nav className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold tracking-normal text-white">
          Holmes
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--text-secondary)] transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/example"
          className="rounded-md border border-[var(--accent)]/40 px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]"
        >
          View example
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
    </main>
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
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 forensic-grid" aria-hidden="true" />
      <div className="section-shell relative pb-16 pt-28">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          {eyebrow}
        </p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <h1 className="font-display text-[42px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[70px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              {body}
            </p>
          </div>
          {children}
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
    <section className={`border-b border-white/10 py-20 ${surface ? "bg-[var(--bg-surface)]" : ""}`}>
      <div className="section-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
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
  const toneClass =
    tone === "success"
      ? "text-[var(--success)]"
      : tone === "warning"
        ? "text-[var(--warning)]"
        : tone === "danger"
          ? "text-[var(--danger)]"
          : "text-white"

  return (
    <article className="rounded-md border border-white/10 bg-[var(--bg-card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className={`mt-3 font-display text-3xl font-semibold ${toneClass}`}>{value}</p>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
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
      ? "border-[var(--success)]/35 bg-[rgba(33,196,143,0.09)] text-[var(--success)]"
      : tone === "warning"
        ? "border-[var(--warning)]/35 bg-[rgba(238,182,92,0.1)] text-[var(--warning)]"
        : tone === "danger"
          ? "border-[var(--danger)]/35 bg-[rgba(227,106,92,0.1)] text-[var(--danger)]"
          : "border-white/10 bg-white/[0.03] text-[var(--text-muted)]"

  return (
    <span className={`inline-flex justify-center rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${classes}`}>
      {children}
    </span>
  )
}

export function ProofGate({ title, detail }: { title: string; detail: string }) {
  return (
    <article className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
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
