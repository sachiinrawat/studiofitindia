import { useState, useEffect, useRef } from "react";
import { Check, Users, Sparkles, Phone, Gift } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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

  // Calculate per-month cost — handles "3+1 Months", "6+2 Months", "1 Year + 3 Months", etc.
  const durationMonths = (() => {
    const d = plan.duration ?? "";
    const plusMatch = d.match(/(\d+)\s*\+\s*(\d+)\s*Month/i);
    if (plusMatch) return parseInt(plusMatch[1]) + parseInt(plusMatch[2]);
    const yearPlusMatch = d.match(/(\d+)\s*Year\s*\+\s*(\d+)\s*Month/i);
    if (yearPlusMatch) return parseInt(yearPlusMatch[1]) * 12 + parseInt(yearPlusMatch[2]);
    if (/6\s*Month.*\+\s*6\s*Month/i.test(d)) return 12;
    if (/1\s*Year.*\+\s*1\s*Year/i.test(d)) return 24;
    const monthMatch = d.match(/(\d+)\s*Month/i);
    if (monthMatch) return parseInt(monthMatch[1]);
    const yearMatch = d.match(/(\d+)\s*Year/i);
    if (yearMatch) return parseInt(yearMatch[1]) * 12;
    const dayMatch = d.match(/(\d+)\s*Day/i);
    if (dayMatch) return Math.round(parseInt(dayMatch[1]) / 30);
    return null;
  })();
  const perMonthPrice = durationMonths && durationMonths > 1
    ? Math.ceil(plan.price / durationMonths)
    : null;

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

          {/* Per-month breakdown badge */}
          {perMonthPrice && (
            <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <span className="text-[11px] font-bold text-emerald-700">
                Only ₹{perMonthPrice.toLocaleString()}/month
              </span>
            </div>
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
   Great Festive Fit Sale Hero Banner
   ──────────────────────────────────────────────────────────── */
const WA_NUMBER = "918796442732";
const WA_MESSAGE = encodeURIComponent(
  "Hi Studio FIT India! I want to claim the GREAT FESTIVE FIT SALE offer, Please share the details!"
);
const WA_LINK = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${WA_MESSAGE}`;

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FestiveSaleBanner = () => {
  const bannerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "center center"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.75, 0.95, 1]);

  const scale = useSpring(rawScale, { stiffness: 180, damping: 24, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 24, mass: 0.6 });
  const opacity = useSpring(rawOpacity, { stiffness: 180, damping: 24, mass: 0.6 });

  return (
    <div ref={bannerRef} className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-10 pb-6">
      <motion.div
        style={{ scale, y, opacity }}
        className="max-w-[1400px] w-full mx-auto flex flex-col justify-between rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-[0_20px_70px_rgba(225,29,72,0.10)] border-2 border-rose-200/80 bg-gradient-to-br from-[#fff7f8] via-[#ffffff] to-[#fff3f6] text-gray-900 p-6 sm:p-10 lg:p-12 relative group"
      >
        {/* Subtle decorative curved ambient blush in corners */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ffebee]/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ffebee]/70 rounded-full blur-3xl pointer-events-none" />

        {/* ── TOP: Clean Header (Large & Bold) ─────────────────────── */}
        <div className="relative z-10 text-center max-w-5xl mx-auto w-full mb-6">
          <div className="inline-flex items-center gap-2 bg-[#ffecee] border border-pink-200 text-gray-900 font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-6 py-2 rounded-full shadow-xs mb-3 sm:mb-4">
            <span className="text-[#e11d48] text-sm">✦</span>
            <span>GREAT FESTIVE FIT SALE • VALID TILL 9TH NOVEMBER</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-2 sm:mb-3 leading-none">
            <span className="text-gray-950">BUY NOW, </span>
            <span className="text-[#e11d48]">START LATER!</span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-semibold max-w-3xl mx-auto">
            Book Now &amp; Start When You're Ready • Exclusive Festive Renewal Offers
          </p>
        </div>

        {/* ── MIDDLE: 4 Prominent Clean Offer Cards (Spacious & Crisp) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 my-4 sm:my-6 w-full">
          
          {/* Card 1: 3 + 1 MONTHS */}
          <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between gap-1 mb-3">
                <span className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-950 font-heading whitespace-nowrap">
                  3 + 1 MONTHS
                </span>
                <span className="bg-[#ffecee] text-[#e11d48] text-xs font-black uppercase tracking-tight px-3 py-1 rounded-full whitespace-nowrap">
                  +1 MONTH FREE
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-950 font-heading tracking-tight leading-none">
                  ₹2,900
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through font-bold">
                  ₹3,999
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3 text-sm sm:text-[15px] text-gray-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">120 Live Sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">10 Days Pause Facility</span>
              </div>
            </div>
          </div>

          {/* Card 2: 6 + 2 MONTHS (MOST POPULAR) */}
          <div className="flex flex-col justify-between bg-[#fff9fa] border-2 border-[#e11d48] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative ring-4 ring-[#e11d48]/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e11d48] text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md whitespace-nowrap">
              MOST POPULAR
            </div>
            <div>
              <div className="flex items-center justify-between gap-1 mb-3 mt-1">
                <span className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-950 font-heading whitespace-nowrap">
                  6 + 2 MONTHS
                </span>
                <span className="bg-[#ffecee] text-[#e11d48] text-xs font-black uppercase tracking-tight px-3 py-1 rounded-full whitespace-nowrap">
                  +2 MONTHS FREE
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-950 font-heading tracking-tight leading-none">
                  ₹4,600
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through font-bold">
                  ₹5,999
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-rose-100 space-y-3 text-sm sm:text-[15px] text-gray-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">Unlimited Classes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">20 Days Pause Facility</span>
              </div>
            </div>
          </div>

          {/* Card 3: 1 YEAR + 3 MONTHS */}
          <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between gap-1 mb-3">
                <span className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-950 font-heading whitespace-nowrap">
                  1 YEAR + 3 MONTHS
                </span>
                <span className="bg-[#ffecee] text-[#e11d48] text-xs font-black uppercase tracking-tight px-3 py-1 rounded-full whitespace-nowrap">
                  +3 MONTHS FREE
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-950 font-heading tracking-tight leading-none">
                  ₹5,900
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through font-bold">
                  ₹8,999
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3 text-sm sm:text-[15px] text-gray-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">Unlimited Classes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">30 Days Pause Facility</span>
              </div>
            </div>
          </div>

          {/* Card 4: 90-DAY TRANSFORM */}
          <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div>
              <div className="flex items-start justify-between gap-1 mb-3">
                <div className="text-sm sm:text-base font-black uppercase tracking-wider text-gray-950 font-heading leading-tight">
                  90-DAY<br />TRANSFORM
                </div>
                <span className="bg-[#fef3c7] text-[#92400e] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs whitespace-nowrap">
                  50% OFF
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-black text-gray-950 font-heading tracking-tight leading-none">
                  ₹6,000
                </span>
                <span className="text-base sm:text-lg text-gray-400 line-through font-bold">
                  ₹12,000
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3 text-sm sm:text-[15px] text-gray-700 font-semibold">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">Custom Diet + Daily Tracking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white stroke-[3.5]" />
                </div>
                <span className="whitespace-nowrap">Weekly Counselling (15d Pause)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Bonus Ribbon, CTAs & Helpline (Spacious & Bold) ── */}
        <div className="relative z-10 w-full space-y-4 pt-2">
          {/* Bonus callout ribbon */}
          <div className="w-full bg-[#ffecee] border border-pink-200/90 rounded-2xl sm:rounded-full px-6 sm:px-8 py-3.5 sm:py-4 shadow-xs text-center flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Gift size={22} className="text-[#e11d48] shrink-0" />
            <span className="bg-[#e11d48] text-white text-xs sm:text-sm font-black uppercase tracking-wider px-3 py-1 rounded-full">
              BONUS
            </span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
              Renew by 31st Oct &amp; Get{" "}
              <span className="text-[#e11d48] underline underline-offset-4 font-black">
                21-Day FAT TO FIT CHALLENGE FREE!
              </span>
            </span>
          </div>

          {/* CTA Buttons & Helpline */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-gray-800 bg-white/95 border border-gray-200 px-5 sm:px-6 py-3 rounded-full shadow-xs w-full sm:w-auto justify-center sm:justify-start">
              <Phone size={16} className="text-[#e11d48] shrink-0" />
              <span>
                Call:{" "}
                <a href="tel:8796442732" className="hover:text-[#e11d48] transition-colors font-extrabold">
                  8796442732
                </a>{" "}
                |{" "}
                <a href="tel:9310666287" className="hover:text-[#e11d48] transition-colors font-extrabold">
                  9310666287
                </a>
              </span>
            </div>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg tracking-wider text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer uppercase bg-[#e11d48] hover:bg-[#cf133f]"
            >
              <WhatsAppIcon size={22} className="shrink-0 text-white" />
              <span>CLAIM FESTIVE OFFER</span>
            </a>

            <div className="text-center sm:text-right text-sm text-gray-500 font-semibold italic">
              Your Fitness, Our Commitment!
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


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

      {/* ── Great Festive Fit Sale Banner with Scroll Animation ──── */}
      <FestiveSaleBanner />

      {/* ── Workout Plans ────────────────────────────────── */}
      <section className="py-16 bg-white">
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