import FadeIn from '../ui/FadeIn'

const tiers = [
  {
    name: 'Drop-in',
    price: '$15',
    unit: 'per seat / session',
    description: 'Perfect for casual players. Book whenever you like, no commitment.',
    features: ['Any available session', 'All 7 days', 'No subscription required'],
    cta: 'Book a Seat',
    highlight: false,
  },
  {
    name: 'East Wind',
    price: '$49',
    unit: 'per month',
    description: 'Unlimited weekday play for the dedicated regular.',
    features: ['Unlimited Mon–Fri sessions', 'Member code — book for free', 'Priority seat selection'],
    cta: 'Join East Wind',
    highlight: true,
  },
  {
    name: 'Four Winds',
    price: '$69',
    unit: 'per month',
    description: 'Full access, every day. The complete Four Winds experience.',
    features: ['Unlimited all 7 days', 'Member code — book for free', 'Priority seat selection', 'Early event access'],
    cta: 'Join Four Winds',
    highlight: false,
  },
]

export default function Pricing({ onSignup }) {
  return (
    <section className="bg-navy py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-4">Membership</p>
          <h2
            className="font-display text-cream font-light italic"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            Find your wind
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 120}>
              <div
                className={`p-8 h-full flex flex-col ${
                  tier.highlight
                    ? 'bg-gold/10 border-2 border-gold'
                    : 'border border-sky-blue/25'
                }`}
              >
                {tier.highlight && (
                  <p className="font-body text-gold text-xs tracking-widest uppercase mb-3 -mt-1">Most Popular</p>
                )}
                <p className="font-body text-sky-blue/70 text-xs tracking-[0.2em] uppercase mb-3">{tier.name}</p>
                <div className="mb-5">
                  <span className="font-display text-cream font-light" style={{ fontSize: '3rem' }}>{tier.price}</span>
                  <span className="font-body text-sky-blue/60 text-sm ml-2">{tier.unit}</span>
                </div>
                <p className="font-body text-sky-blue/75 text-sm mb-6 leading-relaxed">{tier.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-3 font-body text-cream text-sm">
                      <span className="text-gold mt-0.5 flex-shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onSignup}
                  className={`font-body font-medium py-3 px-6 text-sm tracking-wide transition-colors ${
                    tier.highlight
                      ? 'bg-gold text-navy hover:bg-yellow-300'
                      : 'border border-sky-blue/50 text-sky-blue hover:bg-white/10'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
