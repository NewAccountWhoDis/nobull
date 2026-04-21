import Image from 'next/image'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function AboutSection() {
  return (
    <AnimatedSection className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4">Who We Are</p>
          <h2 className="font-serif font-black text-gold text-4xl leading-tight mb-4">
            We're Not Just Dancers.<br />We're The Party.
          </h2>
          <div className="divider-gold w-32 mb-6" />
          <p className="font-sans text-parchment text-sm leading-relaxed mb-4">
            No Bull Line Dancers is a mobile line dancing company based in Ardisanback, NY.
            We travel to your venue and transform any crowd into line dancers — no experience needed.
          </p>
          <p className="font-sans text-parchment text-sm leading-relaxed mb-8">
            Whether it's a backyard wedding or a packed bar, we bring the instruction, the energy,
            and a whole lot of fun. When the beat drops, the bullsh*t stops.
          </p>
          <a
            href="tel:8454163403"
            className="font-sans text-leather text-xs tracking-widest hover:text-gold transition-colors"
          >
            → CALL 845-416-3403
          </a>
        </div>

        <div className="relative rounded-sm overflow-hidden border border-saddle card-glow aspect-[4/3]">
          <Image
            src="/images/line-dancing.jpg"
            alt="No Bull Line Dancers class in action"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </AnimatedSection>
  )
}
