import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    react(),

    // ── Dev-only chatbot.php emulator ───────────────────────────────
    // Vite can't run PHP; this Node.js middleware handles /chatbot.php
    // so the chatbot works identically on npm run dev.
    // Uses https module (works on ALL Node.js versions, including v16).
    {
      name: 'chatbot-dev-middleware',
      configureServer(server) {
        server.middlewares.use('/chatbot.php', (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: 'POST only' }));
            return;
          }

          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            let message = '';
            try { message = JSON.parse(body).message || ''; } catch { }

            const GROQ_KEY = process.env.GROQ_API_KEY || 'YOUR_GROQ_API_KEY_HERE';
            const payload = JSON.stringify({
              model: 'llama-3.1-8b-instant',
              max_tokens: 350,
              temperature: 0.4,
              messages: [
                {
                  role: 'system',
                  content: `You are the AI assistant for Studio FIT India — an online live fitness studio based in India.

RESPONSE RULES (follow strictly every time):
1. Answer ONLY what the user asked. Do not add extra unrelated info.
2. Use bullet points (•) for lists of 3 or more items.
3. Use numbered steps for processes (how to join, etc.).
4. Keep total reply under 80 words unless a detailed list is needed.
5. Never start with "Great question!" or filler phrases.
6. If price is asked, give the exact number immediately.
7. If unsure, say: "For this, WhatsApp us: +91-9310666287"
8. Do NOT repeat the question back to the user.

--- STUDIO INFO ---
WhatsApp: +91-9310666287 | Instagram: @studiofitindia | studiofitindia.com

--- FAT TO FIT CHALLENGE ROUND 5 (NEW!) ---
• 21-day transformation challenge: 1st May - 21st May 2026
• Registration Fee: ₹299 Only (Flat!)
• What's Included:
  - Real-Time WhatsApp Progress Tracking
  - FREE 21-Day Diet Plan (Homemade)
  - Daily Accountability & Motivation
  - Weekly Tasks & Challenges
  - Regular Classes Continue
  - Full Support from Team
• Winner Prizes:
  - 🥇 6 Months FREE Membership
  - 🥈 3 Months FREE Membership
  - 🥉 1 Month FREE Membership
• Eligibility: Membership must be active till 21st May 2026
• Limited Seats – First Come First Serve

--- PROGRAMS ---
• Strength Training • Yoga & Mindfulness (Hatha, Ashtanga, Power Yoga, Pranayama, Meditation)
• HIIT & Functional Training • Weight Loss Programs • Personal Training (1-on-1)
• Zumba / Dance Fitness / Aerobics • Pilates

--- PRICING ---
• Starter – 1 Month – ₹1,699 – 26 live classes
• Standard – 3 Months – ₹2,800 – 85 classes + 15 Days FREE
• Pro – 6 Months – ₹4,200 – Unlimited + 1 Month FREE
• Elite – 1 Year – ₹9,900 – Unlimited + full recorded library + 3 diet consultations
• Transformation Elite – 90 Days – ₹10,500 – Unlimited + customized diet + weekly monitoring

--- COACHES ---
• Pankaj Kavle — Strength, HIIT, CrossFit (15+ yrs)
• Puja Vaish — Pilates, Aerobics (9 yrs)
• Nitin Dabhade — Yoga, Zumba (10+ yrs)
• Yashi Tiwari — Women's Yoga (Rishikesh certified)
• Jyoti Yadav — Hatha, Ashtanga, Face Yoga (6 yrs)
• Geeta Khatri — Bollywood Dance, Zumba (2 yrs)
• Ritika Sharma — Yoga, Pilates, MA Yogic Science (6+ yrs)
• Pooja Sontakke — Yoga, Zumba (5 yrs)

--- SCHEDULE ---
Morning & evening batches. Contact WhatsApp for timings.

--- HOW TO JOIN ---
1. WhatsApp "JOIN" to +91-9310666287
2. DM "FIT" on Instagram @studiofitindia
3. Visit studiofitindia.com/prices-page`,
                },
                { role: 'user', content: message }
              ]
            });

            // Node v24 has native fetch — no require() needed
            fetch('https://api.groq.com/openai/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${GROQ_KEY}`,
                'Content-Type': 'application/json',
              },
              body: payload,
            })
              .then(r => r.json())
              .then(json => {
                const reply = json?.choices?.[0]?.message?.content
                  || json?.error?.message
                  || "Sorry, I couldn't get a response. WhatsApp us at +91-9310666287!";
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply }));
              })
              .catch((err) => {
                console.error('[Groq fetch error]', err);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reply: 'Network error. WhatsApp us at +91-9310666287.' }));
              });
          });
        });
      },
    },
  ],
  build: {
    // Use esbuild for minification (built into Vite, no extra install needed)
    // esbuild is extremely fast and produces output comparable to terser
    minify: 'esbuild',

    // Output configuration for cache-busting
    rollupOptions: {
      output: {
        // Add hash to entry file to force browser to load new version
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        // Split vendor dependencies into separately cached chunks
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },

    // Increase chunk warning limit
    chunkSizeWarningLimit: 600,

    // Enable CSS code splitting
    cssCodeSplit: true,

    // No source maps in production (smaller files)
    sourcemap: false,
  },
})
