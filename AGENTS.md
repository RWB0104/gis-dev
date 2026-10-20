# gis-dev

gis-dev is the personal monorepo for RWB0104. `v3` is a full renewal of `v2`.

**Write all documentation in this repo (this file, package READMEs, code comments, ADRs, etc.) in English**, regardless of the language used in conversation with the user.

## Collaboration Style

- Claude does not edit files directly; instead issues instructions to the user with a `[TODO]` prefix. Exception: updates to this file (`AGENTS.md`) and `docs/conventions/*.md` are made directly by Claude, not via `[TODO]`.
- This convention may change as needed — if direct edits are wanted elsewhere, the developer will explicitly ask for it.
- Either the developer or Claude may propose updates to this file when deemed necessary to keep it current.
- Only commit this file when the developer explicitly requests it using the keyword **"클로드 컨텍스트"**. Do not commit automatically after every change.
- When committing, use the message format: `docs: 📝 {description}`

## Status

The build-out is in progress: `apps/root` (Next.js) exists and several `packages/*-group/*-pack` packages have real implementation, but coverage across groups is uneven — some packages hold only a handful of modules, and `repo-group/type-pack` is still empty. The structure described below is the target architecture; verify against the actual filesystem before assuming a given package/component already exists.

## Monorepo tooling

- **Package manager**: pnpm (see `pnpm-workspace.yaml`: `apps/**`, `packages/**`)
- **Task runner**: Turborepo (`turbo.json`)
- **Node**: `>=24`

## Apps

One app lives under `apps/`:

| App | Purpose | Domain |
|---|---|---|
| `root` | gis-dev app | `https://project.itcode.dev/gis-dev` |

`root` is built with **Next.js**.

Every app here is a thin consuming shell, not a place where real component/business-logic source lives — that all lives in `packages/*` (e.g. `app-ui-group`/`app-service-group` packs for app-specific code, `global-*-group` for shared code).

## Frontend stack

- **Framework**: Next.js
- **UI components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Unit testing**: Vitest
- **Lint / Format**: Biome

Shared UI setup (shadcn-ui + Tailwind config) lives in `packages/global-ui-group/headless-ui-pack`.

## Package conventions

`packages/` is organized as `*-group/*-pack` (organizational grouping / actual installable package), with a JIT/`exports`-based consumption model. Full details — the defined groups, `exports` rules — are documented in `./docs/conventions/packages.md`.

## Component conventions

Components follow atomic design (atom/molecule/organism/template/page), with a fixed per-component folder structure (`ComponentName.tsx` + `.spec.tsx` + `index.ts`). Full details are documented in `./docs/conventions/components.md`.

## General (non-component) file structure

Plain `.ts` files (utils, services, etc.) don't require the folder-per-file/`index.ts` pattern components use. Full details are documented in `./docs/conventions/file-structure.md`.

## Testing conventions

Tests are written in `vitest`, targeting 100% coverage, with a defined `describe`/`it` structure that differs between components and pure functions/modules. Full details are documented in `./docs/conventions/testing.md`.

## Responsive conventions

Mobile-first, with a minimum supported viewport of 320 × 568 px. Full details are documented in `./docs/conventions/responsive.md`.

## Line ending conventions

All text files use LF on every OS (the repo is worked on from both Windows and macOS), enforced by `.gitattributes`, `.editorconfig`, and Biome. Full details, including the one-time normalization steps, are documented in `./docs/conventions/line-endings.md`.

## Comment conventions

Every source file starts with a header docblock (`@author`, `@since`, etc.). The `@since` timestamp format is specified in `./docs/conventions/comments.md`.
