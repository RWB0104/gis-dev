# Testing Conventions

- Testing framework is `vitest`.
- Test code is written by the agent, targeting 100% coverage.
- If 100% coverage is not achievable or requires clarification, consult with the developer before proceeding.
- Code under test is treated as one of two shapes — **components** or **pure functions/modules** — and the `describe`/`it` structure differs between the two.
- **Exception**: `@gis-dev/headless-ui-pack` is exempt from testing entirely — see `./components.md` for why.

## API calls

- In `vitest`, **all** API calls (GET included) must be mocked. Tests never hit a real API.
- The agent must **never** call any API that can create, update, or delete data (POST/PUT/PATCH/DELETE) for real, by any means (tests, scripts, `curl`, browser flows). This is an absolute rule: the API is shared with production.
  - **Sole exception**: the local API server has a guest mode. CUD requests are allowed only when sent to the local API server **with a guest token**. Any other host or token remains forbidden.
- For ad-hoc verification outside `vitest`, the agent may send real GET requests, since they are relatively safe.

## Components

- One root `describe` per file, with `it` blocks directly underneath.
- Add a nested `describe` only when a natural grouping emerges while writing the tests — not by default.
- Root `describe` title: `` [packageName] ComponentName `` (e.g. `[@gis-dev/root-ui-pack] ThemeScript`).
  - A file usually exports one component, so the component name equals the file name. For a file that exports multiple components, use the specific component name instead of the file name; if it's ambiguous which component a block covers, ask the developer or use judgment.

```tsx
// packages/app-ui-group/root-ui-pack/src/atom/ThemeScript/ThemeScript.spec.tsx
describe('[@gis-dev/root-ui-pack] ThemeScript', () => {
  it('script 태그를 렌더링한다', () => {
    // ...
  })

  it('전달된 속성을 그대로 전달한다', () => {
    // ...
  })
})
```

## Pure functions / modules

- A file may export multiple functions. One root `describe` per file, with one first-level `describe` per exported function underneath — write that function's tests inside its own first-level `describe`.
- Root `describe` title: same `[packageName] name` format as components, using the file name.
- First-level `describe` title: `` ${methodName} 테스트 `` (e.g. `getRuntimeEnvironment 테스트`) — literal, no brackets.

```ts
// packages/app-service-group/root-service-pack/src/theme/index.spec.ts
describe('[@gis-dev/root-service-pack] theme', () => {
  describe('useResolvedTheme 테스트', () => {
    it('명시적으로 지정된 테마가 있으면 그 값을 반환한다', () => {
      // ...
    })
  })

  describe('useThemeHook 테스트', () => {
    it('resolvedTheme이 dark면 html에 dark 클래스를 추가한다', () => {
      // ...
    })
  })
})
```
