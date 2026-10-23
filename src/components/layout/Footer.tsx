import Link from 'next/link'

const footerLinks = [
  { label: 'About',      href: '/#about' },
  { label: 'Residences', href: '/properties' },
  { label: 'Services',   href: '/#services' },
  { label: 'Interiors',  href: '/#studio' },
  { label: 'Contact',    href: '/#contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] bg-[var(--bg-primary)]">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div>
            <div className="heading-display text-[var(--text-primary)] mb-3"
              style={{ fontSize: '1.25rem', letterSpacing: '0.2em' }}>
              APEX
            </div>
            <p className="label text-[var(--text-muted)] mb-4">Global Estates</p>
            <p className="text-[var(--text-muted)] text-sm font-light leading-relaxed max-w-xs">
              Luxury residences across India and the Gulf. Architecture, interiors and investment advice from a single studio.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label text-[var(--text-muted)] mb-6">Navigation</p>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--text-secondary)] text-sm hover:text-[var(--text-primary)] transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label text-[var(--text-muted)] mb-6">Contact</p>
            <div className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
              <span>+91 91106 56326</span>
              <span>koushikshet2401@gmail.com</span>
              <span className="text-[var(--text-muted)] font-light">India · UAE · Australia · USA</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[var(--border-light)]">
          <p className="text-[var(--text-muted)] text-xs">
            © 2026 Apex Global Estates. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="label text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="label text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
