import { useState } from "react";
import { Send, CheckCircle, Smartphone, User, Mail, Sparkles, ShieldCheck } from "lucide-react";

const LeadForm = ({ source = "Hero Form", programDefault = "", onSuccessRedirect = true, buttonText = "Secure My Trial Slot" }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    program: programDefault,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const programsList = [
    { value: "Yoga", label: "Yoga & Mindfulness" },
    { value: "HIIT", label: "HIIT & Functional Training" },
    { value: "Zumba", label: "Zumba & Dance Fitness" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Weight Loss", label: "Weight Loss Program" },
    { value: "Personal Training", label: "1-on-1 Personal Training" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => {
    // Basic validation for 10-digit Indian phone numbers
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    return cleanPhone.length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    if (!validatePhone(formData.phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    // 1. Facebook Pixel tracking
    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: `Lead Capture - ${source}`,
        content_category: "Trial Booking",
      });
    }

    // 2. Google Ads tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
      });
    }

    try {
      // 3. Supabase CRM Sync
      try {
        const SUPABASE_URL = "https://sjtuoauidegknzbimysz.supabase.co";
        const SUPABASE_KEY = "sb_publishable_TzY2A9R-B7eVLmBlwNI_ew_VomkxsxI";

        const wsRes = await fetch(
          `${SUPABASE_URL}/rest/v1/workspaces?select=id&limit=1`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        const wsData = await wsRes.json();
        if (wsData && wsData.length > 0) {
          await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
            method: "POST",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              "Content-Type": "application/json",
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              workspace_id: wsData[0].id,
              name: formData.name,
              phone: formData.phone,
              email: formData.email || null,
              classType: formData.program || "Not selected",
              notes: `Lead captured via ${source}. User requested a ₹1 live fitness trial.`,
              source: source,
              status: "New",
            }),
          });
        }
      } catch (crmError) {
        console.error("CRM Sync failed, fallback to FormSubmit only:", crmError);
      }

      // 4. FormSubmit Email Notification (Resilient fallback)
      await fetch("https://formsubmit.co/ajax/collab@studiofitindia.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Phone: formData.phone,
          Email: formData.email || "Not provided",
          Program: formData.program || "Not selected",
          Source: source,
          _subject: `New Lead [${source}]: ${formData.name}`,
        }),
      });

      setIsSuccess(true);

      // 5. Automatic WhatsApp Redirect on Success
      if (onSuccessRedirect) {
        const prefilledMsg = `Hi! My name is ${formData.name}. I just registered for a ₹1 Live Trial of the ${formData.program || "fitness"} program on your website. My phone number is ${formData.phone}. Please confirm my slot!`;
        const whatsappUrl = `https://wa.me/919310666287?text=${encodeURIComponent(prefilledMsg)}`;
        
        setTimeout(() => {
          window.open(whatsappUrl, "_blank");
        }, 1500);
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setErrorMessage("Something went wrong. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-gray-200 min-h-[350px] animate-fade-in-up">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-emerald-600" size={36} />
        </div>
        <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">
          Registration Complete!
        </h3>
        <p className="text-gray-600 text-sm max-w-sm mb-6 font-medium">
          Your trial request has been securely saved. 
        </p>
        <div className="bg-secondary/5 border border-secondary/10 rounded-xl p-4 max-w-xs flex items-center gap-3">
          <p className="text-xs text-gray-600 text-left leading-normal font-semibold">
            Connecting you directly to our WhatsApp support team to secure your preferred batch timing!
          </p>
        </div>
        <a 
          href={`https://wa.me/919310666287?text=${encodeURIComponent(`Hi! I just registered for a ₹1 Live Trial of the ${formData.program || "fitness"} program on your website. My name is ${formData.name}. Please confirm my slot!`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 text-xs text-secondary font-bold uppercase tracking-wider hover:underline"
        >
          Click here if not redirected automatically
        </a>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-heading text-gray-900 mb-1 text-center">
          Book Your Live Trial
        </h3>
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-6 text-center">
          Only <span className="text-secondary font-bold">₹1 Today</span> — Save Your Spot
        </p>

        {errorMessage && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-xl text-xs text-center font-bold mb-5">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
              Full Name <span className="text-secondary">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-950 font-medium placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
              Phone Number <span className="text-secondary">*</span>
            </label>
            <div className="relative">
              <Smartphone className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-950 font-medium placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
              Email Address <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="yourname@email.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-950 font-medium placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1">
              Choose Program <span className="text-secondary">*</span>
            </label>
            <select
              name="program"
              value={formData.program}
              onChange={handleChange}
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-950 font-medium focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled>
                Select a program...
              </option>
              {programsList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary hover:bg-secondary/95 text-white font-bold py-3.5 px-6 rounded-full transition-all flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed shadow hover:shadow-md active:scale-[0.98] uppercase tracking-wider text-xs mt-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Syncing Lead...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                {buttonText}
                <Send size={14} />
              </span>
            )}
          </button>
        </form>

        <p className="text-[10px] text-gray-400 text-center mt-4 leading-normal font-semibold flex items-center justify-center gap-1">
          <ShieldCheck size={12} className="text-gray-400 shrink-0" />
          <span>Safe and Secure. Your info will only be used to schedule your trial session.</span>
        </p>
      </div>
    </div>
  );
};

export default LeadForm;

