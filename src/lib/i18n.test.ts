import { describe, it, expect } from 'vitest'
import { getLocaleFromHeader } from './i18n'

describe('getLocaleFromHeader', () => {
  it('returns ko for Korean accept-language', () => {
    expect(getLocaleFromHeader('ko-KR,ko;q=0.9,en;q=0.8')).toBe('ko')
  })

  it('returns en for English accept-language', () => {
    expect(getLocaleFromHeader('en-US,en;q=0.9')).toBe('en')
  })

  it('falls back to default locale for unsupported language', () => {
    expect(getLocaleFromHeader('fr-FR,fr;q=0.9')).toBe('en')
  })

  it('falls back to default locale when header is missing', () => {
    expect(getLocaleFromHeader(null)).toBe('en')
  })
})
