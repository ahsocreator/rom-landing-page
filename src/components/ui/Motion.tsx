import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function MotionStagger({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function MotionFade({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={itemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  )
}

const sectionVariants = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export function MotionSection({
  children,
  className,
  ...rest
}: { children: ReactNode } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
