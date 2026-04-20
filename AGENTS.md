# Agent Instructions

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (next build)
npm run lint         # ESLint (eslint-config-next + typescript)
npx prisma generate  # Regenerate Prisma client (required after schema changes, before build)
npx prisma db push   # Push schema to database without migration
npx prisma migrate dev  # Create a new migration
```

## Architecture

- **Next.js 16** with App Router, React 19, Turbopack
- **Proxy (not middleware):** `src/proxy.ts` — Next.js 16 renames `middleware.ts` to `proxy.ts`. The exported function must be named `proxy`, not `middleware`.
- **i18n:** `next-intl` with locales `en` (default) and `pt`. Locale prefix is `as-needed` (default locale has no prefix). Messages live in `messages/en.json` and `messages/pt.json`. The public site routes are under `src/app/[locale]/`.
- **Admin panel:** Routes under `src/app/kirby-admin/` are **outside** the i18n locale system. Uses Supabase auth with server actions (`src/app/kirby-admin/login/actions/login.ts`).
- **Database:** Prisma 7 with PostgreSQL via `@prisma/adapter-pg`. Generated client outputs to `generated/prisma/` (gitignored). Imports use the `@db/*` path alias which maps to `./generated/prisma/*`.
- **Supabase:** Three client instances — `src/lib/supabase/client.ts` (browser), `server.ts` (server components), `admin.ts` (service role). The `proxy.ts` file uses `src/lib/supabase/proxy.ts` for auth session refresh.
- **Styling:** Tailwind CSS v4 with custom color palettes (berwickberry, plantation, royal) defined in `src/app/globals.css`. shadcn/ui with new-york style. Custom fonts loaded via `@font-face` in globals.css (not next/font).
- **Animations:** Framer Motion, OGL (WebGL), and GSAP.

## Path Aliases

| Alias   | Resolves to            |
| ------- | ---------------------- |
| `@/*`   | `./src/*`              |
| `@db/*` | `./generated/prisma/*` |

## Key Conventions

- Do NOT add comments to code unless explicitly requested.
- Commit message style: `type(scope): description` (e.g., `refactor(prisma): move generated client out of src`).
- Prisma generated files are in `generated/prisma/`, NOT in `src/`. Always run `npx prisma generate` after modifying `prisma/schema.prisma`.
- The admin panel uses hardcoded Portuguese strings — it does not use next-intl.
- Theme toggle cycles through `light → dark → system`, stored in cookies. Dark mode class is toggled on `<html>`.

## Environment Variables

Required in `.env.local`:

```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

The `prisma.config.ts` and `src/lib/prisma.ts` both load `dotenv/config` for `DATABASE_URL`.
