import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ScrollProgress } from '@/components/ScrollProgress'
import { AuroraBackground } from '@/components/AuroraBackground'
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
  const joinHref = `/${locale}/join`
  const currentYear = new Date().getFullYear()

  return (
    <>
      <ScrollProgress />
      <AuroraBackground />

      {/* Promo bar */}
      <div className="bg-luxe-promo text-center text-[0.78rem] font-medium tracking-wide text-white">
        <div className="mx-auto max-w-6xl px-4 py-2.5">{dict.promo}</div>
      </div>

      <header className="sticky top-0 z-50 border-b border-luxe-line bg-luxe-cream/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <a
            href={`/${locale}`}
            className="font-serif text-2xl font-semibold italic tracking-tight text-luxe-ink transition-colors hover:text-luxe-accent"
          >
            GlowBeautyAtomy
          </a>
          <nav className="flex items-center gap-7 text-xs font-medium uppercase tracking-luxe text-luxe-ink/75">
            <a href={joinHref} className="link-underline transition-colors hover:text-luxe-ink">
              {dict.nav.join}
            </a>
            <a href={`/${locale}/reviews`} className="link-underline transition-colors hover:text-luxe-ink">
              {dict.nav.reviews}
            </a>
            <a href={`/${locale}/faq`} className="link-underline transition-colors hover:text-luxe-ink">
              {dict.nav.faq}
            </a>
            <span className="h-3.5 w-px bg-luxe-line" />
            <LanguageSwitcher currentLocale={locale} />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">{children}</main>

      <footer className="mt-24 border-t border-luxe-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-12 text-center">
          <span className="font-serif text-xl italic text-luxe-ink">GlowBeautyAtomy</span>
          <span className="eyebrow">K-Beauty · Atomy</span>
          <span className="mt-2 text-xs text-luxe-muted">© {currentYear} GlowBeautyAtomy. All rights reserved.</span>
        </div>
      </footer>
    </>
  )
}
