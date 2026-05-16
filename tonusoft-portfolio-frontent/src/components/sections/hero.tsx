"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { HeroEarth } from "../hero-earth";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-52 md:pb-40">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 gradient-mesh" />
      <HeroEarth />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-4xl flex-col items-center text-center"
        >
          <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="font-mono uppercase tracking-widest text-muted-foreground">
              Software studio · est. 2021
            </span>
          </div>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Building <span className="text-gradient">Future-Ready</span>
            <br />
            Software Solutions
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            TonuSoft engineers scalable digital products — CRM, POS, SaaS, mobile and
            AI-powered platforms — for teams who refuse to ship anything ordinary.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.04]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent"
            >
              View Products
            </Link>
          </div>

        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4"
        >
          {[
            { k: "120+", v: "Products shipped" },
            { k: "40+", v: "Global clients" },
            { k: "99.9%", v: "Uptime delivered" },
            { k: "12", v: "Industries served" },
          ].map((s) => (
            <div key={s.v} className="bg-background/80 p-6 text-center backdrop-blur">
              <div className="font-display text-3xl font-bold text-gradient">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
