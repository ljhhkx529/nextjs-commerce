import matter from 'gray-matter';
import Link from 'next/link';

export const revalidate = 3600; // 每小时更新一次列表

async function getPosts() {
  // 1. 获取 GitHub 目录下的文件列表
  const res = await fetch(
    `https://api.github.com/repos/ljhhkx529/Blog/contents/posts`,
    {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json'
      }
    }
  );

  if (!res.ok) return [];

  const files = await res.json();
  const posts = await Promise.all(
    files
      .filter((file: any) => file.name.endsWith('.md'))
      .map(async (file: any) => {
        // 2. 依次抓取每个文件的内容以获取标题和日期
        const contentRes = await fetch(file.download_url);
        const contentText = await contentRes.text();
        const { data } = matter(contentText);
        return {
          slug: file.name.replace('.md', ''),
          title: data.title || file.name,
          date: data.date || '2026-04-10',
          description: data.description || ''
        };
      })
  );

  // 按日期倒序排列
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogListPage() {
  const posts = await getPosts();

  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-extrabold mb-12 text-center">Latest Updates</h1>
      
      <div className="grid gap-8">
        {posts.map((post) => (
          <Link 
            key={post.slug} 
            href={`/blog/${post.slug}`}
            className="group block p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-all"
          >
            <article>
              <span className="text-sm text-neutral-500">{post.date}</span>
              <h2 className="text-2xl font-bold mt-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-neutral-600 dark:text-neutral-400 mt-3 line-clamp-2">
                  {post.description}
                </p>
              )}
              <div className="mt-4 text-blue-500 font-medium inline-flex items-center">
                Read More 
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-center text-neutral-500 mt-20">No posts found yet.</p>
      )}
    </div>
  );
}