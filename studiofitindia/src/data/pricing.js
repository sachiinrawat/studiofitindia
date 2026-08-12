export const pricingPlans = [
    {
        id: 1,
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
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the STARTER (1 Month) plan for ₹1499."
    },
    {
        id: 2,
        name: "STANDARD",
        price: 3200,
        originalPrice: 3999,
        duration: "3 Months",
        offerHighlight: " 15  Free",
        features: [
            "85 Live Classes + 15 Days Free",
            "10 Days Pause",
            "No Content Library"
        ],
        badge: null,
        popular: true,
        paymentLink: "https://rzp.io/rzp/3monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the STANDARD (3 Months + 15 Days Free) plan for ₹3200."
    },
    {
        id: 3,
        name: "3 MONTHS PREMIUM PLAN",
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
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 3 MONTHS PREMIUM PLAN (3 Months + 15 Days Free) plan for ₹4999."
    },
    {
        id: 3,
        name: "PRO",
        price: 5000,
        originalPrice: 6999,
        duration: "6 Months",
        offerHighlight: " 1 Month Free",
        features: [
            "Unlimited Live Classes",
            "15 Days Pause",
            "Content Library",

        ],
        badge: null,
        popular: true,
        paymentLink: "https://rzp.io/rzp/6monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the PRO (6 Months + 1 Month Free) plan for ₹5000."
    },
    {
        id: 4,
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
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the ELITE (1 Year) plan for ₹7000."
    },
    {
        id: 8,
        name: "1 MONTH TRANSFORMATION PLAN",
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
        badge: "Valid till 5th July",
        popular: false,
        paymentLink: "https://rzp.io/rzp/onemonthtransformation",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 1 Month Transformation Plan for ₹3500."
    },
    {
        id: 5,
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
        popular: false,
        paymentLink: "https://rzp.io/rzp/90dayselitetransformation",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the TRANSFORMATION ELITE (90 Days) plan for ₹7900."
    },
    {
        id: 11,
        name: "FAMILY FITNESS PLAN (3 MONTHS)",
        price: 5000,
        originalPrice: 6000,
        duration: "3 Months",
        features: [
            "Unlimited Classes",
            "Up to 3 Family Members",
            "Content Library",
            "Buy Now, Start Later"
        ],
        // badge: "Join Before 1 August",
        popular: false,
        paymentLink: "https://rzp.io/rzp/3monthsfamilyfitnessplan",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the FAMILY FITNESS PLAN (3 Months) for ₹5000."
    },

];

// Feature comparison matrix for the comparison table
// Each feature maps plan IDs to true (included) or false (not included)
export const comparisonFeatures = [
    { label: "Live Classes", values: { 1: "30", 2: "90", 3: "Unlimited", 4: "Unlimited", 8: "Unlimited", 5: "Unlimited", 9: "Unlimited" } },
    { label: "Pause Option", values: { 1: false, 2: "10 Days", 3: "15 Days", 4: "30 Days", 8: false, 5: "15 Days", 9: "30 Days" } },
    { label: "Content Library", values: { 1: false, 2: false, 3: true, 4: true, 8: true, 5: true, 9: true } },
    { label: "Diet Consultation", values: { 1: false, 2: false, 3: false, 4: false, 8: "Customized", 5: "Customized", 9: false } },
    { label: "Progress Monitoring", values: { 1: false, 2: false, 3: false, 4: true, 8: "Weekly", 5: "Weekly", 9: false } },
    { label: "Priority Support", values: { 1: false, 2: false, 3: false, 4: false, 8: true, 5: true, 9: false } },
];
