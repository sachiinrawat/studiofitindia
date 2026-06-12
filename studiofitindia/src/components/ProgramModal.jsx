
import { X, Check } from "lucide-react";
import { Dumbbell, Leaf, Zap, TrendingDown, User, Users } from "lucide-react";
import { useAssetUrl } from "../utils/assets";

const iconMap = {
  Dumbbell: Dumbbell,
  Leaf: Leaf,
  Zap: Zap,
  TrendingDown: TrendingDown,
  User: User,
  Users: Users,
};

const ProgramModal = ({ program, onClose }) => {
  const imageUrl = useAssetUrl(program?.image || "");
  if (!program) return null;

  const Icon = iconMap[program.icon] || Dumbbell;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div

          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <div
          className="relative bg-navy-mid border border-primary/20 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-1.5 bg-black/30 text-white rounded-full hover:bg-primary hover:text-white transition-colors border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image & Feature Overlay */}
          <div className="w-full md:w-5/12 relative flex-shrink-0 bg-navy">
            <div className="h-56 md:h-full w-full relative">
              <img
                src={imageUrl}
                alt={program.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-mid via-navy/50 to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-mid"></div>

              {/* Icon Overlay */}
              <div className="absolute top-6 left-6 bg-primary w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                <Icon size={28} className="text-white" />
              </div>
            </div>

            {/* Mobile Title Overlay */}
            <div className="absolute bottom-4 left-4 md:hidden">
              <h2 className="text-xl font-bold text-white font-heading uppercase">
                {program.name}
              </h2>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="w-full md:w-7/12 p-6 md:p-8 text-left bg-navy-mid overflow-y-auto no-scrollbar">
            <div className="hidden md:block mb-6">
              <h2 className="text-3xl font-bold text-white font-heading uppercase italic tracking-wide mb-2 line-clamp-2">
                {program.name}
              </h2>
              <p className="text-primary text-lg font-semibold">
                {program.description}
              </p>
            </div>

            {/* Features & Best For Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-white/10 pb-1">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-sm text-gray-300"
                    >
                      <Check
                        size={14}
                        className="text-primary mr-2 mt-0.5 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-white/10 pb-1">
                  Best For
                </h3>
                <div className="flex flex-wrap gap-2">
                  {program.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-black/30 px-2 py-1 rounded text-primary-light border border-white/5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed SEO Content */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 border-b border-white/10 pb-1">
                Program Details
              </h3>
              <div className="prose prose-invert max-w-none text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {program.details}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ProgramModal;
