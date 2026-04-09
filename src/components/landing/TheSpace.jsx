import FadeIn from '../ui/FadeIn'

export default function TheSpace() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-5">The Space</p>
          <h2 className="font-display text-navy font-light italic leading-tight mb-7"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}>
            A room made<br />for gathering
          </h2>
          <p className="font-body text-navy/65 text-base leading-relaxed mb-5">
            Ten beautifully arranged tables, warm lighting, and a curated atmosphere designed to make
            every game feel like an occasion. Whether you're a seasoned player or just learning,
            Four Winds is your place.
          </p>
          <p className="font-body text-navy/65 text-base leading-relaxed">
            We've thought about every detail — from the sound of tiles on solid wood surfaces to the
            freshly brewed tea waiting at your table. This is mahjong the way it was meant to be played.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="bg-light-blue p-6 md:p-8">
            <RoomIllustration />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function RoomIllustration() {
  // 10 tables in a 3-3-3-1 grid layout
  const tablePositions = [
    { x: 30,  y: 30  }, { x: 155, y: 30  }, { x: 280, y: 30  },
    { x: 30,  y: 130 }, { x: 155, y: 130 }, { x: 280, y: 130 },
    { x: 30,  y: 230 }, { x: 155, y: 230 }, { x: 280, y: 230 },
    { x: 155, y: 330 },
  ]

  return (
    <svg viewBox="0 0 400 420" className="w-full max-w-sm mx-auto" aria-label="Floor plan of Four Winds">
      {/* Room */}
      <rect x="8" y="8" width="384" height="404" rx="3" fill="#faf8f3" stroke="#7aaee0" strokeWidth="1.5" />

      {/* Entrance */}
      <rect x="160" y="8" width="80" height="4" fill="#c9a84c" />
      <text x="200" y="21" textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="DM Sans, sans-serif" letterSpacing="1">ENTRANCE</text>

      {/* Tables */}
      {tablePositions.map((pos, i) => (
        <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
          <rect x="0" y="0" width="90" height="75" rx="3" fill="#b8d4f5" stroke="#1a3a6b" strokeWidth="1.2" opacity="0.9" />
          <text x="45" y="42" textAnchor="middle" fill="#1a3a6b" fontSize="10" fontFamily="DM Sans, sans-serif" fontWeight="500">T{i + 1}</text>
          {/* N seat */}
          <circle cx="45" cy="-7"  r="5" fill="#1a3a6b" opacity="0.35" />
          {/* E seat */}
          <circle cx="97" cy="37" r="5" fill="#1a3a6b" opacity="0.35" />
          {/* S seat */}
          <circle cx="45" cy="82" r="5" fill="#1a3a6b" opacity="0.35" />
          {/* W seat */}
          <circle cx="-7" cy="37" r="5" fill="#1a3a6b" opacity="0.35" />
        </g>
      ))}
    </svg>
  )
}
