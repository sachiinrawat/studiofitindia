

const Marquee = ({ text, direction = "left" }) => {
  return (
    <div className="relative flex overflow-hidden bg-primary/10 py-4 border-y border-primary/20 backdrop-blur-sm -skew-y-2 transform my-12">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee-left 20s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-right 20s linear infinite;
        }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy z-10 pointer-events-none"></div>

      <div
        className={`flex whitespace-nowrap ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-6xl md:text-8xl font-bold font-display uppercase italic text-transparent stroke-text-sm mx-8 opacity-30"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
