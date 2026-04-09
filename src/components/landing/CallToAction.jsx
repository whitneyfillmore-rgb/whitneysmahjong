import FadeIn from '../ui/FadeIn'

export default function CallToAction({ onBookNow }) {
  return (
    <section className="bg-cream py-28">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="font-body text-gold text-xs tracking-[0.25em] uppercase mb-6">Ready to play?</p>
          <h2
            className="font-display text-navy font-light italic mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 5rem)', lineHeight: 1.1 }}
          >
            Your table<br />is waiting
          </h2>
          <p className="font-body text-navy/60 text-base leading-relaxed mb-10">
            Reserve your seat today and join the Four Winds community.
          </p>
          <button
            onClick={onBookNow}
            className="bg-navy text-cream font-body font-semibold px-14 py-5 text-sm tracking-wide hover:bg-navy/80 transition-colors"
          >
            Book Now
          </button>
        </FadeIn>
      </div>
    </section>
  )
}
