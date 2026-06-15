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
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">{dict.nav.join}</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {docs.map((doc) => (
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
    </div>
  )
}
