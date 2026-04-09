import FadeIn from '../ui/FadeIn'

export default function EventsSection({ onBook }) {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-4">Events &amp; Training</p>
          <h2
            className="font-display text-navy font-light italic"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)' }}
          >
            More than a game
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="bg-light-blue p-10 h-full flex flex-col">
              <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-4">Private Event</p>
              <h3 className="font-display text-navy font-light italic text-3xl mb-4">Event Space Rental</h3>
              <p className="font-display text-navy font-light text-4xl mb-1">$500</p>
              <p className="font-body text-navy/55 text-sm mb-7">Flat rate · Saturdays only · Full venue</p>
              <p className="font-body text-navy/75 leading-relaxed mb-8 flex-1">
                Host your celebration, corporate event, or private party in our beautifully appointed space.
                Includes exclusive venue access, food &amp; drinks for your guests.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Full venue exclusive access',
                  'Food &amp; drinks included',
                  'Saturdays only',
                  'Up to 40 guests',
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 font-body text-navy/80 text-sm">
                    <span className="text-gold flex-shrink-0">✦</span>
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
              <button
                onClick={onBook}
                className="bg-navy text-cream font-body font-medium px-7 py-3.5 text-sm hover:bg-navy/80 transition-colors self-start"
              >
                Book the Space
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="border-2 border-sky-blue/40 bg-white p-10 h-full flex flex-col">
              <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-4">Learn to Play</p>
              <h3 className="font-display text-navy font-light italic text-3xl mb-4">Mahjong Training</h3>
              <p className="font-display text-navy font-light text-4xl mb-1">$100</p>
              <p className="font-body text-navy/55 text-sm mb-7">Per person · Sundays 3–5 PM</p>
              <p className="font-body text-navy/75 leading-relaxed mb-8 flex-1">
                Our two-hour training sessions are perfect for beginners and those looking to sharpen
                their skills. Led by experienced instructors in a relaxed, supportive setting.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Every Sunday, 3–5 PM',
                  'Small group setting',
                  'Beginner friendly',
                  'All materials provided',
                ].map(f => (
                  <li key={f} className="flex items-center gap-3 font-body text-navy/80 text-sm">
                    <span className="text-gold flex-shrink-0">✦</span>{f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onBook}
                className="bg-navy text-cream font-body font-medium px-7 py-3.5 text-sm hover:bg-navy/80 transition-colors self-start"
              >
                Sign Up for Training
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
