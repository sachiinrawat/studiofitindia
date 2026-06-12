import React, { useState, useEffect, useRef } from "react";
import { ZoomIn } from "lucide-react";

// Image Component with Skeleton Loader
const GalleryImage = ({ event }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className={`group relative overflow-hidden rounded-3xl bg-gray-100 border border-gray-100 shadow-md transition-all duration-500 hover:border-primary/30 ${event.className}`}
    >
      {/* Skeleton Loader (YouTube Style) */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      )}

      {isInView && (
        <img
          src={event.image}
          alt={event.alt}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover ${event.objectPosition || "object-center"} transition-transform duration-700 group-hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Minimal Overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
        <div className="bg-primary/40 w-12 h-12 rounded-full flex items-center justify-center border border-primary/30 transform scale-90 group-hover:scale-100 transition-transform duration-500">
          <ZoomIn className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

const eventImages = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862719/IMG_0988_1_vk6n5n.jpg",
    className: "md:col-span-1 md:row-span-2", // Vertical First
    objectPosition: "object-top",
    alt: "Studio FIT India Event Moment 1",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862215/IMG_0970_amn5ts.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 2",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862213/IMG_0980_qxl07f.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 3",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0858_ouxqcq.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 4",
  },
  {
    id: 5,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0852_wrvb48.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 5",
  },
  {
    id: 6,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0845_vz62h8.jpg",
    className: "md:col-span-2 md:row-span-2", // Big Square
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 6",
  },
  {
    id: 7,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0849_vhvi9l.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 7",
  },
  {
    id: 8,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0847_nxhaym.jpg",
    className: "md:col-span-1 md:row-span-1",
    objectPosition: "object-center",
    alt: "Studio FIT India Event Moment 8",
  },
  {
    id: 9,
    image: "https://res.cloudinary.com/dvrwadsfh/image/upload/f_auto,q_auto/v1776862212/IMG_0677_zje8tr.jpg",
    className: "md:col-span-4 md:row-span-1", // Wide Footer
    objectPosition: "object-[center_18%]", // Fine-tuned to show faces
    alt: "Studio FIT India Event Moment 9",
  },
];

const EventGallery = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-gray-900 mb-6 uppercase italic">
            Studio FIT{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Moments
            </span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-light">
            Explore the energy and community of Studio FIT India. From live
            online sessions to our special workshops and events.
          </p>
        </div>

        {/* Bento Grid - Adjusted for 9 images */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {eventImages.map((event) => (
            <GalleryImage key={event.id} event={event} />
          ))}
        </div>

        {/* Trust Badge / Stats Footer */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              25,000+
            </span>
            <span className="text-xs md:text-sm text-gray-400 uppercase tracking-[0.2em] font-bold">
              Members Trained
            </span>
          </div>
          <div className="w-px h-16 bg-gray-100 hidden md:block"></div>
          <div className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              15+
            </span>
            <span className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-bold">
              Certified Coaches
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
