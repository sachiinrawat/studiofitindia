import { useRef } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
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
const StatPill = ({ value, label, delay = 0 }) => {
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
      <span className="text-xl md:text-2xl font-extrabold font-heading text-secondary leading-none">{value}</span>
      <span className="text-[10px] text-gray-400 font-semibold mt-1 uppercase tracking-widest">{label}</span>
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
              image: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png",
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
      <Hero />

      {/* ── HERO CONTENT — starts below the banner ── */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary mb-4"
          >
            World's #1 Live Online Fitness Studio
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-gray-900 leading-tight uppercase tracking-tight mb-5 whitespace-normal md:whitespace-nowrap px-2"
          >
            Your <span className="text-secondary">Online Fitness Studio</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto mb-8 font-medium leading-relaxed"
          >
            Experience the best in <strong className="text-gray-700">online fitness</strong>. Join our interactive{" "}
            <strong className="text-gray-700">live workout classes</strong> led by certified coaches — Yoga, HIIT, Zumba &amp; Strength Training.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-3 mb-14 w-full px-4 sm:px-0"
          >
            <button
              onClick={onStartQuiz}
              aria-label="Find my batch slot and custom diet plan"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold text-sm rounded-full hover:bg-secondary/90 transition-all active:scale-95 shadow-md shadow-secondary/20"
            >
              Find My Batch &amp; Diet Plan
            </button>
            <Link
              to="/schedule"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Calendar size={15} className="text-gray-400" />
              View Schedule
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
            >
              View Plans
            </Link>
          </motion.div>

          {/* Class Timings */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="max-w-3xl mx-auto mb-16 bg-gray-50/50 rounded-2xl p-6 md:p-8 border border-gray-100/80"
          >
            <p className="font-heading font-bold text-gray-900 text-lg mb-5">Monday to Sunday — All 7 Days</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-secondary block mb-1.5">Morning</span>
                <p className="text-gray-600 font-medium text-sm">5:00 AM, 6:00 AM, 7:00 AM, 8:00 AM, 9:00 AM, 10:30 AM</p>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-200"></div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-secondary block mb-1.5">Evening</span>
                <p className="text-gray-600 font-medium text-sm">4:00 PM, 5:00 PM, 6:00 PM, 7:00 PM, 8:00 PM</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm font-medium">You can join any class, any time, any day.</p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-8 sm:gap-8 md:gap-14">
            <StatPill value="25000+" label="Active Members" delay={0.3} />
            <StatPill value="20+"    label="Certified Coaches" delay={0.4} />
            <StatPill value="4.9★"  label="Average Rating" delay={0.5} />
          </div>
        </div>
      </section>

      {/* ── SCROLL-DRIVEN RESULTS STRIP ── */}
      <ResultsStrip />

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
              Browse our real-time live batches and book your spot directly.
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
        </div>
      </section>

      <SEOContent />

      <CTABanner />
    </div>
  );
};

export default Home;
