import { useState } from "react";
import { Mail, Phone, Send, MessageCircle, MapPin } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import FAQAccordion from "../components/FAQAccordion";
import SEO from "../components/SEO";

const Contact = () => {
  const seoProps = {
    title: "Contact Studio FIT India | Book a Trial at Just ₹1 on WhatsApp",
    description: "Contact Studio FIT India to book your trial at just ₹1. Reach us on WhatsApp at +91 93106 66287. Located at Galleria Mall, Greater Noida. Open 7 days a week.",
    keywords: [
      "studio fit india contact",
      "book a trial at just ₹1 Greater Noida",
      "contact Studio FIT India",
      "book a trial at just ₹1",
      "online gym trial at just ₹1",
      "fitness class inquiry India",
      "Studio FIT India WhatsApp",
      "online fitness classes in India",
      "Yoga classes online",
      "HIIT classes online",
      "Zumba classes online",
      "Pilates classes online",
      "Strength training classes online",
      "Weight loss programs online",
      "Personal training online",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          "name": "How do I book a trial at just ₹1 at Studio FIT India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can book a trial at just ₹1 by messaging us on WhatsApp at +91 93106 66287 or clicking the Book a Trial at Just ₹1 button on our website. We will confirm your slot within 1 hour.",
          },
        },
        {
          "@type": "Question",
          name: "What equipment do I need for online classes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most classes require only a yoga mat and comfortable clothing. Strength training classes may need light dumbbells, but we offer equipment-free alternatives for all exercises.",
          },
        },
        {
          "@type": "Question",
          name: "What are the class timings at Studio FIT India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer morning batches from 5:00 AM to 10:00 AM and evening batches from 4:00 PM to 9:00 PM. Weekend batches are also available on Saturday and Sunday. Timings vary by program. Contact us for the full schedule.",
          },
        },
        {
          "@type": "Question",
          name: "Can beginners join Studio FIT India classes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, absolutely. We have classes designed for all fitness levels from complete beginners to advanced athletes. Our coaches personalise guidance for each member during live sessions.",
          },
        },
        {
          "@type": "Question",
          name: "How much do memberships cost at Studio FIT India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Membership plans start from ₹999 per month. We offer monthly, quarterly and annual plans with discounts for longer commitments. Visit our pricing page for full details.",
          },
        },
      ],
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        content_name: "Contact Form Website",
        content_category: "Inquiry",
      });
    }

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
      });
    }

    try {
      // 1. CRM Integration wrapped in its own try-catch for maximum resilience
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
          },
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
              email: formData.email,
              classType: formData.program,
              notes: formData.message,
              source: "Website Form",
              status: "New",
            }),
          });
        }
      } catch (crmError) {
        console.error("Supabase CRM integration failed but proceeding with FormSubmit:", crmError);
      }

      // 2. FormSubmit Email Notification using user's requested collab email
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
          Message: formData.message || "No message",
          _subject: "New Website Lead: " + formData.name,
        }),
      });

      setIsSuccess(true);
      setFormData({ name: "", email: "", phone: "", program: "", message: "" });
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      label: "General Information",
      contact: "studiofitindiahelpdesk" + "@" + "gmail.com",
      icon: Mail,
      link: "mailto:" + "studiofitindiahelpdesk" + "@" + "gmail.com",
    },
    {
      label: "Sales & Classes",
      contact: "+91 93106 66287",
      icon: Phone,
      link: "tel:+919310666287",
    },
    {
      label: "Collaboration",
      contact: "collab" + "@" + "studiofitindia.com",
      icon: MessageCircle,
      link: "mailto:" + "collab" + "@" + "studiofitindia.com",
    },
    {
      label: "Visit Us",
      contact:
        "6th Floor, Office No. 61, Galleria Mall, I-Thum's, Greater Noida, UP 201310",
      icon: MapPin,
      link: "https://maps.google.com/?q=Galleria+Mall+I-Thum+Greater+Noida",
    },
  ];

  return (
    <div className="w-full">
      <SEO {...seoProps} />
      {/* Contact Form — centered, full section at top */}
      <section className="pt-16 pb-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-3 text-center">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8 text-center font-medium">
                We'd love to hear from you.
              </p>

              {isSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center max-w-md mx-auto shadow-sm">
                  <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-emerald-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-heading">
                    Thank You!
                  </h3>
                  <p className="text-gray-700 font-medium">
                    Your message has been received. We'll be in touch shortly.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-secondary hover:text-secondary/80 font-bold transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm text-center font-medium">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold uppercase tracking-wider">
                      Full Name <span className="text-secondary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm mb-2 font-semibold uppercase tracking-wider">
                        Phone Number <span className="text-secondary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-2 font-semibold uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold uppercase tracking-wider">
                      Which program are you interested in?
                    </label>
                    <select
                      name="program"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all appearance-none cursor-pointer"
                      value={formData.program}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select a program...
                      </option>
                      <option value="Yoga">Yoga</option>
                      <option value="HIIT">HIIT</option>
                      <option value="Zumba">Zumba</option>
                      <option value="Strength Training">
                        Strength Training
                      </option>
                      <option value="Pilates">Pilates</option>
                      <option value="Personal Training">
                        Personal Training
                      </option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm mb-2 font-semibold uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-gray-900 focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold py-4 px-10 rounded-full transition-all flex items-center justify-center w-full disabled:opacity-70 disabled:cursor-not-allowed shadow-sm active:scale-95"
                  >
                    <span className="mr-2">
                      {isSubmitting ? "Syncing..." : "Send Message"}
                    </span>
                    <Send size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards — moved below form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => (
              <a
                key={idx}
                href={card.link}
                className="bg-white p-8 rounded-2xl text-center border border-gray-200 hover:border-secondary/30 transition-all group block shadow-sm"
              >
                <div className="bg-secondary/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/10 transition-colors">
                  <card.icon
                    className="text-secondary"
                    size={32}
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 font-heading">{card.label}</h3>
                <p className="text-gray-600 text-sm break-all font-medium">
                  {card.contact}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section — full width below form */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FAQAccordion />
          <div className="mt-10 text-center bg-gray-50 p-8 rounded-2xl border border-gray-200 max-w-md mx-auto shadow-sm">
            <p className="text-gray-700 mb-4 font-bold uppercase tracking-wider text-xs">Still have questions?</p>
            <a
              href="https://api.whatsapp.com/send?phone=919310666287"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-secondary font-bold hover:underline transition-colors"
            >
              Chat with Us <MessageCircle size={18} className="ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
