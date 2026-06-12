import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useState } from "react";

const Modal = ({ isOpen, onClose, plan }) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen || !plan) return null;

  const handleEnroll = () => {
    if (!agreed) return;

    if (plan.paymentLink) {
      window.open(plan.paymentLink, "_blank");
    } else {
      // Direct to WhatsApp as fallback
      const message =
        plan.whatsappMessage ||
        `Hi, I'm interested in the ${plan.name} plan (₹${plan.price}). Please help me enroll.`;
      const url = `https://api.whatsapp.com/send?phone=919310666287&text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative bg-navy-mid border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white hover:rotate-90 transition-all"
          >
            <X size={24} />
          </button>

          <h3 className="text-2xl font-bold font-heading text-white mb-2">
            Confirm Enrollment
          </h3>
          <p className="text-gray-400 mb-6">
            You are selecting the{" "}
            <span className="text-primary font-bold">{plan.name}</span> plan.
          </p>

          <div className="bg-navy/50 p-4 rounded-lg mb-6 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Price</span>
              <span className="text-xl font-bold text-white">
                ₹{plan.price.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Duration</span>
              <span className="text-white">{plan.duration}</span>
            </div>
          </div>

          <div className="flex items-start mb-6">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-300">
                  I agree to the{" "}
                  <a
                    href="/terms-and-condition"
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and Policies.
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleEnroll}
            disabled={!agreed}
            className={`w-full py-3 rounded-full font-bold flex items-center justify-center transition-all ${agreed ? "bg-gradient-to-r from-primary to-secondary text-white hover:brightness-110 shadow-lg shadow-primary/30" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
          >
            <span className="mr-2">Proceed to Pay</span>
            <CheckCircle size={18} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
