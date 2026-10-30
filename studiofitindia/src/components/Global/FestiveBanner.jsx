import { useState, useEffect } from "react";
import { X, Flame } from "lucide-react";
import { FESTIVE_OFFER_EXPIRY } from "../../data/pricing";

const BRAND   = "#D3365F";
const GOLD    = "#F59E0B";
const DARK_BG = "#1a1a1a";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: diff === 0,
  };
}

const Pad = ({ v }) => (
  <div className="flex flex-col items-center">
    <span
      className="text-xl md:text-2xl font-black tabular-nums leading-none"
      style={{ color: GOLD, minWidth: "2ch", textAlign: "center" }}
    >
      {String(v).padStart(2, "0")}
    </span>
  </div>
);

const Sep = () => (
  <span className="text-base font-black" style={{ color: GOLD, lineHeight: 1 }}>:</span>
);

const FestiveBanner = () => {
  const [time, setTime]       = useState(() => getTimeLeft(FESTIVE_OFFER_EXPIRY));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (time.expired) return;
    const id = setInterval(() => {
      const t = getTimeLeft(FESTIVE_OFFER_EXPIRY);
      setTime(t);
      if (t.expired) clearInterval(id);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Hide if expired or user dismissed
  if (!visible || time.expired) return null;

  return (
    <div
      className="w-full relative flex items-center justify-center gap-3 md:gap-6 px-4 py-2.5 flex-wrap"
      style={{ background: DARK_BG, borderBottom: `2px solid ${BRAND}` }}
    >
      {/* Flame icon */}
      <span className="flex items-center gap-1.5 shrink-0">
        <Flame size={16} style={{ color: GOLD }} />
        <span
          className="text-[11px] md:text-xs font-black tracking-[0.14em] uppercase"
          style={{ color: GOLD }}
        >
          Festive Sale
        </span>
      </span>

      {/* Offer text */}
      <span className="text-white text-[12px] md:text-sm font-semibold text-center">
        🎉 Get{" "}
        <span className="font-black" style={{ color: GOLD }}>6+6 Months @ ₹4,999</span>
        {" "}or{" "}
        <span className="font-black" style={{ color: GOLD }}>1+1 Year @ ₹6,999</span>
        {" "}— Offer ends in
      </span>

      {/* Countdown */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Pad v={time.days} /><span className="text-[10px] text-gray-400 -mt-0.5">d</span>
        <Sep />
        <Pad v={time.hours} /><span className="text-[10px] text-gray-400 -mt-0.5">h</span>
        <Sep />
        <Pad v={time.minutes} /><span className="text-[10px] text-gray-400 -mt-0.5">m</span>
        <Sep />
        <Pad v={time.seconds} /><span className="text-[10px] text-gray-400 -mt-0.5">s</span>
      </div>

      {/* CTA */}
      <a
        href="/pricing"
        className="shrink-0 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest transition-all hover:opacity-90 active:scale-95"
        style={{ background: BRAND, color: "#fff" }}
      >
        GRAB NOW
      </a>

      {/* Dismiss */}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FestiveBanner;
