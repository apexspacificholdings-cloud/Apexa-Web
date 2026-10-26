export interface ServiceItem {
  id: string
  number: string
  slug: string
  title: string
  subtitle: string
  tagline: string
  description: string
  heroDescription: string
  route: string
  image: string
  architecturalFocus: string[]
  deliverables: {
    title: string
    detail: string
  }[]
  iconType: 'villa' | 'sky' | 'interior' | 'advisory'
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'luxury-villas',
    number: '01',
    slug: 'luxury-villas',
    title: 'Luxury Villas',
    subtitle: 'Private Residences & Estates',
    tagline: 'Private architecture, landscape, space, and bespoke exclusivity.',
    description:
      'Private residences sculpted to their terrain. Orientation, gardens, and generative natural light designed around the cadence of multi-generational family life.',
    heroDescription:
      'From coastal promontories to secluded hillside groves, our Luxury Villas studio conceives standalone residences that harmonize architecture, light, and living landscape into timeless heirlooms.',
    route: '/services/luxury-villas',
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1600&q=85&auto=format&fit=crop',
    iconType: 'villa',
    architecturalFocus: [
      'Microclimate & Sun Orientation',
      'Artisanal Stone & Timber Joinery',
      'Integrated Native Landscapes',
      'Multi-Generational Spatial Flow',
    ],
    deliverables: [
      {
        title: 'Topographic & Solar Orientation',
        detail: 'Deep site-specific study maximizing prevailing breezes, privacy sightlines, and morning light angles.',
      },
      {
        title: 'Bespoke Architectural Engineering',
        detail: 'Comprehensive structural, MEP, and building envelope design with zero compromise on structural purity.',
      },
      {
        title: 'Courtyard & Water Architecture',
        detail: 'Seamless integration of reflecting pools, cascading water features, and climate-moderating internal atriums.',
      },
      {
        title: 'Turnkey Construction & Handover',
        detail: 'Direct execution by our dedicated master craftsmen, ensuring uninterrupted continuity from blueprint to keys.',
      },
    ],
  },
  {
    id: 'sky-residences',
    number: '02',
    slug: 'sky-residences',
    title: 'Sky Residences',
    subtitle: 'High-Rise Architectural Living',
    tagline: 'Vertical architecture, skyline views, and refined contemporary living.',
    description:
      'Boutique residential towers offering single-floor residences, private cantilevered terraces, horizon views, and seamless concierge-managed privacy.',
    heroDescription:
      'Reinventing high-rise living through low-density vertical boutique developments that combine penthouse privacy, expansive open-air sky gardens, and uninhibited panoramic views.',
    route: '/services/sky-residences',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=85&auto=format&fit=crop',
    iconType: 'sky',
    architecturalFocus: [
      'Low-Density Floorplans',
      'Cantilevered Sky Terraces',
      'Acoustic & Wind Isolation',
      'Private Elevator Landings',
    ],
    deliverables: [
      {
        title: 'Full-Floor Spatial Zoning',
        detail: 'Individual floorplates configured with distinct formal entertaining, family living, and private bedroom suites.',
      },
      {
        title: 'Terrace Structural Engineering',
        detail: 'Deep sheltered outdoor loggias designed with integrated irrigation, plunge pools, and wind-dampening glass balustrades.',
      },
      {
        title: 'Private Vertical Transit',
        detail: 'Biometric, high-speed elevator access opening directly into private, secured residential vestibules.',
      },
      {
        title: 'Curated Building Amenities',
        detail: 'Dedicated wellness suites, private screening rooms, wine storage vaults, and 24/7 dedicated concierge facilities.',
      },
    ],
  },
  {
    id: 'interior-studio',
    number: '03',
    slug: 'interior-studio',
    title: 'Interior Studio',
    subtitle: 'Bespoke Curated Interiors',
    tagline: 'Materiality, bespoke lighting, curated furniture, and tactile textures.',
    description:
      'Turnkey spatial design bringing custom millwork, rare marble, ambient lighting, and bespoke European furnishings into flawless architectural balance.',
    heroDescription:
      'Our interior architecture studio crafts environments of tactile quietude and sensory warmth, sourcing European stone, custom metalwork, and bespoke furnishings tailored to each residence.',
    route: '/services/interior-studio',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85&auto=format&fit=crop',
    iconType: 'interior',
    architecturalFocus: [
      'Tactile Natural Stones',
      'Precision Architectural Millwork',
      'Atmospheric Multi-Layer Lighting',
      'Sourced Fine Art & Furnishings',
    ],
    deliverables: [
      {
        title: 'Custom Millwork & Cabinetry',
        detail: 'Precision-engineered bookmatched veneers, concealed joinery, walk-in dressing suites, and custom chef pantries.',
      },
      {
        title: 'Stone Quarry Selection',
        detail: 'Hand-selected slabs of Travertine, Calacatta, and Nero Marquina sourced directly from European quarries.',
      },
      {
        title: 'Circadian Lighting Design',
        detail: 'Discrete architectural lighting schemes tailored to transition seamlessly from morning clarity to twilight warmth.',
      },
      {
        title: 'FF&E White-Glove Installation',
        detail: 'Comprehensive procurement, international logistics, custom framing, and turnkey white-glove staging.',
      },
    ],
  },
  {
    id: 'global-advisory',
    number: '04',
    slug: 'global-advisory',
    title: 'Global Advisory',
    subtitle: 'Prime Real Estate Investment',
    tagline: 'Cross-border property acquisition, portfolio structuring, and private wealth placement.',
    description:
      'Discrete acquisition, off-market advisory, and portfolio preservation for private clients and international family offices investing across India, the Gulf, and Europe.',
    heroDescription:
      'Navigating premier international property markets with discretion, deep local intelligence, and financial rigor to curate, secure, and preserve legacy real estate assets worldwide.',
    route: '/services/global-advisory',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85&auto=format&fit=crop',
    iconType: 'advisory',
    architecturalFocus: [
      'Off-Market Discretion',
      'Cross-Border Asset Structuring',
      'Capital Appreciation & Yield',
      'Family Office Representation',
    ],
    deliverables: [
      {
        title: 'Discreet Off-Market Sourcing',
        detail: 'Direct access to institutional-grade trophy residences and private family estates never listed publicly.',
      },
      {
        title: 'Cross-Border Due Diligence',
        detail: 'Thorough examination of freehold titles, local planning laws, structural surveys, and repatriation structures.',
      },
      {
        title: 'Portfolio Optimization & Yield',
        detail: 'Balancing sovereign exposure, currency hedges, capital appreciation targets, and prime rental yield.',
      },
      {
        title: 'Private Client Representation',
        detail: 'End-to-end representation from non-disclosure agreements through confidential settlement and estate management.',
      },
    ],
  },
]
