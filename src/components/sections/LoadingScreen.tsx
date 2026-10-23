'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let current = 0
    const duration = 1800 // ms total
    const steps = 100
    const interval = duration / steps

    const timer = setInterval(() => {
      current += 1
      setCount(current)
      if (current >= 100) {
        clearInterval(timer)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 600)
        }, 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Brand mark */}
          <motion.div
            className="mb-12 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="heading-display text-display-sm tracking-widest text-[var(--text-primary)]"
              style={{ letterSpacing: '0.25em' }}
            >
              APEX
            </span>
            <span className="label text-[var(--text-muted)]">Global Estates</span>
          </motion.div>

          {/* Counter */}
          <div className="flex items-end gap-1">
            <span
              className="heading-display text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1, fontWeight: 300 }}
            >
              {count}
            </span>
            <span className="label text-[var(--text-muted)] mb-3">%</span>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-48 h-px bg-[var(--border-default)] overflow-hidden">
            <motion.div
              className="h-full bg-[var(--text-primary)]"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
