import { MetadataRoute } from 'next';
import articlesData from '@/data/articles.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog-informativo-seo.vercel.app';

  const articleUrls: MetadataRoute.Sitemap = articlesData.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...articleUrls,
  ];
}