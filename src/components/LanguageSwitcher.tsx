'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { locales, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-2 text-xs font-medium tracking-luxe">
      {locales.map((locale) => {
        const targetPath = pathname.replace(`/${currentLocale}`, `/${locale}`) || `/${locale}`
        return (
          <Link
            key={locale}
            href={targetPath}
            className={
              locale === currentLocale
                ? 'text-luxe-accent'
                : 'text-luxe-ink/40 transition-colors hover:text-luxe-ink'
            }
          >
            {locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
