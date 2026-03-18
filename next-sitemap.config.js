/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://olegrussian.store',
  generateRobotsTxt: true,
  
  // 🚨 核心修复：关闭索引地图生成 🚨
  // 这样它就会直接把所有链接（/t15, /search 等）写在 sitemap.xml 里
  generateIndexSitemap: false, 
  
  // 确保排除掉重复或无意义的路径
  exclude: ['/server-sitemap.xml'], 
  
  robotsTxtOptions: {
    additionalSitemaps: [
      // 既然关掉了索引，这里就不需要再额外添加自己了
    ],
  },
}