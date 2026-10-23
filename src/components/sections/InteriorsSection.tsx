'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const rooms = [
  {
    id: 'living',
    label: 'Living',
    title: 'The Living Room',
    description: 'Panelled ivory walls, a floating credenza and a black marble niche lit from within. The arched mirror doubles the garden view.',
    details: ['Fluted marble inlay', 'Concealed warm LED', 'Bespoke floating joinery'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    title: 'The Kitchen',
    description: 'A waterfall island in Statuario-look marble seats five beneath hand-blown glass pendants, framed by smoked oak cabinetry.',
    details: ['Book-matched stone island', 'Integrated appliances', 'Open shelving with backlight'],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'bedroom',
    label: 'Bedroom',
    title: 'The Bedroom',
    description: 'Soft bouclé, natural oak and layered linen in a calm palette. Sheer curtains filter the afternoon sun.',
    details: ['Upholstered headboard wall', 'Solid oak casegoods', 'Hand-woven jute rug'],
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'bath',
    label: 'Bath',
    title: 'The Bath',
    description: 'Hand-glazed vertical tile meets honed stone. Brushed brass fittings and a backlit mirror keep the room warm at night.',
    details: ['Wall-hung fixtures', 'Recessed stone niche', 'Brushed brass rain shower'],
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 'study',
    label: 'Study',
    title: 'The Study',
    description: 'Floor-to-ceiling walnut library shelving against sage panelling, with a writing desk set to face the window.',
    details: ['Walnut library wall', 'Shelf-integrated lighting', 'Panelled sage finish'],
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80&auto=format&fit=crop',
  },
]

export function InteriorsSection() {
  const [activeRoom, setActiveRoom] = useState(0)
  const room = rooms[activeRoom]

  return (
    <section id="studio" className="section-padding bg-[var(--bg-primary)]">
      <div className="container-content">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-8 h-px bg-[var(--border-strong)]" />
          <span className="label text-[var(--text-muted)]">Interior Studio</span>
        </div>

        <motion.h2
          className="heading-display text-display-lg text-[var(--text-primary)] mb-16 text-balance"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Rooms that{' '}
          <em className="italic-serif">hold the light</em>
        </motion.h2>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={room.id}
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </AnimatePresence>
            {/* Room number */}
            <div className="absolute top-4 left-4 font-mono text-xs text-white/50 tracking-widest">
              {String(activeRoom + 1).padStart(2, '0')}
            </div>
          </div>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={room.id}
              className="lg:pl-8"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="heading-display text-display-md text-[var(--text-primary)] mb-6">
                {room.title}
              </h3>
              <p className="text-[var(--text-secondary)] font-light leading-relaxed mb-8 text-pretty">
                {room.description}
              </p>
              <ul className="space-y-3 border-t border-[var(--border-light)] pt-8">
                {room.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-[var(--text-muted)] text-sm">
                    <div className="w-1 h-1 rounded-full bg-[var(--accent)] flex-none" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Room tabs */}
        <div className="flex items-center gap-1 mt-12 border-t border-[var(--border-light)] pt-8 overflow-x-auto scrollbar-none">
          {rooms.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveRoom(i)}
              className={cn(
                'px-5 py-2.5 label transition-all duration-300 whitespace-nowrap',
                i === activeRoom
                  ? 'text-[var(--text-primary)] bg-[var(--bg-card)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
