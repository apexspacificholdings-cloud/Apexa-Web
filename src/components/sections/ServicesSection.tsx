'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Luxury Villas',
    description:
      'Private homes on your land or ours, designed around orientation, gardens and the way your family lives.',
    href: '#contact',
  },
  {
    number: '02',
    title: 'Sky Residences',
    description:
      'Boutique towers with few homes per floor, landscaped terraces and concierge services.',
    href: '#contact',
  },
  {
    number: '03',
    title: 'Interior Studio',
    description:
      'Turnkey interiors with joinery, stone, lighting and styling, chosen and installed by our own team.',
    href: '#contact',
  },
  {
    number: '04',
    title: 'Global Advisory',
    description:
      'Acquisition, resale and portfolio advice for investors buying across India and the Gulf.',
    href: '#contact',
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-[var(--bg-card)]">
      <div className="container-content">

        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[var(--border-strong)]" />
          <span className="label text-[var(--text-muted)]">What we do</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <motion.h2
            className="heading-display text-display-lg text-[var(--text-primary)] text-balance"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            One team,{' '}
            <em className="italic-serif">end to end</em>
          </motion.h2>

          <motion.p
            className="text-[var(--text-secondary)] font-light leading-relaxed lg:pt-4 text-pretty"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Development, design and advice from a single studio, so nothing is lost between the drawing board and the front door.
          </motion.p>
        </div>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border-light)]">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="bg-[var(--bg-card)] p-10 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-[var(--text-muted)] tracking-widest">{service.number}</span>
                <Link
                  href={service.href}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  aria-label={`Discover ${service.title}`}
                >
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </Link>
              </div>
              <h3 className="heading-display text-display-sm text-[var(--text-primary)] mb-4">
                {service.title}
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="label text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors duration-300"
              >
                Discover
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
