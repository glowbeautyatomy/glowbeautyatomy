'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
  /** Render as a stagger container; direct children should be <RevealItem>. */
  stagger?: boolean
}

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 36 },
  right: { x: -36 },
  none: {},
}

export function Reveal({ children, direction = 'up', delay = 0, className, stagger }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (stagger) {
    const container: Variants = {
      hidden: {},
      show: {
        transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12, delayChildren: delay },
      },
    }
    return (
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...offset[direction], filter: 'blur(8px)' },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Child of a <Reveal stagger> container. */
export function RevealItem({
  children,
  direction = 'up',
  className,
}: {
  children: ReactNode
  direction?: Direction
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()
  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, ...offset[direction], filter: 'blur(6px)' },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  )
}
