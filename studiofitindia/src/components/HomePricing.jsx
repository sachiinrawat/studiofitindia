import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { pricingPlans } from "../data/pricing";
import PaymentModal from "./PaymentModal";

const HomePricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
            Membership <span className="text-secondary">Plans</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Your transformation begins with a single step. Choose the right plan for your journey.
          </p>
        </div>


        {/* Special 2 Year Plan */}
        {(() => {
          const twoYearPlan = pricingPlans.find(p => p.id === 10);
          if (!twoYearPlan) return null;
          return (
            <div className="max-w-4xl mx-auto mb-12 px-4">
              <div className="bg-white border-2 border-pink-500 rounded-2xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-stretch justify-between gap-8 hover:shadow-md transition-all">
                {/* Left Column: Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-pink-600 text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded mb-4">
                      Limited Time — First 30 Members Only
                    </span>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-heading">
                      {twoYearPlan.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                      {twoYearPlan.duration} Membership — Lock in your fitness journey
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-lg mb-6">
                      Commit to your transformation with our exclusive 2-Year Plan. Enjoy unlimited live fitness classes and our complete content library. Valid for the first 30 members only.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">₹{twoYearPlan.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs uppercase font-bold">/ {twoYearPlan.duration}</span>
                    {twoYearPlan.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-semibold ml-2">₹{twoYearPlan.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Right Column: Features list with left border divider */}
                <div className="w-full md:w-[320px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Included in 2 Year Plan:</h4>
                    <div className="space-y-3 mb-6">
                      {twoYearPlan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Check size={16} className="text-pink-500 shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-xs font-semibold text-gray-700 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(twoYearPlan)}
                    className="w-full py-3.5 bg-pink-600 text-white hover:bg-pink-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                  >
                    Secure Spot & Join Now
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {pricingPlans.slice(0, 4).map((plan) => {
            const isMothersDay = plan.badge === "Mother's Day Offer";
            return (
              <div key={plan.id} className="group h-full relative">
                <div className={`flex flex-col h-full bg-white rounded-2xl transition-all duration-300 overflow-hidden border p-8 shadow-sm ${isMothersDay ? 'border-pink-400' : 'border-gray-200'}`}>
                  {isMothersDay && (
                    <div className="absolute top-0 right-0 bg-pink-600 text-white text-[9px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl z-10">
                      Mother's Day Offer
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className={`text-lg font-bold font-heading mb-1 ${isMothersDay ? 'text-pink-600' : 'text-gray-900'}`}>{plan.name}</h3>
                    <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">
                      {plan.duration}
                      {plan.offerHighlight && (
                        <span className="text-pink-600 ml-1 font-bold">
                          (+ {plan.offerHighlight})
                        </span>
                      )}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-gray-900 font-heading">₹{plan.price.toLocaleString()}</span>
                      <span className="text-gray-400 text-xs font-medium uppercase">/ {plan.duration}</span>
                    </div>
                    {plan.originalPrice && (
                      <p className="text-xs text-gray-400 line-through mt-0.5">₹{plan.originalPrice.toLocaleString()}</p>
                    )}
                  </div>

                  <div className="space-y-3.5 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => {
                      const highlightFeature = isMothersDay && feature.includes('Free');
                      return (
                        <div key={idx} className={`flex items-start gap-2.5 ${highlightFeature ? 'bg-pink-50 -mx-2 px-2 py-1.5 rounded-lg' : ''}`}>
                          <div className="shrink-0 mt-0.5">
                            <Check size={14} className={isMothersDay ? "text-pink-500" : "text-secondary"} strokeWidth={3} />
                          </div>
                          <span className={`text-xs leading-tight ${highlightFeature ? 'font-bold text-pink-600' : 'font-semibold text-gray-600'}`}>{feature}</span>
                        </div>
                      )
                    })}
                  </div>

                  <button 
                    onClick={() => setSelectedPlan(plan)}
                    className={`w-full py-3 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 ${isMothersDay ? 'bg-pink-600 hover:bg-pink-700 shadow-sm' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Second Row for remaining 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.slice(4, 8).map((plan) => (
            <div key={plan.id} className="group h-full">
              <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-bold font-heading text-gray-900">{plan.name}</h3>
                    {(plan.id === 6 || plan.id === 7) && (
                      <span className="bg-gray-100 text-gray-600 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">1-on-1</span>
                    )}
                  </div>
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[10px]">{plan.duration}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-gray-900 font-heading">₹{plan.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs font-medium uppercase">/ {plan.duration.split(' ')[0]}</span>
                  </div>
                  {plan.originalPrice && (
                    <p className="text-xs text-gray-400 line-through mt-0.5">₹{plan.originalPrice.toLocaleString()}</p>
                  )}
                </div>

                <div className="space-y-3.5 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="shrink-0 mt-0.5">
                        <Check size={14} className="text-secondary" strokeWidth={3} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-sm"
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Special Featured Family Fitness Plan */}
        {(() => {
          const familyPlan = pricingPlans.find(p => p.id === 9);
          if (!familyPlan) return null;
          return (
            <div className="max-w-4xl mx-auto mt-16 px-4">
              <div className="bg-white border-2 border-secondary rounded-2xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-stretch justify-between gap-8 hover:shadow-md transition-all">
                {/* Left Column: Info */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-secondary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded mb-4">
                      Best Value — Special Family Package
                    </span>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-2 font-heading">
                      {familyPlan.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
                      {familyPlan.duration} Membership — Share with up to 3 family members!
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-lg mb-6">
                      Get unlimited interactive fitness classes for your entire household. Train together from home under certified coaches, pause your plan for up to 30 days, or start whenever you are ready.
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2 mt-auto">
                    <span className="text-3xl font-extrabold text-gray-900 tracking-tight font-heading">₹{familyPlan.price.toLocaleString()}</span>
                    <span className="text-gray-500 text-xs uppercase font-bold">/ {familyPlan.duration}</span>
                    {familyPlan.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-semibold ml-2">₹{familyPlan.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                {/* Right Column: Features list with left border divider */}
                <div className="w-full md:w-[320px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Included in Family Package:</h4>
                    <div className="space-y-3 mb-6">
                      {familyPlan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <Check size={16} className="text-secondary shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="text-xs font-semibold text-gray-700 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlan(familyPlan)}
                    className="w-full py-3.5 bg-secondary text-white hover:bg-secondary/95 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                  >
                    Secure Family Spot & Join Now
                  </button>
                </div>
              </div>
            </div>
          );
        })()}



        {/* View All Button */}
        <div className="mt-12 text-center">
          <a 
            href="/pricing"
            className="inline-flex items-center gap-2 text-gray-700 font-bold uppercase tracking-wider text-xs hover:text-secondary transition-colors group"
          >
            Compare All Plans* <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal 
          plan={selectedPlan} 
          onClose={() => setSelectedPlan(null)} 
        />
      )}
    </section>
  );
};

export default HomePricing;
