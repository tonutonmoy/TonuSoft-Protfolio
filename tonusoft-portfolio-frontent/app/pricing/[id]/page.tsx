import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';

type PricingPlan = {
  id: string;
  name: string;
  price?: string;
  description?: string;
  features?: string[];
  popular?: boolean;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const plan = await fetchFromApi<PricingPlan>(`/content/pricing/${id}`);
  if (!plan) {
    return { title: 'Pricing Plan Not Found' };
  }

  return {
    title: `${plan.name} | TonuSoft Pricing`,
    description: plan.description || 'Pricing plan details at TonuSoft.',
  };
}

export default async function PricingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await fetchFromApi<PricingPlan>(`/content/pricing/${id}`);
  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/pricing" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to pricing
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.35em] text-primary">Pricing plan</div>
            <h1 className="text-4xl font-semibold">{plan.name}</h1>
            {plan.price ? <p className="text-2xl font-bold text-gradient">{plan.price}</p> : null}
            {plan.description ? <p className="text-lg text-muted-foreground">{plan.description}</p> : null}
          </div>

          {plan.features && plan.features.length > 0 ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <div key={feature} className="rounded-3xl border border-border bg-background p-5 text-sm text-muted-foreground">
                  {feature}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-border bg-background p-5 text-sm text-muted-foreground">
              No feature details available for this plan.
            </div>
          )}

          <div className="mt-8 rounded-3xl border border-border bg-background p-5 text-sm text-muted-foreground">
            <div className="font-medium">Plan status</div>
            <p className="mt-2">{plan.popular ? 'Popular plan' : 'Standard plan'}</p>
            <div className="mt-4 font-medium">Plan ID</div>
            <p className="mt-2">{plan.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
