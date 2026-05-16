"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const reviews = [
  { name: "Sarah Lin", role: "CTO, Atlas Retail", text: "TonuSoft delivered our POS rollout 3 weeks early. Performance is incredible and the design feels native everywhere." },
  { name: "Marcus Chen", role: "Founder, Northwind", text: "They rebuilt our LMS into a modern SaaS that scales effortlessly. The code quality is genuinely best-in-class." },
  { name: "Aisha Patel", role: "VP Eng, Helios HR", text: "From discovery to launch, the team operated like an extension of ours. Communication, craft, and speed — all top tier." },
  { name: "Diego Alvarez", role: "PM, Quanta AI", text: "The AI automations TonuSoft built saved our ops team 40+ hours every week. Game-changing partner." },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Testimonials</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Loved by <span className="text-gradient">modern teams</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass relative overflow-hidden rounded-3xl p-7"
            >
              <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/20" />
              <blockquote className="text-lg leading-relaxed">{r.text}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-bold text-primary-foreground">
                  {r.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
