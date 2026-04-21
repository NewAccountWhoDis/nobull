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
  return (
    <nav className="sticky top-0 z-50 bg-oak border-b border-saddle">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logo1.jpg"
            alt="No Bull Line Dancers logo"
            width={40}
            height={40}
            className="rounded"
          />
          <div>
            <div className="font-serif font-black text-gold text-sm tracking-widest">NO BULL</div>
            <div className="font-sans text-leather text-[9px] tracking-widest uppercase">Line Dancers</div>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <Link
            href="/book"
            className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-5 py-2 rounded-sm hover:opacity-90 transition-opacity"
          >
            BOOK US
          </Link>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      className="relative font-sans text-leather text-xs tracking-widest hover:text-gold transition-colors"
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
