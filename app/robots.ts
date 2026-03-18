import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://olegrussian.store';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin', '/checkout']
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}