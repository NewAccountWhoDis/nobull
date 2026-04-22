import type { Metadata } from 'next'
import Image from 'next/image'
import { MerchOrderForm } from '@/components/ui/MerchOrderForm'

export const metadata: Metadata = {
  title: 'Merch | No Bull Line Dancers',
  description: 'Official No Bull Line Dancers shirts, hoodies, quarter zips, and tanks.',
}

const MERCH_ITEMS = [
  { name: 'Crewneck unisex', price: '$20' },
  { name: 'Hoodie unisex', price: '$35' },
  { name: 'Quarter zip unisex', price: '$33' },
  { name: 'Racerback tank top', price: '$22' },
  { name: "V-neck women's", price: '$24' },
]

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <form name="merch-order" method="POST" data-netlify="true" hidden>
        <input type="hidden" name="form-name" value="merch-order" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="items" />
        <textarea name="notes" />
      </form>

      <header className="spotlight wood-grain border-b border-saddle py-16 sm:py-20">
        <div className="section-shell max-w-4xl">
          <p className="eyebrow mb-4">Merch</p>
          <h1 className="font-serif text-5xl font-black leading-tight text-gold sm:text-6xl">Gear for class nights, events, and showing up No Bull.</h1>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-7 text-parchment sm:text-base">
            Official No Bull apparel is available by direct order. Choose your style, message for sizing,
            and we will help with availability and pickup details.
          </p>
        </div>
      </header>

      <div className="section-shell max-w-5xl py-14 sm:py-16">
        <div className="grid overflow-hidden rounded-sm border border-saddle bg-oak card-glow md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[300px] bg-espresso sm:min-h-[420px]">
            <Image
              src="/images/t-shirts.jpg"
              alt="No Bull Line Dancers T-Shirt front and back"
              fill
              className="object-contain p-6 sm:p-10"
            />
          </div>

          <div className="border-t border-saddle p-6 sm:p-8 md:border-l md:border-t-0">
            <p className="eyebrow mb-4">Available styles</p>
            <h2 className="font-serif text-4xl font-black text-gold">No Bull apparel, priced by style.</h2>
            <p className="mt-4 font-sans text-sm italic text-leather">
              "When the Beat Drops, the Bullsh*t Stops"
            </p>
            <div className="my-6 h-px w-24 bg-gold" />
            <div className="mb-6 divide-y divide-saddle border-y border-saddle">
              {MERCH_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="font-sans text-sm text-parchment">{item.name}</span>
                  <span className="font-serif text-2xl font-black text-gold">{item.price}</span>
                </div>
              ))}
            </div>
            <p className="mb-8 max-w-sm font-sans text-sm leading-7 text-parchment">
              Message for the size chart or any additional questions before ordering.
            </p>
            <MerchOrderForm />
          </div>
        </div>
      </div>
    </div>
  )
}
