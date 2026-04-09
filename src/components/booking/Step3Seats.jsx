const DIR_LABELS = { N: 'North', E: 'East', S: 'South', W: 'West' }
const DIRS = ['N', 'E', 'S', 'W']

const SEAT_POSITIONS = {
  N: { top: 0,    left: '50%',  transform: 'translate(-50%, -50%)' },
  E: { top: '50%', right: 0,    transform: 'translate(50%, -50%)' },
  S: { bottom: 0,  left: '50%', transform: 'translate(-50%, 50%)' },
  W: { top: '50%', left: 0,     transform: 'translate(-50%, -50%)' },
}

export default function Step3Seats({ booking, update, onNext, onBack }) {
  const takenSeats = booking.takenSeats || []

  function toggleSeat(dir) {
    if (takenSeats.includes(dir)) return
    const seats = booking.seats.includes(dir)
      ? booking.seats.filter(s => s !== dir)
      : [...booking.seats, dir]
    update({ seats, amountDue: seats.length * 15 })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
        Select your seats
      </h2>
      <p className="font-body text-navy/55 text-sm mb-8">
        Table {booking.tableNumber} · {booking.session} · $15 per seat
      </p>

      {/* Visual table */}
      <div className="bg-cream border border-mid-blue/30 p-8 mb-6 flex justify-center">
        <div className="relative" style={{ width: 160, height: 160 }}>
          {/* Table top */}
          <div
            className="absolute bg-light-blue border-2 border-mid-blue/60 rounded flex items-center justify-center"
            style={{ inset: 28 }}
          >
            <span className="font-body text-navy/50 text-xs font-medium">T{booking.tableNumber}</span>
          </div>

          {/* Seat buttons */}
          {DIRS.map(dir => {
            const taken = takenSeats.includes(dir)
            const selected = booking.seats.includes(dir)
            const pos = SEAT_POSITIONS[dir]

            return (
              <button
                key={dir}
                onClick={() => toggleSeat(dir)}
                disabled={taken}
                className={`absolute w-11 h-11 rounded-full flex items-center justify-center font-body text-xs font-semibold border-2 transition-all ${
                  taken
                    ? 'bg-navy/10 border-navy/15 text-navy/25 cursor-not-allowed'
                    : selected
                    ? 'bg-navy border-navy text-cream shadow-sm'
                    : 'bg-white border-mid-blue/60 text-navy hover:border-navy'
                }`}
                style={pos}
                title={DIR_LABELS[dir]}
              >
                {dir}
              </button>
            )
          })}
        </div>
      </div>

      {/* Seat list */}
      <div className="space-y-2 mb-6">
        {DIRS.map(dir => {
          const taken = takenSeats.includes(dir)
          const selected = booking.seats.includes(dir)
          return (
            <button
              key={dir}
              onClick={() => toggleSeat(dir)}
              disabled={taken}
              className={`w-full flex items-center justify-between px-4 py-3.5 border font-body text-sm transition-colors ${
                taken
                  ? 'border-mid-blue/20 bg-light-blue/30 text-navy/30 cursor-not-allowed'
                  : selected
                  ? 'border-navy bg-navy/5 text-navy'
                  : 'border-mid-blue/35 bg-white text-navy hover:border-navy/60 cursor-pointer'
              }`}
            >
              <span>{DIR_LABELS[dir]}</span>
              <span className={taken ? 'text-navy/25' : selected ? 'text-navy font-medium' : 'text-navy/40'}>
                {taken ? 'Taken' : selected ? '$15.00' : 'Available'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Total */}
      {booking.seats.length > 0 && (
        <div className="bg-navy/5 border border-navy/15 px-4 py-3.5 mb-6 flex justify-between font-body">
          <span className="text-navy/65 text-sm">
            {booking.seats.length} seat{booking.seats.length > 1 ? 's' : ''} selected
          </span>
          <span className="font-semibold text-navy text-sm">${booking.seats.length * 15}.00</span>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 border border-navy/40 text-navy font-body font-medium py-4 text-sm hover:bg-navy/5 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={booking.seats.length === 0}
          className="flex-1 bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-35 hover:bg-navy/80 transition-colors"
        >
          Continue — Checkout
        </button>
      </div>
    </div>
  )
}
