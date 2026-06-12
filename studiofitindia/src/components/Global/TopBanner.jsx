import { useState } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary via-secondary to-primary-dark text-white py-2 px-4 relative z-[60] flex items-center justify-center font-bold text-sm text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 md:mr-6">
        <span className="bg-white text-navy-mid text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider font-bold">
          Ends 7th April
        </span>
        <p className="flex items-center text-xs md:text-sm shadow-sm font-semibold">
          <Sparkles size={14} className="text-yellow-300 fill-yellow-300 inline mr-1 shrink-0 animate-pulse" /> Buy 3 Months Get 1 Month FREE | Buy 6 Months Get 2 Months FREE!
        </p>
        <a
          href="/pricing"
          className="flex items-center text-white underline underline-offset-2 hover:text-navy-mid transition-colors drop-shadow-md whitespace-nowrap"
        >
          View Deals <ArrowRight size={14} className="ml-1" />
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

