export const navItems = [
  { label: "Platform", href: "/platform" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Docs", href: "/docs" },
  { label: "Integrations", href: "/integrations" },
  { label: "Insights", href: "/insights" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Benchmark", href: "/benchmark" },
  { label: "Pilot", href: "/pilot" },
  { label: "Trust", href: "/trust" },
  { label: "Research", href: "/research" }
]

export const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Evidence insights", href: "/insights" },
      { label: "Developer docs", href: "/docs" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Pilot program", href: "/pilot" },
      { label: "Policy gates", href: "/policy" },
      { label: "Integrations", href: "/integrations" }
    ]
  },
  {
    title: "Evidence",
    links: [
      { label: "Mechanistic proof", href: "/proof" },
      { label: "Example report", href: "/example" },
      { label: "Benchmark validation", href: "/benchmark" },
      { label: "Trust controls", href: "/trust" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Research", href: "/research" },
      { label: "Buyers", href: "/buyers" },
      { label: "One-page briefs", href: "/enterprise#one-pagers" },
      { label: "API runner", href: "/platform" },
      { label: "Governance add-on", href: "/integrations" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Start a pilot", href: "/pilot" },
      { label: "Security posture", href: "/trust" },
      { label: "Contact", href: "mailto:founders@veridion.ai" },
      { label: "Privacy", href: "/trust" }
    ]
  }
]

export const legalLinks = [
  { label: "Privacy Policy", href: "/trust" },
  { label: "Terms of Service", href: "/trust" },
  { label: "Responsible Disclosure", href: "/trust" }
]

export const onePagers = [
  {
    title: "AI agent safety",
    href: "/one-pagers/veridion-ai-agent-safety.pdf",
    detail:
      "How Veridion audits tool-calling agents before they spend money, send messages, update records, or call external APIs."
  },
  {
    title: "Hiring AI bias pressure",
    href: "/one-pagers/veridion-hiring-bias-pressure.pdf",
    detail:
      "Matched-pair proxy testing for cases where the visible output is unchanged but the internal decision margin shifts."
  },
  {
    title: "Open-weight mechanistic certification",
    href: "/one-pagers/veridion-open-weight-mechanistic-certification.pdf",
    detail:
      "The bounded white-box certificate: decision readout, activation patching, sufficiency, necessity, and controls."
  }
]

export const enterpriseTracks = [
  {
    title: "Self-serve enterprise SaaS",
    status: "buildable now",
    detail:
      "Teams start with a hosted control plane, API keys, a policy file, a local runner, and a report registry. Sensitive prompts and weights stay inside the customer's environment.",
    artifact: "API workspace, runner token, policy gate, evidence registry"
  },
  {
    title: "SOC 2-heavy procurement",
    status: "readiness track",
    detail:
      "The product needs audit logs, least-privilege access, SSO/SAML, encryption, retention controls, vendor questionnaires, subprocessors, and incident-response evidence.",
    artifact: "security packet, control matrix, data-flow diagram, audit log export"
  },
  {
    title: "Regulated bank deployment",
    status: "private deployment",
    detail:
      "Banks should run Veridion in their VPC or on-prem next to approved models. The gate produces model-risk evidence without sending PII or weights to Veridion.",
    artifact: "VPC runner, artifact vault, MRM review packet, change-control gate"
  },
  {
    title: "Legal-grade certification",
    status: "third-party required",
    detail:
      "Veridion can produce the evidence bundle, but legal-grade claims need independent validation, locked protocols, expert review, and signed scope boundaries.",
    artifact: "validation protocol, expert packet, signed claim boundary, audit trail"
  },
  {
    title: "Broad black-box coverage",
    status: "behavioral tier",
    detail:
      "Without weights, Veridion cannot certify internal circuits. It can still run scalable behavioral certificates: matched-pair bias, counterfactual robustness, regression drift, and refusal logs.",
    artifact: "behavioral certificate with confidence tier and explicit non-mechanistic scope"
  }
]

export const enterpriseControls = [
  {
    control: "Data boundary",
    evidence:
      "Customer prompts, weights, and reports can remain inside a local runner, VPC, or private storage bucket."
  },
  {
    control: "Access control",
    evidence:
      "SSO/SAML, role-based access, report-level permissions, API tokens, and privileged-action logging."
  },
  {
    control: "Auditability",
    evidence:
      "Every certificate stores model ID, prompt family, metric, gate thresholds, negative controls, hashes, and replay metadata."
  },
  {
    control: "Change management",
    evidence:
      "Prompt, RAG, policy, and model updates run regression suites before deployment gates allow release."
  },
  {
    control: "Third-party validation",
    evidence:
      "Independent statisticians or auditors rerun benchmark protocols and sign the claim scope before legal-grade use."
  },
  {
    control: "Black-box limits",
    evidence:
      "Black-box reports are labeled behavioral. Mechanistic language is reserved for open-weight runs with activation interventions."
  }
]

export const enterpriseRollout = [
  {
    phase: "Week 1",
    title: "Self-serve pilot",
    detail:
      "Install local runner, add 20-50 benchmark prompts, run policy gates, and produce the first evidence packet."
  },
  {
    phase: "Weeks 2-4",
    title: "Workflow integration",
    detail:
      "Connect CI/CD, registry storage, Slack/Jira review, and model-update regression checks."
  },
  {
    phase: "Month 2",
    title: "Procurement packet",
    detail:
      "Prepare security architecture, control mapping, data retention, access review, and incident-response procedures."
  },
  {
    phase: "Month 3+",
    title: "Independent validation",
    detail:
      "Run locked benchmark protocols with a third-party reviewer before making legal-grade or regulated-production claims."
  }
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
      "For open-weight models, Veridion records where the decision signal first appears and where it becomes stable.",
    technical:
      "Residual stream and logit-lens traces over clean and corrupted prompts"
  },
  {
    step: "04",
    title: "Circuit search",
    plain:
      "Veridion searches for internal layer-token states that carry the decision signal.",
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
    detail: "How often Veridion passes sufficiency, necessity, minimality, and negative-control gates."
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
      "A normal output log says nothing changed. Veridion shows the internal hire-vs-reject pressure moved against the proxy group."
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
    title: "If random nodes can pass, Veridion refuses the certificate.",
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
    title: "What Veridion adds",
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
    why: "Directly relevant to Veridion because it turns Qwen sparse features into practical debugging and steering tools.",
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
    why: "Frames agent safety across initialization, input, inference, decision, and execution, matching Veridion' agent audit story.",
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
    why: "Supports the Veridion benchmark-validation roadmap: circuit localization and causal-variable localization need measured tests.",
    link: "https://arxiv.org/abs/2504.13151"
  },
  {
    title: "SAEBench: A Comprehensive Benchmark for Sparse Autoencoders",
    year: "2025",
    why: "Useful for showing that SAE quality itself needs benchmarked evaluation, not just attractive feature labels.",
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
  },
  {
    title: "\"Why Should I Trust You?\" Explaining Any Classifier",
    year: "2016",
    why: "The LIME foundation for local black-box surrogate explanations: useful only when local fidelity is measured.",
    link: "https://arxiv.org/abs/1602.04938"
  },
  {
    title: "A Unified Approach to Interpreting Model Predictions",
    year: "2017",
    why: "The SHAP foundation for Shapley-style feature attribution and additive explanation constraints.",
    link: "https://arxiv.org/abs/1705.07874"
  },
  {
    title: "Anchors: High-Precision Model-Agnostic Explanations",
    year: "2018",
    why: "Adds a black-box sufficiency idea: if an anchor rule holds, the prediction should stay stable with high precision.",
    link: "https://ojs.aaai.org/index.php/AAAI/article/view/11491"
  },
  {
    title: "SelfCheckGPT",
    year: "2023",
    why: "Shows how sampling consistency can detect fragile or non-factual black-box LLM outputs without logprob or weight access.",
    link: "https://arxiv.org/abs/2303.08896"
  },
  {
    title: "ConU: Conformal Uncertainty in Large Language Models",
    year: "2024",
    why: "Supports the black-box confidence tier: self-consistency can be calibrated with conformal coverage guarantees.",
    link: "https://arxiv.org/abs/2407.00499"
  }
]

export const platformModules = [
  {
    title: "Local runner",
    stage: "on-prem execution",
    summary:
      "A lightweight service runs beside the customer's model or inference stack, so weights and sensitive prompts never need to leave their environment.",
    outputs: ["audit job ID", "streamed status", "local report files", "signed JSON artifact"]
  },
  {
    title: "Report registry",
    stage: "evidence storage",
    summary:
      "Every completed audit is indexed by model, prompt hash, decision metric, certificate status, and cryptographic hash.",
    outputs: ["searchable report history", "certificate URL", "JSON/PDF export", "audit ledger"]
  },
  {
    title: "Deployment gate",
    stage: "release control",
    summary:
      "CI/CD can block a model, prompt, RAG, or policy update when the proof disappears, bias pressure rises, or controls fail.",
    outputs: ["pass/fail decision", "blocking reasons", "diff from baseline", "review packet"]
  },
  {
    title: "Customer dashboard",
    stage: "governance workflow",
    summary:
      "Compliance, model-risk, and engineering teams see the same bounded evidence without reading raw tensor logs.",
    outputs: ["executive summary", "mechanistic proof", "bias alerts", "model regression timeline"]
  }
]

export const integrationModes = [
  {
    name: "API mode",
    command: "POST /v1/audits",
    bestFor: "AI vendors and platform teams that want to trigger audits from their app or backend.",
    detail:
      "The customer sends a prompt, model metadata, decision target, and audit mode. Veridion returns a job ID and stores the signed artifact."
  },
  {
    name: "CI/CD gate",
    command: "veridion gate --policy veridion.policy.json",
    bestFor: "Enterprises that need every model or prompt update to pass governance checks before release.",
    detail:
      "A deployment pipeline fails if a required certificate is missing, negative controls fail, or drift exceeds policy thresholds."
  },
  {
    name: "On-prem runner",
    command: "veridion runner --host 127.0.0.1 --port 8787",
    bestFor: "Banks, healthcare, insurance, and hiring vendors that cannot upload weights or regulated prompts.",
    detail:
      "The runner wraps the analyzer locally. A control plane can request certificate metadata without receiving model weights."
  }
]

export const registryReports = [
  {
    id: "forensicai_fb62a5fe",
    domain: "Fraud review",
    model: "Qwen/Qwen2.5-0.5B-Instruct",
    output: "DENY",
    grade: "MECHANISTICALLY CERTIFIED",
    proofLabel: "Certified circuit",
    proofDetail: "Necessary and sufficient",
    proof: "CERTIFIED_NECESSARY_SUFFICIENT",
    controls: "PASS",
    margin: "8.2519 to -0.5788",
    reportPath: "reports/forensicai_fb62a5fe.txt"
  },
  {
    id: "mechanistic_proof_437bb845",
    domain: "Fraud review proof-only",
    model: "Qwen/Qwen2.5-0.5B-Instruct",
    output: "DENY",
    grade: "BOUNDED WHITE-BOX PROOF",
    proofLabel: "Proof-only circuit",
    proofDetail: "Necessary and sufficient",
    proof: "CERTIFIED_NECESSARY_SUFFICIENT",
    controls: "PASS",
    margin: "recovery 0.9922",
    reportPath: "reports/mechanistic_proof_437bb845.txt"
  },
  {
    id: "bias_audit_92725043",
    domain: "Hiring proxy audit",
    model: "Qwen/Qwen2.5-0.5B-Instruct",
    output: "NO SHIFT",
    grade: "NO MATCHED-PAIR SHIFT",
    proofLabel: "Behavioral screen",
    proofDetail: "Proxy shift not detected",
    proof: "behavioral screen",
    controls: "FDR APPLIED",
    margin: "delta +0.1569",
    reportPath: "reports/bias_audit_92725043.txt"
  }
]

export const deploymentGateRules = [
  {
    rule: "Mechanistic proof required",
    threshold: "certified_claim_allowed must be true",
    failure:
      "Blocks deployment when the necessary/sufficient circuit cannot be certified for required prompt families."
  },
  {
    rule: "Negative controls must fail",
    threshold: "random same-size circuits full_pass = 0",
    failure:
      "Blocks beautiful but non-specific explanations where random internal nodes can pass the same proof gate."
  },
  {
    rule: "Bias pressure drift",
    threshold: "proxy margin delta must stay below configured tolerance after FDR correction",
    failure:
      "Escalates model updates that keep the visible answer but shift internal decision pressure against a protected proxy."
  },
  {
    rule: "Regression stability",
    threshold: "decision margin and certified nodes must remain within version policy",
    failure:
      "Flags silent logic drift after model, prompt, RAG, or policy changes."
  }
]

export const mechanisticEvidenceStandard = [
  {
    gate: "Open-weight access",
    plain:
      "The certificate only applies when Veridion can inspect the exact model tensors used for the decision.",
    technical: "same deployed checkpoint + tokenizer + deterministic decision readout"
  },
  {
    gate: "Exact decision readout",
    plain:
      "The output is converted into a direct approve-vs-deny style margin instead of a vague text similarity score.",
    technical: "logsumexp(target decision tokens) - logsumexp(opposite decision tokens)"
  },
  {
    gate: "Clean/corrupt contrast",
    plain:
      "Veridion needs a controlled evidence change that moves the model across the decision boundary.",
    technical: "clean margin, corrupt margin, and contrast gap exceed threshold"
  },
  {
    gate: "Circuit sufficiency",
    plain:
      "Putting the selected clean internal states into the corrupt run must restore the decision.",
    technical: "activation patching recovery >= policy threshold"
  },
  {
    gate: "Circuit necessity",
    plain:
      "Removing or replacing the selected internal states from the clean run must destroy the decision.",
    technical: "clean-to-corrupt ablation destroys target margin"
  },
  {
    gate: "Minimality",
    plain:
      "Every certified internal node has to earn its place; unnecessary nodes are removed.",
    technical: "node knock-out causes measurable recovery or necessity drop"
  },
  {
    gate: "Negative controls",
    plain:
      "Random same-size circuits and wrong controls must fail, or the certificate is rejected.",
    technical: "random full-proof pass count = 0 and empirical p-value <= policy"
  }
]

export const blackBoxEvidenceStandard = [
  {
    gate: "Repeated query protocol",
    plain:
      "A single API answer is too weak. Veridion samples coalitions, paraphrases, and repeated calls so the result has measured variance.",
    technical: "n_coalitions >= 64 and repeated samples per coalition >= 5 by default"
  },
  {
    gate: "Attribution cross-check",
    plain:
      "Shapley and LIME must point to compatible evidence. If they disagree, Veridion refuses a single-factor story.",
    technical: "SHAP/LIME top factor agreement or rank agreement, with confidence intervals"
  },
  {
    gate: "Local surrogate fidelity",
    plain:
      "The simple explanation model must actually match the black-box model near this prompt.",
    technical: "local R² / fidelity score >= policy threshold"
  },
  {
    gate: "Paraphrase stability",
    plain:
      "The answer should survive harmless wording changes if the explanation is robust.",
    technical: "self-consistency and semantic similarity over prompt variants"
  },
  {
    gate: "Counterfactual boundary",
    plain:
      "Veridion searches for the smallest meaningful input change that flips or weakens the answer.",
    technical: "semantic flip probes, minimum tested boundary count, robustness score"
  },
  {
    gate: "Conformal confidence",
    plain:
      "For high-confidence black-box claims, sampled uncertainty must be calibrated on a held-out prompt set.",
    technical: "self-consistency score + conformal coverage criterion"
  },
  {
    gate: "Artifact integrity",
    plain:
      "Every black-box run is anchored so customers can replay the exact query protocol and compare versions.",
    technical: "hash, timestamp, prompt family, provider/model, query settings, thresholds"
  }
]

export const apiFlow = [
  {
    method: "POST",
    endpoint: "/v1/audits",
    purpose: "Start a white-box proof, full report, bias audit, or benchmark run."
  },
  {
    method: "GET",
    endpoint: "/v1/audits/{id}",
    purpose: "Poll status while the runner executes the local analyzer."
  },
  {
    method: "GET",
    endpoint: "/v1/audits/{id}/result",
    purpose: "Return the job, candidate report, certificate, policy result, and buyer-readable review."
  },
  {
    method: "GET",
    endpoint: "/v1/reports",
    purpose: "List completed report artifacts from the local registry."
  },
  {
    method: "POST",
    endpoint: "/v1/gates/evaluate",
    purpose: "Return pass/fail for a deployment based on certificate policy."
  },
  {
    method: "POST",
    endpoint: "/v1/certificates/mechanistic-evidence",
    purpose: "Return the formal bounded mechanistic evidence certificate for a report."
  },
  {
    method: "POST",
    endpoint: "/v1/certificates/blackbox-behavioral",
    purpose: "Return the formal black-box behavioral evidence certificate for a sampled query-protocol report."
  },
  {
    method: "POST",
    endpoint: "/v1/client-review",
    purpose: "Translate the certificate into a pilot, release, or review verdict."
  },
  {
    method: "POST",
    endpoint: "/v1/blackbox-review",
    purpose: "Translate a black-box report into a behavioral monitoring verdict without claiming internal mechanisms."
  },
  {
    method: "POST",
    endpoint: "/v1/insights",
    purpose: "Translate certificate math into buyer-ready findings, release decisions, risks, and remediation steps."
  }
]

export const policyRules = [
  {
    rule: "Require mechanistic certificate",
    path: "mechanistic.claim_allowed",
    threshold: "true for high-risk open-weight decisions",
    buyerMeaning:
      "A release cannot ship unless Veridion verified the bounded internal circuit claim."
  },
  {
    rule: "Reject weak controls",
    path: "negative_controls.empirical_p_value",
    threshold: "<= 0.05 and random full-proof pass count = 0",
    buyerMeaning:
      "Random circuits cannot pass the same proof gate. This protects against beautiful false explanations."
  },
  {
    rule: "Block hidden bias pressure",
    path: "bias_pressure.max_fdr_significant_delta",
    threshold: "absolute delta <= 0.25 unless reviewed",
    buyerMeaning:
      "The final answer can stay the same, but the hidden margin cannot quietly move against a protected proxy."
  },
  {
    rule: "Catch model update drift",
    path: "regression.decision_margin_delta",
    threshold: "<= 0.50 from approved baseline",
    buyerMeaning:
      "Model, prompt, RAG, or policy updates cannot silently rewrite decision behavior."
  },
  {
    rule: "Escalate agentic actions",
    path: "agent_action.risk_tier",
    threshold: "payment, email, deletion, external API calls require certificate or human review",
    buyerMeaning:
      "AI agents get audited when they act, not only when they answer."
  }
]

export const dashboardQueue = [
  {
    id: "release-qwen-fraud-042",
    owner: "Risk AI",
    status: "PASS",
    risk: "high",
    model: "Qwen2.5 local",
    finding: "Mechanistic certificate valid; controls passed; deployment allowed."
  },
  {
    id: "hiring-agent-v18",
    owner: "People AI",
    status: "BLOCK",
    risk: "critical",
    model: "Open-weight agent router",
    finding: "Hidden bias pressure exceeded policy after prompt update."
  },
  {
    id: "claims-rag-refresh",
    owner: "Insurance Ops",
    status: "REVIEW",
    risk: "medium",
    model: "RAG policy assistant",
    finding: "Decision margins stable, but retrieval influence changed on 3 benchmark cases."
  },
  {
    id: "support-agent-tools",
    owner: "Trust and Safety",
    status: "REVIEW",
    risk: "medium",
    model: "Tool-calling agent",
    finding: "External refund tool selected near boundary; human review required."
  }
]

export const dashboardMetrics = [
  {
    label: "Audits this week",
    value: "184",
    detail: "scheduled, CI-triggered, and incident runs"
  },
  {
    label: "Blocked releases",
    value: "7",
    detail: "policy violations caught before deployment",
    tone: "danger"
  },
  {
    label: "Certified circuits",
    value: "31",
    detail: "bounded white-box proofs with controls",
    tone: "success"
  },
  {
    label: "Proxy alerts",
    value: "12",
    detail: "same output, shifted internal pressure",
    tone: "warning"
  }
]

export const integrationTiles = [
  {
    name: "GitHub Actions",
    type: "CI/CD gate",
    detail:
      "Run Veridion on pull requests that change prompts, model IDs, RAG corpora, policies, or agent tool permissions.",
    artifact: "release pass/fail, report URL, blocking reasons"
  },
  {
    name: "MLflow / model registry",
    type: "model lifecycle",
    detail:
      "Attach certificates to model versions so reviewers can compare margins, bias pressure, and circuit stability.",
    artifact: "model-version evidence pack"
  },
  {
    name: "LangSmith / agent traces",
    type: "agent telemetry",
    detail:
      "Escalate high-risk traces into decision forensics when an agent calls tools, sends messages, or changes records.",
    artifact: "agent action evidence trace"
  },
  {
    name: "ValidMind / ModelOp / Monitaur",
    type: "governance add-on",
    detail:
      "Push Veridion certificate status into existing governance workflows instead of forcing a rip-and-replace migration.",
    artifact: "mechanistic evidence attachment"
  },
  {
    name: "Slack / Jira",
    type: "review workflow",
    detail:
      "Create review tickets when a gate blocks deployment or a benchmark catches silent drift.",
    artifact: "review packet and owner assignment"
  },
  {
    name: "S3 / Azure Blob / local vault",
    type: "evidence storage",
    detail:
      "Store signed JSON, text, hashes, and replay metadata in the customer's existing evidence repository.",
    artifact: "tamper-evident artifact bundle"
  }
]

export const benchmarkSuites = [
  {
    suite: "Known-rule decisions",
    coverage: "loan, fraud, hiring, insurance, triage",
    metric: "expected output + decision margin",
    why:
      "Proves the model follows the declared rule before Veridion attempts a mechanistic certificate."
  },
  {
    suite: "Prompt boundary finder",
    coverage: "near-flip, contradictory, ambiguous, adversarial prompts",
    metric: "margin distance to flip",
    why:
      "Finds fragile cases worth investigating instead of wasting compute on easy prompts."
  },
  {
    suite: "Bias pressure monitor",
    coverage: "matched proxy pairs and protected-name libraries",
    metric: "FDR-corrected hidden margin delta",
    why:
      "Finds cases where visible outputs remain acceptable while internal pressure shifts."
  },
  {
    suite: "Mechanistic proof yield",
    coverage: "open-weight model checkpoints and prompt families",
    metric: "sufficiency, necessity, minimality, controls",
    why:
      "Measures how often Veridion can certify a bounded internal circuit and when it refuses."
  },
  {
    suite: "Negative-control audit",
    coverage: "random circuits, wrong targets, shuffled labels",
    metric: "false-positive rate",
    why:
      "Builds customer trust by proving Veridion rejects fake mechanistic stories."
  },
  {
    suite: "Model update regression",
    coverage: "before/after model, prompt, RAG, and policy releases",
    metric: "margin drift + circuit drift + proxy drift",
    why:
      "Shows buyers exactly what changed before a release reaches users."
  }
]

export const releaseTimeline = [
  {
    step: "1",
    title: "Developer opens PR",
    detail: "Prompt, model, RAG corpus, tool permission, or policy file changed."
  },
  {
    step: "2",
    title: "Veridion runs cheap screens",
    detail: "Black-box behavior, known-rule tests, boundary distance, and bias pressure run first."
  },
  {
    step: "3",
    title: "Risky cases escalate",
    detail: "Only high-risk or fragile open-weight decisions run the full mechanistic proof."
  },
  {
    step: "4",
    title: "Deployment gate decides",
    detail: "CI passes, blocks, or creates a review ticket with the evidence packet attached."
  }
]

export const productPackages = [
  {
    name: "Veridion Local",
    buyer: "AI startups using open-weight or Ollama/Hugging Face models",
    promise: "Run audits privately, generate JSON/PDF artifacts, and learn which high-risk prompts are certifiable.",
    includes: ["local runner", "mechanistic proof mode", "bias pressure screen", "signed local artifacts"],
    price: "$299-$999/mo pilot target"
  },
  {
    name: "Veridion Team",
    buyer: "Teams with model, prompt, RAG, or agent releases",
    promise: "Add a report registry, release gates, benchmark suites, and model-update regression checks.",
    includes: ["dashboard", "registry", "CI/CD gate", "prompt boundary finder", "benchmark validation"],
    price: "$2k-$8k/mo target"
  },
  {
    name: "Veridion Enterprise",
    buyer: "Regulated AI teams, banks, HR tech, insurance, healthcare, and governance platforms",
    promise: "Deploy inside a VPC or on-prem environment and attach Veridion evidence to existing governance workflows.",
    includes: ["private deployment", "SSO/SAML path", "artifact vault", "procurement packet", "third-party validation plan"],
    price: "$25k-$150k/yr target"
  }
]

export const pilotOutcomes = [
  {
    label: "First 48 hours",
    value: "Runner live",
    detail: "Install the private runner, connect one local model, and run a known-rule smoke suite."
  },
  {
    label: "First week",
    value: "20 cases",
    detail: "Audit a focused prompt family for decision margins, bias pressure, drift, and proof eligibility."
  },
  {
    label: "Pilot close",
    value: "Evidence pack",
    detail: "Deliver a signed artifact bundle, executive readout, release policy, and next-step integration plan."
  }
]

export const pilotDeliverables = [
  {
    title: "Private runner setup",
    detail:
      "Veridion runs beside the customer's model. Their prompts, weights, and raw reports can stay inside their environment.",
    proof: "local API health check plus first report registry entry"
  },
  {
    title: "Prompt-family evidence suite",
    detail:
      "The customer picks a real high-risk workflow: hiring, lending, fraud, claims, support agents, or compliance review.",
    proof: "20-50 prompt cases with expected decision families and policy thresholds"
  },
  {
    title: "Bias pressure and boundary scan",
    detail:
      "Veridion searches for same-output hidden margin shifts, fragile prompts, contradictory instruction failures, and near flips.",
    proof: "ranked risk list with FDR-adjusted proxy findings where applicable"
  },
  {
    title: "White-box proof attempts",
    detail:
      "For open-weight cases that pass the setup gates, Veridion tests layer timing, circuit sufficiency, necessity, minimality, and controls.",
    proof: "certificate, review, or refusal with exact failed gates"
  },
  {
    title: "Release gate policy",
    detail:
      "A simple policy file turns the evidence into an operational decision: allow, block, or review.",
    proof: "CI-ready policy thresholds and example gate response"
  },
  {
    title: "Executive buyer packet",
    detail:
      "The final packet explains what was proven, what was not proven, and what the customer should do before production.",
    proof: "board-style summary plus signed JSON artifact plus audit trail"
  }
]

export const pilotIdealCustomers = [
  {
    title: "Open-weight AI startups",
    pain:
      "They sell AI decisions but cannot show buyers what happened inside the model when a risky answer was produced.",
    close:
      "Veridion gives them a private evidence layer they can show during enterprise sales and security review."
  },
  {
    title: "Agentic AI products",
    pain:
      "Agents choose tools, call APIs, and update records. A chat transcript is not enough after a bad action.",
    close:
      "Veridion turns high-risk agent actions into decision evidence with release gates and incident replay."
  },
  {
    title: "Hiring, lending, insurance, and healthcare AI",
    pain:
      "These teams face bias, stability, and audit questions before customers, regulators, or legal teams trust them.",
    close:
      "Veridion checks visible decisions, hidden pressure shifts, and model-update drift before deployment."
  },
  {
    title: "AI governance platforms",
    pain:
      "They own inventory and policy workflows, but usually do not inspect the internal mechanism of open-weight models.",
    close:
      "Veridion becomes the mechanistic evidence attachment for their existing governance stack."
  }
]

export const pilotAcceptanceCriteria = [
  {
    gate: "Evidence generated",
    threshold: "At least 20 customer-relevant cases produce replayable report artifacts."
  },
  {
    gate: "Policy decision",
    threshold: "Each case is labeled allow, review, block, or not certifiable with a reason."
  },
  {
    gate: "Controls included",
    threshold: "Strong claims require negative controls, minimality checks, and failed random-node controls."
  },
  {
    gate: "Buyer handoff",
    threshold: "The customer receives dashboard records, JSON evidence, PDF summary, and integration commands."
  }
]

export const salesProofPoints = [
  {
    claim: "Not another governance checklist",
    evidence:
      "Veridion produces model-specific evidence: decision margins, intervention tests, circuit gates, proxy pressure, and release decisions."
  },
  {
    claim: "Private by default",
    evidence:
      "A customer can run the analyzer next to their own model without uploading weights or raw regulated prompts."
  },
  {
    claim: "Strong claims are bounded",
    evidence:
      "If Veridion cannot prove a circuit, it says review or not certifiable instead of inventing a mechanistic story."
  },
  {
    claim: "Operational, not academic",
    evidence:
      "The output is a gate, registry entry, and buyer packet that compliance, engineering, and sales teams can use."
  }
]

export const insightCapabilities = [
  {
    title: "Release decision",
    buyerQuestion: "Can this ship?",
    answer:
      "Veridion converts gates into allow, review, block, or waiting-for-report so teams do not have to interpret raw tensors."
  },
  {
    title: "Claim boundary",
    buyerQuestion: "What can we safely say?",
    answer:
      "The insight layer states exactly what is certified and what is not: internal circuits for open-weight proofs, behavioral gates for black-box reports."
  },
  {
    title: "Hidden risk",
    buyerQuestion: "What did the normal dashboard miss?",
    answer:
      "Veridion surfaces hidden pressure shifts, unstable paraphrases, weak contrast cases, missing calibration, and random-control failures."
  },
  {
    title: "Remediation",
    buyerQuestion: "What do we fix next?",
    answer:
      "Every failed gate becomes an action: more repeated queries, stronger clean/corrupt contrast, calibration set, boundary probes, or prompt-family expansion."
  }
]

export const insightDemoCards = [
  {
    label: "Passing black-box packet",
    status: "ALLOW BEHAVIORAL GATE",
    headline: "The closed model passed repeated-query, attribution, paraphrase, boundary, calibration, and artifact gates.",
    details: [
      "Top factor matched across Shapley and LIME: delinquency=no.",
      "Paraphrase consistency: 0.9167.",
      "Faithfulness rate: 0.90.",
      "Counterfactual boundary robustness: 0.8333."
    ],
    action: "Attach this bounded behavioral certificate to monitoring, release review, and incident response."
  },
  {
    label: "Weak black-box packet",
    status: "REVIEW REQUIRED",
    headline: "The report had useful signals but Veridion refused certification.",
    details: [
      "Shapley and LIME agreed on France.",
      "Repeated query protocol was too small.",
      "Paraphrase consistency was only 0.60.",
      "Calibration and boundary tests were missing."
    ],
    action: "Increase samples, add calibration, add boundary probes, then rerun."
  },
  {
    label: "Open-weight packet",
    status: "CERTIFY OR REFUSE",
    headline: "For local models, Veridion can escalate from behavioral evidence to activation-intervention evidence.",
    details: [
      "Decision margin is measured directly.",
      "Layer timing shows when the signal appears.",
      "Patch tests measure sufficiency.",
      "Ablation and negative controls protect against false circuits."
    ],
    action: "Use the insight layer to decide whether the artifact is release-ready, diagnostic-only, or blocked."
  }
]

export const insightCommands = [
  {
    title: "Passing behavioral insight",
    command: "veridion insights examples/evidence-insights-blackbox-passing.json",
    result: "deployment_decision = allow_behavioral_gate"
  },
  {
    title: "Review-required behavioral insight",
    command: "veridion insights examples/evidence-insights-blackbox-review.json",
    result: "deployment_decision = review_required with exact failed gates"
  },
  {
    title: "Direct report insight",
    command: "veridion insights-report blackbox_3334dd74",
    result: "returns the buyer summary, hidden risks, fixes, and artifact hash"
  }
]

export const customerWorkflow = [
  {
    step: "1",
    title: "Connect model",
    detail: "Point Veridion at a local/open-weight model, Ollama endpoint, or black-box API tier."
  },
  {
    step: "2",
    title: "Upload prompt suite",
    detail: "Add high-risk prompts, expected decision families, policy file, and protected proxy libraries."
  },
  {
    step: "3",
    title: "Run cheap screens first",
    detail: "Boundary, bias-pressure, known-rule, drift, and black-box behavioral screens decide what deserves expensive proof."
  },
  {
    step: "4",
    title: "Escalate white-box proof",
    detail: "Open-weight decisions run activation patching, sufficiency, necessity, minimality, and negative controls."
  },
  {
    step: "5",
    title: "Issue or withhold certificate",
    detail: "Veridion creates a signed artifact only inside the bounded claim scope; weak proof becomes review, not marketing copy."
  },
  {
    step: "6",
    title: "Gate release",
    detail: "CI/CD, governance workflows, or incident response consume the certificate and decide pass, block, or review."
  }
]

export const runnerCommands = [
  {
    title: "Start local web product",
    command: "npm.cmd run dev -- --hostname 127.0.0.1 --port 3001",
    detail: "Runs the buyer dashboard and docs locally."
  },
  {
    title: "Start private runner API",
    command: "veridion runner --host 127.0.0.1 --port 8787",
    detail: "Runs the local API wrapper around the private analyzer. Weights and prompts stay local."
  },
  {
    title: "Start a mechanistic proof audit",
    command: "veridion audit examples/audit-request.mechanistic.json",
    detail: "Submits a white-box proof job to the runner and returns an audit job ID."
  },
  {
    title: "List reports",
    command: "veridion reports",
    detail: "Shows the report registry from the local reports folder."
  },
  {
    title: "Evaluate a release gate",
    command: "veridion gate examples/gate-request.json",
    detail: "Checks whether a report passes the configured release policy."
  },
  {
    title: "Export a certificate object",
    command: "veridion certificate mechanistic_proof_437bb845",
    detail: "Returns the bounded mechanistic evidence certificate JSON for a report."
  },
  {
    title: "Export a black-box behavioral certificate",
    command: "veridion blackbox-certificate blackbox_ab94f40b",
    detail: "Returns the bounded behavioral evidence certificate for a black-box API report."
  },
  {
    title: "Demo a passing black-box evidence gate",
    command: "veridion blackbox-review examples/blackbox-behavioral-passing-review.json",
    detail: "Shows the BBEC-0.1 positive path when every required behavioral gate is present."
  },
  {
    title: "Ask the buyer-readiness question",
    command: "veridion review examples/client-review-request.json",
    detail: "Returns whether the artifact is pilot-ready, release-ready, or review-only."
  },
  {
    title: "Review black-box readiness",
    command: "veridion blackbox-review examples/blackbox-review-request.json",
    detail: "Shows the honest refusal path when a black-box report is useful but not certifiable yet."
  }
]
