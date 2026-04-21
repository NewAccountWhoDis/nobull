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
