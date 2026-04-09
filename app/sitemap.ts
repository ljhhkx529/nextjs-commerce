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

  // ✅ 首页与博客列表页作为固定静态路由
  const staticRoutes: SitemapItem[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8
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
          url: `${baseUrl}${product.handle}`,
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

    // ✅ 博客文章 (新增：从 GitHub 动态拉取 Markdown 列表)
    const blogPromise: Promise<SitemapItem[]> = fetch(
      // ⚠️ 记得把这里的 你的GitHub名 和 你的仓库名 替换掉！
      `https://api.github.com/repos/ljhhkx529/Blog/contents/posts`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        },
        // 缓存1小时，减轻 GitHub API 请求压力
        next: { revalidate: 3600 } 
      }
    )
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((files) => {
        if (!Array.isArray(files)) return [];
        return files
          .filter((file: any) => file.name.endsWith('.md'))
          .map((file: any) => ({
            url: `${baseUrl}/blog/${file.name.replace('.md', '')}`,
            // GitHub API 获取的 contents 列表不含最后修改时间，默认用当前时间
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6
          }));
      })
      .catch((error) => {
        console.error('⚠️ GitHub博客Sitemap拉取失败:', error);
        return []; // 容错处理：即使博客拉取失败，也不影响电商数据的生成
      });

    // 并发执行所有请求
    // ✅ 最终合并：并发拉取所有数据 + 注入博客 + 排除搜索页面
    const fetchedRoutes = (
      await Promise.all([
        collectionsPromise, 
        productsPromise, 
        pagesPromise, 
        blogPromise // 1. 确保博客文章包含在内
      ])
    )
      .flat()
      .filter((route) => {
        const url = route.url;

        // 2. 保留服务器上的修复逻辑：排除 search 相关的所有路径
        if (url.includes('/search')) return false;

        return true;
      });

    return [...staticRoutes, ...fetchedRoutes];
}