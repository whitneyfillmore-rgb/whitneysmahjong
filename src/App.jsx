import { useRef, useState } from 'react'
import Hero from './components/landing/Hero'
import StatsStrip from './components/landing/StatsStrip'
import TheSpace from './components/landing/TheSpace'
import Pricing from './components/landing/Pricing'
import EventsSection from './components/landing/EventsSection'
import Schedule from './components/landing/Schedule'
import CallToAction from './components/landing/CallToAction'
import Footer from './components/landing/Footer'
import BookingTabs from './components/booking/BookingTabs'

export default function App() {
  const appRef = useRef(null)
  const [requestedTab, setRequestedTab] = useState(0)
  const [tabKey, setTabKey] = useState(0)

  function scrollToApp(tab = 0) {
    setRequestedTab(tab)
    setTabKey(k => k + 1)
    setTimeout(() => {
      appRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="font-body">
      <Hero onBookTable={() => scrollToApp(0)} onViewMemberships={() => scrollToApp(1)} />
      <StatsStrip />
      <TheSpace />
      <Pricing onSignup={() => scrollToApp(1)} />
      <EventsSection onBook={() => scrollToApp(2)} />
      <Schedule />
      <CallToAction onBookNow={() => scrollToApp(0)} />
      <div ref={appRef} id="booking-app">
        <BookingTabs key={tabKey} initialTab={requestedTab} />
      </div>
      <Footer />
    </div>
  )
}
