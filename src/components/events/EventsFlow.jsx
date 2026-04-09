import { useState } from 'react'
import { createEventBooking } from '../../services/bookingService'

const EVENT_TYPES = {
  rental: {
    label: 'Event Space Rental',
    tag: 'Private Event',
    price: '$500',
    priceSub: 'Flat rate · Saturdays only',
    description:
      'Host your celebration, corporate event, or private party in our beautifully appointed space. Full venue exclusive access, food & drinks included.',
    features: ['Full venue exclusive access', 'Food & drinks included', 'Up to 40 guests', 'Saturdays only'],
    dateDayNum: 6, // Saturday
    dateDayLabel: 'Saturday',
    amount: () => 500,
  },
  training: {
    label: 'Mahjong Training',
    tag: 'Learn to Play',
    price: '$100',
    priceSub: 'Per person · Sundays 3–5 PM',
    description:
      'Two-hour sessions led by experienced instructors. Perfect for beginners and intermediate players in a relaxed, supportive setting.',
    features: ['Every Sunday, 3–5 PM', 'Small group setting', 'Beginner friendly', 'All materials provided'],
    dateDayNum: 0, // Sunday
    dateDayLabel: 'Sunday',
    amount: (qty) => qty * 100,
  },
}

function isValidDate(type, dateStr) {
  if (!dateStr) return false
  const day = new Date(dateStr + 'T12:00:00').getDay()
  return day === EVENT_TYPES[type].dateDayNum
}

function getMinDate() {
  return new Date().toISOString().split('T')[0]
}

export default function EventsFlow() {
  const [step, setStep] = useState('select') // 'select' | 'book' | 'confirmed'
  const [selectedType, setSelectedType] = useState(null)
  const [form, setForm] = useState({ date: '', quantity: 1, name: '', email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const eventDef = selectedType ? EVENT_TYPES[selectedType] : null
  const totalAmount = eventDef ? eventDef.amount(form.quantity) : 0

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Please fill in your name and email.')
      return
    }
    if (!isValidDate(selectedType, form.date)) {
      setError(`Please select a ${eventDef.dateDayLabel}.`)
      return
    }
    setLoading(true)
    setError('')
    try {
      const booking = await createEventBooking({
        type: selectedType,
        date: form.date,
        quantity: selectedType === 'training' ? form.quantity : 1,
        name: form.name,
        email: form.email,
        amountPaid: totalAmount,
      })
      setResult({ ...booking, amountPaid: totalAmount })
      setStep('confirmed')
    } catch {
      setError('Unable to process booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setStep('select')
    setSelectedType(null)
    setForm({ date: '', quantity: 1, name: '', email: '' })
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
          {selectedType === 'rental' ? 'Space Reserved!' : "You're signed up!"}
        </h2>
        <p className="font-body text-navy/55 text-sm mb-8">
          Confirmation sent to {form.email}.
        </p>

        <div className="bg-cream border border-mid-blue/30 p-7 text-left mb-8">
          <div className="text-center border-b border-mid-blue/20 pb-5 mb-5">
            <p className="font-body text-navy/45 text-xs tracking-[0.2em] uppercase mb-2">Booking Reference</p>
            <p className="font-display text-navy text-2xl font-light tracking-wide">{result?.bookingNumber}</p>
          </div>
          <div className="space-y-3">
            {[
              ['Type', eventDef?.label],
              ['Date', form.date],
              selectedType === 'training' ? ['Participants', form.quantity] : null,
              ['Session', selectedType === 'training' ? '3:00–5:00 PM' : 'Full day'],
              ['Total', `$${result?.amountPaid}.00`],
            ].filter(Boolean).map(([label, value]) => (
              <div key={label} className="flex justify-between font-body text-sm">
                <span className="text-navy/50">{label}</span>
                <span className="text-navy font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={reset}
          className="bg-navy text-cream font-body font-medium px-10 py-4 text-sm hover:bg-navy/80 transition-colors"
        >
          Book Another
        </button>
      </div>
    )
  }

  // ── Booking form ───────────────────────────────────────────────
  if (step === 'book') {
    return (
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setStep('select')}
          className="font-body text-navy/45 text-sm mb-7 flex items-center gap-1.5 hover:text-navy transition-colors"
        >
          ← Back
        </button>

        <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
          {eventDef.label}
        </h2>
        <p className="font-body text-navy/55 text-sm mb-8">{eventDef.priceSub}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">
              {eventDef.dateDayLabel} Date
            </label>
            <input
              type="date"
              min={getMinDate()}
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
            />
            {form.date && !isValidDate(selectedType, form.date) && (
              <p className="font-body text-amber-700 text-xs mt-1.5">
                Please select a {eventDef.dateDayLabel}.
              </p>
            )}
          </div>

          {/* Quantity — training only */}
          {selectedType === 'training' && (
            <div>
              <label className="font-body text-navy font-medium text-sm block mb-2">Number of Participants</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, quantity: Math.max(1, f.quantity - 1) }))}
                  className="w-11 h-11 border border-mid-blue/40 text-navy font-body text-xl hover:bg-navy/5 transition-colors"
                >
                  −
                </button>
                <span className="font-display text-navy text-2xl font-light w-8 text-center">{form.quantity}</span>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, quantity: f.quantity + 1 }))}
                  className="w-11 h-11 border border-mid-blue/40 text-navy font-body text-xl hover:bg-navy/5 transition-colors"
                >
                  +
                </button>
                <span className="font-body text-navy/50 text-sm ml-1">
                  × $100 = <strong className="text-navy">${totalAmount}</strong>
                </span>
              </div>
            </div>
          )}

          {/* Rental summary */}
          {selectedType === 'rental' && (
            <div className="bg-cream border border-mid-blue/30 p-4 font-body text-sm flex justify-between">
              <span className="text-navy/55">Total</span>
              <span className="text-navy font-semibold">$500.00</span>
            </div>
          )}

          {/* Contact */}
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">Name</label>
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

          {/* Payment */}
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
            {loading ? 'Processing...' : `Pay $${totalAmount}.00`}
          </button>
        </form>
      </div>
    )
  }

  // ── Event type selection ───────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
        Events &amp; Training
      </h2>
      <p className="font-body text-navy/55 text-sm mb-8">
        Book the venue for a private event or sign up for a Sunday training session.
      </p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {Object.entries(EVENT_TYPES).map(([key, def]) => (
          <div
            key={key}
            onClick={() => setSelectedType(key)}
            className={`p-7 border-2 cursor-pointer transition-all ${
              selectedType === key
                ? 'border-navy bg-navy/5'
                : 'border-mid-blue/35 bg-white hover:border-navy/40'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <p className="font-body text-gold text-xs tracking-[0.2em] uppercase">{def.tag}</p>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedType === key ? 'border-navy bg-navy' : 'border-mid-blue/45'
                }`}
              >
                {selectedType === key && <div className="w-2 h-2 rounded-full bg-cream" />}
              </div>
            </div>
            <h3 className="font-display text-navy font-light italic text-2xl mb-3">{def.label}</h3>
            <p className="font-display text-navy font-light text-3xl mb-1">{def.price}</p>
            <p className="font-body text-navy/45 text-xs mb-5">{def.priceSub}</p>
            <p className="font-body text-navy/65 text-sm leading-relaxed mb-5">{def.description}</p>
            <ul className="space-y-2">
              {def.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 font-body text-navy/70 text-sm">
                  <span className="text-gold flex-shrink-0">✦</span>{f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button
        onClick={() => selectedType && setStep('book')}
        disabled={!selectedType}
        className="w-full bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-35 hover:bg-navy/80 transition-colors"
      >
        Continue
      </button>
    </div>
  )
}
