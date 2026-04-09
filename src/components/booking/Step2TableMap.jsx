import { useEffect, useState } from 'react'
import { getBookedSeats } from '../../services/bookingService'

const DIRS = ['N', 'E', 'S', 'W']

// 10 tables: 3 columns, last table centered in middle column
const TABLE_GRID_COL = [1, 2, 3, 1, 2, 3, 1, 2, 3, 2]

export default function Step2TableMap({ booking, update, onNext, onBack }) {
  const [bookedData, setBookedData] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setLoadError(false)
      try {
        const data = await getBookedSeats(booking.day, booking.session)
        if (!cancelled) setBookedData(data)
      } catch {
        if (!cancelled) setLoadError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [booking.day, booking.session])

  // Build map: tableNumber -> taken seat array
  const takenByTable = {}
  for (const b of bookedData) {
    const existing = takenByTable[b.table_number] || []
    takenByTable[b.table_number] = [...existing, ...(b.seats || [])]
  }

  function availableCount(tableNum) {
    return 4 - (takenByTable[tableNum]?.length || 0)
  }

  function selectTable(tableNum) {
    const taken = takenByTable[tableNum] || []
    update({ tableNumber: tableNum, seats: [], takenSeats: taken })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="font-display text-navy text-3xl md:text-4xl italic font-light mb-2">
        Choose a table
      </h2>
      <p className="font-body text-navy/55 text-sm mb-8">
        {booking.day} · {booking.session} — click an available table to select it.
      </p>

      {loading ? (
        <div className="bg-cream border border-mid-blue/30 py-20 text-center">
          <p className="font-body text-navy/45 text-sm">Checking availability...</p>
        </div>
      ) : loadError ? (
        <div className="bg-cream border border-mid-blue/30 py-20 text-center">
          <p className="font-body text-navy/60 text-sm">Could not load seat data. You can still select a table.</p>
        </div>
      ) : (
        <div className="bg-cream border border-mid-blue/30 p-6 md:p-8">
          {/* 3-column grid, last table in col 2 */}
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
          >
            {Array.from({ length: 10 }, (_, i) => {
              const tableNum = i + 1
              const taken = takenByTable[tableNum] || []
              const avail = availableCount(tableNum)
              const isFull = avail === 0
              const isSelected = booking.tableNumber === tableNum
              const gridCol = TABLE_GRID_COL[i]

              return (
                <button
                  key={tableNum}
                  onClick={() => !isFull && selectTable(tableNum)}
                  disabled={isFull}
                  style={{ gridColumn: gridCol }}
                  className={`relative p-4 border-2 transition-all flex flex-col items-center gap-2 ${
                    isSelected
                      ? 'border-navy bg-navy text-cream'
                      : isFull
                      ? 'border-mid-blue/20 bg-mid-blue/5 opacity-40 cursor-not-allowed'
                      : 'border-mid-blue/40 bg-white text-navy hover:border-navy cursor-pointer'
                  }`}
                >
                  <span className="font-body font-semibold text-xs tracking-wide">Table {tableNum}</span>

                  {/* 4 seat dots arranged N/E/S/W */}
                  <div className="relative w-8 h-8 my-1">
                    {DIRS.map(dir => {
                      const isTaken = taken.includes(dir)
                      const pos = {
                        N: 'top-0 left-1/2 -translate-x-1/2',
                        E: 'right-0 top-1/2 -translate-y-1/2',
                        S: 'bottom-0 left-1/2 -translate-x-1/2',
                        W: 'left-0 top-1/2 -translate-y-1/2',
                      }[dir]
                      return (
                        <div
                          key={dir}
                          className={`absolute w-2.5 h-2.5 rounded-full ${pos} ${
                            isTaken
                              ? isSelected ? 'bg-sky-blue/30' : 'bg-navy/25'
                              : isSelected ? 'bg-sky-blue' : 'bg-mid-blue'
                          }`}
                        />
                      )
                    })}
                  </div>

                  <span className={`font-body text-xs ${
                    isFull ? 'text-navy/35' : isSelected ? 'text-sky-blue/80' : 'text-navy/50'
                  }`}>
                    {isFull ? 'Full' : `${avail} open`}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-5 justify-center mt-6">
            {[
              { dot: 'bg-mid-blue', label: 'Available' },
              { dot: 'bg-navy/25', label: 'Taken' },
              { dot: 'bg-sky-blue', label: 'Your selection' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${l.dot}`} />
                <span className="font-body text-xs text-navy/55">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 border border-navy/40 text-navy font-body font-medium py-4 text-sm hover:bg-navy/5 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!booking.tableNumber}
          className="flex-1 bg-navy text-cream font-body font-medium py-4 text-sm disabled:opacity-35 hover:bg-navy/80 transition-colors"
        >
          Continue — Select Seats
        </button>
      </div>
    </div>
  )
}
