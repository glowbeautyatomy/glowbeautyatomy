'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Very subtle warm ambient wash for the light editorial canvas.
 * Soft blush/sand blooms that drift gently with scroll. Purely decorative.
 */
export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 110])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y1 }}
        className="absolute -left-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-luxe-blush/50 blur-[120px] animate-soft-drift"
      />
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : y2 }}
        className="absolute right-[-12rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-luxe-sand/60 blur-[120px] animate-soft-drift"
      />
    </div>
  )
}
