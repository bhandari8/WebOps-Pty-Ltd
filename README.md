# WebOps Pty Ltd — Website Prototype

A static frontend prototype for WebOps Pty Ltd, an Australian IT and
digital services company: a marketing site (Home, About, Services,
Portfolio, Contact) plus a mock content-admin panel at `/admin`.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The public site
needs no setup. To try the admin panel, go to
[http://localhost:3000/admin](http://localhost:3000/admin) and sign in
with **any** email/password — it's a mock login, not real
authentication (see [docs/limitations-and-improvements.md](./docs/limitations-and-improvements.md)).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Tech stack

Next.js (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Lenis (smooth scroll, landing page only) · AOS
(scroll animation, landing page only).

## Where things live

```
src/app/(marketing)/   public pages (Home, About, Services, Portfolio, Contact)
src/app/admin/         mock admin panel
src/components/        UI, grouped by feature area
src/data/              static seed data — the only source of "content" today
src/repositories/      the swap point for a real backend — see docs/architecture.md
src/hooks/             data-fetching + form logic used by pages/components
src/types/             shared TypeScript models
```