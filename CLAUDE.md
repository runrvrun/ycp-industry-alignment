# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js (App Router, TypeScript) internal tool for MSD Global Practice: a 4-screen MP-facing survey that presents a proposed standardization of YCP's industry-practice taxonomy (reconciling naming across the public website, credentials pack, HUB, Expert database, and MSD Global Focus slide), collects each reviewer's verdict (Agree / Suggest a change / Object) + comments per proposed practice, persists submissions to a SQLite database via Prisma, and exposes a `/results` page so the practice lead can see all responses.

`YCP_Industry_Alignment_Tool_1.html` at the repo root is the original single-file HTML prototype this app was converted from — kept only as a reference for the source content/design, not part of the running app.

## Commands

- `npm run dev` — start the dev server (Turbopack) at `http://localhost:3000`
- `npm run build` / `npm start` — production build and serve
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npx tsc --noEmit` — typecheck
- `npx prisma migrate dev --name <name>` — create/apply a migration after editing `prisma/schema.prisma`
- `npx prisma generate` — regenerate the Prisma client (into `app/generated/prisma`) after a schema change, if not already run by `migrate dev`
- `npx prisma studio` — browse the local SQLite DB (`dev.db`) in a GUI

There are no automated tests. Validate changes by running the dev server and clicking through all 4 screens plus `/results`.

## Architecture

**Survey wizard (`/`):** `app/page.tsx` renders `app/components/SurveyWizard.tsx`, a client component that owns all wizard state (current screen, reviewer name/office, and an `answers` map keyed by review-item id) and renders the header/step-nav/footer chrome plus the four screen components:
- `ComparisonMatrix.tsx` (Screen 1) — the 5-source naming-divergence matrix
- `ProcessOverview.tsx` (Screen 2) — static process/timeline explainer
- `ProposedStandardForm.tsx` (Screen 3) — the 10-practice table + cross-cutting attributes card + the infrastructure-classification rule `<details>` + the submit/download bar. Each row/card uses `VerdictGroup.tsx` (a reusable radio-pill control) bound to `SurveyWizard`'s `answers` state by item id.
- `NextSteps.tsx` (Screen 4) — confirmation banner + rollout timeline + ownership table

All four screens are always mounted; `SurveyWizard` toggles which one has the `active` CSS class (matching the original HTML prototype's tab-switching behavior) rather than using Next.js routing — this is a single continuous form/wizard, not separate pages.

**Content model (`app/lib/taxonomy-data.ts`):** `MATRIX`, `PRACTICES`, `HUB_CROSSCUTTING`, `VERDICT_OPTS` are the taxonomy content itself — editing the proposed standard (renaming a practice, changing its HUB roll-up, adding a matrix row) means editing these typed arrays; the UI is fully derived from them. `REVIEW_ITEM_IDS` (`["rule", ...practice ids, "attr"]`) and `REVIEW_ITEM_LABELS` define the full set of things a reviewer gives a verdict on — the same ids are used as the `Response.itemId` values in the database, so keep them in sync if the practice list changes.

**Submission flow:** `SurveyWizard` POSTs `{ reviewer: {name, office}, responses: {...} }` to `app/api/responses/route.ts`, which validates `reviewer.name` and each item id/verdict against `taxonomy-data.ts` before writing a `Submission` + related `Response` rows via the Prisma singleton (`app/lib/prisma.ts`). The "Download my response (JSON)" button remains as a local-only fallback/backup and is also auto-triggered if the POST fails, so a reviewer's input is never silently lost.

**Data model (`prisma/schema.prisma`):** `Submission` (reviewer name/office/timestamp) has many `Response` rows (`itemId`, `verdict`, `comment`) — normalized rather than one JSON blob per submission, so `/results` can tally verdicts per item cheaply. SQLite via `@prisma/adapter-better-sqlite3` (Prisma 7 requires an explicit driver adapter at runtime even for SQLite — see `app/lib/prisma.ts`); `DATABASE_URL` in `.env` points at the local `dev.db` file.

**Results page (`app/results/page.tsx`):** an async server component (no auth — intentionally open to anyone with the internal URL, per product decision) that queries all submissions with their responses directly via Prisma, computes per-item verdict tallies (`app/lib/aggregate.ts`), and renders a summary table plus an expandable per-reviewer breakdown of every answer/comment.

## Conventions

- No CSS framework — `app/globals.css` is the original prototype's hand-tuned stylesheet (the `--navy`/`--a1`..`--a4`/`--amber` custom-property system, matrix/verdict-pill/timeline styling) ported verbatim. Reuse existing classes; don't introduce Tailwind or CSS modules alongside it.
- Plain `useState` for all form state (no react-hook-form) and manual `fetch`/`NextResponse.json` in the API route (no zod) — matches the pattern used across other YCP internal Next.js tools.
- IDs are load-bearing: each verdict/comment pair is keyed by an item id that must appear in `REVIEW_ITEM_IDS`. Adding a practice or cross-cutting item means adding it to `taxonomy-data.ts` first — everything else (the form, validation in the API route, the results tallies) derives from that list automatically.
