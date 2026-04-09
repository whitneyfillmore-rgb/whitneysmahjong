import { useState } from 'react'
import Step1DateTime from './Step1DateTime'
import Step2TableMap from './Step2TableMap'
import Step3Seats from './Step3Seats'
import Step4Checkout from './Step4Checkout'
import Step5Confirmation from './Step5Confirmation'

const STEP_LABELS = ['Date & Time', 'Choose Table', 'Select Seats', 'Checkout']

const EMPTY_BOOKING = {
  day: null,
  session: null,
  tableNumber: null,
  seats: [],
  takenSeats: [],
  name: '',
  email: '',
  memberCode: '',
  memberCodeValid: false,
  memberCodeTier: null,
  amountDue: 0,
  bookingNumber: null,
}

export default function BookingFlow() {
  const [step, setStep] = useState(1)
  const [booking, setBooking] = useState(EMPTY_BOOKING)

  function update(fields) {
    setBooking(prev => ({ ...prev, ...fields }))
  }

  function reset() {
    setBooking(EMPTY_BOOKING)
    setStep(1)
  }

  const stepProps = {
    booking,
    update,
    onNext: () => setStep(s => s + 1),
    onBack: () => setStep(s => s - 1),
  }

  return (
    <div>
      {/* Progress indicator — shown for steps 1–4 */}
      {step < 5 && (
        <div className="flex items-center justify-center mb-10">
          {STEP_LABELS.map((label, i) => {
            const num = i + 1
            const done = num < step
            const active = num === step
            return (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-semibold border-2 transition-colors ${
                      done
                        ? 'bg-gold border-gold text-navy'
                        : active
                        ? 'bg-navy border-navy text-cream'
                        : 'border-mid-blue/40 text-mid-blue/60 bg-transparent'
                    }`}
                  >
                    {done ? '✓' : num}
                  </div>
                  <span className="font-body text-xs mt-1.5 hidden sm:block text-navy/50">{label}</span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={`w-10 md:w-20 h-px mx-2 mb-4 transition-colors ${
                      done ? 'bg-gold' : 'bg-mid-blue/30'
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      )}

      {step === 1 && <Step1DateTime {...stepProps} />}
      {step === 2 && <Step2TableMap {...stepProps} />}
      {step === 3 && <Step3Seats {...stepProps} />}
      {step === 4 && (
        <Step4Checkout
          {...stepProps}
          onComplete={fields => {
            update(fields)
            setStep(5)
          }}
        />
      )}
      {step === 5 && <Step5Confirmation booking={booking} onReset={reset} />}
    </div>
  )
}
