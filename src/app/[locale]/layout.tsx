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
  const joinHref = `/${locale}/join`

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <header className="mb-6 flex items-center justify-between">
        <a href={`/${locale}`} className="text-xl font-extrabold text-atomy-dark">
          GlowBeautyAtomy
        </a>
        <nav className="flex items-center gap-4 text-sm font-semibold text-gray-700">
          <a href={joinHref} className="hover:text-atomy-dark">
            {dict.nav.join}
          </a>
          <a href={`/${locale}/reviews`} className="hover:text-atomy-dark">
            {dict.nav.reviews}
          </a>
          <a href={`/${locale}/faq`} className="hover:text-atomy-dark">
            {dict.nav.faq}
          </a>
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </header>
      {children}
    </div>
  )
}
