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
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1786901367/Untitled_design_sz6u4c.png",
    mobileImage: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1786901733/Untitled_400_x_300_px_grnism.png",
    alt: "Studio FIT India Banner",
    objectPosition: "object-top",
  },
];

const SWIPE_THRESHOLD = 50;

/* ════════════════════════════════════════════════════════
   HERO BANNER SLIDER — image only, no text overlay
════════════════════════════════════════════════════════ */
const Hero = ({ onStartQuiz }) => {
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
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%" }),
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
          <picture>
            {SLIDES[current].mobileImage && (
              <source media="(max-width: 639px)" srcSet={SLIDES[current].mobileImage} />
            )}
            <motion.img
              style={{ scale }}
              src={SLIDES[current].image}
              alt={SLIDES[current].alt}
              className={`w-full h-full object-cover ${SLIDES[current].objectPosition ?? 'object-center'}`}
              loading={SLIDES[current].id === 1 ? "eager" : "lazy"}
              fetchpriority={SLIDES[current].id === 1 ? "high" : "auto"}
              draggable={false}
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      {/* ── TOP & BOTTOM VIGNETTE SHADOWS (Cult.fit style) ── */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none" />
      {/* Bottom: fades image into the white section below — seamless blend */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/60 to-transparent z-10 pointer-events-none" />

      {/* ── CTA BUTTONS ── */}
      <div className="absolute bottom-3 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center">
        {onStartQuiz && (
          <button
            onClick={onStartQuiz}
            aria-label="Find my batch slot and custom diet plan"
            className="btn-pop inline-flex justify-center items-center bg-[#D3365F] hover:bg-[#b0294b] text-white font-bold text-[13px] md:text-sm px-6 py-3 md:px-8 md:py-3.5 rounded-full whitespace-nowrap w-full sm:w-auto max-w-[320px] mx-auto shadow-lg shadow-black/20"
          >
            Find My Batch & Diet Plan
          </button>
        )}
      </div>

      {/* ── ARROWS & DOTS (only if multiple slides) ── */}
      {total > 1 && (
        <>
          {/* ── LEFT ARROW ── */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 btn-pop"
          >
            <ChevronLeft size={18} className="text-gray-800" />
          </button>

          {/* ── RIGHT ARROW ── */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 shadow-md flex items-center justify-center hover:bg-white hover:scale-105 btn-pop"
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
                  className={`absolute inset-0 rounded-full transition-colors duration-300 ${i === current ? "bg-white" : "bg-white/50"
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
