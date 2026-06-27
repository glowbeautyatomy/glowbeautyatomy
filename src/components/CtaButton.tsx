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
      className="group relative inline-flex items-center gap-3 overflow-hidden bg-luxe-ink px-9 py-4 text-xs font-semibold uppercase tracking-luxe text-white transition-colors duration-300 hover:bg-luxe-accent"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative">{label}</span>
      <span aria-hidden="true" className="relative transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </Link>
  )
}
