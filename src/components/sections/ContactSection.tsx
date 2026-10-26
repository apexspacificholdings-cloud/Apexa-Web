'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Phone,
  Mail,
  Copy,
  Check,
  ChevronDown,
  Search,
  ShieldCheck,
  AlertCircle,
  ArrowUpRight,
} from 'lucide-react'
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  Country,
  parsePastedPhone,
  validatePhoneNumber,
  formatPhoneNumber,
} from '@/data/countries'
import { cn } from '@/lib/utils'

// Service interests explicitly requested in prompt
const SERVICE_OPTIONS = [
  'Luxury Villas',
  'Sky Residences',
  'Interior Studio',
  'Global Advisory',
  'General Enquiry',
]

export function ContactSection() {
  // Founder contact card copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Form field states
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedService, setSelectedService] = useState('Luxury Villas')
  const [message, setMessage] = useState('')
  const [consentGiven, setConsentGiven] = useState(false)
  const [honeypot, setHoneypot] = useState('')

  // UI state
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const countryDropdownRef = useRef<HTMLDivElement>(null)
  const serviceDropdownRef = useRef<HTMLDivElement>(null)
  const countrySearchInputRef = useRef<HTMLInputElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryDropdownOpen(false)
      }
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsServiceDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when country dropdown opens
  useEffect(() => {
    if (isCountryDropdownOpen) {
      setTimeout(() => countrySearchInputRef.current?.focus(), 50)
    } else {
      setCountrySearch('')
    }
  }, [isCountryDropdownOpen])

  // Copy with graceful clipboard handling
  const handleCopy = async (text: string, key: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        setCopiedKey(key)
        setTimeout(() => setCopiedKey(null), 2200)
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.left = '-9999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        if (successful) {
          setCopiedKey(key)
          setTimeout(() => setCopiedKey(null), 2200)
        }
      }
    } catch (err) {
      console.warn('Clipboard copy failed:', err)
    }
  }

  // Handle phone paste with auto-country detection
  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const { detectedCountry, nationalNumber } = parsePastedPhone(pastedText, selectedCountry)
    setSelectedCountry(detectedCountry)
    setPhoneNumber(formatPhoneNumber(nationalNumber))
    // Clear error
    setValidationErrors((prev) => ({ ...prev, phone: '' }))
  }

  // Handle phone input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value
    // If user typed a plus at start, check for country code match
    if (rawVal.startsWith('+')) {
      const { detectedCountry, nationalNumber } = parsePastedPhone(rawVal, selectedCountry)
      setSelectedCountry(detectedCountry)
      setPhoneNumber(formatPhoneNumber(nationalNumber))
    } else {
      setPhoneNumber(formatPhoneNumber(rawVal))
    }
    if (validationErrors.phone) {
      setValidationErrors((prev) => ({ ...prev, phone: '' }))
    }
  }

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.name = 'Please enter your full name (minimum 2 characters).'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }

    const phoneValidation = validatePhoneNumber(phoneNumber, selectedCountry)
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error || 'Please enter a valid phone number.'
    }

    if (!consentGiven) {
      errors.consent = 'Please provide consent to proceed with your enquiry.'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError(null)

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const phoneValidation = validatePhoneNumber(phoneNumber, selectedCountry)
      const e164Phone = phoneValidation.e164 || `${selectedCountry.dialCode}${phoneNumber.replace(/\D/g, '')}`

      const payload = {
        name: fullName.trim(),
        phone: e164Phone,
        countryCode: selectedCountry.code,
        email: email.trim(),
        service: selectedService,
        message: message.trim(),
        consent: consentGiven,
        consentTimestamp: new Date().toISOString(),
        honeypot, // Spam trap
      }

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.')
      }

      setSubmissionId(data.enquiryId || 'APX-CONFIRMED')
      setSubmitted(true)
    } catch (err: any) {
      console.error('Enquiry submission error:', err)
      setFormError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Filter countries by search query
  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  )

  return (
    <section
      id="contact"
      className="section-padding bg-[#070B09] border-t border-white/[0.06] relative overflow-hidden text-[var(--text-primary)]"
      aria-label="Private Enquiries & Founder Contact"
    >
      {/* Background radial ambient illumination */}
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[600px] h-[450px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9AD75]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="container-content relative z-10">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-4 mb-14 sm:mb-16">
          <div className="w-8 h-px bg-[var(--accent)]/60" />
          <span className="font-mono text-xs tracking-[0.25em] text-[var(--accent)] uppercase font-medium">
            Private Enquiries
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN — BESPOKE FOUNDER CONTACT CARD                */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="heading-display text-display-md sm:text-display-lg text-white mb-6 text-balance leading-tight">
                Let&apos;s find your{' '}
                <em className="italic-serif text-[var(--accent)] font-normal">next address</em>
              </h2>

              <p className="text-[var(--text-secondary)] font-light text-sm sm:text-base leading-relaxed mb-10 text-pretty">
                Apex Global Estates represents discerning buyers, private estates, and architectural landmarks worldwide. Every enquiry receives the personal attention of our founding team.
              </p>

              {/* Founder Contact Panel */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                {/* Founder Header */}
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-6">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-medium tracking-tight mb-1">
                      Mohammed Ehsanullah
                    </h3>
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--accent)] font-semibold">
                      Founder · Apex Global Estates
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-serif text-sm font-semibold">
                    ME
                  </div>
                </div>

                {/* Direct Founder Contact Methods */}
                <div className="space-y-4">
                  {/* Phone Item */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:border-white/20 transition-all duration-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                        <Phone size={14} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono tracking-widest uppercase text-white/50">
                          Direct Line
                        </span>
                        <a
                          href="tel:+919110656326"
                          className="text-white text-sm font-mono tracking-wide hover:text-[var(--accent)] transition-colors truncate block"
                          title="Call Mohammed Ehsanullah"
                        >
                          +91 91106 56326
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('+919110656326', 'founder-phone')}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[11px] tracking-wider uppercase transition-all duration-200 flex-shrink-0',
                        copiedKey === 'founder-phone'
                          ? 'bg-[var(--accent)] text-[#0A100D] font-bold shadow-[0_0_15px_rgba(201,173,117,0.4)]'
                          : 'border border-white/15 text-white/70 hover:text-white hover:border-white/30 bg-white/[0.03]'
                      )}
                      aria-label="Copy phone number"
                    >
                      {copiedKey === 'founder-phone' ? (
                        <>
                          <Check size={12} strokeWidth={2.5} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Email Item */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.06] bg-black/40 hover:border-white/20 transition-all duration-200">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[var(--accent)] flex-shrink-0">
                        <Mail size={14} />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-mono tracking-widest uppercase text-white/50">
                          Direct Email
                        </span>
                        <a
                          href="mailto:koushikshet2401@gmail.com"
                          className="text-white text-xs sm:text-sm font-mono tracking-wide hover:text-[var(--accent)] transition-colors truncate block"
                          title="Email Mohammed Ehsanullah"
                        >
                          koushikshet2401@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('koushikshet2401@gmail.com', 'founder-email')}
                      className={cn(
                        'flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-[11px] tracking-wider uppercase transition-all duration-200 flex-shrink-0',
                        copiedKey === 'founder-email'
                          ? 'bg-[var(--accent)] text-[#0A100D] font-bold shadow-[0_0_15px_rgba(201,173,117,0.4)]'
                          : 'border border-white/15 text-white/70 hover:text-white hover:border-white/30 bg-white/[0.03]'
                      )}
                      aria-label="Copy email address"
                    >
                      {copiedKey === 'founder-email' ? (
                        <>
                          <Check size={12} strokeWidth={2.5} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* DPDP Privacy Badge Notice */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[var(--accent)] flex-shrink-0" />
                    <span className="font-mono text-[11px] tracking-wider uppercase text-white/70">
                      DPDP Act, 2023 Compliant
                    </span>
                  </div>
                  <Link
                    href="/privacy-policy"
                    className="font-mono text-[10px] text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                  >
                    <span>Notice</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN — REFINED DPDP-AWARE ENQUIRY FORM            */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.015] p-7 sm:p-10 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              {submitted ? (
                /* Confirmed Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-12 flex flex-col items-center text-center max-w-md mx-auto"
                >
                  <div className="w-14 h-14 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(201,173,117,0.25)]">
                    <Check size={24} className="text-[var(--accent)]" strokeWidth={2} />
                  </div>

                  <h3 className="heading-display text-2xl sm:text-3xl text-white mb-3">
                    Thank you for your enquiry.
                  </h3>

                  <p className="text-[var(--text-secondary)] font-light text-base mb-6 leading-relaxed">
                    Our team will be in touch within one working day with a curated dossier aligned to your requirements.
                  </p>

                  {submissionId && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-xs text-white/70 mb-8">
                      <span className="text-white/40 uppercase">Ref ID:</span>
                      <span className="text-[var(--accent)] font-semibold">{submissionId}</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setFullName('')
                      setEmail('')
                      setPhoneNumber('')
                      setMessage('')
                      setConsentGiven(false)
                      setSubmissionId(null)
                    }}
                    className="btn-outline text-xs tracking-widest uppercase px-6 py-3"
                  >
                    Submit Another Enquiry
                  </button>
                </motion.div>
              ) : (
                /* Active Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Server error alert banner if submission fails */}
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 flex items-start gap-3 text-red-200 text-xs sm:text-sm"
                    >
                      <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <strong className="block text-red-300 font-medium">Submission Error</strong>
                        <span>{formError}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Honeypot field (hidden from users, traps bots) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="sr-only"
                    aria-hidden="true"
                  />

                  {/* 1. Full Name */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="full-name"
                      className="font-mono text-xs tracking-wider uppercase text-white/70 flex justify-between"
                    >
                      <span>Full Name</span>
                      <span className="text-[var(--accent)] text-[10px] tracking-normal">*Required</span>
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      name="name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value)
                        if (validationErrors.name) setValidationErrors((prev) => ({ ...prev, name: '' }))
                      }}
                      placeholder="e.g. Alistair Vance"
                      className={cn(
                        'w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none transition-all duration-200',
                        validationErrors.name
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/15 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30'
                      )}
                      aria-invalid={Boolean(validationErrors.name)}
                      aria-describedby={validationErrors.name ? 'name-error' : undefined}
                    />
                    {validationErrors.name && (
                      <p id="name-error" className="text-red-400 text-xs font-mono mt-0.5 flex items-center gap-1">
                        <AlertCircle size={11} /> {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* 2. International Phone Number Input */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone-input"
                      className="font-mono text-xs tracking-wider uppercase text-white/70 flex justify-between"
                    >
                      <span>Phone Number</span>
                      <span className="text-[var(--accent)] text-[10px] tracking-normal">*Required</span>
                    </label>

                    <div className="flex gap-2">
                      {/* Country Selector Dropdown */}
                      <div ref={countryDropdownRef} className="relative">
                        <button
                          type="button"
                          onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                          className={cn(
                            'h-[48px] px-3.5 rounded-xl border bg-black/40 flex items-center gap-2 text-white text-sm focus:outline-none transition-all duration-200',
                            isCountryDropdownOpen
                              ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/30'
                              : 'border-white/15 hover:border-white/30'
                          )}
                          aria-label={`Selected country: ${selectedCountry.name} (${selectedCountry.dialCode})`}
                          aria-expanded={isCountryDropdownOpen}
                        >
                          <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
                            {selectedCountry.flag}
                          </span>
                          <span className="font-mono text-xs text-white/90 font-medium">
                            {selectedCountry.dialCode}
                          </span>
                          <ChevronDown
                            size={14}
                            className={cn('text-white/50 transition-transform duration-200', isCountryDropdownOpen && 'rotate-180')}
                          />
                        </button>

                        {/* Country Options Popup */}
                        <AnimatePresence>
                          {isCountryDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 6, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 4, scale: 0.98 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 top-full mt-2 w-[280px] sm:w-[320px] max-h-[300px] rounded-xl border border-white/20 bg-[#0E1511] shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-50 flex flex-col overflow-hidden backdrop-blur-xl"
                            >
                              {/* Search Input within Dropdown */}
                              <div className="p-3 border-b border-white/10 bg-black/40">
                                <div className="relative flex items-center">
                                  <Search size={14} className="absolute left-3 text-white/40 pointer-events-none" />
                                  <input
                                    ref={countrySearchInputRef}
                                    type="text"
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    placeholder="Search country or code..."
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--accent)]"
                                  />
                                </div>
                              </div>

                              {/* Country List Items */}
                              <div className="overflow-y-auto divide-y divide-white/[0.04] p-1">
                                {filteredCountries.length > 0 ? (
                                  filteredCountries.map((country) => (
                                    <button
                                      key={country.code}
                                      type="button"
                                      onClick={() => {
                                        setSelectedCountry(country)
                                        setIsCountryDropdownOpen(false)
                                      }}
                                      className={cn(
                                        'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors',
                                        selectedCountry.code === country.code
                                          ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-medium'
                                          : 'text-white/80 hover:bg-white/[0.06] hover:text-white'
                                      )}
                                    >
                                      <div className="flex items-center gap-2.5 truncate">
                                        <span className="text-base" role="img" aria-label={country.name}>
                                          {country.flag}
                                        </span>
                                        <span className="truncate">{country.name}</span>
                                      </div>
                                      <span className="font-mono text-white/50 text-[11px] ml-2 flex-shrink-0">
                                        {country.dialCode}
                                      </span>
                                    </button>
                                  ))
                                ) : (
                                  <div className="p-4 text-center text-xs text-white/40">
                                    No countries matching &quot;{countrySearch}&quot;
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Phone Input */}
                      <div className="relative flex-1">
                        <input
                          id="phone-input"
                          type="tel"
                          name="phone"
                          value={phoneNumber}
                          onChange={handlePhoneChange}
                          onPaste={handlePhonePaste}
                          placeholder={selectedCountry.format}
                          className={cn(
                            'w-full h-[48px] bg-black/40 border rounded-xl px-4 text-white text-sm font-mono placeholder:text-white/30 focus:outline-none transition-all duration-200',
                            validationErrors.phone
                              ? 'border-red-500/60 focus:border-red-500'
                              : 'border-white/15 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30'
                          )}
                          aria-invalid={Boolean(validationErrors.phone)}
                          aria-describedby={validationErrors.phone ? 'phone-error' : undefined}
                        />
                      </div>
                    </div>

                    {validationErrors.phone ? (
                      <p id="phone-error" className="text-red-400 text-xs font-mono mt-0.5 flex items-center gap-1">
                        <AlertCircle size={11} /> {validationErrors.phone}
                      </p>
                    ) : (
                      <span className="text-[11px] text-white/40 font-mono">
                        Supports international dialing (e.g. {selectedCountry.dialCode} {selectedCountry.format})
                      </span>
                    )}
                  </div>

                  {/* 3. Email Address */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email-address"
                      className="font-mono text-xs tracking-wider uppercase text-white/70 flex justify-between"
                    >
                      <span>Email Address</span>
                      <span className="text-[var(--accent)] text-[10px] tracking-normal">*Required</span>
                    </label>
                    <input
                      id="email-address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (validationErrors.email) setValidationErrors((prev) => ({ ...prev, email: '' }))
                      }}
                      placeholder="e.g. alistair@vance-holdings.com"
                      className={cn(
                        'w-full bg-black/40 border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/30 focus:outline-none transition-all duration-200',
                        validationErrors.email
                          ? 'border-red-500/60 focus:border-red-500'
                          : 'border-white/15 focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30'
                      )}
                      aria-invalid={Boolean(validationErrors.email)}
                      aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    />
                    {validationErrors.email && (
                      <p id="email-error" className="text-red-400 text-xs font-mono mt-0.5 flex items-center gap-1">
                        <AlertCircle size={11} /> {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* 4. Service Interest Selector (Custom Luxury Dropdown) */}
                  <div className="flex flex-col gap-2">
                    <label
                      id="service-label"
                      className="font-mono text-xs tracking-wider uppercase text-white/70"
                    >
                      Service Interest
                    </label>

                    <div ref={serviceDropdownRef} className="relative">
                      <button
                        type="button"
                        onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
                        className={cn(
                          'w-full bg-black/40 border rounded-xl px-4 py-3.5 text-left text-sm flex items-center justify-between focus:outline-none transition-all duration-200',
                          isServiceDropdownOpen
                            ? 'border-[var(--accent)] ring-1 ring-[var(--accent)]/30'
                            : 'border-white/15 hover:border-white/30'
                        )}
                        aria-labelledby="service-label"
                        aria-expanded={isServiceDropdownOpen}
                      >
                        <span className="text-white font-medium">{selectedService}</span>
                        <ChevronDown
                          size={16}
                          className={cn('text-[var(--accent)] transition-transform duration-200', isServiceDropdownOpen && 'rotate-180')}
                        />
                      </button>

                      <AnimatePresence>
                        {isServiceDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-white/20 bg-[#0E1511] shadow-[0_15px_40px_rgba(0,0,0,0.85)] z-40 p-1.5 backdrop-blur-xl"
                          >
                            {SERVICE_OPTIONS.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setSelectedService(item)
                                  setIsServiceDropdownOpen(false)
                                }}
                                className={cn(
                                  'w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left text-sm transition-colors',
                                  selectedService === item
                                    ? 'bg-[var(--accent)]/15 text-[var(--accent)] font-medium'
                                    : 'text-white/80 hover:bg-white/[0.06] hover:text-white'
                                )}
                              >
                                <span>{item}</span>
                                {selectedService === item && <Check size={14} className="text-[var(--accent)]" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* 5. Optional Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message-input"
                      className="font-mono text-xs tracking-wider uppercase text-white/70 flex justify-between"
                    >
                      <span>Tell us about your plans</span>
                      <span className="text-white/40 text-[10px] tracking-normal">Optional</span>
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief details regarding your desired architectural destination, floor area, or target timeline..."
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]/30 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* 6. DPDP-Aware Privacy Consent Checkbox (Strictly Unchecked by Default) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5">
                        <input
                          type="checkbox"
                          checked={consentGiven}
                          onChange={(e) => {
                            setConsentGiven(e.target.checked)
                            if (validationErrors.consent) {
                              setValidationErrors((prev) => ({ ...prev, consent: '' }))
                            }
                          }}
                          className="peer sr-only"
                          aria-invalid={Boolean(validationErrors.consent)}
                          aria-describedby={validationErrors.consent ? 'consent-error' : undefined}
                        />
                        <div
                          className={cn(
                            'w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center',
                            consentGiven
                              ? 'bg-[var(--accent)] border-[var(--accent)] text-[#0A100D]'
                              : validationErrors.consent
                              ? 'border-red-500 bg-red-500/10'
                              : 'border-white/30 bg-black/40 group-hover:border-white/60'
                          )}
                        >
                          {consentGiven && <Check size={13} strokeWidth={3} />}
                        </div>
                      </div>

                      <span className="text-xs text-[var(--text-secondary)] font-light leading-relaxed select-none">
                        I agree that Apex Global Estates may use the information I provide to respond to my enquiry. My information will not be used for unrelated marketing purposes. See our{' '}
                        <Link
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--accent)] underline underline-offset-2 hover:text-white transition-colors font-normal"
                        >
                          Privacy Notice
                        </Link>
                        .
                      </span>
                    </label>

                    {validationErrors.consent && (
                      <p id="consent-error" className="text-red-400 text-xs font-mono mt-2 ml-8 flex items-center gap-1">
                        <AlertCircle size={11} /> {validationErrors.consent}
                      </p>
                    )}
                  </div>

                  {/* 7. Response Time Commitment & Submit Button */}
                  <div className="pt-2 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-white/50">
                      <span>Response protocol</span>
                      <span className="text-white/80">Within one working day</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 rounded-xl bg-[var(--accent)] text-[#0A100D] font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#dfc58e] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none shadow-[0_8px_25px_rgba(201,173,117,0.25)] flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#0A100D] border-t-transparent rounded-full animate-spin" />
                          <span>Processing Enquiry...</span>
                        </>
                      ) : (
                        <span>Send Enquiry</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
