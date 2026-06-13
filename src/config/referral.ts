export type CountryCode = 'kr' | 'au' | 'ph'

interface ReferralEntry {
  mallUrl: string
  sponsorParam: string
  sponsorId: string
}

// Replace the REPLACE_ME_* sponsor IDs with the real Atomy sponsor/referral
// IDs before launch. Mall URLs are placeholders for the official per-country
// Atomy malls and should be verified against global.atomy.com.
export const referralConfig: Record<CountryCode, ReferralEntry> = {
  kr: {
    mallUrl: 'https://kr.atomy.com',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_KR',
  },
  au: {
    mallUrl: 'https://www.atomy.com/au',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_AU',
  },
  ph: {
    mallUrl: 'https://www.atomy.com/ph',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_PH',
  },
}

export function buildReferralUrl(country: CountryCode): string {
  const entry = referralConfig[country]
  const url = new URL(entry.mallUrl)
  url.searchParams.set(entry.sponsorParam, entry.sponsorId)
  return url.toString()
}
