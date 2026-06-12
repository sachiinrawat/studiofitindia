import { useState } from "react";

import Hero from "../components/Hero";
import Transformations from "../components/Transformations";

import ProgramsStrip from "../components/ProgramsStrip";
import WhyChooseUs from "../components/WhyChooseUs";
import HomePricing from "../components/HomePricing";
import ReviewsStrip from "../components/ReviewsStrip";
import CTABanner from "../components/CTABanner";
import FAQAccordion from "../components/FAQAccordion";
import SEO from "../components/SEO";
import SEOContent from "../components/SEOContent";
import { faqs } from "../data/faqs";

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
      {/* <Transformations /> */}
      <Hero onStartQuiz={onStartQuiz} />

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
