'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const properties = [
  {
    id: 1,
    slug: 'aurelia-villa',
    name: 'Aurelia Villa',
    type: 'Contemporary villa',
    location: 'Hyderabad',
    beds: '5 bedrooms',
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    slug: 'the-meridian',
    name: 'The Meridian',
    type: 'Sky residence',
    location: 'Dubai',
    beds: '3–5 bedrooms',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    slug: 'horizon-pavilion',
    name: 'Horizon Pavilion',
    type: 'Mixed use',
    location: 'Kuala Lumpur',
    beds: '2–4 bedrooms',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    slug: 'verdant-house',
    name: 'Verdant House',
    type: 'Signature villa',
    location: 'Mumbai',
    beds: '6 bedrooms',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    slug: 'ivory-residences',
    name: 'Ivory Residences',
    type: 'Boutique tower',
    location: 'Melbourne',
    beds: '1–3 bedrooms',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
  },
]

export function CollectionSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'start',
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section id="collection" className="section-padding bg-[var(--bg-primary)] overflow-hidden">

      {/* Section header */}
      <div className="container-content mb-12">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-[var(--border-strong)]" />
              <span className="label text-[var(--text-muted)]">Signature Residences</span>
            </div>
            <motion.h2
              className="heading-display text-display-lg text-[var(--text-primary)] text-balance"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              The{' '}
              <em className="italic-serif">collection</em>
            </motion.h2>
          </div>

          {/* Action & Arrow controls */}
          <div className="flex items-center gap-6">
            <Link
              href="/properties"
              className="hidden sm:inline-flex items-center gap-1.5 label text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Explore all</span>
              <ArrowUpRight size={13} />
            </Link>
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="w-10 h-10 border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-300"
                aria-label="Previous"
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
              </button>
              <button
                onClick={scrollNext}
                className="w-10 h-10 border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-all duration-300"
                aria-label="Next"
              >
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 pl-[clamp(1.5rem,5vw,4rem)]">
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              className="relative flex-none cursor-pointer group"
              style={{ width: 'clamp(300px, 38vw, 520px)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.6 }}
            >
              <Link href={`/properties/${property.slug}`} className="block">
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Number */}
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-xs text-white/70 tracking-widest bg-black/30 px-2 py-0.5">
                      {String(i + 1).padStart(2, '0')} / {String(properties.length).padStart(2, '0')}
                    </span>
                  </div>
                  {/* Hover icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-[var(--bg-primary)] flex items-center justify-center border border-[var(--border-light)] shadow-sm">
                      <ArrowUpRight size={14} className="text-[var(--text-primary)]" />
                    </div>
                  </div>
                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Card info */}
                <div className="pt-4 pb-2">
                  <h3 className="heading-display text-display-sm text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                    {property.name}
                  </h3>
                  <p className="label text-[var(--text-muted)]">
                    {property.type} · {property.location} · {property.beds}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
          {/* End padding */}
        </div>
      </div>
    </section>
  )
}
