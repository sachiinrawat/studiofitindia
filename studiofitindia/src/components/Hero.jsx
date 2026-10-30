import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

/* ════════════════════════════════════════════════════════
   WOLVERINES-STYLE VIDEO HERO BANNER
   ─ Full-viewport dark section with background video,
     bold athletic typography, and glass-morphism cards.
   ─ Navbar stays untouched above this section.
════════════════════════════════════════════════════════ */

const HERO_VIDEO = "https://res.cloudinary.com/dvrwadsfh/video/upload/v1792059250/13265243_1920_1080_25fps_kjdzdj.mp4";

/* ── Info card data ── */
const INFO_CARDS = [
  {
    title: "TRIAL CLASS",
    description: "Start your fitness journey today with a trial class at just ₹1.",
    cta: "Book Now",
    href: "https://wa.me/918796442732?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20%E2%82%B91.",
    external: true,
    accent: true,
  },
  {
    title: "OUR PROGRAMS",
    description: "Yoga, HIIT, Zumba, Strength Training & more — all live, all online.",
    cta: "Explore",
    href: "/programs",
    external: false,
    accent: false,
  },
];

const Hero = ({ onStartQuiz }) => {
  const sectionRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  /* Parallax: video moves slightly slower than scroll */
  const { scrollY } = useScroll();
  const videoY = useTransform(scrollY, [0, 600], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 400], [0.3, 0.65]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-neutral-950 flex items-center"
      style={{
        minHeight: "min(calc(100vh - 80px), 700px)",
        borderBottomLeftRadius: "clamp(24px, 4vw, 60px)",
        borderBottomRightRadius: "clamp(24px, 4vw, 60px)",
      }}
    >
      {/* ── BACKGROUND VIDEO ── */}
      <div className="absolute inset-0 w-full h-full">
        <motion.video
          style={{ y: videoY }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-[120%] object-cover object-[center_35%]"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </motion.video>

        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-black/30 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
        {/* Extra gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── LEFT: Typography + CTA ── */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-[56px] sm:text-[80px] md:text-[100px] lg:text-[120px] xl:text-[140px] font-extrabold leading-[0.88] tracking-tight text-white uppercase select-none"
              style={{
                textShadow: "0 4px 24px rgba(0,0,0,0.85)",
                fontFamily: "'Bebas Neue', 'Impact', sans-serif",
                fontWeight: 400,
              }}
            >
              TRAIN
              <br />
              <span className="text-[#CF1E4C]">HARDER</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="text-white/90 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mt-5"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}
            >
              India's #1 online live fitness studio — Yoga, HIIT, Zumba & Strength Training
              led by certified coaches. Join 25,000+ active members.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
            >
              {onStartQuiz && (
                <button
                  onClick={onStartQuiz}
                  className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 rounded-md bg-[#CF1E4C] text-white font-semibold text-sm sm:text-base hover:bg-[#b0294b] transition-all duration-200 shadow-xl shadow-black/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Find My Batch & Diet Plan
                </button>
              )}
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3 sm:py-3.5 rounded-md border-2 border-white/30 text-white font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/50 transition-all duration-200 backdrop-blur-sm"
              >
                View Plans
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Glass-morphism info cards ── */}
          <motion.div
            className="lg:col-span-5 w-full"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-2xl p-4 sm:p-5 border border-white/20 border-b-white/10"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.35)",
              }}
            >
              {/* Shine gradient */}
              <div
                className="absolute inset-x-0 top-0 h-[85%] pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.04) 80%, transparent 100%)",
                }}
              />

              {/* Card grid */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {INFO_CARDS.map((card, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 sm:p-[18px] flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                      card.accent
                        ? "bg-[#CF1E4C] hover:bg-[#b51a42] text-white"
                        : "bg-white/95 hover:bg-white text-neutral-900"
                    }`}
                  >
                    <div>
                      <h3
                        className={`text-[18px] sm:text-[20px] tracking-wide uppercase ${
                          card.accent ? "text-white" : "text-neutral-900"
                        }`}
                        style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontWeight: 400 }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-[13px] leading-snug mt-1.5 font-normal ${
                          card.accent ? "text-white/90" : "text-neutral-600"
                        }`}
                      >
                        {card.description}
                      </p>
                    </div>
                    {card.external ? (
                      <a
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-semibold text-xs sm:text-[13px] inline-flex items-center gap-1 mt-3 transition-colors ${
                          card.accent
                            ? "text-white hover:underline"
                            : "text-[#CF1E4C] hover:text-[#a01638]"
                        }`}
                      >
                        {card.cta} &gt;
                      </a>
                    ) : (
                      <Link
                        to={card.href}
                        className={`font-semibold text-xs sm:text-[13px] inline-flex items-center gap-1 mt-3 transition-colors ${
                          card.accent
                            ? "text-white hover:underline"
                            : "text-[#CF1E4C] hover:text-[#a01638]"
                        }`}
                      >
                        {card.cta} &gt;
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom schedule banner */}
              <div className="relative z-10 bg-white/95 hover:bg-white text-neutral-900 rounded-xl p-3.5 sm:p-4 mt-3.5 flex items-center gap-3 sm:gap-4 transition-all duration-200 hover:shadow-md">
                <div className="relative w-20 sm:w-24 aspect-square rounded-lg overflow-hidden flex-shrink-0 bg-neutral-200 flex items-center justify-center">
                  {/* Clock icon */}
                  <div className="w-full h-full bg-gradient-to-br from-[#CF1E4C] to-[#FF6B8A] flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-[16px] sm:text-[18px] tracking-wide text-neutral-900 uppercase leading-tight"
                    style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif", fontWeight: 400 }}
                  >
                    LIVE CLASSES
                  </h3>
                  <p className="text-neutral-900 font-semibold text-xs sm:text-[13px] mt-0.5">
                    Mon–Sun, All 7 Days
                  </p>
                  <p className="text-neutral-600 text-[11px] sm:text-xs leading-snug mt-0.5 truncate sm:whitespace-normal">
                    5 AM to 10:30 AM &amp; 4 PM to 8 PM
                  </p>
                  <Link
                    to="/schedule"
                    className="text-[#CF1E4C] font-semibold text-xs sm:text-[13px] hover:text-[#a01638] transition-colors inline-flex items-center gap-1 mt-1"
                  >
                    View Schedule &gt;
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
