import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';

type SkillItem = {
  id: string;
  technology?: string;
  name?: string;
  level?: string;
  description?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const skill = await fetchFromApi<SkillItem>(`/content/skills/${id}`);
  if (!skill) {
    return { title: 'Technology Item Not Found' };
  }

  return {
    title: `${skill.technology ?? skill.name ?? 'Technology'} | TonuSoft`,
    description: skill.description || 'Technology item details from TonuSoft.',
  };
}

export default async function SkillDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await fetchFromApi<SkillItem>(`/content/skills/${id}`);
  if (!skill) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-5xl px-6">
        <Link href="/technology" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to technology
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-[0.35em] text-primary">Technology</div>
            <h1 className="text-4xl font-semibold">{skill.technology ?? skill.name ?? 'Unknown technology'}</h1>
            {skill.level ? <p className="text-lg text-muted-foreground">Level: {skill.level}</p> : null}
            {skill.description ? <p className="text-sm leading-7 text-muted-foreground">{skill.description}</p> : <p className="text-sm text-muted-foreground">No additional details are available for this item.</p>}
          </div>

       
        </div>
      </div>
    </div>
  );
}
