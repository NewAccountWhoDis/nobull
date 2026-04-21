import type { Metadata } from 'next'
import { BookingForm } from '@/components/ui/BookingForm'

export const metadata: Metadata = {
  title: 'Book No Bull Line Dancers | Event Inquiry',
  description:
    'Hire No Bull Line Dancers for your wedding, party, corporate event, or bar night in the Ardisanback, NY area.',
}

const TRUST = [
  ['24hr',      'Response Time'],
  ['Mobile',    'We Come To You'],
  ['Any Crowd', 'All Skill Levels'],
]

export default function BookPage() {
  return (
    <div className="min-h-screen bg-espresso">
      {/* Hidden form so Netlify detects the form at build time */}
      <form name="booking" data-netlify="true" hidden>
        <input type="text" name="name" />
        <input type="tel" name="phone" />
        <input type="email" name="email" />
        <input type="date" name="eventDate" />
        <input type="text" name="eventType" />
        <input type="text" name="eventLocation" />
        <input type="text" name="guestCount" />
        <textarea name="notes" />
      </form>
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">
          Let's Make It Happen
        </p>
        <h1 className="font-serif font-black text-gold text-5xl leading-tight mb-4">
          Book No Bull<br />For Your Event
        </h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          Fill out the form below and we'll get back to you within 24 hours
          with availability and pricing.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <BookingForm />
      </div>

      <div className="bg-oak border-t border-saddle py-8 px-6">
        <div className="max-w-2xl mx-auto flex justify-center gap-12">
          {TRUST.map(([title, sub]) => (
            <div key={title} className="text-center">
              <div className="font-serif font-black text-gold text-xl">{title}</div>
              <div className="font-sans text-leather text-xs tracking-wide">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
