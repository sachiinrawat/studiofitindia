// ─── WORKOUT PLANS ─────────────────────────────────────────────────────────
export const workoutPlans = [
    {
        id: 1,
        category: "workout",
        name: "STARTER",
        price: 1699,
        originalPrice: 1999,
        duration: "1 Month",
        features: [
            "30 Live Classes",
            "No Pause",
            "No Content Library"
        ],
        badge: null,
        popular: false,
        paymentLink: "https://rzp.io/rzp/1monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the STARTER (1 Month) plan for ₹1699."
    },
    {
        id: 2,
        category: "workout",
        name: "STANDARD",
        price: 2900,
        originalPrice: 3999,
        duration: "3+1 Months",
        offerHighlight: "1 Month FREE",
        features: [
            "120 Sessions",
            "10 Days Pause",
            "Content Library",
            "Workout Guidance",
            "1 Month FREE"
        ],
        badge: "Festive Offer",
        popular: true,
        paymentLink: "https://rzp.io/rzp/3monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the 3+1 Months Festive Offer for ₹2900."
    },
    {
        id: 3,
        category: "workout",
        name: "PRO",
        price: 4600,
        originalPrice: 5999,
        duration: "6+2 Months",
        offerHighlight: "2 Months FREE",
        features: [
            "Unlimited Classes",
            "20 Days Pause",
            "Content Library",
            "Workout Guidance",
            "2 Months FREE"
        ],
        badge: "Most Popular",
        popular: true,
        paymentLink: "https://rzp.io/rzp/6monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the PRO (6+2 Months) Festive Offer for ₹4600."
    },
    {
        id: 4,
        category: "workout",
        name: "ELITE",
        price: 5900,
        originalPrice: 8999,
        duration: "1 Year + 3 Months",
        offerHighlight: "3 Months FREE",
        features: [
            "Unlimited Classes",
            "30 Days Pause",
            "Content Library",
            "Workout Guidance",
            "3 Months FREE"
        ],
        badge: "Best Value",
        popular: false,
        paymentLink: "https://rzp.io/rzp/1yearstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the ELITE (1 Year + 3 Months) Festive Offer for ₹5900."
    },
];

// ─── WORKOUT + DIET PLANS ──────────────────────────────────────────────────
export const dietPlans = [
    {
        id: 10,
        category: "diet",
        name: "3 MONTHS PREMIUM",
        price: 4999,
        originalPrice: 6499,
        duration: "3 Months",
        features: [
            "Unlimited Classes",
            "10 Days Pause",
            "Content Library",
            "Monthly Diet Consultation",
        ],
        badge: null,
        popular: false,
        paymentLink: "https://rzp.io/rzp/3monthpremiumstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the 3 MONTHS PREMIUM PLAN for ₹4999."
    },
    {
        id: 8,
        category: "diet",
        name: "1 MONTH TRANSFORMATION",
        price: 3500,
        originalPrice: 4000,
        duration: "1 Month",
        features: [
            "Unlimited Live Classes",
            "Content Library",
            "Customized Diet",
            "Weekly Monitoring",
            "No Pause Option",
            "Priority Support"
        ],
        badge: null,
        popular: false,
        paymentLink: "https://rzp.io/rzp/onemonthtransformation",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the 1 Month Transformation Plan for ₹3500."
    },
    {
        id: 5,
        category: "diet",
        name: "90-DAY TRANSFORMATION",
        price: 6000,
        originalPrice: 12000,
        duration: "90 Days",
        features: [
            "Customized Diet + Daily Tracking",
            "Weekly Counselling",
            "15 Days Pause",
            "Unlimited Live Classes",
            "Content Library",
            "Priority Support"
        ],
        badge: "50% OFF",
        popular: true,
        paymentLink: "https://rzp.io/rzp/90dayselitetransformation",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the 90-DAY TRANSFORMATION plan for ₹6000 (50% OFF)."
    },
];

// ─── FAMILY FITNESS PLAN ───────────────────────────────────────────────────
export const familyPlan = {
    id: 11,
    category: "family",
    name: "FAMILY FITNESS PLAN",
    price: 5000,
    originalPrice: 6000,
    duration: "3 Months",
    features: [
        "Unlimited Classes",
        "Up to 3 Family Members",
        "Content Library",
        "Buy Now, Start Later"
    ],
    popular: false,
    paymentLink: "https://rzp.io/rzp/3monthsfamilyfitnessplan",
    whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the FAMILY FITNESS PLAN (3 Months) for ₹5000."
};

// ─── LEGACY FLAT ARRAY (used by HomePricing, PricingCard etc.) ─────────────
export const pricingPlans = [...workoutPlans, ...dietPlans, familyPlan];


// Great Festive Fit Sale Details
export const FESTIVE_SALE_CONFIG = {
    saleName: "GREAT FESTIVE FIT SALE",
    tagline: "BUY NOW, START LATER! Book Now & Start When You're Ready",
    bonus: "Renew by 31st Oct & Get 21-Day FAT TO FIT CHALLENGE FREE!",
    validity: "Sale Valid Till 9th November",
    phones: ["8796442732", "9310666287"],
    commitment: "Your Fitness, Our Commitment!"
};

// Offer expiry (Valid till 9th November)
export const FESTIVE_OFFER_EXPIRY = new Date("2026-11-09T23:59:59+05:30");

// Feature comparison matrix
export const comparisonFeatures = [
    { label: "Live Classes", values: { 1: "30", 2: "120", 3: "Unlimited", 4: "Unlimited", 8: "Unlimited", 5: "Unlimited" } },
    { label: "Pause Option", values: { 1: false, 2: "10 Days", 3: "20 Days", 4: "30 Days", 8: false, 5: "15 Days" } },
    { label: "Content Library", values: { 1: false, 2: true, 3: true, 4: true, 8: true, 5: true } },
    { label: "Diet Consultation", values: { 1: false, 2: false, 3: false, 4: false, 8: "Customized", 5: "Customized + Daily Tracking" } },
    { label: "Progress Monitoring", values: { 1: false, 2: false, 3: false, 4: false, 8: "Weekly", 5: "Weekly Counselling" } },
    { label: "Priority Support", values: { 1: false, 2: false, 3: false, 4: false, 8: true, 5: true } },
];
