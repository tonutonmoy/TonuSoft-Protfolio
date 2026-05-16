import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';

type Career = {
  id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  isOpen?: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const career = await fetchFromApi<Career>(`/content/careers/${id}`);
  if (!career) {
    return { title: 'Career Not Found' };
  }

  return {
    title: `${career.title} | TonuSoft Careers`,
    description: career.description || 'Career opportunity details at TonuSoft.',
  };
}

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const career = await fetchFromApi<Career>(`/content/careers/${id}`);
  if (!career) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/career" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to careers
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-primary">Career opportunity</div>
              <h1 className="text-4xl font-semibold">{career.title}</h1>
              <div className="mt-2 text-sm text-muted-foreground">
                {career.department ? `${career.department} · ` : ''}
                {career.location ?? 'Remote / Location flexible'}
                {career.type ? ` · ${career.type}` : ''}
              </div>
            </div>

            <p className="text-lg leading-8 text-muted-foreground">
              {career.description || 'No additional description available for this role yet.'}
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl border border-border bg-background p-5">
                <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Status</div>
                <div className="mt-2 text-lg font-semibold">{career.isOpen ? 'Open' : 'Closed'}</div>
              </div>
              <div className="rounded-3xl border border-border bg-background p-5">
                <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Role ID</div>
                <div className="mt-2 text-lg font-semibold">{career.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
