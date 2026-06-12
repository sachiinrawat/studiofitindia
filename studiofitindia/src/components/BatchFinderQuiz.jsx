import { useState } from "react";
import { X, ArrowRight, CheckCircle, Smartphone, User, ChevronRight, Target, Clock, ShieldCheck } from "lucide-react";

// Google Sheets Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw89GrGS0f2eCuhPx6AJzteuTOvccQxYNIyZYx6Bp-YN-enFvMabkEe1vhdI9k7nupA/exec"; 

const BatchFinderQuiz = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: "",
    timing: "",
    diet: "Skipped",
    name: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const goals = [
    { value: "Weight Loss", label: "Weight Loss & Toning", desc: "Shed body fat and tone your muscles sustainably." },
    { value: "Yoga & Mindfulness", label: "Yoga & Mindfulness", desc: "Improve flexibility, posture, breathing, and mental calm." },
    { value: "Stamina & HIIT", label: "Stamina & Cardio (HIIT/Zumba)", desc: "High-energy classes to burn calories and boost endurance." },
    { value: "Strength Training", label: "Strength Training", desc: "Build lean muscle, increase bone density, and improve shape." },
  ];

  const timings = [
    { value: "5 AM to 8 AM", label: "Early Morning (5 AM to 8 AM)", desc: "Power up your morning early. Best for consistency." },
    { value: "9 AM to 11 AM", label: "Mid Morning (9 AM to 11 AM)", desc: "Convenient slots after household tasks or early work calls." },
    { value: "5 PM to 8 PM", label: "Late Evening (5 PM to 8 PM)", desc: "Unwind after work and shake off daily stress." },
  ];

  const handleSelectOption = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    setTimeout(() => {
      setStep((prev) => prev + 1);
    }, 300);
  };

  const handleTextChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    return cleanPhone.length >= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validatePhone(answers.phone)) {
      setErrorMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: answers.name,
      phone: answers.phone,
      goal: answers.goal,
      timing: answers.timing,
      diet: "Skipped",
      source: "Batch Finder Quiz",
    };

    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: "Batch Quiz",
        content_category: "Assessment",
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
      });
    }

    try {
      // 1. Submit to Google Sheets (Apps Script Web App URL)
      if (GOOGLE_SCRIPT_URL && !GOOGLE_SCRIPT_URL.includes("xxxx")) {
        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify(payload),
          });
        } catch (sheetError) {
          console.error("Google Sheets sync failed, proceeding to backup:", sheetError);
        }
      }

      // 2. FormSubmit AJAX fallback alert
      try {
        await fetch("https://formsubmit.co/ajax/collab@studiofitindia.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            Name: answers.name,
            Phone: answers.phone,
            Goal: answers.goal,
            Timing: answers.timing,
            Diet: "Skipped",
            Source: "Batch Finder Quiz Tool",
            _subject: `Clean Batch Lead: ${answers.name}`,
          }),
        });
      } catch (emailError) {
        console.error("FormSubmit alert failed:", emailError);
      }

      setIsSuccess(true);

      const prefilledMsg = `Hi! I just completed your personalized Fitness Assessment. 
My name is ${answers.name}.
My health goal is: ${answers.goal}
My preferred batch timing is: ${answers.timing}

Please send my batch slot invitation!`;

      const whatsappUrl = `https://wa.me/919310666287?text=${encodeURIComponent(prefilledMsg)}`;
      
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        onClose();
      }, 1500);

    } catch (err) {
      console.error("Lead submission error:", err);
      setErrorMessage("Unable to save. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-white border border-gray-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-lg z-10 p-6 md:p-8 animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors p-1 bg-gray-50 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="mb-6 mr-6">
            <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
              <span>Batch Finder</span>
              <span>Step {step} of 3</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-secondary h-full transition-all duration-300 rounded-full" 
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-xs text-center font-bold mb-4">
            {errorMessage}
          </div>
        )}

        {/* STEP 1: GOAL SELECTION */}
        {step === 1 && !isSuccess && (
          <div className="animate-fade-in-up">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2 leading-tight">
              What is your primary fitness goal?
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">
              Select one option to help us find the perfect class type for you.
            </p>
            <div className="space-y-3">
              {goals.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelectOption("goal", item.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.99] flex items-center justify-between group ${
                    answers.goal === item.value 
                      ? "border-secondary bg-secondary/5 text-gray-950 font-semibold" 
                      : "border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white text-gray-800"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-secondary transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium mt-1 pr-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: TIMING SELECTION */}
        {step === 2 && !isSuccess && (
          <div className="animate-fade-in-up">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2 leading-tight">
              What is your preferred batch timing?
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">
              Our live batches run across morning and evening schedules.
            </p>
            <div className="space-y-3">
              {timings.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSelectOption("timing", item.value)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.99] flex items-center justify-between group ${
                    answers.timing === item.value 
                      ? "border-secondary bg-secondary/5 text-gray-950 font-semibold" 
                      : "border-gray-200 hover:border-gray-300 bg-gray-50/50 hover:bg-white text-gray-800"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-secondary transition-colors">
                      {item.label}
                    </h4>
                    <p className="text-xs text-gray-400 font-medium mt-1 pr-6 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
            <button 
              onClick={handleBack}
              className="mt-6 text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-wider transition-colors"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* STEP 3: CONTACT & DETAILS SYNC */}
        {step === 3 && !isSuccess && (
          <div className="animate-fade-in-up">
            <h3 className="text-xl md:text-2xl font-bold font-heading text-gray-900 mb-2 leading-tight">
              Where should we send your batch slot invite?
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">
              We will send you your recommended slot and batch invite in 5 minutes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-secondary">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    name="name"
                    value={answers.name}
                    onChange={handleTextChange}
                    placeholder="Your Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-950 font-medium placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                  Phone Number <span className="text-secondary">*</span>
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-3.5 text-gray-400" size={16} />
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={answers.phone}
                    onChange={handleTextChange}
                    placeholder="10-digit mobile number"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-950 font-medium placeholder-gray-400 focus:border-secondary focus:ring-1 focus:ring-secondary focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs font-semibold text-gray-700 leading-normal space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block mb-0.5">Your Selected Details:</span>
                <div className="flex items-center justify-between gap-2 text-gray-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <Target size={14} className="text-secondary shrink-0" /> Goal:
                  </span>
                  <span className="text-gray-700 text-xs">{answers.goal}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-gray-800">
                  <span className="font-bold flex items-center gap-1.5">
                    <Clock size={14} className="text-secondary shrink-0" /> Timing:
                  </span>
                  <span className="text-gray-700 text-xs">{answers.timing}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-bold py-3.5 px-6 rounded-full transition-all flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed shadow hover:bg-secondary/95 active:scale-[0.98] uppercase tracking-wider text-xs mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Reserving Spot...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Get Batch invite on WhatsApp
                    <ArrowRight size={14} />
                  </span>
                )}
              </button>
            </form>

            <button 
              onClick={handleBack}
              disabled={isSubmitting}
              className="mt-6 text-xs text-gray-400 hover:text-gray-600 font-bold uppercase tracking-wider transition-colors block disabled:opacity-50"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* SUCCESS STATE */}
        {isSuccess && (
          <div className="flex flex-col items-center justify-center p-4 text-center animate-fade-in-up min-h-[300px]">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-emerald-600" size={36} />
            </div>
            <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 leading-tight">
              Assessment Saved!
            </h3>
            <p className="text-xs text-gray-600 font-medium max-w-xs mb-6 leading-relaxed">
              Your details are successfully logged inside the spreadsheet. We are redirecting you to WhatsApp to claim your batch slot invite.
            </p>
            <div className="w-6 h-6 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4" />
            <a 
              href={`https://wa.me/919310666287?text=${encodeURIComponent(`Hi! My name is ${answers.name}. I just completed your Fitness Quiz on your website. Please confirm my batch slots!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-secondary font-bold uppercase tracking-wider hover:underline flex items-center gap-1.5"
            >
              <ShieldCheck size={14} className="text-secondary" />
              Click here if WhatsApp doesn't open automatically
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchFinderQuiz;
