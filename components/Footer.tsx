import Link from 'next/link'
import { HiddenAdminEntry } from '@/components/admin/HiddenAdminEntry'

const FOOTER_LINKS = [
  { label: 'CLASSES', href: '/classes' },
  { label: 'BOOK',    href: '/book' },
  { label: 'MERCH',   href: '/merch' },
  { label: 'CONTACT', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-saddle bg-oak py-10">
      <div className="section-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-serif text-lg font-black tracking-[0.16em] text-gold">
            NO BULL LINE DANCERS
          </div>
          <div className="mt-2 font-sans text-xs tracking-wide text-saddle">
            Forestport, NY / Hudson Valley & Upstate NY / 845-416-3403
          </div>
          <div className="mt-4 inline-flex items-center font-serif text-sm italic tracking-[0.08em] text-parchment/70">
            <HiddenAdminEntry />
            <a
              href="https://www.meetmister.black"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Designed By JxB
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-xs font-black uppercase tracking-[0.16em] text-leather transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
