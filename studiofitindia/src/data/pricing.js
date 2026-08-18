// ─── WORKOUT PLANS ─────────────────────────────────────────────────────────
export const workoutPlans = [
    {
        id: 1,
        category: "workout",
        name: "STARTER",
        price: 1499,
        originalPrice: 1699,
        duration: "1 Month",
        features: [
            "30 Live Classes",
            "No Pause",
            "No Content Library"
        ],
        badge: null,
        popular: false,
        paymentLink: "https://rzp.io/rzp/1monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the STARTER (1 Month) plan for ₹1499."
    },
    {
        id: 2,
        category: "workout",
        name: "STANDARD",
        price: 3200,
        originalPrice: 3999,
        duration: "3 Months",
        offerHighlight: "15 Days Free",
        features: [
            "90 Sessions",
            "10 Days Pause",
            "Content Library",
            "Workout Guidance",
            "15 Days Free"
        ],
        badge: "Most Valuable",
        popular: true,
        paymentLink: "https://rzp.io/rzp/3monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the STANDARD (3 Months + 15 Days Free) plan for ₹3200."
    },
    {
        id: 3,
        category: "workout",
        name: "PRO",
        price: 4999,
        originalPrice: 6999,
        duration: "6 Months",
        offerHighlight: "1 Month Free",
        features: [
            "Unlimited Sessions",
            "20 Days Pause",
            "Content Library",
            "Workout Guidance",
            "1 Month Free"
        ],
        badge: "Most Valuable",
        popular: true,
        paymentLink: "https://rzp.io/rzp/6monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the PRO (6 Months + 1 Month Free) plan for ₹4999."
    },
    {
        id: 4,
        category: "workout",
        name: "ELITE",
        price: 7000,
        originalPrice: 8999,
        duration: "1 Year",
        features: [
            "Unlimited Live Classes",
            "30 Days Pause",
            "Content Library"
        ],
        badge: null,
        popular: false,
        paymentLink: "https://rzp.io/rzp/1yearstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the ELITE (1 Year) plan for ₹7000."
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
        name: "TRANSFORMATION ELITE",
        price: 9000,
        originalPrice: 10500,
        duration: "90 Days",
        features: [
            "Unlimited Live Classes",
            "15 Days Pause",
            "Content Library",
            "Customized Diet",
            "Weekly Monitoring",
            "Priority Support"
        ],
        badge: "Best Results",
        popular: true,
        paymentLink: "https://rzp.io/rzp/90dayselitetransformation",
        whatsappMessage: "Hi Studio Fit India, I want to ENROLL in the TRANSFORMATION ELITE (90 Days) plan for ₹9000."
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

// Feature comparison matrix
export const comparisonFeatures = [
    { label: "Live Classes", values: { 1: "30", 2: "90", 3: "Unlimited", 4: "Unlimited", 8: "Unlimited", 5: "Unlimited", 9: "Unlimited" } },
    { label: "Pause Option", values: { 1: false, 2: "10 Days", 3: "20 Days", 4: "30 Days", 8: false, 5: "15 Days", 9: false } },
    { label: "Content Library", values: { 1: false, 2: true, 3: true, 4: true, 8: true, 5: true, 9: false } },
    { label: "Diet Consultation", values: { 1: false, 2: false, 3: false, 4: false, 8: "Customized", 5: "Customized", 9: false } },
    { label: "Progress Monitoring", values: { 1: false, 2: false, 3: false, 4: false, 8: "Weekly", 5: "Weekly", 9: false } },
    { label: "Priority Support", values: { 1: false, 2: false, 3: false, 4: false, 8: true, 5: true, 9: false } },
];
