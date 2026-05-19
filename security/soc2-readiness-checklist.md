# Holmes SOC 2 Readiness Checklist

This is a readiness checklist, not a SOC 2 attestation. A formal SOC 2 report
requires an independent auditor and an observation period.

## Controls to Implement

- Access control: SSO/SAML, MFA, role-based permissions, API token rotation.
- Audit logging: immutable logs for audit creation, report access, policy gate
  changes, certificate export, and administrator actions.
- Data boundary: customer prompts, weights, reports, and PII can stay inside a
  local runner, VPC, or customer-owned storage bucket.
- Encryption: TLS in transit, encryption at rest for registry metadata and
  artifacts, customer-managed keys where required.
- Change management: all model, prompt, RAG, and policy updates create a
  before/after evidence packet.
- Incident response: documented response workflow for incorrect certificate,
  leaked artifact, unauthorized access, or failed control.
- Vendor packet: subprocessors, data-flow diagram, retention policy,
  penetration-test plan, vulnerability disclosure, and backup policy.

## Evidence Holmes Should Export

- Audit log CSV or JSONL.
- Signed report bundle hashes.
- Policy gate decision and reasons.
- User, timestamp, model ID, prompt family, and certificate scope.
- Negative-control results and refusal reasons.

