import { useState, useEffect } from "react";
import { Check, Users } from "lucide-react";
import { motion } from "framer-motion";
import PricingComparison from "../components/PricingComparison";
import PaymentModal from "../components/PaymentModal";
import SEO from "../components/SEO";
import PaymentBadges from "../components/PaymentBadges";
import { workoutPlans, dietPlans, familyPlan } from "../data/pricing";

/* ── Animation variants ──────────────────────────────────── */
const zoomIn = {
  hidden:  { opacity: 0, scale: 0.88, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
      duration: 0.52,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ────────────────────────────────────────────────────────────
   Ladder prominence levels:
     "side"   → smallest, grayed border, less padding
     "mid"    → medium, subtle border
     "center" → tallest, accent border, elevated shadow
   ──────────────────────────────────────────────────────────── */
const LADDER_4 = ["side", "center", "center", "side"];  // 4 plans — both middle cards prominent
const LADDER_3 = ["side", "center", "side"];           // 3 plans

const PlanCard = ({ plan, onEnroll, prominence = "mid" }) => {
  const isCenter = prominence === "center";
  const isSide   = prominence === "side";

  const isMostValuable = plan.badge === "Most Valuable";
  const BRAND = "#D3365F"; // Studio FIT India brand color

  const wrapperClass = [
    "relative flex flex-col bg-white rounded-2xl border transition-all duration-300",
    isCenter
      ? isMostValuable
        ? "border-rose-400 shadow-2xl shadow-rose-200/60 ring-2 ring-rose-300/40 z-10"
        : "border-secondary shadow-2xl shadow-secondary/15 ring-2 ring-secondary/20 z-10"
      : isSide
      ? "border-gray-200 shadow-sm opacity-95"
      : "border-gray-200 shadow-md",
  ].join(" ");

  // Vertical padding varies by prominence — smaller on mobile, larger on desktop
  const innerPad = isCenter ? "p-8 md:p-12" : isSide ? "p-7 md:p-10" : "p-8 md:p-11";

  return (
    <div
      className={[
        "relative flex flex-col bg-white rounded-2xl border transition-all duration-300",
        isCenter
          ? isMostValuable
            ? "z-10"
            : "border-secondary shadow-2xl shadow-secondary/15 ring-2 ring-secondary/20 z-10"
          : isSide
          ? "border-gray-200 shadow-sm opacity-95"
          : "border-gray-200 shadow-md",
      ].join(" ")}
      style={isCenter && isMostValuable ? {
        borderColor: BRAND,
        boxShadow: `0 20px 60px -10px ${BRAND}40, 0 0 0 2px ${BRAND}30`,
      } : {}}
    >
      {/* Badge ribbon */}
      {plan.badge && (
        <div className="absolute top-0 right-0 z-10">
          <span
            className="text-[9px] font-bold uppercase tracking-wider py-1 px-3 rounded-bl-xl rounded-tr-2xl block text-white"
            style={isMostValuable ? { backgroundColor: BRAND } : {}}
            {...(!isMostValuable && { className: "bg-secondary text-white text-[9px] font-bold uppercase tracking-wider py-1 px-3 rounded-bl-xl rounded-tr-2xl block" })}
          >
            {plan.badge}
          </span>
        </div>
      )}
      {isCenter && !plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-secondary text-white text-[9px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md whitespace-nowrap">
            Most Popular
          </span>
        </div>
      )}

      <div className={`${innerPad} flex flex-col flex-1`}>
        {/* Name + duration */}
        <div className="mb-4">
          <h3 className={`font-extrabold font-heading text-gray-900 leading-tight mb-1 ${isCenter ? "text-xl md:text-2xl" : "text-lg md:text-xl"}`}>
            {plan.name}
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {plan.duration}
            {plan.offerHighlight && (
              <span className="text-secondary ml-1.5">(+ {plan.offerHighlight})</span>
            )}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className={`font-black text-gray-900 font-heading tracking-tight ${isCenter ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"}`}>
              ₹{plan.price.toLocaleString()}
            </span>
            <span className="text-gray-400 text-[11px] font-bold uppercase shrink-0">/ {plan.duration}</span>
          </div>
          {plan.originalPrice && (
            <p className="text-xs text-gray-400 line-through mt-0.5">₹{plan.originalPrice.toLocaleString()}</p>
          )}
          <span className="mt-2 inline-block text-[10px] text-orange-600 font-semibold bg-orange-50 border border-orange-200 rounded px-2 py-0.5">
            5% GST Excluded
          </span>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={14} className="text-secondary shrink-0 mt-0.5" strokeWidth={3} />
              <span className="text-xs md:text-sm font-semibold text-gray-600 leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <PaymentBadges className="mb-3" />
        <button
          onClick={() => onEnroll(plan)}
          className={`btn-pop w-full text-[11px] font-bold uppercase tracking-widest rounded-xl text-white transition-all ${
            isCenter ? "py-3.5 shadow-md" : "py-3"
          } ${!isMostValuable && isCenter ? "bg-secondary hover:bg-secondary/90" : ""} ${
            !isMostValuable && !isCenter ? "bg-gray-900 hover:bg-gray-800" : ""
          }`}
          style={isMostValuable ? { backgroundColor: BRAND } : {}}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Section heading — animated
   ──────────────────────────────────────────────────────────── */
const SectionHeading = ({ title, description }) => (
  <motion.div
    className="mb-12 text-center"
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
  >
    <h2 className="text-4xl md:text-5xl font-black font-heading text-gray-900 mb-4 tracking-tight">{title}</h2>
    <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto font-semibold">{description}</p>
  </motion.div>
);

/* ────────────────────────────────────────────────────────────
   Ladder row — animated zoom-through per card
   ──────────────────────────────────────────────────────────── */
const LadderRow = ({ plans, prominence, onEnroll, maxWidth = "max-w-7xl" }) => (
  <div className={`${maxWidth} mx-auto flex flex-col md:flex-row md:items-end gap-5 md:gap-6`}>
    {plans.map((plan, i) => (
      <motion.div
        key={plan.id}
        className="w-full md:flex-1 md:min-w-[200px]"
        custom={i}
        variants={zoomIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <PlanCard plan={plan} onEnroll={onEnroll} prominence={prominence[i] ?? "mid"} />
      </motion.div>
    ))}
  </div>
);

/* ────────────────────────────────────────────────────────────
   Pricing Page
   ──────────────────────────────────────────────────────────── */
const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (typeof fbq === "function") {
      fbq("track", "ViewContent", {
        content_name: "Pricing Page",
        content_category: "Fitness Plans",
        currency: "INR",
      });
    }
  }, []);

  return (
    <div className="w-full">
      <SEO
        title="Fitness Membership Plans & Pricing"
        description="Affordable monthly, quarterly and annual fitness memberships. Live online yoga, HIIT and Zumba classes starting at ₹1499/month. First class free — no credit card needed."
        keywords={[
          "online fitness classes price India",
          "online gym membership India",
          "online yoga classes",
          "online zumba classes",
          "online aerobics classes",
          "online Strength Training",
          "fitness subscription India",
          "online gym subscription plan",
          "Studio FIT India pricing",
          "live fitness class monthly plan",
          "online fitness classes cost",
          "online fitness studio",
          "online fitness classes",
          "online gym",
          "online weight loss programs",
          "premium fitness classes",
          "premium live fitness classes"
        ]}
      />

      {/* ── Page Header ──────────────────────────────────── */}
      <section className="pt-8 pb-14 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black font-heading text-gray-900 tracking-tight mb-4">
            Choose Your <span className="text-secondary">Membership</span>
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto font-normal">
            Every plan includes live expert-led sessions. Pick the category that fits your goal.
          </p>
        </div>
      </section>

      {/* ── Workout Plans ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Workout Plans"
            description="Live daily workouts — Yoga, HIIT, Zumba & Strength Training. Structured fitness without a diet plan."
          />
          <LadderRow
            plans={workoutPlans}
            prominence={LADDER_4}
            onEnroll={setSelectedPlan}
            maxWidth="max-w-7xl"
          />
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="border-t border-dashed border-gray-200" />
      </div>

      {/* ── Workout + Diet Plans ─────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Workout + Diet Plans"
            description="Complete transformation with personalised diet consultations, weekly monitoring, and priority coach support."
          />
          <LadderRow
            plans={dietPlans}
            prominence={LADDER_3}
            onEnroll={setSelectedPlan}
            maxWidth="max-w-5xl"
          />
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────── */}
      <div className="container mx-auto px-4">
        <div className="border-t border-dashed border-gray-200" />
      </div>

      {/* ── Family Fitness Plan ───────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Family Fitness Plan"
            description="Train together, grow together. One plan for up to 3 family members — all in one subscription."
          />

          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-secondary rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
              {/* Left pane */}
              <div className="flex-1 p-8 md:p-10">
                <h3 className="text-2xl font-extrabold font-heading text-gray-900 mb-2">{familyPlan.name}</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Get fit together with our Family Fitness Plan. Enjoy unlimited live fitness classes and our complete content library — valid for up to 3 family members.
                </p>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-gray-900 font-heading">₹{familyPlan.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-xs font-bold uppercase">/ {familyPlan.duration}</span>
                  </div>
                  <p className="text-xs text-gray-400 line-through mb-2">₹{familyPlan.originalPrice.toLocaleString()}</p>
                  <span className="text-[10px] text-orange-600 font-semibold bg-orange-50 border border-orange-200 rounded px-2 py-0.5">
                    5% GST Excluded
                  </span>
                </div>
              </div>

              {/* Right pane */}
              <div className="w-full md:w-[300px] shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 p-8 bg-gray-50/60">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">What's Included</h4>
                  <ul className="space-y-3 mb-8">
                    {familyPlan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check size={14} className="text-secondary shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="text-xs font-semibold text-gray-700 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <PaymentBadges className="mb-4" />
                  <button
                    onClick={() => setSelectedPlan(familyPlan)}
                    className="btn-pop w-full py-3.5 bg-secondary hover:bg-secondary/90 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl shadow-sm flex items-center justify-center gap-2"
                  >
                    <Users size={14} />
                    Secure Family Spot &amp; Enroll Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────── */}
      <PricingComparison onEnroll={setSelectedPlan} />

      {/* ── Terms ─────────────────────────────────────────── */}
      <section className="pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-xs leading-relaxed">
            <p>* All plans include access to community support.</p>
            <p>* Terms &amp; Conditions apply.</p>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default Pricing;