import type { Metadata } from 'next'
import { BookingForm } from '@/components/ui/BookingForm'

export const metadata: Metadata = {
  title: 'Book No Bull Line Dancers | Event Inquiry',
  description:
    'Hire No Bull Line Dancers for weddings, parties, corporate events, and bar nights in Hudson Valley and Upstate NY.',
}

const TRUST = [
  ['24hr',      'Response Time'],
  ['Mobile',    'We Come To You'],
  ['Any Crowd', 'All Skill Levels'],
]

const FAQS = [
  {
    question: 'Do you travel to our venue?',
    answer:
      'Yes. We are based in Forestport, NY and travel for events throughout Hudson Valley and Upstate NY.',
  },
  {
    question: 'Do guests need line dancing experience?',
    answer:
      'No experience is needed. We teach the steps clearly and keep the pace comfortable so beginners can join in.',
  },
  {
    question: 'What kinds of events can you do?',
    answer:
      'We are a fit for weddings, birthday parties, bachelorette parties, corporate events, bars, taverns, private classes, and community nights.',
  },
  {
    question: 'How much room do we need?',
    answer:
      'A flat open area works best. Tell us your venue and guest count in the booking form, and we can help you think through the floor setup.',
  },
  {
    question: 'Do you bring music or sound equipment?',
    answer:
      "Share what your venue already has when you inquire. We'll confirm the best setup for your room before the event.",
  },
  {
    question: 'Can we request songs?',
    answer:
      "Yes. Send any must-play songs or event preferences in the notes field, and we'll work them into the plan when they fit the dance flow.",
  },
]

export default function BookPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <header className="spotlight wood-grain border-b border-saddle py-16 sm:py-20">
        <div className="section-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Booking inquiry</p>
            <h1 className="font-serif text-5xl font-black leading-tight text-gold sm:text-6xl">
              Give us the basics. We'll take it from there.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-parchment sm:text-base">
              Send your date, location, and guest count. We'll reply with availability, pricing,
              and the best fit for your event.
            </p>
          </div>
          <a href="tel:8454163403" className="btn-secondary">
            Call 845-416-3403
          </a>
        </div>
      </header>

      <div className="section-shell max-w-2xl py-14 sm:py-16">
        <BookingForm />
      </div>

      <section id="faq" className="scroll-mt-24 border-t border-saddle bg-oak py-14 sm:py-16">
        <div className="section-shell max-w-4xl">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="font-serif text-4xl font-black leading-tight text-gold sm:text-5xl">
            A few things people ask before they book.
          </h2>
          <div className="mt-8 divide-y divide-saddle border-y border-saddle">
            {FAQS.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-sans text-sm font-black uppercase tracking-[0.12em] text-gold">
                  {item.question}
                </summary>
                <p className="mt-3 max-w-2xl font-sans text-sm leading-7 text-parchment">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-saddle bg-oak py-8">
        <div className="section-shell grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {TRUST.map(([title, sub]) => (
            <div key={title} className="border-l border-saddle pl-4">
              <div className="font-serif text-xl font-black text-gold">{title}</div>
              <div className="mt-1 font-sans text-xs tracking-wide text-leather">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
