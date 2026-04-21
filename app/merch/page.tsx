import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Merch | No Bull Line Dancers',
  description: 'Official No Bull Line Dancers merchandise. Rep the brand.',
}

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">Rep The Brand</p>
        <h1 className="font-serif font-black text-gold text-5xl mb-4">Merch</h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          Official No Bull gear. When the beat drops, look the part.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-oak border border-saddle rounded-sm overflow-hidden card-glow">
          <div className="relative aspect-video bg-espresso">
            <Image
              src="/images/t-shirts.jpg"
              alt="No Bull Line Dancers T-Shirt — front and back"
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="p-8 border-t border-saddle text-center">
            <h2 className="font-serif font-black text-gold text-3xl mb-2">Classic Tee</h2>
            <p className="font-sans text-leather text-sm mb-1 italic">
              "When the Beat Drops, the Bullsh*t Stops"
            </p>
            <div className="divider-gold w-24 mx-auto my-4" />
            <p className="font-sans text-parchment text-sm leading-relaxed mb-8 max-w-sm mx-auto">
              Black V-neck with the No Bull skull logo on the front.
              Available in multiple sizes. Contact us to place an order.
            </p>
            <a
              href="tel:8454163403"
              className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-10 py-3 rounded-sm inline-block hover:opacity-90 transition-opacity"
            >
              CALL TO ORDER — 845-416-3403
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
