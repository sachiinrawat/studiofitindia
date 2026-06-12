import { ArrowDown, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAssetUrl } from "../utils/assets";
import FitnessBackground from "./FitnessBackground";

// Wrapper so useAssetUrl hook can be called per-image
const ThemeImage = ({ path, alt, className, loading = "lazy", width, height }) => {
  const src = useAssetUrl(path);
  return <img src={src} alt={alt} className={className} loading={loading} width={width} height={height} />;
};

const Hero = ({ onStartQuiz }) => {
  return (
    <section className="relative min-h-[75vh] w-full flex flex-col justify-center overflow-hidden bg-white pt-3 pb-7 border-b border-gray-100">
      {/* === Static Clean Background Layers === */}
      <div className="absolute inset-0 z-0 bg-gray-50/50"></div>

      <FitnessBackground />

      {/* === Main Centered Content === */}
      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center flex-grow flex flex-col justify-center pt-2">
        {/* Brand Tag */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-secondary/5 border border-secondary/15 text-secondary uppercase tracking-widest text-xs font-bold mb-6 mx-auto">
          <Sparkles size={14} className="text-secondary animate-pulse" />
          Top Online Home Workout
        </div>

        {/* Dynamic Typography Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold font-heading text-gray-900 mb-6 leading-tight max-w-3xl mx-auto uppercase tracking-tight">
          Your Premium <span className="text-secondary">Online Fitness Studio</span> <br />
          & Online Gym
        </h1>

        {/* Human-Written High-Performance Copywriting */}
        <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto font-medium">
          Experience the best in <strong>online fitness</strong>. Join our interactive <strong>online live workout classes</strong> led by certified coaches. We offer the top <strong>fitness classes online</strong> including Yoga, HIIT, Zumba, and Strength Training.
        </p>

        {/* Flexible Symmetrical CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-md md:max-w-none mx-auto mb-16">
          <button
            onClick={onStartQuiz}
            aria-label="Find my batch slot and custom diet plan"
            className="w-full sm:w-auto px-8 py-4 bg-secondary hover:bg-secondary/95 text-white font-bold text-sm rounded-full transition-all active:scale-95 shadow-sm"
          >
            Find My Batch & Diet Plan
          </button>

          <Link
            to="/schedule"
            aria-label="View our class schedules"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar size={16} className="text-gray-400" />
            View Schedule
          </Link>

          <Link
            to="/pricing"
            aria-label="View our membership plans"
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 flex items-center justify-center"
          >
            View Membership Plans
          </Link>
        </div>
      </div>

      {/* Verification Strip: Verified Results Marquee */}
      <div className="w-full border-t border-b border-gray-100 py-6 bg-gray-50/30 overflow-hidden relative select-none">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

        <div className="marquee-track flex gap-4 items-center">
          {[
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
            // Duplicate for infinite scroll
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
            "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
          ].map((path, idx) => (
            <ThemeImage
              key={`hero-result-${idx}`}
              path={path}
              loading="eager"
              width={240}
              height={320}
              alt="Studio Fit India Client Result"
              className="h-56 w-40 md:h-80 md:w-60 object-contain bg-white border border-gray-200 shadow-sm flex-shrink-0 rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 pb-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce pointer-events-none opacity-40">
        <ArrowDown size={20} className="text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
