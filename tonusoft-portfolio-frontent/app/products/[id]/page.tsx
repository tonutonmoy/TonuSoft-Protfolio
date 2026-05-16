import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';

type Product = {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  productType?: 'DEMO' | 'COMPANY';
  category?: string;
  imageUrl?: string;
  linkUrl?: string;
};

type Category = {
  id: string;
  name: string;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchFromApi<Product>(`/content/products/${id}`);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | TonuSoft Product`,
    description: product.tagline || product.description || 'Product details at TonuSoft.',
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchFromApi<Product>(`/content/products/${id}`);
  if (!product) {
    notFound();
  }

  const category = product.category
    ? await fetchFromApi<Category>(`/content/categories/${product.category}`)
    : null;

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/products" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to products
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div className="space-y-6 rounded-3xl border border-border bg-card p-8 shadow-card">
            <div className="space-y-3">
              <div className="text-xs uppercase tracking-[0.35em] text-primary">Product</div>
              <h1 className="text-4xl font-semibold">{product.name}</h1>
              {product.tagline ? <p className="text-lg text-muted-foreground">{product.tagline}</p> : null}
            </div>

            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full rounded-3xl object-cover" />
            ) : null}

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{product.description || 'No description available for this product yet.'}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background p-4">
                <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Type</div>
                <div className="mt-2 font-semibold">{product.productType ?? 'Company'}</div>
              </div>
              <div className="rounded-3xl border border-border bg-background p-4">
                <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Category</div>
                <div className="mt-2 font-semibold">{category?.name ?? 'Uncategorized'}</div>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            {product.linkUrl ? (
              <Link
                href={product.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-3xl border border-border bg-primary/10 px-6 py-4 text-center text-sm font-semibold text-primary transition hover:bg-primary/20"
              >
                Visit product page
              </Link>
            ) : null}

       
          </aside>
        </div>
      </div>
    </div>
  );
}
