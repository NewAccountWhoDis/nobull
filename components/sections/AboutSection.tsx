import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutSection() {
  return (
    <AnimatedSection className="py-20 sm:py-24">
      <div className="section-shell grid grid-cols-1 items-center gap-10 md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <div>
          <p className="eyebrow mb-4">What it feels like</p>
          <h2 className="font-serif text-4xl font-black leading-tight text-gold sm:text-5xl">
            Clear steps, loud laughs, no awkward staring from the edge.
          </h2>
          <div className="my-6 h-px w-24 bg-gold" />
          <p className="mb-4 font-sans text-sm leading-7 text-parchment sm:text-base">
            No Bull Line Dancers is a mobile line dancing company based in Forestport, NY,
            serving Hudson Valley and Upstate NY events. We travel to your venue, read the room,
            teach the steps, and keep the floor moving.
          </p>
          <p className="mb-8 font-sans text-sm leading-7 text-parchment sm:text-base">
            The goal is simple: guests who thought they would sit this one out end up learning the dance,
            laughing with the group, and staying for another song.
          </p>
          <a
            href="tel:8454163403"
            className="font-sans text-xs font-black uppercase tracking-[0.16em] text-gold transition-colors hover:text-parchment"
          >
            Call 845-416-3403
          </a>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-saddle card-glow">
          <Image
            src="/images/nobull-pic.jpg"
            alt="No Bull Line Dancers display with boots and barrel"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-espresso/90 to-transparent p-5">
            <p className="max-w-xs font-sans text-xs leading-5 text-parchment">
              Built for real rooms: banquet halls, backyards, bars, and anywhere people are ready to move.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  )
}
