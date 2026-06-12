import { Dumbbell, Leaf, Flame, Zap, Users, TrendingDown, Sparkles, Heart } from "lucide-react";

/**
 * MarqueeTicker — cult.fit-style scrolling text bar
 * Animates infinitely, showing fitness keywords or brand values
 */
const items = [
  { text: "STRENGTH TRAINING", icon: Dumbbell },
  { text: "YOGA & MINDFULNESS", icon: Leaf },
  { text: "HIIT & FUNCTIONAL", icon: Flame },
  { text: "PERSONAL TRAINING", icon: Zap },
  { text: "GROUP CLASSES", icon: Users },
  { text: "WEIGHT LOSS", icon: TrendingDown },
  { text: "ONLINE LIVE CLASSES", icon: Sparkles },
  { text: "MADE FOR INDIA", icon: Heart },
];

const MarqueeTicker = ({ reverse = false }) => {
  const text = [...items, ...items]; // duplicate for seamless loop

  return (
    <div
      className={`relative overflow-hidden py-4 bg-primary/5 border-y border-primary/10 ${reverse ? "" : ""}`}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none"></div>

      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {text.map((item, i) => {
          const Icon = item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-4 px-8">
              <span className="inline-flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-widest text-white/70 whitespace-nowrap">
                <Icon size={14} className="text-primary shrink-0" />
                {item.text}
              </span>
              <span className="text-primary/40 text-lg">✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MarqueeTicker;

