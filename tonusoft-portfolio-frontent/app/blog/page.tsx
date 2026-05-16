import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchFromApi } from '../../src/lib/serverApi';

export const metadata: Metadata = {
  title: 'Blog - TonuSoft',
  description: 'Read our latest blog posts on software development, technology trends, and industry insights.',
};

type BlogPost = {
  id: string;
  title: string;
  author?: string;
  excerpt?: string;
  coverUrl?: string;
  published?: boolean;
};

export default async function BlogPage() {
  const posts = await fetchFromApi<BlogPost[]>('/content/blog_posts?published=true');

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Explore our latest articles and insights on software development and technology.
        </p>

        {posts && posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
                {post.coverUrl ? (
                  <img src={post.coverUrl} alt={post.title} className="h-48 w-full object-cover" />
                ) : null}
                <div className="p-6">
                  <div className="text-xs uppercase tracking-[0.3em] text-primary">Blog post</div>
                  <h2 className="mt-3 text-2xl font-semibold">{post.title}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{post.excerpt || 'Read the latest updates from TonuSoft.'}</p>
                  <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author ?? 'TonuSoft Team'}</span>
                    <span>{post.published ? 'Published' : 'Draft'}</span>
                  </div>
                  <div className="mt-6">
                    <Link href={`/blog/${post.id}`} className="inline-flex rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
            No published blog posts found. Add content from the admin dashboard.
          </div>
        )}
      </div>
    </div>
  );
}
