import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function CtaSection() {
  return (
    <AnimatedSection className="py-28 px-6 spotlight wood-grain text-center">
      <h2 className="font-serif font-black text-gold text-5xl mb-4">Ready To Book?</h2>
      <div className="divider-gold w-32 mx-auto mb-6" />
      <p className="font-sans text-leather text-sm mb-10">
        Call 845-416-3403 or fill out our booking form
      </p>
      <Link
        href="/book"
        className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-sm tracking-widest px-12 py-5 rounded-sm inline-block pulse-cta hover:opacity-90 transition-opacity"
      >
        GET A QUOTE →
      </Link>
    </AnimatedSection>
  )
}
