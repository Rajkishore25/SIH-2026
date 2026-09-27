# MRPL Confidential Industrial Workcell

Synthetic prototype for a trusted, local-first multimodal maintenance workcell.

## Demo session

- Username: `engineer.a`
- Password: `demo123`
- Seeded workcell: `WC-P204A-001`
- Scenario: Pump P-204A Replacement Analysis

The frontend uses deterministic in-browser data and `localStorage` for the session and workcell progression. It makes no external AI or data calls.

## Main path

Sign in → initiate a task → enter the asset/project, purpose, classification, and required documents → create the scoped Workcell → review evidence admission → inspect the selected workflow and tools → execute → review the high-severity exception → approve → verify → export the verified work package as a PDF → release → optionally simulate output modification to see approval invalidation and release blocking.

The P-204A scenario is available through **Load P-204A demo** on the task input screen. Local PDF, image, and spreadsheet filenames can be added through the evidence picker; extraction is represented deterministically for the prototype and no uploaded bytes leave the browser.