"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Briefcase, Layers, LayoutDashboard, Sparkles, TrendingUp, Users, Zap, Menu, X, FileText, BriefcaseIcon, Package, Code, Star, Home } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { CrudManager } from "@/components/dashboard/crud-manager";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

type DashboardCounts = {
  products: number;
  blogPosts: number;
  careers: number;
  projects: number;
  skills: number;
  pricing: number;
};

type Category = {
  id: string;
  name: string;
};

const skillChips = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma", "Docker", "AWS", "Flutter", "Electron", "GraphQL", "Redis", "Kubernetes", "Tailwind",
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "categories", label: "Categories", icon: Layers },
  { id: "products", label: "Products", icon: Package },
  { id: "pricing", label: "Pricing", icon: Sparkles },
  { id: "skills", label: "Technology", icon: Zap },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "careers", label: "Careers", icon: BriefcaseIcon },
  { id: "projects", label: "Projects", icon: Star },
];

export default function DashboardPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const router = useRouter();
  const [counts, setCounts] = useState<DashboardCounts | null>(null);
  const [latestProducts, setLatestProducts] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!user) return;

    async function loadDashboard() {
      try {
        const [productsCount, blogCount, careersCount, projectsCount, skillsCount, pricingCount] = await Promise.all([
          api.get<{ count: number }>("/content/products/count"),
          api.get<{ count: number }>("/content/blog_posts/count?published=true"),
          api.get<{ count: number }>("/content/careers/count?is_open=true"),
          api.get<{ count: number }>("/content/projects/count?featured=true"),
          api.get<{ count: number }>("/content/skills/count"),
          api.get<{ count: number }>("/content/pricing/count"),
        ]);

        setCounts({
          products: productsCount.data.count,
          blogPosts: blogCount.data.count,
          careers: careersCount.data.count,
          projects: projectsCount.data.count,
          skills: skillsCount.data.count,
          pricing: pricingCount.data.count,
        });

        const productsList = await api.get<any[]>("/content/products");
        setLatestProducts(productsList.data.slice(0, 4).map((item) => item.name || item.title || item.label || "Untitled"));

        const categoriesList = await api.get<Category[]>("/content/categories");
        setCategories(categoriesList.data);
      } catch (error: any) {
        setFetchError(error?.message ?? "Failed to load dashboard data.");
      }
    }

    loadDashboard();
  }, [user]);

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-4">
        <div className="rounded-3xl border border-border glass-strong px-8 py-10 text-center">
          <p className="text-lg font-medium text-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl rounded-3xl border border-border glass-strong p-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Please sign in</h1>
          <p className="mb-6 text-muted-foreground">You must be logged in to view the dashboard.</p>
          <Link href="/login" className="inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl rounded-3xl border border-border glass-strong p-8 text-center"
        >
          <h1 className="text-3xl font-bold mb-4">Access denied</h1>
          <p className="mb-6 text-muted-foreground">Your account does not have permission to view this dashboard.</p>
          <button
            onClick={() => signOut()}
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
          >
            Sign out and switch account
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-screen lg:flex overflow-hidden"
      >
        {/* Sidebar */}
        <aside className={`fixed inset-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out shadow-xl lg:static lg:inset-auto lg:translate-x-0 lg:w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
          <div className="flex h-full flex-col overflow-y-auto">
            {/* Logo Section */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Link 
                href="/" 
                className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition"
              >
                <span className="text-xl">💻</span>
                <span>TonuSoft</span>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden grid h-8 w-8 place-items-center rounded-lg border border-border hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (windowWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-colors ${
                      activeSection === item.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "hover:bg-accent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    {user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate text-sm">{user?.name ?? 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email ?? 'No email'}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full rounded-xl border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden w-full lg:w-[90%] mx-auto">
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6 md:p-8">
              {/* Sidebar Toggle Button - Only Mobile */}
              <div className="mb-6 lg:hidden">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-border hover:bg-accent"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
              {activeSection === "overview" && (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold">Dashboard Overview</h1>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      Manage your portfolio content from a single admin console.
                    </p>
                  </div>

                  {fetchError && (
                    <div className="mb-6 rounded-3xl border border-destructive/20 bg-destructive/10 px-5 py-4 text-sm text-destructive">
                      {fetchError}
                    </div>
                  )}

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard icon={TrendingUp} label="Products shipped" value={counts?.products ?? 0} />
                    <StatCard icon={Sparkles} label="Live blog posts" value={counts?.blogPosts ?? 0} />
                    <StatCard icon={Briefcase} label="Open career roles" value={counts?.careers ?? 0} />
                    <StatCard icon={Zap} label="Featured projects" value={counts?.projects ?? 0} />
                    <StatCard icon={Users} label="Technology items" value={counts?.skills ?? 0} />
                    <StatCard icon={Star} label="Pricing plans" value={counts?.pricing ?? 0} />
                  </div>

                  <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-[1.4fr,0.8fr]">
                    <div className="rounded-3xl border border-border glass-strong p-6">
                      <h2 className="mb-4 text-lg sm:text-xl font-bold">Latest Products</h2>
                      <div className="space-y-3">
                        {latestProducts.length > 0 ? (
                          latestProducts.map((product, index) => (
                            <div key={index} className="flex items-center gap-3 rounded-xl border border-border p-3">
                              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Package className="h-4 w-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium line-clamp-1">{product}</span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No products yet</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-3xl border border-border glass-strong p-6">
                    <h2 className="mb-4 text-lg sm:text-xl font-bold">Technology Stack</h2>
                    <div className="flex flex-wrap gap-2">
                      {skillChips.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "categories" && (
                <CrudManager
                  table="categories"
                  title="Categories"
                  displayKey="name"
                  subKey="description"
                  fields={[
                    { name: "name", label: "Category Name", type: "text", placeholder: "e.g., SaaS, Tools, Services" },
                    { name: "description", label: "Description", type: "textarea" },
                  ]}
                />
              )}

              {activeSection === "products" && (
                <CrudManager
                  table="products"
                  title="Products"
                  displayKey="name"
                  subKey="tagline"
                  fields={[
                    { name: "name", label: "Name", type: "text" },
                    { name: "productType", label: "Product Type", type: "select", options: [
                      { label: "Company Product", value: "COMPANY" },
                      { label: "Demo Product", value: "DEMO" },
                    ]},
                    { name: "category", label: "Category", type: "select", options: categories.map(cat => ({ label: cat.name, value: cat.id })) },
                    { name: "tagline", label: "Tagline", type: "text" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "linkUrl", label: "Link URL", type: "url" },
                    { name: "imageUrl", label: "Image URL", type: "url" },
                  ]}
                />
              )}

              {activeSection === "blog" && (
                <CrudManager
                  table="blog_posts"
                  title="Blog Posts"
                  displayKey="title"
                  subKey="author"
                  fields={[
                    { name: "title", label: "Title", type: "text" },
                    { name: "author", label: "Author", type: "text" },
                    { name: "excerpt", label: "Excerpt", type: "textarea" },
                    { name: "content", label: "Content", type: "textarea" },
                    { name: "coverUrl", label: "Cover URL", type: "url" },
                    { name: "published", label: "Published", type: "checkbox" },
                  ]}
                />
              )}

              {activeSection === "careers" && (
                <CrudManager
                  table="careers"
                  title="Career Opportunities"
                  displayKey="title"
                  subKey="location"
                  fields={[
                    { name: "title", label: "Job Title", type: "text" },
                    { name: "department", label: "Department", type: "text" },
                    { name: "location", label: "Location", type: "text" },
                    { name: "type", label: "Job Type", type: "text" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "is_open", label: "Open", type: "checkbox", placeholder: "Open for applications" },
                  ]}
                />
              )}

              {activeSection === "projects" && (
                <CrudManager
                  table="projects"
                  title="Projects"
                  displayKey="title"
                  subKey="category"
                  fields={[
                    { name: "title", label: "Project Title", type: "text" },
                    { name: "category", label: "Category", type: "select", options: categories.length > 0 ? categories.map((cat) => ({ label: cat.name, value: cat.id })) : [] },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "linkUrl", label: "Project Link", type: "url" },
                    { name: "imageUrl", label: "Image URL", type: "url" },
                    { name: "featured", label: "Featured", type: "checkbox", placeholder: "Show as featured" },
                  ]}
                />
              )}

              {activeSection === "pricing" && (
                <CrudManager
                  table="pricing"
                  title="Pricing Plans"
                  displayKey="name"
                  subKey="price"
                  fields={[
                    { name: "name", label: "Plan Name", type: "text" },
                    { name: "price", label: "Price", type: "text" },
                    { name: "description", label: "Description", type: "textarea" },
                    { name: "features", label: "Features (comma or newline separated)", type: "textarea" },
                    { name: "popular", label: "Popular", type: "checkbox", placeholder: "Mark as popular" },
                  ]}
                />
              )}

              {activeSection === "skills" && (
                <CrudManager
                  table="skills"
                  title="Technology"
                  displayKey="technology"
                  subKey="level"
                  fields={[
                    { name: "technology", label: "Technology Name", type: "text" },
                    { name: "level", label: "Level", type: "text", placeholder: "e.g., Expert, Intermediate" },
                    { name: "description", label: "Description", type: "textarea" },
                  ]}
                />
              )}
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof LayoutDashboard; label: string; value: number }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}