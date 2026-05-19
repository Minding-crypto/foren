# Holmes Regulated Bank Deployment Architecture

Holmes should be deployed as a private evidence layer beside the bank's approved
model environment. The safest default is no prompt, model weight, or regulated
record leaves the bank-controlled boundary.

## Recommended Topology

- Control plane: customer-managed or Holmes-hosted metadata plane with no raw
  prompts or weights.
- Local runner: VPC or on-prem process that executes the model and analyzer.
- Artifact vault: customer S3, Azure Blob, GCS, SharePoint, or internal evidence
  repository.
- CI/CD gate: deployment pipeline blocks releases when policy thresholds fail.
- Reviewer workflow: Jira, ServiceNow, Slack, email, or existing model-risk
  workflow receives the evidence packet.

## Bank-Grade Gates

- Known-rule benchmark pass rate above policy threshold.
- No FDR-significant protected-proxy pressure above policy threshold.
- No high-risk prompt boundary cases without reviewer sign-off.
- Mechanistic certificates only for open-weight models with exact local access.
- Black-box providers receive behavioral certificates only.
- Every legal-grade claim requires third-party validation.

