# CommandHandlerTs

A TypeScript-first Discord command handler template focused on modular command/event architecture.

> Status: legacy template targeting `discord.js@13` and Node 14+.

## Why this project

This repository provides a starter base for bots that need:
- Prefix command handling
- Slash command support baseline
- Event-driven structure
- Environment-based configuration

## Project structure

```text
src/
  Database/
  Events/
  Typings/
  config.ts
  index.ts
  main.ts
```

## Requirements

- Node.js `>=14`
- npm or yarn
- MongoDB instance (optional, if your bot uses DB features)

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Fill required variables in `.env`.
4. Run the bot:
   ```bash
   npm run start
   ```

## Scripts

- `npm run start` → run with `ts-node`
- `npm run dev` → auto-reload development mode
- `npm run typecheck` → TypeScript validation (no emit)
- `npm run build` → compile project
- `npm run check` → typecheck + build (CI-equivalent local gate)

## Environment variables

| Variable | Description |
|---|---|
| `TOKEN` | Discord bot token |
| `MONGO_URI` | MongoDB connection string |

The app now validates required environment variables at startup and exits early with a clear error when something is missing.

## Quality and contribution

- CI runs typecheck + build on pushes/PRs (`.github/workflows/ci.yml`)
- See [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) for onboarding and local checks
- See [CONTRIBUTING.md](./CONTRIBUTING.md)
- See [ROADMAP.md](./ROADMAP.md) for modernization priorities

## License

Apache-2.0
