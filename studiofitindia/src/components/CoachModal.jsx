
import { X, Trophy, Star } from "lucide-react";
import { useAssetUrl } from "../utils/assets";

const CoachModal = ({ coach, onClose }) => {
  const imageUrl = useAssetUrl(coach?.image || "");
  if (!coach) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div

          onClick={onClose}
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
        />

        {/* Modal Content */}
        <div
          className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 bg-white/80 text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-md border border-gray-100"
          >
            <X size={20} />
          </button>

          {/* Left Column: Image & Quick Info */}
          <div className="w-full md:w-5/12 relative flex-shrink-0">
            <div className="h-48 md:h-full w-full">
              <img
                src={imageUrl}
                alt={coach.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.classList.add("bg-gray-100");
                }}
              />
            </div>

            {/* Mobile Name Overlay */}
            <div className="absolute bottom-4 left-4 md:hidden bg-white/90 p-3 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 font-display italic uppercase">
                {coach.name}
              </h2>
              <p className="text-secondary text-sm font-bold">{coach.role}</p>
            </div>
          </div>

          {/* Right Column: Bio & Details */}
          <div className="w-full md:w-7/12 p-6 md:p-10 text-left bg-white overflow-y-auto no-scrollbar">
            <div className="hidden md:block mb-6">
              <h2 className="text-3xl font-bold text-gray-900 font-display italic uppercase mb-1">
                {coach.name}
              </h2>
              <p className="text-lg text-secondary font-bold">
                {coach.role}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Star size={14} className="text-primary" /> Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {coach.specializations.map((spec, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-50 px-3 py-1 rounded-full text-xs text-gray-600 font-medium border border-gray-100"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                <Trophy size={14} className="text-primary" /> Biography
              </h3>
              <div className="max-w-none text-gray-600 text-sm leading-relaxed whitespace-pre-line font-medium">
                {coach.bio}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CoachModal;
