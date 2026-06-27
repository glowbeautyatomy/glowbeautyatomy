import Link from 'next/link'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function JoinIndexPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  const slugs = listContentSlugs('join', params.locale)
  const docs = await Promise.all(
    slugs.map((slug) => getContentDoc('join', params.locale, slug))
  )

  return (
    <div className="space-y-10">
      <header className="border-b border-luxe-line pb-6">
        <span className="eyebrow mb-3 block">Global Join</span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-luxe-ink">
          {dict.nav.join}
        </h1>
      </header>
      <div className="grid gap-6 sm:grid-cols-3">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/${params.locale}/join/${doc.slug}`}
            className="luxe-card group flex items-center gap-4 p-6"
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
        ))}
      </div>
    </div>
  )
}
