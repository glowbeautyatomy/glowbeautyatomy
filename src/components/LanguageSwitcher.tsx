'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  return (
    <div className="flex gap-1 text-sm font-bold">
      {locales.map((locale) => {
        const targetPath = pathname.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
        return (
          <Link
            key={locale}
            href={targetPath}
            className={locale === currentLocale ? 'text-atomy-dark underline' : 'text-gray-400'}
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
