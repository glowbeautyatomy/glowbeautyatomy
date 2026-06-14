'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CtaButton } from './CtaButton'
import type { CountryCode } from '@/config/referral'

interface HeroProps {
  title: string
  subtitle: string
  badge: string
  ctaLabel: string
  ctaCountry: CountryCode
}

export function Hero({ title, subtitle, badge, ctaLabel, ctaCountry }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`rounded-2xl bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-300 px-8 py-12 text-center text-gray-900 ${
        shouldReduceMotion ? '' : 'animate-shine bg-300%'
      }`}
    >
      <motion.span
        animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4 inline-block rounded-full bg-white/60 px-4 py-1 text-sm font-bold"
      >
        {badge}
      </motion.span>
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight">{title}</h1>
      <p className="mb-6 text-lg font-medium">{subtitle}</p>
      <CtaButton country={ctaCountry} label={ctaLabel} />
    </motion.div>
  )
}
