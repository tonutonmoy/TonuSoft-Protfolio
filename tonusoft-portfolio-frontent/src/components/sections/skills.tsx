"use client";

import Link from "next/link";

type SkillItem = {
  id?: string;
  technology?: string;
  name?: string;
  level?: string;
  description?: string;
};

type SkillsProps = {
  items?: SkillItem[];
};

export function Skills({ items }: SkillsProps) {
  const skills = items && items.length > 0 ? items : [];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Technology</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Technical <span className="text-gradient">expertise</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-muted-foreground">
            Explore the technology and capabilities that power our product and service development.
          </p>
        </div>

        {skills.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <Link
                key={`${skill.technology ?? skill.name ?? index}`}
                href={skill.id ? `/skills/${skill.id}` : "/technology"}
                className="group block rounded-3xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">{skill.level ?? "Technology"}</div>
                <h3 className="text-xl font-semibold">{skill.technology ?? skill.name ?? "Untitled"}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{skill.description ?? "No description provided."}</p>
                <div className="mt-6 text-sm font-medium text-primary transition-opacity opacity-0 group-hover:opacity-100">
                  View skill details →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No technology data available. Add technology items in the admin dashboard.
          </div>
        )}
      </div>
    </section>
  );
}
