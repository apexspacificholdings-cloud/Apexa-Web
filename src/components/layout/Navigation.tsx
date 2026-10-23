'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/providers/ThemeProvider'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About',      href: '/#about' },
  { label: 'Residences', href: '/properties' },
  { label: 'Services',   href: '/#services' },
  { label: 'Locations',  href: '/#locations' },
  { label: 'Contact',    href: '/#contact' },
]

export function Navigation({ hasHero }: { hasHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isDarkHero =
    hasHero !== undefined
      ? hasHero
      : pathname === '/' || pathname === '/properties/aurelia-villa' || pathname === '/properties/verdant-house'

  const isDarkHeader = !scrolled && isDarkHero

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
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
            ? 'bg-transparent'
            : 'bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-light)]'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'flex flex-col leading-none transition-colors duration-300',
                isDarkHeader ? 'text-white' : 'text-[var(--text-primary)]'
              )}
            >
              <span
                className="heading-display font-medium"
                style={{ fontSize: '1.125rem', letterSpacing: '0.2em' }}
              >
                APEX
              </span>
              <span
                className="font-sans font-light"
                style={{ fontSize: '0.55rem', letterSpacing: '0.3em', marginTop: '1px', opacity: 0.7 }}
              >
                GLOBAL ESTATES
              </span>
            </Link>

            {/* Desktop links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'label transition-colors duration-300 hover:text-[var(--text-primary)]',
                    isDarkHeader ? 'text-white/70 hover:!text-white' : 'text-[var(--text-muted)]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Enquire CTA — desktop only */}
              <Link
                href="/#contact"
                className={cn(
                  'hidden lg:inline-flex items-center px-5 py-2.5 text-xs tracking-widest font-medium uppercase transition-all duration-300',
                  isDarkHeader
                    ? 'bg-[var(--ivory)] text-[var(--obsidian)] hover:bg-[var(--accent)] hover:text-white'
                    : 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)]'
                )}
              >
                Enquire
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className={cn(
                  'lg:hidden p-1.5 transition-colors duration-300',
                  isDarkHeader ? 'text-white' : 'text-[var(--text-primary)]'
                )}
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
