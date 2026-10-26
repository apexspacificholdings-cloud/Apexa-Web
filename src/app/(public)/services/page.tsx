import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Our Services — Apexa Global Estates',
  description: 'Explore our integrated real-estate practice spanning Luxury Villas, Sky Residences, Interior Studio, and Global Advisory.',
}

export default function ServicesIndexPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0A100D] pt-20">
        <ServicesSection />
      </main>
      <Footer />
    </>
  )
}
