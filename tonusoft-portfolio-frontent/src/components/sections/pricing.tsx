"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

type PricingItem = {
  id?: string;
  name: string;
  price?: string;
  description?: string;
  features?: string[];
  popular?: boolean;
};

type PricingProps = {
  items?: PricingItem[];
};

export function Pricing({ items }: PricingProps) {
  const tiers = items && items.length > 0 ? items : [];

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Pricing</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Transparent <span className="text-gradient">engagement plans</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {tiers.length > 0 ? (
            tiers.map((tier, index) => (
              <motion.div
                key={`${tier.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`relative overflow-hidden rounded-3xl border p-7 shadow-card ${
                  tier.popular
                    ? "border-primary/50 bg-card shadow-glow"
                    : "border-border bg-card"
                }`}
              >
                {tier.popular && (
                  <span className="absolute right-5 top-5 rounded-full gradient-primary px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-primary-foreground shadow-glow">
                    Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-gradient">{tier.price ?? 'Custom'}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {(tier.features ?? []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full gradient-primary">
                        <Check className="h-2.5 w-2.5 text-primary-foreground" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.id ? (
                  <Link
                    href={`/pricing/${tier.id}`}
                    className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                      tier.popular
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "border border-border bg-secondary text-foreground hover:bg-accent"
                    }`}
                  >
                    Choose {tier.name}
                  </Link>
                ) : (
                  <span
                    className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${
                      tier.popular
                        ? "gradient-primary text-primary-foreground shadow-glow"
                        : "border border-border bg-secondary text-foreground"
                    }`}
                  >
                    Choose {tier.name}
                  </span>
                )}
              </motion.div>
            ))
          ) : (
            <div className="rounded-3xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No pricing plans available. Add pricing entries in the admin dashboard.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
