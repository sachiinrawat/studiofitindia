import { useState } from "react";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import SectionHeader from "../components/SectionHeader";

const BRAND = "#D3365F";

const transformationImages = [
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1784811005/5be07b3c-1dd5-4b6e-bab3-40e10647a65b.png",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg",
  "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777449106/new_aezcxf.jpg",
];

const STATS = [
  { value: "25,000+", label: "Members Trained" },
  { value: "12–20 kg", label: "Average Fat Lost" },
  { value: "90 Days", label: "Typical Transformation" },
  { value: "4.9 ★", label: "Google Rating" },
];

const Results = () => {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (src, index) => {
    setLightboxImg(src);
    setLightboxIndex(index);
  };

  const prevImg = () => {
    const newIndex = (lightboxIndex - 1 + transformationImages.length) % transformationImages.length;
    setLightboxImg(transformationImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  const nextImg = () => {
    const newIndex = (lightboxIndex + 1) % transformationImages.length;
    setLightboxImg(transformationImages[newIndex]);
    setLightboxIndex(newIndex);
  };

  return (
    <div className="w-full bg-white">
      <SEO
        title="Real Transformation Results | Before & After | Studio FIT India"
        description="See real before & after transformation photos from Studio FIT India members. Real people, real results — losing 12–20 kg in 90 days with live online fitness coaching."
        keywords={[
          "fitness transformation results India",
          "before after weight loss India",
          "studio fit india results",
          "online weight loss results",
          "real transformation photos India",
        ]}
        canonical="https://www.studiofitindia.com/results"
      />


      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader
            heading="Transformation Gallery"
            subheading="Real results from real members. Witness the dedication and progress of our champions."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {transformationImages.map((src, index) => (
              <div
                key={index}
                onClick={() => openLightbox(src, index)}
                className="relative overflow-hidden cursor-pointer group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/5]"
              >
                <img
                  src={src}
                  alt={`Transformation result ${index + 1}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 text-center"
        style={{ background: "#fafafa", borderTop: "1px solid #f0f0f0" }}
      >
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-4">
            Ready to write your own success story?
          </h2>
          <p className="text-gray-500 text-base mb-8 leading-relaxed">
            Join 25,000+ members who have transformed their bodies from home with Studio FIT India's live coaching.
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[12px] font-black tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: BRAND }}
          >
            Start My Transformation <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* ── LIGHTBOX ────────────────────────────────────────────────── */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          {/* Close */}
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-5 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition z-10"
            aria-label="Close"
          >
            <X size={26} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImg(); }}
            className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition z-10"
            aria-label="Previous"
          >
            ‹
          </button>

          <img
            src={lightboxImg}
            alt="Transformation"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[88vw] shadow-2xl object-contain rounded-lg"
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextImg(); }}
            className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition z-10"
            aria-label="Next"
          >
            ›
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 text-white/60 text-sm font-medium">
            {lightboxIndex + 1} / {transformationImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
