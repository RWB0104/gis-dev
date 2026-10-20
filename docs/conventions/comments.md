# Comment Conventions

## File header block

Every source file starts with a header docblock:

```ts
/**
 * {한글 설명}
 *
 * @author {작성자}
 * @since {작성/최초 커밋 시각}
 */
```

## `@since` format

`@since` uses the literal format `yyyy.MM.dd Ddd HH:mm:ss`, e.g.:

```
@since 2026.08.02 일 03:04:47
```

- `yyyy.MM.dd` — 4-digit year, 2-digit month, 2-digit day, dot-separated.
- `Ddd` — Korean weekday, short letter only (`일`, `월`, `화`, `수`, `목`, `금`, `토`).
- `HH:mm:ss` — 24-hour clock, zero-padded hour/minute/second, colon-separated.
- The value is the current date/time at the moment the file is authored — not a placeholder, not reformatted later when the file is edited again.
