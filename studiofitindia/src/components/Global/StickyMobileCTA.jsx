import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PhoneCall, Sparkles } from "lucide-react";

const StickyMobileCTA = ({ onStartQuiz }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the sticky CTA only after scrolling down a bit to prevent cluttering the initial viewport
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not show sticky CTA on the contact page since there's already a full lead form there
  if (location.pathname === "/contact") return null;

  // Do not render anything if the user hasn't scrolled past 200px yet
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[49] md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100 p-4 flex items-center justify-between shadow-2xl shadow-gray-900/10 animate-fade-in-up">
      <div className="flex flex-col text-left">
        <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mb-0.5">Live Batch Finder</span>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold text-gray-950 font-heading">₹1</span>
          <span className="text-secondary font-bold uppercase text-[10px] tracking-wider">Diet Plan</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a
          href="tel:+919310666287"
          className="w-10 h-10 bg-gray-50 border border-gray-200 text-gray-700 flex items-center justify-center rounded-full active:scale-95 transition-all"
          aria-label="Call support"
        >
          <PhoneCall size={18} />
        </a>
        <button
          onClick={onStartQuiz}
          className="bg-secondary text-white font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider active:scale-95 transition-all flex items-center gap-1.5"
        >
          Claim Slot
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
