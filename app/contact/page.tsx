import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | No Bull Line Dancers',
  description: 'Get in touch with No Bull Line Dancers. Call, message on Facebook, or send us a note.',
}

const CONTACT_ITEMS = [
  {
    icon: '📞',
    label: 'CALL US',
    value: '845-416-3403',
    href: 'tel:8454163403',
  },
  {
    icon: '📘',
    label: 'FACEBOOK',
    value: 'No Bull Line Dancers',
    href: 'https://www.facebook.com/profile.php?id=61573169872550',
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-espresso">
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">Get In Touch</p>
        <h1 className="font-serif font-black text-gold text-5xl mb-4">Contact</h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          Questions? Ready to book? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-6">
        {CONTACT_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-6 bg-oak border border-saddle rounded-sm p-6 card-glow hover:border-gold transition-colors group"
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <div className="font-sans text-leather text-[10px] tracking-widest mb-1">{item.label}</div>
              <div className="font-serif font-black text-gold text-xl group-hover:text-parchment transition-colors">
                {item.value}
              </div>
            </div>
          </a>
        ))}

        <div className="bg-oak border border-saddle rounded-sm p-8 card-glow text-center">
          <h2 className="font-serif font-black text-gold text-2xl mb-3">Ready to Book an Event?</h2>
          <p className="font-sans text-leather text-sm mb-6 leading-relaxed">
            Use our booking form for event inquiries — it helps us get you the right info fast.
          </p>
          <a
            href="/book"
            className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-8 py-3 rounded-sm inline-block hover:opacity-90 transition-opacity"
          >
            GO TO BOOKING FORM →
          </a>
        </div>
      </div>
    </div>
  )
}
