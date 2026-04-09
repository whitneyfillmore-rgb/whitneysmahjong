export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <p className="font-display text-cream text-2xl font-light italic mb-1">four winds</p>
            <p className="font-body text-sky-blue/70 text-xs tracking-wide">Mahjong Club &amp; Event Space</p>
            <p className="font-body text-sky-blue/40 text-xs mt-4 leading-relaxed">
              Chicago, IL<br />
              Open 6 days a week
            </p>
          </div>

          <div>
            <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-4">Play</p>
            <ul className="space-y-2.5 font-body text-sky-blue/65 text-sm">
              <li>Book a Table</li>
              <li>Memberships</li>
              <li>Weekly Schedule</li>
            </ul>
          </div>

          <div>
            <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-4">Events</p>
            <ul className="space-y-2.5 font-body text-sky-blue/65 text-sm">
              <li>Event Space Rental</li>
              <li>Mahjong Training</li>
            </ul>
          </div>

          <div>
            <p className="font-body text-gold text-xs tracking-[0.2em] uppercase mb-4">Contact</p>
            <ul className="space-y-2.5 font-body text-sky-blue/65 text-sm">
              <li>hello@fourwindsmahjong.com</li>
              <li className="text-sky-blue/40">Instagram</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-blue/15 pt-6">
          <p className="font-body text-sky-blue/35 text-xs text-center">
            © 2024 Four Winds Mahjong Club &amp; Event Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
