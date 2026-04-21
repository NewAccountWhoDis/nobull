import { HeroSection }    from '@/components/sections/HeroSection'
import { AboutSection }   from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
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
