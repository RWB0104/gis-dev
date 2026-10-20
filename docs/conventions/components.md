# Component Conventions

Components follow **atomic design** (atom / molecule / organism / template / page).

- **atom / molecule**: as a rule of thumb, avoid business logic and hooks here — not an absolute rule, but the default expectation. These should stay presentational.
- **organism / template / page**: each has a top-level grouping folder keyed on **domain** (e.g. `Global`, `Blog`), with individual components nested underneath it. Atom/molecule have no domain grouping.

## Component folder structure

Every component is its own folder:

```
ComponentName/
├── ComponentName.tsx        # the component itself
├── ComponentName.spec.tsx     # Vitest — consumer only
└── index.ts                   # public export surface
```

`index.ts` only ever re-exports `ComponentName.tsx`. `.spec.tsx` is a **pure consumer** of the component for Vitest purposes — it's not exported through `index.ts`, and it doesn't contribute anything back to the component itself.

The general (non-component) TypeScript file structure is documented separately in `./file-structure.md`.

## Exception: `@gis-dev/headless-ui-pack`

This specific pack (a direct, unmodified port of shadcn-ui's generated output) is exempt from every convention on this page — no `ComponentName/` folder structure, no `.spec.tsx`, no linting. It's vendored code, not hand-authored, so our authoring conventions don't apply to it. This is a one-off, named exception (not a general "vendored code" category rule) — don't assume it extends to other packs without confirming first.
