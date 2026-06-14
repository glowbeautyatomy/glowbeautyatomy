import { describe, it, expect } from 'vitest'
import { faqData } from './faq-data'
import { locales } from './i18n'

describe('faqData', () => {
  it('has at least one entry for every supported locale', () => {
    for (const locale of locales) {
      expect(faqData[locale].length).toBeGreaterThan(0)
    }
  })

  it('has non-empty question/answer pairs for every locale', () => {
    for (const locale of locales) {
      for (const item of faqData[locale]) {
        expect(item.question.length).toBeGreaterThan(0)
        expect(item.answer.length).toBeGreaterThan(0)
      }
    }
  })
})
