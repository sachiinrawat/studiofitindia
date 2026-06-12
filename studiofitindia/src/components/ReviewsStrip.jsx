import { ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { reviews } from "../data/reviews";

// Large Star SVG
const LargeStar = ({ half }) => (
  <div className="relative w-8 h-8 md:w-10 md:h-10 text-[#fbbc04]">
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
    {half && (
      <div className="absolute inset-0 overflow-hidden w-1/2">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 md:w-10 md:h-10 fill-current"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    )}
    {half && (
      <div className="absolute inset-0 text-gray-300 left-1/2 overflow-hidden w-1/2 -ml-[50%]">
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 md:w-10 md:h-10 fill-current translate-x-1/2"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    )}
  </div>
);

const ReviewsStrip = () => {
  return (
    <section className="py-16 bg-white overflow-hidden relative border-t border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 w-full max-w-[1200px] relative z-10">
        {/* Title in Studio FIT India Theme */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display uppercase italic text-gray-900 mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Clients Say
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Real stories from real people.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10 lg:gap-8 w-full">
          {/* Left Summary Box */}
          <div className="flex flex-col items-center justify-center shrink-0 lg:w-[25%] lg:pt-10">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight mb-2">
              EXCELLENT
            </h3>

            <div className="flex gap-0.5 justify-center mb-3">
              <LargeStar half={false} />
              <LargeStar half={false} />
              <LargeStar half={false} />
              <LargeStar half={false} />
              <LargeStar half={true} />
            </div>

            <p className="text-sm font-medium text-gray-600 mb-3">
              Based on{" "}
              <strong className="font-extrabold text-gray-900">
                Real Stories
              </strong>
            </p>

            {/* Standard Google Text Logo */}
            <div className="flex items-center gap-1">
              <span className="text-[#4285F4] text-3xl font-bold tracking-tighter">
                G
              </span>
              <span className="text-[#EA4335] text-3xl font-bold tracking-tighter">
                o
              </span>
              <span className="text-[#FBBC05] text-3xl font-bold tracking-tighter">
                o
              </span>
              <span className="text-[#4285F4] text-3xl font-bold tracking-tighter">
                g
              </span>
              <span className="text-[#34A853] text-3xl font-bold tracking-tighter">
                l
              </span>
              <span className="text-[#EA4335] text-3xl font-bold tracking-tighter">
                e
              </span>
            </div>
          </div>

          {/* Right Cards Layout */}
          <div className="w-full lg:w-[75%] relative pb-4">
            <div className="flex w-full gap-4 overflow-x-auto pb-6 snap-x custom-horizontal-scrollbar scroll-smooth">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="min-w-[280px] sm:min-w-[300px] lg:flex-1 shrink-0 snap-start flex flex-col relative h-[250px]"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>

            {/* Float Right Button (Visible on desktop/tablet) */}
            <button className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md items-center justify-center text-gray-500 hover:text-black z-10 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsStrip;
