import { AnimatedSection } from '@/components/ui/AnimatedSection'

const EVENTS = [
  {
    day: '15',
    month: 'MAY',
    title: 'Saturday Night Social',
    location: 'Ardisanback, NY',
    note: 'All levels welcome',
  },
]

export function EventsSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-oak border-y border-saddle">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4">Upcoming</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12">Come Dance With Us</h2>
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {EVENTS.map((e) => (
            <div
              key={e.title}
              className="bg-espresso border border-saddle rounded-sm p-5 flex gap-5 items-center card-glow text-left"
            >
              <div className="bg-gold text-espresso font-black rounded-sm px-4 py-3 text-center min-w-[56px]">
                <div className="font-serif text-2xl leading-none">{e.day}</div>
                <div className="font-sans text-[9px] tracking-widest">{e.month}</div>
              </div>
              <div>
                <h3 className="font-sans font-black text-gold text-sm tracking-wide">{e.title}</h3>
                <p className="font-sans text-leather text-xs">{e.location} · {e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
