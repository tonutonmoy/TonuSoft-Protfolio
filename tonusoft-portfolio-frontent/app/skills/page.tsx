import { Skills } from "../../src/components/sections/skills";
import { fetchFromApi } from "../../src/lib/serverApi";

export const metadata = {
  title: "TonuSoft Technology",
  description: "View the technologies that shape TonuSoft's software and product development.",
};

export default async function SkillsPage() {
  const skillsData = await fetchFromApi<any[]>('/content/skills');

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Technology</h1>
        <Skills items={skillsData ?? undefined} />
      </div>
    </div>
  );
}
