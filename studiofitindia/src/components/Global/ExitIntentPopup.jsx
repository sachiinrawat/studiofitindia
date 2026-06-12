import { useState, useEffect } from "react";
import { X, Zap } from "lucide-react";

const WA_NUMBER = "919310666287";
const WA_MESSAGE = encodeURIComponent(
  "Hi! I saw your ₹1 trial offer and I want to book my first live fitness class."
);
const WA_LINK = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${WA_MESSAGE}`;

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const STORAGE_KEY = "sfi_exit_popup_seen";

const ExitIntentPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show if already seen this session
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;

    const handleMouseLeave = (e) => {
      // Trigger when cursor moves toward the top of the viewport (toward browser bar)
      if (e.clientY <= 10 && !triggered) {
        triggered = true;
        setVisible(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    };

    // Small delay so it doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => setVisible(false);

  const handleWhatsApp = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exit_popup_click", {
        event_category: "conversion",
        event_label: "exit_intent_whatsapp",
      });
    }
    handleClose();
  };

  if (!visible) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ backdropFilter: "blur(4px)", backgroundColor: "rgba(0,0,0,0.55)" }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Special offer popup"
    >
      {/* Card — stop click propagation so clicking inside doesn't close */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ animation: "sfi-popup-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-2 bg-[#25D366]" />

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
        >
          <X size={16} />
        </button>

        {/* Content */}
        <div className="px-8 pt-6 pb-8 text-center">
          {/* Urgency badge */}
          <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-5">
            <Zap size={12} className="fill-red-500 text-red-500" />
            Only 12 Trial Spots Left This Week
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-extrabold font-heading text-gray-900 mb-2 leading-tight">
            Wait! Don't leave yet.
          </h2>
          <p className="text-gray-500 text-sm mb-2">
            Try your first live fitness class
          </p>
          <p className="text-4xl font-extrabold text-[#25D366] mb-5">
            for just ₹1
          </p>

          {/* Social proof */}
          <p className="text-xs text-gray-400 mb-6">
            Join <strong className="text-gray-700">25,000+ women</strong> already training from home
          </p>

          {/* Primary CTA */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition-all text-sm shadow-md shadow-[#25D366]/30 mb-3"
          >
            <WhatsAppIcon />
            Start on WhatsApp →
          </a>

          {/* Dismiss link */}
          <button
            onClick={handleClose}
            className="text-gray-400 text-xs hover:text-gray-600 underline-offset-2 hover:underline transition-colors"
          >
            No thanks, I'll pass on this offer
          </button>
        </div>
      </div>

      {/* Popup animation keyframes injected inline */}
      <style>{`
        @keyframes sfi-popup-in {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ExitIntentPopup;
