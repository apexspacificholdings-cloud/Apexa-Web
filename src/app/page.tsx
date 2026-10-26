'use client'

import { useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CollectionSection } from '@/components/sections/CollectionSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PerspectiveGallerySection } from '@/components/sections/PerspectiveGallerySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'


export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        // Refresh ScrollTrigger calculations after initial paint
        const timer = setTimeout(() => {
          ScrollTrigger.refresh()
        }, 300)
        return () => clearTimeout(timer)
      })
    }
  }, [])

  return (
    <>
      <Navigation />
      <main>
        {/* Full-screen cinematic hero with background video */}
        <HeroSection />

        {/* Subsequent sections */}
        <AboutSection />
        <CollectionSection />
        <ServicesSection />
        <PerspectiveGallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
