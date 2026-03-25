# Personal Portfolio — Jim Ling

A personal portfolio website built with Next.js, designed to present professional experience, skills, and contact information to senior engineering managers, technical recruiters, and startup founders.

Inspired by [Brittany Chiang's portfolio](https://brittanychiang.com).

## Features

- Two-column sticky layout on desktop — fixed left column with scroll-spy navigation, scrollable right column
- Mouse-following spotlight effect (dark mode)
- Ghost cards with hover interactions for experience and project entries
- Electric Moss accent color system (`oklch`) with WCAG AA contrast in both light and dark mode
- Contact form with Google reCAPTCHA v3 and Upstash Redis rate limiting
- Light/dark mode toggle via `next-themes`
- Fully responsive — single column on mobile with sticky section headers

## Stack

- **Next.js 16** — App Router, TypeScript strict mode
- **Tailwind CSS v4** — config via `@theme` in `globals.css`, no `tailwind.config.ts`
- **Framer Motion v12** — scroll-triggered animations, reduced motion support
- **Shadcn UI** (base-nova) — Base UI primitives instead of Radix
- **Upstash Redis** — serverless-safe rate limiting for the contact API
- **Google reCAPTCHA v3** — bot protection on contact form submissions

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build + TypeScript check
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## Environment Variables

```bash
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=   # Google reCAPTCHA v3 site key
RECAPTCHA_SECRET_KEY=             # Google reCAPTCHA v3 secret key
KV_REST_API_URL=                  # Upstash Redis REST URL
KV_REST_API_TOKEN=                # Upstash Redis REST token
RESEND_API_KEY=                   # Email delivery API key
CONTACT_EMAIL=                    # Address to receive contact form submissions
```

## Deploy

Deployed on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
