import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const CTABanner = () => {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Diagonal clip BG — static gradient, no animation */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"
        style={{ clipPath: "polygon(0 8%, 100% 0%, 100% 92%, 0 100%)" }}
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none"
        style={{ clipPath: "polygon(0 8%, 100% 0%, 100% 92%, 0 100%)" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Ghost background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <span
            className="text-[10vw] font-display font-bold uppercase italic whitespace-nowrap leading-none select-none"
            style={{
              WebkitTextStroke: "1px rgba(0,0,0,0.12)",
              color: "transparent",
            }}
          >
            JOIN NOW
          </span>
        </div>

        <h2
          className="text-4xl md:text-6xl font-bold font-display uppercase italic text-white mb-4 leading-tight drop-shadow-md"
        >
          Welcome to our <span className="text-gray-900/80">Fitness Family</span>
        </h2>
        <p
          className="text-lg text-white/80 mb-10 max-w-xl mx-auto"
        >
          Where sweat, support, and success intertwine. Join thousands already
          transformed.
        </p>

        {/* Urgency line */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <p className="text-white/90 text-sm font-semibold tracking-wide">
            Limited Seats This Week&nbsp;&nbsp;·&nbsp;&nbsp;₹1 Offer Ends Sunday
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/pricing"
            className="inline-block bg-white text-gray-900 font-bold py-4 px-12 uppercase tracking-widest transform -skew-x-6 hover:bg-gray-100 transition-all shadow-xl text-sm"
          >
            <span className="inline-block transform skew-x-6">
              Enroll Now →
            </span>
          </Link>
          <a
            href="https://wa.me/919310666287?text=Hi!%20I%20just%20visited%20your%20website%20and%20I%20want%20to%20book%20a%20trial%20at%20just%20₹1."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book a trial at just ₹1 on WhatsApp"
            className="inline-block bg-transparent text-white font-bold py-4 px-10 uppercase tracking-widest transform -skew-x-6 hover:bg-white/10 transition-all border border-white/40 text-sm"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "conversion", {
                  send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
                });
              }
            }}
          >
            <span className="inline-block transform skew-x-6">
              Book a Trial at Just ₹1
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
