# ROADMAP

## Quick wins (1-2 weeks)

- [ ] Add CI workflow (install + typecheck + build)
- [ ] Add command/event architecture diagram in docs
- [ ] Introduce `.env.example` + startup validation
- [ ] Normalize naming (`README`, package metadata, repository URL)

## Medium improvements (2-4 weeks)

- [ ] Migrate from ad-hoc command loading to explicit registry pattern
- [ ] Add structured logging and error boundaries for event handlers
- [ ] Add unit tests for command metadata + permission guards
- [ ] Add Docker development profile for local reproducibility

## Big bets (1-2 months)

- [ ] Upgrade to latest `discord.js` major version and modern intents model
- [ ] Split framework core into reusable package + example bot app
- [ ] Add i18n command response layer with translation files

## Strategic rewrites

- [ ] Move to clean architecture (domain/application/infrastructure)
- [ ] Replace runtime reflection loading with compile-time typed command map
- [ ] Build plugin system for modules (economy, moderation, utilities)
