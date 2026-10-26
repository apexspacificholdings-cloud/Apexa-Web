'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { SERVICES, ServiceItem } from '@/data/services'
import { cn } from '@/lib/utils'

// Handcrafted architectural line emblems for each service
function ServiceCardIcon({ type }: { type: ServiceItem['iconType'] }) {
  if (type === 'villa') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#C9AD75]">
        <path d="M3 22L14 6L25 22H3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 22V15H18V22" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  }
  if (type === 'sky') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#C9AD75]">
        <rect x="8" y="5" width="12" height="18" stroke="currentColor" strokeWidth="1.2" />
        <line x1="5" y1="23" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" />
        <line x1="11" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1" />
        <line x1="11" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="1" />
        <line x1="11" y1="17" x2="17" y2="17" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  }
  if (type === 'interior') {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#C9AD75]">
        <rect x="5" y="5" width="18" height="18" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="9" width="10" height="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="5" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
        <line x1="14" y1="5" x2="14" y2="23" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-[#C9AD75]">
      <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="14" cy="14" rx="4" ry="9" stroke="currentColor" strokeWidth="1" />
      <line x1="5" y1="14" x2="23" y2="14" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

export function ServicesSection() {
  const shouldReduceMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileIndex, setMobileIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePrev = useCallback(() => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1))
  }, [])

  const handleNext = useCallback(() => {
    setMobileIndex((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0))
  }, [])

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden bg-[#0A100D] text-[#E9E2D4] py-20 sm:py-28 lg:py-36 border-t border-[#C9AD75]/15"
      aria-label="Apexa What We Do — Integrated Services"
    >
      {/* Background ambient gold luxury gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] rounded-full opacity-20 blur-[130px]"
          style={{ background: 'radial-gradient(circle, #C9AD75 0%, #151a14 70%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 sm:mb-16">
          <div className="w-8 h-px bg-[#C9AD75]" />
          <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#C9AD75] font-medium">
            WHAT WE DO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-14 sm:mb-20">
          <motion.h2
            className="font-serif font-light text-[#E9E2D4] tracking-tight leading-[0.96]"
            style={{ fontSize: 'clamp(2.4rem, 4.8vw, 4.4rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            One team,{' '}
            <em className="italic font-serif text-[#E0C28A] not-italic" style={{ fontStyle: 'italic' }}>
              end to end
            </em>
          </motion.h2>

          <motion.p
            className="font-sans text-[#A6A29A] text-sm sm:text-base font-light leading-relaxed lg:pt-4 text-pretty"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Development, architectural design, and cross-border advisory united under a single studio, ensuring uncompromising continuity between initial vision and final handover.
          </motion.p>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            DESKTOP LAYOUT (>= 768px): Refined 4-Card Architectural Grid
           ════════════════════════════════════════════════════════════════ */}
        <div className="hidden md:grid grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={service.route}
                className="group relative block h-full rounded-[4px] p-8 sm:p-10 bg-[#111814]/70 border border-[#C9AD75]/20 hover:border-[#C9AD75]/60 transition-all duration-500 overflow-hidden shadow-lg hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(201,173,117,0.12)] hover:-translate-y-1"
                aria-label={`Explore ${service.title}`}
              >
                {/* Background Architectural Photo on Hover Reveal */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-out pointer-events-none">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/50 to-transparent" />
                </div>

                {/* Top Bar: Service Number & Custom Emblem + Circular Arrow */}
                <div className="relative z-10 flex items-start justify-between mb-8 pb-6 border-b border-[#C9AD75]/15">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#C9AD75] tracking-widest">
                      {service.number}
                    </span>
                    <span className="w-4 h-px bg-[#C9AD75]/30" />
                    <ServiceCardIcon type={service.iconType} />
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#C9AD75]/40 group-hover:border-[#C9AD75] flex items-center justify-center text-[#C9AD75] group-hover:bg-[#C9AD75] group-hover:text-[#0A100D] transition-all duration-300">
                    <ArrowUpRight
                      size={17}
                      strokeWidth={1.8}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                {/* Service Heading & Subtitle */}
                <div className="relative z-10 mb-4">
                  <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-[#C9AD75]/80 block mb-1.5 font-medium">
                    {service.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#E9E2D4] font-light tracking-tight group-hover:text-[#E0C28A] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Service Description */}
                <p className="relative z-10 font-sans text-xs sm:text-[13.5px] text-[#A6A29A] leading-relaxed font-light mb-8 max-w-md">
                  {service.description}
                </p>

                {/* Bottom Architectural Focus Pills */}
                <div className="relative z-10 flex flex-wrap gap-2 pt-4 border-t border-[#C9AD75]/10">
                  {service.architecturalFocus.slice(0, 3).map((focus, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-sans uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[#C9AD75]/10 text-[#C9AD75] border border-[#C9AD75]/20"
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            MOBILE LAYOUT (< 768px): Polished Swipeable 3D Carousel
           ════════════════════════════════════════════════════════════════ */}
        <div className="md:hidden relative">
          {/* Mobile Carousel Container */}
          <div
            className="relative w-full h-[450px] flex items-center justify-center overflow-hidden"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {/* Quick Tap Zones for Screen Edges */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-0 top-0 bottom-0 w-[18%] z-30 cursor-pointer focus:outline-none bg-transparent"
              aria-label="Previous service"
            />
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-0 top-0 bottom-0 w-[18%] z-30 cursor-pointer focus:outline-none bg-transparent"
              aria-label="Next service"
            />

            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} mode="popLayout">
                {SERVICES.map((service, idx) => {
                  const total = SERVICES.length
                  // Circular offset
                  let circularOffset = ((idx - mobileIndex) % total + total) % total
                  if (circularOffset > total / 2) {
                    circularOffset -= total
                  }

                  const isActive = circularOffset === 0
                  const isPrev = circularOffset === -1
                  const isNext = circularOffset === 1
                  const isVisible = Math.abs(circularOffset) <= 1

                  if (!isVisible) return null

                  const xTranslate = circularOffset * 82
                  const zTranslate = isActive ? 0 : -85
                  const rotateY = isActive ? 0 : circularOffset < 0 ? 15 : -15
                  const scale = isActive ? 1.0 : 0.84
                  const opacity = isActive ? 1.0 : 0.45
                  const zIndex = 25 - Math.abs(circularOffset) * 5

                  return (
                    <motion.div
                      key={service.id}
                      className="absolute will-change-transform select-none"
                      style={{
                        width: 'min(82vw, 340px)',
                        height: 'min(115vw, 420px)',
                        zIndex,
                      }}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : {
                              x: `${circularOffset * 85}%`,
                              scale: 0.8,
                              opacity: 0,
                            }
                      }
                      animate={{
                        x: `${xTranslate}%`,
                        y: 0,
                        z: zTranslate,
                        rotateY,
                        scale,
                        opacity,
                        filter: isActive
                          ? 'brightness(1) contrast(1)'
                          : 'brightness(0.55) contrast(0.95)',
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: { duration: 0.35 },
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0.01 : 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      drag={isActive ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_e, info) => {
                        if (info.offset.x < -30 || info.velocity.x < -200) handleNext()
                        else if (info.offset.x > 30 || info.velocity.x > 200) handlePrev()
                      }}
                    >
                      <Link
                        href={service.route}
                        onClick={(e) => {
                          if (!isActive) {
                            e.preventDefault()
                            if (isPrev) handlePrev()
                            else if (isNext) handleNext()
                          }
                        }}
                        className={cn(
                          'relative block w-full h-full rounded-[4px] p-6 bg-[#111814]/90 border transition-all duration-300 flex flex-col justify-between overflow-hidden',
                          isActive
                            ? 'border-[#C9AD75]/45 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_18px_rgba(201,173,117,0.15)]'
                            : 'border-white/10'
                        )}
                      >
                        {/* Background Image Overlay */}
                        <div className="absolute inset-0 opacity-15 pointer-events-none">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="82vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A100D] via-[#0A100D]/60 to-transparent" />
                        </div>

                        {/* Top Bar */}
                        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-[#C9AD75]/15">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs text-[#C9AD75] tracking-widest">
                              {service.number}
                            </span>
                            <span className="w-3 h-px bg-[#C9AD75]/40" />
                            <ServiceCardIcon type={service.iconType} />
                          </div>

                          <div className="w-9 h-9 rounded-full border border-[#C9AD75] flex items-center justify-center text-[#C9AD75] bg-[#C9AD75]/10">
                            <ArrowUpRight size={15} strokeWidth={1.8} />
                          </div>
                        </div>

                        {/* Card Center Content */}
                        <div className="relative z-10 my-auto py-2">
                          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C9AD75] block mb-1">
                            {service.subtitle}
                          </span>
                          <h3 className="font-serif text-2xl text-[#E9E2D4] font-light mb-2.5">
                            {service.title}
                          </h3>
                          <p className="font-sans text-xs text-[#A6A29A] font-light leading-relaxed line-clamp-3">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom CTA Label */}
                        <div className="relative z-10 pt-3 border-t border-[#C9AD75]/15 flex items-center justify-between">
                          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#C9AD75] font-medium">
                            EXPLORE SERVICE
                          </span>
                          <span className="text-[10px] font-mono text-[#85858C]">
                            {idx + 1} / {SERVICES.length}
                          </span>
                        </div>

                        {/* Full tap target overlay for side cards */}
                        {!isActive && (
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (isPrev) handlePrev()
                              else if (isNext) handleNext()
                            }}
                            className="absolute inset-0 z-30 cursor-pointer bg-black/15"
                            role="button"
                            tabIndex={0}
                            aria-label={isPrev ? 'Previous service' : 'Next service'}
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Bottom Controls & Counter */}
          <div className="mt-6 flex items-center justify-between">
            <div className="font-mono text-xs tracking-[0.22em] text-[#C9AD75]">
              <span className="text-base font-serif text-[#E9E2D4]">
                0{mobileIndex + 1}
              </span>{' '}
              / 0{SERVICES.length}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous service"
                className="w-10 h-10 rounded-full border border-[#C9AD75]/40 hover:border-[#C9AD75] flex items-center justify-center text-[#C9AD75] active:scale-95 transition-all"
              >
                <ArrowLeft size={15} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next service"
                className="w-10 h-10 rounded-full border border-[#C9AD75]/40 hover:border-[#C9AD75] flex items-center justify-center text-[#C9AD75] active:scale-95 transition-all"
              >
                <ArrowRight size={15} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
