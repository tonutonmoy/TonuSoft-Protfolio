"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  Variants,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Gamepad2,
  Package,
  Receipt,
  ShoppingBag,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

type ProductItem = {
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
};

type ProductsProps = {
  items?: ProductItem[];
};

const defaultIcons: LucideIcon[] = [
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  Layers,
  Gamepad2,
  Briefcase,
  Package,
  Receipt,
];

// ── Animation variants ──────────────────────────────────────────────────────

const labelVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const subTextVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── 3D Tilt wrapper ──────────────────────────────────────────────────────────

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 260,
    damping: 28,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export function Products({ items }: ProductsProps) {
  const productItems = items && items.length > 0 ? items.slice(0, 8) : [];

  return (
    <section id="products" className="relative py-24 overflow-hidden">
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Pulsing ambient glow */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto max-w-6xl px-6">

        {/* ── Section header ── */}
        <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <motion.div
              variants={labelVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-3"
            >
              Products
            </motion.div>
            <motion.h2
              variants={headingVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-4xl font-bold md:text-5xl leading-tight"
            >
              A suite of{" "}
              <span className="text-gradient">flagship products</span>
            </motion.h2>
          </div>

          <motion.p
            variants={subTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-md text-sm text-muted-foreground leading-relaxed"
          >
            Battle-tested platforms used by teams across retail, education,
            recruitment and commerce — built and maintained by TonuSoft.
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {productItems.length > 0 ? (
            productItems.map((product, i) => {
              const Icon = defaultIcons[i % defaultIcons.length];
              const href = product.id ? `/products/${product.id}` : "/products";

              return (
                <motion.div
                  key={product.id || `${product.name}-${i}`}
                  variants={cardVariants}
                  className="group"
                  style={{ perspective: 800 }}
                >
                  <TiltCard>
                    <Link href={href} className="block h-full">
                      <div
                        className="relative h-full flex flex-col overflow-hidden rounded-2xl"
                        style={{
                          background:
                            "linear-gradient(145deg, hsl(0 0% 10%) 0%, hsl(0 0% 7%) 100%)",
                          border: "1px solid hsl(0 0% 16%)",
                          boxShadow: "inset 0 1px 0 hsl(0 0% 18%)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {/* Hover border glow overlay */}
                        <div
                          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                          style={{
                            border: "1px solid hsl(var(--primary) / 0.5)",
                            boxShadow: "inset 0 0 48px hsl(var(--primary) / 0.05)",
                          }}
                        />

                        {/* Shimmer sweep on hover */}
                        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 overflow-hidden rounded-2xl">
                          <motion.div
                            className="absolute inset-y-0 w-[55%]"
                            style={{
                              background:
                                "linear-gradient(105deg, transparent 0%, hsl(0 0% 100% / 0.045) 50%, transparent 100%)",
                            }}
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "280%" }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                          />
                        </div>

                        {/* ── Image / Icon ── */}
                        <div
                          className="relative overflow-hidden"
                          style={{
                            aspectRatio: "16/9",
                            background:
                              "linear-gradient(135deg, hsl(0 0% 12%) 0%, hsl(0 0% 8%) 100%)",
                          }}
                        >
                          {product.imageUrl ? (
                            <>
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                loading="lazy"
                              />
                              {/* Bottom vignette */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                              {/* Primary tint on hover */}
                              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </>
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <motion.div
                                className="relative flex items-center justify-center rounded-xl"
                                whileHover={{ scale: 1.13, rotate: 4 }}
                                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                                style={{
                                  width: 56,
                                  height: 56,
                                  background:
                                    "linear-gradient(135deg, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.05) 100%)",
                                  border: "1px solid hsl(var(--primary) / 0.3)",
                                }}
                              >
                                <Icon
                                  style={{
                                    width: 24,
                                    height: 24,
                                    color: "hsl(var(--primary) / 0.85)",
                                  }}
                                />
                              </motion.div>
                            </div>
                          )}

                          {/* Numbered badge — pops in with spring */}
                          <motion.div
                            className="absolute top-3 right-3 font-mono text-[10px] leading-none px-2 py-1 rounded-md"
                            initial={{ opacity: 0, scale: 0.6 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: i * 0.07 + 0.35,
                              type: "spring",
                              stiffness: 400,
                              damping: 18,
                            }}
                            viewport={{ once: true }}
                            style={{
                              background: "hsl(0 0% 0% / 0.65)",
                              border: "1px solid hsl(0 0% 22%)",
                              color: "hsl(0 0% 46%)",
                              backdropFilter: "blur(8px)",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </motion.div>
                        </div>

                        {/* Divider */}
                        <div
                          className="h-px"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, hsl(0 0% 20%), transparent)",
                          }}
                        />

                        {/* ── Content ── */}
                        <div className="flex flex-col flex-1 p-5 gap-3">
                          <h3
                            className="font-bold text-base leading-snug line-clamp-1 transition-colors duration-300 group-hover:text-primary"
                            style={{ color: "hsl(0 0% 92%)" }}
                          >
                            {product.name}
                          </h3>

                          <p
                            className="text-[13px] leading-relaxed line-clamp-3 flex-1"
                            style={{ color: "hsl(0 0% 48%)" }}
                          >
                            {product.description ||
                              "Premium quality product with exceptional features and modern design crafted for demanding teams."}
                          </p>

                          {/* CTA row */}
                          <div className="flex items-center justify-between pt-1">
                            <motion.span
                              className="text-[11px] font-mono uppercase tracking-widest group-hover:text-primary transition-colors duration-300"
                              style={{ color: "hsl(0 0% 35%)" }}
                            >
                              View details
                            </motion.span>

                            <motion.div
                              className="flex items-center justify-center rounded-full group-hover:bg-primary group-hover:border-primary transition-colors duration-300"
                              whileHover={{ scale: 1.18 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ type: "spring", stiffness: 380, damping: 20 }}
                              style={{
                                width: 30,
                                height: 30,
                                border: "1px solid hsl(0 0% 22%)",
                                color: "hsl(0 0% 45%)",
                              }}
                            >
                              <ArrowUpRight
                                className="group-hover:text-primary-foreground transition-colors duration-300"
                                style={{ width: 14, height: 14 }}
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* Bottom accent line — spring slide */}
                        <motion.div
                          className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                          style={{
                            background:
                              "linear-gradient(to right, hsl(var(--primary) / 0.7), hsl(var(--primary)))",
                          }}
                        />
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground col-span-full">
              No products available. Add products in the admin dashboard.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}