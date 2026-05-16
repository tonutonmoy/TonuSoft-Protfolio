import { Pricing } from "../../src/components/sections/pricing";
import { fetchFromApi } from "../../src/lib/serverApi";

export const metadata = {
  title: "TonuSoft Pricing",
  description: "Browse our transparent pricing plans for custom software, SaaS and product development.",
};

export default async function PricingPage() {
  const pricingData = await fetchFromApi<any[]>('/content/pricing');

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
        <Pricing items={pricingData ?? undefined} />
      </div>
    </div>
  );
}
