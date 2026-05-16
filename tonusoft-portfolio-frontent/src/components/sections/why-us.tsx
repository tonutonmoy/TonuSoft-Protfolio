"use client";

import { motion } from "framer-motion";
import { Headphones, Rocket, Shield, Sparkles, Trophy, Zap } from "lucide-react";

const items = [
  { icon: Zap, title: "Performance", desc: "Sub-second loads, edge-rendered, fanatically optimized." },
  { icon: Shield, title: "Security", desc: "Hardened by default — auth, RLS, audits, zero-trust." },
  { icon: Rocket, title: "Scalability", desc: "From MVP to millions — horizontally scalable infra." },
  { icon: Sparkles, title: "Modern UI", desc: "Pixel-perfect, accessible interfaces with motion craft." },
  { icon: Trophy, title: "Fast Delivery", desc: "Weekly releases. Ship fast without breaking things." },
  { icon: Headphones, title: "Pro Support", desc: "Dedicated engineers, SLAs and proactive monitoring." },
];

export function WhyUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Why TonuSoft</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Built for teams that <span className="text-gradient">demand more</span>
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass relative overflow-hidden rounded-2xl p-6"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
