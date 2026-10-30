import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FESTIVE_OFFER_EXPIRY } from "../../data/pricing";

const FestivePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Show popup on visit after short delay if offer not expired
  useEffect(() => {
    const isExpired = Date.now() >= FESTIVE_OFFER_EXPIRY.getTime();
    if (isExpired) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleImageClick = () => {
    setIsOpen(false);
    navigate("/pricing");
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="festive-popup-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm cursor-pointer select-none"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Festive Offer"
        >
          {/* Card container with smooth scale/fade in & out */}
          <motion.div
            key="festive-popup-card"
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleImageClick}
            className="relative w-full max-w-lg rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-white/15 cursor-pointer group my-auto transition-transform active:scale-[0.99]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close offer popup"
              className="absolute top-3 right-3 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/60 hover:bg-black/90 text-white/90 hover:text-white flex items-center justify-center border border-white/25 transition-all hover:scale-110 active:scale-90 shadow-xl backdrop-blur-md cursor-pointer"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Festive Offer Image */}
            <img
              src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1791974392/1e84337d-2fb4-4b4b-9f8d-f2e41666dbb6.png"
              alt="Studio FIT India Festive Offer - Click to View Plans"
              className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-300"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FestivePopup;
