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
