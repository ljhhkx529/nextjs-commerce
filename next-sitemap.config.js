/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://olegrussian.store',
  generateRobotsTxt: true, 
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*', // 对所有爬虫生效
        allow: '/',     // 允许抓取首页和公共页面
        disallow: [
          '/api/*',     // 禁止抓取后端接口（安全考虑）
          '/admin/*',   // 禁止抓取管理后台
          '/private/*', // 禁止抓取私密文件夹
          '/*.json$',   // 禁止抓取配置文件
        ],
      },
      {
        userAgent: 'GPTBot', // 针对 AI 爬虫（如果你不想让你的内容被拿去训练）
        disallow: ['/'],     // 可以选择禁止
      },
    ],
    additionalSitemaps: [
      'https://olegrussian.store/sitemap.xml',
    ],
  },
}
