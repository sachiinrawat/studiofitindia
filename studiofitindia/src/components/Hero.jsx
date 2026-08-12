import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ════════════════════════════════════════════════════════
   BANNER SLIDES
   ─ Replace each "image" src with your Cloudinary URL.
   ─ Best image size:  1920 × 700 px  (wide landscape JPG/WebP)
   ─ Keep images clean — no text baked into the image needed,
     but you CAN use promotional images with your own text.
════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1786532256/15_wxm393.png",
    alt: "Studio FIT India — Live Online Fitness Classes",
  },
];

const SWIPE_THRESHOLD = 50;

/* ════════════════════════════════════════════════════════
   HERO BANNER SLIDER — image only, no text overlay
════════════════════════════════════════════════════════ */
const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const dragStart = useRef(null);
  const total = SLIDES.length;

  /* Scroll Zoom Effect */
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const goTo = useCallback((idx, dir) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  /* Auto-advance every 5 s */
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const t = setTimeout(() => goTo((current + 1) % total, 1), 5000);
    return () => clearTimeout(t);
  }, [current, isPaused, total, goTo]);

  const prev = () => goTo((current - 1 + total) % total, -1);
  const next = () => goTo((current + 1) % total, 1);

  /* Drag/swipe */
  const handleDragStart = (_, info) => { dragStart.current = info.point.x; };
  const handleDragEnd = (_, info) => {
    const delta = info.point.x - (dragStart.current ?? info.point.x);
    if (delta < -SWIPE_THRESHOLD) next();
    else if (delta > SWIPE_THRESHOLD) prev();
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%" }),
    center: { x: 0 },
    exit:  (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-100 select-none aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/7] max-h-[820px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── SLIDES ── */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={SLIDES[current].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          drag={total > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          onDragStart={total > 1 ? handleDragStart : undefined}
          onDragEnd={total > 1 ? handleDragEnd : undefined}
          className={`absolute inset-0 w-full h-full ${total > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
        >
          <motion.img
            style={{ scale }}
            src={SLIDES[current].image}
            alt={SLIDES[current].alt}
            className="w-full h-full object-cover object-center"
            loading={SLIDES[current].id === 1 ? "eager" : "lazy"}
            fetchpriority={SLIDES[current].id === 1 ? "high" : "auto"}
            draggable={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── TOP & BOTTOM VIGNETTE SHADOWS (Cult.fit style) ── */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none" />
      {/* Bottom: fades image into the white section below — seamless blend */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/60 to-transparent z-10 pointer-events-none" />

      {/* ── CTA BUTTON ── */}
      <div className="absolute bottom-3 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center">
        <a
          href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20%E2%82%B91."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Book a trial class at just ₹1"
          className="inline-flex justify-center items-center gap-2 bg-secondary text-white font-semibold text-[13px] md:text-sm px-6 py-3 md:px-7 md:py-2.5 rounded-full transition-all active:scale-95 whitespace-nowrap hover:bg-secondary/90 w-full sm:w-auto max-w-[280px] mx-auto"
          style={{
            boxShadow: "0 -2px 8px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)",
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 -3px 12px rgba(0,0,0,0.25), 0 6px 22px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.15)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "0 -2px 8px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.12)"}
        >
          Book a Trial at Just ₹1
        </a>
      </div>

      {/* ── ARROWS & DOTS (only if multiple slides) ── */}
      {total > 1 && (
        <>
          {/* ── LEFT ARROW ── */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition-all active:scale-95"
          >
            <ChevronLeft size={18} className="text-gray-800" />
          </button>

          {/* ── RIGHT ARROW ── */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 transition-all active:scale-95"
          >
            <ChevronRight size={18} className="text-gray-800" />
          </button>

          {/* ── DOT INDICATORS ── */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative overflow-hidden rounded-full transition-all duration-300 focus:outline-none"
                style={{ width: i === current ? 24 : 7, height: 7 }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                    i === current ? "bg-white" : "bg-white/50"
                  }`}
                />
                {/* Progress bar on active dot */}
                {i === current && !isPaused && (
                  <motion.span
                    key={`prog-${current}`}
                    className="absolute inset-0 rounded-full bg-secondary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5, ease: "linear" }}
                    style={{ transformOrigin: "left" }}
                  />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Hero;
