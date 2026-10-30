import { useState } from "react";
import SEO from "../components/SEO";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// Google Apps Script Web App URL
const GSHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbzWpvkXvPB2eFzYiFyYZCTeL8gp5xhoq-yO7uq6tSaEHujrT-Bbw2BXy9vN8sDIic16KA/exec";
// ─────────────────────────────────────────────────────────────────────────────

const getUtmParams = () => {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || "",
    utm_medium: p.get("utm_medium") || "",
    utm_campaign: p.get("utm_campaign") || "",
    utm_content: p.get("utm_content") || "",
    utm_term: p.get("utm_term") || "",
  };
};

const firePixelLead = () => {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "Lead", {
        content_name: "Fitness Program Enquiry",
        status: "submitted",
      });
    } catch (e) {
      console.warn("Meta Pixel track error:", e);
    }
  }
};

const fireGtagConversion = () => {
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", "conversion", {
        send_to: "AW-17925563887/NUd8CJnlipEcEO_LyeNC",
      });
    } catch (e) {
      console.warn("Gtag conversion error:", e);
    }
  }
};

const Sfi = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    fitnessGoal: "",
    timing: "",
    startTimeline: "",
    contactMethod: "",
    consent: false,
  });

  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoalSelect = (goal) => {
    if (goal) {
      setFormData((prev) => ({ ...prev, fitnessGoal: goal }));
    }
    const formElement = document.getElementById("enquiry");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const phone = formData.phone.trim();
    const whatsapp = formData.whatsapp.trim();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setStatus({
        type: "err",
        message: "Please enter a valid 10-digit Indian mobile number.",
      });
      return;
    }

    if (whatsapp && !/^[6-9]\d{9}$/.test(whatsapp)) {
      setStatus({
        type: "err",
        message: "Please enter a valid WhatsApp number or leave it blank.",
      });
      return;
    }

    if (!formData.fitnessGoal) {
      setStatus({
        type: "err",
        message: "Please select which program you are interested in.",
      });
      return;
    }

    if (!formData.consent) {
      setStatus({
        type: "err",
        message: "Please agree to the contact consent to proceed.",
      });
      return;
    }

    setSubmitting(true);
    const utms = getUtmParams();
    const leadId = "SFI-" + Date.now().toString(36).toUpperCase();

    const payload = {
      leadId,
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      fullName: formData.fullName.trim(),
      phone: phone,
      mobile: phone,
      whatsapp: whatsapp || phone,
      fitnessGoal: formData.fitnessGoal,
      program: formData.fitnessGoal,
      timing: formData.timing,
      preferredTiming: formData.timing,
      startTimeline: formData.startTimeline,
      contactMethod: formData.contactMethod,
      consent: formData.consent ? "Yes" : "No",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      leadSource: "Website / SFI Landing Page",
      ...utms,
    };

    // Backup to localStorage so no lead is ever lost
    try {
      const stored = JSON.parse(localStorage.getItem("sfi_meta_leads") || "[]");
      stored.unshift(payload);
      localStorage.setItem("sfi_meta_leads", JSON.stringify(stored.slice(0, 100)));
    } catch (err) {
      // ignore
    }

    try {
      if (GSHEET_ENDPOINT && !GSHEET_ENDPOINT.includes("YOUR_SCRIPT_ID_HERE")) {
        await fetch(GSHEET_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: new URLSearchParams(payload).toString(),
        });
      } else {
        console.info("Lead captured locally (GSheet endpoint pending):", payload);
      }

      firePixelLead();
      fireGtagConversion();

      setStatus({
        type: "ok",
        message: "Thank you! Your enquiry has been sent. Our team will contact you soon.",
      });

      setFormData({
        fullName: "",
        phone: "",
        whatsapp: "",
        fitnessGoal: "",
        timing: "",
        startTimeline: "",
        contactMethod: "",
        consent: false,
      });
    } catch (error) {
      firePixelLead();
      fireGtagConversion();
      setStatus({
        type: "ok",
        message: "Thank you! Your enquiry has been sent. Our team will contact you soon.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sfi-landing-wrapper">
      <SEO
        title="Online Fitness Classes & Membership Offers | Studio FIT India"
        description="Explore Studio FIT India online fitness classes with flexible timings, live interactive sessions, certified trainers, customised workout and diet plan options, and programs for weight gain, weight loss and strength training. Enquire today."
        keywords={["online fitness classes India", "weight loss online", "strength training India", "Studio FIT India", "fitness membership offers"]}
        canonicalUrl="https://studiofitindia.com/sfi"
      />

      <style>{`
        .sfi-landing-wrapper {
          --ink: #151515;
          --muted: #656565;
          --paper: #fff;
          --soft: #f6f6f3;
          --yellow: #FFAF00;
          --pink: #f0a2c3;
          --line: #e8e8e3;
          --green: #1c6a45;
          box-sizing: border-box;
          font-family: Inter, Arial, Helvetica, sans-serif;
          color: var(--ink);
          background: var(--paper);
          line-height: 1.55;
          width: 100%;
        }

        .sfi-landing-wrapper * {
          box-sizing: border-box;
        }

        .sfi-landing-wrapper a {
          color: inherit;
        }

        .sfi-landing-wrapper .wrap {
          width: min(1120px, 92%);
          margin: auto;
        }

        .sfi-landing-wrapper .topbar {
          background: var(--ink);
          color: #fff;
          font-size: .84rem;
          text-align: center;
          padding: 9px 12px;
        }

        .sfi-landing-wrapper header {
          padding: 16px 0;
          border-bottom: 1px solid var(--line);
          background: #fff;
        }

        .sfi-landing-wrapper .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .sfi-landing-wrapper .brand-logo {
          height: 42px;
          width: auto;
          display: block;
        }

        .sfi-landing-wrapper .hero {
          background: var(--ink);
          color: #fff;
          padding: 64px 0 58px;
          overflow: hidden;
        }

        .sfi-landing-wrapper .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 42px;
          align-items: center;
        }

        .sfi-landing-wrapper .eyebrow {
          display: inline-block;
          background: rgba(255, 175, 0, .14);
          color: var(--yellow);
          border: 1px solid rgba(255, 175, 0, .4);
          padding: 7px 11px;
          border-radius: 999px;
          font-size: .78rem;
          font-weight: 800;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .sfi-landing-wrapper h1 {
          font-size: clamp(2.3rem, 5.2vw, 4.4rem);
          line-height: 1.04;
          letter-spacing: -.045em;
          margin: 18px 0;
          font-weight: 900;
        }

        .sfi-landing-wrapper h1 em {
          font-style: normal;
          color: var(--yellow);
        }

        .sfi-landing-wrapper .hero p {
          font-size: 1.08rem;
          color: #e3e3e3;
          max-width: 610px;
          line-height: 1.6;
        }

        .sfi-landing-wrapper .ticks {
          list-style: none;
          padding: 0;
          margin: 24px 0;
          display: grid;
          gap: 9px;
        }

        .sfi-landing-wrapper .ticks li {
          display: flex;
          align-items: center;
        }

        .sfi-landing-wrapper .ticks li:before {
          content: "✓";
          display: inline-grid;
          place-items: center;
          width: 22px;
          height: 22px;
          background: var(--yellow);
          color: var(--ink);
          border-radius: 50%;
          font-weight: 900;
          margin-right: 10px;
          font-size: .8rem;
          flex-shrink: 0;
        }

        .sfi-landing-wrapper .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          background: var(--yellow);
          color: #111;
          text-decoration: none;
          border: 0;
          border-radius: 10px;
          padding: 15px 20px;
          font-size: 1rem;
          font-weight: 900;
          cursor: pointer;
          transition: transform .15s, filter .15s;
        }

        .sfi-landing-wrapper .btn:hover {
          transform: translateY(-1px);
          filter: brightness(.97);
        }

        .sfi-landing-wrapper .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .sfi-landing-wrapper .subnote {
          font-size: .83rem !important;
          color: #c8c8c8 !important;
          margin-top: 12px;
        }

        .sfi-landing-wrapper .hero-card {
          background: #202020;
          border: 1px solid #383838;
          border-radius: 22px;
          padding: 25px;
          box-shadow: 0 18px 60px #0003;
        }

        .sfi-landing-wrapper .hero-card .mini-label {
          font-size: .75rem;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: var(--yellow);
          font-weight: 800;
        }

        .sfi-landing-wrapper .hero-card h2 {
          font-size: 1.7rem;
          line-height: 1.15;
          margin: 9px 0 8px;
          font-weight: 800;
        }

        .sfi-landing-wrapper .goal-pills {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        .sfi-landing-wrapper .goal-pill {
          border: 1px solid #494949;
          border-radius: 12px;
          padding: 14px 12px;
          background: #292929;
          font-weight: 750;
          cursor: pointer;
          transition: all .2s;
          text-align: left;
        }

        .sfi-landing-wrapper .goal-pill:hover,
        .sfi-landing-wrapper .goal-pill.selected {
          border-color: var(--yellow);
          background: #333333;
        }

        .sfi-landing-wrapper .goal-pill span {
          display: block;
          font-size: .78rem;
          color: #c6c6c6;
          font-weight: 400;
          margin-top: 3px;
        }

        .sfi-landing-wrapper section {
          padding: 64px 0;
        }

        .sfi-landing-wrapper .section-head {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 32px;
        }

        .sfi-landing-wrapper .section-head h2 {
          font-size: clamp(1.8rem, 3.6vw, 2.7rem);
          line-height: 1.12;
          letter-spacing: -.03em;
          margin: 0 0 12px;
          font-weight: 900;
        }

        .sfi-landing-wrapper .section-head p {
          color: var(--muted);
          margin: 0;
        }

        .sfi-landing-wrapper .content-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .sfi-landing-wrapper .content-card {
          border: 1px solid var(--line);
          border-radius: 17px;
          padding: 24px;
          background: #fff;
          display: flex;
          flex-direction: column;
        }

        .sfi-landing-wrapper .content-card .num {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--yellow);
          display: grid;
          place-items: center;
          font-weight: 900;
          margin-bottom: 14px;
          color: #111;
        }

        .sfi-landing-wrapper .content-card h3 {
          font-size: 1.22rem;
          margin: 0 0 10px;
          font-weight: 800;
        }

        .sfi-landing-wrapper .content-card p {
          color: var(--muted);
          font-size: .94rem;
          margin-top: 0;
        }

        .sfi-landing-wrapper .detail-list {
          padding-left: 20px;
          margin: 16px 0;
          color: #444;
          font-size: .92rem;
        }

        .sfi-landing-wrapper .detail-list li {
          margin: 8px 0;
        }

        .sfi-landing-wrapper .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: auto;
          margin-bottom: 18px;
        }

        .sfi-landing-wrapper .tag {
          font-size: .76rem;
          font-weight: 750;
          padding: 6px 9px;
          background: #f4f4ee;
          border-radius: 999px;
          color: #444;
        }

        .sfi-landing-wrapper .offer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          max-width: 900px;
          margin: auto;
        }

        .sfi-landing-wrapper .offer-card {
          border: 1px solid #deded5;
          border-radius: 18px;
          padding: 26px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(17, 17, 17, 0.08);
          display: flex;
          flex-direction: column;
        }

        .sfi-landing-wrapper .offer-card.featured {
          border: 2px solid var(--yellow);
        }

        .sfi-landing-wrapper .offer-card h3 {
          font-size: 1.35rem;
          margin: 13px 0 5px;
          font-weight: 900;
        }

        .sfi-landing-wrapper .price {
          font-size: 2.7rem;
          line-height: 1.1;
          font-weight: 950;
          letter-spacing: -.05em;
          margin: 12px 0 4px;
          color: var(--ink);
        }

        .sfi-landing-wrapper .price-note,
        .sfi-landing-wrapper .small-note {
          color: var(--muted);
          font-size: .88rem;
        }

        .sfi-landing-wrapper .offer-card ul {
          padding-left: 20px;
          margin: 18px 0;
          color: #444;
          font-size: .92rem;
          flex-grow: 1;
        }

        .sfi-landing-wrapper .offer-card li {
          margin: 8px 0;
        }

        .sfi-landing-wrapper .offer-ribbon {
          display: inline-block;
          background: var(--pink);
          color: #151515;
          padding: 7px 11px;
          border-radius: 999px;
          font-size: .76rem;
          font-weight: 900;
          letter-spacing: .07em;
          text-transform: uppercase;
          align-self: flex-start;
        }

        .sfi-landing-wrapper .notice {
          max-width: 900px;
          margin: 20px auto 0;
          padding: 14px 16px;
          background: #fff8c9;
          border: 1px solid #eee19a;
          border-radius: 12px;
          font-size: .9rem;
          color: #444;
        }

        .sfi-landing-wrapper .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .sfi-landing-wrapper .feature-card {
          border: 1px solid var(--line);
          border-radius: 15px;
          padding: 20px;
          background: #fff;
        }

        .sfi-landing-wrapper .feature-icon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          background: var(--yellow);
          font-weight: 950;
          font-size: 1.05rem;
          margin-bottom: 12px;
          color: #111;
        }

        .sfi-landing-wrapper .feature-card h3 {
          font-size: 1.02rem;
          margin: 0 0 7px;
          font-weight: 800;
        }

        .sfi-landing-wrapper .feature-card p {
          font-size: .9rem;
          color: var(--muted);
          margin: 0;
          line-height: 1.5;
        }

        .sfi-landing-wrapper .benefits {
          background: var(--soft);
        }

        .sfi-landing-wrapper .benefit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .sfi-landing-wrapper .benefit {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 15px;
          padding: 22px;
        }

        .sfi-landing-wrapper .benefit-icon {
          font-size: 1.4rem;
          margin-bottom: 4px;
          display: inline-block;
        }

        .sfi-landing-wrapper .benefit h3 {
          margin: 8px 0;
          font-size: 1.05rem;
          font-weight: 800;
        }

        .sfi-landing-wrapper .benefit p {
          margin: 0;
          color: var(--muted);
          font-size: .93rem;
          line-height: 1.5;
        }

        .sfi-landing-wrapper .step-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .sfi-landing-wrapper .step {
          border-top: 3px solid var(--yellow);
          padding: 20px 18px;
          background: #fff;
          border-radius: 0 0 14px 14px;
          border-left: 1px solid var(--line);
          border-right: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }

        .sfi-landing-wrapper .step b {
          font-size: .8rem;
          letter-spacing: .1em;
          color: #777;
        }

        .sfi-landing-wrapper .step h3 {
          margin: 8px 0;
          font-size: 1.15rem;
          font-weight: 800;
        }

        .sfi-landing-wrapper .step p {
          margin: 0;
          color: var(--muted);
          font-size: .94rem;
          line-height: 1.5;
        }

        .sfi-landing-wrapper .form-section {
          background: #f4f4f0;
        }

        .sfi-landing-wrapper .form-layout {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 34px;
          align-items: start;
        }

        .sfi-landing-wrapper .form-copy {
          position: sticky;
          top: 20px;
        }

        .sfi-landing-wrapper .form-copy h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.08;
          letter-spacing: -.04em;
          margin: 14px 0;
          font-weight: 900;
        }

        .sfi-landing-wrapper .form-copy p {
          color: var(--muted);
        }

        .sfi-landing-wrapper .form-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 12px 40px rgba(17, 17, 17, 0.08);
        }

        .sfi-landing-wrapper .form-card h3 {
          margin: 0 0 6px;
          font-size: 1.45rem;
          font-weight: 900;
        }

        .sfi-landing-wrapper .form-card .intro {
          margin: 0 0 22px;
          color: var(--muted);
          font-size: .93rem;
        }

        .sfi-landing-wrapper .field {
          margin-bottom: 16px;
        }

        .sfi-landing-wrapper label,
        .sfi-landing-wrapper .field-label {
          display: block;
          font-size: .9rem;
          font-weight: 800;
          margin-bottom: 7px;
        }

        .sfi-landing-wrapper input,
        .sfi-landing-wrapper select {
          width: 100%;
          font: inherit;
          padding: 13px 14px;
          border: 1px solid #d8d8d2;
          border-radius: 10px;
          background: #fff;
          color: var(--ink);
        }

        .sfi-landing-wrapper input:focus,
        .sfi-landing-wrapper select:focus {
          outline: 3px solid #FFAF0088;
          border-color: #777;
        }

        .sfi-landing-wrapper .radio-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
        }

        .sfi-landing-wrapper .radio-option {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 10px;
          font-size: .92rem;
          cursor: pointer;
          font-weight: 600;
          transition: background .15s;
        }

        .sfi-landing-wrapper .radio-option:hover {
          background: #fafaf8;
        }

        .sfi-landing-wrapper .radio-option input {
          width: auto;
          margin: 0;
          accent-color: #111;
        }

        .sfi-landing-wrapper .consent {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: var(--muted);
          font-size: .82rem;
          font-weight: 400;
          line-height: 1.4;
          cursor: pointer;
        }

        .sfi-landing-wrapper .consent input {
          width: auto;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .sfi-landing-wrapper .form-card .btn {
          width: 100%;
          margin-top: 6px;
        }

        .sfi-landing-wrapper .privacy {
          font-size: .78rem;
          color: #777;
          text-align: center;
          margin: 12px 0 0;
        }

        .sfi-landing-wrapper .form-status {
          display: none;
          padding: 12px;
          border-radius: 10px;
          margin-top: 14px;
          font-size: .9rem;
          font-weight: 600;
        }

        .sfi-landing-wrapper .form-status.ok {
          display: block;
          background: #eaf6ee;
          color: #165b35;
          border: 1px solid #b8e2c8;
        }

        .sfi-landing-wrapper .form-status.err {
          display: block;
          background: #fff0ee;
          color: #8b2117;
          border: 1px solid #ffd4cf;
        }

        .sfi-landing-wrapper .faq-list {
          max-width: 820px;
          margin: auto;
        }

        .sfi-landing-wrapper details {
          border-bottom: 1px solid var(--line);
          padding: 18px 0;
        }

        .sfi-landing-wrapper summary {
          font-weight: 800;
          cursor: pointer;
          font-size: 1.05rem;
        }

        .sfi-landing-wrapper details p {
          color: var(--muted);
          margin-top: 8px;
          margin-bottom: 0;
          line-height: 1.5;
        }

        .sfi-landing-wrapper .final-cta {
          background: var(--ink);
          color: #fff;
          text-align: center;
          padding: 58px 0;
        }

        .sfi-landing-wrapper .final-cta h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.1;
          margin: 0 0 14px;
          font-weight: 900;
        }

        .sfi-landing-wrapper .final-cta p {
          color: #dedede;
          max-width: 650px;
          margin: 0 auto 24px;
          font-size: 1.05rem;
        }

        .sfi-landing-wrapper footer {
          background: #0b0b0b;
          color: #c7c7c7;
          padding: 24px 0;
          font-size: .82rem;
        }

        .sfi-landing-wrapper footer .footer-inner {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .sfi-landing-wrapper .sticky-cta {
          display: none;
        }

        @media (max-width: 700px) {
          .sfi-landing-wrapper .offer-grid,
          .sfi-landing-wrapper .content-grid {
            grid-template-columns: 1fr;
          }
          .sfi-landing-wrapper .offer-card,
          .sfi-landing-wrapper .content-card {
            padding: 20px;
          }
        }

        @media (max-width: 850px) {
          .sfi-landing-wrapper .hero-grid,
          .sfi-landing-wrapper .form-layout {
            grid-template-columns: 1fr;
          }
          .sfi-landing-wrapper .hero {
            padding: 45px 0;
          }
          .sfi-landing-wrapper .hero-card {
            max-width: 560px;
          }
          .sfi-landing-wrapper .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .sfi-landing-wrapper .benefit-grid {
            grid-template-columns: 1fr 1fr;
          }
          .sfi-landing-wrapper .form-copy {
            position: static;
          }
          .sfi-landing-wrapper .step-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          section {
            padding: 48px 0;
          }
          .sfi-landing-wrapper .hero-grid {
            gap: 26px;
          }
          .sfi-landing-wrapper .hero-card {
            padding: 20px;
          }
          .sfi-landing-wrapper .feature-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .sfi-landing-wrapper .feature-card {
            padding: 15px;
          }
          .sfi-landing-wrapper .feature-card h3 {
            font-size: .94rem;
          }
          .sfi-landing-wrapper .feature-card p {
            font-size: .84rem;
          }
          .sfi-landing-wrapper .benefit-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .sfi-landing-wrapper .form-card {
            padding: 20px 16px;
          }
          .sfi-landing-wrapper .radio-grid {
            grid-template-columns: 1fr;
          }
          .sfi-landing-wrapper .sticky-cta {
            display: block;
            position: fixed;
            z-index: 50;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 10px 14px;
            background: #fff;
            border-top: 1px solid var(--line);
          }
          .sfi-landing-wrapper .sticky-cta .btn {
            width: 100%;
          }
          .sfi-landing-wrapper {
            padding-bottom: 68px;
          }
        }
      `}</style>

      {/* ── TOPBAR ── */}
      <div className="topbar">LIVE ONLINE FITNESS · FIND A PROGRAM THAT FITS YOUR GOALS</div>

      {/* ── HEADER ── */}
      <header>
        <div className="wrap">
          <a className="brand" href="/" aria-label="Studio FIT India home">
            <img
              src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1787160047/sfi_pdk6so.png"
              alt="Studio FIT India"
              className="brand-logo"
            />
          </a>
        </div>
      </header>

      <main>
        {/* ── HERO ── */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">Your fitness journey starts here</span>
              <h1>Fitness that fits <em>your goals.</em></h1>
              <p>Explore live online fitness classes with Studio FIT India. Whether you want to work toward weight gain, weight loss, strength training, or regular fitness, take the next step from the comfort of home.</p>
              <ul className="ticks">
                <li>Live online fitness classes</li>
                <li>Programs for different fitness goals</li>
                <li>Guidance from fitness trainers</li>
              </ul>
              <a className="btn" href="#enquiry">
                GET MY FITNESS PLAN <span aria-hidden="true">→</span>
              </a>
              <p style={{ marginTop: "13px" }}>
                <a href="#membership-offers" style={{ color: "var(--yellow)", fontWeight: 800 }}>
                  View festive membership offers ↓
                </a>
              </p>
              <p className="subnote">Share your details and our team can help you explore available programs and membership options.</p>
            </div>
            <aside className="hero-card" aria-label="Choose your fitness goal">
              <span className="mini-label">Start with your goal</span>
              <h2>What would you like to work on?</h2>
              <p style={{ color: "#d2d2d2", margin: 0 }}>Choose a direction. We'll help you explore the available options.</p>
              <div className="goal-pills">
                {[
                  { goal: "Weight Gain", hint: "Build healthy routines" },
                  { goal: "Weight Loss", hint: "Work toward your goal" },
                  { goal: "Strength Training", hint: "Build strength" },
                  { goal: "Regular Fitness", hint: "Stay active consistently" },
                ].map(({ goal, hint }) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleGoalSelect(goal)}
                    className={`goal-pill ${formData.fitnessGoal === goal ? "selected" : ""}`}
                  >
                    {goal}
                    <span>{hint}</span>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* ── PROGRAMS (CONTENT GRID) ── */}
        <section id="programs">
          <div className="wrap">
            <div className="section-head">
              <h2>Choose an online fitness program that fits your goal</h2>
              <p>Explore guided workout options for building strength, improving fitness consistency, or working toward a personal weight goal. Our team can help you understand available classes and membership options.</p>
            </div>
            <div className="content-grid">
              <article className="content-card">
                <div className="num">01</div>
                <h3>Weight Gain & Strength-Building Support</h3>
                <p>For people who want to work toward a stronger body and build a more consistent exercise routine.</p>
                <ul className="detail-list">
                  <li>Explore strength-focused workout options suitable for your experience level.</li>
                  <li>Build consistency through scheduled live online sessions.</li>
                  <li>Learn exercise technique and progression with trainer guidance.</li>
                  <li>Ask about nutrition support options if available for your goals.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Strength-focused</span>
                  <span className="tag">Live online sessions</span>
                  <span className="tag">Goal-oriented routine</span>
                </div>
                <p style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleGoalSelect("Weight Gain")}
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    ENQUIRE ABOUT WEIGHT GAIN →
                  </button>
                </p>
              </article>

              <article className="content-card">
                <div className="num">02</div>
                <h3>Weight Loss & Transformation</h3>
                <p>For people who want to create a consistent movement routine and work toward sustainable fitness habits.</p>
                <ul className="detail-list">
                  <li>Explore cardio, strength and other workout formats in the available schedule.</li>
                  <li>Build an exercise routine around your preferred class timings.</li>
                  <li>Ask about transformation options that may combine workouts, diet guidance and counselling.</li>
                  <li>Focus on progress and healthy habits rather than unrealistic promises.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Fitness routine</span>
                  <span className="tag">Cardio + strength</span>
                  <span className="tag">Transformation enquiry</span>
                </div>
                <p style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleGoalSelect("Weight Loss")}
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    ENQUIRE ABOUT WEIGHT LOSS →
                  </button>
                </p>
              </article>

              <article className="content-card">
                <div className="num">03</div>
                <h3>Strength Training</h3>
                <p>For people interested in developing strength, improving movement confidence and creating a structured workout habit.</p>
                <ul className="detail-list">
                  <li>Ask about classes focused on resistance and strength exercises.</li>
                  <li>Learn about modifications for different experience levels.</li>
                  <li>Use regular sessions to practise technique and maintain consistency.</li>
                  <li>Discuss your goals with the team before selecting a plan.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Strength and conditioning</span>
                  <span className="tag">Trainer guidance</span>
                  <span className="tag">Consistent practice</span>
                </div>
                <p style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleGoalSelect("Strength Training")}
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    ENQUIRE ABOUT STRENGTH →
                  </button>
                </p>
              </article>

              <article className="content-card">
                <div className="num">04</div>
                <h3>Regular Fitness & Active Lifestyle</h3>
                <p>For people who want to stay active, explore different workout styles and make fitness a regular part of the week.</p>
                <ul className="detail-list">
                  <li>Ask about available formats such as yoga, Pilates, Zumba, aerobics, HIIT and functional training.</li>
                  <li>Find class timings that work with your daily routine.</li>
                  <li>Mix workout styles where your membership and timetable allow.</li>
                  <li>Make movement more convenient by joining online from home.</li>
                </ul>
                <div className="tag-row">
                  <span className="tag">Multiple workout styles</span>
                  <span className="tag">Flexible timing options</span>
                  <span className="tag">At-home convenience</span>
                </div>
                <p style={{ margin: 0 }}>
                  <button
                    type="button"
                    onClick={() => handleGoalSelect("Regular Fitness")}
                    className="btn"
                    style={{ width: "100%" }}
                  >
                    EXPLORE FITNESS CLASSES →
                  </button>
                </p>
              </article>
            </div>
            <div className="notice">
              <strong>Please note:</strong> Results vary by individual. The right exercise plan depends on your current fitness, health, experience and consistency. Ask the Studio FIT India team about current class availability and program suitability.
            </div>
          </div>
        </section>

        {/* ── MEMBERSHIP OFFERS ── */}
        <section id="membership-offers" className="benefits">
          <div className="wrap">
            <div className="section-head">
              <span className="offer-ribbon">Festive Membership Offers</span>
              <h2>More time to move. More value for your membership.</h2>
              <p>Explore the festive offers shared for Studio FIT India online fitness memberships. Choose a duration that suits your plans and ask our team to confirm the terms before payment.</p>
            </div>
            <div className="offer-grid">
              <article className="offer-card featured">
                <span className="offer-ribbon">Annual Offer</span>
                <h3>12 Months + 12 Months Free</h3>
                <div className="price">₹6,999</div>
                <div className="price-note">Pay for 1 year and get 1 additional year included, subject to offer terms.</div>
                <ul>
                  <li>Extended membership period for long-term consistency.</li>
                  <li>Access to available live online classes covered by the selected membership.</li>
                  <li>Flexible class timing options, subject to the published schedule.</li>
                  <li>More time to establish and maintain a regular fitness routine.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => handleGoalSelect("Regular Fitness")}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  ENQUIRE ABOUT ANNUAL OFFER →
                </button>
              </article>

              <article className="offer-card">
                <span className="offer-ribbon">Extended Offer</span>
                <h3>6 Months + 6 Months Free</h3>
                <div className="price">₹4,999</div>
                <div className="price-note">Pay for 6 months and get 6 additional months included, subject to offer terms.</div>
                <ul>
                  <li>A longer period to build consistency without renewing every month.</li>
                  <li>Access to available live online classes covered by the selected membership.</li>
                  <li>Explore workout formats listed in the current schedule.</li>
                  <li>Convenient online workouts from home.</li>
                </ul>
                <button
                  type="button"
                  onClick={() => handleGoalSelect("Regular Fitness")}
                  className="btn"
                  style={{ width: "100%" }}
                >
                  ENQUIRE ABOUT 6-MONTH OFFER →
                </button>
              </article>
            </div>


            <div className="section-head" style={{ marginTop: "44px", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.7rem" }}>Membership benefits to explore</h2>
              <p>Confirm the current inclusions for the plan you choose.</p>
            </div>
            <div className="benefit-grid">
              <article className="benefit">
                <h3>Live Interactive Classes</h3>
                <p>Participate in scheduled online sessions and follow trainer guidance in real time, according to the class format.</p>
              </article>
              <article className="benefit">
                <h3>Personalised Guidance</h3>
                <p>Ask whether a customised diet plan, workout plan and counselling session are included in your selected membership.</p>
              </article>
              <article className="benefit">
                <h3>Progress & Consistency</h3>
                <p>Explore available daily tracking and year-round class options to help you stay engaged with your routine.</p>
              </article>
            </div>
            <p className="small-note" style={{ textAlign: "center", marginTop: "18px" }}>
              Membership benefits and class access depend on the current plan terms and published schedule. Confirm details with the team before purchasing.
            </p>
          </div>
        </section>

        {/* ── BENEFITS: DESIGNED AROUND YOUR DAY ── */}
        <section className="benefits" style={{ background: "#fff" }}>
          <div className="wrap">
            <div className="section-head">
              <h2>Online fitness designed around your day</h2>
              <p>Explore class options that can help you build a consistent routine from home.</p>
            </div>
            <div className="benefit-grid">
              <article className="benefit">
                <div className="benefit-icon" aria-hidden="true">⌂</div>
                <h3>Convenience of home workouts</h3>
                <p>Join available online classes from home and reduce the need to travel to a physical gym.</p>
              </article>
              <article className="benefit">
                <div className="benefit-icon" aria-hidden="true">✦</div>
                <h3>Variety of workout formats</h3>
                <p>Ask about strength training, yoga, Pilates, Zumba, aerobics, HIIT and functional training sessions.</p>
              </article>
              <article className="benefit">
                <div className="benefit-icon" aria-hidden="true">✓</div>
                <h3>Support for your goals</h3>
                <p>Tell the team whether you are focused on weight gain, weight loss, strength training or regular fitness.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── 10 FEATURES GRID: MORE THAN A WORKOUT ── */}
        <section id="benefits">
          <div className="wrap">
            <div className="section-head">
              <h2>More than a workout — support for your fitness journey</h2>
              <p>Discover the features designed to help you stay consistent, get guidance and make online fitness part of your lifestyle.</p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon">01</div>
                <h3>Multiple Classes</h3>
                <p>Explore different workout formats and find classes that suit your goals, interests and experience level.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">02</div>
                <h3>Flexible Timings</h3>
                <p>Choose from available class timings to help fit workouts around your work, study and daily routine.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">03</div>
                <h3>365-Day Classes</h3>
                <p>Fitness support throughout the year, subject to the published timetable, holidays and membership terms.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">04</div>
                <h3>Customised Diet Plan</h3>
                <p>Ask about personalised diet guidance based on your goals and needs, where included in your selected program.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">05</div>
                <h3>Live Interactive Classes</h3>
                <p>Join live sessions where you can follow the trainer and interact during class, subject to the class format.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">06</div>
                <h3>Certified Trainers</h3>
                <p>Learn with trainers whose qualifications and experience can be shared with you before joining.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">07</div>
                <h3>Classes Available Globally</h3>
                <p>Join online from different locations around the world, subject to internet access, time zones and schedule availability.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">08</div>
                <h3>Daily Tracking</h3>
                <p>Ask how your attendance, routine or progress can be tracked through the program and what tracking is included.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">09</div>
                <h3>Customised Workout Plan</h3>
                <p>Explore workout recommendations tailored to your fitness goals, experience and available equipment, where included.</p>
              </article>
              <article className="feature-card">
                <div className="feature-icon">10</div>
                <h3>Personal Counselling Session</h3>
                <p>Discuss your goals, challenges and next steps in a personal session where this service is included in your plan.</p>
              </article>
            </div>
            <div className="notice">
              <strong>Plan inclusions:</strong> Customised diet plans, personalised workout plans, daily tracking and counselling may vary by membership. Confirm which features are included in your selected plan before purchasing.
            </div>
            <p style={{ textAlign: "center", marginTop: "24px" }}>
              <button
                type="button"
                onClick={() => handleGoalSelect("")}
                className="btn"
              >
                FIND MY FITNESS PLAN →
              </button>
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <h2>Getting started is simple</h2>
              <p>Three easy steps to enquire about online fitness classes.</p>
            </div>
            <div className="step-grid">
              <article className="step">
                <b>STEP 01</b>
                <h3>Tell us your goal</h3>
                <p>Complete the short form and choose your fitness goal.</p>
              </article>
              <article className="step">
                <b>STEP 02</b>
                <h3>Discuss your options</h3>
                <p>Our team can contact you about available classes, timings, and membership plans.</p>
              </article>
              <article className="step">
                <b>STEP 03</b>
                <h3>Choose your plan</h3>
                <p>Review the available options and decide what works for you.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ── FORM SECTION ── */}
        <section className="form-section" id="enquiry">
          <div className="wrap form-layout">
            <div className="form-copy">
              <span className="eyebrow" style={{ background: "#fff", borderColor: "#ddd", color: "#222" }}>
                Get started
              </span>
              <h2>Let's find your fitness plan.</h2>
              <p>Share a few details so our team can understand your goal and preferred class timing.</p>
              <ul className="ticks" style={{ color: "#222" }}>
                <li>Tell us your fitness goal</li>
                <li>Choose a preferred class time</li>
                <li>Request information about plans</li>
              </ul>
              <p style={{ fontSize: ".88rem" }}>
                Submitting this form sends an enquiry only. Membership is not confirmed until you complete the studio's enrolment process.
              </p>
            </div>
            <div className="form-card">
              <h3>Get my fitness plan</h3>
              <p className="intro">Fill in the form and request a callback from Studio FIT India.</p>
              <form id="leadForm" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="fullName">Full name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    required
                    maxLength={100}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="phone">Mobile number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    pattern="[6-9][0-9]{9}"
                    minLength={10}
                    maxLength={10}
                    required
                    placeholder="10-digit mobile number"
                    aria-describedby="phoneHelp"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <small id="phoneHelp" style={{ color: "#777", display: "block", marginTop: "4px" }}>
                    Enter an Indian mobile number starting with 6, 7, 8, or 9.
                  </small>
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">WhatsApp number (optional)</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern="([6-9][0-9]{9})?"
                    placeholder="If different from mobile"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>
                <fieldset className="field" style={{ border: 0, padding: 0, marginLeft: 0, marginRight: 0 }}>
                  <legend className="field-label">Which program are you interested in? *</legend>
                  <div className="radio-grid">
                    {["Weight Gain", "Weight Loss", "Strength Training", "Regular Fitness"].map((g) => (
                      <label key={g} className="radio-option">
                        <input
                          type="radio"
                          name="fitnessGoal"
                          value={g}
                          checked={formData.fitnessGoal === g}
                          onChange={handleChange}
                          required
                        />
                        {" "}{g}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="field">
                  <label htmlFor="timing">Preferred class timing *</label>
                  <select
                    id="timing"
                    name="timing"
                    required
                    value={formData.timing}
                    onChange={handleChange}
                  >
                    <option value="">Select timing</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="startTimeline">When would you like to start? *</label>
                  <select
                    id="startTimeline"
                    name="startTimeline"
                    required
                    value={formData.startTimeline}
                    onChange={handleChange}
                  >
                    <option value="">Select your timeline</option>
                    <option value="Immediately">As soon as possible</option>
                    <option value="Within 7 days">Within 7 days</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="Just exploring">Just exploring options</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="contactMethod">Preferred contact method *</label>
                  <select
                    id="contactMethod"
                    name="contactMethod"
                    required
                    value={formData.contactMethod}
                    onChange={handleChange}
                  >
                    <option value="">Select contact method</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
                <div className="field">
                  <label className="consent">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      required
                    />
                    <span>I agree that Studio FIT India may contact me about this enquiry and relevant fitness programs. *</span>
                  </label>
                </div>

                <button className="btn" type="submit" id="submitBtn" disabled={submitting}>
                  {submitting ? "SUBMITTING..." : (
                    <>REQUEST A CALLBACK <span aria-hidden="true">→</span></>
                  )}
                </button>

                {status.message && (
                  <div
                    id="formStatus"
                    className={`form-status ${status.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {status.message}
                  </div>
                )}

                <p className="privacy">Your information will be used to respond to your enquiry. Please don't submit sensitive personal information.</p>
              </form>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <div className="wrap">
            <div className="section-head">
              <h2>Frequently asked questions</h2>
              <p>Quick answers before you enquire.</p>
            </div>
            <div className="faq-list">
              <details>
                <summary>Are Studio FIT India classes online?</summary>
                <p>Studio FIT India offers online fitness classes. Contact the team to confirm available programs and schedules.</p>
              </details>
              <details>
                <summary>Which fitness goal can I select?</summary>
                <p>You can enquire about Weight Gain, Weight Loss, Strength Training, or Regular Fitness. The team can explain relevant available options.</p>
              </details>
              <details>
                <summary>What are the current membership offers?</summary>
                <p>The page lists festive offers of ₹6,999 for 12 months plus 12 months free and ₹4,999 for 6 months plus 6 months free. Confirm current validity, inclusions and terms with Studio FIT India before payment.</p>
              </details>
              <details>
                <summary>What classes are available?</summary>
                <p>Available formats may include strength training, yoga, Pilates, Zumba, aerobics, HIIT and functional training. Contact the team to confirm the live schedule and which formats your plan includes.</p>
              </details>
              <details>
                <summary>Can I get help choosing a program?</summary>
                <p>Select your main goal in the enquiry form and the team can discuss available options. Program suitability and results vary by individual.</p>
              </details>
              <details>
                <summary>How do I get started?</summary>
                <p>Complete the form with your contact details and preferences. The team can follow up about available classes and next steps.</p>
              </details>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final-cta">
          <div className="wrap">
            <h2>Your next step starts today.</h2>
            <p>Tell us what you're working toward and explore online fitness options with Studio FIT India.</p>
            <a className="btn" href="#enquiry">GET MY FITNESS PLAN →</a>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer>
        <div className="wrap footer-inner">
          <span><strong>STUDIO FIT INDIA</strong> · Live Online Fitness</span>
          <span>
            <a href="/" style={{ color: "inherit" }}>Official website</a> · Please review the site's privacy policy before publishing this form.
          </span>
        </div>
      </footer>

      {/* ── STICKY CTA ON MOBILE ── */}
      <div className="sticky-cta">
        <a className="btn" href="#enquiry">GET MY FITNESS PLAN →</a>
      </div>
    </div>
  );
};

export default Sfi;
