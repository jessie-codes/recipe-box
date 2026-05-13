# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server at http://localhost:3000/recipe-box/
npm run generate  # build static output to .output/public/
npm run preview   # preview the static build locally
```

There are no tests or linters configured.

## Architecture

**Stack:** Nuxt 4 + `@nuxt/content` v3. Static site — `npm run generate` prerenders all pages to `.output/public/` for deployment on GitHub Pages at `jessie-codes.github.io/recipe-box/`.

**Directory layout (Nuxt 4):** App code lives under `app/` (`pages/`, `components/`, `assets/`, `app.vue`). Recipe markdown files live under `content/recipes/` at the project root. `content.config.ts` (also at root) defines the `recipes` collection with its Zod schema.

**Content pipeline:** Recipes are `.md` files with YAML frontmatter (`title`, `description`, `author`, `servings`, `prepTime`, `cookTime`, `tags`). `@nuxt/content` v3 parses them into a SQLite database at build time. Pages query with `queryCollection('recipes')` — **not** `queryContent()`, which is the v2 API.

**Routing:** `app/pages/index.vue` lists all recipes. `app/pages/recipes/[...slug].vue` handles detail pages — it reconstructs the content path from `route.params.slug` and calls `.path(path).first()`.

**Deployment:** `.github/workflows/deploy.yml` runs `npx nuxt generate` and deploys `.output/public/` via `actions/deploy-pages`. GitHub Pages source must be set to "GitHub Actions" in repo settings.

## Key constraints

- `app.baseURL` is hardcoded as `/recipe-box/` in `nuxt.config.ts`. Do **not** move it to a `NUXT_APP_BASE_URL` env var — doing so causes the static prerenderer to receive a redirect at `/` and fail to crawl recipe pages. The dev server runs at `localhost:3000/recipe-box/` as a result.
- `better-sqlite3` must stay in `dependencies` (not `devDependencies`) — `@nuxt/content` v3 requires it at `nuxt prepare` time and will fail non-interactively if it is absent.
- The workflow uses `npx nuxt generate` (not `nuxt build --preset github_pages`). The `github_pages` preset produces SPA-only output ("Redirecting...") instead of prerendered HTML.
- `.nojekyll` is added manually in the workflow after generate — `nuxt generate` does not create it, and without it GitHub Pages strips the `_nuxt/` asset directory.
