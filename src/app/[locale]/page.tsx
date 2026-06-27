import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { TrendBanner } from '@/components/TrendBanner'
import { FeatureCard } from '@/components/FeatureCard'
import { Reveal, RevealItem } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
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
    <div className="space-y-20 sm:space-y-28">
      <div className="space-y-10">
        <Hero
          title={dict.home.title}
          subtitle={dict.home.subtitle}
          badge={dict.home.badge}
          ctaLabel={dict.home.cta}
          ctaCountry={heroCountry[params.locale]}
          ctaHref={heroCtaHref[params.locale]}
        />
        <Reveal direction="none" delay={0.1}>
          <TrendBanner items={[...dict.home.trends]} />
        </Reveal>
      </div>

      <section>
        <Reveal stagger className="grid gap-5 sm:grid-cols-3">
          {dict.home.cards.map((card) => (
            <RevealItem key={card.href} className="h-full">
              <FeatureCard {...card} />
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="K-Beauty Picks"
          title={dict.home.reviewsTitle}
          action={
            <Link
              href={`/${params.locale}/reviews`}
              className="eyebrow link-underline text-luxe-ink/70 transition-colors hover:text-luxe-accent"
            >
              {dict.home.reviewsMore}
            </Link>
          }
        />
        <Reveal stagger className="grid gap-6 sm:grid-cols-3">
          {reviewDocs.map((doc) => (
            <RevealItem key={doc.slug} className="h-full">
              <Link
                href={`/${params.locale}/reviews/${doc.slug}`}
                className="luxe-card group relative flex h-full items-start gap-4 overflow-hidden p-7"
              >
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-luxe-accent transition-transform duration-500 group-hover:scale-x-100" />
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-luxe-cream text-2xl ring-1 ring-luxe-line transition-transform duration-500 group-hover:scale-110">
                  {doc.emoji as string}
                </span>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-luxe-ink">{doc.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-luxe-muted">{doc.description}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Global Join"
          title={dict.home.countriesTitle}
          action={
            <Link
              href={`/${params.locale}/join`}
              className="eyebrow link-underline text-luxe-ink/70 transition-colors hover:text-luxe-accent"
            >
              {dict.home.countriesMore}
            </Link>
          }
        />
        <Reveal stagger className="grid gap-6 sm:grid-cols-3">
          {countryDocs.map((doc) => (
            <RevealItem key={doc.slug} className="h-full">
              <Link
                href={`/${params.locale}/join/${doc.slug}`}
                className="luxe-card group flex h-full items-center gap-4 p-6"
              >
                <span className="text-3xl transition-transform duration-500 group-hover:scale-125">
                  {doc.flag as string}
                </span>
                <span className="font-serif text-lg font-semibold text-luxe-ink">
                  Atomy {doc.name as string}
                </span>
                <span aria-hidden="true" className="ml-auto text-luxe-accent opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </section>
    </div>
  )
}
