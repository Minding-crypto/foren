const mathLayers = [
  {
    step: "01",
    title: "Turn the decision into a number",
    plain:
      "Instead of trusting the final word, we measure how hard the model is pushing toward APPROVE versus DENY.",
    technical:
      "score = logsumexp(APPROVE tokens) - logsumexp(DENY tokens)"
  },
  {
    step: "02",
    title: "Change the evidence one piece at a time",
    plain:
      "We rerun controlled versions of the same case to see which facts actually move the decision.",
    technical:
      "Exact Shapley and stratified ablation over the declared prompt variables"
  },
  {
    step: "03",
    title: "Find where the model stores the signal",
    plain:
      "We inspect the open-weight model layer by layer and token by token to locate decision-relevant internal states.",
    technical:
      "Residual stream cache across clean and corrupted prompts"
  },
  {
    step: "04",
    title: "Inject the internal signal",
    plain:
      "If we copy the important internal states into a failing prompt, the decision should move back in the expected direction.",
    technical:
      "Activation patching: clean states patched into corrupted forward pass"
  },
  {
    step: "05",
    title: "Remove the internal signal",
    plain:
      "If those states really matter, removing them from the original prompt should break the decision.",
    technical:
      "Necessity test: corrupt states replace selected clean states"
  },
  {
    step: "06",
    title: "Only certify what survives",
    plain:
      "The report only allows the strongest claim if the circuit passes sufficiency, necessity, and minimality checks.",
    technical:
      "Necessary and sufficient circuit gate with selected-node minimality"
  }
]

const proofChecks = [
  {
    title: "Clean case",
    value: "+0.162",
    result: "APPROVE pressure",
    detail: "The original prompt pushes the model toward APPROVE."
  },
  {
    title: "Corrupt case",
    value: "-7.972",
    result: "DENY pressure",
    detail: "Changing the evidence flips the model toward DENY."
  },
  {
    title: "Patch test",
    value: "+0.278",
    result: "Approval restored",
    detail: "Putting the clean internal signals into the corrupt run restores APPROVE."
  },
  {
    title: "Ablation test",
    value: "-7.465",
    result: "Approval destroyed",
    detail: "Removing the selected internal signals from the clean run destroys APPROVE."
  }
]

const certificateGates = [
  {
    label: "Decision readout",
    status: "PASS",
    detail: "The final answer is reduced to an approve-vs-deny logit margin, not a vague text explanation."
  },
  {
    label: "Layer timing",
    status: "PASS",
    detail: "Holmes reports the first layer where the decision signal appears and where it stays stable."
  },
  {
    label: "Circuit sufficiency",
    status: "PASS",
    detail: "Patching the selected internal states into a corrupted run restores the decision."
  },
  {
    label: "Circuit necessity",
    status: "PASS",
    detail: "Replacing those states in the clean run destroys the decision."
  },
  {
    label: "Minimality",
    status: "PASS",
    detail: "Nodes that can be removed without changing the proof are rejected from the certificate."
  },
  {
    label: "Proxy-bias screen",
    status: "FLAG/OK",
    detail: "Matched-pair demographic substitutions test whether protected proxies move the decision margin."
  }
]

const circuitNodes = [
  {
    site: "Layer 9, token 65",
    token: "PASS",
    recovery: "0.507",
    meaning: "largest verified internal signal pushing the decision back to APPROVE"
  },
  {
    site: "Layer 4, token 73",
    token: "PASS",
    recovery: "0.246",
    meaning: "middle-layer evidence carrier used by the proof circuit"
  },
  {
    site: "Layer 2, token 69",
    token: "PASS",
    recovery: "0.139",
    meaning: "early evidence signal that helps complete the circuit"
  }
]

const biasAuditRows = [
  {
    group: "White male-coded baseline",
    delta: "+0.000",
    pAdjusted: "baseline",
    output: "HIRE",
    verdict: "baseline"
  },
  {
    group: "Female-name proxy",
    delta: "-0.407",
    pAdjusted: "0.035",
    output: "HIRE",
    verdict: "flag"
  },
  {
    group: "Black-name proxy",
    delta: "-0.462",
    pAdjusted: "0.058",
    output: "HIRE",
    verdict: "watch"
  },
  {
    group: "South Asian proxy",
    delta: "-0.252",
    pAdjusted: "0.068",
    output: "HIRE",
    verdict: "watch"
  },
  {
    group: "Arab/Muslim proxy",
    delta: "-0.321",
    pAdjusted: "0.084",
    output: "HIRE",
    verdict: "watch"
  }
]

const hiddenPressureStats = [
  {
    label: "Visible answer",
    value: "HIRE",
    detail: "The model still gives the same final answer."
  },
  {
    label: "Internal margin shift",
    value: "-0.407",
    detail: "The probability pressure toward HIRE drops under female-name substitution."
  },
  {
    label: "Corrected p-value",
    value: "0.035",
    detail: "The paired test survives FDR correction for the gender proxy audit."
  }
]

const useCases = [
  {
    title: "Banks and lenders",
    trigger: "Credit decisions need specific reasons and model-risk evidence.",
    artifact: "Decision proof certificate + adverse-action trace",
    buyer: "Compliance, model risk, credit policy, legal"
  },
  {
    title: "Hiring platforms",
    trigger: "Employment AI faces bias-audit, notice, and discrimination scrutiny.",
    artifact: "Matched-pair bias pressure certificate",
    buyer: "HR tech vendors, enterprise HR, outside counsel"
  },
  {
    title: "Insurance and healthcare triage",
    trigger: "High-impact triage and claims decisions need allowed-factor evidence.",
    artifact: "Counterfactual stability and sensitivity report",
    buyer: "Risk teams, clinical governance, claims operations"
  },
  {
    title: "AI vendors selling to enterprises",
    trigger: "Enterprise procurement asks for governance before signing.",
    artifact: "Signed model behavior dossier for sales security review",
    buyer: "AI startups, platform vendors, sales engineering"
  },
  {
    title: "Incident response",
    trigger: "After harm, teams must reconstruct what happened and why.",
    artifact: "Replayable forensic record with prompt, model, and circuit evidence",
    buyer: "Trust and safety, security, legal, auditors"
  },
  {
    title: "Continuous model governance",
    trigger: "Prompt updates and model upgrades can silently change logic.",
    artifact: "Regression suite for decision margins, circuits, and proxy shifts",
    buyer: "ML platform, governance, internal audit"
  }
]

const agenticLayers = [
  {
    title: "Planner decision",
    question: "Why did the agent choose this next step?",
    evidence: "Decision margin, competing action scores, prompt and memory influence"
  },
  {
    title: "Tool call",
    question: "Why did it call this API, file action, browser action, or payment step?",
    evidence: "Tool-routing attribution, counterfactual tool availability tests, permission checks"
  },
  {
    title: "Memory and retrieval",
    question: "Which memory, document, or retrieved chunk changed the action?",
    evidence: "Retrieval ablations, source influence, signed evidence trace"
  },
  {
    title: "Internal mechanism",
    question: "Where did the open-weight model represent the action-driving signal?",
    evidence: "Activation patching, circuit nodes, necessity and sufficiency gates"
  },
  {
    title: "Policy compliance",
    question: "Did the agent obey the rules before acting?",
    evidence: "Policy constraint tests, forbidden-action probes, human-approval gates"
  },
  {
    title: "Replayable incident record",
    question: "Can the company prove what happened after the agent acted?",
    evidence: "Cryptographic trace, prompt/tool log, model version, environment snapshot"
  }
]

const agenticOutcomes = [
  {
    metric: "From autonomous to accountable",
    detail: "Every major action gets a replayable evidence trail."
  },
  {
    metric: "From tool call to justified tool call",
    detail: "The system records why a tool was selected and what would have changed the choice."
  },
  {
    metric: "From agent demo to enterprise deployment",
    detail: "Governance, audit, incident response, and compliance teams get artifacts they can review."
  }
]

const regulations = [
  {
    name: "EU AI Act",
    region: "European Union",
    need:
      "High-risk AI systems need documentation, transparency, human oversight, accuracy, robustness, and risk management evidence.",
    link: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
  },
  {
    name: "Colorado AI Act",
    region: "United States",
    need:
      "Developers and deployers of high-risk AI face duties around risk management, impact assessments, notices, and discrimination controls.",
    link: "https://leg.colorado.gov/bills/sb24-205"
  },
  {
    name: "NYC Local Law 144",
    region: "New York City",
    need:
      "Automated employment decision tools require bias audits, public summaries, and candidate notice before use.",
    link: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page"
  },
  {
    name: "GDPR Article 22",
    region: "European Union",
    need:
      "Automated individual decisions and profiling create rights and governance duties around meaningful information and safeguards.",
    link: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng"
  },
  {
    name: "CFPB black-box credit guidance",
    region: "United States",
    need:
      "Creditors using complex algorithms still need specific, accurate adverse-action reasons. Model complexity is not an excuse.",
    link: "https://www.consumerfinance.gov/about-us/newsroom/cfpb-acts-to-protect-the-public-from-black-box-credit-models-using-complex-algorithms/"
  },
  {
    name: "Federal Reserve SR 11-7",
    region: "Banking model risk",
    need:
      "Banks need model validation, documentation, governance, and evidence that model outputs are understood and controlled.",
    link: "https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm"
  },
  {
    name: "NIST AI RMF and GenAI Profile",
    region: "Enterprise standard",
    need:
      "A widely used governance framework for mapping, measuring, managing, and governing AI risks, including generative AI.",
    link: "https://www.nist.gov/itl/ai-risk-management-framework"
  }
]

const papers = [
  {
    title: "Formal Mechanistic Interpretability",
    year: "2026",
    why: "Pushes toward proof-style interpretability instead of loose visual explanations.",
    link: "https://arxiv.org/abs/2602.16823"
  },
  {
    title: "MATRA: Agentic AI Attack Surface - OpenClaw Case Study",
    year: "2026",
    why: "Shows why autonomous agents need serious security and forensic analysis.",
    link: "https://arxiv.org/abs/2605.10763"
  },
  {
    title: "Foundations for Agentic AI Investigations from OpenClaw",
    year: "2026",
    why: "Frames agent behavior as a forensic investigation problem across model, tools, and environment.",
    link: "https://arxiv.org/abs/2604.05589"
  },
  {
    title: "Circuit Tracing: Revealing Computational Graphs in Language Models",
    year: "2025",
    why: "Shows how to identify causal internal pathways rather than only input correlations.",
    link: "https://transformer-circuits.pub/2025/attribution-graphs/methods.html"
  },
  {
    title: "Scaling Monosemanticity",
    year: "2024",
    why: "Demonstrates sparse feature extraction at frontier-model scale.",
    link: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html"
  },
  {
    title: "Sparse Autoencoders Find Highly Interpretable Features",
    year: "2023",
    why: "Core foundation for decomposing activations into more understandable feature directions.",
    link: "https://arxiv.org/abs/2309.08600"
  },
  {
    title: "Interpretability in the Wild: An IOI Circuit",
    year: "2022",
    why: "Classic activation-patching circuit proof showing causal internal components.",
    link: "https://arxiv.org/abs/2211.00593"
  },
  {
    title: "A Mathematical Framework for Transformer Circuits",
    year: "2021",
    why: "Foundational framework for treating transformer internals as inspectable circuits.",
    link: "https://transformer-circuits.pub/2021/framework/index.html"
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(11,13,14,0.88)] backdrop-blur-md">
        <nav className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="font-display text-lg font-semibold tracking-normal text-white">
            Holmes
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a className="text-sm text-[var(--text-secondary)] hover:text-white" href="#math">
              Math
            </a>
            <a className="text-sm text-[var(--text-secondary)] hover:text-white" href="#certificate">
              Certificate
            </a>
            <a className="text-sm text-[var(--text-secondary)] hover:text-white" href="#regulation">
              Regulation
            </a>
            <a className="text-sm text-[var(--text-secondary)] hover:text-white" href="#agents">
              Agents
            </a>
            <a className="text-sm text-[var(--text-secondary)] hover:text-white" href="#papers">
              Research
            </a>
          </div>
          <a
            href="#use-cases"
            className="rounded-md border border-[var(--accent)]/40 px-4 py-2 text-sm font-medium text-[var(--accent)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]"
          >
            Why buyers need it
          </a>
        </nav>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 forensic-grid" aria-hidden="true" />
        <div className="section-shell relative grid min-h-[94vh] content-center gap-10 pb-16 pt-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Mechanistic evidence for AI decisions
            </p>
            <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.04] tracking-normal text-white sm:text-6xl lg:text-[70px]">
              Show why the model decided.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
              Holmes turns an open-weight model decision into evidence:
              what information mattered, where the model represented it inside,
              and whether changing those internal signals changes the decision.
            </p>
            <p className="mt-5 max-w-xl rounded-md border border-[var(--accent)]/30 bg-[rgba(95,201,176,0.08)] p-4 text-base font-semibold leading-7 text-white">
              New bias finding: the final output can still look correct while
              the model&apos;s internal decision pressure shifts against a protected proxy.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#certificate"
                className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#7fd8bf]"
              >
                View the certificate
              </a>
              <a
                href="#bias-audit"
                className="rounded-md border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                See bias audit
              </a>
            </div>
          </div>

          <div className="audit-surface">
            <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                  Proof example
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  Qwen2.5 rule-engine decision
                </h2>
              </div>
              <div className="rounded-md border border-[var(--success)]/35 bg-[rgba(33,196,143,0.09)] px-3 py-2 text-sm font-semibold text-[var(--success)]">
                necessary + sufficient
              </div>
            </div>

            <div className="grid gap-px bg-white/10 md:grid-cols-4">
              {proofChecks.map((check) => (
                <div key={check.title} className="bg-[var(--bg-card)] p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {check.title}
                  </p>
                  <p className="mt-3 font-display text-3xl font-semibold text-white">
                    {check.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[var(--accent)]">
                    {check.result}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {check.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid gap-5 p-5">
              <div className="rounded-md border border-white/10 bg-[#090b0c] p-4 font-mono text-sm leading-7 text-[#d7e2dc]">
                <p>decision_score = APPROVE pressure - DENY pressure</p>
                <p className="text-[var(--success)]">positive score: model leans APPROVE</p>
                <p className="text-[var(--danger)]">negative score: model leans DENY</p>
              </div>

              <div className="grid gap-3">
                {circuitNodes.map((node) => (
                  <article
                    key={node.site}
                    className="grid min-h-[116px] gap-4 rounded-md border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-[minmax(0,1fr)_88px_180px] sm:items-stretch"
                  >
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="font-mono text-sm text-white">{node.site}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
                        {node.meaning}
                      </p>
                    </div>
                    <div className="flex min-h-[64px] items-center justify-center rounded-md border border-[var(--accent-2)]/35 bg-[rgba(238,182,92,0.09)] px-3 py-2 text-center font-mono text-sm font-semibold text-[var(--accent-2)]">
                      {node.token}
                    </div>
                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">
                        recovery
                      </p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${Math.max(12, Number(node.recovery) * 100)}%` }}
                        />
                      </div>
                      <p className="mt-1 font-mono text-sm text-white">{node.recovery}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certificate" className="border-b border-white/10 bg-[var(--bg-surface)] py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Decision Proof Certificate.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              This is the product buyers understand instantly: a pass/fail
              certificate showing what the model decided, when the decision
              formed inside the layers, which circuit carried it, and whether
              the explanation survives intervention tests.
            </p>
            <div className="mt-6 rounded-md border border-[var(--accent)]/35 bg-[rgba(95,201,176,0.08)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                Certified claim
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-white">
                Holmes identified a bounded causal circuit that was necessary
                and sufficient for the tested decision under the declared metric.
              </p>
            </div>
          </div>

          <div className="audit-surface">
            <div className="border-b border-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Certificate gates
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                No pass, no strong claim.
              </h3>
            </div>
            <div className="grid gap-px bg-white/10 md:grid-cols-2">
              {certificateGates.map((gate) => (
                <div key={gate.label} className="bg-[var(--bg-card)] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-xl font-semibold text-white">
                      {gate.label}
                    </p>
                    <span className="rounded-md border border-[var(--success)]/35 bg-[rgba(33,196,143,0.09)] px-2 py-1 text-xs font-semibold text-[var(--success)]">
                      {gate.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                    {gate.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="math" className="border-b border-white/10 py-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
              Math explained simply
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              The system does not ask the model for an excuse. It tests the mechanism.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mathLayers.map((layer) => (
              <article key={layer.step} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/12 font-mono text-sm text-[var(--accent)]">
                    {layer.step}
                  </span>
                  <span className="rounded-md bg-white/[0.04] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    tested
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                  {layer.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-[var(--text-secondary)]">
                  {layer.plain}
                </p>
                <p className="mt-4 rounded-md border border-white/10 bg-black/20 p-3 font-mono text-xs leading-5 text-[var(--text-muted)]">
                  {layer.technical}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="interventions" className="border-b border-white/10 bg-[var(--bg-surface)] py-24">
        <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              What the final report can say
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              A strong claim only appears after intervention tests pass.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              The report does not say &quot;the AI probably used income&quot; because that
              sounds nice. It says exactly what was tested: which internal states
              were sufficient to restore the decision and necessary to keep it.
            </p>
          </div>

          <div className="grid gap-4">
            <ProofGate
              title="Sufficiency"
              detail="When the clean internal signals are inserted into the corrupted run, APPROVE comes back."
            />
            <ProofGate
              title="Necessity"
              detail="When those same signals are removed from the clean run, APPROVE disappears."
            />
            <ProofGate
              title="Minimality"
              detail="If a selected node can be removed without changing the proof, it is not allowed in the certified circuit."
            />
          </div>
        </div>
      </section>

      <section id="bias-audit" className="border-b border-white/10 py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--danger)]">
              Hidden-risk finder
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              The answer can look fair while the internals are already shifting.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              Holmes can run matched-pair demographic proxy audits: same
              qualifications, same role, same prompt. Only the protected proxy
              changes. If the model&apos;s hire-vs-reject margin shifts or flips,
              the report flags potential differential treatment.
            </p>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              In our Qwen hiring audit, every matched candidate still received
              the visible answer <span className="font-semibold text-white">HIRE</span>.
              But the internal hire-vs-reject margin dropped for the female-name
              proxy and survived FDR correction. The white male-coded baseline
              shows what the unchanged reference value looks like. Output-only
              QA would miss that.
            </p>
            <div className="mt-5 grid gap-3">
              {hiddenPressureStats.map((stat) => (
                <div key={stat.label} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="audit-surface">
            <div className="border-b border-white/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Matched-pair logit-margin output
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                Bias pressure certificate
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Same qualifications. Same prompt. Same visible output. Different internal decision pressure.
              </p>
            </div>
            <div className="grid gap-px bg-white/10">
              {biasAuditRows.map((row) => (
                <article key={row.group} className="bg-[var(--bg-card)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-display text-xl font-semibold leading-tight text-white">
                      {row.group}
                    </p>
                    <span className={`inline-flex min-w-[70px] justify-center rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${
                      row.verdict === "flag"
                        ? "border-[var(--danger)]/35 bg-[rgba(227,106,92,0.1)] text-[var(--danger)]"
                        : row.verdict === "watch"
                          ? "border-[var(--warning)]/35 bg-[rgba(238,182,92,0.1)] text-[var(--warning)]"
                          : "border-[var(--success)]/35 bg-[rgba(33,196,143,0.09)] text-[var(--success)]"
                    }`}>
                      {row.verdict}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <BiasMetric label="Margin delta" value={row.delta} />
                    <BiasMetric label="FDR p-value" value={row.pAdjusted} />
                    <BiasMetric label="Visible output" value={row.output} tone="success" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="agents" className="border-b border-white/10 py-24">
        <div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
              Agentic AI evidence layer
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Agents do not just answer. They choose, call tools, and act.
            </h2>
            <div className="mt-6 rounded-md border border-[var(--accent)]/35 bg-[rgba(95,201,176,0.08)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                The final upgrade
              </p>
              <p className="mt-4 font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Holmes turns agents from powerful automation into provable,
                governable AI workers.
              </p>
            </div>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              Tools like Hermes and OpenClaw make agents better at executing.
              Holmes makes those agents safe enough to deploy: every plan,
              memory, tool choice, policy gate, and final action becomes
              explainable, testable, and replayable.
            </p>
            <div className="mt-6 grid gap-3">
              {agenticOutcomes.map((outcome) => (
                <div key={outcome.metric} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-4">
                  <p className="font-display text-xl font-semibold text-white">
                    {outcome.metric}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {outcome.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {agenticLayers.map((layer) => (
              <article key={layer.title} className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
                <h3 className="font-display text-2xl font-semibold text-white">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm font-semibold text-[var(--accent)]">
                  {layer.question}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {layer.evidence}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="regulation" className="border-b border-white/10 py-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
              Regulatory pressure
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              AI decisions are becoming evidence problems.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--text-secondary)]">
              These laws and frameworks do not name Holmes. They create the
              buyer pain: companies must document, test, explain, monitor, and
              defend automated decisions.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {regulations.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6 transition hover:border-[var(--accent)]/50"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  {item.region}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {item.need}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="use-cases" className="border-b border-white/10 bg-[var(--bg-surface)] py-24">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Why customers need it
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                When AI touches money, jobs, health, or legal risk, &quot;trust us&quot; stops working.
              </h2>
            </div>
            <div className="rounded-md border border-[var(--accent)]/25 bg-[rgba(95,201,176,0.08)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                What Holmes sells
              </p>
              <p className="mt-3 text-xl font-semibold leading-8 text-white">
                A decision evidence pack: what changed, what mattered, where it appeared internally,
                and whether the behavior survives controlled tests.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((item, index) => (
              <article key={item.title} className="grid min-h-[250px] content-between rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-white">
                      {item.title}
                    </h3>
                    <span className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-xs text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <UseCaseLine label="Trigger" value={item.trigger} />
                    <UseCaseLine label="Holmes artifact" value={item.artifact} />
                  </div>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Buyer
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-white">
                    {item.buyer}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="papers" className="py-24">
        <div className="section-shell">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-2)]">
              Research foundation
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Built from the direction the field is moving: circuits, sparse features, and proof-style tests.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  {paper.why}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ProofGate({ title, detail }: { title: string; detail: string }) {
  return (
    <article className="rounded-md border border-white/10 bg-[var(--bg-card)] p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
        <span className="rounded-md border border-[var(--success)]/35 bg-[rgba(33,196,143,0.09)] px-3 py-1 text-sm font-semibold text-[var(--success)]">
          PASS
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
    </article>
  )
}

function UseCaseLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-2 border-t border-white/10 pt-3 sm:grid-cols-[96px_1fr]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        {label}
      </p>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">
        {value}
      </p>
    </div>
  )
}

function BiasMetric({
  label,
  value,
  tone = "muted"
}: {
  label: string
  value: string
  tone?: "muted" | "success"
}) {
  return (
    <div className="rounded-md border border-white/10 bg-black/15 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
        {label}
      </p>
      <p className={`mt-2 font-mono text-base font-semibold ${tone === "success" ? "text-[var(--success)]" : "text-white"}`}>
        {value}
      </p>
    </div>
  )
}
