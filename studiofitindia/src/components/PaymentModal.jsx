import { X, Check, ArrowRight } from "lucide-react";
import { useState } from "react";

const PaymentModal = ({ plan, onClose }) => {
  const [agreed, setAgreed] = useState(false);

  if (!plan) return null;

  const fallbackWhatsapp = `Hi! I'm interested in the ${plan.name} plan (₹${plan.price}). Can you help me enroll?`;
  const paymentUrl = plan.paymentLink || `https://wa.me/919310666287?text=${encodeURIComponent(plan.whatsappMessage || fallbackWhatsapp)}`;

  const handleProceed = () => {
    if (!agreed) return;

    // Track in Pixel
    if (typeof fbq === "function") {
      fbq("track", "InitiateCheckout", {
        content_name: plan.name,
        content_category: "Membership Plan",
        value: plan.price,
        currency: "INR",
      });
    }

    window.open(paymentUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up">
      {/* Backdrop close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div 
        className="relative bg-white border border-gray-100 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold font-heading text-gray-900">
            Enroll in {plan.name}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Plan Info Card */}
          <div className="bg-gray-50 p-5 rounded-2xl mb-6 border border-gray-200/50 flex justify-between items-center">
            <div>
              <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">{plan.duration} Membership</div>
              <h4 className="font-heading font-bold text-base text-gray-900">{plan.name}</h4>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-secondary font-heading">
                ₹{plan.price.toLocaleString()}
              </div>
              {plan.originalPrice && (
                <div className="text-[10px] text-gray-400 line-through font-semibold">
                  ₹{plan.originalPrice.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Included Features:</h4>
            <div className="space-y-2">
              {plan.features.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check size={14} className="text-secondary shrink-0" strokeWidth={3} />
                  <span className="text-xs font-semibold text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Agreement Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group py-3 border-t border-gray-100 mt-4 mb-6">
            <div className="relative flex-shrink-0 mt-0.5">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center peer-checked:border-secondary peer-checked:bg-secondary transition-all">
                <Check size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
            </div>
            <span className="text-xs text-gray-600 group-hover:text-gray-900 transition-colors leading-snug font-semibold">
              I agree to the <a href="/terms-and-condition" className="text-secondary hover:underline font-bold" target="_blank" onClick={(e) => e.stopPropagation()}>Terms & Conditions</a>, <a href="/privacy-policy" className="text-secondary hover:underline font-bold" target="_blank" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and <a href="/cancellation-and-refund" className="text-secondary hover:underline font-bold" target="_blank" onClick={(e) => e.stopPropagation()}>Refund Policy</a>.
            </span>
          </label>

          <button 
            onClick={handleProceed}
            disabled={!agreed}
            className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${agreed ? "bg-gray-900 text-white hover:bg-secondary active:scale-[0.98] shadow-lg shadow-gray-900/10" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            <span>Proceed to Payment</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

