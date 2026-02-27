# Contributing

Thanks for contributing to CommandHandlerTs.

## Development setup

```bash
npm install
cp .env.example .env
npm run typecheck
```

## Branch & commit conventions

- Branches: `feat/*`, `fix/*`, `refactor/*`, `chore/*`
- Conventional commits:
  - `feat(scope): ...`
  - `fix(scope): ...`
  - `chore(scope): ...`

## Pull request checklist

- [ ] Focused scope with clear title
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Docs updated when behavior changes
- [ ] Environment variables documented

## Code style

- Keep modules small and single-purpose
- Prefer explicit typing over `any`
- Fail fast on missing config
