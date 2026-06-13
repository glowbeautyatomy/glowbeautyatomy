import { NextRequest, NextResponse } from 'next/server'
import { locales, getLocaleFromHeader } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  const locale = getLocaleFromHeader(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}
