
import { Dumbbell, Leaf, Zap, TrendingDown, User, Users } from "lucide-react";
import { useAssetUrl } from "../utils/assets";
import { Link } from "react-router-dom";

const iconMap = {
  Dumbbell: Dumbbell,
  Leaf: Leaf,
  Zap: Zap,
  TrendingDown: TrendingDown,
  User: User,
  Users: Users,
};

const ProgramCard = ({ program, onSelect }) => {
  const imageUrl = useAssetUrl(program.image);
  const Icon = iconMap[program.icon] || Dumbbell;

  return (
    <div
      className="bg-white overflow-hidden border border-gray-100 hover:border-primary/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative group h-full flex flex-col"
    >
      {/* Top gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Image Banner */}
      <div className="h-52 w-full relative overflow-hidden">
        {/* Diagonal bottom clip on image */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
        <img
          src={imageUrl}
          alt={program.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Icon badge */}
        <div className="absolute bottom-4 left-5 z-20 bg-white w-11 h-11 flex items-center justify-center border border-gray-200 group-hover:bg-primary transition-colors duration-300">
          <Icon
            size={20}
            className="text-primary group-hover:text-white transition-colors"
          />
        </div>
      </div>

      <div className="p-7 pt-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold font-display uppercase tracking-wide mb-2 text-gray-900 group-hover:text-primary transition-colors">
          {program.name}
        </h3>
        <p className="text-gray-500 mb-5 flex-grow text-sm leading-relaxed">
          {program.description}
        </p>

        <div className="mb-5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
            Best For:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {program.bestFor.map((item, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-[10px] px-2 py-0.5 text-gray-700 border border-gray-200 font-medium tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="divider-gradient mb-4" />

        {/* Actions */}
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <a
            href={`https://wa.me/919310666287?text=${encodeURIComponent(
              `Hi! I'm interested in the ${program.name} program. Can I book a trial at just ₹1?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-bold py-3 rounded-full transition-all text-sm shadow-lg shadow-primary/20"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "conversion", {
                  send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
                });
              }
            }}
          >
            Book a Trial at Just ₹1
          </a>
          <Link
            to={`/${program.slug}`}
            className="text-gray-500 font-bold hover:text-gray-900 transition-colors flex items-center justify-center uppercase tracking-widest text-xs group/btn"
          >
            View Details
            <span className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;

