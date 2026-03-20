import { getCollections, getPages, getProducts } from 'lib/bigcommerce';
import { validateEnvironmentVariables } from 'lib/utils';
import { MetadataRoute } from 'next';

// ✅ 直接用官方类型（避免你自定义出错）
type SitemapItem = MetadataRoute.Sitemap[number];

// ✅ 主域名（生产必须写死或用 ENV）
const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://olegrussian.store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  validateEnvironmentVariables();

  // ✅ 首页
  const staticRoutes: SitemapItem[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    }
  ];

  try {
    // ✅ 分类
    const collectionsPromise: Promise<SitemapItem[]> = getCollections().then(
      (collections) =>
        collections.map((collection) => ({
          url: `${baseUrl}${collection.path}`,
          lastModified: new Date(collection.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.9
        }))
    );

    // ✅ 产品（重点）
    const productsPromise: Promise<SitemapItem[]> = getProducts({}).then(
      (products) =>
        products.map((product) => ({
          // ⚠️ 根据你路由结构决定
          url: `${baseUrl}/product${product.handle}`,
          lastModified: new Date(product.updatedAt),
          changeFrequency: 'weekly',
          priority: 0.8
        }))
    );

    // ✅ 页面
    const pagesPromise: Promise<SitemapItem[]> = getPages().then((pages) =>
      pages.map((page) => ({
        url: `${baseUrl}/${page.handle}`,
        lastModified: new Date(page.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7
      }))
    );

    const fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();

    return [...staticRoutes, ...fetchedRoutes];
  } catch (error) {
    console.error('❌ Sitemap生成失败:', error);

    // 👉 出错至少保证首页还能被收录
    return staticRoutes;
  }
}