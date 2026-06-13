export const locales = ['ko', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export function getLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  return (locales as readonly string[]).includes(preferred ?? '')
    ? (preferred as Locale)
    : defaultLocale
}
