import { stats } from "@/lib/mock-data"

export function StatsBar() {
  return (
    <section className="section-shell py-20">
      <div className="grid grid-cols-2 border-y border-[color:var(--border)] py-8 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`px-4 py-5 text-center ${
              index < stats.length - 1 ? "md:border-r md:border-[color:var(--border)]" : ""
            }`}
          >
            <div className="font-display text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
              {stat.value}
            </div>
            <p className="mx-auto mt-2 max-w-36 text-sm leading-5 text-[var(--text-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
