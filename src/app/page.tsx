'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/sections/LoadingScreen'
import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { CollectionSection } from '@/components/sections/CollectionSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { InteriorsSection } from '@/components/sections/InteriorsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: loaded ? 'auto' : 'none' }}>
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <CollectionSection />
          <ServicesSection />
          <InteriorsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
