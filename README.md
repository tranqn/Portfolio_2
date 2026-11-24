# Portfolio · quocnamtran.com

Source of [quocnamtran.com](https://quocnamtran.com), my portfolio as a fullstack developer with a frontend focus.

- **Angular 20** with standalone components, signals and strict TypeScript.
- **Static prerendering** of every route via `@angular/ssr`, so each page ships with its own HTML, meta tags, canonical URL and a real 404.
- **German and English** under separate URLs (`/` and `/en`) with `hreflang`; texts live in `public/i18n/de.json` and `public/i18n/en.json`.
- **Project case studies** (`src/app/pages/project-detail/`) with walkthrough recordings, a decision / trade-off / evidence block and links pinned to specific commits.
- **Accessibility and motion:** skip link, visible focus, screen-reader hints, and a reduce-motion switch that also respects `prefers-reduced-motion`.

## Development

```sh
npm install
npm start          # dev server on http://localhost:4200
npm run build      # prerendered build in dist/Portfolio_2/browser (generates the sitemap first)
npm run test:ci    # unit tests, headless
npm run smoke      # after a build: DE and EN routes at 375 and 1440 px, console errors, SEO tags
```

## Structure

| Path | Content |
| --- | --- |
| `src/app/components/` | Sections of the start page (hero, skills, projects, how I work, about, contact) |
| `src/app/pages/` | Project detail, legal notice, privacy policy, 404 |
| `src/app/shared/` | Reusable components, directives, models and data services |
| `scripts/` | Sitemap generator and Playwright smoke check |

## License

All rights reserved. The code is published as a work sample; please do not reuse it.
