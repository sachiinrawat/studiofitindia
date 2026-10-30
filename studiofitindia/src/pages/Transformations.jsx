import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, PlayCircle, Star, Phone } from "lucide-react";
import SEO from "../components/SEO";
import { workoutPlans, dietPlans } from "../data/pricing";
import PaymentModal from "../components/PaymentModal";
import { coaches } from "../data/coaches";
import { memberStories } from "../data/memberStories";


/* ─── FADE UP (scroll-triggered) ─── */
const FadeUp = ({ children, delay = 0, className = "", style = {} }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* ─── MOUNT-IN (animates on page load, not scroll) ─── */
const MountIn = ({ children, delay = 0, x = 0, y = 28, className = "", style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y, x }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);

/* ─── FAQ ACCORDION ─── */
const AccordionItem = ({ q, a, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <article style={{ borderTop: "1px solid var(--tf-border)" }}>
      <h3 style={{ margin: 0 }}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen(!open)}
          style={{
            display: "flex", width: "100%", alignItems: "center",
            justifyContent: "space-between", padding: "20px 0", border: 0,
            background: "transparent", color: "var(--tf-text)", fontFamily: "var(--tf-font)",
            fontSize: 27, fontWeight: 600, textAlign: "left", cursor: "pointer", gap: 16,
          }}
        >
          {q}
          <span style={{ color: "var(--tf-gold)", fontSize: 28, fontWeight: 400, flexShrink: 0, transform: open ? "rotate(45deg)" : "none", transition: "transform 250ms" }}>+</span>
        </button>
      </h3>
      {open && (
        <div id={id} role="region">
          <p style={{ maxWidth: 600, margin: "0 0 20px", color: "var(--tf-muted)", lineHeight: 1.55, fontSize: 21 }}>{a}</p>
        </div>
      )}
    </article>
  );
};

/* ─── MAIN ─── */
const Transformations = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", goal: "", description: "" });
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const plans = dietPlans.filter(p => p.id === 8 || p.id === 5).sort((a, b) => a.price - b.price);
  const transformCoaches = coaches.filter(c => c.id === 1 || c.id === 2);

  const pillars = [
    { num: "01", symbol: "⌁", color: "#ffb300", title: "Live training", desc: "Move with expert coaches in energising live sessions that meet you at your level." },
    { num: "02", symbol: "✦", color: "#f42f70", title: "Nutrition guidance", desc: "Build balanced habits with a plan made for your preferences, lifestyle, and goals." },
    { num: "03", symbol: "↗", color: "#f4d4ac", title: "Real accountability", desc: "Check in, celebrate wins, and keep your momentum moving forward every week." },
  ];

  const journey = [
    { num: "01", title: "Understand your starting point", desc: "We listen to your goals, schedule, fitness level, and what support will make the greatest difference." },
    { num: "02", title: "Build your routine", desc: "Your live classes, nutrition guidance, and recovery habits come together in one simple plan." },
    { num: "03", title: "Stay supported", desc: "Weekly progress tracking and coach support keep each next step in reach." },
  ];

  const faqs = [
    { id: "f1", q: "What does the Transformation program include?", a: "Your program combines live classes, customised nutrition guidance, regular progress monitoring, and priority support from Studio FIT coaches — all in one plan." },
    { id: "f2", q: "Can beginners join?", a: "Yes. Your coach will help you choose sessions and habits appropriate for your current fitness level. Everyone starts somewhere." },
    { id: "f3", q: "Do I need equipment or a gym?", a: "No gym required. Your coach will help you make the most of the space and equipment you have at home." },
    { id: "f4", q: "How long before I see results?", a: "Most members notice increased energy and consistency within the first two weeks. Visible body changes typically appear by 90 days when the plan is followed." },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.goal) return;
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Name", form.name);
      formData.append("Phone", form.phone);
      formData.append("Goal", form.goal);
      formData.append("Description", form.description);

      // Replace with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw5LhJtSNf8T9yj_CLH2VwQ5IyjVvDg-YHmEce6yGf6zwgCTQkPpGLk6h5aR4fEbOXV/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setFormStatus(`Thanks, ${form.name.trim()}! A Studio FIT coach will reach out shortly.`);
      setForm({ name: "", phone: "", goal: "", description: "" });
    } catch (err) {
      setFormStatus("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      style={{
        background: "#1a1a1a",
        backgroundAttachment: "fixed",
        color: "var(--tf-text)",
        fontFamily: "'Barlow', sans-serif",
        overflowX: "hidden"
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@600;700;800;900&display=swap');
        :root {
          --tf-gold: #d4b578;
          --tf-gold-h: #e5c994;
          --tf-pink: #9a2b42;
          --tf-pink-s: #c43e5c;
          --tf-text: #f7f3ee;
          --tf-muted: #a39c93;
          --tf-inverse: #1a1a1a;
          --tf-surface: #1a1a1a;
          --tf-raised: rgba(30, 30, 30, 0.7);
          --tf-border: rgba(212, 181, 120, 0.12);
          --tf-font: 'Barlow', sans-serif;
          --tf-accent: 'Barlow Condensed', sans-serif;
        }
        .tf-eyebrow { display:none; }
        .tf-eyebrow-dot { display:none; }
        .tf-h1 { font-size:clamp(52px,7vw,96px);font-weight:700;font-family:'Barlow Condensed',sans-serif;letter-spacing:-.01em;line-height:.94;margin:0 0 30px;text-transform:uppercase; }
        .tf-h2 { font-size:clamp(38px,5vw,68px);font-weight:700;font-family:'Barlow Condensed',sans-serif;letter-spacing:0;line-height:1.02;margin:0 0 20px;text-transform:uppercase; }
        .tf-em { color:var(--tf-gold);font-family:'Barlow Condensed',sans-serif;font-weight:700;font-style:normal; }
        .tf-sec { max-width:1600px;margin:auto;padding:0 60px; }
        .tf-btn { display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:48px;padding:11px 22px;border:1px solid var(--tf-gold);border-radius:5px;background:var(--tf-gold);color:var(--tf-inverse);font-weight:800;font-size:21px;font-family:var(--tf-font);text-decoration:none;cursor:pointer;transition:background 250ms,transform 250ms;white-space:nowrap; }
        .tf-btn:hover { background:var(--tf-gold-h); }
        .tf-btn:active { transform:translateY(1px); }
        .tf-btn--outline { background:transparent;color:var(--tf-text);border-color:var(--tf-border); }
        .tf-btn--outline:hover { border-color:var(--tf-gold);color:var(--tf-gold); }
        .tf-btn--pink { background:var(--tf-pink);border-color:var(--tf-pink);color:#fff; }
        .tf-btn--pink:hover { background:#b0294b; }
        .tf-btn--full { width:100%; }
        .tf-text-link { display:inline-flex;align-items:center;gap:8px;font-weight:700;text-decoration:none;color:inherit; }
        .tf-text-link:hover { color:var(--tf-gold); }

        /* HERO */
        .tf-hero { display:grid;grid-template-columns:1.03fr .97fr;align-items:center;min-height:780px;padding-top:60px;padding-bottom:140px; }
        .tf-hero-lead { max-width:475px;margin:0 0 30px;color:var(--tf-muted);font-size:27px;line-height:1.55; }
        .tf-hero-actions { display:flex;align-items:center;gap:30px; }
        .tf-proof-row { display:flex;align-items:center;gap:15px;margin-top:35px;color:var(--tf-muted);font-size:18px; }
        .tf-proof-row p { margin:0; }
        .tf-avatars { display:flex;padding-left:7px; }
        .tf-avatars b { display:grid;width:28px;height:28px;margin-left:-7px;place-items:center;border:2px solid #0b0908;border-radius:50%;background:#b55235;color:#fff;font-size:14px; }
        .tf-avatars b:nth-child(2){background:#7b4973} .tf-avatars b:nth-child(3){background:#9d8151}
        /* visual */
        .tf-visual { position:relative;min-height:500px; }
        .tf-glow { position:absolute;top:13px;right:1%;width:min(33vw,425px);height:min(33vw,425px);border-radius:50%;background:radial-gradient(circle at 32% 32%,#ffc42c,#ffb300 47%,#dc1854 100%); }
        .tf-portrait { position:absolute;inset:64px 3% 0 11%;overflow:hidden;border:1px solid #ffffff14;border-radius:190px 190px 5px 5px;background:linear-gradient(143deg,#f6bd86,#a4492f 45%,#351814 100%); }
        .tf-portrait-sun { position:absolute;top:13%;right:15%;width:116px;height:116px;border-radius:50%;background:#ffe3b8;opacity:.78; }
        .tf-portrait-person { position:absolute;right:3%;bottom:-1%;width:81%;height:83%; }
        .tf-portrait-person b { position:absolute;top:0;right:31%;width:110px;height:128px;border-radius:55% 45% 48% 45%;background:#703c2f;box-shadow:inset 30px 0 #271714; }
        .tf-portrait-person i { position:absolute;right:0;bottom:0;width:100%;height:70%;border-radius:55% 55% 0 0;background:linear-gradient(92deg,#831638 0 49%,#f0d1b4 50%);transform:rotate(-6deg); }
        .tf-portrait-person em { position:absolute;top:28%;left:13%;width:50%;height:19%;border-radius:999px;background:#804833;transform:rotate(-33deg);font-style:normal; }
        .tf-portrait-caption { position:absolute;z-index:2;top:30px;left:30px;color:var(--tf-inverse);font-size:17px;font-weight:800;letter-spacing:.08em;line-height:1.1; }
        .tf-live-card { position:absolute;right:-3%;bottom:2%;width:225px;padding:20px;border:1px solid #ffffff2e;border-radius:5px;background:#160f0fe8;box-shadow:0 15px 35px #0006;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-live-card > span { display:flex;align-items:center;gap:6px;color:var(--tf-muted);font-size:14px;font-weight:800;letter-spacing:.08em; }
        .tf-live-card strong { display:block;margin-top:12px;font-size:31px;letter-spacing:-.06em;line-height:1; }
        .tf-live-card small { color:var(--tf-gold);font-size:18px; }
        .tf-live-card p { margin:7px 0 15px;color:var(--tf-muted);font-size:18px; }

        /* TRUST */
        .tf-trust { display:grid;grid-template-columns:repeat(4,1fr);max-width:1600px;margin:auto;border-top:1px solid var(--tf-border);border-bottom:1px solid var(--tf-border); }
        .tf-trust-cell { padding:30px;border-right:1px solid var(--tf-border); }
        .tf-trust-cell:last-child { border-right:0; }
        .tf-trust-cell b { display:block;color:var(--tf-gold);font-size:22px;letter-spacing:-.04em; }
        .tf-trust-cell b span { color:var(--tf-muted);font-size:21px; }
        .tf-trust-cell p { margin:7px 0 0;color:var(--tf-muted);font-size:18px; }

        /* INTRO */
        .tf-intro { display:grid;grid-template-columns:1.15fr .85fr;gap:120px;padding-top:160px;padding-bottom:50px; }

        /* PILLARS */
        .tf-pillars { display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding-bottom:160px; }
        .tf-pillar { position:relative;min-height:270px;padding:30px;border:1px solid var(--tf-border);border-radius:5px;background:var(--tf-raised);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-pillar-num { position:absolute;top:20px;right:20px;color:var(--tf-muted);font-size:18px; }
        .tf-pillar-icon { display:grid;width:53px;height:53px;margin-bottom:65px;place-items:center;border-radius:50%;color:var(--tf-inverse);font-size:25px; }
        .tf-pillar h3 { font-size:27px;letter-spacing:-.035em;margin:0 0 12px; }
        .tf-pillar p { margin:0;color:var(--tf-muted);line-height:1.55;font-size:21px; }

        /* JOURNEY */
        .tf-journey { display:grid;grid-template-columns:1fr 1fr;gap:clamp(35px,9vw,120px);align-items:center;padding-top:160px;padding-bottom:160px; }
        .tf-journey-visual { position:relative;min-height:500px;overflow:hidden;background:var(--tf-pink);border-radius:5px; }
        .tf-journey-visual > p { position:relative;z-index:2;margin:30px;color:#fff;font-size:clamp(48px,5vw,70px);font-weight:800;letter-spacing:-.08em;line-height:.84; }
        .tf-journey-visual::after { position:absolute;right:-14%;bottom:-21%;width:390px;height:390px;border:42px solid var(--tf-gold);border-radius:50%;content:""; }
        .tf-journey-orbit { position:absolute;right:-7%;bottom:11%;z-index:2;width:260px;height:260px;padding-top:109px;border-radius:50%;background:var(--tf-surface);color:var(--tf-gold);font-size:26px;font-weight:800;letter-spacing:.08em;line-height:1.5;text-align:center;transform:rotate(-20deg); }
        .tf-journey-orbit span { color:var(--tf-pink-s); }
        .tf-journey-copy ol { padding:0;margin:30px 0 0;list-style:none; }
        .tf-journey-copy li { display:grid;grid-template-columns:42px 1fr;gap:15px;padding:20px 0;border-top:1px solid var(--tf-border); }
        .tf-journey-copy li > span { color:var(--tf-gold);font-size:18px;font-weight:800; }
        .tf-journey-copy li h3 { font-size:24px;margin:0 0 7px; }
        .tf-journey-copy li p { margin:0;color:var(--tf-muted);line-height:1.5;font-size:21px; }

        /* STORY GRID */
        .tf-story-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px; }
        .tf-story-card { position:relative;padding:32px;border:1px solid var(--tf-border);border-radius:8px;background:linear-gradient(135deg,rgba(26,15,13,0.6),rgba(17,13,12,0.6));display:flex;flex-direction:column;gap:20px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-story-card:hover { border-color:rgba(220,24,84,0.35);box-shadow:0 0 40px rgba(220,24,84,0.07); transition:border-color 300ms,box-shadow 300ms; }
        .tf-story-quote-mark { color:var(--tf-pink-s);font-family:var(--tf-accent);font-size:52px;line-height:1;margin-bottom:-10px;opacity:.7; }
        .tf-story-card blockquote { margin:0;font-size:23px;line-height:1.65;color:#e8e0d8;font-style:italic; }
        .tf-story-footer { display:flex;align-items:center;justify-content:space-between;gap:16px;border-top:1px solid var(--tf-border);padding-top:18px;margin-top:auto; }
        .tf-story-member { display:flex;align-items:center;gap:12px; }
        .tf-story-avatar { display:grid;width:38px;height:38px;place-items:center;border-radius:50%;background:#7e4b35;font-size:17px;font-weight:800;flex-shrink:0; }
        .tf-story-member p { margin:0; }
        .tf-story-member strong,.tf-story-member small { display:block; }
        .tf-story-member small { color:var(--tf-muted);font-size:17px; }
        .tf-story-stat { text-align:right;flex-shrink:0; }
        .tf-story-stat strong { display:block;color:var(--tf-gold);font-size:22px;letter-spacing:-.04em;line-height:1; }
        .tf-story-stat small { color:var(--tf-muted);font-size:17px; }
        .tf-results { padding-top:120px;padding-bottom:120px; }
        .tf-quote-card { position:relative;display:grid;grid-template-columns:1fr auto;gap:30px;max-width:1060px;padding:75px 35px 35px;border:1px solid var(--tf-border);border-radius:5px;background:linear-gradient(125deg,rgba(38,21,16,0.6),rgba(18,14,13,0.6));backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-quote-mark { position:absolute;top:20px;left:30px;color:var(--tf-pink-s);font-family:var(--tf-accent);font-size:80px;line-height:1; }
        .tf-quote-card blockquote { grid-column:1/-1;max-width:900px;margin:0;font-size:clamp(27px,3.6vw,48px);font-weight:500;letter-spacing:-.06em;line-height:1.1; }
        .tf-member { display:flex;align-items:center;gap:15px; }
        .tf-member > span { display:grid;width:42px;height:42px;place-items:center;border-radius:50%;background:#7e4b35;font-size:18px;font-weight:800; }
        .tf-member p { margin:0; }
        .tf-member strong,.tf-member small { display:block; }
        .tf-member small { color:var(--tf-muted);font-size:18px; }
        .tf-result-stat { display:flex;align-items:center;gap:12px;padding-left:30px;border-left:1px solid var(--tf-border); }
        .tf-result-stat strong { color:var(--tf-gold);font-size:34px;letter-spacing:-.06em; }
        .tf-result-stat span { color:var(--tf-muted);font-size:18px;line-height:1.3; }

        /* ASSESSMENT */
        .tf-assess { display:grid;grid-template-columns:.86fr 1.14fr;gap:clamp(35px,9vw,120px);padding-top:120px;padding-bottom:120px;border-top:1px solid var(--tf-border); }
        .tf-field { margin:0 0 20px;padding:0;border:0; }
        .tf-field label,.tf-field legend { display:block;margin-bottom:11px;font-weight:700;font-size:21px; }
        .tf-field input { width:100%;min-height:48px;padding:11px 15px;border:1px solid var(--tf-border);border-radius:5px;background:var(--tf-raised);color:var(--tf-text);font-size:21px;font-family:var(--tf-font);outline:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-field input:focus { border-color:var(--tf-muted); }
        .tf-choice-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:11px; }
        .tf-choice-grid label { position:relative;cursor:pointer; }
        .tf-choice-grid input { position:absolute;width:1px;height:1px;opacity:0; }
        .tf-choice-span { display:flex;align-items:center;min-height:48px;padding:11px 15px;border:1px solid var(--tf-border);border-radius:5px;background:var(--tf-raised);font-size:20px;transition:border-color 200ms;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px); }
        .tf-choice-grid label:hover .tf-choice-span { border-color:var(--tf-muted); }
        .tf-choice-sel { border-color:var(--tf-gold)!important;background:rgba(212,181,120,.09)!important; }

        /* FAQ */
        .tf-faq { display:grid;grid-template-columns:.8fr 1.2fr;gap:35px;padding-top:120px;padding-bottom:120px;border-top:1px solid var(--tf-border); }
        .tf-faq-acc article:last-child { border-bottom:1px solid var(--tf-border); }

        /* COACHES & PRICING */
        .tf-coach-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:30px;max-width:900px;margin:0 auto; }
        .tf-price-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:30px;max-width:1100px;margin:0 auto; }

        /* RESPONSIVE */
        @media(max-width:900px){
          .tf-hero{grid-template-columns:1fr;gap:35px;min-height:auto;padding-bottom:60px}
          .tf-visual{min-height:420px}
          .tf-portrait{inset:40px 7% 0 3%}
          .tf-glow{top:0;right:3%;width:330px;height:330px}
          .tf-trust{grid-template-columns:repeat(2,1fr)}
          .tf-trust-cell:nth-child(2){border-right:0}
          .tf-trust-cell:nth-child(-n+2){border-bottom:1px solid var(--tf-border)}
          .tf-intro{grid-template-columns:1fr;gap:30px;padding-top:60px}
          .tf-pillars{grid-template-columns:1fr;gap:15px}
          .tf-journey{grid-template-columns:1fr;gap:30px;padding-top:60px}
          .tf-journey-visual{min-height:380px}
          .tf-assess{grid-template-columns:1fr;gap:35px;padding-top:60px}
          .tf-coach-grid,.tf-price-grid{grid-template-columns:1fr}
          .tf-faq{grid-template-columns:1fr;gap:20px}
          .tf-quote-card{display:block;padding:67px 20px 20px}
          .tf-member{margin-top:30px}
          .tf-result-stat{margin-top:20px;padding-top:20px;padding-left:0;border-top:1px solid var(--tf-border);border-left:0}
          .tf-story-grid{grid-template-columns:repeat(2,1fr)}
        }
        @media(max-width:540px){
          .tf-sec{padding:0 20px}
          .tf-hero-actions{flex-direction:column;align-items:flex-start;gap:20px}
          .tf-visual{min-height:350px}
          .tf-portrait{inset:30px 0 0}
          .tf-live-card{width:193px;padding:15px}
          .tf-choice-grid{grid-template-columns:1fr}
          .tf-pillar{min-height:225px}
          .tf-pillar-icon{margin-bottom:30px}
          .tf-story-grid{grid-template-columns:1fr;gap:16px}
          .tf-story-footer{flex-direction:column;align-items:flex-start;gap:12px}
          .tf-story-stat{text-align:left;border-top:1px solid var(--tf-border);padding-top:12px;width:100%}
        }
      `}</style>

      <SEO
        title="90 Day Weight Loss & Transformation Program | Studio FIT India"
        description="Transform your body in 90 Days with Studio FIT India's expert-led program. Customised diet, unlimited live classes, and 1-on-1 coaching by certified trainers."
        keywords={["90 day transformation program India", "weight loss transformation India", "online transformation fitness plans", "customized diet and workout plan", "fat loss programs online India", "Studio FIT India transformation"]}
      />

      {/* ── HERO ── */}
      <motion.section
        className="tf-sec tf-hero"
        id="top"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Copy — staggered mount */}
        <div>
          <MountIn delay={0.1}>
            <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />STUDIO FIT TRANSFORMATION</p>
          </MountIn>
          <MountIn delay={0.22} y={40}>
            <h1 className="tf-h1">Become your<br /><span className="tf-em">strongest self.</span></h1>
          </MountIn>
          <MountIn delay={0.38}>
            <p className="tf-hero-lead">A 90-day, coach-led transformation designed around your body, your goals, and the life you actually live.</p>
          </MountIn>
          <MountIn delay={0.52}>
            <div className="tf-hero-actions">
              <a className="tf-btn" href="#assessment">Start your transformation <span aria-hidden="true">↗</span></a>
              <a className="tf-text-link" href="#program">Explore the program <span aria-hidden="true">↓</span></a>
            </div>
          </MountIn>
          <MountIn delay={0.64}>
            <div className="tf-proof-row">
              <div className="tf-avatars" aria-hidden="true"><b>R</b><b>S</b><b>A</b></div>
              <p><strong>25,000+</strong> members trained live with Studio FIT</p>
            </div>
          </MountIn>
        </div>

        {/* Visual — CSS illustration */}
        <MountIn delay={0.3} x={60} y={0} style={{ position: "relative" }} className="tf-visual">
          {/* Premium circular backdrop */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "75%",
            paddingBottom: "75%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 40%, rgba(220,24,84,0.18) 0%, rgba(255,179,0,0.08) 50%, transparent 75%)",
            border: "1px solid rgba(220,24,84,0.12)",
            boxShadow: "0 0 80px 20px rgba(220,24,84,0.10), 0 0 200px 60px rgba(255,179,0,0.05)",
            zIndex: 0,
          }} />
          <img
            src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1788111789/pankaj-kavle-BosnnIQ-_w1sh6w.webp"
            alt="Live with your coach"
            onClick={() => document.getElementById('plans-section')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ width: "80%", height: "auto", display: "block", position: "relative", zIndex: 1, cursor: "pointer", margin: "0 auto", filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.5)) drop-shadow(0 4px 24px rgba(220,24,84,0.18))" }}
          />
        </MountIn>
      </motion.section>




      {/* ── HOW IT WORKS ── */}
      <section style={{ borderTop: "1px solid var(--tf-border)", borderBottom: "1px solid var(--tf-border)", padding: "100px 0" }}>
        <div className="tf-sec">
          <FadeUp style={{ textAlign: "center", marginBottom: 70 }}>
            <h2 className="tf-h2" style={{ maxWidth: 700, margin: "0 auto 20px" }}>How it <span className="tf-em">Works</span></h2>
            <p style={{ color: "var(--tf-muted)", fontSize: 21, maxWidth: 520, margin: "0 auto" }}>No shortcuts. No crash diets. Just a real plan designed around your body, your goals, and your life.</p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { num: "01", title: "Clean & Healthy Eating", desc: "No supplements, no shakes, no crash diets. We build sustainable habits through real, wholesome food that fuels your body properly." },
              { num: "02", title: "All Live Classes Included", desc: "Unlimited access to Zumba, Bolly Bhangra Fit, Yoga, Aerobics, Pilates, and HIIT — live with your coaches every single day." },
              { num: "03", title: "Personal Dietician", desc: "Your own dietician creates a personalised Fat Loss Diet Plan matched to your goals, lifestyle, and body — for faster, lasting results." },
              { num: "04", title: "Expert Class Guidance", desc: "Our coaches guide you on exactly which classes to attend based on your goals, so every session moves you closer to your transformation." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div style={{
                  position: "relative", padding: "40px 32px", border: "1px solid var(--tf-border)",
                  borderRadius: 8, background: "var(--tf-raised)", height: "100%", boxSizing: "border-box",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)"
                }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", border: "2px solid var(--tf-gold)", color: "var(--tf-gold)", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 20, marginBottom: 24 }}>{item.num}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 800, textTransform: "uppercase", letterSpacing: ".02em", margin: "0 0 14px", lineHeight: 1.1 }}>{item.title}</h3>
                  <p style={{ margin: 0, color: "var(--tf-muted)", lineHeight: 1.6, fontSize: 18 }}>{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp style={{ textAlign: "center", marginTop: 60 }}>
            <a href="tel:9310666287" style={{ display: "inline-flex", alignItems: "center", gap: 10, color: "var(--tf-gold)", fontWeight: 700, fontSize: 20, textDecoration: "none", fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: ".05em", textTransform: "uppercase" }}>
              Call Us: 9310666287 &#8599;
            </a>
          </FadeUp>
        </div>
      </section>


      {/* ── PRICING ── */}
      <section id="plans-section" className="tf-sec" style={{ paddingTop: 120, paddingBottom: 120, borderTop: "1px solid var(--tf-border)" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="tf-eyebrow" style={{ justifyContent: "center" }}><span className="tf-eyebrow-dot" />CHOOSE YOUR PLAN</p>
          <h2 className="tf-h2">Start your transformation today</h2>
          <p style={{ color: "var(--tf-muted)", fontSize: 27, maxWidth: 480, margin: "0 auto 30px" }}>Life-changing results. Pick what fits your commitment level.</p>
        </FadeUp>
        <div className="tf-price-grid">
          {plans.map((plan, i) => {
            const isElite = plan.id === 5;
            const dM = (() => {
              const d = plan.duration ?? "";
              const m = d.match(/(\d+)\s*Month/i); const dy = d.match(/(\d+)\s*Day/i);
              if (m) return parseInt(m[1]); if (dy) return Math.round(parseInt(dy[1]) / 30); return null;
            })();
            const perMonth = dM && dM > 1 ? Math.ceil(plan.price / dM) : null;
            return (
              <FadeUp key={plan.id} delay={i * 0.15}>
                <div style={{ border: `1px solid ${isElite ? "var(--tf-pink)" : "var(--tf-border)"}`, borderRadius: 5, background: "var(--tf-raised)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", overflow: "hidden", boxShadow: isElite ? "0 0 60px rgba(220,24,84,0.12)" : undefined }}>
                  {isElite && plan.badge && (
                    <div style={{ background: "var(--tf-pink)", color: "#fff", textAlign: "center", padding: "11px 20px", fontSize: 18, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
                      ⭐ {plan.badge} — Most Results
                    </div>
                  )}
                  <div style={{ padding: 35, display: "flex", flexDirection: "column" }}>
                    <div style={{ marginBottom: 24 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 6px" }}>{plan.name}</h3>
                      <p style={{ fontSize: 18, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--tf-muted)", margin: 0 }}>{plan.duration}</p>
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <span style={{ fontSize: isElite ? 52 : 44, fontWeight: 900, letterSpacing: "-.04em", color: "#fff" }}>₹{plan.price.toLocaleString()}</span>
                      {plan.originalPrice && <p style={{ fontSize: 20, color: "var(--tf-muted)", textDecoration: "line-through", margin: "4px 0 0" }}>₹{plan.originalPrice.toLocaleString()}</p>}
                      {perMonth && <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", background: "rgba(255,179,0,.1)", border: "1px solid rgba(255,179,0,.25)", borderRadius: 999, padding: "4px 12px" }}><span style={{ fontSize: 18, fontWeight: 700, color: "var(--tf-gold)" }}>Only ₹{perMonth.toLocaleString()}/month</span></div>}
                      <div style={{ marginTop: 8 }}><span style={{ fontSize: 15, color: "#f97316", fontWeight: 600, background: "rgba(249,115,22,.1)", border: "1px solid rgba(249,115,22,.2)", borderRadius: 3, padding: "2px 6px" }}>5% GST Excluded</span></div>
                    </div>
                    <ul style={{ padding: 0, margin: "0 0 28px", listStyle: "none", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                      {plan.features.map((f, fi) => (
                        <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{ flexShrink: 0, width: 18, height: 18, borderRadius: "50%", background: "rgba(220,24,84,.15)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                            <Check size={11} color="#dc1854" strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: 20, fontWeight: 600, color: "var(--tf-muted)", lineHeight: 1.4 }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedPlan(plan)}
                      className={`tf-btn tf-btn--full ${isElite ? "tf-btn--pink" : "tf-btn--outline"}`}
                    >
                      Start My Transformation →
                    </button>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="tf-sec tf-intro" id="program">
        <div>
          <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />A DIFFERENT WAY TO CHANGE</p>
          <h2 className="tf-h2">It's not a crash plan.<br />It's your <span className="tf-em">new rhythm.</span></h2>
        </div>
        <p style={{ alignSelf: "end", maxWidth: 410, color: "var(--tf-muted)", fontSize: 27, lineHeight: 1.58, margin: 0 }}>
          The Studio FIT Transformation is a high-touch coaching experience that brings training, nutrition, and accountability into one clear, sustainable plan.
        </p>
      </section>

      {/* ── PILLARS ── */}
      <section className="tf-sec tf-pillars">
        {pillars.map((p, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <article className="tf-pillar">
              <span className="tf-pillar-num">{p.num}</span>
              <div className="tf-pillar-icon" style={{ background: p.color }} aria-hidden="true">{p.symbol}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          </FadeUp>
        ))}
      </section>

      {/* ── JOURNEY ── */}
      <section className="tf-sec tf-journey" id="journey">
        <div style={{ position: "relative" }}>
          <img
            src="https://res.cloudinary.com/dvrwadsfh/image/upload/v1788111789/puja-vaish-CKE9CWnj_m5sznh.webp"
            alt="One day at a time - Studio Fit"
            style={{ width: "100%", height: "auto", borderRadius: "5px", display: "block" }}
          />
        </div>
        <div className="tf-journey-copy">
          <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />YOUR 90-DAY JOURNEY</p>
          <h2 className="tf-h2">Clear steps.<br /><span className="tf-em">Meaningful change.</span></h2>
          <ol>
            {journey.map((s, i) => (
              <li key={i}>
                <span>{s.num}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── MEMBER STORIES ── */}
      <section className="tf-sec tf-results" id="results">
        <FadeUp>
          <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />MEMBER STORIES</p>
          <h2 className="tf-h2">What our members <span className="tf-em">say.</span></h2>
        </FadeUp>
        <div className="tf-story-grid">
          {memberStories.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="tf-story-card">
                <div className="tf-story-quote-mark">"</div>
                <blockquote>{s.quote}</blockquote>
                <div className="tf-story-footer">
                  <div className="tf-story-member">
                    <span className="tf-story-avatar">{s.initials}</span>
                    <p>
                      <strong>{s.name}</strong>
                      <small>{s.label}</small>
                    </p>
                  </div>
                  <div className="tf-story-stat">
                    <strong>{s.stat}<small style={{ fontSize: 20, marginLeft: 2 }}>{s.statUnit}</small></strong>
                    <small>{s.statLabel}</small>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <p style={{ margin: "20px 0 0", color: "var(--tf-muted)", fontSize: 18 }}>*Individual results vary. Our coaches focus on sustainable, health-led progress.</p>
      </section>

      {/* ── INFINITE SLIDER ── */}
      {/* ── RESULTS GRID ── */}
      <section style={{ background: "#0a0a0a", padding: "80px 0" }}>
        <div className="tf-sec">
          <FadeUp style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="tf-eyebrow" style={{ justifyContent: "center" }}><span className="tf-eyebrow-dot" />TRANSFORMATIONS</p>
            <h2 className="tf-h2">Real Members. <span className="tf-em">Real Results.</span></h2>
            <p style={{ color: "var(--tf-muted)", fontSize: 27, maxWidth: 480, margin: "0 auto" }}>Stories from members who committed to the 90-day program and changed their lives.</p>
          </FadeUp>
          {/* ↓↓ GRID SIZE: change maxWidth below to make grid wider/narrower (currently 860px) */}
          {/* ↓↓ CARD SIZE: change aspectRatio on each card div (currently "4/5") */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, maxWidth: 1200, margin: "0 auto" }}>
            {[
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1784811005/5be07b3c-1dd5-4b6e-bab3-40e10647a65b.png", name: "Neha T." },
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_igdral.jpg", name: "Riya K." },
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.33_PM_2_lxdqdo.jpg", name: "Simran S." },
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446568/WhatsApp_Image_2026-04-29_at_12.34.32_PM_qsnh4s.jpg", name: "Pooja M." },
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.33_PM_1_umnvjz.jpg", name: "Anjali D." },
              { src: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777446567/WhatsApp_Image_2026-04-29_at_12.34.32_PM_1_rltu0l.jpg", name: "Kirti V." },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/5", background: "#111", border: "1px solid var(--tf-border)" }}>
                  <img
                    src={card.src}
                    alt={card.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", transition: "transform 500ms" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── COACHES ── */}
      <section id="coaches-section" className="tf-sec" style={{ paddingTop: 120, paddingBottom: 120, borderTop: "1px solid var(--tf-border)" }}>
        <FadeUp style={{ textAlign: "center", marginBottom: 40 }}>
          <p className="tf-eyebrow" style={{ justifyContent: "center" }}><span className="tf-eyebrow-dot" />YOUR GUIDES</p>
          <h2 className="tf-h2">Meet your coaches</h2>
          <p style={{ color: "var(--tf-muted)", fontSize: 27, maxWidth: 500, margin: "0 auto" }}>World-class certified trainers who've transformed hundreds of lives — and are ready to transform yours.</p>
        </FadeUp>
        <div className="tf-coach-grid">
          {transformCoaches.map((coach, i) => (
            <FadeUp key={coach.id} delay={i * 0.15}>
              <div style={{ border: "1px solid var(--tf-border)", borderRadius: 5, overflow: "hidden", background: "var(--tf-raised)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
                  <img src={coach.image} alt={coach.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "grayscale(30%)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.1) 60%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 24 }}>
                    <h3 style={{ color: "#fff", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{coach.name}</h3>
                    <p style={{ color: "var(--tf-gold)", fontSize: 20, fontWeight: 600, margin: 0 }}>{coach.role}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── COMPARISON ── */}
      {/* ── COMPARISON ── */}
      <section style={{ background: "var(--tf-surface)", padding: "80px 0", borderTop: "1px solid var(--tf-border)" }}>
        <div className="tf-sec">
          <FadeUp style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 className="tf-h2" style={{ maxWidth: 900, margin: "0 auto 20px" }}>
              Studio FIT India Transformation <span className="tf-em">vs</span> Other Weight Loss Programs
            </h2>
          </FadeUp>

          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            {/* Headers */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", padding: "0 20px 30px" }}>
              <div />
              <div style={{ textAlign: "center", color: "var(--tf-gold)", fontWeight: 800, fontSize: 27 }}>STUDIO FIT INDIA</div>
              <div style={{ textAlign: "center", color: "var(--tf-text)", fontWeight: 700, fontSize: 27 }}>OTHER PROGRAMS</div>
            </div>

            {/* Rows */}
            {[
              { label: "Lasting weight loss", elite: true, std: false },
              { label: "Unlimited whatsapp chat & calls", elite: true, std: true },
              { label: "Scheduled video counselling", elite: true, std: false },
              { label: "Tailored meal plans", elite: true, std: true },
              { label: "Progressive workout plans", elite: true, std: false },
              { label: "Calorie counting", elite: true, std: false },
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  padding: "24px 20px",
                  alignItems: "center",
                  borderBottom: "1px solid var(--tf-border)"
                }}>
                  <div style={{ color: "var(--tf-text)", fontSize: 30, fontWeight: 700 }}>{row.label}</div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.elite ? (
                      <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid var(--tf-gold)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,179,0,0.08)" }}>
                        <Check size={24} color="var(--tf-gold)" strokeWidth={3} />
                      </div>
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid var(--tf-gold)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={24} color="var(--tf-gold)" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {row.std ? (
                      <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid var(--tf-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Check size={24} color="var(--tf-text)" strokeWidth={3} />
                      </div>
                    ) : (
                      <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid var(--tf-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <X size={24} color="var(--tf-border)" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASSESSMENT FORM ── */}
      <section className="tf-sec tf-assess" id="assessment">
        <div>
          <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />TAKE THE FIRST STEP</p>
          <h2 className="tf-h2">Your next chapter starts with one <span className="tf-em">small yes.</span></h2>
          <p style={{ color: "var(--tf-muted)", fontSize: 27, lineHeight: 1.55, maxWidth: 410 }}>Tell us what you're working toward. A Studio FIT coach will help you find the right starting point.</p>
          <a href="https://wa.me/918796442732" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 15, color: "var(--tf-gold)", fontWeight: 700, textDecoration: "none", fontSize: 21 }}>
            Prefer WhatsApp? Chat with us <span>↗</span>
          </a>
        </div>
        <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 550 }}>
          {formStatus && <div style={{ minHeight: 33, padding: "8px 0", color: "var(--tf-gold)", fontSize: 21, marginBottom: 12 }}>{formStatus}</div>}
          <div className="tf-field">
            <label htmlFor="tf-name">Your name</label>
            <input id="tf-name" name="name" autoComplete="name" required value={form.name} onChange={e => setForm(s => ({ ...s, name: e.target.value }))} />
          </div>
          <div className="tf-field">
            <label htmlFor="tf-phone">Phone number</label>
            <input id="tf-phone" name="phone" inputMode="tel" autoComplete="tel" required value={form.phone} onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} />
          </div>
          <fieldset className="tf-field">
            <legend>What would you like to work on?</legend>
            <div className="tf-choice-grid">
              {["Weight management", "Strength & fitness", "Better daily habits", "Stress & energy"].map(g => (
                <label key={g}>
                  <input type="radio" name="goal" value={g} required checked={form.goal === g} onChange={() => setForm(s => ({ ...s, goal: g }))} />
                  <span className={`tf-choice-span${form.goal === g ? " tf-choice-sel" : ""}`}>{g}</span>
                </label>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <label style={{ display: "block", marginBottom: 11, fontWeight: 700, fontSize: 21 }}>Describe your problem in your own words (optional)</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={e => setForm(s => ({ ...s, description: e.target.value }))}
                style={{
                  width: "100%", padding: "11px 15px", border: "1px solid var(--tf-border)",
                  borderRadius: 5, background: "var(--tf-raised)", color: "var(--tf-text)",
                  fontSize: 21, fontFamily: "var(--tf-font)", outline: "none", resize: "vertical"
                }}
              />
            </div>
          </fieldset>
          <button className="tf-btn tf-btn--full" type="submit" disabled={submitting}>
            {submitting ? "Preparing your next step…" : "Request a callback ↗"}
          </button>
          <p style={{ margin: "15px 0 0", color: "var(--tf-muted)", fontSize: 18, lineHeight: 1.45 }}>By continuing, you agree to be contacted by Studio FIT India about its Transformation program.</p>
        </form>
      </section>

      {/* ── FAQ ── */}
      <section className="tf-sec tf-faq" id="faq">
        <div>
          <p className="tf-eyebrow"><span className="tf-eyebrow-dot" />GOOD TO KNOW</p>
          <h2 className="tf-h2">Questions,<br /><span className="tf-em">answered.</span></h2>
        </div>
        <div className="tf-faq-acc">
          {faqs.map(item => <AccordionItem key={item.id} {...item} />)}
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <div style={{ padding: "120px 30px", textAlign: "center", borderTop: "1px solid var(--tf-border)" }}>
        <FadeUp>
          <h2 className="tf-h2">Your best body is<br /><span className="tf-em">90 days away.</span></h2>
          <p style={{ color: "var(--tf-muted)", fontSize: 27, maxWidth: 480, margin: "0 auto 40px" }}>Stop planning. Start transforming. Join 2,000+ members who chose to act.</p>
          <a className="tf-btn" href="#assessment" onClick={e => { e.preventDefault(); document.getElementById("assessment")?.scrollIntoView({ behavior: "smooth" }); }}>
            Start my transformation ↗
          </a>
        </FadeUp>
      </div>

      {selectedPlan && <PaymentModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </motion.div>
  );
};

export default Transformations;
