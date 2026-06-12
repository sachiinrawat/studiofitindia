// Google G Logo SVG
const GoogleG = () => (
  <svg viewBox="0 0 48 48" className="w-5 h-5">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
  </svg>
);

// Blue Verified Check SVG
const VerifiedCheck = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 ml-1">
    <path fill="#1a73e8" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
    <path fill="#fff" d="M10 17.4l-4.7-4.7 1.4-1.4 3.3 3.3 l7.3-7.3 1.4 1.4L10 17.4z" />
  </svg>
);

// Full Yellow Star SVG
const Star = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#fbbc04] fill-current">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex flex-col relative h-[250px] w-full">
      {/* Card Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex justify-center items-center text-white font-bold text-lg leading-none ${review.color || 'bg-slate-700'}`}>
            {review.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-black text-[15px] leading-tight">{review.name}</span>
            <span className="text-gray-500 text-xs">
              {review.city ? `${review.city} · ` : ""}{review.time || "1 month ago"}
            </span>
          </div>
        </div>
        {/* Tiny G icon */}
        <div className="mt-1">
          <GoogleG />
        </div>
      </div>

      {/* Stars & Verify badge */}
      <div className="flex items-center mb-4 gap-[2px]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} />
        ))}
        <VerifiedCheck />
      </div>

      {/* Review text */}
      <p className="text-[#202124] text-[15px] leading-snug line-clamp-3 mb-2 flex-grow">
        "{review.content}"
      </p>
      
      {/* Read More link */}
      <div className="mt-auto pt-2">
        <button className="text-gray-500 text-sm hover:underline hover:text-gray-700 bg-transparent border-0 p-0 text-left cursor-pointer">
          Read more
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
