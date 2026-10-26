'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

interface GoldLetterA3DProps {
  modelPath?: string
  className?: string
}

export function GoldLetterA3D({
  modelPath = '/models/apex-gold-a.glb',
  className = '',
}: GoldLetterA3DProps) {
  const shouldReduceMotion = useReducedMotion()
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Gracefully test if the GLB model exists without throwing console 404s
  useEffect(() => {
    let active = true
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (active) setModelAvailable(res.ok && res.status !== 404)
      })
      .catch(() => {
        if (active) setModelAvailable(false)
      })
    return () => {
      active = false
    }
  }, [modelPath])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Scroll-linked slow 3D rotation and floating depth
  const rotateY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 22])
  const rotateX = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [8, -6])
  const translateY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-20, 20])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ perspective: '1200px' }}
    >
      {/*
        Architectural Champagne-Gold 3D Letter A:
        Restrained, high-end, editorial presence with metallic gradients,
        ambient depth and soft gold sheen.
      */}
      <motion.div
        className="w-full h-full flex items-center justify-center will-change-transform"
        style={{
          rotateY,
          rotateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg
          viewBox="0 0 600 750"
          className="w-full h-full max-w-[520px] max-h-[640px] opacity-[0.09] lg:opacity-[0.14]"
          fill="none"
        >
          <defs>
            {/* Champagne gold specular gradient */}
            <linearGradient id="champagneGold3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.9" />
              <stop offset="25%" stopColor="#E0C28A" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#C9AD75" stopOpacity="0.55" />
              <stop offset="75%" stopColor="#9C7E3A" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#DFBF82" stopOpacity="0.85" />
            </linearGradient>

            {/* Back depth gradient */}
            <linearGradient id="champagneDepth" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8A6B2D" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4A3B18" stopOpacity="0.2" />
            </linearGradient>

            <filter id="goldAura" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="16" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Extruded rear shadow plane (simulating 3D extrusion) */}
          <path
            d="M 292,82 L 322,82 L 532,582 L 442,582 L 388,432 L 222,432 L 168,582 L 78,582 Z"
            fill="none"
            stroke="url(#champagneDepth)"
            strokeWidth="1.2"
            transform="translate(18, 14)"
            opacity="0.6"
          />

          {/* Primary Front 3D Letter A Profile */}
          <g filter="url(#goldAura)">
            <path
              d="M 292,72 L 322,72 L 532,572 L 442,572 L 388,422 L 222,422 L 168,572 L 78,572 Z"
              fill="none"
              stroke="url(#champagneGold3D)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Inner architectural triangle counter */}
            <path
              d="M 307,192 L 368,362 L 246,362 Z"
              fill="none"
              stroke="url(#champagneGold3D)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              opacity="0.8"
            />
          </g>

          {/* Thin horizontal architectural alignment lines */}
          <line
            x1="40"
            y1="422"
            x2="560"
            y2="422"
            stroke="url(#champagneGold3D)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  )
}
