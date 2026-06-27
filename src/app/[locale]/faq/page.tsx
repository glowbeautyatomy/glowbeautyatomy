import { faqData } from '@/lib/faq-data'
import { getDictionary } from '@/lib/dictionaries'
import { Comments } from '@/components/Comments'
import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function FaqPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale)
  const items = faqData[params.locale]

  return (
    <div className="space-y-10">
      <header className="border-b border-luxe-line pb-6">
        <span className="eyebrow mb-3 block">Trust &amp; Answers</span>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-luxe-ink">
          {dict.nav.faq}
        </h1>
      </header>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.question} className="luxe-card p-7">
            <h2 className="mb-2 font-serif text-lg font-semibold text-luxe-ink">{item.question}</h2>
            <p className="text-sm leading-relaxed text-luxe-muted">{item.answer}</p>
          </div>
        ))}
      </div>
      <Comments locale={params.locale} />
    </div>
  )
}
