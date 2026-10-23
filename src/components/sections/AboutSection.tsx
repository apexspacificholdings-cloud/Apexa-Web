'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const steps = 60
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="heading-display font-light text-[var(--text-primary)]"
        style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1 }}>
        {count}{suffix}
      </span>
    </div>
  )
}

const stats = [
  { value: 12,  suffix: '',  label: 'Years' },
  { value: 340, suffix: '+', label: 'Homes delivered' },
  { value: 8,   suffix: '',  label: 'Cities' },
  { value: 94,  suffix: '%', label: 'Referral rate' },
]

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-content">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[var(--border-strong)]" />
          <span className="label text-[var(--text-muted)]">About Apex</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — counters */}
          <div>
            <motion.h2
              className="heading-display text-display-lg text-[var(--text-primary)] mb-12 text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              A legacy in every{' '}
              <em className="italic-serif">address</em>
            </motion.h2>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                  className="flex flex-col gap-2"
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  <span className="label text-[var(--text-muted)]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — editorial text */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-[var(--text-secondary)] text-lg font-light leading-relaxed mb-6 text-pretty">
              We build homes for people who notice the details: the way morning light falls across stone, the weight of a timber door, the quiet of a garden at dusk. Apex brings architecture, interiors and investment advice under one roof.
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed mb-10 text-pretty">
              Founded by Mohammed Ehsanullah, Apex Global Estates develops and curates luxury residences for families and investors across India and the Gulf. From the first site visit to handing over the keys, one team carries your project.
            </p>

            {/* Founder attribution */}
            <div className="flex items-center gap-4 pt-8 border-t border-[var(--border-light)]">
              <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] overflow-hidden">
                <div className="w-full h-full bg-[var(--border-default)]" />
              </div>
              <div>
                <p className="text-[var(--text-primary)] text-sm font-medium">Mohammed Ehsanullah</p>
                <p className="label text-[var(--text-muted)] mt-0.5">Founder & Managing Director</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
