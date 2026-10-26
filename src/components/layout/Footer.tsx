'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

// Elegant inline brand icons (zero extra dependencies)
function InstagramIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function YoutubeIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  )
}

function FacebookIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

// Centralized verified social channels configuration
export interface SocialLinkItem {
  name: string
  url: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  isOfficial: boolean
}

export const OFFICIAL_SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/apexaglobalestates',
    icon: InstagramIcon,
    isOfficial: true,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/apexaglobalestates',
    icon: LinkedinIcon,
    isOfficial: true,
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@apexaglobalestates',
    icon: YoutubeIcon,
    isOfficial: true,
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/apexaglobalestates',
    icon: FacebookIcon,
    isOfficial: true,
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Navigation structure adhering strictly to verified existing routes and anchors
  const navigationColumns = [
    {
      title: 'EXPLORE',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/#about' },
        { label: 'Collection', href: '/#collection' },
        { label: 'Residences', href: '/properties' },
        { label: 'Destinations', href: '/#collection' },
      ],
    },
    {
      title: 'OUR SERVICES',
      links: [
        { label: 'Luxury Villas', href: '/services/luxury-villas' },
        { label: 'Sky Residences', href: '/services/sky-residences' },
        { label: 'Interior Studio', href: '/services/interior-studio' },
        { label: 'Global Advisory', href: '/services/global-advisory' },
      ],
    },
    {
      title: 'DESTINATIONS',
      links: [
        { label: 'India', href: '/destinations/india' },
        { label: 'United Arab Emirates', href: '/destinations/uae' },
        { label: 'Australia', href: '/destinations/australia' },
        { label: 'Malaysia', href: '/destinations/malaysia' },
        { label: 'United States', href: '/properties' },
      ],
    },
  ]

  return (
    <footer
      className="relative w-full border-t border-white/[0.08] bg-[#0A100D] text-[#E9E2D4] overflow-hidden"
      aria-label="Apexa Global Estates Footer"
    >
      {/* Subtle ambient luxury glow in background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(ellipse at center, #C9AD75 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 py-10 sm:py-16 lg:py-24">
        {/* ════════════════════════════════════════════════════════════════
            1. BRAND INTRODUCTION AREA
           ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-14 border-b border-white/[0.08]">
          <div className="max-w-[720px]">
            {/* Wordmark with smooth ~280ms hover brightening */}
            <Link
              href="/"
              aria-label="Apexa Global Estates Home"
              className="group inline-flex flex-col items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9AD75]/60 rounded-sm py-1 transition-all duration-300"
            >
              <span
                className="font-serif font-light uppercase text-[#C5A66A] group-hover:text-[#F3E2BD] group-focus-visible:text-[#F3E2BD] transition-all duration-300 select-none group-hover:drop-shadow-[0_0_12px_rgba(201,173,117,0.30)]"
                style={{
                  fontSize: 'clamp(1.85rem, 3.8vw, 3rem)',
                  letterSpacing: '0.32em',
                  lineHeight: 1,
                }}
              >
                APEXA
              </span>
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.42em] uppercase text-[#8E826C] group-hover:text-[#C5A66A] group-focus-visible:text-[#C5A66A] transition-colors duration-300 mt-2">
                GLOBAL ESTATES
              </span>
            </Link>

            {/* Short brand statement */}
            <p className="font-serif text-base sm:text-xl text-[#E9E2D4] font-light mt-4 sm:mt-5 text-balance leading-relaxed">
              Exceptional properties. Considered living. A global perspective.
            </p>
          </div>

          {/* Direct Collection Discovery Link */}
          <Link
            href="/#collection"
            className="group inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#C5A66A] hover:text-[#F3E2BD] focus-visible:text-[#F3E2BD] transition-colors duration-300 pb-1 border-b border-[#C5A66A]/30 hover:border-[#F3E2BD]"
          >
            <span>DISCOVER OUR COLLECTION</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2. FOUR NAVIGATION COLUMNS + CONTACT INFO (2 cols on mobile, 4 on desktop)
           ════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-10 lg:gap-x-14 gap-y-8 sm:gap-y-12 lg:gap-y-14 py-8 sm:py-12 lg:py-16">
          {navigationColumns.map((col) => (
            <div key={col.title}>
              <h2 className="font-sans text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.26em] text-[#C5A66A] uppercase mb-4 sm:mb-6">
                {col.title}
              </h2>
              <ul className="space-y-2.5 sm:space-y-3.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[12px] sm:text-[13px] text-[#A6A095] hover:text-[#F1E8D8] focus-visible:text-[#F1E8D8] transition-colors duration-200 tracking-wide inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: GET IN TOUCH */}
          <div>
            <h2 className="font-sans text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.26em] text-[#C5A66A] uppercase mb-4 sm:mb-6">
              GET IN TOUCH
            </h2>
            <ul className="space-y-2.5 sm:space-y-3.5 mb-6 sm:mb-8">
              <li>
                <Link
                  href="/#contact"
                  className="font-sans text-[12px] sm:text-[13px] text-[#A6A095] hover:text-[#F1E8D8] focus-visible:text-[#F1E8D8] transition-colors duration-200 tracking-wide inline-block"
                >
                  Private Enquiries
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="font-sans text-[12px] sm:text-[13px] text-[#A6A095] hover:text-[#F1E8D8] focus-visible:text-[#F1E8D8] transition-colors duration-200 tracking-wide inline-block"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:ehsanullah.biz@gmail.com"
                  className="inline-flex items-start gap-2 font-sans text-[12px] sm:text-[13px] text-[#A6A095] hover:text-[#F1E8D8] focus-visible:text-[#F1E8D8] transition-colors duration-200 tracking-wide break-all sm:break-normal"
                >
                  <Mail size={13} className="text-[#C5A66A] shrink-0 mt-0.5" />
                  <span>ehsanullah.biz@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919110656326"
                  className="inline-flex items-center gap-2 font-sans text-[12px] sm:text-[13px] text-[#A6A095] hover:text-[#F1E8D8] focus-visible:text-[#F1E8D8] transition-colors duration-200 tracking-wide whitespace-nowrap"
                >
                  <Phone size={13} className="text-[#C5A66A] shrink-0" />
                  <span>+91 91106 56326</span>
                </a>
              </li>
            </ul>

            {/* Social Media Area */}
            <div>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8E887E] block mb-2.5 sm:mb-3">
                CONNECT GLOBALLY
              </span>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {OFFICIAL_SOCIAL_LINKS.filter((s) => s.isOfficial && s.url).map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Apexa Global Estates on ${social.name}`}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 hover:border-[#C5A66A] bg-white/[0.02] hover:bg-[#C5A66A]/10 text-[#8E887E] hover:text-[#DFC58E] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A66A]"
                    >
                      <Icon size={14} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. PRIVATE ENQUIRY CALL-TO-ACTION STRIP
           ════════════════════════════════════════════════════════════════ */}
        <div className="my-6 sm:my-8 p-6 sm:p-10 rounded-[3px] border border-[#C5A66A]/20 bg-gradient-to-r from-white/[0.02] via-[#C5A66A]/[0.03] to-white/[0.02] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-[700px]">
            <h3 className="font-serif text-lg sm:text-2xl text-[#E9E2D4] font-light mb-2">
              Your next address begins with a conversation.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#A6A095] font-light leading-relaxed">
              Speak with our team about a property, destination, or bespoke real-estate requirement.
            </p>
          </div>

          <Link
            href="/#contact"
            className="group shrink-0 inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full border border-[#C5A66A]/50 hover:border-[#DFC58E] bg-[#C5A66A]/10 hover:bg-[#C5A66A]/20 text-xs font-mono uppercase tracking-[0.2em] text-[#E9E2D4] hover:text-[#F3E2BD] transition-all duration-300"
          >
            <span>MAKE A PRIVATE ENQUIRY</span>
            <ArrowUpRight
              size={14}
              className="text-[#C5A66A] group-hover:text-[#F3E2BD] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4. BOTTOM LEGAL BAR
           ════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 pt-8 border-t border-white/[0.08] text-[10px] sm:text-[11px] font-mono tracking-[0.22em] uppercase text-[#88837A]">
          {/* Copyright with dynamic year */}
          <div className="text-center md:text-left">
            <span>© {currentYear} APEXA GLOBAL ESTATES. ALL RIGHTS RESERVED.</span>
          </div>

          {/* Legal Pages Links */}
          <div className="flex items-center gap-6 text-[10px] tracking-[0.20em]">
            <Link
              href="/privacy"
              className="text-[#88837A] hover:text-[#C5A66A] focus-visible:text-[#C5A66A] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link
              href="/terms"
              className="text-[#88837A] hover:text-[#C5A66A] focus-visible:text-[#C5A66A] transition-colors duration-200"
            >
              Terms &amp; Conditions
            </Link>
          </div>

          {/* Version Label */}
          <div className="text-[#88837A]/80 text-center md:text-right">
            WEBSITE CONCEPT V1
          </div>
        </div>
      </div>
    </footer>
  )
}
