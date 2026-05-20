import { Hero } from "../../src/components/sections/hero";
import { About } from "../../src/components/sections/about";
import { Services } from "../../src/components/sections/services";
import { Products } from "../../src/components/sections/products";
import { Technologies } from "../../src/components/sections/technologies";
import { WhyUs } from "../../src/components/sections/why-us";
import { Portfolio } from "../../src/components/sections/portfolio";
import { Testimonials } from "../../src/components/sections/testimonials";
import { Pricing } from "../../src/components/sections/pricing";
import { Contact } from "../../src/components/sections/contact";
import { fetchFromApi } from "../../src/lib/serverApi";
import { absoluteUrl } from "../../src/lib/seo";

export const metadata = {
  title: "TonuSoft — Future-Ready Software Solutions",
  description: "Modern software studio building CRM, POS, SaaS, mobile, desktop and AI-powered platforms for ambitious teams.",
  openGraph: {
    title: "TonuSoft — Future-Ready Software Solutions",
    description: "We design and engineer scalable digital products end to end.",
    url: absoluteUrl("/home"),
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "TonuSoft",
  "description": "Modern software studio building CRM, POS, SaaS, mobile, desktop and AI-powered platforms for ambitious teams.",
  "url": absoluteUrl("/"),
  "logo": absoluteUrl("/favicon.ico"),
  "sameAs": [
    "https://github.com/tonusoft",
    "https://linkedin.com/company/tonusoft"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-010-2025",
    "contactType": "customer service",
    "email": "hello@tonusoft.com"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Remote",
    "addressCountry": "Worldwide"
  }
};

async function getHomeData() {
  const [servicesData, productsData, projectsData, pricingData, skillsData] = await Promise.all([
    fetchFromApi<any[]>("/content/services"),
    fetchFromApi<any[]>("/content/products"),
    fetchFromApi<any[]>("/content/projects?featured=true"),
    fetchFromApi<any[]>("/content/pricing"),
    fetchFromApi<any[]>("/content/skills"),
  ]);

  return {
    servicesData: servicesData ?? undefined,
    productsData: productsData ?? undefined,
    projectsData: projectsData ? projectsData.slice(0, 4) : undefined,
    pricingData: pricingData ?? undefined,
    skillsData: skillsData ?? undefined,
  };
}

export default async function HomePage() {
  const { servicesData, productsData, projectsData, pricingData, skillsData } = await getHomeData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <About />
      <Services items={servicesData} />
      <Products items={productsData} />
      <Technologies items={skillsData} />
      <WhyUs />
      <Portfolio items={projectsData} />
      <Testimonials />
      <Pricing items={pricingData} />
      <Contact />
    </>
  );
}
