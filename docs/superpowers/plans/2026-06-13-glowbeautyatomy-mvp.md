# GlowBeautyAtomy MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the v1 GlowBeautyAtomy site — a bilingual (KO/EN) Next.js content site with a hip animated home page, trust FAQ, country join guides, and product reviews, with all CTAs routing through a single referral-config module to Atomy's official malls.

**Architecture:** Next.js 14 App Router with a `[locale]` segment for `/ko` and `/en`, middleware-based locale redirect, markdown-backed content (gray-matter + remark) for join guides and reviews, Tailwind CSS for styling with custom gradient/marquee/float animations, Framer Motion for hover/scroll motion.

**Tech Stack:** Next.js 14.2.5, React 18.3.1, TypeScript, Tailwind CSS 3 (+ @tailwindcss/typography), Framer Motion, gray-matter + remark, Vitest + React Testing Library.

---

## Task 1: Project scaffold & tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `next-env.d.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "glowbeautyatomy",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "framer-motion": "11.3.19",
    "gray-matter": "4.0.3",
    "remark": "15.0.1",
    "remark-html": "16.0.1"
  },
  "devDependencies": {
    "typescript": "5.5.4",
    "@types/node": "20.14.15",
    "@types/react": "18.3.3",
    "@types/react-dom": "18.3.0",
    "tailwindcss": "3.4.7",
    "@tailwindcss/typography": "0.5.13",
    "postcss": "8.4.40",
    "autoprefixer": "10.4.19",
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5",
    "vitest": "2.0.5",
    "@vitejs/plugin-react": "4.3.1",
    "@testing-library/react": "16.0.0",
    "@testing-library/jest-dom": "6.4.8",
    "jsdom": "24.1.1"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm install`
Expected: completes with no errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 3: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Write `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 5: Write `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

- [ ] **Step 6: Write `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 7: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        shine: 'shine 8s ease infinite',
        float: 'float 3s ease-in-out infinite',
        marquee: 'marquee 18s linear infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [typography],
}

export default config
```

- [ ] **Step 8: Write `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 9: Write `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

- [ ] **Step 10: Write `vitest.setup.ts`**

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 11: Write `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 12: Write `src/app/layout.tsx`**

```tsx
import type { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'GlowBeautyAtomy',
  description: 'Global Atomy sign-up guide & K-beauty reviews',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  )
}
```

- [ ] **Step 13: Write `src/app/page.tsx` (placeholder, replaced in Task 2)**

```tsx
export default function RootPage() {
  return <div className="p-8">Loading...</div>
}
```

- [ ] **Step 14: Verify the project builds**

Run: `npm run build`
Expected: build completes successfully (exit code 0), output shows the `/` route compiled.

- [ ] **Step 15: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts .eslintrc.json next-env.d.ts vitest.config.ts vitest.setup.ts src/app/globals.css src/app/layout.tsx src/app/page.tsx
git commit -m "Scaffold Next.js project with Tailwind, TypeScript and Vitest"
```

---

## Task 2: i18n routing (middleware, locale layout, language switcher)

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/lib/i18n.test.ts`
- Create: `middleware.ts`
- Create: `src/lib/dictionaries.ts`
- Create: `src/components/LanguageSwitcher.tsx`
- Create: `src/components/LanguageSwitcher.test.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx` (minimal placeholder, replaced in Task 5)
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Write the failing test for locale detection**

Create `src/lib/i18n.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getLocaleFromHeader } from './i18n'

describe('getLocaleFromHeader', () => {
  it('returns ko for Korean accept-language', () => {
    expect(getLocaleFromHeader('ko-KR,ko;q=0.9,en;q=0.8')).toBe('ko')
  })

  it('returns en for English accept-language', () => {
    expect(getLocaleFromHeader('en-US,en;q=0.9')).toBe('en')
  })

  it('falls back to default locale for unsupported language', () => {
    expect(getLocaleFromHeader('fr-FR,fr;q=0.9')).toBe('en')
  })

  it('falls back to default locale when header is missing', () => {
    expect(getLocaleFromHeader(null)).toBe('en')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/i18n.test.ts`
Expected: FAIL — `Cannot find module './i18n'` or `getLocaleFromHeader is not a function`.

- [ ] **Step 3: Write `src/lib/i18n.ts`**

```ts
export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function getLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  return (locales as readonly string[]).includes(preferred ?? '')
    ? (preferred as Locale)
    : defaultLocale
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/i18n.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Write `middleware.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { locales, getLocaleFromHeader } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocaleFromHeader(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
```

- [ ] **Step 6: Write `src/lib/dictionaries.ts`**

```ts
import type { Locale } from './i18n'

export const dictionaries = {
  ko: {
    nav: { join: '가입 가이드', reviews: '리뷰', faq: 'FAQ' },
    home: {
      badge: '🔥 전세계 27개국 K-뷰티 인사이더',
      title: 'GlowBeautyAtomy',
      subtitle: 'K-뷰티 최저가 + 가입 혜택, 당신의 나라에서 시작하세요',
      cta: '한국에서 가입하기',
      trends: [
        '🇦🇺 호주에서 인기',
        '🇦🇱 알바니아에서 화제',
        '🇧🇷 브라질에서 급성장',
        'K-뷰티, 전세계로',
      ],
      cards: [
        {
          href: '/ko/join/korea',
          emoji: '🌍',
          title: '국가별 가입 가이드',
          description: '내 나라에서 애터미 가입하는 법',
        },
        {
          href: '/ko/reviews',
          emoji: '✨',
          title: '솔직 리뷰',
          description: '실제 사용 후기 모음',
        },
        {
          href: '/ko/faq',
          emoji: '💬',
          title: '신뢰 FAQ',
          description: '"이거 사기 아니야?" 궁금증 해결',
        },
      ],
    },
  },
  en: {
    nav: { join: 'Join Guide', reviews: 'Reviews', faq: 'FAQ' },
    home: {
      badge: '🔥 K-Beauty Insider in 27+ Countries',
      title: 'GlowBeautyAtomy',
      subtitle: 'Best K-beauty deals + sign-up perks, start from your country',
      cta: 'Join from Australia',
      trends: [
        '🇦🇺 Trending in Australia',
        '🇦🇱 Hot in Albania',
        '🇧🇷 Growing fast in Brazil',
        'K-Beauty Goes Global',
      ],
      cards: [
        {
          href: '/en/join/australia',
          emoji: '🌍',
          title: 'Country Join Guides',
          description: 'How to join Atomy from your country',
        },
        {
          href: '/en/reviews',
          emoji: '✨',
          title: 'Honest Reviews',
          description: 'Real reviews from real users',
        },
        {
          href: '/en/faq',
          emoji: '💬',
          title: 'Trust FAQ',
          description: 'Is Atomy legit? All your questions answered',
        },
      ],
    },
  },
} as const

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
```

- [ ] **Step 7: Write the failing test for LanguageSwitcher**

Create `src/components/LanguageSwitcher.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageSwitcher } from './LanguageSwitcher'

vi.mock('next/navigation', () => ({
  usePathname: () => '/ko/faq',
}))

describe('LanguageSwitcher', () => {
  it('links to the equivalent path in the other locale', () => {
    render(<LanguageSwitcher currentLocale="ko" />)
    expect(screen.getByRole('link', { name: 'EN' })).toHaveAttribute('href', '/en/faq')
    expect(screen.getByRole('link', { name: 'KO' })).toHaveAttribute('href', '/ko/faq')
  })
})
```

- [ ] **Step 8: Run test to verify it fails**

Run: `npx vitest run src/components/LanguageSwitcher.test.tsx`
Expected: FAIL — `Cannot find module './LanguageSwitcher'`.

- [ ] **Step 9: Write `src/components/LanguageSwitcher.tsx`**

```tsx
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-1 text-sm font-bold">
      {locales.map((locale) => {
        const targetPath = pathname.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
        return (
          <Link
            key={locale}
            href={targetPath}
            className={locale === currentLocale ? 'underline' : 'text-gray-400'}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npx vitest run src/components/LanguageSwitcher.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 11: Write `src/app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const languages = Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]))

  return {
    alternates: {
      canonical: `/${params.locale}`,
      languages,
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(params.locale as Locale)) {
    notFound()
  }
  const locale = params.locale as Locale
  const dict = getDictionary(locale)
  const joinHref = locale === 'ko' ? `/${locale}/join/korea` : `/${locale}/join/australia`

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <a href={`/${locale}`} className="text-xl font-extrabold">
          GlowBeautyAtomy
        </a>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <a href={joinHref}>{dict.nav.join}</a>
          <a href={`/${locale}/reviews`}>{dict.nav.reviews}</a>
          <a href={`/${locale}/faq`}>{dict.nav.faq}</a>
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </header>
      {children}
    </div>
  )
}
```

- [ ] **Step 12: Write minimal `src/app/[locale]/page.tsx` placeholder**

```tsx
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  return <div>Home: {params.locale}</div>
}
```

- [ ] **Step 13: Replace `src/app/page.tsx` with a redirect to the default locale**

```tsx
import { redirect } from 'next/navigation'
import { defaultLocale } from '@/lib/i18n'

export default function RootPage() {
  redirect(`/${defaultLocale}`)
}
```

- [ ] **Step 14: Run full test suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build completes successfully.

- [ ] **Step 15: Commit**

```bash
git add src/lib/i18n.ts src/lib/i18n.test.ts middleware.ts src/lib/dictionaries.ts src/components/LanguageSwitcher.tsx src/components/LanguageSwitcher.test.tsx src/app/[locale]/layout.tsx src/app/[locale]/page.tsx src/app/page.tsx
git commit -m "Add KO/EN i18n routing with middleware and language switcher"
```

---

## Task 3: Referral config + CtaButton

**Files:**
- Create: `src/config/referral.ts`
- Create: `src/config/referral.test.ts`
- Create: `src/components/CtaButton.tsx`
- Create: `src/components/CtaButton.test.tsx`

- [ ] **Step 1: Write the failing test for referral URL building**

Create `src/config/referral.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildReferralUrl } from './referral'

describe('buildReferralUrl', () => {
  it('appends the sponsor id as a query parameter for Korea', () => {
    const url = buildReferralUrl('kr')
    expect(url).toContain('sponsor=REPLACE_ME_KR')
    expect(url.startsWith('https://kr.atomy.com')).toBe(true)
  })

  it('appends the sponsor id as a query parameter for Australia', () => {
    const url = buildReferralUrl('au')
    expect(url).toContain('sponsor=REPLACE_ME_AU')
  })

  it('appends the sponsor id as a query parameter for the Philippines', () => {
    const url = buildReferralUrl('ph')
    expect(url).toContain('sponsor=REPLACE_ME_PH')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/config/referral.test.ts`
Expected: FAIL — `Cannot find module './referral'`.

- [ ] **Step 3: Write `src/config/referral.ts`**

> Replace the `REPLACE_ME_*` sponsor IDs with the real Atomy sponsor/referral IDs before launch. Mall URLs are placeholders for the official per-country Atomy malls and should be verified against `global.atomy.com`.

```ts
export type CountryCode = 'kr' | 'au' | 'ph'

interface ReferralEntry {
  mallUrl: string
  sponsorParam: string
  sponsorId: string
}

export const referralConfig: Record<CountryCode, ReferralEntry> = {
  kr: {
    mallUrl: 'https://kr.atomy.com',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_KR',
  },
  au: {
    mallUrl: 'https://www.atomy.com/au',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_AU',
  },
  ph: {
    mallUrl: 'https://www.atomy.com/ph',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_PH',
  },
}

export function buildReferralUrl(country: CountryCode): string {
  const entry = referralConfig[country]
  const url = new URL(entry.mallUrl)
  url.searchParams.set(entry.sponsorParam, entry.sponsorId)
  return url.toString()
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/config/referral.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Write the failing test for CtaButton**

Create `src/components/CtaButton.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CtaButton } from './CtaButton'

describe('CtaButton', () => {
  it('renders a link to the referral URL with the given label', () => {
    render(<CtaButton country="kr" label="가입하기" />)
    const link = screen.getByRole('link', { name: '가입하기' })
    expect(link).toHaveAttribute('href', expect.stringContaining('sponsor=REPLACE_ME_KR'))
    expect(link).toHaveAttribute('target', '_blank')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/components/CtaButton.test.tsx`
Expected: FAIL — `Cannot find module './CtaButton'`.

- [ ] **Step 7: Write `src/components/CtaButton.tsx`**

```tsx
import Link from 'next/link'
import { buildReferralUrl, type CountryCode } from '@/config/referral'

interface CtaButtonProps {
  country: CountryCode
  label: string
}

export function CtaButton({ country, label }: CtaButtonProps) {
  const href = buildReferralUrl(country)
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-gray-900 px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105"
    >
      {label}
    </Link>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/components/CtaButton.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 9: Commit**

```bash
git add src/config/referral.ts src/config/referral.test.ts src/components/CtaButton.tsx src/components/CtaButton.test.tsx
git commit -m "Add referral config and CtaButton component"
```

---

## Task 4: Markdown content loader

**Files:**
- Create: `src/lib/content.ts`
- Create: `src/lib/content.test.ts`
- Create: `content/__fixtures__/shared/sample.md`

- [ ] **Step 1: Write the fixture content file**

Create `content/__fixtures__/shared/sample.md`:

```md
---
title: "Sample Title"
description: "Sample description"
---

# Hello

This is a **test**.
```

- [ ] **Step 2: Write the failing test for the content loader**

Create `src/lib/content.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { getContentDoc, listContentSlugs } from './content'

describe('getContentDoc', () => {
  it('parses frontmatter and converts markdown body to html', async () => {
    const doc = await getContentDoc('__fixtures__', 'shared', 'sample')
    expect(doc.title).toBe('Sample Title')
    expect(doc.description).toBe('Sample description')
    expect(doc.contentHtml).toContain('<strong>test</strong>')
  })
})

describe('listContentSlugs', () => {
  it('lists markdown filenames without extension', () => {
    const slugs = listContentSlugs('__fixtures__', 'shared')
    expect(slugs).toContain('sample')
  })

  it('returns an empty array for a missing directory', () => {
    expect(listContentSlugs('__fixtures__', 'missing-locale')).toEqual([])
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run src/lib/content.test.ts`
Expected: FAIL — `Cannot find module './content'`.

- [ ] **Step 4: Write `src/lib/content.ts`**

```ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const contentDir = path.join(process.cwd(), 'content')

export interface ContentDoc {
  slug: string
  title: string
  description: string
  contentHtml: string
  [key: string]: unknown
}

export async function getContentDoc(
  category: string,
  locale: string,
  slug: string
): Promise<ContentDoc> {
  const filePath = path.join(contentDir, category, locale, `${slug}.md`)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const processed = await remark().use(remarkHtml).process(content)

  return {
    ...data,
    slug,
    title: data.title,
    description: data.description,
    contentHtml: processed.toString(),
  }
}

export function listContentSlugs(category: string, locale: string): string[] {
  const dir = path.join(contentDir, category, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run src/lib/content.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/lib/content.ts src/lib/content.test.ts content/__fixtures__/shared/sample.md
git commit -m "Add markdown content loader with gray-matter and remark"
```

---

## Task 5: Home page (Hero, TrendBanner, FeatureCard)

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/Hero.test.tsx`
- Create: `src/components/TrendBanner.tsx`
- Create: `src/components/TrendBanner.test.tsx`
- Create: `src/components/FeatureCard.tsx`
- Create: `src/components/FeatureCard.test.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the failing test for Hero**

Create `src/components/Hero.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders title, subtitle, badge and CTA link', () => {
    render(
      <Hero
        title="GlowBeautyAtomy"
        subtitle="Subtitle text"
        badge="Badge text"
        ctaLabel="Join Now"
        ctaCountry="kr"
      />
    )
    expect(screen.getByText('GlowBeautyAtomy')).toBeInTheDocument()
    expect(screen.getByText('Subtitle text')).toBeInTheDocument()
    expect(screen.getByText('Badge text')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Join Now' })).toHaveAttribute(
      'href',
      expect.stringContaining('sponsor=REPLACE_ME_KR')
    )
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: FAIL — `Cannot find module './Hero'`.

- [ ] **Step 3: Write `src/components/Hero.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import { CtaButton } from './CtaButton'
import type { CountryCode } from '@/config/referral'

interface HeroProps {
  title: string
  subtitle: string
  badge: string
  ctaLabel: string
  ctaCountry: CountryCode
}

export function Hero({ title, subtitle, badge, ctaLabel, ctaCountry }: HeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="animate-shine bg-300% rounded-2xl bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-300 px-8 py-12 text-center text-gray-900"
    >
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4 inline-block rounded-full bg-white/60 px-4 py-1 text-sm font-bold"
      >
        {badge}
      </motion.span>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mb-6 text-lg font-medium">{subtitle}</p>
      <CtaButton country={ctaCountry} label={ctaLabel} />
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 5: Write the failing test for TrendBanner**

Create `src/components/TrendBanner.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrendBanner } from './TrendBanner'

describe('TrendBanner', () => {
  it('renders the provided trend items', () => {
    render(<TrendBanner items={['Trending in Australia', 'Hot in Brazil']} />)
    expect(screen.getAllByText(/Trending in Australia/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Hot in Brazil/).length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npx vitest run src/components/TrendBanner.test.tsx`
Expected: FAIL — `Cannot find module './TrendBanner'`.

- [ ] **Step 7: Write `src/components/TrendBanner.tsx`**

```tsx
interface TrendBannerProps {
  items: string[]
}

export function TrendBanner({ items }: TrendBannerProps) {
  const text = items.join('   ·   ')
  return (
    <div className="mt-6 overflow-hidden rounded-lg bg-gray-900 py-2">
      <div className="animate-marquee whitespace-nowrap text-sm font-semibold text-white">
        {text}
        {'   '}
        {text}
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npx vitest run src/components/TrendBanner.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 9: Write the failing test for FeatureCard**

Create `src/components/FeatureCard.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeatureCard } from './FeatureCard'

describe('FeatureCard', () => {
  it('renders a link with the title, description and emoji', () => {
    render(
      <FeatureCard
        href="/en/faq"
        emoji="💬"
        title="Trust FAQ"
        description="Is Atomy legit?"
      />
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/en/faq')
    expect(screen.getByText('Trust FAQ')).toBeInTheDocument()
    expect(screen.getByText('Is Atomy legit?')).toBeInTheDocument()
    expect(screen.getByText('💬')).toBeInTheDocument()
  })
})
```

- [ ] **Step 10: Run test to verify it fails**

Run: `npx vitest run src/components/FeatureCard.test.tsx`
Expected: FAIL — `Cannot find module './FeatureCard'`.

- [ ] **Step 11: Write `src/components/FeatureCard.tsx`**

```tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface FeatureCardProps {
  href: string
  emoji: string
  title: string
  description: string
}

export function FeatureCard({ href, emoji, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 28px rgba(0,0,0,0.15)' }}
      className="rounded-xl bg-white p-5 shadow"
    >
      <Link href={href}>
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-2 inline-block text-3xl"
        >
          {emoji}
        </motion.span>
        <h3 className="mb-1 text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 12: Run test to verify it passes**

Run: `npx vitest run src/components/FeatureCard.test.tsx`
Expected: PASS (1 test).

- [ ] **Step 13: Replace `src/app/[locale]/page.tsx` with the full home page**

```tsx
import { Hero } from '@/components/Hero'
import { TrendBanner } from '@/components/TrendBanner'
import { FeatureCard } from '@/components/FeatureCard'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import type { CountryCode } from '@/config/referral'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const heroCountry: Record<Locale, CountryCode> = { ko: 'kr', en: 'au' }

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)

  return (
    <div className="space-y-8">
      <Hero
        title={dict.home.title}
        subtitle={dict.home.subtitle}
        badge={dict.home.badge}
        ctaLabel={dict.home.cta}
        ctaCountry={heroCountry[params.locale]}
      />
      <TrendBanner items={[...dict.home.trends]} />
      <div className="grid gap-4 sm:grid-cols-3">
        {dict.home.cards.map((card) => (
          <FeatureCard key={card.href} {...card} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 14: Run full test suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build completes successfully.

- [ ] **Step 15: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx src/components/TrendBanner.tsx src/components/TrendBanner.test.tsx src/components/FeatureCard.tsx src/components/FeatureCard.test.tsx "src/app/[locale]/page.tsx"
git commit -m "Build animated home page with Hero, TrendBanner and FeatureCards"
```

---

## Task 6: Trust FAQ page

**Files:**
- Create: `src/lib/faq-data.ts`
- Create: `src/lib/faq-data.test.ts`
- Create: `src/app/[locale]/faq/page.tsx`

- [ ] **Step 1: Write the failing test for FAQ data**

Create `src/lib/faq-data.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { faqData } from './faq-data'
import { locales } from './i18n'

describe('faqData', () => {
  it('has at least one entry for every supported locale', () => {
    for (const locale of locales) {
      expect(faqData[locale].length).toBeGreaterThan(0)
    }
  })

  it('has non-empty question/answer pairs for every locale', () => {
    for (const locale of locales) {
      for (const item of faqData[locale]) {
        expect(item.question.length).toBeGreaterThan(0)
        expect(item.answer.length).toBeGreaterThan(0)
      }
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/faq-data.test.ts`
Expected: FAIL — `Cannot find module './faq-data'`.

- [ ] **Step 3: Write `src/lib/faq-data.ts`**

```ts
import type { Locale } from './i18n'

export interface FaqItem {
  question: string
  answer: string
}

export const faqData: Record<Locale, FaqItem[]> = {
  ko: [
    {
      question: '애터미는 다단계인데, 사기 아닌가요?',
      answer:
        '애터미는 한국 공정거래위원회에 등록된 정식 직접판매 기업으로, 27개국에서 합법적으로 운영되고 있습니다. 불법 피라미드와 달리 실제 제품(생활용품, 화장품, 건강식품)을 판매하는 회사입니다. 다만 모든 직접판매업과 마찬가지로, 본인의 소비 패턴에 맞게 신중히 판단하는 것이 좋습니다.',
    },
    {
      question: '가입비가 있나요?',
      answer:
        '아니요, 애터미는 회원가입비가 무료입니다. 가입비를 요구하는 경우는 회사 정책 위반이니 주의하세요.',
    },
    {
      question: '해외에서도 가입할 수 있나요?',
      answer:
        '네, 애터미는 27개 법인 국가를 포함해 115개 이상의 지역에서 회원가입이 가능합니다. 거주 국가에 따라 가입 절차가 다르니, 국가별 가입 가이드를 참고하세요.',
    },
  ],
  en: [
    {
      question: 'Is Atomy a pyramid scheme?',
      answer:
        "Atomy is a legally registered direct-selling company operating in 27+ countries, regulated under fair-trade laws including Korea's Fair Trade Commission. Unlike illegal pyramid schemes, Atomy sells real consumer products (household goods, cosmetics, health supplements). As with any direct-selling business, it's worth evaluating based on your own consumption habits.",
    },
    {
      question: 'Is there a sign-up fee?',
      answer:
        "No, joining Atomy is free. If anyone asks you to pay a sign-up fee, that violates Atomy's official policy.",
    },
    {
      question: 'Can I join from any country?',
      answer:
        'Yes, Atomy is available for registration in 115+ regions, including 27 countries with local entities. The exact sign-up process depends on your country of residence — check our country guides for details.',
    },
  ],
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/faq-data.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `src/app/[locale]/faq/page.tsx`**

```tsx
import { faqData } from '@/lib/faq-data'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function FaqPage({ params }: { params: { locale: Locale } }) {
  const items = faqData[params.locale]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">FAQ</h1>
      {items.map((item) => (
        <div key={item.question} className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-2 font-bold">{item.question}</h2>
          <p className="text-sm text-gray-700">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 6: Run full test suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build completes successfully, `/ko/faq` and `/en/faq` routes appear in the build output.

- [ ] **Step 7: Commit**

```bash
git add src/lib/faq-data.ts src/lib/faq-data.test.ts "src/app/[locale]/faq/page.tsx"
git commit -m "Add bilingual trust FAQ page"
```

---

## Task 7: Country join guides

**Files:**
- Create: `content/join/ko/korea.md`
- Create: `content/join/en/australia.md`
- Create: `content/join/en/philippines.md`
- Create: `src/app/[locale]/join/[country]/page.tsx`

- [ ] **Step 1: Write `content/join/ko/korea.md`**

```md
---
title: "한국에서 애터미 가입하는 방법"
description: "한국 거주자를 위한 애터미 회원가입 절차 안내"
country: "kr"
ctaLabel: "한국 애터미 공식몰에서 가입하기"
---

## 가입 절차

1. 애터미 한국 공식 사이트에 접속합니다.
2. "회원가입" 메뉴를 선택합니다.
3. 추천인 ID를 입력합니다 (아래 버튼으로 자동 입력됩니다).
4. 본인 정보와 계좌 정보를 입력하고 가입을 완료합니다.

## 가입 시 혜택

- 정품 인증된 제품을 합리적인 가격에 구매할 수 있습니다.
- 신제품/이벤트 정보를 가장 먼저 안내받을 수 있습니다.
- 궁금한 점이 생기면 커뮤니티를 통해 빠르게 답변받을 수 있습니다.

가입비는 무료이며, 가입을 이유로 금전을 요구받는 경우는 회사 정책 위반입니다.
```

- [ ] **Step 2: Write `content/join/en/australia.md`**

```md
---
title: "How to Join Atomy from Australia"
description: "Step-by-step Atomy sign-up guide for residents of Australia"
country: "au"
ctaLabel: "Join via Atomy Australia's Official Site"
---

## Sign-Up Steps

1. Visit Atomy's official Australia site.
2. Select "Become a Member" / sign-up.
3. Enter the sponsor ID (auto-filled when you use the button below).
4. Fill in your personal details and bank information to complete registration.

## Benefits of Joining

- Access genuine Atomy products at member pricing.
- Get early updates on new products and promotions.
- Get quick answers to your questions through our community.

Membership is completely free. If anyone asks you to pay a sign-up fee, that violates Atomy's official policy.
```

- [ ] **Step 3: Write `content/join/en/philippines.md`**

```md
---
title: "How to Join Atomy from the Philippines"
description: "Step-by-step Atomy sign-up guide for residents of the Philippines"
country: "ph"
ctaLabel: "Join via Atomy Philippines' Official Site"
---

## Sign-Up Steps

1. Visit Atomy's official Philippines site.
2. Select "Become a Member" / sign-up.
3. Enter the sponsor ID (auto-filled when you use the button below).
4. Fill in your personal details and bank information to complete registration.

## Benefits of Joining

- Access genuine Atomy products at member pricing.
- Get early updates on new products and promotions.
- Get quick answers to your questions through our community.

Membership is completely free. If anyone asks you to pay a sign-up fee, that violates Atomy's official policy.
```

- [ ] **Step 4: Write `src/app/[locale]/join/[country]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { CtaButton } from '@/components/CtaButton'
import { locales, type Locale } from '@/lib/i18n'
import type { CountryCode } from '@/config/referral'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    listContentSlugs('join', locale).map((country) => ({ locale, country }))
  )
}

export default async function JoinCountryPage({
  params,
}: {
  params: { locale: Locale; country: string }
}) {
  const slugs = listContentSlugs('join', params.locale)
  if (!slugs.includes(params.country)) {
    notFound()
  }

  const doc = await getContentDoc('join', params.locale, params.country)
  const countryCode = doc.country as CountryCode

  return (
    <article className="space-y-6">
      <h1 className="text-2xl font-extrabold">{doc.title}</h1>
      <p className="text-gray-600">{doc.description}</p>
      <div
        className="prose prose-sm max-w-none rounded-xl bg-white p-5 shadow"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <CtaButton country={countryCode} label={doc.ctaLabel as string} />
    </article>
  )
}
```

- [ ] **Step 5: Run full test suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build completes successfully, build output includes `/ko/join/korea`, `/en/join/australia`, `/en/join/philippines`.

- [ ] **Step 6: Manually verify a join page renders correctly**

Run: `npm run dev`, then open `http://localhost:3000/en/join/australia` in a browser.
Expected: page shows the title "How to Join Atomy from Australia", the steps/benefits content, and a "Join via Atomy Australia's Official Site" button that links to `https://www.atomy.com/au?sponsor=REPLACE_ME_AU`.

- [ ] **Step 7: Commit**

```bash
git add content/join "src/app/[locale]/join/[country]/page.tsx"
git commit -m "Add country join guides for Korea, Australia and the Philippines"
```

---

## Task 8: Product reviews

**Files:**
- Create: `content/reviews/ko/hemohim.md`
- Create: `content/reviews/en/hemohim.md`
- Create: `src/app/[locale]/reviews/page.tsx`
- Create: `src/app/[locale]/reviews/[product]/page.tsx`

- [ ] **Step 1: Write `content/reviews/ko/hemohim.md`**

```md
---
title: "애터미 헴오힘 솔직 리뷰: 어떤 제품이고 누구에게 맞을까"
description: "애터미 베스트셀러 면역 건강식품 헴오힘에 대한 솔직한 리뷰"
country: "kr"
ctaLabel: "애터미 공식몰에서 헴오힘 확인하기"
---

## 헴오힘이란?

헴오힘은 한국원자력연구원의 연구에서 출발한 애터미의 대표 건강식품으로, 당귀·천궁·백작약을 발효한 혼합 성분으로 면역 관리를 돕는 제품입니다.

## 장점

- 애터미 전세계 회원들 사이에서 가장 많이 사용되고 리뷰된 제품 중 하나입니다.
- 1회분씩 포장되어 휴대와 섭취가 편리합니다.

## 고려할 점

- 모든 건강식품과 마찬가지로 개인별 체감 효과는 다를 수 있으며, 의약품을 대체하지 않습니다.
- 구매 전 공식몰과 오픈마켓 재판매가의 가격을 비교해보는 것을 추천합니다.

공식 채널을 통해 회원가로 구매하고 싶다면 아래 버튼을 이용하세요.
```

- [ ] **Step 2: Write `content/reviews/en/hemohim.md`**

```md
---
title: "Atomy HemoHIM Review: What It Is and Who It's For"
description: "An honest look at Atomy's bestselling HemoHIM immune supplement"
country: "au"
ctaLabel: "Check HemoHIM on Atomy Australia"
---

## What is HemoHIM?

HemoHIM is Atomy's flagship health supplement, originally developed from research by Korea's Atomic Energy Research Institute. It's a fermented blend of Angelica gigas, Cnidium officinale, and Paeonia lactiflora, marketed for immune support.

## Pros

- Widely used and reviewed across Atomy's global member base.
- Comes in convenient single-serve daily pouches.

## Things to consider

- As with any supplement, individual results vary — it is not a substitute for medical treatment.
- Compare pricing between the official mall and third-party resellers before buying.

If you'd like to try it through an official channel with member pricing, use the link below.
```

- [ ] **Step 3: Write `src/app/[locale]/reviews/page.tsx`**

```tsx
import Link from 'next/link'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ReviewsPage({ params }: { params: { locale: Locale } }) {
  const slugs = listContentSlugs('reviews', params.locale)
  const docs = await Promise.all(
    slugs.map((slug) => getContentDoc('reviews', params.locale, slug))
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Reviews</h1>
      {docs.map((doc) => (
        <Link
          key={doc.slug}
          href={`/${params.locale}/reviews/${doc.slug}`}
          className="block rounded-xl bg-white p-5 shadow transition-transform hover:scale-[1.01]"
        >
          <h2 className="font-bold">{doc.title}</h2>
          <p className="text-sm text-gray-600">{doc.description}</p>
        </Link>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Write `src/app/[locale]/reviews/[product]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { CtaButton } from '@/components/CtaButton'
import { locales, type Locale } from '@/lib/i18n'
import type { CountryCode } from '@/config/referral'

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    listContentSlugs('reviews', locale).map((product) => ({ locale, product }))
  )
}

export default async function ReviewProductPage({
  params,
}: {
  params: { locale: Locale; product: string }
}) {
  const slugs = listContentSlugs('reviews', params.locale)
  if (!slugs.includes(params.product)) {
    notFound()
  }

  const doc = await getContentDoc('reviews', params.locale, params.product)
  const countryCode = doc.country as CountryCode

  return (
    <article className="space-y-6">
      <h1 className="text-2xl font-extrabold">{doc.title}</h1>
      <p className="text-gray-600">{doc.description}</p>
      <div
        className="prose prose-sm max-w-none rounded-xl bg-white p-5 shadow"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <CtaButton country={countryCode} label={doc.ctaLabel as string} />
    </article>
  )
}
```

- [ ] **Step 5: Run full test suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build completes successfully, build output includes `/ko/reviews`, `/en/reviews`, `/ko/reviews/hemohim`, `/en/reviews/hemohim`.

- [ ] **Step 6: Manually verify the reviews flow**

Run: `npm run dev`, then open `http://localhost:3000/en/reviews` and click through to the HemoHIM review.
Expected: list page shows the HemoHIM card; detail page renders the review content and a CTA linking to `https://www.atomy.com/au?sponsor=REPLACE_ME_AU`.

- [ ] **Step 7: Commit**

```bash
git add content/reviews "src/app/[locale]/reviews"
git commit -m "Add product reviews list and HemoHIM review page"
```

---

## Task 9: Push and verify deployment

**Files:** none (deployment verification only)

- [ ] **Step 1: Push to GitHub**

```bash
git push origin main
```

Expected: push succeeds (use the PAT-based auth flow set up earlier if prompted).

- [ ] **Step 2: Verify Vercel build**

In the Vercel dashboard, open the `glowbeautyatomy` project and check the latest deployment triggered by this push.
Expected: build succeeds (Next.js build logs show all `/ko/*` and `/en/*` routes), and the deployment URL serves the home page with the gradient hero.

- [ ] **Step 3: Smoke-test the live site**

Visit the deployment URL for `/`, `/ko`, `/en`, `/en/faq`, `/en/join/australia`, `/en/reviews/hemohim`.
Expected: `/` redirects to `/en` (or `/ko` based on browser language), all pages render without errors, and CTA buttons link to the correct `atomy.com` URLs with `sponsor=REPLACE_ME_*` query params.

- [ ] **Step 4: Note follow-ups (not part of this plan)**

Record as a TODO for the next planning cycle: replace `REPLACE_ME_*` sponsor IDs in `src/config/referral.ts` with real Atomy sponsor IDs and verify official mall URLs per country before driving real traffic.
