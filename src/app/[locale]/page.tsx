import { Hero } from '@/components/Hero'
import { TrendBanner } from '@/components/TrendBanner'
import { FeatureCard } from '@/components/FeatureCard'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import type { CountryCode } from '@/config/referral'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const heroCountry: Record<Locale, CountryCode | undefined> = { ko: 'kr', en: undefined }
const heroCtaHref: Record<Locale, string | undefined> = { ko: undefined, en: '/en/join' }

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
        ctaHref={heroCtaHref[params.locale]}
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
