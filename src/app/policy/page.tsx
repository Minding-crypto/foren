import { PageHero, PageShell, Section, StatusPill } from "../../components/site-shell"
import { policyRules } from "../../lib/site-data"

const policyJson = `{
  "version": "HMEC-0.1",
  "default_action": "review",
  "high_risk_domains": ["credit", "hiring", "insurance", "healthcare", "agent_tools"],
  "mechanistic": {
    "require_for_open_weight_high_risk": true,
    "require_sufficiency": true,
    "require_necessity": true,
    "require_minimality": true,
    "max_negative_control_p": 0.05,
    "random_full_proof_pass_count": 0
  },
  "bias_pressure": {
    "enabled": true,
    "max_fdr_significant_delta": 0.25,
    "protected_proxy_libraries": ["gender", "race_ethnicity", "religion"]
  },
  "regression": {
    "max_decision_margin_delta": 0.50,
    "block_on_certified_circuit_loss": true
  },
  "agent_actions": {
    "review_required_for": ["payment", "email", "record_delete", "external_api"]
  }
}`

export default function PolicyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Policy as code"
        title="Buyers should define what counts as safe before the model ships."
        body="A Holmes policy file turns the evidence layer into an enforceable release rule: which models need proof, what controls must pass, and when bias pressure or drift blocks deployment."
      >
        <div className="audit-surface p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
              holmes.policy.json
            </p>
            <StatusPill tone="warning">blocks releases</StatusPill>
          </div>
          <pre className="mt-5 max-h-[420px] overflow-auto rounded-md border border-white/10 bg-black/30 p-4 font-mono text-xs leading-6 text-[var(--text-secondary)]">
            {policyJson}
          </pre>
        </div>
      </PageHero>

      <Section
        eyebrow="Release rules"
        title="The policy file converts research tests into buyer-friendly pass/fail controls."
        body="This is how Holmes becomes operational: engineering can automate it, compliance can review it, and executives can understand why a release was blocked."
        surface
      >
        <div className="grid gap-4">
          {policyRules.map((rule) => (
            <article key={rule.rule} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:items-start">
                <div>
                  <StatusPill>policy gate</StatusPill>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{rule.rule}</h3>
                </div>
                <div className="min-w-0 rounded-md border border-white/10 bg-black/20 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Path</p>
                  <p className="mt-2 break-words font-mono text-sm text-[var(--accent)]">{rule.path}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Threshold</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{rule.threshold}</p>
                </div>
                <p className="text-sm leading-6 text-[var(--text-secondary)]">{rule.buyerMeaning}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
