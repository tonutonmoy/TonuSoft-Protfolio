import type { Metadata } from 'next';

const DEFAULT_SITE_URL = 'https://tonusoft.com';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, '');

export const siteConfig = {
  name: 'TonuSoft',
  title: 'TonuSoft - Software Development Company',
  description:
    'TonuSoft builds web apps, mobile apps, SaaS products, dashboards, automation tools, and custom software for growing businesses.',
  keywords: [
    'TonuSoft',
    'software development company',
    'web development',
    'mobile app development',
    'SaaS development',
    'custom software',
    'Bangladesh software company',
    'portfolio',
  ],
};

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string | null;
  type?: 'website' | 'article';
  keywords?: string[];
};

export function createMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = '/',
  image,
  type = 'website',
  keywords = [],
}: SeoInput = {}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image?.startsWith('http') ? image : image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
    },
    twitter: {
      card: imageUrl ? 'summary_large_image' : 'summary',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
