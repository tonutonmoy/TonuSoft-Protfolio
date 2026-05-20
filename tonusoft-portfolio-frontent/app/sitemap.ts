import { MetadataRoute } from 'next';
import { fetchFromApi } from '../src/lib/serverApi';
import { absoluteUrl } from '../src/lib/seo';

type SitemapItem = {
  id: string;
  updatedAt?: string;
  createdAt?: string;
};

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified?: string,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : new Date(),
    changeFrequency,
    priority,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, projects, blogPosts, careers, skills, pricing] = await Promise.all([
    fetchFromApi<SitemapItem[]>('/content/products'),
    fetchFromApi<SitemapItem[]>('/content/projects'),
    fetchFromApi<SitemapItem[]>('/content/blog_posts?published=true'),
    fetchFromApi<SitemapItem[]>('/content/careers?is_open=true'),
    fetchFromApi<SitemapItem[]>('/content/skills'),
    fetchFromApi<SitemapItem[]>('/content/pricing'),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    entry('/home', 0.9, 'weekly'),
    entry('/about', 0.7, 'monthly'),
    entry('/services', 0.9, 'weekly'),
    entry('/products', 0.9, 'daily'),
    entry('/projects', 0.85, 'daily'),
    entry('/blog', 0.8, 'daily'),
    entry('/career', 0.75, 'daily'),
    entry('/skills', 0.7, 'weekly'),
    entry('/technology', 0.7, 'weekly'),
    entry('/pricing', 0.7, 'weekly'),
    entry('/contact', 0.7, 'monthly'),
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...(products ?? []).map((item) => entry(`/products/${item.id}`, 0.8, 'daily', item.updatedAt ?? item.createdAt)),
    ...(projects ?? []).map((item) => entry(`/projects/${item.id}`, 0.75, 'daily', item.updatedAt ?? item.createdAt)),
    ...(blogPosts ?? []).map((item) => entry(`/blog/${item.id}`, 0.7, 'daily', item.updatedAt ?? item.createdAt)),
    ...(careers ?? []).map((item) => entry(`/career/${item.id}`, 0.65, 'daily', item.updatedAt ?? item.createdAt)),
    ...(skills ?? []).map((item) => entry(`/skills/${item.id}`, 0.6, 'weekly', item.updatedAt ?? item.createdAt)),
    ...(pricing ?? []).map((item) => entry(`/pricing/${item.id}`, 0.6, 'weekly', item.updatedAt ?? item.createdAt)),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
