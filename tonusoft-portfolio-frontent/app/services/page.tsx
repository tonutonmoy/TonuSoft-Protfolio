import { Services } from "../../src/components/sections/services";
import { fetchFromApi } from "../../src/lib/serverApi";
import { createMetadata } from "../../src/lib/seo";

export const metadata = createMetadata({
  title: "TonuSoft Services",
  description: "Discover TonuSoft services for CRM, POS, SaaS, mobile and custom software solutions.",
  path: "/services",
  keywords: ["software services", "CRM development", "POS software", "custom software solutions"],
});

export default async function ServicesPage() {
  const servicesData = await fetchFromApi<any[]>("/content/services");

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
        <Services items={servicesData ?? undefined} />
      </div>
    </div>
  );
}
