import { faqData } from '@/lib/faq-data'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function FaqPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  const items = faqData[params.locale]

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">{dict.nav.faq}</h1>
      {items.map((item) => (
        <div key={item.question} className="rounded-xl bg-white p-5 shadow">
          <h2 className="mb-2 font-bold">{item.question}</h2>
          <p className="text-sm text-gray-700">{item.answer}</p>
        </div>
      ))}
    </div>
  )
}
