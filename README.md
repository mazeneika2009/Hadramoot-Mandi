# Hadramout House of Mandi · حضرموت بيت المندي

Full-stack platform for a Hadramout-style mandi restaurant: an Arabic-first storefront for browsing the menu, ordering delivery, and reserving tables, plus an admin panel for managing dishes, orders, and reservations.

## Features

**Storefront**

- Menu with categories, search, and live availability
- Cart with a slide-over drawer; checkout with delivery address and notes
- Payment via [Fawaterak](https://fawaterk.com) (Vodafone Cash, Fawry, cards) with webhook confirmation
- Table reservations with time-slot picking and a "my reservations" list
- Order tracking page with a live status timeline (auto-refresh every 30s)
- JWT auth (login/register), Arabic RTL UI throughout

**Admin** (`/admin`, admin role required)

- Overview dashboard: order/revenue/reservation stats and recent orders
- CRUD for menu items with image preview and availability toggle
- Order management: filter by status/payment, update statuses inline
- Reservation management: confirm or decline bookings

## Stack

| Layer    | Tech                                                                     |
| -------- | ------------------------------------------------------------------------ |
| Client   | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 3, React Router 7         |
| Server   | Express 5, TypeScript 5.9, mysql2, Helmet, express-rate-limit, Zod-free validators via express-validator |
| Database | MySQL 8                                                                  |
| Shared   | `shared/` — API types and site config (brand, categories, statuses)      |
| Payments | Fawaterak gateway (HMAC-SHA256 webhooks)                                 |

Monorepo managed with npm workspaces (`server`, `client`).

## Project structure

```
hadrmoot/
├── client/               # Vite React app
│   └── src/
│       ├── api/          # typed API clients
│       ├── components/   # layout, menu, orders, ui
│       ├── context/      # auth, cart, toast providers
│       └── pages/        # routes (+ pages/admin)
├── server/               # Express API
│   └── src/
│       ├── routes/       # auth, menu, orders, payments, reservations, admin, config
│       ├── db/           # pool, schema init, seed
│       └── config/       # env parsing
├── shared/               # api types + site config
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

Create the database and load the schema (menu items + default admin):

```bash
mysql -u root -p -e "CREATE DATABASE hadramout_mandi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
npm run db:init
npm run db:seed
```

`db:seed` inserts the admin account from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` — change those before seeding.

### Run

```bash
npm run dev        # API :3000 + client :5173, with hot reload
```

Open http://localhost:5173.

## Scripts

| Command                  | What it does                                    |
| ------------------------ | ----------------------------------------------- |
| `npm run dev`            | Run server and client together (concurrently)   |
| `npm run dev:server`     | API only (`tsx watch`)                          |
| `npm run dev:client`     | Vite dev server only                            |
| `npm run build`          | Type-check + build server (tsup) and client     |
| `npm run typecheck`      | `tsc --noEmit` for both workspaces              |
| `npm run start`          | Serve the built API (`node dist/index.js`)      |
| `npm run db:init`        | Create tables                                   |
| `npm run db:seed`        | Seed menu items and the admin user              |

## Environment variables

See [`.env.example`](.env.example) for the full list. The essentials:

| Variable          | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `PORT`            | API port (default `3000`)                           |
| `DB_HOST/PORT/USER/PASSWORD/NAME` | MySQL connection                     |
| `JWT_SECRET`      | Token signing secret (min 32 chars)                |
| `FRONTEND_URL`    | Allowed CORS origins (comma-separated)              |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Admin account created by `db:seed`   |
| `FAWATERAK_*`     | Payment gateway credentials and callback URLs       |

Payment callbacks need publicly reachable URLs (`FAWATERAK_CALLBACK_URL`) when testing outside localhost — use a tunnel such as ngrok.

## API overview

All endpoints are prefixed with `/api`.

| Route            | Notes                                                      |
| ---------------- | ---------------------------------------------------------- |
| `/auth`          | register, login, current user (JWT)                        |
| `/menu`          | public menu list; admin CRUD lives under `/admin/menu`     |
| `/orders`        | create, list mine; status timeline source                  |
| `/payments`      | Fawaterak checkout session + `/webhook` callback            |
| `/reservations`  | create, list mine                                          |
| `/admin`         | stats, all orders/reservations, menu management            |
| `/config`        | public site config (brand, categories, payment methods)    |

Rate limits are applied globally and tightened on auth, checkout, reservation, and payment routes (overrides in `.env`).

## Production build

```bash
npm run build      # emits server/dist and client/dist
npm run start      # runs the API; serve client/dist with any static host or proxy it
```
