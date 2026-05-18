export const navItems = [
  { label: "Proof", href: "/proof" },
  { label: "Example report", href: "/example" },
  { label: "Trust", href: "/trust" },
  { label: "Buyers", href: "/buyers" },
  { label: "Research", href: "/research" }
]

export const mathLayers = [
  {
    step: "01",
    title: "Decision readout",
    plain:
      "The final answer is converted into a numeric margin: how hard the model pushes toward one decision over the alternative.",
    technical:
      "score = logsumexp(APPROVE-family tokens) - logsumexp(DENY-family tokens)"
  },
  {
    step: "02",
    title: "Input evidence tests",
    plain:
      "The prompt is rerun with controlled evidence changes to measure which facts move the decision.",
    technical:
      "Exact Shapley, stratified ablation, paired margin deltas, and FDR correction"
  },
  {
    step: "03",
    title: "Layer timing",
    plain:
      "For open-weight models, Holmes records where the decision signal first appears and where it becomes stable.",
    technical:
      "Residual stream and logit-lens traces over clean and corrupted prompts"
  },
  {
    step: "04",
    title: "Circuit search",
    plain:
      "Holmes searches for internal layer-token states that carry the decision signal.",
    technical:
      "Candidate ranking by causal recovery under activation patching"
  },
  {
    step: "05",
    title: "Sufficiency and necessity",
    plain:
      "If the selected states are real, adding them should restore the decision and removing them should destroy it.",
    technical:
      "Clean-to-corrupt patching and corrupt-to-clean ablation tests"
  },
  {
    step: "06",
    title: "Negative controls",
    plain:
      "Random internal nodes and wrong-target circuits must fail. Otherwise the certificate is rejected.",
    technical:
      "Same-size random node controls, wrong-target checks, shuffled labels, and minimality knock-out"
  }
]

export const proofChecks = [
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
    detail: "Putting the selected clean internal states into the corrupt run restores APPROVE."
  },
  {
    title: "Ablation test",
    value: "-7.465",
    result: "Approval destroyed",
    detail: "Removing the selected internal states from the clean run destroys APPROVE."
  }
]

export const circuitNodes = [
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

export const certificateGates = [
  {
    label: "Decision readout",
    status: "PASS",
    detail: "The decision is scored as a logit margin, not a vague text explanation."
  },
  {
    label: "Layer timing",
    status: "PASS",
    detail: "The report shows when the decision signal appears across model depth."
  },
  {
    label: "Circuit sufficiency",
    status: "PASS",
    detail: "Patching the selected internal states restores the decision."
  },
  {
    label: "Circuit necessity",
    status: "PASS",
    detail: "Removing the selected states destroys the decision."
  },
  {
    label: "Minimality",
    status: "PASS",
    detail: "Nodes that are not needed are removed from the certified circuit."
  },
  {
    label: "Negative controls",
    status: "REQUIRED",
    detail: "Random circuits, wrong targets, and shuffled labels must fail."
  }
]

export const trustBenchmarks = [
  {
    name: "Known-rule tasks",
    result: "decision accuracy",
    detail: "Synthetic loan, hiring, blocker, and threshold prompts where the correct output is declared before testing."
  },
  {
    name: "Circuit certification rate",
    result: "proof yield",
    detail: "How often Holmes passes sufficiency, necessity, minimality, and negative-control gates."
  },
  {
    name: "False-positive controls",
    result: "random nodes fail",
    detail: "Random same-size internal node sets must not restore the decision like the selected circuit does."
  },
  {
    name: "Version regression",
    result: "drift caught",
    detail: "The same suite is rerun after model, prompt, RAG, or policy changes."
  }
]

export const negativeControls = [
  {
    check: "Same-size random circuits",
    pass: "random recovery p95 stays below the selected circuit",
    reason: "proves the result is not just any patch from any layer"
  },
  {
    check: "Wrong-target decision",
    pass: "APPROVE circuit should not certify DENY",
    reason: "proves the circuit is decision-specific"
  },
  {
    check: "Shuffled prompt labels",
    pass: "certificate fails when the rule labels are scrambled",
    reason: "proves the evidence is not a formatting artifact"
  },
  {
    check: "Minimality knock-out",
    pass: "removing a selected node weakens recovery",
    reason: "proves every certified node earns its place"
  }
]

export const exampleSummary = {
  model: "Qwen/Qwen2.5-0.5B-Instruct",
  provider: "local open-weight",
  prompt:
    "Applicant: age=22 income=25000 loan=150000 employment=1yr. Should we approve or deny this loan? Answer:",
  output: "APPROVE",
  decisionMetric: "exact local next-token logit margin",
  artifact: "Signed decision evidence pack"
}

export const exampleSteps = [
  {
    name: "1. Freeze the run",
    output: "model, prompt, seed, tokenizer, decision tokens, and hash are recorded",
    why: "A buyer can replay the exact decision context."
  },
  {
    name: "2. Score the decision",
    output: "APPROVE-vs-DENY margin replaces subjective text similarity",
    why: "The report is tied to the decision boundary."
  },
  {
    name: "3. Test input evidence",
    output: "Shapley, ablation, and paired deltas rank which facts move the margin",
    why: "The buyer sees what external facts mattered."
  },
  {
    name: "4. Trace internal states",
    output: "Layer-token candidates are ranked by causal recovery",
    why: "Open-weight runs can show where the model represented the signal."
  },
  {
    name: "5. Intervene on the model",
    output: "patching restores the decision; ablation destroys it",
    why: "This is the difference between correlation and a stronger mechanistic claim."
  },
  {
    name: "6. Run controls",
    output: "random circuits and wrong-target tests must fail",
    why: "The certificate rejects easy false positives."
  }
]

export const exampleArtifacts = [
  {
    label: "Visible output",
    value: "APPROVE",
    note: "The model's final generated answer."
  },
  {
    label: "Decision score",
    value: "+0.162",
    note: "Positive means the model leans APPROVE."
  },
  {
    label: "Flip test",
    value: "-7.972",
    note: "Corrupt evidence moved the model to DENY pressure."
  },
  {
    label: "Circuit claim",
    value: "gated",
    note: "Allowed only after sufficiency, necessity, minimality, and controls."
  }
]

export const wowFindings = [
  {
    label: "Hidden margin drop",
    value: "-0.407",
    title: "The answer stayed HIRE, but the model became less willing to hire.",
    detail:
      "A normal output log says nothing changed. Holmes shows the internal hire-vs-reject pressure moved against the proxy group."
  },
  {
    label: "Boundary evidence",
    value: "-7.972",
    title: "A controlled evidence change flips the decision pressure.",
    detail:
      "The report does not stop at final text. It measures the decision boundary directly through token-family logit margins."
  },
  {
    label: "Circuit intervention",
    value: "+0.278",
    title: "Putting selected internal states back restores the decision.",
    detail:
      "This is the scarce evidence buyers cannot get from dashboards: changing the claimed internal signal changes the model's decision."
  },
  {
    label: "False-proof gate",
    value: "reject",
    title: "If random nodes can pass, Holmes refuses the certificate.",
    detail:
      "The product is designed to say REVIEW instead of inventing a beautiful story when the causal evidence is weak."
  }
]

export const reportPanels = [
  {
    title: "What the customer normally sees",
    items: ["Prompt", "Model name", "Final answer", "Timestamp"],
    verdict: "Not enough for audit"
  },
  {
    title: "What Holmes adds",
    items: [
      "Decision-margin pressure",
      "Matched-pair proxy shift",
      "Layer timing",
      "Patch and ablation tests",
      "Negative-control gate"
    ],
    verdict: "Defensible evidence pack"
  }
]

export const biasAuditRows = [
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

export const useCases = [
  {
    title: "Banks and lenders",
    trigger: "Credit decisions need specific reasons and model-risk evidence.",
    artifact: "Decision proof certificate plus adverse-action trace",
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

export const agenticLayers = [
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
  }
]

export const regulations = [
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
    name: "NIST AI RMF",
    region: "Enterprise standard",
    need:
      "A governance framework for mapping, measuring, managing, and governing AI risks.",
    link: "https://www.nist.gov/itl/ai-risk-management-framework"
  }
]

export const papers = [
  {
    title: "Qwen-Scope: Turning Sparse Features into Development Tools for Large Language Models",
    year: "2026",
    why: "Directly relevant to Holmes because it turns Qwen sparse features into practical debugging and steering tools.",
    link: "https://arxiv.org/abs/2605.11887"
  },
  {
    title: "Mechanistic Interpretability of ASR Models Using Sparse Autoencoders",
    year: "2026",
    why: "Shows SAE-style interpretability expanding beyond text LLMs into speech models, strengthening the product's multi-modal future.",
    link: "https://arxiv.org/abs/2605.12225"
  },
  {
    title: "Language Model Circuits Are Sparse in the Neuron Basis",
    year: "2026",
    why: "Argues that causal circuits can be traced without always training SAEs, which supports faster white-box product paths.",
    link: "https://arxiv.org/abs/2601.22594"
  },
  {
    title: "Mechanistic Data Attribution",
    year: "2026",
    why: "Connects interpretable units back to training examples, pointing toward future root-cause reports beyond one prompt.",
    link: "https://arxiv.org/abs/2601.21996"
  },
  {
    title: "Taming OpenClaw: Security Analysis and Mitigation of Autonomous LLM Agent Threats",
    year: "2026",
    why: "Frames agent safety across initialization, input, inference, decision, and execution, matching Holmes' agent audit story.",
    link: "https://arxiv.org/abs/2603.11619"
  },
  {
    title: "OpenClaw PRISM: A Runtime Security Layer for Tool-Augmented LLM Agents",
    year: "2026",
    why: "Supports the idea that agent audit has to cover tool execution, persistence, outbound messages, and sub-agent spawning.",
    link: "https://arxiv.org/abs/2603.11853"
  },
  {
    title: "Circuit Tracing: Revealing Computational Graphs in Language Models",
    year: "2025",
    why: "The clearest public reference for tracing and validating feature-level computational graphs in language models.",
    link: "https://transformer-circuits.pub/2025/attribution-graphs/methods.html"
  },
  {
    title: "Causal Abstraction: A Theoretical Foundation for Mechanistic Interpretability",
    year: "2025",
    why: "Gives a formal language for activation patching, causal mediation, circuit analysis, SAEs, and graded faithfulness.",
    link: "https://www.jmlr.org/papers/v26/23-0058.html"
  },
  {
    title: "MIB: A Mechanistic Interpretability Benchmark",
    year: "2025",
    why: "Supports the Holmes benchmark-validation roadmap: circuit localization and causal-variable localization need measured tests.",
    link: "https://arxiv.org/abs/2504.13151"
  },
  {
    title: "SAEBench: A Comprehensive Benchmark for Sparse Autoencoders",
    year: "2025",
    why: "Useful for showing investors that SAE quality itself needs benchmarked evaluation, not just attractive feature labels.",
    link: "https://arxiv.org/abs/2503.09532"
  },
  {
    title: "CE-Bench: Reliable Contrastive Evaluation of Sparse Autoencoders",
    year: "2025",
    why: "A newer benchmark angle for testing whether SAE explanations align with contrastive interpretability evaluations.",
    link: "https://arxiv.org/abs/2509.00691"
  },
  {
    title: "Mechanistic Interpretability of Code Correctness in LLMs via Sparse Autoencoders",
    year: "2025",
    why: "Shows practical safety value: SAE directions can act like developer-review alarms for code correctness.",
    link: "https://arxiv.org/abs/2510.02917"
  },
  {
    title: "Weight-Sparse Transformers Have Interpretable Circuits",
    year: "2025",
    why: "Important because it studies models designed for human-understandable circuits and rigorous validation.",
    link: "https://arxiv.org/abs/2511.13653"
  },
  {
    title: "Scaling Monosemanticity",
    year: "2024",
    why: "A frontier-scale reference for extracting sparse, interpretable features from production-scale models.",
    link: "https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html"
  }
]
