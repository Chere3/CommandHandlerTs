# Maintainer Notes

## Local quality gate

Run before opening PR:

```bash
npm install
npm run check
```

## Environment contract

The bot now fails fast if critical env vars are missing.

Required variables:

- `TOKEN`
- `MONGO_URI`

Use `.env.example` as baseline and keep new variables documented there.

## Release hygiene

- Keep ROADMAP status updated when items are completed.
- Update README when scripts, setup steps, or architecture change.
- Prefer small focused PRs per concern (runtime, docs, tooling).
