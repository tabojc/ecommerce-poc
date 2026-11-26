## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Verification Rules (MANDATORY)

Never report work as "OK", "done", or "ready" without first running verification and observing the results.

Before claiming anything is complete, always run at minimum:

1. **Build** — `npm run build` must pass with no errors.
2. **Tests** — any applicable test suite must run and pass (or explicitly state there are none and why).
3. **Dev smoke check** — when UI is affected, confirm `npm run dev` starts cleanly and the affected route returns 200.

Report results as observed (`<command>: <result>`), never as assumed. If a required check fails or cannot run, say so explicitly and mark the work as partial — do not present it as finished.

## Implementation Rules

- **Landing-first priority**: Engage stakeholders first with the landing page (`src/pages/index.astro`) before building deeper flows.
- **Minimal scope**: Implement only what was explicitly requested; do not expand scope without user confirmation.
- **Stakeholder-centric**: Every change must serve a clear purpose for demonstrating value to the product owner.
- **Minimal risk**: Prefer additive, reversible changes; verify each increment with a build before proceeding.
- **Generic / multi-tenant mindset**: Keep the project adaptable (repository pattern already isolates D1/R2). Design for tenant isolation (tenant_id / schemas) before hard-coding client-specific coupling. Avoid hard-coding client-specific coupling when a generic option is reasonable.

## Checkout Flow — Planned Gates

- **G1 (done)**: Landing "all-in-one" page (hero + demo + SaaS value pitch).
- **G2**: `POST /api/checkout` — create order in DB with status `pending`, validate stock, persist cart items.
- **G3**: Order listing UI + **cancel** action (only when status is `pending`).
- **G4**: Real payment tracking — store `payment_provider` / `payment_id` and reflect paid vs unpaid.
- **G5 (done)**: Soft delete (`is_active = 0`) and `cancelled` status already supported.

## Code Gotchas

- Do not use optional chaining in assignments (`this.shadowRoot?.innerHTML = ...`). Use a guard or non-null assertion (`this.shadowRoot!.innerHTML = ...`).

## Upgrade Roadmap — High-Level Software Factory

### Required pillars to reach high-level software factory with high quality & engineering

1. **Testing**
   - Unit: Vitest/Jest for libs, repositories, API handlers (mock D1/R2).
   - Integration: checkout/order flows with in-memory or real test DB.
   - E2E: Playwright/Cypress for critical user flows.
   - Coverage target: minimum 80% per module; report in CI.

2. **CI/CD**
   - GitHub Actions: run build + lint + typecheck on PR; block merge if fail.
   - Deploy automation: Cloudflare Pages/Workers deploy on merge to main.
   - Release: version bump, changelog, tag.

3. **Code Quality**
   - ESLint + Prettier + Husky pre-commit.
   - Complexity rules, `no-unused-vars`, import order.
   - Security scans (npm audit, secret scanning).

4. **Architecture & Contracts**
   - Central error handling + custom error types.
   - Validation layer (Zod/yup) on every input boundary.
   - Service layer + DI abstraction.
   - OpenAPI contract for APIs; generated docs.

5. **Documentation**
   - ADRs for key decisions (Cloudflare Free Tier, Repository pattern, white-label).
   - API endpoint docs + onboarding runbook.

6. **Observability**
   - Structured logging + Sentry/error tracking.
   - Health check with DB/R2 connectivity + metrics.

7. **Security**
   - Rate limiting on write/expensive endpoints.
   - Input sanitization, CORS policies, secret hygiene.

8. **DevX & Change Management**
   - Setup automation for D1/R2.
   - PR template + conventional commits enforcement.
   - Feature flags.

### Quick wins (incremental, low regression risk, high value)

1. **ESLint + Prettier + Husky** — prevents invalid assignment patterns like `this.shadowRoot?.innerHTML = ...`. Very low risk; do now.
2. **Vitest unit tests** — for `src/lib/cart.ts` and product repo methods with mocked D1. Medium-low risk; do next.
3. **GitHub Actions CI** — build + lint + typecheck on PR; block merge on failure. Low risk; do next.
4. **ADR + API doc** — capture Cloudflare/Repository decisions; list endpoints in README. Low risk; do next.

### PoC objective 1 & regression guardrails

- Continue with POC objective 1 (landing engagement page) — complete UI demo.
- Then wait for explicit client (Jesus David) YES before implementing new functional flows (real checkout, payment, cancel).
- While waiting: prioritize regression avoidance — keep existing pages/components green, run build + smoke check, document every change.
- Implement quick wins freely; avoid touching core flows until client authorization.

## Code Gotchas

- Do not use optional chaining in assignments (`this.shadowRoot?.innerHTML = ...`). Use a guard or non-null assertion (`this.shadowRoot!.innerHTML = ...`).
