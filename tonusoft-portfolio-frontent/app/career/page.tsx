import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchFromApi } from '../../src/lib/serverApi';
import { createMetadata } from '../../src/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Careers - Join TonuSoft',
  description: 'Explore career opportunities at TonuSoft. Join our talented team and grow with us.',
  path: '/career',
  keywords: ['TonuSoft careers', 'software jobs', 'developer jobs'],
});

type Career = {
  id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  isOpen?: boolean;
};

export default async function CareerPage() {
  const careers = await fetchFromApi<Career[]>('/content/careers?is_open=true');

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8">Careers</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Join our team and help us build the future of software development.
        </p>

        {careers && careers.length > 0 ? (
          <div className="grid gap-6">
            {careers.map((career) => (
              <article key={career.id} className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{career.title}</h2>
                    <p className="text-sm text-muted-foreground">{career.department ?? 'General role'}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {career.location && <span>{career.location}</span>}
                    {career.type ? <span className="ml-3">{career.type}</span> : null}
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{career.description || 'No additional details provided yet.'}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="inline-flex rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                    {career.isOpen ? 'Open for applications' : 'Closed'}
                  </div>
                  <Link href={`/career/${career.id}`} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent">
                    View role details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
            No open career positions found. Add listings from the admin dashboard.
          </div>
        )}
      </div>
    </div>
  );
}
