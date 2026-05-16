"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">About</div>
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
            A modern software studio for <span className="text-gradient">ambitious teams</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            TonuSoft is a product-first engineering team building scalable systems with modern
            architecture, automation and craft. From idea to launch, we turn complex business
            problems into beautifully engineered software.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Modern architecture, type-safe end to end",
              "Performance, security and accessibility by default",
              "Tight feedback loops, weekly shipping cadence",
              "AI-augmented workflows, human-led design",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full gradient-primary" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "5+", v: "Years of craft" },
              { k: "30+", v: "Engineers & designers" },
              { k: "98%", v: "Client retention" },
              { k: "24/7", v: "Support coverage" },
            ].map((s, i) => (
              <motion.div
                key={s.v}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6 shadow-card"
              >
                <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
