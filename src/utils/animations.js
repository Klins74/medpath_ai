/**
 * Animation utilities using framer-motion
 */

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const slideDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const slideLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export const slideRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// Modal animations
export const modalAnimation = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
};

// Button animations
export const buttonHover = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 300, damping: 30 }
};

export const buttonTap = {
  scale: 0.98,
  transition: { type: "spring", stiffness: 300, damping: 30 }
};

// Card animations
export const cardHover = {
  y: -4,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: { type: "spring", stiffness: 300, damping: 30 }
};

// Loading animations
export const loadingDots = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.5, 1],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

export const loadingSpinner = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear"
    }
  }
};

// Form animations
export const formFieldFocus = {
  scale: 1.01,
  borderColor: "var(--color-primary)",
  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  transition: { duration: 0.2 }
};

// Chat message animations
export const messageSlideIn = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  }
};

// Typing indicator animation
export const typingIndicator = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

// Progress bar animation
export const progressBar = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: { duration: 0.5, ease: "easeInOut" }
};

// Notification animations
export const notificationSlide = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  },
  exit: { opacity: 0, x: 100, transition: { duration: 0.2 } }
};

// Timeline animations
export const timelineItem = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  })
};

// Sidebar animations
export const sidebarSlide = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0, 
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 30 
    } 
  },
  exit: { x: "-100%", transition: { duration: 0.2 } }
};

// Tab animations
export const tabContent = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    } 
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

// Utility function to create custom animations
export const createCustomAnimation = (config) => {
  return {
    hidden: config.hidden || { opacity: 0 },
    visible: config.visible || { opacity: 1 },
    exit: config.exit || { opacity: 0 },
    transition: config.transition || { duration: 0.3 }
  };
};