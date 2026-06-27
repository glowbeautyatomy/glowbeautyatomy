'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface FeatureCardProps {
  href: string
  emoji: string
  title: string
  description: string
}

export function FeatureCard({ href, emoji, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={href}
        className="luxe-card group relative flex h-full flex-col overflow-hidden p-7"
      >
        {/* top accent line grows on hover */}
        <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-luxe-accent transition-transform duration-500 group-hover:scale-x-100" />
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-luxe-cream text-2xl ring-1 ring-luxe-line transition-transform duration-500 group-hover:scale-110">
          {emoji}
        </span>
        <h3 className="font-serif text-xl font-semibold text-luxe-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-luxe-muted">{description}</p>
        <span className="eyebrow mt-6 inline-flex items-center gap-2 opacity-0 transition-all duration-500 group-hover:gap-3 group-hover:opacity-100">
          View
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </motion.div>
  )
}
