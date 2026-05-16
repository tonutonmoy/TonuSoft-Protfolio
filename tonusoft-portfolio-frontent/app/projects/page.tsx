import { Portfolio } from "../../src/components/sections/portfolio";
import { fetchFromApi } from "../../src/lib/serverApi";

export const metadata = {
  title: "TonuSoft Projects",
  description: "See TonuSoft project work, real-world case studies and featured portfolio items.",
};

export default async function ProjectsPage() {
  const [projectsData, categoriesData] = await Promise.all([
    fetchFromApi<any[]>('/content/projects'),
    fetchFromApi<any[]>('/content/categories'),
  ]);

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
        <Portfolio items={projectsData ?? undefined} categories={categoriesData ?? undefined} />
      </div>
    </div>
  );
}
