import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="bg-[var(--bg-primary)] pt-32 pb-24 min-h-screen">
        <div className="container-narrow">
          <span className="label text-[var(--text-muted)] block mb-4">Legal</span>
          <h1 className="heading-display text-display-lg text-[var(--text-primary)] mb-12">Privacy Policy</h1>
          <div className="prose text-[var(--text-secondary)] font-light leading-relaxed space-y-6">
            <p>
              This privacy policy explains how Apex Global Estates collects, uses, and protects your personal information when you use this website or contact us about our properties.
            </p>
            <p>
              We are committed to maintaining the confidentiality and integrity of all client information. Any data submitted through our private enquiries, scheduling requests, or newsletter registrations is securely handled according to international standards (including GDPR and regional data compliance protocols).
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              <strong className="font-medium text-[var(--text-secondary)]">Last updated:</strong> November 2026 · Full legal text to be provided by client before launch.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
