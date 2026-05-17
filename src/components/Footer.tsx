export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] py-10">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <a
            href="#top"
            className="font-display text-xl font-bold tracking-normal text-white"
            aria-label="QueueGod home"
          >
            QueueGod
          </a>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Queue smarter. Live better.
          </p>
        </div>

        <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)] md:items-end">
          <div className="flex gap-5">
            <a className="transition hover:text-white" href="#">
              Privacy
            </a>
            <a className="transition hover:text-white" href="#">
              Terms
            </a>
          </div>
          <p>© 2025 QueueGod</p>
        </div>
      </div>
    </footer>
  )
}
