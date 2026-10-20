# Package Conventions

## Package structure (`packages/`)

Packages are organized in two levels:

1. **Group folders** — first-level folders under `packages/`, named `*-group` (e.g. `ui-group`). A group is a purely organizational grouping by domain/purpose (e.g. UI, config, build tooling). **A group is not a scope declaration.** Packs under the same group folder may happen to share the same reference scope, but that's coincidental, not guaranteed — never infer a pack's scope from which group folder it lives in.

2. **Pack folders** — second-level folders under each group, named `*-pack` (e.g. `global-ui-pack`). Each pack folder is an actual package: it has its own `package.json`. Packs express purpose at a finer granularity than their parent group.

Package naming convention: every pack's `package.json` `name` field is `@gis-dev/*`.

**Exception**: the ambient type declarations pack is named `@types/gis-dev` instead. TypeScript auto-includes any `@types/*` package found in `node_modules` as global ambient types without an explicit import (the same mechanism that makes `@types/node`'s globals like `process` available everywhere) — naming it `@types/gis-dev` deliberately opts into that behavior, which a `@gis-dev/*` name wouldn't get.

### Defined groups

| Group | Contains |
|---|---|
| `app-ui-group` | UI packages 1:1 matched to a specific app |
| `global-ui-group` | UI packages shared across apps and/or `app-ui-group` packs (e.g. shadcn-ui setup) |
| `app-service-group` | Business logic / hooks 1:1 matched to a specific app |
| `global-service-group` | Business logic / services shared across apps and/or `app-ui-group`/`app-service-group` packs (not yet materialized as an actual pack — planned to mirror the `app-ui-group`/`global-ui-group` split once a second app needs shared business logic) |
| `repo-group` | Node-only code that *is* consumed via normal `import`/`exports` (e.g. `@types/gis-dev`, pure helper functions, codegen scripts, CLI tools, build helpers) |
| `external-group` | Pure boundary/adapter code for state or data whose source of truth lives outside the React component tree or outside the app itself — API clients, global state stores (e.g. Zustand). Contains **no business/domain logic** — the moment a pack accumulates domain-aware logic (e.g. error-handling policy, retry strategy tied to product behavior), it belongs in `global-service-group` instead, not here |

Notes:
- The `app-*`/`global-*` naming for the ui/service groups is definitional only — never infer where a pack may be referenced from just from its group folder.
- `config-group` vs `repo-group` split is based on *consumption method* (extends-only static config vs importable code), not vibes — this was chosen specifically because the two kept blurring together otherwise.
- There is no dedicated `util-group`: pure, stateless helper functions currently live under `repo-group` (e.g. `util-pack`) alongside other importable Node-only code, rather than in their own group.
- `config-group` packs *are* consumed through `exports` after all: `extends` follows the same package-resolution algorithm as `import`, so e.g. `@gis-dev/typescript-pack`'s `package.json` still needs an `exports` map (e.g. `"./*.json": "./*.json"`) for `extends: "@gis-dev/typescript-pack/base.json"` to resolve. This is the same JIT/`exports` model described below, not an exception to it.
- `external-group` vs `global-service-group` is a judgment call that can shift over time: a react-query `QueryClient` setup, for instance, belongs in `global-service-group` rather than `external-group`, specifically because its config is expected to grow business-logic-flavored concerns (error handling, retry policy, etc.) — even though "server state living outside the component tree" sounds superficially like an `external-group` fit. When in doubt, ask "will this plausibly grow domain logic?" — if yes, `global-service-group`; if it must stay a dumb boundary layer, `external-group`.

## JIT packages & exports

Packages are consumed via the **JIT (Just-In-Time) package** pattern — they are not pre-built before being referenced by apps/other packages. Because of this, each package's `exports` field in `package.json` is the authoritative boundary of what's consumable from outside: only entries declared there are importable. Keep `exports` accurate and minimal.
