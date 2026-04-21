import Navbar from 'components/layout/navbar';
import { ensureStartsWith } from 'lib/utils';
import { Inter } from 'next/font/google';
import Script from 'next/script'; // 引入 Next.js 优化的脚本组件
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = 'https://olegrussian.store';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`
  },
  description: 'Cheaper and safer marine equipment, delivered worldwide.',
  // 这行也是控制 Google 显示名字的关键
  openGraph: {
    siteName: SITE_NAME!
  },
  robots: {
    follow: true,
    index: true
  },
    // 1. 在这里添加验证信息
  verification: {
    yandex: 'be92de15e9967681',
      other: {
    'ahrefs-site-verification': 'fbf6fe6d922f3ffe776b06cec04ba65861270c657f5ef43d706e5a10652b5722',
  },
    // google: '这里可以放你的 Google GSC 验证码', 
  },

  // ✅ 加这一段（核心）
  alternates: {
    canonical: '/'
  },

  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite
      }
    })
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
                {/* ✅ 添加 Ahrefs 统计脚本 */}
        <Script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="aewmjkaynpCAVDKd5Mtq3A" 
          strategy="afterInteractive" // 性能优化：在页面交互后再加载
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "China Outboards Store",
              "url": "https://olegrussian.store"
            })
          }}
        />

        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
