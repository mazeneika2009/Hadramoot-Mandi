# Hadramout House of Mandi · حضرموت بيت المندي

Full-stack platform for a Hadramout-style mandi restaurant: an Arabic-first storefront for browsing the menu, ordering delivery, and reserving tables, plus role-based operations and admin dashboards.

## Features

**Storefront**

- Menu with categories, search, and live availability
- Cart with a slide-over drawer; checkout with delivery address and notes
- Payment via [Fawaterak](https://fawaterk.com) (Vodafone Cash, Fawry, cards) with webhook confirmation
- Table reservations with time-slot picking and a "my reservations" list
- Order tracking page with a live status timeline (auto-refresh every 30s)
- JWT auth (login/register), Arabic RTL UI throughout

**Operations**

- Kitchen queue (`/kitchen`), cashier confirmation (`/cashier`), and delivery queue (`/delivery`), each restricted to its staff role
- Order lifecycle from preparation through cash confirmation to delivery

**Admin** (`/admin`, admin role required)

- Overview dashboard: order/revenue/reservation stats and recent orders
- CRUD for menu items with image preview and availability toggle
- Order management: filter by status/payment, update statuses inline
- Reservation management: confirm or decline bookings

## Stack

| Layer      | Tech                                                                                                         |
| ---------- | ------------------------------------------------------------------------------------------------------------ |
| Client     | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 3, React Router 7                                             |
| Server     | Express 5, TypeScript 5.9, mysql2, Helmet, express-rate-limit, express-validator                             |
| Database   | MySQL 8                                                                                                      |
| Shared     | `shared/` — API types and site config (brand, categories, statuses)                                          |
| Payments   | Fawaterak gateway (HMAC-SHA256 webhooks)                                                                     |
| Deployment | Vercel Services (Vite client + Express API)                                                                  |

Monorepo managed with npm workspaces (`server`, `client`).

## Project structure

```
hadrmoot/
├── client/               # Vite React app
│   └── src/
│       ├── api/          # typed API clients
│       ├── components/   # layout, menu, orders, ui
│       ├── context/      # auth, cart, toast providers
│       └── pages/        # storefront, admin, kitchen, cashier, delivery
├── server/               # Express API
│   └── src/
│       ├── index.ts      # Vercel entrypoint (exports the app)
│       ├── server.ts     # local/Node entrypoint (DB bootstrap + listener)
│       ├── createApp.ts  # Express app factory
│       ├── routes/       # auth, menu, orders, payments, reservations, admin, config
│       ├── db/           # pool, schema init, seed, seed CLI
│       └── config/       # env parsing
├── shared/               # API types + site config
├── vercel.json           # Vercel Services and public routing
└── .env.example
```

## Getting started

### Prerequisites

- Node.js >= 20.19.0
- MySQL 8 running locally (or reachable over the network)

### Setup

```bash
git clone <repo-url> hadrmoot
cd hadrmoot
npm install
```

Create your environment file, then edit the values:

```bash
cp .env.example .env
```

On PowerShell:

```powershell
Copy-Item .env.example .env
```

Create the database and schema, then seed the menu and default accounts:

```bash
npm run db:init
npm run db:seed
```

`db:init` creates the database if it does not exist, applies the schema, and creates the configured admin/staff accounts. `db:seed` also inserts the menu items. Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` (and the staff credentials) before seeding.

### Run

```bash
npm run dev        # API :3000 + client :5173, with hot reload
```

Open http://localhost:5173.

## Scripts

| Command              | What it does                                                 |
| -------------------- | ------------------------------------------------------------ |
| `npm run dev`        | Run server and client together (concurrently)                |
| `npm run dev:server` | API only (`tsx watch`)                                       |
| `npm run dev:client` | Vite dev server only                                         |
| `npm run build`      | Build the API (tsup) and the client (type-check + Vite build) |
| `npm run typecheck`  | `tsc --noEmit` for both workspaces                           |
| `npm run start`      | Serve the built API (`node dist/server.js`)                  |
| `npm run db:init`    | Create the database, tables, and default accounts            |
| `npm run db:seed`    | Seed menu items and ensure the configured accounts           |

## Environment variables

See [`.env.example`](.env.example) for the full list. The essentials:

| Variable                                     | Purpose                                                         |
| -------------------------------------------- | --------------------------------------------------------------- |
| `NODE_ENV`                                   | `development` locally; `production` on Vercel                   |
| `PORT`                                       | API port (default `3000`; Vercel manages the port in production) |
| `DB_HOST/PORT/USER/PASSWORD/NAME`            | MySQL connection                                                |
| `DB_CONNECTION_LIMIT`                        | Pool size per process (default `10`)                            |
| `JWT_SECRET`                                 | Token signing secret (min 32 chars)                             |
| `JWT_EXPIRES_IN`                             | Token lifetime (default `7d`)                                   |
| `FRONTEND_URL`                               | Allowed CORS origins (comma-separated)                          |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account; password min 8 chars                          |
| `KITCHEN_*` / `CASHIER_*` / `DELIVERY_*`     | Staff emails and passwords; passwords min 8 chars               |
| `FAWATERAK_*`                                | Payment gateway credentials, webhook secret, and redirect URLs  |

`.env` is git-ignored and excluded from Vercel uploads by `.vercelignore`; configure real values in Vercel instead.

Payment callbacks need publicly reachable URLs (`FAWATERAK_CALLBACK_URL`) when testing outside localhost — use a tunnel such as ngrok.

## API overview

All endpoints are prefixed with `/api`.

| Route            | Notes                                                      |
| ---------------- | ---------------------------------------------------------- |
| `/health`        | Liveness check                                             |
| `/auth`          | register, login, current user (JWT)                        |
| `/menu`          | public menu list; admin CRUD lives under `/admin/menu`     |
| `/orders`        | create, list mine; status timeline source                  |
| `/payments`      | Fawaterak checkout session + `/webhook` callback           |
| `/reservations`  | create, list mine                                          |
| `/admin`         | stats, all orders/reservations, menu management            |
| `/config`        | public site config (brand, categories, payment methods)    |

Rate limits are applied globally and tightened on auth, checkout, reservation, and payment routes (overrides in `.env`).

## Production build

```bash
npm run build      # emits server/dist and client/dist
npm run start      # runs the API; serve client/dist with any static host or proxy it
```

`server/dist/server.js` is the traditional Node entrypoint: it bootstraps the database, applies the schema, ensures the default accounts, and starts the listener. The Vercel entrypoint is different — see below.

## Deploying to Vercel

The repository deploys as one Vercel project using [Services](https://vercel.com/docs/services). The final routing configuration is:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "client": {
      "root": "client",
      "framework": "vite"
    },
    "server": {
      "root": "server",
      "framework": "express"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": {
        "service": "server"
      }
    },
    {
      "source": "/(.*)",
      "destination": {
        "service": "client"
      }
    }
  ]
}
```

- `client` (`client/`, Vite) is public at `/` and serves the SPA fallback.
- `server` (`server/`, Express) is public at `/api/*`; the original path is preserved.
- Vercel services are internal by default, so the top-level rewrites expose both on the shared domain.
- There are no service bindings. The client calls the API on the same origin at `/api`, and the server does not call the client.
- The serverless entrypoint is `server/src/index.ts`, which exports the Express app without opening a listener or running database bootstrap. Local Node hosting uses `server/src/server.ts`.

### Deployment steps

1. **Log in and link the project.** Run these from this directory:

   ```bash
   npx vercel login
   npx vercel link
   ```

   Set the project framework preset to **Services**. Deploying with the CLI from this folder avoids repository-root issues; for Git-based deployments, make this folder its own repository first.

2. **Add environment variables.** In **Project Settings → Environment Variables** (or with `npx vercel env add <NAME> production`), configure at least `NODE_ENV=production`, `DB_*`, `JWT_SECRET`, `FRONTEND_URL`, the `ADMIN_*` and staff variables, and `FAWATERAK_*`. Use `https://<your-domain>` for `FRONTEND_URL` and the payment redirect URLs.

3. **Use a remotely reachable MySQL database.** `DB_HOST` cannot be `localhost` or a local-only port. Vercel Functions do not run `ensureDatabase`, the schema initializer, or the seed on startup, so initialize the remote database once from your machine with the same `DB_*`, `JWT_SECRET`, and account values used in Vercel:

   ```powershell
   $env:DB_HOST='your-remote-host'
   $env:DB_PORT='3306'
   $env:DB_USER='your-user'
   $env:DB_PASSWORD='your-password'
   $env:DB_NAME='hadramout_mandi'
   $env:JWT_SECRET='<same 32+ character secret>'
   $env:ADMIN_EMAIL='admin@hadramout-mandi.com'
   $env:ADMIN_PASSWORD='<admin password, 8+ characters>'

   npm run db:init
   npm run db:seed
   ```

4. **Deploy:**

   ```bash
   npx vercel --prod
   ```

5. **Set the Fawaterak URLs** to the deployment domain, then redeploy if you changed them after the first deployment:

   ```text
   FAWATERAK_CALLBACK_URL=https://<your-domain>/api/payments/webhook
   FAWATERAK_SUCCESS_URL=https://<your-domain>/orders?payment=success
   FAWATERAK_CANCEL_URL=https://<your-domain>/checkout?payment=cancelled
   ```

6. **Validate the deployment:**

   ```bash
   curl https://<your-domain>/api/health
   curl https://<your-domain>/api/menu
   ```

   Then open `https://<your-domain>/`, `/orders`, and log in as an admin.

### Serverless notes

- Each function instance creates its own MySQL pool. Keep `DB_CONNECTION_LIMIT` low (for example `3`) and use a database provider that allows connections from Vercel; there is no fixed outbound IP.
- Environment variable changes apply to new deployments, so redeploy after editing them.
- The local `.env` is never uploaded; production values live in Vercel project settings.

### Local verification with Vercel CLI

Stop `npm run dev` first (it uses port 3000), then exercise both services through the public routing table:

```bash
npx vercel dev --local
```

Open http://localhost:3000. `--local` uses the local `.env` and does not pull environment variables from Vercel.

On Windows, Vercel CLI can occasionally lose the detached Vite process after its dependency-sync watcher fires. If `/` returns `500` while `/api/health` works, rerun `vercel dev` after `npm install` has settled.
