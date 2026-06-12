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
        price: 2900,
        originalPrice: 3999,
        duration: "3 Months",
        offerHighlight: "1 Month Free",
        features: [
            "85 Live Classes",
            "10 Days Pause",
            "1 Month Completely Free"
        ],
        badge: null,
        popular: true,
        paymentLink: "https://rzp.io/rzp/3monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the STANDARD (3 Months + 15 Days Free) plan for ₹2900."
    },
    {
        id: 3,
        name: "PRO",
        price: 4600,
        originalPrice: 6999,
        duration: "6 Months",
        offerHighlight: "2 Months Free",
        features: [
            "Unlimited Live Classes",
            "15 Days Pause",
            "Content Library",
            "2 Months Completely Free"
        ],
        badge: null,
        popular: true,
        paymentLink: "https://rzp.io/rzp/6monthstudiofitindia",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the PRO (6 Months + 1 Month Free) plan for ₹5500."
    },
    {
        id: 4,
        name: "ELITE",
        price: 7500,
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
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the ELITE (1 Year) plan for ₹7500."
    },
    {
        id: 8,
        name: "1 MONTH TRANSFORMATION PLAN",
        price: 2900,
        originalPrice: 3499,
        duration: "1 Month",
        features: [
            "Unlimited Live Classes",
            "Content Library",
            "Customized Diet",
            "Weekly Monitoring",
            "No Pause Option",
            "Priority Support"
        ],
        badge: "Highly Popular",
        popular: false,
        paymentLink: "https://rzp.io/rzp/onemonthtransformation",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 1 Month Transformation Plan for ₹2900."
    },
    {
        id: 5,
        name: "TRANSFORMATION ELITE",
        price: 7900,
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
        id: 6,
        name: "PERSONAL TRAINING (1 MONTH)",
        price: 16000,
        originalPrice: 20000,
        duration: "1 Month",
        features: [
            "1-on-1 Personal Training",
            "16 Sessions in a Month",
            "WhatsApp Chat Support",
            "Customized Workout Plan",
            "Diet Guidance"
        ],
        badge: "20% OFF",
        popular: false,
        paymentLink: "https://rzp.io/rzp/personal-training-1month",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 1-on-1 Personal Training (1 Month) plan for ₹16000."
    },
    {
        id: 7,
        name: "PERSONAL TRAINING (3 MONTHS)",
        price: 38000,
        originalPrice: 48000,
        duration: "3 Months",
        features: [
            "1-on-1 Personal Training",
            "48 Sessions in 3 Months",
            "WhatsApp Chat Support",
            "Dedicated Fitness Coach",
            "Full Nutrition Support"
        ],
        badge: "Best Value",
        popular: true,
        paymentLink: "https://rzp.io/rzp/personal-training-3months",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 1-on-1 Personal Training (3 Months) plan for ₹38000."
    },
    {
        id: 9,
        name: "FAMILY FITNESS PLAN",
        price: 9900,
        originalPrice: 21000,
        duration: "1 Year",
        features: [
            "Unlimited Classes",
            "Up to 3 Family Members",
            "Content Library",
            "30-Days Pause Facility",
            "Buy Now, Start Later"
        ],
        badge: "Special Family Package",
        popular: true,
        paymentLink: "https://rzp.io/rzp/familyfitnessplan",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the FAMILY FITNESS PLAN (1 Year) for ₹9900."
    },
    {
        id: 10,
        name: "2 YEAR PLAN",
        price: 8900,
        originalPrice: 15000,
        duration: "2 Years",
        features: [
            "Unlimited Live Classes",
            "Content Library",
            "30 Days Pause Facility",
            "Valid for First 30 Members Only"
        ],
        badge: "First 30 Members Only",
        popular: true,
        paymentLink: "https://rzp.io/rzp/2yearmembership",
        whatsappMessage: "Hi Studio Fit India, I want to JOIN the 2 YEAR PLAN for ₹8900."
    }
];

// Feature comparison matrix for the comparison table
// Each feature maps plan IDs to true (included) or false (not included)
export const comparisonFeatures = [
    { label: "Live Classes", values: { 1: "30", 2: "90", 3: "Unlimited", 4: "Unlimited", 8: "Unlimited", 5: "Unlimited", 6: "PT", 7: "PT", 9: "Unlimited" } },
    { label: "Pause Option", values: { 1: false, 2: "10 Days", 3: "15 Days", 4: "30 Days", 8: false, 5: "15 Days", 6: false, 7: false, 9: "30 Days" } },
    { label: "Content Library", values: { 1: false, 2: false, 3: true, 4: true, 8: true, 5: true, 6: false, 7: false, 9: true } },
    { label: "Diet Consultation", values: { 1: false, 2: false, 3: false, 4: false, 8: "Customized", 5: "Customized", 6: "Included", 7: "Included", 9: false } },
    { label: "Progress Monitoring", values: { 1: false, 2: false, 3: false, 4: true, 8: "Weekly", 5: "Weekly", 6: "Daily", 7: "Daily", 9: false } },
    { label: "Priority Support", values: { 1: false, 2: false, 3: false, 4: false, 8: true, 5: true, 6: "Direct Coach", 7: "Direct Coach", 9: false } },
];
