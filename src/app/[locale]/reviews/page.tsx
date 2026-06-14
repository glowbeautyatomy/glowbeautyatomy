import Link from 'next/link'
import { getContentDoc, listContentSlugs } from '@/lib/content'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function ReviewsPage({ params }: { params: { locale: Locale } }) {
  const slugs = listContentSlugs('reviews', params.locale)
  const docs = await Promise.all(
    slugs.map((slug) => getContentDoc('reviews', params.locale, slug))
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Reviews</h1>
      {docs.map((doc) => (
        <Link
          key={doc.slug}
          href={`/${params.locale}/reviews/${doc.slug}`}
          className="block rounded-xl bg-white p-5 shadow transition-transform hover:scale-[1.01]"
        >
          <h2 className="font-bold">{doc.title}</h2>
          <p className="text-sm text-gray-600">{doc.description}</p>
        </Link>
      ))}
    </div>
  )
}
