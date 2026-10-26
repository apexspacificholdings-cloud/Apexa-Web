'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ApexMonogram } from '@/components/ui/ApexMonogram'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About',        href: '/#about' },
  { label: 'Collection',   href: '/#collection' },
  { label: 'Residences',   href: '/properties' },
  { label: 'Services',     href: '/#services' },
  { label: 'Contact',      href: '/#contact' },
]

export function Navigation({ hasHero }: { hasHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isDarkHero =
    hasHero !== undefined
      ? hasHero
      : pathname === '/' || pathname.startsWith('/destinations') || pathname.startsWith('/services') || pathname.startsWith('/properties') || pathname.startsWith('/residences')

  const isDarkHeader = !scrolled && isDarkHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      {/* Main nav bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isDarkHeader
            ? 'bg-gradient-to-b from-black/50 via-black/20 to-transparent'
            : 'bg-[#171411]/90 backdrop-blur-md border-b border-white/10'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Brand Identity: Monogram + Wordmark */}
            <Link
              href="/"
              id="navbar-brand-logo"
              className="flex items-center gap-3.5 leading-none group transition-opacity duration-300 hover:opacity-90"
              aria-label="Apexa Global Estates Home"
            >
              <ApexMonogram
                size={34}
                strokeWidth={0.9}
                color="#C5A66A"
                className="transition-colors duration-300"
              />
              <div className="flex flex-col leading-none">
                <span
                  className="font-serif font-light text-[#F1E8D8] transition-colors duration-300"
                  style={{
                    fontSize: '1.05rem',
                    letterSpacing: '0.24em',
                  }}
                >
                  APEXA
                </span>
                <span
                  className="font-sans font-light text-[#C5A66A] transition-colors duration-300"
                  style={{
                    fontSize: '0.52rem',
                    letterSpacing: '0.32em',
                    marginTop: '2.5px',
                    opacity: 0.9,
                  }}
                >
                  GLOBAL ESTATES
                </span>
              </div>
            </Link>

            {/* Desktop links inside refined luxury container */}
            <nav className="hidden lg:flex items-center gap-7 px-6 py-2.5 rounded-full bg-[#171411]/55 backdrop-blur-md border border-white/10 shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.16em] text-[#F1E8D8]/75 hover:text-[#F1E8D8] transition-opacity duration-200 font-sans"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side: Enquire CTA & Mobile Menu (No Dark Mode button) */}
            <div className="flex items-center gap-4">
              {/* Enquire CTA — desktop only */}
              <Link
                href="/#contact"
                className="hidden lg:inline-flex items-center px-6 py-2.5 text-xs tracking-widest font-medium uppercase rounded-full border border-white/20 bg-white/5 text-[#F1E8D8] hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                Enquire
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1.5 transition-colors duration-300 text-[#F1E8D8]"
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Mobile nav header */}
            <div className="container-wide flex items-center justify-between h-16">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="heading-display text-[var(--text-primary)]"
                style={{ fontSize: '1.125rem', letterSpacing: '0.2em' }}
              >
                APEX
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile links */}
            <nav className="container-wide flex flex-col justify-center flex-1 gap-8 pb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="heading-display text-display-md text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs tracking-widest uppercase mt-4"
                >
                  Enquire
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
