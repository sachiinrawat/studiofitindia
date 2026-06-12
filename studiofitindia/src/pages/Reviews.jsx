import { useState, useRef } from "react";
import SectionHeader from "../components/SectionHeader";
import ReviewCarousel from "../components/ReviewCarousel";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "../components/SEO";

// In WordPress, public assets are served from the theme directory, not the root domain.
// functions.php exposes the theme directory URL via window.siteSettings.
const getThemeUrl = (path) => {
  const themeUrl = window.siteSettings?.themeUrl || "";
  return `${themeUrl}${path}`;
};

const transformationImages = [
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
];

const testimonialVideos = [
  { id: "0A6a6jhrEhc", title: "Customer Testimonial 1" },
  { id: "C3NKF21_H6E", title: "Customer Testimonial 2" },
  { id: "dSpMxmzhkew", title: "Customer Testimonial 3" },
];

// Video Row — all 3 videos visible in one line, swipeable on mobile
const VideoCarousel = () => {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = testimonialVideos.length;

  const scrollTo = (index) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.querySelector("div").offsetWidth + 16; // card + gap
    el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const cardWidth = el.querySelector("div")?.offsetWidth + 16 || 1;
    setActive(Math.round(el.scrollLeft / cardWidth));
  };

  // Mouse drag support
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    scrollRef.current.scrollLeft =
      dragStartScroll.current - (e.pageX - dragStartX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <div className="w-full">
      {/* Track — 3 videos in a row on desktop, swipeable on mobile */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-1"
        style={{ cursor: "grab" }}
      >
        {testimonialVideos.map((video) => (
          <div
            key={video.id}
            className="flex-shrink-0 w-[85vw] md:w-0 md:flex-1 snap-start rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-black aspect-video"
          >
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Mobile-only dots + nav buttons */}
      <div className="flex md:hidden items-center justify-center gap-6 mt-5">
        <button
          onClick={() => scrollTo(Math.max(active - 1, 0))}
          disabled={active === 0}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-secondary hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-30"
          aria-label="Previous video"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {testimonialVideos.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-secondary w-6" : "bg-gray-300 w-2.5"
              }`}
              aria-label={`Video ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => scrollTo(Math.min(active + 1, total - 1))}
          disabled={active === total - 1}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-secondary hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-30"
          aria-label="Next video"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const localVideos = [
  "story-ReviewsVerified.mp4",
  "story-ReviewsVerified-1.mp4",
  "story-ReviewsVerified-2.mp4",
  "story-ReviewsVerified-3.mp4",
  "story-ReviewsVerified-4.mp4",
  "story-ReviewsVerified-5.mp4",
  "story-TransformationVerified.mp4",
  "story-TransformationVerified-1.mp4",
  "story-TransformationVerified-2.mp4",
  "story-TransformationVerified-3.mp4",
  "story-TransformationVerified-4.mp4",
];

const LocalVideoRow = () => {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const rafId = useRef(null);

  const SCROLL_AMOUNT = 220;

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });

  const onMouseDown = (e) => {
    isDragging.current = true;
    dragStartX.current = e.pageX;
    dragStartScroll.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    // Prevent text selection during drag
    e.preventDefault();
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    // Cancel any pending RAF
    if (rafId.current) cancelAnimationFrame(rafId.current);
    // Schedule update on next animation frame for smooth 60fps movement
    rafId.current = requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft =
          dragStartScroll.current - (e.pageX - dragStartX.current);
      }
    });
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <div className="mt-14">
      <h3 className="text-xl font-bold font-heading text-gray-900 mb-6 text-center">
        More Stories From Our Members
      </h3>

      {/* Scrollable video track */}
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        style={{
          cursor: "grab",
          WebkitOverflowScrolling: "touch", // native momentum on iOS
          willChange: "scroll-position", // GPU hint
        }}
      >
        {localVideos.map((file) => (
          <div
            key={file}
            className="flex-shrink-0 w-44 md:w-52 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-black"
            style={{ aspectRatio: "9/16" }}
          >
            <video
              src={getThemeUrl(`/assets/reviews/${file}`)}
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        ))}
      </div>

      {/* Nav buttons below */}
      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={scrollLeft}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-secondary hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className="p-3 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-secondary hover:text-white transition-all shadow-sm active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Reviews = () => {
  const seoProps = {
    title: "Member Reviews & Results | Studio FIT India — Real Transformations",
    description: "Read hundreds of real reviews from Studio FIT India members. See weight loss results, fitness transformations and success stories from our online yoga, HIIT and Zumba classes.",
    keywords: [
      "studio fit india reviews",
      "online fitness class reviews India",
      "Studio FIT India reviews",
      "online fitness class reviews India",
      "fitness transformation India",
      "online gym results India",
      "Studio FIT India testimonials",
      "online yoga class results",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "FitnessCenter",
      name: "Studio FIT India",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "284",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          author: { "@type": "Person", name: "Priya Sharma" },
          reviewBody:
            "Best online fitness studio in India. The Zumba classes are so fun and the coaches are excellent.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          author: { "@type": "Person", name: "Amit Verma" },
          reviewBody:
            "Lost 8kg in 3 months through their HIIT program. Highly recommend Studio FIT India.",
        },
      ],
    }
  };
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div className="w-full">
      <SEO {...seoProps} />
      {/* Hero */}

      {/* Transformation Gallery */}
      <section className="py-20 bg-navy-mid">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Transformation Gallery"
            subheading="Real results from real members. Witness the dedication and progress of our champions."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {transformationImages.map((src, index) => (
              <div
                key={index}
                onClick={() => setLightboxImg(src)}
                className="relative overflow-hidden cursor-pointer group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/5]"
              >
                <img
                  src={src}
                  alt={`Transformation ${index + 1}`}
                  className="w-full h-full object-contain transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-xl">
                  <ZoomIn
                    size={36}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
          >
            <X size={28} />
          </button>
          <img
            src={lightboxImg}
            alt="Transformation"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] shadow-2xl object-contain transition-transform duration-300"
          />
        </div>
      )}

      {/* WhatsApp Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="What Members Are Saying"
            subheading="Real reviews shared by our members on WhatsApp."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {[
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777464218/WhatsApp_Image_2026-04-29_at_5.15.46_PM_1_uakzat.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777464217/WhatsApp_Image_2026-04-29_at_5.15.45_PM_vgwb3b.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777464217/WhatsApp_Image_2026-04-29_at_5.15.45_PM_1_skbx0d.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777464217/WhatsApp_Image_2026-04-29_at_5.15.46_PM_jpxywy.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777464217/WhatsApp_Image_2026-04-29_at_5.15.45_PM_2_gnpzzt.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1778484586/WhatsApp_Image_2026-05-09_at_7.24.07_PM_da61yd.jpg",
              "https://res.cloudinary.com/dvrwadsfh/image/upload/v1778484563/WhatsApp_Image_2026-05-09_at_7.30.30_PM_hssp1i.jpg",
            ].map((src, i) => (
              <div
                key={i}
                onClick={() => setLightboxImg(src)}
                className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={src}
                  alt={`WhatsApp Review ${i + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heard By Customers — YouTube Video Testimonials */}
      <section className="py-24 bg-navy">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Heard By Customers"
            subheading="Don't take our word for it — hear directly from our members about their fitness journey."
          />
          <div>
            <VideoCarousel />
          </div>

          {/* Local Story Videos Sub-section */}
          <LocalVideoRow />
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-24 bg-navy-mid">
        <div className="container mx-auto px-4">
          <SectionHeader heading="Meet Our Happy Customers" />

          <div>
            <ReviewCarousel />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
