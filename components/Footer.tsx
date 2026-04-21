import Link from 'next/link'

const FOOTER_LINKS = [
  { label: 'CLASSES', href: '/classes' },
  { label: 'BOOK',    href: '/book' },
  { label: 'MERCH',   href: '/merch' },
  { label: 'CONTACT', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-oak border-t border-saddle py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-serif font-black text-gold tracking-widest text-lg">
          NO BULL LINE DANCERS
        </div>
        <div className="flex gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-leather text-xs tracking-widest hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="font-sans text-saddle text-xs tracking-wide">
          Ardisanback, NY · 845-416-3403
        </div>
      </div>
    </footer>
  )
}
