import { useState } from 'react'
import { createMember } from '../../services/bookingService'

const tiers = [
  {
    key: 'east',
    name: 'East Wind',
    price: '$49',
    period: '/month',
    description: 'Unlimited Monday–Friday sessions',
    features: ['Mon–Fri unlimited play', 'Member code — book for free', 'Priority seat selection'],
    highlight: false,
  },
  {
    key: 'four',
    name: 'Four Winds',
    price: '$69',
    period: '/month',
    description: 'Unlimited all 7 days — the full experience',
    features: ['All 7 days unlimited play', 'Member code — book for free', 'Priority seat selection', 'Early event access'],
    highlight: true,
  },
]

export default function MembershipFlow() {
  const [step, setStep] = useState('select') // 'select' | 'signup' | 'confirmed'
  const [selectedTier, setSelectedTier] = useState(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const tier = tiers.find(t => t.key === selectedTier)

  async function handleSignup(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in your name and email.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const member = await createMember({ name: form.name, email: form.email, plan: selectedTier })
      setResult(member)
      setStep('confirmed')
    } catch {
      setError('Unable to create membership. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep('select')
    setSelectedTier(null)
    setForm({ name: '', email: '' })
    setResult(null)
    setError('')
  }

  // ── Confirmed ──────────────────────────────────────────────────
  if (step === 'confirmed') {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-7">
          <span className="text-gold text-2xl">✓</span>
        </div>
        <h2 className="font-display text-navy text-4xl italic font-light mb-3">
          Welcome to {tier?.name}!
        </h2>
        <p className="font-body text-navy/55 text-sm mb-8">
          Your membership is active. Here is your unique member code.
        </p>

        {/* Member code highlight */}
        <div className="bg-navy p-8 mb-8">
          <p className="font-body text-sky-blue/70 text-xs tracking-[0.25em] uppercase mb-3">Your Member Code</p>
          <p className="font-display text-cream font-light tracking-widest" style={{ fontSize: '2rem' }}>
            {result?.memberCode}
          </p>
          <p className="font-body text-sky-blue/55 text-xs mt-3 leading-relaxed">
            Save this code. Use it when booking a table to waive the per-seat fee.
          </p>
        </div>

        {/* Membership details */}
        <div className="bg-cream border border-mid-blue/30 p-6 text-left space-y-3 mb-8">
          {[
            ['Name', result?.name],
            ['Email', result?.email],
            ['Plan', tier?.name],
            ['Valid', selectedTier === 'east' ? 'Monday–Friday' : 'All 7 days'],
            ['Next billing', result?.next_billing_date
              ? new Date(result.next_billing_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
              : '—'],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between font-body text-sm">
              <span className="text-navy/50">{label}</span>
              <span className="text-navy font-medium">{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={reset}
          className="border border-navy/40 text-navy font-body font-medium px-10 py-4 text-sm hover:bg-navy/5 transition-colors"
        >
          Done
        </button>
      </div>
    )
  }

  // ── Signup form ────────────────────────────────────────────────
  if (step === 'signup') {
    return (
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setStep('select')}
          className="font-body text-navy/45 text-sm mb-7 flex items-center gap-1.5 hover:text-navy transition-colors"
        >
          ← Back
        </button>

        <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
          Join {tier?.name}
        </h2>
        <p className="font-body text-navy/55 text-sm mb-8">
          {tier?.price}/month · {tier?.description}
        </p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your name"
              className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="your@email.com"
              className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
            />
          </div>

          <div>
            <label className="font-body text-navy font-medium text-sm block mb-2">Payment</label>
            <div className="border border-mid-blue/40 bg-white px-4 py-4 space-y-3.5">
              <input
                type="text"
                placeholder="Card number"
                className="w-full font-body text-navy text-sm focus:outline-none placeholder:text-navy/35"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="flex-1 font-body text-navy text-sm focus:outline-none placeholder:text-navy/35"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-20 font-body text-navy text-sm focus:outline-none placeholder:text-navy/35"
                />
              </div>
            </div>
            <p className="font-body text-navy/35 text-xs mt-1.5">Payments processed securely via Stripe</p>
          </div>

          {error && <p className="font-body text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-50 hover:bg-navy/80 transition-colors"
          >
            {loading ? 'Processing...' : `Join ${tier?.name} — ${tier?.price}/mo`}
          </button>
        </form>
      </div>
    )
  }

  // ── Tier selection ─────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
        Choose your membership
      </h2>
      <p className="font-body text-navy/55 text-sm mb-8">
        Unlimited play with a monthly membership. Your member code waives per-seat fees at checkout.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-7">
        {tiers.map(t => (
          <div
            key={t.key}
            onClick={() => setSelectedTier(t.key)}
            className={`p-7 border-2 cursor-pointer transition-all ${
              selectedTier === t.key
                ? 'border-navy bg-navy/5'
                : t.highlight
                ? 'border-gold/45 bg-gold/5'
                : 'border-mid-blue/35 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-5">
              <div>
                {t.highlight && (
                  <p className="font-body text-gold text-xs tracking-widest uppercase mb-1.5">Most Popular</p>
                )}
                <p className="font-body text-navy/60 text-xs tracking-[0.2em] uppercase mb-1">{t.name}</p>
                <p className="font-display text-navy font-light" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
                  {t.price}
                  <span className="font-body text-navy/45 text-sm">{t.period}</span>
                </p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                  selectedTier === t.key ? 'border-navy bg-navy' : 'border-mid-blue/45'
                }`}
              >
                {selectedTier === t.key && <div className="w-2 h-2 rounded-full bg-cream" />}
              </div>
            </div>
            <p className="font-body text-navy/60 text-sm mb-4">{t.description}</p>
            <ul className="space-y-2">
              {t.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 font-body text-navy/75 text-sm">
                  <span className="text-gold flex-shrink-0">✦</span>{f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Drop-in note */}
      <div className="border border-mid-blue/30 bg-cream p-5 mb-7">
        <p className="font-body text-navy/60 text-sm">
          <strong className="text-navy">Just visiting?</strong> No membership needed —
          book a seat for $15/session on the Book a Table tab. No strings attached.
        </p>
      </div>

      <button
        onClick={() => selectedTier && setStep('signup')}
        disabled={!selectedTier}
        className="w-full bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-35 hover:bg-navy/80 transition-colors"
      >
        Continue to Signup
      </button>
    </div>
  )
}
