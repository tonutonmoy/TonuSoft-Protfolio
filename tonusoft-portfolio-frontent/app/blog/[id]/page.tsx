import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';
import { createMetadata } from '../../../src/lib/seo';

type BlogPost = {
  id: string;
  title: string;
  author?: string;
  excerpt?: string;
  content?: string;
  coverUrl?: string;
  published?: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchFromApi<BlogPost>(`/content/blog_posts/${id}`);
  if (!post) {
    return { title: 'Blog Post Not Found' };
  }

  return createMetadata({
    title: `${post.title} | TonuSoft Blog`,
    description: post.excerpt || 'Read the latest story from TonuSoft.',
    path: `/blog/${post.id}`,
    image: post.coverUrl,
    type: 'article',
    keywords: [post.title, post.author ?? 'TonuSoft Team', 'TonuSoft blog'],
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchFromApi<BlogPost>(`/content/blog_posts/${id}`);
  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/blog" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to blog
        </Link>

        <article className="space-y-8 rounded-3xl border border-border bg-card p-8 shadow-card">
          {post.coverUrl ? (
            <img src={post.coverUrl} alt={post.title} className="w-full rounded-3xl object-cover" />
          ) : null}

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-primary">Blog post</div>
              <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {post.author ?? 'TonuSoft Team'} · {post.published ? 'Published' : 'Draft'}
              </p>
            </div>

            <div className="prose max-w-none text-muted-foreground">
              {post.content ? (
                <div>{post.content}</div>
              ) : (
                <p>No additional content is available yet for this article.</p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
