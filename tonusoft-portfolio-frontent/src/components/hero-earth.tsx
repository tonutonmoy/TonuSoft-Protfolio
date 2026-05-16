"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Monitor,
  Megaphone,
  Brain,
  Cloud,
  ShoppingCart,
  Database,
  Palette,
  Cpu,
} from "lucide-react";

const orbits = [
  { label: "Web Apps", Icon: Globe, r: 220, dur: 28, offset: 0 },
  { label: "Mobile Apps", Icon: Smartphone, r: 220, dur: 28, offset: 120 },
  { label: "Desktop Dev", Icon: Monitor, r: 220, dur: 28, offset: 240 },
  { label: "Digital Marketing", Icon: Megaphone, r: 320, dur: 40, offset: 0 },
  { label: "AI Solutions", Icon: Brain, r: 320, dur: 40, offset: 90 },
  { label: "Cloud / DevOps", Icon: Cloud, r: 320, dur: 40, offset: 180 },
  { label: "POS / E-Com", Icon: ShoppingCart, r: 320, dur: 40, offset: 270 },
  { label: "CRM / SaaS", Icon: Database, r: 420, dur: 55, offset: 60 },
  { label: "UI / UX Design", Icon: Palette, r: 420, dur: 55, offset: 200 },
  { label: "IoT & Embedded", Icon: Cpu, r: 420, dur: 55, offset: 320 },
];

export function HeroEarth() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Outer red glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {/* Orbit rings */}
        {[220, 320, 420].map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-primary/15"
            style={{
              width: r * 2,
              height: r * 2,
              left: -r,
              top: -r,
            }}
          />
        ))}

        {/* The Earth */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-64 md:w-64"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.85 0.18 22), oklch(0.55 0.26 22) 45%, oklch(0.25 0.15 22) 100%)",
            boxShadow:
              "0 0 80px 10px oklch(0.62 0.245 22 / 0.45), inset -20px -30px 60px oklch(0.15 0.08 22 / 0.8), inset 12px 14px 40px oklch(1 0 0 / 0.18)",
          }}
        >
          {/* continents — abstract */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-60">
            <defs>
              <radialGradient id="c" cx="30%" cy="30%" r="80%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="100" fill="url(#c)" />
            <g fill="oklch(0.18 0.05 22)" opacity="0.55">
              <path d="M30 80 q15 -25 40 -10 q20 12 5 30 q-20 22 -45 5 z" />
              <path d="M110 50 q25 5 35 25 q5 25 -20 30 q-30 5 -25 -25 z" />
              <path d="M70 130 q25 -10 50 5 q15 18 -10 30 q-30 12 -45 -10 z" />
              <path d="M150 110 q15 0 18 18 q-2 18 -20 12 z" />
            </g>
          </svg>

          {/* meridian shine */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(115deg, transparent 40%, oklch(1 0 0 / 0.18) 50%, transparent 60%)",
            }}
          />
        </motion.div>

        {/* Orbiting service chips */}
        {orbits.map(({ label, Icon, r, dur, offset }) => (
          <motion.div
            key={label}
            className="absolute left-0 top-0"
            style={{ width: 0, height: 0 }}
            initial={{ rotate: offset }}
            animate={{ rotate: offset + 360 }}
            transition={{ duration: dur, ease: "linear", repeat: Infinity }}
          >
            <div style={{ transform: `translate(${r}px, 0)` }}>
              <motion.div
                animate={{ rotate: -(offset + 360) }}
                transition={{ duration: dur, ease: "linear", repeat: Infinity }}
                className="glass -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-medium shadow-glow backdrop-blur"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="hidden whitespace-nowrap sm:inline">{label}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
