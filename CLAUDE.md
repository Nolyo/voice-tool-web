# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the marketing and documentation website for **Voice Tool**, a software project located at `../voice-tool`. The website serves to present, document, and distribute the Voice Tool software.

### Key Features
- Presentation pages for Voice Tool
- Interactive demos
- Documentation
- Download page (fetches release list from a JSON file in the Voice Tool repository)

## Tech Stack

- **Next.js 16** with App Router
- **React 19.2**
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** (using new @tailwindcss/postcss plugin)
- **Geist fonts** (sans and mono) via next/font

## Development Commands

```bash
# Start development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint
```

## Architecture Notes

### Next.js App Router Structure
- Uses Next.js App Router (not Pages Router)
- App directory contains all routes and layouts
- [app/layout.tsx](app/layout.tsx) defines the root layout with Geist fonts
- [app/page.tsx](app/page.tsx) is the home page
- [app/globals.css](app/globals.css) contains Tailwind imports and CSS custom properties

### TypeScript Configuration
- Path alias: `@/*` maps to `./*` (root directory)
- Strict mode enabled
- Target: ES2017
- JSX mode: `react-jsx` (no import React needed)

### Styling
- Tailwind CSS v4 with new inline @theme directive
- CSS custom properties for theming (`--background`, `--foreground`)
- Dark mode support via `prefers-color-scheme`
- Geist font families exposed as CSS variables

### External Dependencies
- Voice Tool software is located at `../voice-tool`
- Release data will be fetched from a JSON file in the Voice Tool repository

## Important Constraints

- **NO Server Actions**: Do not use Next.js Server Actions
- Use API routes or external endpoints for server-side logic
- Maintain strict TypeScript typing (no `any` types)

## MCP
- You can use nextjs mcp for documentation

## Documentation
- All documentation should be in /docs

## Commit and Push
- Use conventional commits: - Format: `<type>(<scope>): <message>`
    - feat(xxx): for new features
    - fix(xxx): for bug fixes
    - docs(xxx): for documentation changes
    - style(xxx): for code style changes
    - refactor(xxx): for code refactoring
    - test(xxx): for adding or updating tests
    - chore(xxx): for maintenance tasks
- Always in English, short and precise.