# Recipe Box

A collaborative, statically generated recipe collection website built with [Nuxt 4](https://nuxt.com) and [Nuxt Content](https://content.nuxt.com). Deployed to GitHub Pages at [jessie-codes.github.io/recipe-box](https://jessie-codes.github.io/recipe-box/).

## Adding a recipe

Create a new Markdown file in `content/recipes/`. The filename becomes the URL slug.

```markdown
---
title: My Recipe
description: A short description of the dish.
author: Your Name
servings: 4
prepTime: 15 minutes
cookTime: 30 minutes
tags: [dinner, vegetarian]
---

## Ingredients

- ...

## Instructions

1. ...
```

All frontmatter fields except `title` are optional.

## Development

```bash
npm install
npm run dev       # dev server at http://localhost:3000/recipe-box/
npm run generate  # build static output to .output/public/
npm run preview   # preview the static build locally
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds the static site and deploys it to GitHub Pages automatically.
