import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchFromApi } from '../../../src/lib/serverApi';

type PortfolioItem = {
  id: string;
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  linkUrl?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = await fetchFromApi<PortfolioItem>(`/content/projects/${id}`);
  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | TonuSoft Projects`,
    description: project.description || 'Project details from TonuSoft.',
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await fetchFromApi<PortfolioItem>(`/content/projects/${id}`);
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/projects" className="mb-6 inline-flex text-sm font-medium text-primary hover:text-primary/80">
          ← Back to projects
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
          <div className="space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.35em] text-primary">Project</div>
              <h1 className="mt-2 text-4xl font-semibold">{project.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{project.description || 'No project description available yet.'}</p>
            </div>

            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full rounded-3xl object-cover" />
            ) : null}

            <div className=" text-center">
           
              {project.linkUrl ? (
                <div className="rounded-3xl border border-border bg-background p-5">
                  <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Demo link</div>
                  <Link href={project.linkUrl} target="_blank" rel="noreferrer" className="mt-2 block text-lg font-semibold text-primary hover:text-primary/80">
                    Open project
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
