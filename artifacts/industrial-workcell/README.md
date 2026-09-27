# MRPL Confidential Industrial Workcell

Synthetic prototype for a trusted, local-first maintenance workcell.

## Demo session

- Username: `engineer.a`
- Password: `demo123`
- Seeded workcell: `WC-P204A-001`
- Scenario: Pump P-204A Replacement Analysis

The frontend uses deterministic in-browser data and `localStorage` for the session and workcell progression. It makes no external AI or data calls.

## Main path

Sign in → load the active workcell → admit evidence → preview workflow → execute → review the high-severity pressure exception → approve → verify → generate and release the work package → simulate output modification to see approval invalidation and release blocking.