# No Bull Line Dancers — Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 5-page Next.js 14 website for No Bull Line Dancers — a mobile line dancing company — with Framer Motion animations, a Rustic & Warm design system, and a working booking form that emails inquiries via Resend.

**Architecture:** Hybrid approach — cinematic landing page with 6 animated scroll sections (Hero, About, Services, Gallery, Events, CTA) + 4 focused standalone pages (/book, /classes, /merch, /contact). Shared Nav and Footer live in root layout. Page transitions handled by AnimatePresence in a client-side wrapper. Scroll animations via Framer Motion `whileInView`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, React Hook Form, Resend, Playfair Display + Inter (next/font/google), Jest + React Testing Library

---

## File Map

```
/Users/macblack/Downloads/Web Dev/NoBull/
├── app/
│   ├── layout.tsx                    # Root layout: fonts, Nav, Footer, PageTransition
│   ├── page.tsx                      # Landing page: imports all 6 scroll sections
│   ├── globals.css                   # Tailwind base + wood grain, spotlight, divider utilities
│   ├── book/page.tsx                 # Booking page with BookingForm + trust strip
│   ├── classes/page.tsx              # Classes page: skill levels + contact for pricing
│   ├── merch/page.tsx                # Merch page: t-shirt display + order instructions
│   ├── contact/page.tsx              # Contact page: phone, Facebook, simple form
│   └── api/book/route.ts             # POST handler: validates fields, calls sendBookingEmail
├── components/
│   ├── Nav.tsx                       # Sticky nav: logo left, links + BOOK US right
│   ├── Footer.tsx                    # Footer: brand name, links, address
│   ├── PageTransition.tsx            # 'use client' AnimatePresence wrapper
│   ├── sections/
│   │   ├── HeroSection.tsx           # Full-height hero with parallax logo, two CTAs
│   │   ├── AboutSection.tsx          # Two-column: copy + line-dancing photo
│   │   ├── ServicesSection.tsx       # Staggered 4-up cards: Weddings/Parties/Corporate/Bars
│   │   ├── GallerySection.tsx        # Staggered 3-photo grid with hover zoom
│   │   ├── EventsSection.tsx         # Date cards for upcoming public events
│   │   └── CtaSection.tsx            # Bottom CTA: "Ready to Book?" + phone
│   └── ui/
│       ├── AnimatedSection.tsx       # Reusable whileInView fade+slide wrapper
│       └── BookingForm.tsx           # React Hook Form booking form with success/error states
├── lib/
│   └── sendBookingEmail.ts           # Resend helper — wraps email send
├── public/
│   └── images/
│       ├── logo1.jpg                 # Primary logo (bull skull + cowboy hat)
│       ├── line-dancing.jpg          # Class/event photo
│       ├── nobull-pic.jpg            # Lifestyle photo (boots + barrel)
│       └── t-shirts.jpg             # Product shot for merch page
├── __tests__/
│   └── api/book.test.ts             # API route: validation + send + error tests
├── tailwind.config.ts
├── jest.config.ts
├── jest.setup.ts
└── .env.local                        # RESEND_API_KEY (never commit)
```

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`, `tailwind.config.ts`, `tsconfig.json` (via create-next-app)
- Create: `.env.local`
- Create: `public/images/` (copy from project root)

- [ ] **Step 1: Initialize Next.js project in the NoBull directory**

```bash
cd "/Users/macblack/Downloads/Web Dev/NoBull"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias="@/*" --no-git
```

When prompted:
- Would you like to use `src/` directory? → **No**
- Would you like to customize the import alias? → **No** (accepts `@/*`)

- [ ] **Step 2: Install runtime dependencies**

```bash
cd "/Users/macblack/Downloads/Web Dev/NoBull"
npm install framer-motion react-hook-form resend
```

- [ ] **Step 3: Install test dependencies**

```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 4: Copy image assets to public/images/**

```bash
cd "/Users/macblack/Downloads/Web Dev/NoBull"
mkdir -p public/images
cp "logo 1.jpg" public/images/logo1.jpg
cp "line dancing pic.jpg" public/images/line-dancing.jpg
cp "nobull pic.jpg" public/images/nobull-pic.jpg
cp "t shirts.jpg" public/images/t-shirts.jpg
```

- [ ] **Step 5: Create .env.local with placeholder**

```bash
cat > .env.local << 'EOF'
RESEND_API_KEY=re_placeholder_replace_with_real_key
EOF
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000 with default Next.js page. No errors.

- [ ] **Step 7: Commit**

```bash
git init
git add -A
git commit -m "feat: initialize Next.js 14 project with dependencies"
```

---

## Task 2: Design System — Tailwind Config + Global Styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts with brand design tokens**

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#1a0f07',
        oak:      '#2c1a0e',
        saddle:   '#4a2c15',
        gold:     '#d4a574',
        leather:  '#8b5e3c',
        parchment:'#f5e6cc',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css with brand styles**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-espresso text-parchment font-sans;
  }
}

@layer utilities {
  /* Subtle wood plank texture on dark backgrounds */
  .wood-grain {
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(212, 165, 116, 0.02) 3px,
      rgba(212, 165, 116, 0.02) 4px
    );
  }

  /* Stage spotlight radial glow — used on hero and page heroes */
  .spotlight {
    background: radial-gradient(ellipse at 50% 40%, #3a2010 0%, #1a0f07 65%);
  }

  /* Faded gold horizontal rule — used as section divider */
  .divider-gold {
    height: 1px;
    background: linear-gradient(90deg, transparent, #d4a574, transparent);
    opacity: 0.4;
  }

  /* Warm amber inner shadow on cards and form */
  .card-glow {
    box-shadow: inset 0 0 30px rgba(212, 165, 116, 0.05);
  }

  /* Pulsing gold glow on primary CTA buttons */
  .pulse-cta {
    animation: pulse-gold 2.5s ease-in-out infinite;
  }
}

@keyframes pulse-gold {
  0%, 100% { box-shadow: 0 0 0 0 rgba(212, 165, 116, 0.4); }
  50%       { box-shadow: 0 0 0 8px rgba(212, 165, 116, 0); }
}
```

- [ ] **Step 3: Verify Tailwind picks up custom classes**

```bash
npm run build
```

Expected: Build succeeds. No CSS errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add brand design system to Tailwind config and globals"
```

---

## Task 3: Root Layout + Fonts + Page Transition Wrapper

**Files:**
- Create: `components/PageTransition.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create PageTransition component**

```typescript
// components/PageTransition.tsx
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Create placeholder Nav and Footer so layout compiles**

```typescript
// components/Nav.tsx  (placeholder — fully implemented in Task 4)
export function Nav() {
  return <header className="h-14 bg-oak border-b border-saddle" />
}
```

```typescript
// components/Footer.tsx  (placeholder — fully implemented in Task 11)
export function Footer() {
  return <footer className="h-16 bg-oak border-t border-saddle" />
}
```

- [ ] **Step 3: Replace app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { PageTransition } from '@/components/PageTransition'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'No Bull Line Dancers | Mobile Line Dancing for Events',
  description:
    'No Bull Line Dancers brings the boots, the moves, and the music to your event. Book us for weddings, parties, corporate events, and bars in Ardisanback, NY.',
  icons: { icon: '/images/logo1.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify layout compiles**

```bash
npm run dev
```

Open http://localhost:3000. Expected: page loads with dark background and stub nav/footer.

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx components/Footer.tsx components/PageTransition.tsx app/layout.tsx
git commit -m "feat: root layout with Playfair+Inter fonts and AnimatePresence page transitions"
```

---

## Task 4: Nav Component

**Files:**
- Modify: `components/Nav.tsx`

- [ ] **Step 1: Replace the placeholder Nav with the full implementation**

```typescript
// components/Nav.tsx
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
```

- [ ] **Step 2: Verify nav renders and underline animates**

```bash
npm run dev
```

Open http://localhost:3000. Hover nav links — gold underline should slide in from the left. BOOK US button should have gold gradient.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: Nav with animated gold underline and BOOK US CTA"
```

---

## Task 5: AnimatedSection Reusable Component

**Files:**
- Create: `components/ui/AnimatedSection.tsx`

- [ ] **Step 1: Create AnimatedSection**

```typescript
// components/ui/AnimatedSection.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

export function AnimatedSection({ children, className = '', delay = 0, id }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/AnimatedSection.tsx
git commit -m "feat: AnimatedSection reusable scroll-triggered fade+slide component"
```

---

## Task 6: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection with parallax logo**

```typescript
// components/sections/HeroSection.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // Logo drifts up 60px as the hero scrolls out
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden spotlight wood-grain"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 wood-grain pointer-events-none" />

      <motion.div style={{ y: logoY }} className="flex flex-col items-center z-10 px-6 text-center">
        <Image
          src="/images/logo1.jpg"
          alt="No Bull Line Dancers"
          width={200}
          height={200}
          className="rounded-lg mb-6 shadow-2xl"
          priority
        />

        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-5">
          Ardisanback, NY · 845-416-3403
        </p>

        <h1 className="font-serif font-black text-gold text-7xl tracking-widest leading-none mb-2">
          NO BULL
        </h1>
        <p className="font-sans text-leather text-sm tracking-[0.6em] uppercase mb-4">
          Line Dancers
        </p>

        <div className="divider-gold w-48 mx-auto mb-8" />

        <p className="font-sans text-parchment text-base leading-relaxed max-w-lg mb-10">
          We bring the boots, the moves, and the music — right to your event.
          Weddings, parties, corporate nights, and more.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/book"
            className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-8 py-4 rounded-sm pulse-cta hover:opacity-90 transition-opacity"
          >
            HIRE US FOR YOUR EVENT
          </Link>
          <a
            href="#gallery"
            className="border border-saddle text-leather font-sans text-xs tracking-widest px-6 py-4 rounded-sm hover:border-gold hover:text-gold transition-colors"
          >
            SEE THE GALLERY
          </a>
        </div>
      </motion.div>

      <div className="absolute bottom-8 text-saddle text-xl animate-bounce">↓</div>
    </div>
  )
}
```

- [ ] **Step 2: Create landing page stub so you can see the hero**

```typescript
// app/page.tsx  (stub — fully assembled in Task 11)
import { HeroSection } from '@/components/sections/HeroSection'

export default function HomePage() {
  return <HeroSection />
}
```

- [ ] **Step 3: Verify hero in browser**

```bash
npm run dev
```

Open http://localhost:3000. Scroll slowly — logo should drift upward. Gold underline divider should appear. Two CTA buttons visible.

- [ ] **Step 4: Commit**

```bash
git add components/sections/HeroSection.tsx app/page.tsx
git commit -m "feat: HeroSection with Framer Motion parallax logo and dual CTAs"
```

---

## Task 7: AboutSection

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection**

```typescript
// components/sections/AboutSection.tsx
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
```

- [ ] **Step 2: Add AboutSection to app/page.tsx**

```typescript
// app/page.tsx
import { HeroSection }  from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}
```

- [ ] **Step 3: Verify in browser — section fades in on scroll**

- [ ] **Step 4: Commit**

```bash
git add components/sections/AboutSection.tsx app/page.tsx
git commit -m "feat: AboutSection with two-column layout and scroll entrance animation"
```

---

## Task 8: ServicesSection

**Files:**
- Create: `components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create ServicesSection**

```typescript
// components/sections/ServicesSection.tsx
'use client'

import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const SERVICES = [
  { icon: '💍', label: 'WEDDINGS',   desc: 'Make your reception unforgettable. We get the whole crowd moving.' },
  { icon: '🎉', label: 'PARTIES',    desc: 'Birthday, bachelorette, or just because — any party is better with line dancing.' },
  { icon: '🏢', label: 'CORPORATE',  desc: 'Team building with a twist. No experience, no problem.' },
  { icon: '🍺', label: 'BARS & VENUES', desc: 'Bring the crowd in and keep them on the floor all night.' },
]

export function ServicesSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-oak border-y border-saddle">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4">What We Do</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12">Perfect For Any Event</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.label}
              className="bg-espresso border border-saddle rounded-sm p-6 card-glow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="font-sans font-black text-gold text-xs tracking-widest mb-2">{s.label}</h3>
              <p className="font-sans text-leather text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Add ServicesSection to app/page.tsx**

```typescript
// app/page.tsx
import { HeroSection }    from '@/components/sections/HeroSection'
import { AboutSection }   from '@/components/sections/AboutSection'
import { ServicesSection }from '@/components/sections/ServicesSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
    </>
  )
}
```

- [ ] **Step 3: Verify 4 cards stagger in on scroll**

- [ ] **Step 4: Commit**

```bash
git add components/sections/ServicesSection.tsx app/page.tsx
git commit -m "feat: ServicesSection with staggered card entrance animations"
```

---

## Task 9: GallerySection

**Files:**
- Create: `components/sections/GallerySection.tsx`

- [ ] **Step 1: Create GallerySection**

```typescript
// components/sections/GallerySection.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const PHOTOS = [
  { src: '/images/line-dancing.jpg', alt: 'Line dancing class in action' },
  { src: '/images/nobull-pic.jpg',   alt: 'No Bull boots and barrel' },
  { src: '/images/t-shirts.jpg',    alt: 'No Bull branded shirts' },
]

export function GallerySection() {
  return (
    <AnimatedSection id="gallery" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4 text-center">Gallery</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12 text-center">See Us In Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="relative aspect-[4/3] rounded-sm overflow-hidden border border-saddle card-glow"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Add GallerySection to app/page.tsx**

```typescript
// app/page.tsx
import { HeroSection }    from '@/components/sections/HeroSection'
import { AboutSection }   from '@/components/sections/AboutSection'
import { ServicesSection }from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
    </>
  )
}
```

- [ ] **Step 3: Click "SEE THE GALLERY" in hero — verify page jumps to #gallery anchor**

- [ ] **Step 4: Commit**

```bash
git add components/sections/GallerySection.tsx app/page.tsx
git commit -m "feat: GallerySection with staggered photo grid and hover zoom"
```

---

## Task 10: EventsSection + CtaSection

**Files:**
- Create: `components/sections/EventsSection.tsx`
- Create: `components/sections/CtaSection.tsx`

- [ ] **Step 1: Create EventsSection**

```typescript
// components/sections/EventsSection.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection'

const EVENTS = [
  {
    day: '15',
    month: 'MAY',
    title: 'Saturday Night Social',
    location: 'Ardisanback, NY',
    note: 'All levels welcome',
  },
]

export function EventsSection() {
  return (
    <AnimatedSection className="py-24 px-6 bg-oak border-y border-saddle">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-sans text-leather text-xs tracking-[0.4em] uppercase mb-4">Upcoming</p>
        <h2 className="font-serif font-black text-gold text-4xl mb-12">Come Dance With Us</h2>
        <div className="flex flex-col gap-4 max-w-xl mx-auto">
          {EVENTS.map((e) => (
            <div
              key={e.title}
              className="bg-espresso border border-saddle rounded-sm p-5 flex gap-5 items-center card-glow text-left"
            >
              <div className="bg-gold text-espresso font-black rounded-sm px-4 py-3 text-center min-w-[56px]">
                <div className="font-serif text-2xl leading-none">{e.day}</div>
                <div className="font-sans text-[9px] tracking-widest">{e.month}</div>
              </div>
              <div>
                <h3 className="font-sans font-black text-gold text-sm tracking-wide">{e.title}</h3>
                <p className="font-sans text-leather text-xs">{e.location} · {e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
```

- [ ] **Step 2: Create CtaSection**

```typescript
// components/sections/CtaSection.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/EventsSection.tsx components/sections/CtaSection.tsx
git commit -m "feat: EventsSection and CtaSection with scroll animations"
```

---

## Task 11: Footer + Assemble Landing Page

**Files:**
- Modify: `components/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace placeholder Footer with full implementation**

```typescript
// components/Footer.tsx
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
```

- [ ] **Step 2: Assemble all sections in app/page.tsx**

```typescript
// app/page.tsx
import { HeroSection }    from '@/components/sections/HeroSection'
import { AboutSection }   from '@/components/sections/AboutSection'
import { ServicesSection }from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { EventsSection }  from '@/components/sections/EventsSection'
import { CtaSection }     from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <EventsSection />
      <CtaSection />
    </>
  )
}
```

- [ ] **Step 3: Full walkthrough in browser**

```bash
npm run dev
```

Scroll through entire landing page. Verify:
- Every section fades+slides in on scroll
- Hero parallax fires on scroll
- Services cards stagger
- Gallery photos stagger with hover zoom
- Footer links all render

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: complete landing page — all 6 sections assembled with Footer"
```

---

## Task 12: BookingForm Component

**Files:**
- Create: `components/ui/BookingForm.tsx`

- [ ] **Step 1: Create BookingForm**

```typescript
// components/ui/BookingForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useState } from 'react'

export type BookingFormData = {
  name: string
  phone: string
  email: string
  eventDate: string
  eventType: string
  eventLocation: string
  guestCount: string
  notes: string
}

const EVENT_TYPES = ['Wedding', 'Birthday Party', 'Corporate', 'Bar or Venue', 'Other']

const TEXT_FIELDS: {
  name: keyof BookingFormData
  label: string
  placeholder: string
  required: boolean
  span?: number
  type?: string
}[] = [
  { name: 'name',          label: 'YOUR NAME',        placeholder: 'First & Last Name', required: true },
  { name: 'phone',         label: 'PHONE NUMBER',     placeholder: '(000) 000-0000',   required: true },
  { name: 'email',         label: 'EMAIL ADDRESS',    placeholder: 'you@email.com',    required: true, span: 2 },
  { name: 'eventDate',     label: 'EVENT DATE',       placeholder: '',                 required: true, type: 'date' },
  { name: 'eventLocation', label: 'EVENT LOCATION',   placeholder: 'City, State',      required: true },
  { name: 'guestCount',    label: 'ESTIMATED GUESTS', placeholder: 'Approx. number',   required: false },
]

const inputClass =
  'w-full bg-oak border border-saddle focus:border-gold rounded-sm px-4 py-3 text-parchment text-sm placeholder-saddle outline-none transition-colors'

export function BookingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>()

  const onSubmit = async (data: BookingFormData) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="text-6xl mb-6">✓</div>
        <h3 className="font-serif font-black text-gold text-3xl mb-3">Request Sent!</h3>
        <p className="font-sans text-leather text-sm">We'll get back to you within 24 hours.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {TEXT_FIELDS.map((field, i) => (
          <motion.div
            key={field.name}
            className={field.span === 2 ? 'md:col-span-2' : ''}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
              {field.label}{field.required && ' *'}
            </label>
            <input
              {...register(field.name, {
                required: field.required ? `${field.label} is required` : false,
              })}
              type={field.type ?? 'text'}
              placeholder={field.placeholder}
              className={inputClass}
            />
            {errors[field.name] && (
              <p className="text-red-400 text-xs mt-1">{errors[field.name]?.message}</p>
            )}
          </motion.div>
        ))}

        {/* Event Type dropdown */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: TEXT_FIELDS.length * 0.05 }}
        >
          <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
            EVENT TYPE *
          </label>
          <select
            {...register('eventType', { required: 'Event type is required' })}
            className={inputClass}
          >
            <option value="">Select event type...</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.eventType && (
            <p className="text-red-400 text-xs mt-1">{errors.eventType.message}</p>
          )}
        </motion.div>

        {/* Notes */}
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (TEXT_FIELDS.length + 1) * 0.05 }}
        >
          <label className="block font-sans text-leather text-[10px] tracking-widest mb-2">
            ADDITIONAL NOTES
          </label>
          <textarea
            {...register('notes')}
            placeholder="Tell us anything else about your event..."
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </motion.div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-sm tracking-widest px-12 py-4 rounded-sm disabled:opacity-60 hover:opacity-90 transition-opacity pulse-cta"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MY REQUEST →'}
        </button>

        {status === 'error' && (
          <p className="text-red-400 text-xs mt-3">
            Something went wrong. Please call 845-416-3403 directly.
          </p>
        )}

        <p className="font-sans text-saddle text-xs mt-4 tracking-wide">
          Or call us directly: 845-416-3403
        </p>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/BookingForm.tsx
git commit -m "feat: BookingForm with React Hook Form validation and animated fields"
```

---

## Task 13: Booking API Route + Resend Email Helper

**Files:**
- Create: `lib/sendBookingEmail.ts`
- Create: `app/api/book/route.ts`
- Create: `__tests__/api/book.test.ts`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`

- [ ] **Step 1: Configure Jest**

```typescript
// jest.config.ts
import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'node',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': '<rootDir>/$1' },
}

export default createJestConfig(config)
```

```typescript
// jest.setup.ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 2: Create sendBookingEmail helper**

```typescript
// lib/sendBookingEmail.ts
import { Resend } from 'resend'
import type { BookingFormData } from '@/components/ui/BookingForm'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail(data: BookingFormData): Promise<void> {
  await resend.emails.send({
    // Replace 'onboarding@resend.dev' with a verified domain address before go-live
    from: 'No Bull Line Dancers <onboarding@resend.dev>',
    to: 'truthis@joeisblack.com',
    subject: `New Booking Request — ${data.eventType} on ${data.eventDate}`,
    text: [
      `New booking inquiry from ${data.name}`,
      '',
      `Phone:      ${data.phone}`,
      `Email:      ${data.email}`,
      `Event Date: ${data.eventDate}`,
      `Event Type: ${data.eventType}`,
      `Location:   ${data.eventLocation}`,
      `Guests:     ${data.guestCount || 'Not specified'}`,
      '',
      'Notes:',
      data.notes || 'None',
    ].join('\n'),
  })
}
```

- [ ] **Step 3: Create API route**

```typescript
// app/api/book/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/sendBookingEmail'
import type { BookingFormData } from '@/components/ui/BookingForm'

const REQUIRED: (keyof BookingFormData)[] = [
  'name', 'phone', 'email', 'eventDate', 'eventType', 'eventLocation',
]

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<BookingFormData>

  const missing = REQUIRED.filter((f) => !body[f])
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(', ')}` },
      { status: 400 },
    )
  }

  try {
    await sendBookingEmail(body as BookingFormData)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Booking email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Write tests for the API route**

```typescript
// __tests__/api/book.test.ts
import { POST } from '@/app/api/book/route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/sendBookingEmail', () => ({
  sendBookingEmail: jest.fn().mockResolvedValue(undefined),
}))

const { sendBookingEmail } = require('@/lib/sendBookingEmail')

const VALID_BODY = {
  name: 'Jane Doe',
  phone: '845-000-0000',
  email: 'jane@test.com',
  eventDate: '2026-06-15',
  eventType: 'Wedding',
  eventLocation: 'Albany, NY',
  guestCount: '100',
  notes: '',
}

function makeReq(body: object) {
  return new NextRequest('http://localhost/api/book', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/book', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 200 with valid body and calls sendBookingEmail', async () => {
    const res = await POST(makeReq(VALID_BODY))
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.ok).toBe(true)
    expect(sendBookingEmail).toHaveBeenCalledWith(VALID_BODY)
  })

  it('returns 400 when name is missing', async () => {
    const { name, ...noName } = VALID_BODY
    const res = await POST(makeReq(noName))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/name/)
  })

  it('returns 400 when multiple required fields are missing', async () => {
    const res = await POST(makeReq({ notes: 'hello' }))
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toMatch(/name/)
    expect(json.error).toMatch(/email/)
  })

  it('returns 500 when sendBookingEmail throws', async () => {
    sendBookingEmail.mockRejectedValueOnce(new Error('Resend down'))
    const res = await POST(makeReq(VALID_BODY))
    expect(res.status).toBe(500)
    const json = await res.json()
    expect(json.error).toBe('Failed to send email')
  })
})
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```

Expected output:
```
PASS  __tests__/api/book.test.ts
  POST /api/book
    ✓ returns 200 with valid body and calls sendBookingEmail
    ✓ returns 400 when name is missing
    ✓ returns 400 when multiple required fields are missing
    ✓ returns 500 when sendBookingEmail throws
```

- [ ] **Step 6: Commit**

```bash
git add lib/sendBookingEmail.ts app/api/book/route.ts __tests__/api/book.test.ts jest.config.ts jest.setup.ts package.json
git commit -m "feat: booking API route with Resend email + passing Jest tests"
```

---

## Task 14: /book Page

**Files:**
- Create: `app/book/page.tsx`

- [ ] **Step 1: Create booking page**

```typescript
// app/book/page.tsx
import type { Metadata } from 'next'
import { BookingForm } from '@/components/ui/BookingForm'

export const metadata: Metadata = {
  title: 'Book No Bull Line Dancers | Event Inquiry',
  description:
    'Hire No Bull Line Dancers for your wedding, party, corporate event, or bar night in the Ardisanback, NY area.',
}

const TRUST = [
  ['24hr',      'Response Time'],
  ['Mobile',    'We Come To You'],
  ['Any Crowd', 'All Skill Levels'],
]

export default function BookPage() {
  return (
    <div className="min-h-screen bg-espresso">
      {/* Page hero */}
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">
          Let's Make It Happen
        </p>
        <h1 className="font-serif font-black text-gold text-5xl leading-tight mb-4">
          Book No Bull<br />For Your Event
        </h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          Fill out the form below and we'll get back to you within 24 hours
          with availability and pricing.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <BookingForm />
      </div>

      {/* Trust strip */}
      <div className="bg-oak border-t border-saddle py-8 px-6">
        <div className="max-w-2xl mx-auto flex justify-center gap-12">
          {TRUST.map(([title, sub]) => (
            <div key={title} className="text-center">
              <div className="font-serif font-black text-gold text-xl">{title}</div>
              <div className="font-sans text-leather text-xs tracking-wide">{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Manually test the booking form end-to-end**

```bash
npm run dev
```

Navigate to http://localhost:3000/book.
1. Submit the form with all fields empty — verify red validation errors appear on required fields.
2. Fill in all required fields and submit — verify "SENDING..." state appears, then success message.

Note: With placeholder `RESEND_API_KEY`, the email won't actually send but the API should return 500. Confirm the error fallback message appears and the phone number is shown as fallback. Once a real key is added to `.env.local`, re-test with a real submission.

- [ ] **Step 3: Commit**

```bash
git add app/book/page.tsx
git commit -m "feat: /book page with hero, BookingForm, and trust strip"
```

---

## Task 15: /classes Page

**Files:**
- Create: `app/classes/page.tsx`

- [ ] **Step 1: Create classes page**

```typescript
// app/classes/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Classes | No Bull Line Dancers',
  description: 'Join a No Bull Line Dancers class in Ardisanback, NY. All skill levels welcome.',
}

const LEVELS = [
  {
    icon: '🌱',
    name: 'Beginner',
    desc: 'Never line danced? No problem. We start from scratch and have you moving in minutes.',
  },
  {
    icon: '⭐',
    name: 'Intermediate',
    desc: 'You know the basics and want more patterns, more music, more fun.',
  },
  {
    icon: '🔥',
    name: 'Advanced',
    desc: 'Ready to challenge yourself with complex footwork and performance-level routines.',
  },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-espresso">
      {/* Page hero */}
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">Join Us</p>
        <h1 className="font-serif font-black text-gold text-5xl mb-4">Classes</h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          All levels welcome. No experience needed — just boots (or sneakers)
          and a willingness to have fun.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Skill levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {LEVELS.map((level) => (
            <div
              key={level.name}
              className="bg-oak border border-saddle rounded-sm p-8 card-glow text-center"
            >
              <div className="text-4xl mb-4">{level.icon}</div>
              <h2 className="font-serif font-black text-gold text-xl mb-3">{level.name}</h2>
              <p className="font-sans text-leather text-sm leading-relaxed">{level.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing CTA */}
        <div className="bg-oak border border-gold rounded-sm p-10 card-glow text-center">
          <h2 className="font-serif font-black text-gold text-3xl mb-3">Pricing & Schedule</h2>
          <div className="divider-gold w-24 mx-auto mb-6" />
          <p className="font-sans text-parchment text-sm leading-relaxed mb-2">
            Schedule and pricing vary by season and location.
          </p>
          <p className="font-sans text-parchment text-sm leading-relaxed mb-8">
            Contact us for current availability and rates.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:8454163403"
              className="bg-gradient-to-r from-gold to-leather text-espresso font-black text-xs tracking-widest px-8 py-3 rounded-sm hover:opacity-90 transition-opacity"
            >
              CALL 845-416-3403
            </a>
            <Link
              href="/contact"
              className="border border-saddle text-leather font-sans text-xs tracking-widest px-6 py-3 rounded-sm hover:border-gold hover:text-gold transition-colors"
            >
              SEND A MESSAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify /classes loads and links work**

Navigate to http://localhost:3000/classes. Verify 3 skill level cards render and CTAs are clickable.

- [ ] **Step 3: Commit**

```bash
git add app/classes/page.tsx
git commit -m "feat: /classes page with skill levels and contact-for-pricing CTA"
```

---

## Task 16: /merch Page

**Files:**
- Create: `app/merch/page.tsx`

- [ ] **Step 1: Create merch page**

```typescript
// app/merch/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Merch | No Bull Line Dancers',
  description: 'Official No Bull Line Dancers merchandise. Rep the brand.',
}

export default function MerchPage() {
  return (
    <div className="min-h-screen bg-espresso">
      {/* Page hero */}
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
          {/* Product image */}
          <div className="relative aspect-video bg-espresso">
            <Image
              src="/images/t-shirts.jpg"
              alt="No Bull Line Dancers T-Shirt — front and back"
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Product info */}
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
```

- [ ] **Step 2: Verify /merch loads with t-shirt image**

Navigate to http://localhost:3000/merch. T-shirt product photo should render.

- [ ] **Step 3: Commit**

```bash
git add app/merch/page.tsx
git commit -m "feat: /merch page with t-shirt product display and call-to-order CTA"
```

---

## Task 17: /contact Page

**Files:**
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Create contact page**

```typescript
// app/contact/page.tsx
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
      {/* Page hero */}
      <div className="spotlight wood-grain py-20 px-6 text-center border-b border-saddle">
        <p className="font-sans text-leather text-xs tracking-[0.5em] uppercase mb-3">Get In Touch</p>
        <h1 className="font-serif font-black text-gold text-5xl mb-4">Contact</h1>
        <div className="divider-gold w-32 mx-auto mb-6" />
        <p className="font-sans text-parchment text-sm max-w-md mx-auto leading-relaxed">
          Questions? Ready to book? We'd love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16 space-y-6">
        {/* Contact cards */}
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

        {/* Booking prompt */}
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
```

- [ ] **Step 2: Verify /contact loads**

Navigate to http://localhost:3000/contact. Phone and Facebook links should be clickable.

- [ ] **Step 3: Commit**

```bash
git add app/contact/page.tsx
git commit -m "feat: /contact page with phone, Facebook, and booking form CTA"
```

---

## Task 18: Final Verification + Production Build

- [ ] **Step 1: Run full test suite**

```bash
npm test
```

Expected: All 4 API route tests pass. Zero failures.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. Note any warnings about image optimization or missing alt text.

- [ ] **Step 3: Smoke test every route**

```bash
npm run start
```

Check each route and verify:
| Route | Check |
|---|---|
| `/` | All 6 sections render; parallax fires on scroll; gallery anchor link works |
| `/book` | Form validates required fields; success state shows on valid submit |
| `/classes` | 3 skill level cards render; phone link works |
| `/merch` | T-shirt image loads; call-to-order link works |
| `/contact` | Phone and Facebook links work; booking form link works |
| Nav | BOOK US button → /book; all links resolve |
| Footer | All links resolve |

- [ ] **Step 4: Verify page transitions**

Navigate between routes — each page should fade out and the new page fade in.

- [ ] **Step 5: Add RESEND_API_KEY and do a live email test**

```bash
# In .env.local, replace the placeholder with your real Resend API key
# Get one free at https://resend.com
```

Submit the booking form on /book with test data. Verify email arrives at truthis@joeisblack.com.

Note: The `from` address is set to `onboarding@resend.dev` (Resend's test sender). Before going live, add a verified domain in the Resend dashboard and update `lib/sendBookingEmail.ts`:
```typescript
from: 'No Bull Line Dancers <bookings@yourdomain.com>',
```

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete No Bull Line Dancers website — 5 pages, animations, booking form"
```

---

## Success Criteria Checklist

- [ ] All 5 routes (`/`, `/book`, `/classes`, `/merch`, `/contact`) load without errors
- [ ] Booking form submits and owner receives email at truthis@joeisblack.com
- [ ] All Framer Motion animations fire on scroll and page load
- [ ] Page transitions work between all routes
- [ ] Site is fully responsive (desktop primary, mobile functional)
- [ ] Real photos load from `/public/images/`
- [ ] Logo appears in nav, hero, and browser favicon
- [ ] No placeholder content in production build
- [ ] All 4 Jest tests pass
