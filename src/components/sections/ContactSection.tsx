'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, Copy, Check } from 'lucide-react'

const interests = ['Luxury villa', 'Sky residence', 'Interior design', 'Investment advisory']

export function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null)
  const [interest, setInterest] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleInterest = (item: string) => {
    setInterest((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  return (
    <section id="contact" className="section-padding bg-[var(--bg-card)]">
      <div className="container-content">

        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[var(--border-strong)]" />
          <span className="label text-[var(--text-muted)]">Private Enquiries</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — founder + contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="heading-display text-display-lg text-[var(--text-primary)] mb-12 text-balance">
              Let's find your{' '}
              <em className="italic-serif">next address</em>
            </h2>

            <div className="mb-10">
              <p className="text-[var(--text-primary)] font-medium mb-0.5">Mohammed Ehsanullah</p>
              <p className="label text-[var(--text-muted)]">Founder · Apex Global Estates</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-[var(--border-light)]">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                  <span className="text-[var(--text-secondary)] text-sm">+91 91106 56326</span>
                </div>
                <button
                  onClick={() => copy('+919110656326', 'phone')}
                  className="label text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                >
                  {copied === 'phone' ? <Check size={12} /> : <Copy size={12} />}
                  {copied === 'phone' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-[var(--border-light)]">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-[var(--text-muted)]" strokeWidth={1.5} />
                  <span className="text-[var(--text-secondary)] text-sm">ehsanullah.biz@gmail.com</span>
                </div>
                <button
                  onClick={() => copy('ehsanullah.biz@gmail.com', 'email')}
                  className="label text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1.5"
                >
                  {copied === 'email' ? <Check size={12} /> : <Copy size={12} />}
                  {copied === 'email' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <div className="w-10 h-10 border border-[var(--accent)] flex items-center justify-center mb-6">
                  <Check size={18} className="text-[var(--accent)]" strokeWidth={1.5} />
                </div>
                <h3 className="heading-display text-display-sm text-[var(--text-primary)] mb-3">
                  Thank you
                </h3>
                <p className="text-[var(--text-muted)] font-light">
                  We'll be in touch within one working day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                className="space-y-6"
              >
                {/* Fields */}
                {[
                  { name: 'name', label: 'Full name', type: 'text' },
                  { name: 'phone', label: 'Phone', type: 'tel' },
                  { name: 'email', label: 'Email', type: 'email' },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label className="label text-[var(--text-muted)]">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required={field.name !== 'phone'}
                      className="w-full bg-transparent border-b border-[var(--border-default)] py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-300"
                    />
                  </div>
                ))}

                {/* Interest selector */}
                <div>
                  <p className="label text-[var(--text-muted)] mb-3">I'm interested in</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleInterest(item)}
                        className={`px-4 py-2 text-xs tracking-wide border transition-all duration-200 ${
                          interest.includes(item)
                            ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--bg-card)]'
                            : 'border-[var(--border-default)] text-[var(--text-muted)] hover:border-[var(--border-strong)]'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="label text-[var(--text-muted)]">Tell us about your plans</label>
                  <textarea
                    rows={4}
                    className="w-full bg-transparent border-b border-[var(--border-default)] py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-colors duration-300 resize-none"
                  />
                </div>

                <p className="text-[var(--text-muted)] text-xs">
                  We reply within one working day.
                </p>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs tracking-widest uppercase font-medium hover:bg-[var(--accent)] transition-colors duration-300"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
