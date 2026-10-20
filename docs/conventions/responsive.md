# Responsive Conventions

Mobile-first: write the base (unprefixed) Tailwind classes for the smallest screen, then widen with breakpoint prefixes.

## Minimum supported viewport

- **320 × 568 px** (320px width matches the WCAG reflow criterion; 568px is the paired height of the smallest common phone).
- Nothing may require horizontal page scroll at 320px width.
- Landscape phones (~320px height) and foldables in the folded state (~280px width) are out of scope.

## Widths to verify

- `320` (minimum), `375` (common iPhone), `768` (`md`, tablet).
- The default breakpoint for switching from the mobile layout is Tailwind's `sm` (640px).

## Height

- Height is not enforced as strictly as width, since vertical scroll is acceptable.
- Primary actions (e.g. the clock-in / clock-out buttons) must be reachable without scrolling in the first viewport at the minimum size. Put them above secondary information such as notices.
- Avoid fixed heights (e.g. `h-dvh`) except where genuinely required, such as the login screen.
