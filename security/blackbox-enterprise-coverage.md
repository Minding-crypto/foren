# Holmes Black-Box Enterprise Coverage

Black-box models can be audited at scale, but they cannot receive the same
mechanistic certification as open-weight models because Holmes cannot intervene
on internal activations.

## Supported Black-Box Evidence

- Matched-pair bias pressure using output probabilities when available.
- Behavioral counterfactual robustness.
- Prompt boundary and close-to-flip discovery.
- Model update regression.
- Refusal and policy-compliance tracking.
- Signed behavioral evidence artifacts.

## Required Label

Every black-box report should say: behavioral certificate, not mechanistic
certificate.

## Useful Buyer Outcome

Even without weights, companies can identify unstable prompts, hidden proxy
shifts, output drift after model upgrades, and high-risk agent actions before
deployment.

