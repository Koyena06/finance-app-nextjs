## Finance App

Finance App built from the Next.js Learn course: invoices, customers and
revenue behind a login. Night-blue / light-blue theme with square corners.

### Setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env` and fill in:
   - `POSTGRES_URL`: your Postgres connection string (SSL required)
   - `AUTH_SECRET`: generate with `openssl rand -base64 32`
3. Create and fill the tables by visiting `/seed` once (safe to run again).
4. Start it: `pnpm dev` (or `pnpm build && pnpm start`)

Log in with the seeded user: **user@nextmail.com** / **123456**

### Pages

| URL | What |
| --- | --- |
| `/` | Landing page |
| `/login` | Log in (protected pages send you here, then back) |
| `/dashboard` | Overview: totals, revenue chart, latest invoices |
| `/dashboard/invoices` | Search, paginate, edit and delete invoices |
| `/dashboard/invoices/create` | New invoice |
| `/dashboard/invoices/[id]/edit` | Edit invoice |
| `/dashboard/customers` | Customers with search and totals |

`/dashboard/overview` and `/customer` redirect to the pages above.

### Before deploying

`/seed` and `/query` are tutorial helper routes that are not behind the login.
Delete `app/seed` and `app/query` once your database is set up.

### Theme

Colors live in `tailwind.config.ts` (`night-*` and `ice-*`). Every border
radius token is set to `0` there, so corners stay square everywhere.
