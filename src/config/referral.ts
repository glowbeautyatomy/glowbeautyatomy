export type CountryCode =
  | 'kr'
  | 'au'
  | 'ph'
  | 'us'
  | 'ca'
  | 'gb'
  | 'nz'
  | 'sg'
  | 'my'
  | 'in'
  | 'za'
  | 'ie'

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
  us: {
    mallUrl: 'https://www.atomy.com/us',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_US',
  },
  ca: {
    mallUrl: 'https://www.atomy.com/ca',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_CA',
  },
  gb: {
    mallUrl: 'https://www.atomy.com/gb',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_GB',
  },
  nz: {
    mallUrl: 'https://www.atomy.com/nz',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_NZ',
  },
  sg: {
    mallUrl: 'https://www.atomy.com/sg',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_SG',
  },
  my: {
    mallUrl: 'https://www.atomy.com/my',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_MY',
  },
  in: {
    mallUrl: 'https://www.atomy.com/in',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_IN',
  },
  za: {
    mallUrl: 'https://www.atomy.com/za',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_ZA',
  },
  ie: {
    mallUrl: 'https://www.atomy.com/ie',
    sponsorParam: 'sponsor',
    sponsorId: 'REPLACE_ME_IE',
  },
}

export function buildReferralUrl(country: CountryCode): string {
  const entry = referralConfig[country]
  const url = new URL(entry.mallUrl)
  url.searchParams.set(entry.sponsorParam, entry.sponsorId)
  return url.toString()
}
