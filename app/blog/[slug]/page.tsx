import matter from 'gray-matter';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
// 让博客页也享受 30 秒的“自动保鲜”
export const revalidate = 30; 

// 1. 核心抓取函数：拿着钥匙去 GitHub 拿文章
async function getPost(slug: string) {
  // 请把这里替换成你的 GitHub 真实用户名和仓库名！
  const url = `https://raw.githubusercontent.com/ljhhkx529/Blog/main/posts/${slug}.md`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3.raw',
    },
    next: { revalidate: 30 }
  });

  if (!res.ok) return null;

  const fileContents = await res.text();
  // 解析出头部的 SEO 数据 (frontmatter) 和正文内容 (content)
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}

// 2. 🔥 满足 SEO 要求的核心机制：动态生成 Metadata
export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  // 把 Markdown 里的数据自动喂给 Google 的爬虫
  return {
    title: `${post.frontmatter.title} | Oner Cargo Blog`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
    // Twitter 卡片等也可以在这里补充
  };
}

// 3. 页面 UI 渲染
export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-black py-12 transition-colors duration-300">
      <article className="max-w-3xl mx-auto px-6">
        {/* 头部标题区 */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
            {post.frontmatter.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span>By {post.frontmatter.author}</span>
            <span>•</span>
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
          </div>
        </header>

        {/* 正文排版区：
            prose: 开启 Tailwind 排版魔法
            dark:prose-invert: 完美适配暗色模式
        */}
        <div className="prose prose-lg prose-neutral dark:prose-invert mx-auto max-w-none">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}