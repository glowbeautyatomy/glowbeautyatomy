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
    <article className="mx-auto max-w-3xl space-y-7">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gradient-to-br from-luxe-blush via-luxe-sand to-[#CDE5F4] text-7xl shadow-soft">
        <div className="absolute left-1/2 top-4 h-40 w-40 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
        <span className="relative">{doc.emoji as string}</span>
        <span className="pointer-events-none absolute inset-3 border border-white/40" />
      </div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight text-luxe-ink">{doc.title}</h1>
      <p className="text-lg text-luxe-muted">{doc.description}</p>
      <div
        className="prose prose-neutral max-w-none border-y border-luxe-line py-7 prose-headings:font-serif prose-headings:text-luxe-ink prose-a:text-luxe-accent"
        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
      />
      <CtaButton country={countryCode} label={doc.ctaLabel as string} />
      <Comments locale={params.locale} />
    </article>
  )
}
