# TransMadras SK

Tamil Unicode ↔ ISO 15919 transliteration — SvelteKit + Vercel client-side app.

**Live app:** [transmadras.vercel.app](https://transmadras.vercel.app/)

Ported from [TransMadras.NET](https://github.com/kalaiguna/TransMadras.NET), which wraps the original `Madras` class by **C. Gunasekaran** (2007).

## What it does

| Direction | Input | Output |
|-----------|-------|--------|
| Tamil → Style | `தமிழ்` | `tamiḻ` |
| Style → Tamil | `tamiḻ` | `தமிழ்` |

Results update as you type — no button needed.

## Getting started

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npx vercel
```

Uses `@sveltejs/adapter-vercel` — zero config required.

## License

MIT — see [LICENSE](LICENSE).
