'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const heroRootRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const goldScaleWrapRef = useRef<HTMLDivElement>(null)

  // Autoplay video safely with error handling and fallback
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.playsInline = true
    const p = video.play()
    if (p !== undefined) {
      p.then(() => setVideoLoaded(true)).catch(() => {
        setVideoLoaded(true)
      })
    }
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const heroRoot = heroRootRef.current
    const heroContent = heroContentRef.current
    const goldScaleWrap = goldScaleWrapRef.current
    const videoWrap = videoWrapRef.current

    if (!heroRoot || !goldScaleWrap) return

    const ctx = gsap.context(() => {
      /*
       * IMMERSIVE CINEMATIC A-LOGO TRANSITION:
       * 1. The A logo is locked to viewport center via flexbox (inset-0 flex items-center justify-center).
       * 2. Pinned travel holds the hero stage while the A scales from center (1.0x -> 24.0x).
       * 3. At scale 24x, the outer outline extends to 4,800px wide—well beyond 1080p, 1440p, and 4K viewports.
       * 4. As the enlarged gold strokes fly past the screen edges, they dissolve smoothly.
       * 5. The pin releases seamlessly into the About section with zero blank void or dead zone.
       * 6. Smooth forward and reverse scroll with scrub: 0.15 locking to Lenis.
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRoot,
          start: 'top top',
          end: '+=100vh', // Holds hero for full cinematic zoom before handing off to About section
          pin: true,
          pinSpacing: true,
          scrub: 0.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (goldScaleWrap) {
              if (self.progress >= 0.94) {
                goldScaleWrap.style.visibility = 'hidden'
              } else {
                goldScaleWrap.style.visibility = 'visible'
              }
            }
          },
        },
      })

      // ── Phase 1 (0–18%): Hero headline & CTA dissolve upward ──────────────
      if (heroContent) {
        tl.to(
          heroContent,
          {
            opacity: 0,
            y: -30,
            duration: 0.18,
            ease: 'power1.out',
          },
          0
        )
      }

      // ── Phase 2 (0.05–25%): Gold A emerges small from exact center ────────
      tl.fromTo(
        goldScaleWrap,
        { scale: 0.35, opacity: 0, transformOrigin: '50% 50%' },
        { scale: 1.0, opacity: 1, transformOrigin: '50% 50%', duration: 0.20, ease: 'power2.out' },
        0.05
      )

      // ── Phase 3 (22–88%): Progressive zoom through camera past all edges ──
      tl.to(
        goldScaleWrap,
        {
          scale: 24.0, // Extends outline to >4,500px, clearing screen boundaries completely
          transformOrigin: '50% 50%',
          duration: 0.66,
          ease: 'power2.in',
        },
        0.22
      )

      // ── Phase 4 (68–88%): Enlarged strokes dissolve as they clear screen ──
      tl.to(
        goldScaleWrap,
        {
          opacity: 0,
          duration: 0.20,
          ease: 'power1.in',
        },
        0.68
      )

      // ── Phase 5 (35–95%): Video dims into luxury #12100E palette ──────────
      if (videoWrap) {
        tl.to(
          videoWrap,
          {
            opacity: 0.15,
            duration: 0.60,
            ease: 'power1.inOut',
          },
          0.35
        )
      }
    }, heroRoot)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  const tb = { duration: shouldReduceMotion ? 0.01 : 0.85, ease: [0.16, 1, 0.3, 1] as const }
  const fadeUp = {
    initial: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <div
      ref={heroRootRef}
      id="home"
      className="relative w-full h-screen overflow-hidden select-none bg-[#12100E]"
      aria-label="Apex Global Estates Hero"
    >
      {/* ═══════ LAYER 0: CINEMATIC BACKGROUND VIDEO ════════════════════════ */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 overflow-hidden pointer-events-none will-change-[opacity]"
      >
        <video
          ref={videoRef}
          src="/videos/VID02.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
          style={{ opacity: videoLoaded ? 1 : 0.7 }}
        />
        {/* Editorial left gradient for high text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(18,16,14,0.80) 0%, rgba(18,16,14,0.45) 44%, rgba(18,16,14,0.10) 75%, transparent 100%)',
          }}
        />
        {/* Bottom vignette blending seamlessly into About section palette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(18,16,14,0.85) 0%, rgba(18,16,14,0.3) 30%, transparent 60%)',
          }}
        />
      </div>

      {/* ═══════ LAYER 1: HERO EDITORIAL CONTENT (fades on scroll) ═════════ */}
      <div
        ref={heroContentRef}
        className="absolute inset-0 z-10 flex flex-col justify-between pt-20 lg:pt-24 pb-4 lg:pb-6 select-none will-change-[opacity,transform]"
      >
        <div className="w-full flex-1 flex flex-col justify-center px-6 sm:px-10 lg:pl-[5.8%] lg:pr-12 max-w-[1600px] my-auto">
          <div className="max-w-[680px]">
            <motion.div
              className="flex items-center gap-3 mb-3"
              {...fadeUp}
              transition={{ ...tb, delay: 0.1 }}
            >
              <span className="w-6 h-px bg-[#C5A66A]/75 shrink-0" />
              <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#C5A66A] font-medium">
                APEX GLOBAL ESTATES · EST. LUXURY
              </p>
            </motion.div>

            <motion.h1
              className="font-serif font-light text-[#F1E8D8] tracking-tight mb-3 sm:mb-4 text-balance"
              style={{ fontSize: 'clamp(2.4rem,5.2vw,5.2rem)', lineHeight: 0.92, letterSpacing: '-0.025em' }}
              {...fadeUp}
              transition={{ ...tb, delay: 0.22 }}
            >
              <span className="block">Elevated</span>
              <span className="block">living;</span>
              <span className="block italic text-[#D9BC7A]">globally.</span>
            </motion.h1>

            <motion.p
              className="font-sans text-[#C8C0B4] text-[13.5px] sm:text-[15px] font-light max-w-[520px] mb-5 sm:mb-7 leading-relaxed text-pretty"
              {...fadeUp}
              transition={{ ...tb, delay: 0.35 }}
            >
              Signature villas, boutique residences and interiors designed to be lived in for generations.
              Every Apex address is shaped by light, landscape and craft.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              {...fadeUp}
              transition={{ ...tb, delay: 0.48 }}
            >
              <Link
                href="/properties"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-[#C5A66A] hover:bg-[#D9BC7A] text-[#171411] text-[11px] sm:text-xs uppercase font-medium tracking-[0.18em] rounded-full transition-all duration-300 hover:scale-[1.02] shadow-md"
              >
                EXPLORE RESIDENCES
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 bg-transparent border border-[#C5A66A]/70 hover:border-[#D9BC7A] text-[#F1E8D8] hover:text-[#D9BC7A] text-[11px] sm:text-xs uppercase font-medium tracking-[0.18em] rounded-full transition-all duration-300 hover:bg-[#C5A66A]/10"
              >
                BOOK A PRIVATE VIEWING
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between px-6 sm:px-10 lg:px-[5.8%] shrink-0 text-xs font-mono">
          <span className="text-[#C5A66A]/60 tracking-[0.25em] text-[10px] sm:text-[11px] uppercase hidden sm:inline-block">
            25.2048° N · 55.2708° E
          </span>
          <div className="flex items-center gap-2.5 ml-auto">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#C5A66A]/80">
              SCROLL TO EXPLORE
            </span>
            <div className="w-8 h-px bg-[#C5A66A]/40" />
          </div>
        </div>
      </div>

      {/* ═══════ LAYER 2: GOLD A-EMBLEM ZOOM (STABLE CENTERED STAGE) ════════ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-30 overflow-hidden">
        <div
          ref={goldScaleWrapRef}
          className="relative flex items-center justify-center will-change-transform"
          style={{
            width: 'clamp(320px, 45vw, 560px)',
            height: 'clamp(320px, 45vw, 560px)',
            transformOrigin: '50% 50%',
            opacity: 0,
          }}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-full overflow-visible pointer-events-none select-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="apexaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8E8C2" />
                <stop offset="35%" stopColor="#D9BC7A" />
                <stop offset="70%" stopColor="#C5A66A" />
                <stop offset="100%" stopColor="#8E6F2E" />
              </linearGradient>
            </defs>

            {/* Outer glow stroke (vector glow, zero GPU rasterization overhead) */}
            <path
              d="M 486,290 L 514,290 L 695,715 L 628,715 L 573,575 L 427,575 L 372,715 L 305,715 Z"
              fill="none"
              stroke="#D9BC7A"
              strokeWidth="6"
              strokeLinejoin="round"
              opacity="0.28"
            />
            {/* Main metallic gold gradient silhouette */}
            <path
              d="M 486,290 L 514,290 L 695,715 L 628,715 L 573,575 L 427,575 L 372,715 L 305,715 Z"
              fill="none"
              stroke="url(#apexaGold)"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Specular core highlight */}
            <path
              d="M 486,290 L 514,290 L 695,715 L 628,715 L 573,575 L 427,575 L 372,715 L 305,715 Z"
              fill="none"
              stroke="#FFF6E0"
              strokeWidth="1.0"
              strokeLinejoin="round"
              opacity="0.75"
            />

            {/* Inner triangular counter glow */}
            <path
              d="M 500,388 L 550,520 L 450,520 Z"
              fill="none"
              stroke="#D9BC7A"
              strokeWidth="4"
              strokeLinejoin="round"
              opacity="0.22"
            />
            {/* Inner triangular counter main stroke */}
            <path
              d="M 500,388 L 550,520 L 450,520 Z"
              fill="none"
              stroke="url(#apexaGold)"
              strokeWidth="1.8"
              strokeLinejoin="round"
              opacity="0.85"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
