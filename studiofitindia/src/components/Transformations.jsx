import React from "react";
import { Link } from "react-router-dom";
import { TrendingDown, Star, Clock, Heart, Users } from "lucide-react";

const Transformations = () => {
  const stats = [
    {
      id: 1,
      icon: <TrendingDown size={24} className="text-secondary" />,
      value: "12-15 kg",
      label: "Avg. Weight Loss in 90 Days",
    },
    {
      id: 2,
      icon: <Star size={24} className="text-secondary" />,
      value: "95%+",
      label: "Success Rate",
    },
    {
      id: 3,
      icon: <Users size={24} className="text-secondary" />,
      value: "90 Days",
      label: "Most Popular Program",
    },
    {
      id: 4,
      icon: <Clock size={24} className="text-secondary" />,
      value: "3-4 Weeks",
      label: "Time to First Results",
    },
  ];

  // Provide 5 items for a nice bento/masonry layout
  const transformations = [
    {
      id: 1,
      name: "Suparna",
      result: "97 Kg to 65 Kg",
      timeframe: "10 Months",
      testimonial:
        "Studio FIT India completely changed my relationship with fitness. The coaches supported me every step of the way!",
      badges: ["-32 KG Weight Loss", "High Energy"],
      image:
        "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1774685156/1_mryhls.jpg",
      alt: "Suparna's weight loss transformation — 97 kg to 65 kg in 10 months with Studio FIT India online fitness classes",
      className: "md:col-span-2 md:row-span-2", // Large feature card
    },
    {
      id: 2,
      name: "Pallavi",
      result: "104 Kgs to 77kgs",
      timeframe: "Transformation at 43",
      testimonial: "From 104kgs to 77kgs, and dropping from a size 43 to 37.",
      badges: ["-27 KG", "-30 Inches"],
      image:
        "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1774685156/new1_ylm9wl.jpg",
      alt: "Pallavi's weight loss transformation at 43 — 104 kg to 77 kg with Studio FIT India online weight loss program",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: 3,
      name: "Meenakshi",
      result: "Reduced Stubborn Tummy Fat",
      timeframe: "12 Weeks",
      testimonial:
        "I struggled with post-pregnancy belly fat for years. The HIIT finally helped me lose it.",
      badges: ["Fat Loss", "Core"],
      image:
        "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1774685157/new2_uhvfwb.jpg",
      alt: "Meenakshi's post-pregnancy belly fat loss transformation in 12 weeks with online HIIT classes at Studio FIT India",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      id: 4,
      name: "Neha",
      result: "PCOS Management & Fat Loss",
      timeframe: "6 Months",
      testimonial:
        "Not only did I lose weight, but my PCOS symptoms have naturally reversed.",
      badges: ["PCOS Relief"],
      image:
        "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1774685157/new3_iyodfb.jpg",
      alt: "Neha's PCOS management and fat loss transformation in 6 months with Studio FIT India online yoga and fitness classes",
      className: "md:col-span-2 md:row-span-1", // Wide rectangle
    },
    {
      id: 5,
      name: "Anjali",
      result: "Gained Super Strength",
      timeframe: "4 Months",
      testimonial:
        "I used to be intimidated by workouts, now I look forward to them daily!",
      badges: ["Strength Gain"],
      image:
        "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1774685157/Screenshot_2026-01-31_144454_tqqzzc.png",
      alt: "Anjali's strength training transformation in 4 months — online strength training classes at Studio FIT India",
      className: "hidden lg:block lg:col-span-1 md:row-span-1", // Keep grid balanced
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-700 uppercase tracking-wider text-xs font-semibold mb-6">
            <Heart size={14} className="text-secondary" />
            Join 25,000+ Strong Women
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-gray-900 mb-6">
            Real Women. <span className="text-secondary">Real Results.</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Don't just take our word for it. See the incredible life-changing
            transformations achieved by women just like you from their own
            living rooms.
          </p>
        </div>

        {/* ─── Bento Grid Image Revealer ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] mb-20">
          {transformations.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group rounded-2xl bg-white border border-gray-200 cursor-pointer shadow-sm hover:shadow-md ${item.className || "md:col-span-1 md:row-span-1"}`}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML +=
                    '<div class="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-400 z-0 p-4 text-center"><span class="text-xs uppercase tracking-widest font-bold">Image Placeholder</span></div>';
                }}
              />

              {/* Subtle Gradient Overlay for legibility when not hovered */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent opacity-80" />

              {/* Name visible at bottom when NOT hovered */}
              <div className="absolute bottom-4 left-4 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <h4 className="text-white font-heading font-bold text-lg tracking-wide">
                  {item.name}
                </h4>
              </div>

              {/* Reveal Canvas - appears on hover */}
              <div className="absolute inset-0 bg-white z-20 flex flex-col justify-center items-center p-6 text-center text-gray-900 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-bold font-heading mb-1 text-secondary">
                  {item.name}
                </h3>
                <div className="text-gray-950 font-extrabold text-base mb-3">
                  {item.result}
                </div>
                <p className="text-xs text-gray-600 italic mb-5 leading-relaxed max-w-[250px] mx-auto">
                  "{item.testimonial}"
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 mt-auto pb-2">
                  {item.badges.map((b, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-gray-100 text-[10px] font-bold rounded-full uppercase tracking-wider text-gray-700 border border-gray-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-gray-50/50 p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center text-center transition duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-xs font-semibold tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* PROMINENT CTA SECTION */}
        <div className="text-center max-w-5xl mx-auto bg-gray-50 border border-gray-200 p-10 md:p-16 rounded-3xl shadow-sm relative overflow-hidden">
          <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 mb-6 leading-tight">
            Ready to Transform <br className="hidden md:block" />
            <span className="text-secondary">Like Them?</span>
          </h3>

          <p className="text-gray-600 text-base md:text-lg mb-10 max-w-2xl mx-auto font-normal">
            Join thousands of women who've already achieved their fitness goals
            from the comfort of home.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-secondary text-white font-bold uppercase tracking-wider py-4 px-8 rounded-full shadow hover:bg-secondary/95 active:scale-95 transition-all"
            >
              Book a Trial at Just ₹1
            </Link>
            <Link
              to="/programs"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold uppercase tracking-wider py-4 px-8 rounded-full active:scale-95 transition-all"
            >
              View Our Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transformations;
