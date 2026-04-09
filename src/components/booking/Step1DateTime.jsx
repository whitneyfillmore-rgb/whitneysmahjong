function getSessionsForDay(dateStr) {
  if (!dateStr) return []
  const day = new Date(dateStr + 'T12:00:00').getDay() // 0=Sun, 6=Sat
  if (day === 0) return ['3:00–5:00 PM']
  if (day === 6) return ['10:00 AM–12:00 PM']
  return ['2:00–4:00 PM', '6:00–8:00 PM']
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function formatDayLabel(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export default function Step1DateTime({ booking, update, onNext }) {
  const sessions = getSessionsForDay(booking.day)
  const canProceed = booking.day && booking.session

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
        When would you like to play?
      </h2>
      <p className="font-body text-navy/55 text-sm mb-8">Select a date and session time to check availability.</p>

      <div className="space-y-7">
        {/* Date picker */}
        <div>
          <label className="font-body text-navy font-medium text-sm block mb-2">Date</label>
          <input
            type="date"
            min={getTodayStr()}
            value={booking.day || ''}
            onChange={e => update({ day: e.target.value, session: null })}
            className="w-full border border-mid-blue/40 bg-white px-4 py-3.5 font-body text-navy text-sm focus:outline-none focus:border-navy transition-colors"
          />
          {booking.day && (
            <p className="font-body text-navy/50 text-xs mt-1.5">{formatDayLabel(booking.day)}</p>
          )}
        </div>

        {/* Session picker */}
        {booking.day && (
          <div>
            <label className="font-body text-navy font-medium text-sm block mb-3">Session</label>
            <div className="space-y-3">
              {sessions.map(s => (
                <button
                  key={s}
                  onClick={() => update({ session: s })}
                  className={`w-full text-left px-5 py-4 border font-body transition-colors ${
                    booking.session === s
                      ? 'border-navy bg-navy text-cream'
                      : 'border-mid-blue/40 bg-white text-navy hover:border-navy/60'
                  }`}
                >
                  <span className="font-medium text-sm">{s}</span>
                  <span className={`text-xs ml-3 ${booking.session === s ? 'text-sky-blue/80' : 'text-navy/45'}`}>
                    2 hours · $15 per seat
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed}
        className="mt-8 w-full bg-navy text-cream font-body font-medium py-4 text-sm tracking-wide disabled:opacity-35 hover:bg-navy/80 transition-colors"
      >
        Continue — Choose a Table
      </button>
    </div>
  )
}
