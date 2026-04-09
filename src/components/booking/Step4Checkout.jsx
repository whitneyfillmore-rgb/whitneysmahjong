import { useState } from 'react'
import { validateMemberCode, createBooking } from '../../services/bookingService'

const DIR_LABELS = { N: 'North', E: 'East', S: 'South', W: 'West' }

export default function Step4Checkout({ booking, update, onBack, onComplete }) {
  const [codeInput, setCodeInput] = useState('')
  const [codeStatus, setCodeStatus] = useState(null) // null | 'checking' | 'valid' | 'invalid' | 'error'
  const [codeMsg, setCodeMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const dayOfWeek = booking.day ? new Date(booking.day + 'T12:00:00').getDay() : 0
  const isFree = booking.memberCodeValid
  const seatTotal = booking.seats.length * 15
  const total = isFree ? 0 : seatTotal

  async function applyCode() {
    if (!codeInput.trim()) return
    setCodeStatus('checking')
    setCodeMsg('')
    try {
      const result = await validateMemberCode(codeInput.trim(), dayOfWeek)
      if (result.valid) {
        setCodeStatus('valid')
        setCodeMsg('Member code applied — booking is free!')
        update({ memberCode: codeInput.trim().toUpperCase(), memberCodeValid: true, memberCodeTier: result.tier, amountDue: 0 })
      } else {
        setCodeStatus('invalid')
        setCodeMsg(result.reason)
        update({ memberCode: '', memberCodeValid: false, memberCodeTier: null, amountDue: seatTotal })
      }
    } catch {
      setCodeStatus('error')
      setCodeMsg('Unable to verify code. Please try again.')
    }
  }

  function removeCode() {
    setCodeInput('')
    setCodeStatus(null)
    setCodeMsg('')
    update({ memberCode: '', memberCodeValid: false, memberCodeTier: null, amountDue: seatTotal })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!booking.name.trim() || !booking.email.trim()) {
      setSubmitError('Please fill in your name and email.')
      return
    }
    setSubmitting(true)
    setSubmitError('')
    try {
      const result = await createBooking({ ...booking, amountDue: total })
      onComplete({ bookingNumber: result.bookingNumber, amountDue: total })
    } catch {
      setSubmitError('Unable to complete your booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">Checkout</h2>
      <p className="font-body text-navy/55 text-sm mb-8">Almost there — just a few more details.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Booking summary */}
        <div className="bg-cream border border-mid-blue/30 p-5 space-y-2.5 font-body text-sm">
          {[
            ['Date', booking.day],
            ['Session', booking.session],
            ['Table', `Table ${booking.tableNumber}`],
            ['Seats', booking.seats.map(s => DIR_LABELS[s]).join(', ')],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between">
              <span className="text-navy/50">{label}</span>
              <span className="text-navy">{val}</span>
            </div>
          ))}
          <div className="border-t border-mid-blue/25 pt-2.5 mt-1 flex justify-between font-semibold text-base">
            <span className="text-navy">Total</span>
            <span className="text-navy flex items-center gap-2">
              {isFree && (
                <span className="text-navy/35 line-through text-sm font-normal">${seatTotal}.00</span>
              )}
              <span className={isFree ? 'text-emerald-600' : ''}>${total}.00</span>
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">Name</label>
            <input
              type="text"
              value={booking.name}
              onChange={e => update({ name: e.target.value })}
              placeholder="Your full name"
              className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
            />
          </div>
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-1.5">Email</label>
            <input
              type="email"
              value={booking.email}
              onChange={e => update({ email: e.target.value })}
              placeholder="your@email.com"
              className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
            />
          </div>
        </div>

        {/* Member code */}
        <div>
          <label className="font-body text-navy font-medium text-sm block mb-1.5">
            Member Code
            <span className="text-navy/45 font-normal ml-1.5">(optional — waives the fee)</span>
          </label>

          {codeStatus === 'valid' ? (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-3.5">
              <span className="text-emerald-700 font-body text-sm flex-1">✓ {codeInput.toUpperCase()} applied</span>
              <button type="button" onClick={removeCode} className="font-body text-emerald-600 text-xs underline">
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                placeholder="e.g. FW-ABC12345"
                className="flex-1 border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy uppercase tracking-wider transition-colors"
              />
              <button
                type="button"
                onClick={applyCode}
                disabled={!codeInput.trim() || codeStatus === 'checking'}
                className="bg-navy text-cream font-body font-medium px-5 py-3.5 text-sm disabled:opacity-40 hover:bg-navy/80 transition-colors whitespace-nowrap"
              >
                {codeStatus === 'checking' ? '...' : 'Apply'}
              </button>
            </div>
          )}

          {codeStatus === 'invalid' && (
            <div className="mt-2 bg-amber-50 border border-amber-200 px-3.5 py-3">
              <p className="font-body text-amber-800 text-xs leading-relaxed">{codeMsg}</p>
            </div>
          )}
          {codeStatus === 'error' && (
            <p className="font-body text-red-600 text-xs mt-1.5">{codeMsg}</p>
          )}
        </div>

        {/* Payment fields (hidden when member code valid) */}
        {!isFree && (
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
        )}

        {submitError && (
          <p className="font-body text-red-600 text-sm">{submitError}</p>
        )}

        <div className="flex gap-4 pt-1">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-navy/40 text-navy font-body font-medium py-4 text-sm hover:bg-navy/5 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-50 hover:bg-navy/80 transition-colors"
          >
            {submitting
              ? 'Processing...'
              : isFree
              ? 'Confirm Booking (No Charge)'
              : `Pay $${total}.00`}
          </button>
        </div>
      </form>
    </div>
  )
}
