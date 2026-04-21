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
    'No Bull Line Dancers brings mobile line dancing to weddings, parties, corporate events, and bars from Forestport, NY across Hudson Valley and Upstate NY.',
  metadataBase: new URL('https://nobulllinedancers.com'),
  openGraph: {
    title: 'No Bull Line Dancers | Mobile Line Dancing for Events',
    description:
      'Mobile line dancing for weddings, parties, venues, and corporate events in Hudson Valley and Upstate NY.',
    url: '/',
    siteName: 'No Bull Line Dancers',
    images: [
      {
        url: '/images/logo1.jpg',
        width: 1021,
        height: 1049,
        alt: 'No Bull Line Dancers logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'No Bull Line Dancers | Mobile Line Dancing for Events',
    description:
      'Mobile line dancing for weddings, parties, venues, and corporate events in Hudson Valley and Upstate NY.',
    images: ['/images/logo1.jpg'],
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'No Bull Line Dancers',
  description:
    'Mobile line dancing instruction for weddings, parties, bars, venues, and corporate events.',
  telephone: '+1-845-416-3403',
  url: 'https://nobulllinedancers.com',
  image: 'https://nobulllinedancers.com/images/logo1.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Forestport',
    addressRegion: 'NY',
    addressCountry: 'US',
  },
  areaServed: [
    'Forestport NY',
    'Hudson Valley NY',
    'Upstate NY',
  ],
  sameAs: ['https://www.facebook.com/profile.php?id=61573169872550'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Nav />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  )
}
