# No Bull Line Dancers — Website Design Spec
**Date:** 2026-04-21  
**Client:** No Bull Line Dancers  
**Location:** Ardisanback, NY  
**Phone:** 845-416-3403  
**Facebook:** https://www.facebook.com/profile.php?id=61573169872550

---

## 1. Business Overview

No Bull Line Dancers is a **mobile line dancing company** that travels to client events and teaches/performs line dancing for any crowd. They serve weddings, birthday parties, corporate events, bars, and venues across the Ardisanback, NY area. No prior dance experience required for guests.

Primary goal of the website: **generate event booking inquiries**.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Performance, SEO, page routing |
| Animation | Framer Motion | Scroll animations, page transitions, entrance effects |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Fonts | Playfair Display + Inter | Serif headings for western warmth, sans for body legibility |
| Forms | React Hook Form | Lightweight, controlled form handling |
| Deployment | Vercel | Native Next.js hosting |

---

## 3. Design System

### Color Palette

| Name | Hex | Use |
|---|---|---|
| Deep Espresso | `#1a0f07` | Page background |
| Dark Oak | `#2c1a0e` | Cards, nav, form fields |
| Saddle Brown | `#4a2c15` | Borders, dividers |
| Amber Gold | `#d4a574` | Primary headings, CTAs, accents |
| Leather | `#8b5e3c` | Secondary text, labels |
| Parchment | `#f5e6cc` | Body text |

### Typography

- **Display / Hero:** Playfair Display, 900 weight, wide letter-spacing — all major headings and the logo wordmark
- **Labels / Nav:** Inter, 700 weight, uppercase, wide letter-spacing
- **Body:** Inter, 400 weight, `#f5e6cc`, 1.7 line-height

### Textures & Atmosphere

- **Wood grain:** Subtle repeating diagonal pattern on hero and section backgrounds
- **Vignette/Spotlight:** Radial gradient glow on hero centered on logo — stage spotlight effect
- **Distressed dividers:** Gold horizontal rules with rough/faded edges between sections
- **Warm inner glow:** Cards and booking form have amber inner box-shadow — candlelight feel

### Assets

| File | Use |
|---|---|
| `logo 1.jpg` | Primary logo — bull skull with cowboy hat. Used in nav, hero, favicon |
| `line dancing pic.jpg` | Class/event photo — About section and Gallery |
| `nobull pic.jpg` | Lifestyle photo (boots + Jack Daniel's barrel + t-shirt) — hero or about accent |
| `t shirts.jpg` | Product shot — Merch page |
| `logo.jpg` | Secondary logo variant — as needed |

---

## 4. Site Architecture

**Approach:** Hybrid — cinematic landing page with scroll sections + 4 focused standalone pages.

### Landing Page (`/`) — Scroll Sections

1. **Nav** — sticky, logo left, links + "BOOK US" CTA button right
2. **Hero** — full-height, radial spotlight on logo, headline, two CTAs: "HIRE US FOR YOUR EVENT" (→ /book) + "SEE THE GALLERY" (→ #gallery anchor). No video asset exists; skip "Watch Us Dance" CTA.
3. **About** — two-column: copy left, photo right. Story of the company.
4. **Services** — 4-up card grid: Weddings, Parties, Corporate, Bars & Venues
5. **Gallery** — horizontal photo strip (3 photos visible, hint of more)
6. **Upcoming Events** — date card(s) for next public show(s)
7. **Bottom CTA** — "Ready to Book?" with large CTA button + phone number

### Standalone Pages

| Route | Purpose |
|---|---|
| `/book` | Primary booking form — event inquiry (name, phone, email, date, type, location, guest count, notes) |
| `/classes` | Class schedule, skill levels, what to expect. Default to "Contact for pricing" — update when client provides rates. |
| `/merch` | T-shirt product display, ordering instructions or contact to order |
| `/contact` | Phone, Facebook link, contact form |

---

## 5. Motion Plan

### Scroll Animations (Framer Motion + IntersectionObserver)

- **Hero logo:** Subtle float/parallax — logo drifts upward slightly as user scrolls down
- **Section entrance:** Each scroll section fades in + slides up 30px when entering viewport (`viewport: { once: true }`)
- **Gallery:** Photos stagger in with 0.1s delay between each image
- **Services grid:** Cards stagger in from bottom with 0.08s delay each

### Page & UI Motion

- **Page transitions:** Opacity fade + slight Y-axis wipe between Next.js routes (layout-level AnimatePresence)
- **Nav:** Animated gold underline slides in on hover for nav links
- **Book CTA button:** Gentle pulse animation on idle to draw attention
- **Booking form fields:** Fields animate in sequentially on page load (staggered 0.05s delay)
- **Form submit:** Button loading state with spinner, success state with checkmark animation

---

## 6. Booking Form Fields

```
Name*          | Phone*
Email*
Event Date*    | Event Type* (dropdown: Wedding / Birthday Party / Corporate / Bar or Venue / Other)
Event Location*| Estimated Guests
Additional Notes (textarea)
[SEND MY REQUEST →]
```

Trust strip below form:
- 24hr Response Time · Mobile (We Come To You) · Any Crowd (All Skill Levels)

Form submission: sends email via **Resend** (Next.js API route `/api/book`). Destination: `truthis@joeisblack.com`. Requires `RESEND_API_KEY` env var. No third-party form services needed.

---

## 7. Success Criteria

- [ ] All 5 routes load without errors
- [ ] Booking form submits and owner receives email notification
- [ ] All Framer Motion animations fire correctly on scroll and page load
- [ ] Page transitions work between all routes
- [ ] Site is fully responsive (desktop primary, mobile functional)
- [ ] Real photos load correctly from `/public/images/`
- [ ] Logo appears in nav, hero, and browser favicon
- [ ] No placeholder content remains in production build
