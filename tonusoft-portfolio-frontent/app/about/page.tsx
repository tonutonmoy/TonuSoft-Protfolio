import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TonuSoft',
  description: 'Learn about TonuSoft, a software solutions company building custom CRM, POS, SaaS, mobile and AI-powered platforms.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-6">About TonuSoft</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a software solutions company dedicated to building custom, scalable applications for ambitious businesses.
          </p>
        </div>

        {/* Company Info */}
        <div className="grid gap-12 md:grid-cols-2 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              TonuSoft is a software solutions company specializing in custom application development. We build CRM systems, POS platforms, SaaS applications, mobile apps, and AI-powered automation solutions tailored to your business needs.
            </p>
            <p className="text-muted-foreground">
              Founded by <strong>Showmic Arefin Tonmoy</strong>, we're committed to delivering high-quality, scalable software that transforms how businesses operate.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-semibold">
                  <a href="mailto:www.tonutonmoy12@gmail.com" className="hover:text-primary transition">
                    www.tonutonmoy12@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone / WhatsApp</p>
                <p className="font-semibold">
                  <a href="tel:+8801732159683" className="hover:text-primary transition">
                    +880 1732-159683
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-semibold">Khulna, Satkhira, Minshipara, Bangladesh</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Follow Us</p>
                <a 
                  href="https://www.facebook.com/profile.php?id=61568656226514" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition"
                >
                  Facebook Page →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "CRM Software Development", desc: "Pipeline, sales, support and analytics tailored to your team." },
              { title: "POS Software", desc: "Fast, offline-first POS with inventory and reporting." },
              { title: "Full-Stack Web Apps", desc: "End-to-end web platforms with modern stacks." },
              { title: "Mobile App Development", desc: "iOS, Android & cross-platform with delightful UX." },
              { title: "Desktop Applications", desc: "Native-feel desktop apps for Windows, macOS and Linux." },
              { title: "SaaS Platform Development", desc: "Multi-tenant SaaS, billing, auth and observability." },
              { title: "UI/UX Design", desc: "Design systems and product interfaces that convert." },
              { title: "API Development", desc: "Robust REST and GraphQL APIs, documented and versioned." },
              { title: "Cloud Integration", desc: "AWS, GCP, Azure — infra that scales with your business." },
              { title: "Custom Business Software", desc: "Bespoke tools built around your exact workflows." },
              { title: "AI Automation Solutions", desc: "LLM-powered automations, agents and copilots." },
              { title: "Software Maintenance", desc: "Ongoing support, updates and performance optimization." },
              { title: "SEO & Digital Marketing", desc: "Digital marketing and search engine optimization services." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-border bg-card/50 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something Great?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Let's talk about your project, timeline, and goals. We're here to help transform your vision into reality.
          </p>
          <a 
            href="/contact" 
            className="inline-flex rounded-full gradient-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}