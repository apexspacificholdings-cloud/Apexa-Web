import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/Navigation'
import { CollectionSection } from '@/components/sections/CollectionSection'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Destinations & Collection — Apex Global Estates',
  description: 'Explore our curated international collection of luxury villas, sky residences, and architectural estates across India, Malaysia, UAE, and the Atlantic.',
}

export default function DestinationsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0A100D] pt-20">
        <CollectionSection />
      </main>
      <Footer />
    </>
  )
}
