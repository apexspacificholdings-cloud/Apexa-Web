'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

type Property = {
  id: string; slug: string; name: string; type: string
  country: string; city: string; beds: number; status: string
  layoutVariant: number; image: string; shortDescription: string
}

const COUNTRIES = ['All', 'UAE', 'India', 'Australia', 'USA', 'Malaysia']
const TYPES     = ['All', 'residential', 'commercial', 'mixed_use']
const TYPE_LABELS: Record<string, string> = {
  All: 'All types', residential: 'Residential', commercial: 'Commercial', mixed_use: 'Mixed use'
}

export function PropertiesClient({ properties }: { properties: Property[] }) {
  const [country, setCountry]   = useState('All')
  const [type, setType]         = useState('All')

  const filtered = useMemo(() =>
    properties.filter((p) => {
      if (country !== 'All' && p.country !== country) return false
      if (type !== 'All' && p.type !== type) return false
      return true
    }), [properties, country, type]
  )

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-24">
        <div className="container-content">

          {/* Page header */}
          <div className="mb-16 pt-8">
            <span className="label text-[var(--text-muted)] block mb-4">Our Portfolio</span>
            <h1 className="heading-display text-display-xl text-[var(--text-primary)] text-balance">
              Signature <em className="italic-serif">residences</em>
            </h1>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-6 mb-16 pb-8 border-b border-[var(--border-light)]">
            <div className="flex flex-wrap gap-2">
              <span className="label text-[var(--text-muted)] self-center mr-2">Location</span>
              {COUNTRIES.map((c) => (
                <button key={c} onClick={() => setCountry(c)}
                  className={cn('px-4 py-1.5 text-xs tracking-wide border transition-all duration-200',
                    country === c
                      ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--bg-card)]'
                      : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                  )}>
                  {c}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="label text-[var(--text-muted)] self-center mr-2">Type</span>
              {TYPES.map((t) => (
                <button key={t} onClick={() => setType(t)}
                  className={cn('px-4 py-1.5 text-xs tracking-wide border transition-all duration-200',
                    type === t
                      ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--bg-card)]'
                      : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                  )}>
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
            <span className="label text-[var(--text-muted)] ml-auto">{filtered.length} results</span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
              >
                <Link href={`/properties/${property.slug}`} className="group block">
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/5' }}>
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="label text-white/70 bg-black/40 px-2 py-0.5">{property.country}</span>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-[var(--bg-primary)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                        <ArrowUpRight size={14} className="text-[var(--text-primary)]" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <h2 className="heading-display text-display-sm text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {property.name}
                  </h2>
                  <p className="label text-[var(--text-muted)]">
                    {TYPE_LABELS[property.type]} · {property.city} · {property.beds}BR
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-[var(--text-muted)]">No properties match your current filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
