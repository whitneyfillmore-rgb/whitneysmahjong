import { useEffect, useState } from 'react'

const TILE_CHARS = ['🀇','🀈','🀉','🀊','🀋','🀌','🀍','🀎','🀏','🀙','🀚','🀛','🀜','🀝','🀞','🀟','🀠','🀡','🀐','🀑','🀒']
const FLOAT_CLASSES = ['tile-float-1', 'tile-float-2', 'tile-float-3']

const tiles = TILE_CHARS.map((char, i) => ({
  char,
  left: `${(i * 4.8 + 2) % 96}%`,
  top: `${(i * 7.1 + 5) % 88}%`,
  size: `${1.8 + (i % 3) * 0.7}rem`,
  opacity: 0.06 + (i % 4) * 0.025,
  floatClass: FLOAT_CLASSES[i % 3],
  delay: `${i * 0.28}s`,
}))

export default function Hero({ onBookTable, onViewMemberships }) {
  const [ready, setReady] = useState(false)
  useEffect(() => { setTimeout(() => setReady(true), 100) }, [])

  return (
    <section className="relative min-h-screen bg-navy flex flex-col items-center justify-center overflow-hidden">
      {/* Floating tiles */}
      {tiles.map((t, i) => (
        <span
          key={i}
          className={`absolute select-none pointer-events-none ${t.floatClass}`}
          style={{
            left: t.left,
            top: t.top,
            fontSize: t.size,
            opacity: t.opacity,
            animationDelay: t.delay,
          }}
        >
          {t.char}
        </span>
      ))}

      {/* Content */}
      <div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 1s ease 200ms, transform 1s ease 200ms',
        }}
      >
        <p className="font-body text-sky-blue text-xs tracking-[0.35em] uppercase mb-5">
          Est. 2024 · Chicago
        </p>

        <h1 className="font-display text-cream font-light italic mb-1" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', lineHeight: 1.05 }}>
          four winds
        </h1>

        <p className="font-display text-gold text-xl md:text-2xl font-normal tracking-wide mb-7">
          Mahjong Club &amp; Event Space
        </p>

        <p className="font-body text-sky-blue/90 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed mb-10">
          Reserve your seat, gather your winds, and play in a space designed for the love of the game.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookTable}
            className="bg-gold text-navy font-body font-semibold px-9 py-4 text-sm tracking-wide hover:bg-yellow-300 transition-colors"
          >
            Book a Table
          </button>
          <button
            onClick={onViewMemberships}
            className="border border-sky-blue/60 text-sky-blue font-body font-medium px-9 py-4 text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            View Memberships
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          opacity: ready ? 0.4 : 0,
          transition: 'opacity 1s ease 1.2s',
        }}
      >
        <div className="w-px h-10 bg-sky-blue/50 mx-auto mb-2" />
        <p className="font-body text-sky-blue/60 text-xs tracking-widest uppercase">scroll</p>
      </div>
    </section>
  )
}
