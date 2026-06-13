import { describe, it, expect } from 'vitest'
import { buildReferralUrl } from './referral'

describe('buildReferralUrl', () => {
  it('appends the sponsor id as a query parameter for Korea', () => {
    const url = buildReferralUrl('kr')
    expect(url).toContain('sponsor=REPLACE_ME_KR')
    expect(url.startsWith('https://kr.atomy.com')).toBe(true)
  })

  it('appends the sponsor id as a query parameter for Australia', () => {
    const url = buildReferralUrl('au')
    expect(url).toContain('sponsor=REPLACE_ME_AU')
  })

  it('appends the sponsor id as a query parameter for the Philippines', () => {
    const url = buildReferralUrl('ph')
    expect(url).toContain('sponsor=REPLACE_ME_PH')
  })
})
