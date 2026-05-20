"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useRef } from "react";
import { motion, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Search, X, ArrowUpRight, Sparkles, Eye } from "lucide-react";

type ProductItem = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  category?: string;
};

type Category = {
  id: string;
  name: string;
};

type ProductsClientProps = {
  products: ProductItem[];
  categories: Category[];
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

export function ProductsClient({ products, categories }: ProductsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const categoryOptions = useMemo(() => {
    const options = new Map<string, Category>();

    categories?.forEach((category) => {
      if (category.id && category.name) {
        options.set(category.id, category);
      }
    });

    products.forEach((product) => {
      const category = product.category?.trim();
      if (category && !options.has(category)) {
        options.set(category, { id: category, name: category });
      }
    });

    return Array.from(options.values());
  }, [categories, products]);

  const categoryLabel = (product: ProductItem) =>
    categoryOptions.find((category) => category.id === product.category)?.name ?? product.category ?? "Uncategorized";

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryName = categoryLabel(p).toLowerCase();
      const searchLower = searchTerm.trim().toLowerCase();

      const matchesSearch =
        searchLower === "" ||
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        categoryName.includes(searchLower);

      const matchesCategory =
        selectedCategory === "ALL" ||
        p.category === selectedCategory ||
        categoryOptions.some(
          (category) =>
            category.id === selectedCategory &&
            category.name.toLowerCase() === (p.category ?? "").toLowerCase(),
        );

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory, categoryOptions]);

  // এনিমেশন ভ্যারিয়েন্টস
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.25,
      },
    },
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

  return (
    <section className="relative py-20 overflow-hidden">
      {/* ডেকোরেটিভ ব্যাকগ্রাউন্ড */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl" />
      </div>

      {/* Pulsing ambient glow */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* হেডার সেকশন */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 backdrop-blur-sm px-4 py-1.5 mb-5 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Premium Collection</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Discover excellence in every detail
          </p>
        </motion.div>

        {/* সার্চ ও ফিল্টার */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-14"
        >
          {/* সার্চ বার */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search products by name, category, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border-0 bg-white dark:bg-card shadow-lg pl-12 pr-12 py-4 text-base outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* ক্যাটাগরি ফিল্টার */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                selectedCategory === "ALL"
                  ? "text-white"
                  : "text-foreground bg-white dark:bg-card shadow-sm hover:shadow-md"
              }`}
            >
              {selectedCategory === "ALL" && (
                <motion.span
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">All Products</span>
            </button>
            {categoryOptions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "text-white"
                    : "text-foreground bg-white dark:bg-card shadow-sm hover:shadow-md"
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-full -z-10"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* রেজাল্ট কাউন্ট */}
          <motion.div
            key={filteredProducts.length}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-8"
          >
            <p className="text-sm text-muted-foreground bg-white/50 dark:bg-card/50 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="font-bold text-foreground">{filteredProducts.length}</span>
              <span>products found</span>
            </p>
          </motion.div>
        </motion.div>

        {/* প্রোডাক্ট গ্রিড */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(product.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group"
                style={{ perspective: 800 }}
              >
                <TiltCard>
                  <Link href={`/products/${product.id}`} className="block h-full">
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

                      {/* ── Image Section ── */}
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
                            <div className="text-6xl opacity-30">🖼️</div>
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
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full"
            >
              <div className="rounded-2xl bg-white dark:bg-card shadow-xl p-16 text-center border border-gray-100 dark:border-border">
                <div className="flex flex-col items-center gap-5">
                  <div className="rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-secondary dark:to-background p-5">
                    <Search className="h-10 w-10 text-gray-400 dark:text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2 text-gray-900 dark:text-white">No products found</h3>
                    <p className="text-gray-500 dark:text-muted-foreground">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("ALL");
                    }}
                    className="rounded-xl bg-gradient-to-r from-primary to-primary/90 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
