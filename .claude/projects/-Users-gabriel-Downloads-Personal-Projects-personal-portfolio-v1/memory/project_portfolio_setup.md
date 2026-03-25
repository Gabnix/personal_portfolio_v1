---
name: Portfolio project setup
description: Tech stack, architecture decisions, and current design state for personal_portfolio_v1
type: project
---

## Stack
- Next.js 16 App Router, TypeScript strict mode
- Tailwind CSS v4 (config in globals.css @theme blocks only)
- Shadcn base-nova style (uses @base-ui/react, NOT Radix — no asChild, use render= prop)
- Framer Motion v12
- next-themes via Providers in layout

## Layout Architecture (post-overhaul)
Two-column layout on desktop (lg+):
- Left aside: `lg:sticky lg:top-0 lg:h-screen lg:w-[360px]` — LeftColumn component
- Right div: `lg:flex-1 lg:py-24` — section components

On mobile: stacked column; left column becomes static intro; sections have `sticky top-0 lg:hidden` headers.

## Key Components
- `SpotlightOverlay` — mouse-following radial gradient, sets --mouse-x/--mouse-y CSS vars
- `LeftColumn` — sticky sidebar with scroll-spy nav (IntersectionObserver), social links, ThemeToggle
- `Navbar` — returns null on "/" (home), renders normally on all other pages

## Design System
- Fonts: Inter (--font-inter) + Inter Tight (--font-inter-tight) from next/font/google
- Colors: strictly OKLCH, achromatic foundation + indigo accent oklch(0.55 0.22 275)
- Dark bg: oklch(0.18 0.01 260)
- Ghost cards: `.ghost-card` CSS class — hover bg + inset shadow
- Tech pills: `.tech-pill` CSS class — 10px, 0.18em tracking, uppercase

## Contact Form
- Lives at /contact/page.tsx
- Uses react-google-recaptcha-v3 + /api/contact route (Upstash Redis rate limiting)
- ContactSection on home page is just a CTA linking to /contact
