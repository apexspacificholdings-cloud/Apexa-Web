import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PropertyVariant1 } from '@/components/property-variants/PropertyVariant1'
import { PropertyVariant2 } from '@/components/property-variants/PropertyVariant2'
import { PropertyVariant3 } from '@/components/property-variants/PropertyVariant3'

// TEMP: Seeded — replace with prisma.property.findUnique({ where: { slug } })
const PROPERTIES: Record<string, any> = {
  'aurelia-villa': {
    slug: 'aurelia-villa', layoutVariant: 1, name: 'Aurelia Villa',
    country: 'India', city: 'Hyderabad', type: 'residential', beds: 5, baths: 5,
    area: '8,200 sq ft', price: '₹ 12.5 Cr',
    description: 'A contemporary five-bedroom villa set within a sculpted garden in Jubilee Hills. Designed around natural light and cross-ventilation, the home balances architectural precision with the warmth of natural materials.',
    highlights: ['Private rooftop with infinity pool', '5 ensuite bedrooms', 'Double-height living room', 'Home cinema', 'Staff quarters'],
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1600&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80&auto=format&fit=crop',
    ],
    lat: 17.4318, lng: 78.3821,
  },
  'the-meridian': {
    slug: 'the-meridian', layoutVariant: 2, name: 'The Meridian',
    country: 'UAE', city: 'Dubai', type: 'residential', beds: 3, baths: 4,
    area: '3,800 sq ft', price: 'AED 8.2M',
    description: 'Seven floors. Sky gardens on every level. Twenty-four residences, each occupying a full quarter of its floor. The Meridian sets a new standard for boutique high-rise living in Dubai.',
    highlights: ['Sky garden terraces', 'Concierge services', 'Private pool', 'Smart home system', 'EV charging'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop',
    ],
    lat: 25.1972, lng: 55.2744,
  },
  'horizon-pavilion': {
    slug: 'horizon-pavilion', layoutVariant: 3, name: 'Horizon Pavilion',
    country: 'Malaysia', city: 'Kuala Lumpur', type: 'mixed_use', beds: 2, baths: 3,
    area: '2,950 sq ft', price: 'MYR 4.6M',
    description: 'A striking architectural landmark in Kuala Lumpur centre. Seamlessly combining private luxury sky residences with curated cultural and culinary spaces below.',
    highlights: ['Panoramic city skyline views', 'Bespoke Italian joinery', 'Wellness suite & hydrotherapy', '24/7 dedicated butler service', 'Private art gallery lounge'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80&auto=format&fit=crop',
    ],
    lat: 3.1390, lng: 101.6869,
  },
  'verdant-house': {
    slug: 'verdant-house', layoutVariant: 1, name: 'Verdant House',
    country: 'India', city: 'Mumbai', type: 'residential', beds: 6, baths: 7,
    area: '10,500 sq ft', price: '₹ 28.0 Cr',
    description: 'Estate home set within a secluded private garden in South Mumbai. A rare sanctuary balancing sprawling indoor proportions with courtyard garden transitions.',
    highlights: ['Private inner courtyard garden', '6 ensuite master suites', 'Subterranean wine cellar', 'Private wellness pavilion', 'Multi-car secured gallery'],
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1200&q=80&auto=format&fit=crop',
    ],
    lat: 18.9220, lng: 72.8347,
  },
  'ivory-residences': {
    slug: 'ivory-residences', layoutVariant: 2, name: 'Ivory Residences',
    country: 'Australia', city: 'Melbourne', type: 'residential', beds: 2, baths: 2,
    area: '2,100 sq ft', price: 'AUD 2.85M',
    description: 'Refined apartments with expansive harbour-facing terraces overlooking Melbourne. Sculptural stone details, floor-to-ceiling double glazing, and uncompromised craftsmanship.',
    highlights: ['Harbourfront panoramic terraces', 'Imported travertine finishes', 'Residents lounge and sommelier room', 'Direct marina access', 'Integrated Gaggenau appliances'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80&auto=format&fit=crop',
    ],
    lat: -37.8136, lng: 144.9631,
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const property = PROPERTIES[slug]
  if (!property) return { title: 'Not Found' }
  return {
    title: `${property.name} — ${property.city}`,
    description: property.description,
    openGraph: {
      title: `${property.name} | Apex Global Estates`,
      description: property.description,
      images: [{ url: property.image, width: 1200, height: 630 }],
    },
  }
}

export async function generateStaticParams() {
  return Object.keys(PROPERTIES).map((slug) => ({ slug }))
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = PROPERTIES[slug]
  if (!property) notFound()

  const variants: Record<number, React.ComponentType<any>> = {
    1: PropertyVariant1,
    2: PropertyVariant2,
    3: PropertyVariant3,
  }
  const VariantComponent = variants[property.layoutVariant] ?? PropertyVariant1

  return <VariantComponent property={property} />
}
