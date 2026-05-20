import type { MetadataRoute } from 'next';
import { absoluteUrl, siteUrl } from '../src/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/login', '/signup'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
