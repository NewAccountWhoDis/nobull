import { AnimatedSection } from '@/components/ui/AnimatedSection'

const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61573169872550'

const EVENTS = [
  {
    day: '30',
    month: 'APR',
    title: 'Wigwam Tavern',
    location: 'Wigwam Tavern',
    note: 'Thursday at 6p',
  },
]

export function EventsSection() {
  return (
    <AnimatedSection className="border-y border-saddle bg-oak py-20 sm:py-24">
      <div className="section-shell grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div>
          <p className="eyebrow mb-4">Upcoming shows & classes</p>
          <h2 className="font-serif text-4xl font-black leading-tight text-gold sm:text-5xl">Catch a public night before you book.</h2>
          <p className="mt-5 max-w-md font-sans text-sm leading-7 text-leather">
            Want to see the teaching style in person? Come out, dance a few songs, and meet the crew.
          </p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 rounded-sm border border-saddle bg-espresso px-4 py-3 font-sans text-xs font-black uppercase tracking-[0.14em] text-parchment transition-colors hover:border-[#1877f2] hover:text-gold"
          >
            <FacebookIcon />
            Follow us for up-to-date events and photos
          </a>
        </div>
        <div className="flex flex-col gap-4">
          {EVENTS.map((e) => (
            <div
              key={e.title}
              className="flex gap-5 rounded-sm border border-saddle bg-espresso p-5 text-left card-glow"
            >
              <div className="min-w-[64px] rounded-sm bg-gold px-4 py-3 text-center font-black text-espresso">
                <div className="font-serif text-3xl leading-none">{e.day}</div>
                <div className="font-sans text-[9px] tracking-[0.18em]">{e.month}</div>
              </div>
              <div className="py-1">
                <h3 className="font-sans text-sm font-black uppercase tracking-[0.12em] text-gold">{e.title}</h3>
                <p className="mt-2 font-sans text-sm leading-6 text-leather">{e.location} / {e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

function FacebookIcon() {
  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1877f2] font-sans text-lg font-black leading-none text-white"
      aria-hidden="true"
    >
      f
    </span>
  )
}
