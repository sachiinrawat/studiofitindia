// --- Cult.fit inspired animation variants ---

// Page transition: smooth fade + upward drift
export const pageVariants = {
    initial: { opacity: 1, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25, ease: 'easeIn' } }
};

// Reveal from below — primary entrance animation
export const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Simple fade
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.9 } }
};

// Slide from left with spring
export const slideInLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Slide from right with spring
export const slideInRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Stagger wrapper for child elements
export const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } }
};

// Card entrance
export const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

// Scale pop — for icons and badges
export const scaleUp = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 120, damping: 12 } }
};

// Slide up with clip-path reveal (like cult.fit)
export const clipReveal = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

// Character-by-character heading reveal
export const headingReveal = {
    hidden: { opacity: 0, y: 80, skewY: 5 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};
