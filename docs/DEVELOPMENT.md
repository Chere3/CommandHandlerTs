# Development Guide

## Prerequisites

- Node.js 20+ recommended (project minimum is 14)
- npm 9+
- Discord bot token
- Optional MongoDB connection

## Setup

```bash
npm install
cp .env.example .env
```

Fill `.env` with your `TOKEN` and optional `MONGO_URI`.

## Run locally

```bash
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
npm run check
```

## Repository layout

```text
src/
  Database/
  Events/
  Typings/
  config.ts
  index.ts
  main.ts
```

## Pull request checklist

1. Keep changes scoped to one concern.
2. Run `npm run check` before push.
3. Update docs when behavior/config changes.
4. Reference roadmap item if applicable.
