import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sawan.io',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/info',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/fortune',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/fortune/tarot',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/fortune/8ball',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/fortune/coin',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/privacy',
      lastModified: new Date(),
    },
    {
      url: 'https://sawan.io/tos',
      lastModified: new Date(),
    },
  ]
}
