import { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary-dark text-white py-2 px-4 relative z-[60] flex items-center justify-center font-bold text-sm text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 md:mr-6">
        <span className="bg-amber-400 text-gray-950 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-sm tracking-wider font-bold shadow-sm">
          Sale Till 9th Nov
        </span>
        <p className="flex items-center text-xs md:text-sm shadow-sm font-semibold">
          <Sparkles size={14} className="text-yellow-300 fill-yellow-300 inline mr-1.5 shrink-0 animate-pulse" />
          <strong className="mr-1">GREAT FESTIVE FIT SALE:</strong> Buy Now, Start Later! Renew by 31st Oct &amp; Get 21-Day Fat to Fit Challenge FREE!
        </p>
        <a
          href="/pricing"
          className="inline-flex items-center text-yellow-300 font-bold underline underline-offset-2 hover:text-white transition-colors drop-shadow-md whitespace-nowrap text-xs md:text-sm ml-1"
        >
          View Offers <ArrowRight size={14} className="ml-1" />
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Close banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TopBanner;

