import type { MetadataRoute } from 'next'

const SITE_URL = 'https://nobulllinedancers.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/book', '/classes', '/contact', '/merch']

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'monthly' : 'yearly',
    priority: route === '' ? 1 : 0.8,
  }))
}
