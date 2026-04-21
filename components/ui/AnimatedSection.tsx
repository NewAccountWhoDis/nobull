'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export function AnimatedSection({ children, className = '', delay = 0, id }: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  )
}
