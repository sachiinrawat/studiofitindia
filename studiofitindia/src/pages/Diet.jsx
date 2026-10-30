import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SEO from "../components/SEO";
import PaymentModal from "../components/PaymentModal";
import { useState } from "react";
import { Check, ArrowRight, Leaf, Target, ShieldCheck, Clock, ChefHat, Apple } from "lucide-react";

const BRAND = "#D3365F";

/* ── Fade-up on scroll ─────────────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ── Data ──────────────────────────────────────────────────────────── */
const TOPICS = [
  {
    icon: <Apple size={28} />,
    title: "Weight Loss Diet",
    desc: "Sustainable caloric deficit plans designed around real Indian food. No crash diets, no starvation — just science-backed nutrition.",
    tag: "Most Popular",
  },
  {
    icon: <ChefHat size={28} />,
    title: "Indian Balanced Diet",
    desc: "Culturally appropriate meal plans using dals, sabzis, rotis and rice — balanced macros without giving up the food you love.",
    tag: null,
  },
  {
    icon: <Target size={28} />,
    title: "High-Protein Diet",
    desc: "Build muscle and recover faster with protein-rich Indian meal templates. Perfect for strength and HIIT training members.",
    tag: null,
  },
  {
    icon: <Leaf size={28} />,
    title: "Vegetarian & Vegan Plans",
    desc: "Plant-powered nutrition strategies that cover all essential amino acids and micronutrients — no compromise on results.",
    tag: null,
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Diabetes-Friendly Eating",
    desc: "Low glycemic index meal structures that help stabilise blood sugar while supporting fat loss and energy levels.",
    tag: null,
  },
  {
    icon: <Clock size={28} />,
    title: "Intermittent Fasting Guide",
    desc: "16:8 and 5:2 protocols adapted to the Indian lifestyle — including how to break your fast and what to eat during your window.",
    tag: null,
  },
];

const PLAN_HIGHLIGHTS = [
  "Personalised to your food preferences",
  "Calorie & macro tracking made simple",
  "Weekly diet review with your coach",
  "WhatsApp check-ins for accountability",
  "No rigid meal timings — eat when it suits you",
  "Vegetarian, vegan & non-veg options available",
];

const FAQS = [
  {
    q: "Do I have to follow a strict diet to lose weight?",
    a: "No. We build your plan around foods you already enjoy. Sustainable fat loss comes from a moderate caloric deficit, not from eliminating entire food groups.",
  },
  {
    q: "Are your diet plans suitable for Indians?",
    a: "Absolutely. Every plan is built around Indian ingredients — dals, paneer, rice, rotis, sabzis. There's no need to import expensive 'diet food'.",
  },
  {
    q: "How is the diet plan personalised for me?",
    a: "After enrollment your coach will understand your food preferences, lifestyle, health goals and any dietary restrictions before creating your plan.",
  },
  {
    q: "Can I still eat out while on a diet plan?",
    a: "Yes. Your coach will guide you on smart restaurant choices and how to estimate portions when eating out so you stay on track without missing life.",
  },
  {
    q: "How soon will I see results?",
    a: "Most members notice improved energy and reduced bloating within 1–2 weeks. Visible fat loss typically shows within 4–6 weeks of consistent adherence.",
  },
];

/* ── FAQ Accordion ──────────────────────────────────────────────────── */
const Accordion = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-gray-100 cursor-pointer"
      onClick={() => setOpen((o) => !o)}
    >
      <div className="flex justify-between items-center py-5 gap-4">
        <span className="text-base font-semibold text-gray-800">{q}</span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all"
          style={{ background: BRAND, transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </div>
      {open && (
        <p className="text-sm text-gray-500 leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  );
};

/* ── Page ───────────────────────────────────────────────────────────── */
const Diet = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="bg-white text-gray-900 font-body">
      <SEO
        title="Diet & Nutrition Plans | Studio FIT India — Indian Diet for Weight Loss"
        description="Explore personalised Indian diet plans for weight loss, high-protein nutrition, vegetarian eating, and intermittent fasting. Expert-guided diet coaching with Studio FIT India."
        keywords={[
          "Indian diet plan for weight loss",
          "online diet plan India",
          "personalised diet coach India",
          "vegetarian diet plan",
          "high protein Indian diet",
          "intermittent fasting India",
          "diet and nutrition online",
        ]}
        canonical="https://www.studiofitindia.com/diet"
      />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d0f1a 50%, #1a1a1a 100%)",
          minHeight: 480,
        }}
      >
        {/* Ambient circles */}
        <div
          className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${BRAND}22 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${BRAND}15 0%, transparent 70%)` }}
        />

        <div className="container mx-auto px-4 md:px-6 py-24 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-black tracking-[0.22em] mb-5"
            style={{ color: BRAND }}
          >
            STUDIO FIT INDIA — DIET & NUTRITION
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6"
          >
            Eat right for{" "}
            <span style={{ color: BRAND }}>real results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Personalised Indian diet plans — built around the food you love, guided by expert coaches, and designed for long-term fat loss and energy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[12px] font-black tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: BRAND }}
            >
              Get a Diet Plan <ArrowRight size={15} />
            </a>
            <a
              href="#topics"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[12px] font-black tracking-widest border text-white transition-all hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.25)" }}
            >
              Explore Diet Topics
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TOPICS GRID ───────────────────────────────────────────────── */}
      <section id="topics" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-16">
            <p className="text-[11px] font-black tracking-[0.18em] mb-3" style={{ color: BRAND }}>
              DIET TOPICS
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              Everything you need to know about nutrition
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              From fat loss to muscle building — all plans are adapted to the Indian palate and lifestyle.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {TOPICS.map((t, i) => (
              <FadeUp key={t.title} delay={i * 0.07}>
                <div className="group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                  {t.tag && (
                    <span
                      className="absolute top-4 right-4 text-[9px] font-black tracking-widest px-2.5 py-1 rounded-full text-white"
                      style={{ background: BRAND }}
                    >
                      {t.tag}
                    </span>
                  )}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white shrink-0"
                    style={{ background: `${BRAND}15`, color: BRAND }}
                  >
                    {t.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-grow">{t.desc}</p>
                  <div className="mt-5 pt-4 border-t border-gray-50">
                    <a
                      href="/pricing"
                      className="text-[11px] font-black tracking-wider inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
                      style={{ color: BRAND }}
                    >
                      Get this plan <ArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#fafafa" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <FadeUp>
              <p className="text-[11px] font-black tracking-[0.18em] mb-3" style={{ color: BRAND }}>
                WHAT'S INCLUDED
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">
                Your diet plan — built around{" "}
                <span style={{ color: BRAND }}>your life</span>.
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                We don't hand you a generic PDF. Your coach builds a nutrition strategy around your goals, food preferences, schedule, and budget — then stays with you through the journey.
              </p>
              <a
                href="/pricing"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-[12px] font-black tracking-widest text-white transition-all hover:opacity-90"
                style={{ background: BRAND }}
              >
                Start Your Diet Plan <ArrowRight size={14} />
              </a>
            </FadeUp>

            {/* Right: checklist */}
            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-6">
                  Every diet plan includes
                </h3>
                <ul className="space-y-4">
                  {PLAN_HIGHLIGHTS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${BRAND}15` }}
                      >
                        <Check size={11} strokeWidth={3} style={{ color: BRAND }} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────────── */}
      <section className="py-12 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { stat: "25,000+", label: "Members transformed" },
              { stat: "4.9★",   label: "Average rating" },
              { stat: "12–20kg", label: "Average fat lost in 90 days" },
              { stat: "100%",   label: "Indian food, real plans" },
            ].map((s) => (
              <FadeUp key={s.stat}>
                <div
                  className="text-3xl md:text-4xl font-black mb-1"
                  style={{ color: BRAND }}
                >
                  {s.stat}
                </div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {s.label}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-14">
            <p className="text-[11px] font-black tracking-[0.18em] mb-3" style={{ color: BRAND }}>
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Common diet questions
            </h2>
          </FadeUp>

          <div className="max-w-3xl mx-auto">
            {FAQS.map((f) => (
              <FadeUp key={f.q}>
                <Accordion q={f.q} a={f.a} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────── */}
      <section
        className="py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d0f1a 50%, #1a1a1a 100%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <FadeUp>
            <p className="text-[11px] font-black tracking-[0.22em] mb-4" style={{ color: BRAND }}>
              START TODAY
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Ready to eat right and lose weight — for good?
            </h2>
            <p className="text-gray-300 text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Get a personalised Indian diet plan built around your goals, your food preferences, and your lifestyle — with weekly coach support.
            </p>
            <a
              href="/pricing"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-black tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: BRAND }}
            >
              Get My Diet Plan <ArrowRight size={16} />
            </a>
          </FadeUp>
        </div>
      </section>

      {selectedPlan && (
        <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
};

export default Diet;
