import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { TrendBanner } from '@/components/TrendBanner'
import { FeatureCard } from '@/components/FeatureCard'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import type { CountryCode } from '@/config/referral'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const heroCountry: Record<Locale, CountryCode | undefined> = { ko: 'kr', en: undefined }
const heroCtaHref: Record<Locale, string | undefined> = { ko: undefined, en: '/en/join' }

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)

  const reviewSlugs = listContentSlugs('reviews', params.locale).slice(0, 3)
  const reviewDocs = await Promise.all(
    reviewSlugs.map((slug) => getContentDoc('reviews', params.locale, slug))
  )

  const countrySlugs = listContentSlugs('join', params.locale).slice(0, 6)
  const countryDocs = await Promise.all(
    countrySlugs.map((slug) => getContentDoc('join', params.locale, slug))
  )

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

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">{dict.home.reviewsTitle}</h2>
          <Link href={`/${params.locale}/reviews`} className="text-sm font-semibold text-atomy-dark">
            {dict.home.reviewsMore}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {reviewDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${params.locale}/reviews/${doc.slug}`}
              className="flex items-start gap-3 rounded-xl bg-white p-5 shadow transition-transform hover:scale-[1.01]"
            >
              <span className="text-2xl">{doc.emoji as string}</span>
              <div>
                <h3 className="font-bold">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold">{dict.home.countriesTitle}</h2>
          <Link href={`/${params.locale}/join`} className="text-sm font-semibold text-atomy-dark">
            {dict.home.countriesMore}
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {countryDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/${params.locale}/join/${doc.slug}`}
              className="flex items-center gap-3 rounded-xl bg-white p-5 shadow transition-transform hover:scale-[1.02]"
            >
              <span className="text-3xl">{doc.flag as string}</span>
              <span className="font-bold">Atomy {doc.name as string}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
