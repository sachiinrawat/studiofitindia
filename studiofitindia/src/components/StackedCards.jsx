import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const StackedCards = ({ pillars }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cardsWrappers = gsap.utils.toArray(".card-wrapper");
    const cards = gsap.utils.toArray(".card");

    cardsWrappers.forEach((wrapper, i) => {
      const card = cards[i];
      let scale = 1, rotation = 0;
      if (i !== cards.length - 1) {
        scale = 0.9 + 0.025 * i;
        rotation = -10;
      }
      gsap.to(card, {
        scale: scale,
        rotationX: rotation,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top " + (120 + 20 * i),
          endTrigger: ".stacked-wrapper",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          pinSpacing: false,
          id: String(i + 1)
        }
      });
    });

    return () => {
        ScrollTrigger.getAll().forEach(t => {
            if (t.vars.id >= "1" && t.vars.id <= String(cardsWrappers.length)) {
                t.kill();
            }
        });
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full bg-[#080808]">
      <div className="stacked-wrapper w-full pt-10 pb-10">
        <div className="cards w-full max-w-[1200px] mx-auto px-5">
          {pillars.map((p, i) => (
            <div key={i} className="card-wrapper w-full" style={{ perspective: "1000px", marginBottom: i === pillars.length - 1 ? 0 : "40px" }}>
              <div 
                className="card w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl shadow-black/80 flex flex-col justify-end p-10 lg:p-14 border border-white/5"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                
                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-black/20" />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-3xl lg:text-4xl font-bold font-heading text-white mb-4">{p.title}</h3>
                  <p className="text-white/70 leading-relaxed text-lg lg:text-xl max-w-2xl">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackedCards;
