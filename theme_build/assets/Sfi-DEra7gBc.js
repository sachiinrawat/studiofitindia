import{j as e}from"./vendor-motion-k8TKhLw-.js";import{r as m}from"./vendor-router-CxHm7wiy.js";import{S as y}from"./index-Df_yFi1q.js";import"./vendor-icons-DGOq3L4j.js";const f="https://script.google.com/macros/s/AKfycbzWpvkXvPB2eFzYiFyYZCTeL8gp5xhoq-yO7uq6tSaEHujrT-Bbw2BXy9vN8sDIic16KA/exec",v=()=>{if(typeof window>"u")return{};const i=new URLSearchParams(window.location.search);return{utm_source:i.get("utm_source")||"",utm_medium:i.get("utm_medium")||"",utm_campaign:i.get("utm_campaign")||"",utm_content:i.get("utm_content")||"",utm_term:i.get("utm_term")||""}},b=()=>{if(typeof window<"u"&&window.fbq)try{window.fbq("track","Lead",{content_name:"Fitness Program Enquiry",status:"submitted"})}catch(i){console.warn("Meta Pixel track error:",i)}},w=()=>{if(typeof window<"u"&&window.gtag)try{window.gtag("event","conversion",{send_to:"AW-17925563887/NUd8CJnlipEcEO_LyeNC"})}catch(i){console.warn("Gtag conversion error:",i)}},I=()=>{const[i,c]=m.useState({fullName:"",phone:"",whatsapp:"",fitnessGoal:"",timing:"",startTimeline:"",contactMethod:"",consent:!1}),[p,t]=m.useState({type:"",message:""}),[g,u]=m.useState(!1),s=r=>{const{name:n,value:l,type:h,checked:x}=r.target;c(o=>({...o,[n]:h==="checkbox"?x:l}))},a=r=>{r&&c(l=>({...l,fitnessGoal:r}));const n=document.getElementById("enquiry");n&&n.scrollIntoView({behavior:"smooth"})},j=async r=>{r.preventDefault(),t({type:"",message:""});const n=i.phone.trim(),l=i.whatsapp.trim();if(!/^[6-9]\d{9}$/.test(n)){t({type:"err",message:"Please enter a valid 10-digit Indian mobile number."});return}if(l&&!/^[6-9]\d{9}$/.test(l)){t({type:"err",message:"Please enter a valid WhatsApp number or leave it blank."});return}if(!i.fitnessGoal){t({type:"err",message:"Please select which program you are interested in."});return}if(!i.consent){t({type:"err",message:"Please agree to the contact consent to proceed."});return}u(!0);const h=v(),o={leadId:"SFI-"+Date.now().toString(36).toUpperCase(),timestamp:new Date().toISOString(),submittedAt:new Date().toISOString(),fullName:i.fullName.trim(),phone:n,mobile:n,whatsapp:l||n,fitnessGoal:i.fitnessGoal,program:i.fitnessGoal,timing:i.timing,preferredTiming:i.timing,startTimeline:i.startTimeline,contactMethod:i.contactMethod,consent:i.consent?"Yes":"No",pageUrl:typeof window<"u"?window.location.href:"",leadSource:"Website / SFI Landing Page",...h};try{const d=JSON.parse(localStorage.getItem("sfi_meta_leads")||"[]");d.unshift(o),localStorage.setItem("sfi_meta_leads",JSON.stringify(d.slice(0,100)))}catch{}try{f&&!f.includes("YOUR_SCRIPT_ID_HERE")?await fetch(f,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:new URLSearchParams(o).toString()}):console.info("Lead captured locally (GSheet endpoint pending):",o),b(),w(),t({type:"ok",message:"Thank you! Your enquiry has been sent. Our team will contact you soon."}),c({fullName:"",phone:"",whatsapp:"",fitnessGoal:"",timing:"",startTimeline:"",contactMethod:"",consent:!1})}catch{b(),w(),t({type:"ok",message:"Thank you! Your enquiry has been sent. Our team will contact you soon."})}finally{u(!1)}};return e.jsxs("div",{className:"sfi-landing-wrapper",children:[e.jsx(y,{title:"Online Fitness Classes & Membership Offers | Studio FIT India",description:"Explore Studio FIT India online fitness classes with flexible timings, live interactive sessions, certified trainers, customised workout and diet plan options, and programs for weight gain, weight loss and strength training. Enquire today.",keywords:["online fitness classes India","weight loss online","strength training India","Studio FIT India","fitness membership offers"],canonicalUrl:"https://studiofitindia.com/sfi"}),e.jsx("style",{children:`
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
      `}),e.jsx("div",{className:"topbar",children:"LIVE ONLINE FITNESS · FIND A PROGRAM THAT FITS YOUR GOALS"}),e.jsx("header",{children:e.jsx("div",{className:"wrap",children:e.jsx("a",{className:"brand",href:"/","aria-label":"Studio FIT India home",children:e.jsx("img",{src:"https://res.cloudinary.com/dvrwadsfh/image/upload/v1787160047/sfi_pdk6so.png",alt:"Studio FIT India",className:"brand-logo"})})})}),e.jsxs("main",{children:[e.jsx("section",{className:"hero",children:e.jsxs("div",{className:"wrap hero-grid",children:[e.jsxs("div",{children:[e.jsx("span",{className:"eyebrow",children:"Your fitness journey starts here"}),e.jsxs("h1",{children:["Fitness that fits ",e.jsx("em",{children:"your goals."})]}),e.jsx("p",{children:"Explore live online fitness classes with Studio FIT India. Whether you want to work toward weight gain, weight loss, strength training, or regular fitness, take the next step from the comfort of home."}),e.jsxs("ul",{className:"ticks",children:[e.jsx("li",{children:"Live online fitness classes"}),e.jsx("li",{children:"Programs for different fitness goals"}),e.jsx("li",{children:"Guidance from fitness trainers"})]}),e.jsxs("a",{className:"btn",href:"#enquiry",children:["GET MY FITNESS PLAN ",e.jsx("span",{"aria-hidden":"true",children:"→"})]}),e.jsx("p",{style:{marginTop:"13px"},children:e.jsx("a",{href:"#membership-offers",style:{color:"var(--yellow)",fontWeight:800},children:"View festive membership offers ↓"})}),e.jsx("p",{className:"subnote",children:"Share your details and our team can help you explore available programs and membership options."})]}),e.jsxs("aside",{className:"hero-card","aria-label":"Choose your fitness goal",children:[e.jsx("span",{className:"mini-label",children:"Start with your goal"}),e.jsx("h2",{children:"What would you like to work on?"}),e.jsx("p",{style:{color:"#d2d2d2",margin:0},children:"Choose a direction. We'll help you explore the available options."}),e.jsx("div",{className:"goal-pills",children:[{goal:"Weight Gain",hint:"Build healthy routines"},{goal:"Weight Loss",hint:"Work toward your goal"},{goal:"Strength Training",hint:"Build strength"},{goal:"Regular Fitness",hint:"Stay active consistently"}].map(({goal:r,hint:n})=>e.jsxs("button",{type:"button",onClick:()=>a(r),className:`goal-pill ${i.fitnessGoal===r?"selected":""}`,children:[r,e.jsx("span",{children:n})]},r))})]})]})}),e.jsx("section",{id:"programs",children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h2",{children:"Choose an online fitness program that fits your goal"}),e.jsx("p",{children:"Explore guided workout options for building strength, improving fitness consistency, or working toward a personal weight goal. Our team can help you understand available classes and membership options."})]}),e.jsxs("div",{className:"content-grid",children:[e.jsxs("article",{className:"content-card",children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h3",{children:"Weight Gain & Strength-Building Support"}),e.jsx("p",{children:"For people who want to work toward a stronger body and build a more consistent exercise routine."}),e.jsxs("ul",{className:"detail-list",children:[e.jsx("li",{children:"Explore strength-focused workout options suitable for your experience level."}),e.jsx("li",{children:"Build consistency through scheduled live online sessions."}),e.jsx("li",{children:"Learn exercise technique and progression with trainer guidance."}),e.jsx("li",{children:"Ask about nutrition support options if available for your goals."})]}),e.jsxs("div",{className:"tag-row",children:[e.jsx("span",{className:"tag",children:"Strength-focused"}),e.jsx("span",{className:"tag",children:"Live online sessions"}),e.jsx("span",{className:"tag",children:"Goal-oriented routine"})]}),e.jsx("p",{style:{margin:0},children:e.jsx("button",{type:"button",onClick:()=>a("Weight Gain"),className:"btn",style:{width:"100%"},children:"ENQUIRE ABOUT WEIGHT GAIN →"})})]}),e.jsxs("article",{className:"content-card",children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h3",{children:"Weight Loss & Transformation"}),e.jsx("p",{children:"For people who want to create a consistent movement routine and work toward sustainable fitness habits."}),e.jsxs("ul",{className:"detail-list",children:[e.jsx("li",{children:"Explore cardio, strength and other workout formats in the available schedule."}),e.jsx("li",{children:"Build an exercise routine around your preferred class timings."}),e.jsx("li",{children:"Ask about transformation options that may combine workouts, diet guidance and counselling."}),e.jsx("li",{children:"Focus on progress and healthy habits rather than unrealistic promises."})]}),e.jsxs("div",{className:"tag-row",children:[e.jsx("span",{className:"tag",children:"Fitness routine"}),e.jsx("span",{className:"tag",children:"Cardio + strength"}),e.jsx("span",{className:"tag",children:"Transformation enquiry"})]}),e.jsx("p",{style:{margin:0},children:e.jsx("button",{type:"button",onClick:()=>a("Weight Loss"),className:"btn",style:{width:"100%"},children:"ENQUIRE ABOUT WEIGHT LOSS →"})})]}),e.jsxs("article",{className:"content-card",children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h3",{children:"Strength Training"}),e.jsx("p",{children:"For people interested in developing strength, improving movement confidence and creating a structured workout habit."}),e.jsxs("ul",{className:"detail-list",children:[e.jsx("li",{children:"Ask about classes focused on resistance and strength exercises."}),e.jsx("li",{children:"Learn about modifications for different experience levels."}),e.jsx("li",{children:"Use regular sessions to practise technique and maintain consistency."}),e.jsx("li",{children:"Discuss your goals with the team before selecting a plan."})]}),e.jsxs("div",{className:"tag-row",children:[e.jsx("span",{className:"tag",children:"Strength and conditioning"}),e.jsx("span",{className:"tag",children:"Trainer guidance"}),e.jsx("span",{className:"tag",children:"Consistent practice"})]}),e.jsx("p",{style:{margin:0},children:e.jsx("button",{type:"button",onClick:()=>a("Strength Training"),className:"btn",style:{width:"100%"},children:"ENQUIRE ABOUT STRENGTH →"})})]}),e.jsxs("article",{className:"content-card",children:[e.jsx("div",{className:"num",children:"04"}),e.jsx("h3",{children:"Regular Fitness & Active Lifestyle"}),e.jsx("p",{children:"For people who want to stay active, explore different workout styles and make fitness a regular part of the week."}),e.jsxs("ul",{className:"detail-list",children:[e.jsx("li",{children:"Ask about available formats such as yoga, Pilates, Zumba, aerobics, HIIT and functional training."}),e.jsx("li",{children:"Find class timings that work with your daily routine."}),e.jsx("li",{children:"Mix workout styles where your membership and timetable allow."}),e.jsx("li",{children:"Make movement more convenient by joining online from home."})]}),e.jsxs("div",{className:"tag-row",children:[e.jsx("span",{className:"tag",children:"Multiple workout styles"}),e.jsx("span",{className:"tag",children:"Flexible timing options"}),e.jsx("span",{className:"tag",children:"At-home convenience"})]}),e.jsx("p",{style:{margin:0},children:e.jsx("button",{type:"button",onClick:()=>a("Regular Fitness"),className:"btn",style:{width:"100%"},children:"EXPLORE FITNESS CLASSES →"})})]})]}),e.jsxs("div",{className:"notice",children:[e.jsx("strong",{children:"Please note:"})," Results vary by individual. The right exercise plan depends on your current fitness, health, experience and consistency. Ask the Studio FIT India team about current class availability and program suitability."]})]})}),e.jsx("section",{id:"membership-offers",className:"benefits",children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("span",{className:"offer-ribbon",children:"Festive Membership Offers"}),e.jsx("h2",{children:"More time to move. More value for your membership."}),e.jsx("p",{children:"Explore the festive offers shared for Studio FIT India online fitness memberships. Choose a duration that suits your plans and ask our team to confirm the terms before payment."})]}),e.jsxs("div",{className:"offer-grid",children:[e.jsxs("article",{className:"offer-card featured",children:[e.jsx("span",{className:"offer-ribbon",children:"Annual Offer"}),e.jsx("h3",{children:"12 Months + 12 Months Free"}),e.jsx("div",{className:"price",children:"₹6,999"}),e.jsx("div",{className:"price-note",children:"Pay for 1 year and get 1 additional year included, subject to offer terms."}),e.jsxs("ul",{children:[e.jsx("li",{children:"Extended membership period for long-term consistency."}),e.jsx("li",{children:"Access to available live online classes covered by the selected membership."}),e.jsx("li",{children:"Flexible class timing options, subject to the published schedule."}),e.jsx("li",{children:"More time to establish and maintain a regular fitness routine."})]}),e.jsx("button",{type:"button",onClick:()=>a("Regular Fitness"),className:"btn",style:{width:"100%"},children:"ENQUIRE ABOUT ANNUAL OFFER →"})]}),e.jsxs("article",{className:"offer-card",children:[e.jsx("span",{className:"offer-ribbon",children:"Extended Offer"}),e.jsx("h3",{children:"6 Months + 6 Months Free"}),e.jsx("div",{className:"price",children:"₹4,999"}),e.jsx("div",{className:"price-note",children:"Pay for 6 months and get 6 additional months included, subject to offer terms."}),e.jsxs("ul",{children:[e.jsx("li",{children:"A longer period to build consistency without renewing every month."}),e.jsx("li",{children:"Access to available live online classes covered by the selected membership."}),e.jsx("li",{children:"Explore workout formats listed in the current schedule."}),e.jsx("li",{children:"Convenient online workouts from home."})]}),e.jsx("button",{type:"button",onClick:()=>a("Regular Fitness"),className:"btn",style:{width:"100%"},children:"ENQUIRE ABOUT 6-MONTH OFFER →"})]})]}),e.jsxs("div",{className:"section-head",style:{marginTop:"44px",marginBottom:"20px"},children:[e.jsx("h2",{style:{fontSize:"1.7rem"},children:"Membership benefits to explore"}),e.jsx("p",{children:"Confirm the current inclusions for the plan you choose."})]}),e.jsxs("div",{className:"benefit-grid",children:[e.jsxs("article",{className:"benefit",children:[e.jsx("h3",{children:"Live Interactive Classes"}),e.jsx("p",{children:"Participate in scheduled online sessions and follow trainer guidance in real time, according to the class format."})]}),e.jsxs("article",{className:"benefit",children:[e.jsx("h3",{children:"Personalised Guidance"}),e.jsx("p",{children:"Ask whether a customised diet plan, workout plan and counselling session are included in your selected membership."})]}),e.jsxs("article",{className:"benefit",children:[e.jsx("h3",{children:"Progress & Consistency"}),e.jsx("p",{children:"Explore available daily tracking and year-round class options to help you stay engaged with your routine."})]})]}),e.jsx("p",{className:"small-note",style:{textAlign:"center",marginTop:"18px"},children:"Membership benefits and class access depend on the current plan terms and published schedule. Confirm details with the team before purchasing."})]})}),e.jsx("section",{className:"benefits",style:{background:"#fff"},children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h2",{children:"Online fitness designed around your day"}),e.jsx("p",{children:"Explore class options that can help you build a consistent routine from home."})]}),e.jsxs("div",{className:"benefit-grid",children:[e.jsxs("article",{className:"benefit",children:[e.jsx("div",{className:"benefit-icon","aria-hidden":"true",children:"⌂"}),e.jsx("h3",{children:"Convenience of home workouts"}),e.jsx("p",{children:"Join available online classes from home and reduce the need to travel to a physical gym."})]}),e.jsxs("article",{className:"benefit",children:[e.jsx("div",{className:"benefit-icon","aria-hidden":"true",children:"✦"}),e.jsx("h3",{children:"Variety of workout formats"}),e.jsx("p",{children:"Ask about strength training, yoga, Pilates, Zumba, aerobics, HIIT and functional training sessions."})]}),e.jsxs("article",{className:"benefit",children:[e.jsx("div",{className:"benefit-icon","aria-hidden":"true",children:"✓"}),e.jsx("h3",{children:"Support for your goals"}),e.jsx("p",{children:"Tell the team whether you are focused on weight gain, weight loss, strength training or regular fitness."})]})]})]})}),e.jsx("section",{id:"benefits",children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h2",{children:"More than a workout — support for your fitness journey"}),e.jsx("p",{children:"Discover the features designed to help you stay consistent, get guidance and make online fitness part of your lifestyle."})]}),e.jsxs("div",{className:"feature-grid",children:[e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"01"}),e.jsx("h3",{children:"Multiple Classes"}),e.jsx("p",{children:"Explore different workout formats and find classes that suit your goals, interests and experience level."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"02"}),e.jsx("h3",{children:"Flexible Timings"}),e.jsx("p",{children:"Choose from available class timings to help fit workouts around your work, study and daily routine."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"03"}),e.jsx("h3",{children:"365-Day Classes"}),e.jsx("p",{children:"Fitness support throughout the year, subject to the published timetable, holidays and membership terms."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"04"}),e.jsx("h3",{children:"Customised Diet Plan"}),e.jsx("p",{children:"Ask about personalised diet guidance based on your goals and needs, where included in your selected program."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"05"}),e.jsx("h3",{children:"Live Interactive Classes"}),e.jsx("p",{children:"Join live sessions where you can follow the trainer and interact during class, subject to the class format."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"06"}),e.jsx("h3",{children:"Certified Trainers"}),e.jsx("p",{children:"Learn with trainers whose qualifications and experience can be shared with you before joining."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"07"}),e.jsx("h3",{children:"Classes Available Globally"}),e.jsx("p",{children:"Join online from different locations around the world, subject to internet access, time zones and schedule availability."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"08"}),e.jsx("h3",{children:"Daily Tracking"}),e.jsx("p",{children:"Ask how your attendance, routine or progress can be tracked through the program and what tracking is included."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"09"}),e.jsx("h3",{children:"Customised Workout Plan"}),e.jsx("p",{children:"Explore workout recommendations tailored to your fitness goals, experience and available equipment, where included."})]}),e.jsxs("article",{className:"feature-card",children:[e.jsx("div",{className:"feature-icon",children:"10"}),e.jsx("h3",{children:"Personal Counselling Session"}),e.jsx("p",{children:"Discuss your goals, challenges and next steps in a personal session where this service is included in your plan."})]})]}),e.jsxs("div",{className:"notice",children:[e.jsx("strong",{children:"Plan inclusions:"})," Customised diet plans, personalised workout plans, daily tracking and counselling may vary by membership. Confirm which features are included in your selected plan before purchasing."]}),e.jsx("p",{style:{textAlign:"center",marginTop:"24px"},children:e.jsx("button",{type:"button",onClick:()=>a(""),className:"btn",children:"FIND MY FITNESS PLAN →"})})]})}),e.jsx("section",{children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h2",{children:"Getting started is simple"}),e.jsx("p",{children:"Three easy steps to enquire about online fitness classes."})]}),e.jsxs("div",{className:"step-grid",children:[e.jsxs("article",{className:"step",children:[e.jsx("b",{children:"STEP 01"}),e.jsx("h3",{children:"Tell us your goal"}),e.jsx("p",{children:"Complete the short form and choose your fitness goal."})]}),e.jsxs("article",{className:"step",children:[e.jsx("b",{children:"STEP 02"}),e.jsx("h3",{children:"Discuss your options"}),e.jsx("p",{children:"Our team can contact you about available classes, timings, and membership plans."})]}),e.jsxs("article",{className:"step",children:[e.jsx("b",{children:"STEP 03"}),e.jsx("h3",{children:"Choose your plan"}),e.jsx("p",{children:"Review the available options and decide what works for you."})]})]})]})}),e.jsx("section",{className:"form-section",id:"enquiry",children:e.jsxs("div",{className:"wrap form-layout",children:[e.jsxs("div",{className:"form-copy",children:[e.jsx("span",{className:"eyebrow",style:{background:"#fff",borderColor:"#ddd",color:"#222"},children:"Get started"}),e.jsx("h2",{children:"Let's find your fitness plan."}),e.jsx("p",{children:"Share a few details so our team can understand your goal and preferred class timing."}),e.jsxs("ul",{className:"ticks",style:{color:"#222"},children:[e.jsx("li",{children:"Tell us your fitness goal"}),e.jsx("li",{children:"Choose a preferred class time"}),e.jsx("li",{children:"Request information about plans"})]}),e.jsx("p",{style:{fontSize:".88rem"},children:"Submitting this form sends an enquiry only. Membership is not confirmed until you complete the studio's enrolment process."})]}),e.jsxs("div",{className:"form-card",children:[e.jsx("h3",{children:"Get my fitness plan"}),e.jsx("p",{className:"intro",children:"Fill in the form and request a callback from Studio FIT India."}),e.jsxs("form",{id:"leadForm",onSubmit:j,noValidate:!0,children:[e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"fullName",children:"Full name *"}),e.jsx("input",{id:"fullName",name:"fullName",autoComplete:"name",required:!0,maxLength:100,placeholder:"Enter your full name",value:i.fullName,onChange:s})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"phone",children:"Mobile number *"}),e.jsx("input",{id:"phone",name:"phone",type:"tel",inputMode:"numeric",autoComplete:"tel-national",pattern:"[6-9][0-9]{9}",minLength:10,maxLength:10,required:!0,placeholder:"10-digit mobile number","aria-describedby":"phoneHelp",value:i.phone,onChange:s}),e.jsx("small",{id:"phoneHelp",style:{color:"#777",display:"block",marginTop:"4px"},children:"Enter an Indian mobile number starting with 6, 7, 8, or 9."})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"whatsapp",children:"WhatsApp number (optional)"}),e.jsx("input",{id:"whatsapp",name:"whatsapp",type:"tel",inputMode:"numeric",maxLength:10,pattern:"([6-9][0-9]{9})?",placeholder:"If different from mobile",value:i.whatsapp,onChange:s})]}),e.jsxs("fieldset",{className:"field",style:{border:0,padding:0,marginLeft:0,marginRight:0},children:[e.jsx("legend",{className:"field-label",children:"Which program are you interested in? *"}),e.jsx("div",{className:"radio-grid",children:["Weight Gain","Weight Loss","Strength Training","Regular Fitness"].map(r=>e.jsxs("label",{className:"radio-option",children:[e.jsx("input",{type:"radio",name:"fitnessGoal",value:r,checked:i.fitnessGoal===r,onChange:s,required:!0})," ",r]},r))})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"timing",children:"Preferred class timing *"}),e.jsxs("select",{id:"timing",name:"timing",required:!0,value:i.timing,onChange:s,children:[e.jsx("option",{value:"",children:"Select timing"}),e.jsx("option",{value:"Morning",children:"Morning"}),e.jsx("option",{value:"Afternoon",children:"Afternoon"}),e.jsx("option",{value:"Evening",children:"Evening"}),e.jsx("option",{value:"Flexible",children:"Flexible"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"startTimeline",children:"When would you like to start? *"}),e.jsxs("select",{id:"startTimeline",name:"startTimeline",required:!0,value:i.startTimeline,onChange:s,children:[e.jsx("option",{value:"",children:"Select your timeline"}),e.jsx("option",{value:"Immediately",children:"As soon as possible"}),e.jsx("option",{value:"Within 7 days",children:"Within 7 days"}),e.jsx("option",{value:"Within 30 days",children:"Within 30 days"}),e.jsx("option",{value:"Just exploring",children:"Just exploring options"})]})]}),e.jsxs("div",{className:"field",children:[e.jsx("label",{htmlFor:"contactMethod",children:"Preferred contact method *"}),e.jsxs("select",{id:"contactMethod",name:"contactMethod",required:!0,value:i.contactMethod,onChange:s,children:[e.jsx("option",{value:"",children:"Select contact method"}),e.jsx("option",{value:"Phone Call",children:"Phone Call"}),e.jsx("option",{value:"WhatsApp",children:"WhatsApp"})]})]}),e.jsx("div",{className:"field",children:e.jsxs("label",{className:"consent",children:[e.jsx("input",{type:"checkbox",name:"consent",checked:i.consent,onChange:s,required:!0}),e.jsx("span",{children:"I agree that Studio FIT India may contact me about this enquiry and relevant fitness programs. *"})]})}),e.jsx("button",{className:"btn",type:"submit",id:"submitBtn",disabled:g,children:g?"SUBMITTING...":e.jsxs(e.Fragment,{children:["REQUEST A CALLBACK ",e.jsx("span",{"aria-hidden":"true",children:"→"})]})}),p.message&&e.jsx("div",{id:"formStatus",className:`form-status ${p.type}`,role:"status","aria-live":"polite",children:p.message}),e.jsx("p",{className:"privacy",children:"Your information will be used to respond to your enquiry. Please don't submit sensitive personal information."})]})]})]})}),e.jsx("section",{children:e.jsxs("div",{className:"wrap",children:[e.jsxs("div",{className:"section-head",children:[e.jsx("h2",{children:"Frequently asked questions"}),e.jsx("p",{children:"Quick answers before you enquire."})]}),e.jsxs("div",{className:"faq-list",children:[e.jsxs("details",{children:[e.jsx("summary",{children:"Are Studio FIT India classes online?"}),e.jsx("p",{children:"Studio FIT India offers online fitness classes. Contact the team to confirm available programs and schedules."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Which fitness goal can I select?"}),e.jsx("p",{children:"You can enquire about Weight Gain, Weight Loss, Strength Training, or Regular Fitness. The team can explain relevant available options."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"What are the current membership offers?"}),e.jsx("p",{children:"The page lists festive offers of ₹6,999 for 12 months plus 12 months free and ₹4,999 for 6 months plus 6 months free. Confirm current validity, inclusions and terms with Studio FIT India before payment."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"What classes are available?"}),e.jsx("p",{children:"Available formats may include strength training, yoga, Pilates, Zumba, aerobics, HIIT and functional training. Contact the team to confirm the live schedule and which formats your plan includes."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"Can I get help choosing a program?"}),e.jsx("p",{children:"Select your main goal in the enquiry form and the team can discuss available options. Program suitability and results vary by individual."})]}),e.jsxs("details",{children:[e.jsx("summary",{children:"How do I get started?"}),e.jsx("p",{children:"Complete the form with your contact details and preferences. The team can follow up about available classes and next steps."})]})]})]})}),e.jsx("section",{className:"final-cta",children:e.jsxs("div",{className:"wrap",children:[e.jsx("h2",{children:"Your next step starts today."}),e.jsx("p",{children:"Tell us what you're working toward and explore online fitness options with Studio FIT India."}),e.jsx("a",{className:"btn",href:"#enquiry",children:"GET MY FITNESS PLAN →"})]})})]}),e.jsx("footer",{children:e.jsxs("div",{className:"wrap footer-inner",children:[e.jsxs("span",{children:[e.jsx("strong",{children:"STUDIO FIT INDIA"})," · Live Online Fitness"]}),e.jsxs("span",{children:[e.jsx("a",{href:"/",style:{color:"inherit"},children:"Official website"})," · Please review the site's privacy policy before publishing this form."]})]})}),e.jsx("div",{className:"sticky-cta",children:e.jsx("a",{className:"btn",href:"#enquiry",children:"GET MY FITNESS PLAN →"})})]})};export{I as default};
