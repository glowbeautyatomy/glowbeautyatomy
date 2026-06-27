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
    <article className="mx-auto max-w-3xl space-y-7">
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-luxe-ink">{doc.title}</h1>
      <p className="text-lg text-luxe-muted">{doc.description}</p>
      <div
        className="prose prose-neutral max-w-none border-y border-luxe-line py-7 prose-headings:font-serif prose-headings:text-luxe-ink prose-a:text-luxe-accent"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <CtaButton country={countryCode} label={doc.ctaLabel as string} />
    </article>
  )
}
