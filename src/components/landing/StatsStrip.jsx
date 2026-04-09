import FadeIn from '../ui/FadeIn'

const stats = [
  { value: '10', label: 'Tables' },
  { value: '4', label: 'Seats per Table' },
  { value: '6', label: 'Days a Week' },
  { value: '$15', label: 'Per Seat' },
]

export default function StatsStrip() {
  return (
    <section className="bg-mid-blue py-14">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 100} className="text-center">
            <p className="font-display text-cream font-light" style={{ fontSize: '3.25rem', lineHeight: 1.1 }}>
              {s.value}
            </p>
            <p className="font-body text-navy text-xs tracking-[0.18em] uppercase mt-2">{s.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
