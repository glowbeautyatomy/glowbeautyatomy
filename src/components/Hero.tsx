'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { CtaButton } from './CtaButton'
import type { CountryCode } from '@/config/referral'

interface HeroProps {
  title: string
  subtitle: string
  badge: string
  ctaLabel: string
  ctaCountry?: CountryCode
  ctaHref?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export function Hero({ title, subtitle, badge, ctaLabel, ctaCountry, ctaHref }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Gentle editorial parallax.
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const artY = useTransform(scrollYProgress, [0, 1], [0, 70])
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section
      ref={ref}
      className="grid items-center gap-10 overflow-hidden lg:grid-cols-[1.05fr_1fr] lg:gap-14"
    >
      {/* Copy */}
      <motion.div style={{ y: shouldReduceMotion ? 0 : textY }} className="order-2 lg:order-1">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="eyebrow inline-flex items-center gap-3"
        >
          <span className="h-px w-8 bg-luxe-accent/60" />
          {badge}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="text-balance mt-5 font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-luxe-ink sm:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease }}
          className="text-pretty mt-6 max-w-md text-base leading-relaxed text-luxe-muted sm:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.36, ease }}
          className="mt-9"
        >
          {ctaHref ? (
            <Link
              href={ctaHref}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-luxe-ink px-9 py-4 text-xs font-semibold uppercase tracking-luxe text-white transition-colors duration-300 hover:bg-luxe-accent"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">{ctaLabel}</span>
              <span aria-hidden="true" className="relative transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ) : (
            <CtaButton country={ctaCountry as CountryCode} label={ctaLabel} />
          )}
        </motion.div>
      </motion.div>

      {/* Editorial visual panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        style={{ y: shouldReduceMotion ? 0 : artY, scale: shouldReduceMotion ? 1 : artScale }}
        className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-gradient-to-br from-luxe-blush via-luxe-sand to-[#CDE5F4] shadow-soft sm:aspect-[5/4] lg:order-2 lg:aspect-[4/5]"
      >
        {/* layered soft blooms */}
        <div className="absolute left-1/2 top-[18%] h-56 w-56 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
        <div className="absolute bottom-[-3rem] right-[-2rem] h-64 w-64 rounded-full bg-luxe-accent/15 blur-3xl animate-soft-drift" />
        {/* oversized serif monogram motif */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="select-none font-serif text-[14rem] leading-none text-luxe-ink/[0.07] sm:text-[18rem]">
            美
          </span>
        </div>
        <span className="animate-float absolute bottom-7 left-7 font-serif text-2xl italic text-luxe-ink/70">
          K-Beauty&nbsp;·&nbsp;Atomy
        </span>
        {/* thin frame */}
        <span className="pointer-events-none absolute inset-3 border border-white/40" />
      </motion.div>
    </section>
  )
}
