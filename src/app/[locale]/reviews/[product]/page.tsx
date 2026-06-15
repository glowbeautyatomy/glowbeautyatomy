import { notFound } from 'next/navigation'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { CtaButton } from '@/components/CtaButton'
import { Comments } from '@/components/Comments'
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
      <div className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-r from-pink-200 via-yellow-100 to-sky-200 text-6xl">
        {doc.emoji as string}
      </div>
      <h1 className="text-2xl font-extrabold">{doc.title}</h1>
      <p className="text-gray-600">{doc.description}</p>
      <div
        className="prose prose-sm max-w-none rounded-xl bg-white p-5 shadow"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <CtaButton country={countryCode} label={doc.ctaLabel as string} />
      <Comments locale={params.locale} />
    </article>
  )
}
