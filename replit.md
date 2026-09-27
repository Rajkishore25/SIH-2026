# MRPL Confidential Industrial Workcell

A synthetic, local-first prototype for scoped industrial task execution, evidence admission, human review, verification, release, and audit.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/industrial-workcell/` — the runnable React + Vite Workcell experience.
- `artifacts/industrial-workcell/src/App.tsx` — seeded workflow state machine, demo data, and page-level UI.
- `artifacts/industrial-workcell/src/index.css` — shared visual tokens, typography, and control-room styling.
- `artifacts/industrial-workcell/README.md` — demo credentials and the intended judge flow.
- `artifacts/api-server/` — shared API scaffold; not required by the prototype's deterministic frontend flow.

## Architecture decisions

- The first build is frontend-first and deterministic so the hackathon demo does not depend on paid AI APIs or external services.
- Workcell progression is modeled as explicit UI states so the high-severity exception cannot be skipped and release cannot happen before verification and approval.
- Seeded prototype evidence is intentionally synthetic and visibly labels restricted material as blocked rather than implying enterprise authorization.
- Session and demo progression use local browser persistence so a refresh does not erase the active demonstration.

## Product

- Sign in as Engineer A and load the Pump P-204A replacement analysis.
- Admit five authorized documents while visibly blocking one restricted document.
- Preview a bounded workflow, watch local-AI-style progress and permitted tool activity, review a 10 bar vs 12 bar exception, verify claims, release a work package, and demonstrate approval invalidation after output modification.
- Browse My Workcells, Documents, and Audit views without exposing backend implementation details.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
