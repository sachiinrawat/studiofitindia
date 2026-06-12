import { useState, useEffect } from "react";
import { X, Sparkles, Clock, Gift, ArrowRight } from "lucide-react";

// ── Holi Sale expires: March 4th, 2026 at 23:59:59 IST ──────────────────────
const SALE_DEADLINE = new Date("2026-03-04T23:59:59+05:30");

function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      expired: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const Pad = ({ n }) => (
  <span className="inline-block w-8 text-center font-bold text-white tabular-nums">
    {String(n).padStart(2, "0")}
  </span>
);

const HoliBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const t = useCountdown(SALE_DEADLINE);

  if (dismissed || t.expired) return null;

  return (
      <div
        className="relative z-[60] overflow-hidden transition-all duration-400"
        style={{
          background:
            "linear-gradient(90deg, #e91e8c 0%, #ff5722 25%, #ff9800 50%, #4caf50 75%, #2196f3 100%)",
        }}
      >
        {/* Holi colour splash blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {["#ff0", "#f0f", "#0ff", "#f60", "#0f8", "#f08"].map((c, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 blur-2xl"
              style={{
                background: c,
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                top: `-${20 + i * 10}%`,
                left: `${i * 16}%`,
              }}
            />
          ))}
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-8 py-2 text-sm text-white font-bold text-center">
          {/* SVG Sparkles + label */}
          <span className="text-base whitespace-nowrap drop-shadow flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-300 fill-yellow-300 shrink-0" />
            <span>HOLI SALE IS LIVE – Save Big on Studio FIT India!</span>
            <Sparkles size={16} className="text-yellow-300 fill-yellow-300 shrink-0" />
          </span>

          {/* Countdown */}
          <span className="flex items-center gap-1 bg-black/25 rounded-full px-3 py-0.5 text-xs">
            <Clock size={12} className="shrink-0 text-white" />
            <span>Ends in:</span>
            <Pad n={t.days} />
            <span className="opacity-70">d</span>
            <Pad n={t.hours} />
            <span className="opacity-70">h</span>
            <Pad n={t.minutes} />
            <span className="opacity-70">m</span>
            <Pad n={t.seconds} />
            <span className="opacity-70">s</span>
          </span>

          {/* CTA */}
          <a
            href="/pricing"
            className="bg-white text-pink-600 font-extrabold px-4 py-1.5 rounded-full text-xs hover:bg-pink-50 transition-colors shadow-lg whitespace-nowrap flex items-center gap-1"
          >
            <Gift size={12} className="shrink-0" />
            <span>Grab Offer</span>
            <ArrowRight size={12} className="shrink-0" />
          </a>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss Holi sale banner"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-1"
        >
          <X size={14} />
        </button>
      </div>
  );
};

export default HoliBanner;

