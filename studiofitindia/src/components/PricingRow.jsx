import React from "react";
import { Check, Star, ArrowRight } from "lucide-react";

const PricingRow = ({ plan, index, onEnroll }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`py-16 ${!isEven ? "bg-gray-50/50" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20 max-w-6xl mx-auto`}>
          
          {/* Pricing Info Side */}
          <div className="w-full md:w-5/12">
            <div className={`relative p-8 rounded-3xl border border-gray-100 shadow-xl bg-white overflow-hidden ${plan.popular ? "ring-2 ring-primary/20" : ""}`}>
              {/* Decorative background elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

              {plan.badge && (
                <div className="mb-6">
                  <span className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-3xl font-bold font-display uppercase italic text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">
                {plan.duration} Membership
              </p>

              <div className="mb-8">
                {plan.originalPrice && (
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-400 line-through text-xl font-bold">
                      ₹{plan.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 font-black px-2 py-0.5 rounded-md">
                      SAVE ₹{(plan.originalPrice - plan.price).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-gray-900 font-display">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 font-bold">/ {plan.duration.split(' ')[0]}</span>
                </div>
              </div>

              <button
                onClick={onEnroll}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Enroll Now <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Features Side */}
          <div className="w-full md:w-7/12">
            <div className="space-y-8">
              <div>
                <h4 className="text-2xl font-bold font-display uppercase italic text-gray-900 mb-4 flex items-center gap-3">
                  <Star className="text-primary" fill="currentColor" size={24} />
                  What's Included
                </h4>
                <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                  Experience a premium fitness journey with specialized features designed to help you achieve your goals faster and more effectively.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors">
                      <Check size={14} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm leading-snug">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 mt-8">
                <p className="text-gray-500 text-sm italic font-medium">
                  * All sessions are conducted live by certified coaches.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingRow;
