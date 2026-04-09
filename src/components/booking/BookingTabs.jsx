import { useState } from 'react'
import BookingFlow from './BookingFlow'
import MembershipFlow from '../membership/MembershipFlow'
import EventsFlow from '../events/EventsFlow'

const tabs = [
  { label: 'Book a Table' },
  { label: 'Membership' },
  { label: 'Events & Training' },
]

export default function BookingTabs({ initialTab = 0 }) {
  const [activeTab, setActiveTab] = useState(initialTab)

  return (
    <section className="bg-light-blue min-h-screen">
      {/* Tab bar */}
      <div className="bg-navy sticky top-0 z-20 shadow-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`flex-1 py-4 md:py-5 font-body text-xs md:text-sm font-medium tracking-wide transition-colors border-b-2 ${
                  activeTab === i
                    ? 'border-gold text-gold'
                    : 'border-transparent text-sky-blue/70 hover:text-sky-blue'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {activeTab === 0 && <BookingFlow />}
        {activeTab === 1 && <MembershipFlow />}
        {activeTab === 2 && <EventsFlow />}
      </div>
    </section>
  )
}
