import { Check } from "lucide-react";

const PricingCard = ({ plan, onEnroll }) => {
  const handleEnroll = () => {
    // Meta Pixel: track enroll button click
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_name: plan.name,
        content_category: "Fitness Plan",
        value: plan.price,
        currency: "INR",
        num_items: 1,
      });
    }
  };

  const isPopular = plan.popular;

  return (
    <div
      className={`relative rounded-2xl flex flex-col h-full overflow-hidden transition-all duration-300 bg-white border ${
        isPopular
          ? "p-8 border-secondary shadow-md scale-[1.01]"
          : "p-8 border-gray-200 shadow-sm"
      }`}
    >
      {plan.badge && (
        <div className="absolute top-5 right-5 z-20">
          <span
            className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block ${
              plan.badge.includes('Free') || plan.badge.includes('Offer') || isPopular
                ? "bg-secondary text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold font-heading text-gray-900 pr-12">
          {plan.name}
        </h3>

        {/* Price block */}
        <div className="mb-2">
          {/* Strikethrough original price */}
          {!!plan.originalPrice && (
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-gray-400 line-through text-base font-semibold">
                ₹{plan.originalPrice.toLocaleString()}
              </span>
              <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 font-bold px-2 py-0.5 rounded">
                SAVE ₹{(plan.originalPrice - plan.price).toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex items-baseline flex-wrap gap-1">
            <span className="text-3xl font-extrabold text-gray-900 font-heading">
              ₹{plan.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs font-bold tracking-wide uppercase">/ {plan.duration}</span>
          </div>
        </div>
      </div>

      <ul className="space-y-3.5 mb-8 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <Check size={16} className="text-secondary mt-0.5 mr-2.5 flex-shrink-0" />
            <span className="text-gray-600 text-sm leading-relaxed font-medium">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          handleEnroll();
          if (onEnroll) onEnroll();
        }}
        className={`w-full flex-shrink-0 py-3.5 mt-auto font-bold uppercase tracking-wider transition-all text-xs flex justify-center items-center rounded-xl active:scale-95 ${
          plan.badge?.includes('Free') || plan.badge?.includes('Offer') || isPopular
            ? "bg-secondary text-white hover:bg-secondary/95 shadow-sm"
            : "bg-gray-900 text-white hover:bg-gray-800"
        }`}
      >
        Join Now
      </button>
    </div>
  );
};

export default PricingCard;
