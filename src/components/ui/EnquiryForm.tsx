'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'

export function EnquiryForm({ propertyName }: { propertyName: string }) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="py-8">
        <div className="w-8 h-8 border border-[var(--accent)] flex items-center justify-center mb-4">
          <Check size={14} className="text-[var(--accent)]" strokeWidth={1.5} />
        </div>
        <p className="text-[var(--text-primary)] font-medium mb-1">Enquiry sent</p>
        <p className="text-[var(--text-muted)] text-sm">We'll be in touch within one working day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
      <p className="label text-[var(--text-muted)] mb-2">Enquire about {propertyName}</p>
      {[['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone', 'tel']].map(([name, label, type]) => (
        <div key={name} className="flex flex-col gap-1.5">
          <label htmlFor={`enquiry-${name}`} className="label text-[var(--text-muted)]">{label}</label>
          <input id={`enquiry-${name}`} type={type} name={name} required={name !== 'phone'}
            className="w-full min-h-[44px] bg-transparent border-b border-[var(--border-default)] py-2.5 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-colors" />
        </div>
      ))}
      <button type="submit"
        className="w-full py-3.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors duration-300 mt-4 font-medium">
        Send Enquiry
      </button>
    </form>
  )
}
