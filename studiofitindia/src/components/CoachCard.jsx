
import { useAssetUrl } from "../utils/assets";

const CoachCard = ({ coach, onSelect }) => {
  const imageUrl = useAssetUrl(coach.image);
  return (
    <div
      onClick={() => onSelect(coach)}
      className="group relative rounded-2xl overflow-hidden bg-white h-[450px] cursor-pointer border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="h-[320px] w-full overflow-hidden relative">
        <img
          src={imageUrl}
          decoding="async"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentElement.classList.add("bg-gray-100");
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-1 font-display uppercase italic">
          {coach.name}
        </h3>
        <p className="text-secondary font-bold text-sm">{coach.role}</p>
      </div>

      <div className="hidden"></div>
    </div>
  );
};

export default CoachCard;
