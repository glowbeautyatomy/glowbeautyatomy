import { locales, type Locale } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function HomePage({ params }: { params: { locale: Locale } }) {
  return <div>Home: {params.locale}</div>
}
