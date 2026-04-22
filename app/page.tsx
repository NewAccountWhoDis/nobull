import { HeroSection }    from '@/components/sections/HeroSection'
import { AboutSection }   from '@/components/sections/AboutSection'
import { ServicesSection }from '@/components/sections/ServicesSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { EventsSection }  from '@/components/sections/EventsSection'
import { CtaSection }     from '@/components/sections/CtaSection'

import { connection } from 'next/server'

export default async function HomePage() {
  await connection()

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
