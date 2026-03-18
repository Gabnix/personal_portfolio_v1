# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build (also runs TypeScript check)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## Stack

- **Next.js 16** with App Router and TypeScript (strict mode)
- **Tailwind CSS v4** — configuration lives entirely in `src/app/globals.css` using `@theme {}` blocks (no `tailwind.config.ts`)
- **Shadcn UI (base-nova style)** — uses Base UI (`@base-ui/react`) instead of Radix UI
- **Framer Motion v12** — all animation variants defined in `src/lib/animations.ts`
- **next-themes** — theme toggling via `<Providers>` in layout

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout: ThemeProvider, Navbar, Footer, Toaster
│   ├── page.tsx            # Home: composes all section components
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/             # Navbar, Footer, ThemeToggle, Providers
│   ├── sections/           # Full-width home page sections (HeroSection, etc.)
│   ├── shared/             # Reusable: AnimatedWrapper, SectionHeader, ProjectCard, SkillBadge
│   └── ui/                 # Shadcn auto-generated — do not edit
├── data/                   # Static content: projects.ts, skills.ts
├── hooks/                  # useScrollProgress.ts
├── lib/                    # utils.ts (cn helper), constants.ts, animations.ts
└── types/                  # index.ts: Project, Skill, Experience, NavLink interfaces
```

## Key Conventions

### Base UI vs Radix (important)
Shadcn is initialized with `style: "base-nova"` which uses `@base-ui/react` instead of Radix. This means:
- **No `asChild` prop** on any Shadcn component
- Use `render={<Component />}` prop instead for polymorphic rendering: `<SheetTrigger render={<Button />}>`
- For link-styled buttons, use `buttonVariants` directly: `<Link className={cn(buttonVariants({ variant: "outline" }))}>`

### `buttonVariants` is a client function
`src/components/ui/button.tsx` has `"use client"`. Any **server component** that calls `buttonVariants()` will fail at build time. Solutions:
- Add `"use client"` to the component, **or**
- Extract the link into a separate `"use client"` component (see `ProjectLinks.tsx` pattern)

### Tailwind v4 dark mode
Dark mode uses `@custom-variant dark (&:is(.dark *))` in `globals.css`. The `.dark` class is applied to `<html>` by next-themes. Use standard Tailwind `dark:` variants — they work correctly.

### Animation pattern
- `AnimatedWrapper` (`src/components/shared/AnimatedWrapper.tsx`) is the standard scroll-trigger primitive — wraps children in `whileInView` with `viewport={{ once: true }}`
- All variants (`fadeInUp`, `staggerContainer`, etc.) come from `src/lib/animations.ts`
- Components that use `motion.*` directly must have `"use client"`
- `useReducedMotion()` is handled inside `AnimatedWrapper` automatically

### Content is in `src/data/`
Update `src/data/projects.ts` and `src/data/skills.ts` to change portfolio content. Update `src/lib/constants.ts` for site metadata, nav links, and social URLs.
