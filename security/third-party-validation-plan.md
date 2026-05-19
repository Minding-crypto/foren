# Holmes Third-Party Validation Plan

Holmes can produce strong evidence, but legal-grade certification should be
validated by an independent reviewer before external legal or regulatory use.

## Validation Package

- Locked model checkpoint or provider version.
- Locked prompt family and contrast construction rules.
- Pre-registered decision metric and pass/fail thresholds.
- Benchmark cases with expected outputs and risk tiers.
- Negative controls: random same-size circuits, wrong-target controls, shuffled
  labels, and null prompts.
- Reproduction instructions and artifact hashes.

## Validation Questions

- Does the benchmark reproduce on a clean machine?
- Do random circuits fail at the expected false-positive rate?
- Are refused certificates correctly labeled as refusals?
- Are black-box reports clearly separated from mechanistic reports?
- Are legal and causal claims bounded to the tested model, prompt family, and
  decision metric?

