# stohic.com

The Stohic corporate marketing site. Vite + React + TypeScript + Tailwind.
Static build, no backend.

## Requirements

Node 22 or newer (CI builds on 22; Node 24 works locally). npm ships with Node.

## Getting started

```sh
make dev
```

That installs dependencies if needed and starts the dev server with hot reload.
Vite prints the URL it picked, usually http://localhost:5173/. If that port is
already taken it walks upward until it finds a free one, so read the actual URL
off the banner rather than assuming 5173.

## Commands

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `make help`      | List every target                             |
| `make install`   | Install dependencies from the lockfile         |
| `make dev`       | Dev server with hot reload                     |
| `make typecheck` | Type check without emitting                    |
| `make build`     | Type check, then build to `dist/`              |
| `make preview`   | Build, then serve `dist/` at localhost:4173    |
| `make clean`     | Remove `dist/` and `node_modules/`             |

Every target installs dependencies first when they are missing, so a fresh
clone can go straight to `make dev` or `make build`.

The underlying `npm run dev` / `npm run build` / `npm run preview` scripts still
work. They just require `npm ci` to have been run first. `vite: command not
found` means dependencies were never installed; run `make install`.

Note that `dev` and `preview` are different servers. `dev` serves source with
hot reload; `preview` serves the built output from `dist/` and is the closer
match to production. `make preview` rebuilds first so you are never previewing
stale output.

## CI and deployment

`.github/workflows/ci.yml` runs on every push and pull request: `npm ci`,
`npm run typecheck`, `npm run build`, plus checks that the build kept `CNAME`,
that `index.html` points at hashed assets, and that no em dashes appear in
`src`, `index.html`, or `public/terms`. That last one is a house style rule.
Restructure the sentence rather than reaching for an em dash.

Pushing to `main` does not publish. Deployment is gated on a version tag:

```sh
git tag v1.0 && git push origin v1.0
```

`.github/workflows/deploy.yml` then publishes to GitHub Pages. This requires
Settings > Pages > Source to be set to "GitHub Actions".
