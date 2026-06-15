import Link from 'next/link'
import { buildReferralUrl, type CountryCode } from '@/config/referral'

interface CtaButtonProps {
  country: CountryCode
  label: string
}

export function CtaButton({ country, label }: CtaButtonProps) {
  const href = buildReferralUrl(country)
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-full bg-atomy-dark px-8 py-3 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-atomy"
    >
      {label}
    </Link>
  )
}
