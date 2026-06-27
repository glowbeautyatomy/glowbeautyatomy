import Link from 'next/link'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ReviewsPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  const slugs = listContentSlugs('reviews', params.locale)
  const docs = await Promise.all(
    slugs.map((slug) => getContentDoc('reviews', params.locale, slug))
  )

  return (
    <div className="space-y-10">
      <header className="border-b border-luxe-line pb-6">
        <span className="eyebrow mb-3 block">K-Beauty Picks</span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-luxe-ink">
          {dict.nav.reviews}
        </h1>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/${params.locale}/reviews/${doc.slug}`}
            className="luxe-card group relative flex items-start gap-4 overflow-hidden p-7"
          >
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-luxe-accent transition-transform duration-500 group-hover:scale-x-100" />
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-luxe-cream text-2xl ring-1 ring-luxe-line transition-transform duration-500 group-hover:scale-110">
              {doc.emoji as string}
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-luxe-ink">{doc.title}</h2>
              <p className="mt-1 text-sm leading-relaxed text-luxe-muted">{doc.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
