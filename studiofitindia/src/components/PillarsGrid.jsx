import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const PillarsGrid = ({ pillars }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
      {/* Row 1: Big card left (spans 7) + tall card right (spans 5) */}
      {pillars.slice(0, 2).map((p, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className={`relative overflow-hidden rounded-2xl group cursor-default ${
            i === 0 ? 'md:col-span-7 h-[340px] md:h-[420px]' : 'md:col-span-5 h-[340px] md:h-[420px]'
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${p.img})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          {/* Pink accent line */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-[#D3365F] transition-all duration-500" />
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            <h3 className="text-2xl md:text-3xl font-extrabold font-heading text-white mb-2">{p.title}</h3>
            <p className="text-white/65 text-sm md:text-base leading-relaxed">{p.desc}</p>
          </div>
        </motion.div>
      ))}

      {/* Row 2: Three equal cards */}
      {pillars.slice(2, 5).map((p, i) => (
        <motion.div
          key={i + 2}
          custom={i + 2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden rounded-2xl group cursor-default md:col-span-4 h-[280px] md:h-[320px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${p.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-[#D3365F] transition-all duration-500" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl md:text-2xl font-extrabold font-heading text-white mb-1">{p.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{p.desc}</p>
          </div>
        </motion.div>
      ))}

      {/* Row 3: Last card — full width banner */}
      {pillars[5] && (
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative overflow-hidden rounded-2xl group cursor-default md:col-span-12 h-[260px] md:h-[300px]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-[center_30%] scale-100 group-hover:scale-105 transition-transform duration-700"
            style={{ backgroundImage: `url(${pillars[5].img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/10" />
          <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-[#D3365F] transition-all duration-500" />
          <div className="absolute inset-0 flex items-center px-10">
            <div className="max-w-xl">
              <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-white mb-3">{pillars[5].title}</h3>
              <p className="text-white/65 text-base md:text-lg leading-relaxed">{pillars[5].desc}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PillarsGrid;
