import React from "react";
import { Check, X, BarChart3, Layers, Star, Zap, Activity, User, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingPlans, comparisonFeatures } from "../data/pricing";

const PricingComparison = ({ onEnroll }) => {
  const comparedPlans = pricingPlans.filter(p => p.id !== 10);
  const colCount = comparedPlans.length + 1;

  // Plan icons mapping
  const getIcon = (id) => {
    switch (id) {
      case 1: return <BarChart3 className="text-white" size={24} />;
      case 2: return <Layers className="text-white" size={24} />;
      case 3: return <Star className="text-white" size={24} />;
      case 4: return <Zap className="text-white" size={24} />;
      case 5: return <Activity className="text-white" size={24} />;
      case 6: return <User className="text-white" size={24} />;
      case 7: return <Users className="text-white" size={24} />;
      default: return <Star className="text-white" size={24} />;
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Ambient background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display uppercase italic text-gray-900 mb-4">
            Compare <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Plans</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Find the perfect membership for your fitness goals.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="max-w-7xl mx-auto overflow-x-auto pb-8">
          <div 
            className="grid bg-white rounded-3xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] min-w-[1200px]"
            style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          >
            {/* Header Row */}
            <div className="p-8 border-b border-gray-100 flex items-end">
              <span className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Features</span>
            </div>

            {comparedPlans.map((plan) => (
              <div key={plan.id} className="p-8 text-center border-b border-gray-100 border-l border-gray-50 flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  {getIcon(plan.id)}
                </div>
                <h3 className="text-sm font-black font-display uppercase italic text-gray-900 mb-2 leading-tight">
                  {plan.name}
                </h3>
                <div className="flex flex-col items-center gap-1">
                  {plan.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-bold">₹{plan.originalPrice.toLocaleString()}</span>
                  )}
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary font-display">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{plan.duration}</span>
                </div>
              </div>
            ))}

            {/* Feature Rows */}
            {comparisonFeatures.map((feature, idx) => (
              <React.Fragment key={`row-${idx}`}>
                <div className="p-6 border-b border-gray-50 flex items-center bg-gray-50/30">
                  <span className="text-gray-900 font-bold text-sm">{feature.label}</span>
                </div>
                {comparedPlans.map((plan) => {
                  const val = feature.values[plan.id];
                  return (
                    <div key={`val-${idx}-${plan.id}`} className="p-6 border-b border-gray-50 border-l border-gray-50/50 flex items-center justify-center text-center">
                      {val === false ? (
                        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                          <X size={14} className="text-red-400" strokeWidth={3} />
                        </div>
                      ) : val === true ? (
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                          <Check size={14} className="text-green-500" strokeWidth={4} />
                        </div>
                      ) : (
                        <span className="text-[11px] font-black uppercase tracking-wider text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                          {val}
                        </span>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

            {/* CTA Row */}
            <div className="p-8" />
            {comparedPlans.map((plan) => (
              <div key={`cta-${plan.id}`} className="p-8 border-l border-gray-50">
                <button
                  onClick={() => onEnroll && onEnroll(plan)}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] bg-gray-900 text-white rounded-xl hover:bg-primary transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-gray-200"
                >
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Helper Text */}
        <p className="md:hidden text-center text-gray-400 text-xs font-bold mt-4 animate-pulse italic">
          ← Scroll sideways to compare all plans →
        </p>
      </div>
    </section>
  );
};

export default PricingComparison;
