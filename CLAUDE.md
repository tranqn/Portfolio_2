# CLAUDE.md — Portfolio_2

## 1. Project Overview

Portfolio_2 is a personal portfolio website for a frontend developer, built with Angular 20 and SSR. It features a hero section, about-me, skills, projects, and contact sections on a single-page layout, plus separate Impressum and Privacy Policy routes. The site supports German/English i18n, responsive design from 320px to 1920px+, and follows strict code-quality and accessibility standards.

## 2. Tech Stack

| Technology       | Version   | Purpose                          |
|------------------|-----------|----------------------------------|
| Angular          | ^20.3.0   | Application framework            |
| Angular SSR      | ^20.3.8   | Server-side rendering            |
| Angular Router   | ^20.3.0   | Client-side routing              |
| Angular Forms    | ^20.3.0   | Reactive/template forms          |
| Express          | ^5.1.0    | SSR server                       |
| RxJS             | ~7.8.0    | Async/event streams              |
| TypeScript       | ~5.9.2    | Language                         |
| SCSS             | (inline)  | Component + global styling       |
| Jasmine          | ~5.9.0    | Test framework                   |
| Karma            | ~6.4.0    | Test runner                      |
| Prettier         | (config)  | Code formatting                  |

## 3. MCP Rule — Context7

**Always resolve library documentation through Context7 before writing or modifying code.** When a task involves Angular, RxJS, Express, TypeScript, or any dependency listed above, invoke the Context7 MCP server to fetch current API docs. Do not rely on training data for API signatures, decorator options, or configuration schemas — use Context7.

## 4. Architecture & Patterns

### Angular 20 Patterns (enforced)

- **Standalone components only** — no `NgModule` declarations. Every component uses `imports: [...]` in its `@Component` decorator.
- **Signals for state** — use Angular `signal()` and `computed()` for reactive UI state. Reserve RxJS for HTTP calls and async streams.
- **Zoneless change detection** — `provideZonelessChangeDetection()` is configured in `app.config.ts`. Never import `zone.js`.
- **SSR + Client hydration** — `provideClientHydration(withEventReplay())` is active. Respect hydration constraints (no direct DOM access in constructors/`ngOnInit`).
- **Routing** — `provideRouter(routes)` in `app.config.ts`. Impressum and Privacy Policy are separate routes sharing the same header/footer.
- **File naming** — Angular 20 convention: `component-name.ts`, `component-name.html`, `component-name.scss`, `component-name.spec.ts`. No `.component` suffix in filenames.
- **Component selector prefix** — `app-` (configured in `angular.json`).
- **Template/style files** — `templateUrl` + `styleUrl` (not inline). Inline style language: SCSS.

### TypeScript Configuration

- `strict: true` with all additional strict flags enabled
- `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`
- `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`
- Target: `ES2022`, Module: `preserve`

## 5. Code Standards

### Hard Limits

| Rule                          | Limit         |
|-------------------------------|---------------|
| Lines of code per file        | 400 max       |
| Lines per function (TS only)  | 14 max        |
| Function responsibility       | Single        |
| Blank lines between functions | 1–2           |

### Naming Conventions

- **camelCase** for file names, variables, functions, and properties
- First letter of functions/variables is **lowercase**
- Use clear, descriptive names — no abbreviations unless universally understood

### TypeScript Rules

- Use `protected readonly` for template-bound signals
- Prefer `const` over `let`; never use `var`
- Explicit return types on public methods
- No `any` — use proper types or generics

### Prettier (from `package.json`)

```json
{
  "printWidth": 100,
  "singleQuote": true,
  "overrides": [
    { "files": "*.html", "options": { "parser": "angular" } }
  ]
}
```

## 6. File Structure

```
src/
  app/
    app.ts                    # Root component
    app.html
    app.scss
    app.spec.ts
    app.config.ts             # Client providers (zoneless, router, hydration)
    app.config.server.ts      # Server providers
    app.routes.ts             # Route definitions
    app.routes.server.ts      # Server route config
    header/
      header.ts
      header.html
      header.scss
      header.spec.ts
    hero/
      hero.ts
      hero.html
      hero.scss
      hero.spec.ts
    about-me/
      about-me.ts
      about-me.html
      about-me.scss
      about-me.spec.ts
    skills/
      skills.ts
      skills.html
      skills.scss
      skills.spec.ts
    projects/
      projects.ts
      projects.html
      projects.scss
      projects.spec.ts
    contact/
      contact.ts
      contact.html
      contact.scss
      contact.spec.ts
    footer/
      footer.ts
      footer.html
      footer.scss
      footer.spec.ts
    impressum/
      impressum.ts
      impressum.html
      impressum.scss
    privacy-policy/
      privacy-policy.ts
      privacy-policy.html
      privacy-policy.scss
    shared/
      services/               # Injectable services
      models/                 # TypeScript interfaces
      i18n/                   # Translation JSON files (de.json, en.json)
  assets/
    img/                      # All images (compressed, max 500kb each)
  styles.scss                 # Global styles, variables, mixins, reset
  main.ts                     # Browser bootstrap
  main.server.ts              # Server bootstrap
  server.ts                   # Express SSR server
public/                       # Static assets served directly
```

## 7. Development Commands

| Command                           | Action                          |
|-----------------------------------|---------------------------------|
| `npm start` / `ng serve`         | Dev server (development config) |
| `npm run build` / `ng build`     | Production build with SSR       |
| `npm run watch`                   | Build in watch mode (dev)       |
| `npm test` / `ng test`           | Run Jasmine/Karma tests         |
| `npm run serve:ssr:Portfolio_2`  | Serve SSR build locally         |

## 8. Git Workflow

### Conventional Commits (required)

Format: `<type>(<scope>): <description>`

| Type       | Use for                                      |
|------------|----------------------------------------------|
| `feat`     | New feature                                  |
| `fix`      | Bug fix                                      |
| `docs`     | Documentation only                           |
| `style`    | Formatting, no code change                   |
| `refactor` | Code change that neither fixes nor adds      |
| `perf`     | Performance improvement                      |
| `test`     | Adding or correcting tests                   |
| `chore`    | Build process or auxiliary tool changes       |

### Scope Examples

- `feat(hero): add entrance animation`
- `fix(contact): correct onBlur validation timing`
- `style(header): adjust nav spacing for tablet`
- `refactor(skills): extract skill-card component`

### Rules

- Make small, focused commits — one logical change per commit
- Use `.gitignore` to exclude `node_modules/`, `dist/`, IDE files, and `.env`

## 9. Testing

### Setup

- **Framework:** Jasmine ~5.9.0
- **Runner:** Karma ~6.4.0
- **Config:** `tsconfig.spec.json` + `angular.json` test architect
- **Inline style language:** SCSS (same as build)

### Patterns

- One `.spec.ts` file per component/service
- Test file lives next to its source file
- Use Angular `TestBed` for component tests
- Mock services with Jasmine spies

### Coverage Targets

- Minimum **70%** overall coverage
- **100%** coverage on contact form validation logic
- Run with: `ng test --code-coverage`

### Browser Testing

Test all functionality in latest versions of: Chrome, Firefox, Safari, Edge.

## 10. Styling Conventions

### SCSS Architecture

- Global variables, mixins, and reset in `src/styles.scss`
- Component styles in co-located `.scss` files (scoped via Angular view encapsulation)
- Use CSS custom properties for theming (colors, typography)
- Follow 8px grid system for spacing (8, 16, 24, 32, 48, 64)

### Responsive Breakpoints

| Name       | Range              | Padding        |
|------------|--------------------|----------------|
| Mobile     | 320px – 767px      | 16px or 24px   |
| Tablet     | 768px – 1023px     | 32px or 48px   |
| Desktop    | 1024px – 1439px    | 64px           |
| Large      | 1440px – 1919px    | auto-centered  |
| Ultrawide  | 1920px+            | auto-centered  |

- Max content width: **1200px** (hero background spans full width)
- Hero section: always **100vh** (includes header)
- No avoidable scrollbars at any resolution
- Use `clamp()` for fluid typography

### Interactive Elements

- All buttons: `cursor: pointer`
- All inputs and buttons: no default borders
- Define states for: normal, hover, focus, active, disabled
- Include loading states for submit buttons

## 11. Performance & Build

### Bundle Budgets (from `angular.json`)

| Budget Type         | Warning   | Error   |
|---------------------|-----------|---------|
| Initial bundle      | 500 kB    | 1 MB    |
| Any component style | 4 kB      | 8 kB    |

### SSR Configuration

- Builder: `@angular/build:application`
- Output mode: `server`
- SSR entry: `src/server.ts`
- Client hydration with event replay enabled

### Lighthouse Targets

- Performance: **> 90**
- First Contentful Paint: **< 1.5s**
- Largest Contentful Paint: **< 2.5s**

### Image Rules

- Compress all images to **< 500 kB**
- Prefer WebP/AVIF with fallbacks
- Store in `src/assets/img/`
- Implement lazy loading

## 12. Important Constraints

### Zero Console Output

No `console.log`, `console.warn`, or `console.error` in production code. No console errors or warnings at runtime.

### Animation Rules

- Clickable elements: hover/click animations **max 125ms** duration
- Scroll-into-view animations: 300–500ms with `ease-out`
- Toggle animations: `ease-in-out`
- Only animate clickable elements or section entries on scroll — nothing else

### Contact Form

- Validate fields **onBlur only** — never during input
- Validation messages must not cause layout shifts (reserve space)
- Submit button disabled until all validation passes (including privacy checkbox)
- Browser autocomplete must not break the design (handle Webkit styling)
- Show user feedback on successful/failed email send

### Internationalization (i18n)

- Support German (default) and English
- Language toggle in header / responsive menu
- Persist language preference in `localStorage`
- Correct spelling for all tech terms (e.g., "JavaScript" not "Javascript")

### External Links

- All links to projects, GitHub, LinkedIn, etc. must open in a **new browser window** (`target="_blank"` with `rel="noopener noreferrer"`)

### SSL

- SSL certificate required
- HTTPS always enforced

### Browser Support

Latest versions of Chrome, Firefox, Safari, and Edge.

### Accessibility

- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- WCAG AA color contrast
- Visible focus indicators
