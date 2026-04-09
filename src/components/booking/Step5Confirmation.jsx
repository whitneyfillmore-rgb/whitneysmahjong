const DIR_LABELS = { N: 'North', E: 'East', S: 'South', W: 'West' }

export default function Step5Confirmation({ booking, onReset }) {
  const rows = [
    ['Booking Number', booking.bookingNumber],
    ['Date', booking.day],
    ['Session', booking.session],
    ['Table', `Table ${booking.tableNumber}`],
    ['Seats', booking.seats.map(s => DIR_LABELS[s] || s).join(', ')],
    ['Name', booking.name],
    ['Email', booking.email],
    ['Amount', booking.amountDue === 0 ? 'No charge (member)' : `$${booking.amountDue}.00`],
  ]

  return (
    <div className="max-w-lg mx-auto text-center">
      {/* Check circle */}
      <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-7">
        <span className="text-gold text-2xl">✓</span>
      </div>

      <h2 className="font-display text-navy text-4xl italic font-light mb-3">You're confirmed!</h2>
      <p className="font-body text-navy/55 text-sm mb-8">
        A confirmation will be sent to {booking.email}.
      </p>

      {/* Summary card */}
      <div className="bg-cream border border-mid-blue/30 p-7 text-left mb-8">
        {/* Booking number hero */}
        <div className="text-center border-b border-mid-blue/20 pb-5 mb-5">
          <p className="font-body text-navy/45 text-xs tracking-[0.2em] uppercase mb-2">Booking Number</p>
          <p className="font-display text-navy text-2xl font-light tracking-wide">{booking.bookingNumber}</p>
        </div>

        <div className="space-y-3">
          {rows.slice(1).map(([label, value]) => (
            <div key={label} className="flex justify-between font-body text-sm">
              <span className="text-navy/50">{label}</span>
              <span className="text-navy font-medium text-right max-w-xs">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="bg-navy text-cream font-body font-medium px-10 py-4 text-sm hover:bg-navy/80 transition-colors"
      >
        Book Another Table
      </button>
    </div>
  )
}
