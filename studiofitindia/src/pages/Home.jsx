import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

import Hero from "../components/Hero";
import ProgramsStrip from "../components/ProgramsStrip";
import WhyChooseUs from "../components/WhyChooseUs";
import HomePricing from "../components/HomePricing";
import ReviewsStrip from "../components/ReviewsStrip";
import CTABanner from "../components/CTABanner";
import FAQAccordion from "../components/FAQAccordion";
import SEO from "../components/SEO";
import SEOContent from "../components/SEOContent";
import { faqs } from "../data/faqs";

/* ─── Transformation result images ─── */
const MARQUEE_IMGS = [
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
];

/* ─── Stat pill with scroll-in animation ─── */
const StatPill = ({ value, label, delay = 0, isRating = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      {isRating ? (
        <>
          <div className="flex items-center gap-1 mb-1">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i <= 4 ? 'text-yellow-400' : 'text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xl md:text-3xl font-extrabold font-heading text-secondary leading-none mb-1 md:mb-2">4.9</span>
        </>
      ) : (
        <span className="text-xl md:text-3xl font-extrabold font-heading text-secondary leading-none mb-1 md:mb-2">{value}</span>
      )}
      <span className="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">{label}</span>
    </motion.div>
  );
};

/* ─── Infinite Auto-Scrolling Results Marquee ─── */
const ResultsStrip = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });

  /* Duplicate images for seamless infinite loop */
  const imgs = [...MARQUEE_IMGS, ...MARQUEE_IMGS, ...MARQUEE_IMGS];

  return (
    <section className="relative bg-white py-12 border-b border-gray-100 overflow-hidden">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 14 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="text-center mb-8 px-4"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary mb-0.5">Real Results</p>
        <h2 className="text-2xl md:text-3xl font-extrabold font-heading text-gray-900">Member Transformations</h2>
      </motion.div>

      {/* Marquee track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 inset-y-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        {/* Right fade */}
        <div className="absolute right-0 inset-y-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        <div
          className="flex gap-4 w-max"
          style={{
            animation: "marquee-scroll 28s linear infinite",
          }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = "paused"}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = "running"}
        >
          {imgs.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white"
              style={{ width: 220 }}
            >
              <img
                src={src}
                alt={`Member transformation ${(i % MARQUEE_IMGS.length) + 1}`}
                loading="lazy"
                draggable={false}
                className="w-full h-64 md:h-72 object-contain bg-white"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = ({ onStartQuiz }) => {
  return (
    <div className="w-full">
      <SEO
        title="Online Fitness Studio & Gym | Live Online Fitness Classes India"
        description="Join Studio FIT India, the leading online fitness studio. Experience the best online gym and online live workout classes. We offer online fitness classes for Yoga, HIIT, and Zumba."
        keywords={[
          "Online Fitness Studio",
          "Online Fitness Classes",
          "Online Fitness",
          "Online Live Workout Classes",
          "Online Gym",
          "Fitness Classes Online",
          "live online yoga classes India",
          "online zumba classes",
          "virtual fitness classes India",
          "live HIIT classes online",
          "Studio FIT India",
          "online personal training India",
          "weight loss online classes",
          "Online Fitness Classes Worldwide",
          "Online Strength Training",
          "Online Zumba Classes",
          "Online HIIIT Classes",
          "Fitness Classes",
          "Premium Fitness Classes",
        ]}
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": ["LocalBusiness", "FitnessCenter"],
              name: "Studio FIT India",
              description:
                "Join India's #1 online live fitness classes — Yoga, HIIT, Zumba, Strength Training & Personal Training led by certified coaches.",
              url: "https://studiofitindia.com",
              telephone: "+91 93106 66287",
              email: "studiofitindia@gmail.com",
              priceRange: "₹₹",
              image: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1787160047/sfi_pdk6so.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Greater Noida",
                addressLocality: "Greater Noida",
                addressRegion: "UP",
                postalCode: "201308",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.instagram.com/studiofitindia",
                "https://www.youtube.com/@studiofitindia",
              ],
              openingHours: "Mo-Su 06:00-21:00",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "500",
              },
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                value: 20,
              },
              acceptedPaymentMethod: [
                { "@type": "PaymentMethod", name: "UPI" },
                { "@type": "PaymentMethod", name: "Credit Card" },
                { "@type": "PaymentMethod", name: "Debit Card" },
                { "@type": "PaymentMethod", name: "Net Banking" },
                { "@type": "PaymentMethod", name: "Digital Wallet" },
              ],
              hasOfferCatalog: {

                "@type": "OfferCatalog",
                name: "Online Fitness Classes",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Online Yoga Classes" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Online HIIT Classes" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Online Zumba Classes" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Online Strength Training",
                    },
                  },
                ],
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.slice(0, 8).map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            },
          ],
        }}
      />
      {/* ── BANNER SLIDER (image only, no text) ── */}
      <Hero onStartQuiz={onStartQuiz} />

      {/* ── HERO CONTENT — starts below the banner ── */}
      <section className="relative py-12 md:py-16 border-b border-gray-100 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, #fff7f9 0%, #fff 40%, #f8f4ff 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(211,54,95,0.05) 0%, transparent 70%)" }} />
        <div className="relative z-10 container mx-auto px-6 max-w-6xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-bold uppercase tracking-[0.22em] text-secondary mb-4"
          >
            World's #1 Live Online Fitness Studio
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-heading text-gray-900 leading-tight uppercase tracking-tight mb-6 whitespace-normal md:whitespace-nowrap px-2"
          >
            Your <span className="text-secondary">Online Fitness Studio</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Experience the best in online fitness. Join our interactive live workout classes led by certified coaches — Yoga, HIIT, Zumba, Aerobics, Strength Training, Pilates, Functional Training & Weight Loss Program.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 mb-14 w-full px-4 sm:px-0"
          >
            <a
              href="https://wa.me/918796442732?text=Hi!%20I%20want%20to%20book%20a%20trial%20at%20just%20%E2%82%B91."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book a trial class at just ₹1"
              className="btn-pop w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold text-sm rounded-full text-center"
            >
              Book a Trial at Just ₹1
            </a>
            <Link
              to="/schedule"
              className="btn-pop w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full flex items-center justify-center gap-2"
            >
              <Calendar size={15} className="text-gray-400" />
              View Schedule
            </Link>
            <Link
              to="/pricing"
              className="btn-pop w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full"
            >
              View Plans
            </Link>
          </motion.div>

          {/* Flexible Schedule Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="max-w-4xl mx-auto mb-20 bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-200/80 shadow-sm text-center"
          >
            {/* Tag Badge */}
            <span className="inline-block bg-[#FDF2F4] text-secondary text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              ANYTIME, ANYWHERE
            </span>

            {/* Heading */}
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-gray-900 leading-tight tracking-tight mb-3">
              Smarter Training, <br className="hidden sm:inline" />
              <span className="text-secondary">Flexible Schedule for Everyone</span>
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              Choose morning, afternoon, or evening. Never compromise work or family time for your health.
            </p>

            {/* Two Batch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10 text-left">
              {/* Morning Batches */}
              <div className="bg-[#FFFDF7] border border-[#FDE68A] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#E58A00] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base leading-tight">Morning Batches</h4>
                    <p className="text-gray-500 text-xs font-medium mt-0.5">Wake up energized before work</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:30 AM"].map((time) => (
                    <span
                      key={time}
                      className="px-3.5 py-1.5 rounded-xl border border-amber-200/90 bg-white text-gray-900 font-bold text-xs sm:text-sm shadow-xs"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>

              {/* Evening Batches */}
              <div className="bg-[#FFF8F9] border border-[#FECDD3] rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Clock size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base leading-tight">Evening Batches</h4>
                    <p className="text-gray-500 text-xs font-medium mt-0.5">De-stress and sweat after work</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map((time) => (
                    <span
                      key={time}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200/90 bg-white text-gray-900 font-bold text-xs sm:text-sm shadow-xs"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Button */}
            <div className="flex justify-center">
              <Link
                to="/schedule"
                className="btn-pop w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 font-bold text-xs sm:text-sm rounded-full transition-all text-center shadow-xs"
              >
                View Full Live Schedule
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="relative flex justify-center">
            <div className="grid grid-cols-3 w-full max-w-lg border border-gray-100 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
              <div className="flex flex-col items-center py-5 px-3 border-r border-gray-100">
                <StatPill value="25000+" label="Active Members" delay={0.3} />
              </div>
              <div className="flex flex-col items-center py-5 px-3 border-r border-gray-100">
                <StatPill value="25+" label="Certified Coaches" delay={0.4} />
              </div>
              <div className="flex flex-col items-center py-5 px-3">
                <StatPill value="4.9" label="Average Rating" delay={0.5} isRating={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLL-DRIVEN RESULTS STRIP ── */}
      <ResultsStrip />

      {/* ── TRANSFORMATION CTA ── */}
      <section className="py-20 md:py-28 bg-white border-t border-b border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-secondary mb-4">90-Day Program</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-heading text-gray-900 leading-tight uppercase tracking-tight mb-5">
                Ready to <span className="text-secondary">Transform?</span>
              </h2>
              <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Experience the best in online fitness. Join our interactive live workout classes led by certified coaches — Yoga, HIIT, Zumba, Aerobics, Strength Training, Pilates, Functional Training & Weight Loss Program.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/transformation"
                  className="btn-pop w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold text-sm rounded-full text-center"
                >
                  Explore the Program
                </Link>
                <Link
                  to="/transformation#assessment"
                  className="btn-pop w-full sm:w-auto px-8 py-4 border border-gray-200 text-gray-700 font-bold text-sm rounded-full text-center hover:border-secondary hover:text-secondary transition-colors"
                >
                  Request a Callback
                </Link>
              </div>
            </motion.div>

            {/* Right — 4 feature pills */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { num: "01", title: "Clean Eating, No Crash Diets", desc: "Real food, sustainable habits — no supplements or shakes." },
                { num: "02", title: "Unlimited Live Classes", desc: "Yoga, Zumba, HIIT, Pilates, Aerobics & more — every day." },
                { num: "03", title: "Personal Dietician", desc: "A custom fat-loss diet plan built around your lifestyle." },
                { num: "04", title: "Expert Guidance", desc: "Coaches tell you exactly which classes to attend for your goal." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: "easeOut" }}
                  className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:border-secondary/40 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block mb-3">{item.num}</span>
                  <h3 className="text-gray-900 font-bold text-base mb-2 leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <ProgramsStrip />

      <WhyChooseUs />

      <ReviewsStrip />

      <HomePricing />

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Embedded Live Schedule */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
              Online Live Fitness{" "}
              <span className="text-secondary">Class Schedule</span>
            </h2>
            <p className="text-gray-500 text-base">
              Browse our live batches below — click any class inside to register your spot.
            </p>
          </div>
          <div className="w-full max-w-5xl bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[700px]">
            <iframe
              title="Studio Fit India Schedule"
              src="https://studiogx-online-fitness.punchpass.com/classes?embed=true"
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            Need help booking?{" "}
            <a
              href="https://wa.me/919310666287?text=Hi!%20I%20want%20to%20book%20a%20class."
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold hover:underline"
            >
              WhatsApp us
            </a>{" "}
            and we'll reserve your spot in minutes.
          </p>
        </div>
      </section>

      <SEOContent />

      <CTABanner />
    </div>
  );
};

export default Home;
