import type { Metadata } from 'next'
import { PropertiesClient } from '@/components/pages/PropertiesClient'

// TEMP: Seeded data — replace with Prisma query when backend is ready
const SEED_PROPERTIES = [
  { id: '1', slug: 'aurelia-villa', name: 'Aurelia Villa', type: 'residential', country: 'India', city: 'Hyderabad', beds: 5, status: 'published', layoutVariant: 1, image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80&auto=format&fit=crop', shortDescription: 'Contemporary five-bedroom villa with roof garden.' },
  { id: '2', slug: 'the-meridian', name: 'The Meridian', type: 'residential', country: 'UAE', city: 'Dubai', beds: 3, status: 'published', layoutVariant: 2, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80&auto=format&fit=crop', shortDescription: 'Boutique tower, sky gardens, 24 residences.' },
  { id: '3', slug: 'horizon-pavilion', name: 'Horizon Pavilion', type: 'mixed_use', country: 'Malaysia', city: 'Kuala Lumpur', beds: 2, status: 'published', layoutVariant: 3, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80&auto=format&fit=crop', shortDescription: 'Mixed-use development in the city centre.' },
  { id: '4', slug: 'verdant-house', name: 'Verdant House', type: 'residential', country: 'India', city: 'Mumbai', beds: 6, status: 'published', layoutVariant: 1, image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop', shortDescription: 'Estate home set within a private garden.' },
  { id: '5', slug: 'ivory-residences', name: 'Ivory Residences', type: 'residential', country: 'Australia', city: 'Melbourne', beds: 2, status: 'published', layoutVariant: 2, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop', shortDescription: 'Refined apartments with harbour-facing terraces.' },
]

export const metadata: Metadata = {
  title: 'Residences',
  description: 'Explore our portfolio of signature villas, sky residences and boutique developments across UAE, India, Australia and beyond.',
}

export default function PropertiesPage() {
  return <PropertiesClient properties={SEED_PROPERTIES} />
}
