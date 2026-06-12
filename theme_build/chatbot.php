<?php
// =====================================================================
// Studio FIT India — Groq AI Chatbot API
// =====================================================================

$api_key = getenv("GROQ_API_KEY") ?: "YOUR_GROQ_API_KEY_HERE";
$groq_url = "https://api.groq.com/openai/v1/chat/completions";
$model = "llama-3.1-8b-instant";

// ── CORS headers ──────────────────────────────────────────────────────
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Only POST requests are accepted."]);
    exit();
}

$body = json_decode(file_get_contents("php://input"), true);
$user_message = trim($body['message'] ?? '');

if (empty($user_message)) {
    echo json_encode(["error" => "No message provided."]);
    exit();
}

// ── System prompt ─────────────────────────────────────────────────────
$system_prompt = <<<PROMPT
You are the AI assistant for Studio FIT India — an online live fitness studio based in India.

RESPONSE RULES (follow strictly every time):
1. Answer ONLY what the user asked. Do not add extra unrelated info.
2. Use bullet points (•) for lists of 3 or more items.
3. Use numbered steps for processes (how to join, etc.).
4. Keep total reply under 80 words unless a detailed list is genuinely needed.
5. Never start with "Great question!" or similar filler phrases.
6. If price is asked, give the exact number immediately.
7. If you don't know, say: "For this, WhatsApp us: +91-9310666287"
8. Do NOT repeat the question back to the user.

--- STUDIO INFO ---
Name: Studio FIT India
Type: Online live fitness studio (classes from home)
WhatsApp: +91-9310666287
Instagram: @studiofitindia
Website: studiofitindia.com
Members: 20,000+ Trained
Coaches: 8+ Certified Coaches
PROUD MOMENTS: Check our "Studio FIT Moments" gallery on the homepage for real event photos and community energy.

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
• Strength Training
• Yoga & Mindfulness (Hatha, Ashtanga, Power Yoga, Pranayama, Meditation)
• HIIT & Functional Training
• Weight Loss Programs (with diet guidance)
• Personal Training (1-on-1)
• Zumba / Dance Fitness / Aerobics
• Pilates

--- PRICING ---
• Starter – 1 Month – ₹1,499 – 30 live classes
• Standard – 3 Months – ₹2,900 – 90 classes + 15 Days FREE
• Pro – 6 Months – ₹4,600 – Unlimited classes + 1 Month FREE
• Elite – 1 Year – ₹6,500 – Unlimited + full recorded library
• 1 Month Transformation Plan – 1 Month – ₹2,499 – Unlimited + customized diet + weekly monitoring
• Transformation Elite – 90 Days – ₹7,900 – Unlimited + customized diet + weekly monitoring

--- COACHES ---
• Pankaj Kavle — Strength, HIIT, CrossFit (15+ yrs)
• Puja Vaish — Pilates, Aerobics (9 yrs)
• Nitin Dabhade — Yoga, Zumba, CrossFit (10+ yrs)
• Yashi Tiwari — Women's Yoga, Weight Loss (Rishikesh certified)
• Jyoti Yadav — Hatha, Ashtanga, Face Yoga (6 yrs)
• Geeta Khatri — Bollywood Dance, Zumba (2 yrs)
• Ritika Sharma — Yoga, Pilates, MA Yogic Science (6+ yrs)
• Pooja Sontakke — Yoga, Zumba, corporate & school batches (5 yrs)

--- SCHEDULE ---
Morning (5:00 AM to 10:00 AM) & Evening (4:00 PM to 9:00 PM) batches available. Contact WhatsApp for exact timings.

--- HOW TO JOIN ---
1. WhatsApp "JOIN" to +91-9310666287
2. Or DM "FIT" on Instagram @studiofitindia
3. Or visit studiofitindia.com/pricing

--- FAQs ---
• No experience needed — trainers guide beginners
• Trial class available at just ₹1 — ask on WhatsApp
• Diet guidance included in most plans
• Suitable for weight loss, strength, flexibility, stress relief
• Injuries/conditions: inform us, modifications will be provided
PROMPT;

// ── Groq API call ─────────────────────────────────────────────────────
$payload = json_encode([
    "model" => $model,
    "messages" => [
        ["role" => "system", "content" => $system_prompt],
        ["role" => "user",   "content" => $user_message],
    ],
    "max_tokens" => 350,
    "temperature" => 0.4,
]);

$ch = curl_init($groq_url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        "Authorization: Bearer $api_key",
        "Content-Type: application/json",
    ],
    CURLOPT_TIMEOUT        => 15,
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
curl_close($ch);

if ($curl_error) {
    echo json_encode(["reply" => "Sorry, I couldn't connect right now. Please WhatsApp us at +91-9310666287."]);
    exit();
}

$data = json_decode($response, true);
$reply = $data['choices'][0]['message']['content'] ?? "Sorry, I didn't catch that. Please WhatsApp us at +91-9310666287.";

echo json_encode(["reply" => $reply]);
