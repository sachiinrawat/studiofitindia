import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import PricingCard from "./PricingCard";
import { pricingPlans } from "../data/pricing";

const PricingTeaser = () => {
  // Show all 5 plans
  const displayedPlans = pricingPlans;

  return (
    <section className="py-24 bg-navy relative">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading="Choose Your Plan"
          subheading="Flexible packages designed to suit your fitness journey."
        />

        {/* First row: 3 plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 max-w-6xl mx-auto">
          {displayedPlans.slice(0, 3).map((plan) => (
            <div key={plan.id} className="h-full">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        {/* Second row: 2 plans centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 max-w-4xl mx-auto">
          {displayedPlans.slice(3).map((plan) => (
            <div key={plan.id} className="h-full">
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center text-primary font-bold hover:text-white transition-colors text-lg"
          >
            Detailed Plans Comparison <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

    </section>
  );
};

export default PricingTeaser;
