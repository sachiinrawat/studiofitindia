import { useRef } from "react";
import ReviewCard from "./ReviewCard";
import { reviews } from "../data/reviews";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReviewCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full relative group">
      {/* 
        Native CSS Scroll Snap
        - GPU accelerated scrolling (buttery smooth)
        - Snap points for clean alignment
        - No JS drag overhead
      */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 px-4 -mx-4 custom-horizontal-scrollbar scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="snap-center md:snap-start flex-shrink-0 w-[300px] md:w-[400px] h-full"
          >
            {/* 
              We wrap ReviewCard in a plain div to avoid motion interference.
              We can keep ReviewCard's internal motion if it's light, 
              or we could pass a prop to disable it if needed.
            */}
            <ReviewCard review={review} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => scroll("left")}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-md"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
