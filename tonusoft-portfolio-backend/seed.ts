import prisma from './src/app/utils/prisma';

const servicesData = [
  {
    title: "CRM Software Development",
    description: "Pipeline, sales, support and analytics tailored to your team.",
    icon: "LayoutDashboard",
  },
  {
    title: "POS Software",
    description: "Fast, offline-first POS with inventory and reporting.",
    icon: "ShoppingCart",
  },
  {
    title: "Full-Stack Web Apps",
    description: "End-to-end web platforms with modern stacks.",
    icon: "Globe2",
  },
  {
    title: "Mobile App Development",
    description: "iOS, Android & cross-platform with delightful UX.",
    icon: "Smartphone",
  },
  {
    title: "Desktop Applications",
    description: "Native-feel desktop apps for Windows, macOS and Linux.",
    icon: "Boxes",
  },
  {
    title: "SaaS Platform Development",
    description: "Multi-tenant SaaS, billing, auth and observability.",
    icon: "Cloud",
  },
  {
    title: "UI/UX Design",
    description: "Design systems and product interfaces that convert.",
    icon: "Palette",
  },
  {
    title: "API Development",
    description: "Robust REST and GraphQL APIs, documented and versioned.",
    icon: "Code2",
  },
  {
    title: "Cloud Integration",
    description: "AWS, GCP, Azure — infra that scales with your business.",
    icon: "Cpu",
  },
  {
    title: "Custom Business Software",
    description: "Bespoke tools built around your exact workflows.",
    icon: "Workflow",
  },
  {
    title: "AI Automation Solutions",
    description: "LLM-powered automations, agents and copilots.",
    icon: "Bot",
  },
  {
    title: "SEO Optimization",
    description: "Search engine optimization to boost visibility and organic traffic.",
    icon: "Search",
  },
  {
    title: "Digital Marketing",
    description: "Strategic digital marketing campaigns to grow your business online.",
    icon: "TrendingUp",
  },
];

const skillsData = [
  { technology: "React", level: "Expert", description: "Modern UI library for building interactive applications" },
  { technology: "Next.js", level: "Expert", description: "React framework for production-grade applications" },
  { technology: "TypeScript", level: "Expert", description: "Typed superset of JavaScript for safer code" },
  { technology: "Node.js", level: "Expert", description: "JavaScript runtime for server-side development" },
  { technology: "Express", level: "Expert", description: "Minimal and flexible web application framework" },
  { technology: "MongoDB", level: "Expert", description: "NoSQL database for flexible data storage" },
  { technology: "Prisma", level: "Expert", description: "Modern ORM for database access" },
  { technology: "PostgreSQL", level: "Advanced", description: "Powerful open-source relational database" },
  { technology: "Docker", level: "Advanced", description: "Container platform for application deployment" },
  { technology: "AWS", level: "Advanced", description: "Cloud computing services for scalability" },
  { technology: "Flutter", level: "Advanced", description: "Cross-platform mobile development framework" },
  { technology: "Electron", level: "Intermediate", description: "Framework for desktop application development" },
  { technology: "GraphQL", level: "Advanced", description: "Query language for APIs" },
  { technology: "Redis", level: "Intermediate", description: "In-memory data store for caching" },
  { technology: "Kubernetes", level: "Intermediate", description: "Container orchestration platform" },
  { technology: "Tailwind", level: "Expert", description: "Utility-first CSS framework" },
];

async function seed() {
  try {
    console.log("🌱 Starting seed...");

    // Clear existing data
    await prisma.service.deleteMany({});
    await prisma.skill.deleteMany({});
    console.log("✓ Cleared existing services and skills");

    // Insert new services
    for (const service of servicesData) {
      await prisma.service.create({
        data: service,
      });
    }
    console.log(`✓ Created ${servicesData.length} services`);

    // Insert new skills
    for (const skill of skillsData) {
      await prisma.skill.create({
        data: skill,
      });
    }
    console.log(`✓ Created ${skillsData.length} skills/technologies`);

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
