'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

interface FeatureCardProps {
  href: string
  emoji: string
  title: string
  description: string
}

export function FeatureCard({ href, emoji, title, description }: FeatureCardProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 12px 28px rgba(0,0,0,0.15)' }}
      className="rounded-xl bg-white p-5 shadow"
    >
      <Link href={href}>
        <motion.span
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-2 inline-block text-3xl"
        >
          {emoji}
        </motion.span>
        <h3 className="mb-1 text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Link>
    </motion.div>
  )
}
