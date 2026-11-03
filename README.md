# Juhayer Aiaz — Portfolio

Personal portfolio of **Juhayer Aiaz**, software engineer and full-stack web developer. Live at **[juhayeraiaz.com](https://juhayeraiaz.com)**.

Built with React 19 and Vite, with no UI framework: the design system is a small set of CSS custom properties with first-class light and dark themes.

## Features

- **Polished, responsive UI.** An original design that works from 320px phones to wide desktops, with dark and light themes (follows the OS preference and remembers the choice) and View Transitions when switching.
- **Command palette.** Press <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> (or <kbd>/</kbd>) to jump to any section, switch theme, copy the email address or open social profiles.
- **Projects from the API.** Projects come from the portfolio API with:
  - instant rendering from a local cache (stale-while-revalidate),
  - skeleton loaders,
  - a notice when the free-tier server is waking up,
  - an error state with retry,
  - a details dialog with a screenshot gallery.
- **Live GitHub activity.** Recently updated public repositories are pulled from the GitHub API and cached for an hour. You can pin specific repos in the data file.
- **Working contact form.** Validated with `react-hook-form` and sent over AJAX via [FormSubmit](https://formsubmit.co), with inline success and error states. It has a honeypot for spam and a copy-to-clipboard email button.
- **Accessibility:**
  - semantic landmarks and a skip link,
  - visible focus styles,
  - labelled controls and native `<dialog>` modals,
  - scroll-spy `aria-current` in the navigation,
  - full support for `prefers-reduced-motion`.
- **SEO and sharing.** Descriptive meta tags, Open Graph and Twitter cards with a custom image, JSON-LD `Person` schema, sitemap, robots rules and a web app manifest.
- **Performance.** Self-hosted variable fonts, lazy-loaded images, a vendor chunk for long-term caching, and the admin page code-split out of the main bundle.
- **Quality checks.** ESLint, Vitest and Testing Library (unit and integration tests), plus a GitHub Actions workflow that runs lint, tests and the build on every push and pull request.

## Getting started

Requires Node.js 20.19+ (see `.nvmrc`).

```bash
npm install
```

```bash
npm start
```

The dev server runs at http://localhost:3000.

| Script             | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm start`        | Start the dev server with hot reload            |
| `npm run build`    | Production build into `build/`                  |
| `npm run preview`  | Serve the production build locally              |
| `npm test`         | Run tests in watch mode                         |
| `npm run test:run` | Run tests once (CI)                             |
| `npm run lint`     | Lint the codebase                               |
| `npm run check`    | Lint, test and build: run this before you push |

## Editing content

All copy lives in **[`src/data/portfolio.js`](src/data/portfolio.js)**, so updating the site never requires touching components:

- `profile`: name, rotating roles, summary, contact details, availability and an optional `resumeUrl`. To add a résumé, put a PDF in `public/` and set `resumeUrl: '/resume.pdf'`.
- `about`, `services`, `skillGroups`: About section, the "What I do" cards and the skills toolkit.
- `experience`: work history. The Experience section and its nav link appear automatically once this list has entries; the file documents the entry format.
- `socials`, `pinnedRepos`: social links and (optionally) which GitHub repos to feature.

## Configuration

Copy `.env.example` to `.env.local` to override defaults:

| Variable             | Default                                     | Used by                                |
| -------------------- | ------------------------------------------- | -------------------------------------- |
| `VITE_API_URL`       | `https://portfolio-server-raue.onrender.com` | Projects section (`GET /projects`)     |
| `VITE_ADMIN_API_URL` | `http://localhost:5000`                     | `/addprojects` admin page              |
| `VITE_IMGBB_API_KEY` | none (required for the admin page)          | Screenshot uploads on `/addprojects`   |

### Adding projects

Run the API locally, set `VITE_IMGBB_API_KEY` in `.env.local`, then open http://localhost:3000/addprojects. Search engines are told not to index this page and `robots.txt` disallows it.

## Deployment

`npm run build` outputs a static site to `build/`, the same folder Create React App used, so existing hosting settings keep working. The build also writes `build/404.html` as an SPA fallback, so deep links work on GitHub Pages, Netlify, Cloudflare Pages and similar hosts. `public/CNAME` keeps the custom domain for GitHub Pages.

## Tech stack

React 19 · Vite · React Router · React Hook Form · React Icons · Vitest · Testing Library · ESLint
