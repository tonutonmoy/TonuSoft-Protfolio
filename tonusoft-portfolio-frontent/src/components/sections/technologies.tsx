type TechItem = {
  technology?: string;
  name?: string;
};

type TechnologiesProps = {
  items?: TechItem[];
};

export function Technologies({ items }: TechnologiesProps) {
  // Only use API data, no defaults
  const techs =
    items && items.length > 0
      ? items.map((item) => item.technology ?? item.name ?? "Unknown").filter(Boolean)
      : [];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Stack</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Modern technologies, <span className="text-gradient">battle tested</span>
          </h2>
        </div>

        {techs.length > 0 ? (
          <>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
              <div className="flex w-max marquee gap-3">
                {[...techs, ...techs].map((t, i) => (
                  <span
                    key={i}
                    className="glass rounded-full px-5 py-3 font-mono text-sm whitespace-nowrap"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {techs.slice(0, 8).map((t) => (
                <div
                  key={t}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-center text-sm font-mono transition-all hover:border-primary/40 hover:shadow-glow"
                >
                  <span className="absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  {t}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No technologies available. Add technology data in the admin dashboard.
          </div>
        )}
      </div>
    </section>
  );
}
