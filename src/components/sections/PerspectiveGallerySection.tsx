'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERSPECTIVE_GALLERY_PROPERTIES, PropertyItem } from '@/data/properties'
import { cn } from '@/lib/utils'

export function PerspectiveGallerySection() {
  const router = useRouter()
  const properties = PERSPECTIVE_GALLERY_PROPERTIES
  const total = properties.length
  const angleStep = 360 / total // 60 degrees for 6 cards

  // rotationAngle is the continuous single source of truth (in degrees)
  // Initially card 1 (The Marble Sanctuary) is active at 60deg
  const [rotationAngle, setRotationAngle] = useState(60)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const stageRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef<number>(0)
  const startYRef = useRef<number>(0)
  const startRotationRef = useRef<number>(60)
  const currentDragDeltaRef = useRef<number>(0)
  const hasMovedRef = useRef<boolean>(false)
  const isTouchVerticalScrollRef = useRef<boolean | null>(null)
  const wheelCooldownRef = useRef<boolean>(false)

  // Track viewport width for responsive geometry
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Derive active card index from current rotationAngle
  const normalizedRotation = ((Math.round(rotationAngle / angleStep) % total) + total) % total
  const activeIndex = normalizedRotation
  const activeProperty = properties[activeIndex]

  // Smooth rotation steps
  const rotateNext = useCallback(() => {
    setRotationAngle((prev) => Math.round((prev + angleStep) / angleStep) * angleStep)
  }, [angleStep])

  const rotatePrev = useCallback(() => {
    setRotationAngle((prev) => Math.round((prev - angleStep) / angleStep) * angleStep)
  }, [angleStep])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        rotatePrev()
      } else if (e.key === 'ArrowRight') {
        rotateNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [rotatePrev, rotateNext])

  // Trackpad / Horizontal wheel support
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 20 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (wheelCooldownRef.current) return
      wheelCooldownRef.current = true
      if (e.deltaX > 0) {
        rotateNext()
      } else {
        rotatePrev()
      }
      setTimeout(() => {
        wheelCooldownRef.current = false
      }, 350)
    }
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startXRef.current = e.clientX
    startRotationRef.current = rotationAngle
    currentDragDeltaRef.current = 0
    hasMovedRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - startXRef.current
    if (Math.abs(deltaX) > 5) {
      hasMovedRef.current = true
    }
    currentDragDeltaRef.current = deltaX

    // Drag sensitivity: degrees per pixel (tuned for natural 1:1 hand feel)
    const sensitivity = isMobile ? 0.22 : 0.17
    const newAngle = startRotationRef.current - deltaX * sensitivity
    setRotationAngle(newAngle)
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    // Snap to nearest 60-degree card angle with velocity assist
    const delta = currentDragDeltaRef.current
    let targetAngle = rotationAngle
    const snapThreshold = isMobile ? 30 : 50

    if (delta < -snapThreshold) {
      // User dragged left -> advance to next card
      targetAngle = Math.floor(rotationAngle / angleStep) * angleStep + angleStep
    } else if (delta > snapThreshold) {
      // User dragged right -> go to previous card
      targetAngle = Math.ceil(rotationAngle / angleStep) * angleStep - angleStep
    } else {
      // Small drag -> snap to nearest
      targetAngle = Math.round(rotationAngle / angleStep) * angleStep
    }

    setRotationAngle(targetAngle)
    currentDragDeltaRef.current = 0
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
  }

  // Touch handlers with vertical scroll preservation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    setIsDragging(true)
    startXRef.current = e.touches[0].clientX
    startYRef.current = e.touches[0].clientY
    startRotationRef.current = rotationAngle
    currentDragDeltaRef.current = 0
    hasMovedRef.current = false
    isTouchVerticalScrollRef.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const touch = e.touches[0]
    const deltaX = touch.clientX - startXRef.current
    const deltaY = touch.clientY - startYRef.current

    // Determine initial gesture direction: horizontal vs vertical
    if (isTouchVerticalScrollRef.current === null) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        // User wants to scroll the page vertically -> release drag
        isTouchVerticalScrollRef.current = true
        setIsDragging(false)
        return
      } else if (Math.abs(deltaX) > 8) {
        isTouchVerticalScrollRef.current = false
      }
    }

    if (isTouchVerticalScrollRef.current === true) return

    if (Math.abs(deltaX) > 6) {
      hasMovedRef.current = true
    }
    currentDragDeltaRef.current = deltaX

    const sensitivity = 0.22
    const newAngle = startRotationRef.current - deltaX * sensitivity
    setRotationAngle(newAngle)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const delta = currentDragDeltaRef.current
    let targetAngle = rotationAngle
    const snapThreshold = 35

    if (delta < -snapThreshold) {
      targetAngle = Math.floor(rotationAngle / angleStep) * angleStep + angleStep
    } else if (delta > snapThreshold) {
      targetAngle = Math.ceil(rotationAngle / angleStep) * angleStep - angleStep
    } else {
      targetAngle = Math.round(rotationAngle / angleStep) * angleStep
    }

    setRotationAngle(targetAngle)
    currentDragDeltaRef.current = 0
    isTouchVerticalScrollRef.current = null
  }

  // Handle card click
  const handleCardClick = (cardIndex: number, prop: PropertyItem, relAngle: number) => {
    // If the user was dragging, do not trigger a click
    if (hasMovedRef.current) return

    // If active card was clicked, navigate to its dedicated detail page
    if (Math.abs(relAngle) < 10) {
      router.push(prop.href)
      return
    }

    // If a neighboring card was clicked, rotate that card smoothly to center
    // We add relAngle to rotationAngle to rotate the carousel directly to this card
    const targetAngle = Math.round((rotationAngle + relAngle) / angleStep) * angleStep
    setRotationAngle(targetAngle)
  }

  // 3D Geometry Constants
  // Desktop: Radius = 490px, angleFactor = 0.55 -> Adjacent cards rotate at 60 * 0.55 = 33 degrees (within 25-40 deg specification)
  // Mobile: Radius = 290px, angleFactor = 0.50 -> Adjacent cards rotate at 30 degrees, peek from behind edges
  const cylinderRadius = isMobile ? 290 : 490
  const angleTuning = isMobile ? 0.50 : 0.55

  return (
    <section
      id="spaces"
      className="relative w-full bg-[#070B09] py-20 sm:py-32 overflow-hidden select-none border-t border-white/[0.06]"
      aria-label="Spaces in Perspective"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9AD75]/10 via-[#0A100D]/40 to-transparent blur-3xl pointer-events-none" />

      {/* Architectural subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-3.5 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/5 mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--accent)]">
              Curated Architectural Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-display text-display-lg sm:text-display-xl text-[var(--text-primary)] mb-5 text-balance"
          >
            Spaces in <em className="italic-serif text-[var(--accent)]">Perspective</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[var(--text-secondary)] font-light text-base sm:text-lg leading-relaxed text-pretty"
          >
            A curated view of architecture, residences and interiors that define exceptional living.
          </motion.p>
        </div>

        {/* 3D Perspective Stage */}
        <div
          ref={stageRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          className="relative w-full h-[500px] sm:h-[600px] lg:h-[650px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{
            perspective: isMobile ? '850px' : '1200px',
            perspectiveOrigin: 'center 46%',
          }}
        >

          {/* Cards Ring Container with 3D Preservation */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {properties.map((prop, index) => {
              // Calculate continuous angular position on cylinder relative to the front
              const cardBaseAngle = index * angleStep
              // Shortest circular angle relative to front center (-180 to +180 deg)
              const relAngle = ((((cardBaseAngle - rotationAngle) % 360) + 540) % 360) - 180
              const absAngle = Math.abs(relAngle)

              // Cards on the far backside (> 145 deg) are culled for performance and crisp visual flow
              if (absAngle > 145) return null

              // Genuine Circular 3D Cylinder Trigonometry:
              // X moves cards along circular arc: X = R * sin(angle)
              // Z recesses cards into 3D depth: Z = R * (cos(angle) - 1), where front is Z = 0
              const rad = (relAngle * Math.PI) / 180
              const translateX = cylinderRadius * Math.sin(rad)
              const translateZ = cylinderRadius * (Math.cos(rad) - 1)

              // rotateY angles the cards according to cylinder curve:
              // Nearest cards (at 60 deg) are angled at 60 * 0.55 = 33 degrees (within target 25-40 deg)
              const rotateY = -relAngle * angleTuning

              // Mathematically correct stacking order: nearer cards (larger Z) always overlay farther cards
              const zIndex = Math.round(100 + translateZ / 4)

              // Subtle cinematic lighting & depth falloff (active card 100%, adjacent cards 92% - never washed out)
              const isActive = absAngle < 15
              const brightness = Math.max(0.68, 1 - (absAngle / 180) * 0.35)
              const opacity = absAngle > 120 ? Math.max(0, 1 - (absAngle - 120) / 25) : 1

              return (
                <div
                  key={prop.id}
                  onClick={() => handleCardClick(index, prop, relAngle)}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity,
                    filter: `brightness(${brightness})`,
                    transformStyle: 'preserve-3d',
                    transition: isDragging
                      ? 'none'
                      : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease, opacity 0.6s ease',
                  }}
                  className={cn(
                    'absolute pointer-events-auto rounded-2xl overflow-hidden cursor-pointer',
                    'w-[270px] sm:w-[350px] lg:w-[370px] h-[390px] sm:h-[490px] lg:h-[530px]',
                    isActive
                      ? 'shadow-[0_28px_65px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(201,173,117,0.18)] ring-1 ring-[var(--accent)]/50'
                      : 'shadow-[0_20px_45px_-10px_rgba(0,0,0,0.85)] ring-1 ring-white/10 hover:ring-white/25'
                  )}
                >
                  {/* Property Image & Architecture Visual */}
                  <div className="relative w-full h-full overflow-hidden bg-[#101412]">
                    <Image
                      src={prop.image}
                      alt={prop.name}
                      fill
                      priority={isActive || absAngle < 70}
                      sizes="(max-width: 768px) 280px, (max-width: 1200px) 360px, 400px"
                      className={cn(
                        'object-cover transition-transform duration-700 pointer-events-none',
                        isActive ? 'scale-105' : 'scale-100 grayscale-[10%]'
                      )}
                    />

                    {/* Architectural Dark Vignette Overlay for Crisp Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/15 pointer-events-none" />

                    {/* Specular Top Edge Rim Light */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                    {/* Card Content Overlay */}
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--accent)] uppercase px-2.5 py-1 rounded bg-black/50 backdrop-blur-md border border-white/10">
                          {String(index + 1).padStart(2, '0')} · {prop.city}
                        </span>

                        {isActive && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 backdrop-blur-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)] font-semibold">
                              Active
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Bottom Title & Details */}
                      <div>
                        {/* Architectural Card Label */}
                        <div className="font-mono text-xs font-semibold tracking-[0.24em] text-white/90 uppercase mb-1">
                          {prop.cardLabel}
                        </div>

                        <h3 className="heading-display text-xl sm:text-2xl text-[var(--text-primary)] font-serif leading-tight mb-2">
                          {prop.name}
                        </h3>

                        <p className="text-white/60 text-xs font-light tracking-wide line-clamp-1 mb-4">
                          {prop.category} · {prop.area}
                        </p>

                        {/* Interactive Explore Link */}
                        <div
                          className={cn(
                            'inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase transition-all duration-300',
                            isActive
                              ? 'text-[var(--accent)] translate-x-0 opacity-100'
                              : 'text-white/50 -translate-x-1 opacity-70 group-hover:opacity-100'
                          )}
                        >
                          <span>{isActive ? 'Explore Property' : 'Focus Residence'}</span>
                          <ArrowUpRight
                            size={14}
                            className={cn(
                              'transition-transform duration-300',
                              isActive ? 'translate-x-0.5 -translate-y-0.5' : ''
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gallery Controls & Instructions */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.08] pt-8">
          {/* Active Property Metadata Bar */}
          <div className="text-center sm:text-left">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[var(--accent)] uppercase block mb-1">
              Currently Selected
            </span>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <span className="text-lg font-serif text-[var(--text-primary)]">
                {activeProperty.name}
              </span>
              <span className="text-white/30">|</span>
              <span className="text-xs font-mono text-white/60">
                {activeProperty.country} · {activeProperty.price}
              </span>
            </div>
          </div>

          {/* Center Instruction (← DRAG TO ROTATE →) */}
          <div className="flex items-center gap-4">
            <button
              onClick={rotatePrev}
              aria-label="Previous property"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[var(--accent)] bg-black/40 hover:bg-[var(--accent)]/10 text-white/70 hover:text-[var(--accent)] flex items-center justify-center transition-all duration-300 active:scale-95"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.28em] text-[var(--accent)] uppercase font-medium px-4 py-2 rounded-full border border-[var(--accent)]/20 bg-black/30 backdrop-blur-sm">
              <span className="opacity-60">←</span>
              <span>DRAG TO ROTATE</span>
              <span className="opacity-60">→</span>
            </div>

            <button
              onClick={rotateNext}
              aria-label="Next property"
              className="w-10 h-10 rounded-full border border-white/10 hover:border-[var(--accent)] bg-black/40 hover:bg-[var(--accent)]/10 text-white/70 hover:text-[var(--accent)] flex items-center justify-center transition-all duration-300 active:scale-95"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Counter and Direct Residence Link */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-white/40 tracking-widest">
              <span className="text-[var(--accent)] font-semibold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="mx-1">/</span>
              <span>{String(total).padStart(2, '0')}</span>
            </div>

            <Link
              href={activeProperty.href}
              className="btn-primary text-xs py-2.5 px-5 tracking-widest inline-flex items-center gap-2"
            >
              <span>View Details</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
