import FadeIn from '../ui/FadeIn'

const days = [
  { name: 'Sun', sessions: [{ time: '3:00–5:00 PM', type: 'training', label: 'Training' }] },
  { name: 'Mon', sessions: [{ time: '2:00–4:00 PM', type: 'open' }, { time: '6:00–8:00 PM', type: 'open' }] },
  { name: 'Tue', sessions: [{ time: '2:00–4:00 PM', type: 'open' }, { time: '6:00–8:00 PM', type: 'open' }] },
  { name: 'Wed', sessions: [{ time: '2:00–4:00 PM', type: 'open' }, { time: '6:00–8:00 PM', type: 'open' }] },
  { name: 'Thu', sessions: [{ time: '2:00–4:00 PM', type: 'open' }, { time: '6:00–8:00 PM', type: 'open' }] },
  { name: 'Fri', sessions: [{ time: '2:00–4:00 PM', type: 'open' }, { time: '6:00–8:00 PM', type: 'open' }] },
  { name: 'Sat', sessions: [{ time: '10 AM–12 PM', type: 'event', label: 'Private Events' }] },
]

const typeStyles = {
  open:     'bg-sky-blue/10 border border-sky-blue/30 text-sky-blue',
  training: 'bg-gold/15 border border-gold/40 text-gold',
  event:    'bg-mid-blue/15 border border-mid-blue/35 text-sky-blue',
}

export default function Schedule() {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-4">Hours</p>
          <h2
            className="font-display text-cream font-light italic"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Weekly schedule
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {days.map(day => (
              <div key={day.name} className="flex flex-col items-center">
                <p className="font-body text-gold text-xs tracking-widest uppercase mb-3">{day.name}</p>
                <div className="w-full space-y-2">
                  {day.sessions.map(s => (
                    <div
                      key={s.time}
                      className={`p-2 font-body text-center ${typeStyles[s.type]}`}
                    >
                      <p className="text-xs leading-snug">{s.time}</p>
                      {s.label && (
                        <p className="text-xs opacity-65 mt-0.5">{s.label}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={150} className="flex flex-wrap gap-6 justify-center mt-8">
          {[
            { color: 'bg-sky-blue/20 border border-sky-blue/40', label: 'Open Play · $15/seat' },
            { color: 'bg-gold/20 border border-gold/40', label: 'Training · $100/person' },
            { color: 'bg-mid-blue/20 border border-mid-blue/40', label: 'Private Events · $500' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <span className={`w-3 h-3 inline-block ${l.color}`} />
              <span className="font-body text-sky-blue/70 text-xs">{l.label}</span>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}
