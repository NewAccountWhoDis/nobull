'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'CLASSES', href: '/classes' },
  { label: 'GALLERY', href: '/#gallery' },
  { label: 'MERCH',   href: '/merch' },
  { label: 'CONTACT', href: '/contact' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-saddle/80 bg-espresso/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 group" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo1.jpg"
            alt="No Bull Line Dancers logo"
            width={40}
            height={40}
            className="rounded-sm border border-saddle/70"
          />
          <div className="min-w-0">
            <div className="font-serif text-sm font-black tracking-[0.16em] text-gold">NO BULL</div>
            <div className="font-sans text-[9px] uppercase tracking-[0.18em] text-leather">Line Dancers</div>
          </div>
        </Link>

        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-sm border border-saddle text-gold md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`h-px w-5 bg-current transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-px w-5 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-px w-5 bg-current transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Link
            href="/book"
            className="btn-primary min-h-0 px-5 py-2"
          >
            BOOK US
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-saddle bg-oak px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-sm border border-transparent px-2 py-3 font-sans text-xs font-black uppercase tracking-[0.18em] text-parchment hover:border-saddle hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/book" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
              Book Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      className="relative font-sans text-xs font-black uppercase tracking-[0.16em] text-leather transition-colors hover:text-gold"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ originX: 0 }}
      />
    </Link>
  )
}
