/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        hostname: process.env.BIGCOMMERCE_CDN_HOSTNAME ?? '*.bigcommerce.com'
      }
    ]
  },
  async redirects() {
    return [
      // ✅ 强制 www → 非www（核心）
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.olegrussian.store'
          }
        ],
        destination: 'https://olegrussian.store/:path*',
        permanent: true
      },

      // 你原本的规则（保留）
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};