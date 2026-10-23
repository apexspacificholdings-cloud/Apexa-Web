'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

// Replace these with real Cloudflare Stream URLs later
const HERO_VIDEO_DESKTOP = 'https://stream.cloudflare.com/YOUR_STREAM_ID/manifest/video.m3u8'
const HERO_VIDEO_FALLBACK = 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1920&q=85&auto=format&fit=crop'

const tickerItems = [
  'Signature Villas',
  'Sky Residences',
  'Penthouses',
  'Interior Studio',
  'Global Advisory',
]

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function HeroSection() {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex flex-col">

      {/* Background media */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Priority hero image for optimum LCP */}
        <Image
          src={HERO_VIDEO_FALLBACK}
          alt="Apex Global Estates Signature Architecture"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          aria-hidden="true"
        />

        {/* Gradient overlay — bottom-heavy to protect text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/20" />
        {/* Edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
      </div>

      {/* Coordinates — top left */}
      <motion.div
        className="relative z-10 container-wide pt-28 lg:pt-36"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-white/50 tracking-widest">
          25.2048° N · 55.2708° E
        </span>
      </motion.div>

      {/* Main hero content — vertically centered in remaining space */}
      <div className="relative z-10 flex-1 flex items-end container-wide pb-32 lg:pb-40">
        <div className="max-w-3xl">

          {/* Eyebrow */}
          <motion.p
            className="label text-white/50 mb-6"
            {...fadeUp}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Apex Global Estates · Est. Luxury
          </motion.p>

          {/* Main heading */}
          <motion.h1
            className="heading-display text-display-2xl text-white text-balance mb-6"
            {...fadeUp}
            transition={{ delay: 0.65, duration: 0.7 }}
          >
            Elevated living,{' '}
            <em className="italic-serif">globally.</em>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-white/65 text-lg font-light max-w-md mb-10 text-pretty"
            style={{ lineHeight: 1.6 }}
            {...fadeUp}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Signature villas, boutique residences and interiors designed to be lived in for generations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            {...fadeUp}
            transition={{ delay: 0.95, duration: 0.7 }}
          >
            <Link
              href="#collection"
              className="inline-flex items-center px-7 py-3.5 bg-[var(--ivory)] text-[var(--obsidian)] text-xs tracking-widest uppercase font-medium hover:bg-[var(--accent)] hover:text-white transition-colors duration-300"
            >
              Explore Residences
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center px-7 py-3.5 border border-white/40 text-white text-xs tracking-widest uppercase font-medium hover:border-white/80 transition-colors duration-300"
            >
              Book a Viewing
            </Link>
          </motion.div>

          {/* Now launching tag */}
          <motion.div
            className="mt-8 inline-flex items-center gap-3"
            {...fadeUp}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96E] animate-pulse" />
            <span className="text-white/50 text-xs tracking-wide font-light">
              Now launching{' '}
              <span className="text-white/80 font-medium">The Meridian</span>
              {' '}· 7 floors · sky gardens · 24 residences
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 right-6 lg:right-10 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="label text-white/40 [writing-mode:vertical-rl]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-white/40" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Ticker strip — bottom edge */}
      <div className="relative z-10 border-t border-white/10 py-3 overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6">
              <span className="label text-white/35">{item}</span>
              <span className="text-white/15 text-xs">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
