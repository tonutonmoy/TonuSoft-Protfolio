"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type PortfolioItem = {
  id?: string;
  title: string;
  category?: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  color?: string;
};

type Category = {
  id: string;
  name: string;
};

type PortfolioProps = {
  items?: PortfolioItem[];
  categories?: Category[];
};

export function Portfolio({ items, categories }: PortfolioProps) {
  const projects = items && items.length > 0 ? items : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categoryOptions = useMemo(() => {
    const options = new Map<string, Category>();

    categories?.forEach((category) => {
      if (category.id && category.name) {
        options.set(category.id, category);
      }
    });

    projects.forEach((project) => {
      const category = project.category?.trim();
      if (category && !options.has(category)) {
        options.set(category, { id: category, name: category });
      }
    });

    return Array.from(options.values());
  }, [categories, projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        project.category === selectedCategory ||
        project.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        categoryOptions.find(
          (category) =>
            category.id === selectedCategory &&
            category.name.toLowerCase() === (project.category ?? "").toLowerCase(),
        );

      const searchLower = searchTerm.trim().toLowerCase();
      const categoryLabel =
        categoryOptions.find((category) => category.id === project.category)?.name ?? project.category ?? "";
      const matchesSearch =
        searchLower === "" ||
        project.title.toLowerCase().includes(searchLower) ||
        (project.description ?? "").toLowerCase().includes(searchLower) ||
        categoryLabel.toLowerCase().includes(searchLower);

      return matchesCategory && matchesSearch;
    });
  }, [projects, searchTerm, selectedCategory, categoryOptions]);

  const categoryLabel = (project: PortfolioItem) =>
    categoryOptions.find((category) => category.id === project.category)?.name ?? project.category ?? "Uncategorized";

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Portfolio</div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Selected <span className="text-gradient">case studies</span>
            </h2>
          </div>
          {categoryOptions.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-[1.4fr,1fr]">
              <label className="block">
                <span className="text-sm font-medium text-muted-foreground">Search projects</span>
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, category, or description"
                  className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-muted-foreground">Filter by category</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  <option value="ALL">All categories</option>
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p, i) => {
              const href = p.id ? `/projects/${p.id}` : p.linkUrl ?? "#";
              const target = p.id ? undefined : p.linkUrl ? "_blank" : undefined;
              const rel = p.id ? undefined : p.linkUrl ? "noopener noreferrer" : undefined;

              return (
                <motion.div
                  key={`${p.title}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative block overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  <Link href={href} target={target} rel={rel} className="absolute inset-0 z-10" />
                  
                  {/* ইমেজ সেকশন - আপডেটেড */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500 to-slate-700">
                    {p.imageUrl ? (
                      <>
                        <Image
                          src={p.imageUrl}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* ওভারলে */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <div className="absolute inset-0 noise" />
                        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/80 p-3 backdrop-blur">
                          <div className="flex h-2 gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                            <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                          </div>
                          <div className="mt-2 grid grid-cols-3 gap-1.5">
                            <div className="h-6 rounded bg-muted" />
                            <div className="h-6 rounded bg-muted" />
                            <div className="h-6 rounded bg-primary/30" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {categoryLabel(p)}
                      </div>
                      <h3 className="mt-1 font-display text-xl font-semibold">{p.title}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground transition-transform group-hover:translate-x-1">View →</span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No projects match your current search and filter. Try another category or search term.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
