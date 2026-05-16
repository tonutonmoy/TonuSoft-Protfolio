"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cpu,
  LayoutDashboard,
  Palette,
  ShoppingCart,
  Smartphone,
  Workflow,
  Globe2,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

type ServiceItem = {
  title: string;
  desc: string;
  icon?: LucideIcon;
};

type ServiceInput = {
  title: string;
  description?: string;
  icon?: string;
};

const staticServices: ServiceItem[] = [
  { icon: LayoutDashboard, title: "CRM Software Development", desc: "Pipeline, sales, support and analytics tailored to your team." },
  { icon: ShoppingCart, title: "POS Software", desc: "Fast, offline-first POS with inventory and reporting." },
  { icon: Globe2, title: "Full-Stack Web Apps", desc: "End-to-end web platforms with modern stacks." },
  { icon: Smartphone, title: "Mobile App Development", desc: "iOS, Android & cross-platform with delightful UX." },
  { icon: Boxes, title: "Desktop Applications", desc: "Native-feel desktop apps for Windows, macOS and Linux." },
  { icon: Cloud, title: "SaaS Platform Development", desc: "Multi-tenant SaaS, billing, auth and observability." },
  { icon: Palette, title: "UI/UX Design", desc: "Design systems and product interfaces that convert." },
  { icon: Code2, title: "API Development", desc: "Robust REST and GraphQL APIs, documented and versioned." },
  { icon: Cpu, title: "Cloud Integration", desc: "AWS, GCP, Azure — infra that scales with your business." },
  { icon: Workflow, title: "Custom Business Software", desc: "Bespoke tools built around your exact workflows." },
  { icon: Bot, title: "AI Automation Solutions", desc: "LLM-powered automations, agents and copilots." },
  { icon: Search, title: "SEO Optimization", desc: "Search engine optimization to boost visibility and organic traffic." },
  { icon: TrendingUp, title: "Digital Marketing", desc: "Strategic digital marketing campaigns to grow your business online." },
  { icon: Bot, title: "AI Integration", desc: "Custom AI solutions integrated into your existing systems." },
];

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  ShoppingCart,
  Globe2,
  Smartphone,
  Boxes,
  Cloud,
  Palette,
  Code2,
  Cpu,
  Workflow,
  Bot,
  Search,
  TrendingUp,
};

function resolveServiceIcon(iconName?: string) {
  return iconName && iconMap[iconName] ? iconMap[iconName] : LayoutDashboard;
}

type ServicesProps = {
  items?: ServiceInput[];
};

export function Services({ items }: ServicesProps) {
  // Always use static services, ignoring items from props
  const services = staticServices.map((item) => ({
    title: item.title,
    desc: item.desc,
    icon: item.icon,
  }));

  return (
    <section id="services" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Services</div>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Everything you need, <span className="text-gradient">end to end</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            One studio, eleven disciplines. We design, build, automate and scale modern software
            for startups and enterprises alike.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon || LayoutDashboard;
            return (
              <motion.div
                key={`${s.title}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-glow"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Explore service →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
