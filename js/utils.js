/**
 * Utility Functions
 * Common helper functions used across the portfolio application
 * Enhanced with error handling and accessibility features
 */

/**
 * Error Handling Utilities
 */
class ErrorHandler {
  static logError(error, context = '') {
    const timestamp = new Date().toISOString();
    const errorInfo = {
      timestamp,
      context,
      message: error ? error.message : 'Unknown error',
      stack: error ? error.stack : 'No stack trace available',
      userAgent: navigator.userAgent
    };
    
    console.error('Portfolio Error:', errorInfo);
    
    // In a production environment, you might want to send this to an error tracking service
    // this.sendToErrorService(errorInfo);
  }

  static handleAsyncError(promise, context = '') {
    return promise.catch(error => {
      this.logError(error, context);
      throw error; // Re-throw to allow caller to handle
    });
  }

  static createSafeFunction(fn, fallback = () => {}) {
    return (...args) => {
      try {
        return fn(...args);
      } catch (error) {
        this.logError(error, `Safe function wrapper`);
        return fallback(...args);
      }
    };
  }
}

/**
 * Accessibility Utilities
 */
class AccessibilityHelper {
  /**
   * Announce message to screen readers
   */
  static announce(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Set focus with error handling
   */
  static setFocus(element, options = {}) {
    try {
      if (element && typeof element.focus === 'function') {
        element.focus(options);
        return true;
      }
      return false;
    } catch (error) {
      ErrorHandler.logError(error, 'Focus management');
      return false;
    }
  }

  /**
   * Add keyboard navigation to element
   */
  static addKeyboardNavigation(element, callback) {
    if (!element) return;

    element.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (callback) callback(event);
      }
    });
  }

  /**
   * Ensure element has proper ARIA attributes
   */
  static ensureAccessibleButton(element, label) {
    if (!element) return;

    if (!element.hasAttribute('role')) {
      element.setAttribute('role', 'button');
    }
    
    if (!element.hasAttribute('tabindex')) {
      element.setAttribute('tabindex', '0');
    }
    
    if (label && !element.hasAttribute('aria-label')) {
      element.setAttribute('aria-label', label);
    }
  }

  /**
   * Check if user prefers reduced motion
   */
  static prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Check if user prefers high contrast
   */
  static prefersHighContrast() {
    return window.matchMedia('(prefers-contrast: high)').matches;
  }
}

/**
 * Image Utilities with Error Handling
 */
class ImageHelper {
  /**
   * Create placeholder image data URI
   */
  static createPlaceholder(width = 400, height = 220, text = 'Image') {
    const svg = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="#f3f4f6"/>
        <path d="M${width/2} ${height/3}c22.091 0 40 17.909 40 40s-17.909 40-40 40-40-17.909-40-40 17.909-40 40-40zm0 60c-11.046 0-20 8.954-20 20s8.954 20 20 20 20-8.954 20-20-8.954-20-20-20z" fill="#9ca3af"/>
        <text x="${width/2}" y="${height * 0.8}" text-anchor="middle" fill="#6b7280" font-family="sans-serif" font-size="14">${text}</text>
      </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  /**
   * Handle image loading with fallback
   */
  static loadImageWithFallback(img, fallbackSrc = null) {
    return new Promise((resolve, reject) => {
      const originalSrc = img.src;
      
      img.onload = () => resolve(img);
      
      img.onerror = () => {
        if (fallbackSrc && img.src !== fallbackSrc) {
          img.src = fallbackSrc;
        } else {
          // Create placeholder
          const placeholder = this.createImagePlaceholder(img);
          if (img.parentNode) {
            img.parentNode.replaceChild(placeholder, img);
          }
          reject(new Error(`Failed to load image: ${originalSrc}`));
        }
      };
    });
  }

  /**
   * Create image placeholder element
   */
  static createImagePlaceholder(originalImg) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.style.height = originalImg.style.height || '220px';
    placeholder.style.width = originalImg.style.width || '100%';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', originalImg.alt || 'Image not available');
    
    placeholder.innerHTML = `
      <i class="bi bi-image" style="font-size: 2rem;" aria-hidden="true"></i>
      <br>
      <small>Image not available</small>
    `;
    
    return placeholder;
  }
}

/**
 * Form Validation Utilities
 */
class FormValidator {
  /**
   * Validate email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate required field
   */
  static isRequired(value, minLength = 1) {
    return value != null && value.toString().trim().length >= minLength;
  }

  /**
   * Add validation state to field
   */
  static setFieldValidation(field, isValid, message = '') {
    const errorDiv = document.querySelector(`#${field.id}-error`);
    
    field.classList.remove('is-valid', 'is-invalid');
    field.classList.add(isValid ? 'is-valid' : 'is-invalid');
    
    if (errorDiv) {
      errorDiv.textContent = isValid ? '' : message;
    }
  }

  /**
   * Clear all validation states in form
   */
  static clearFormValidation(form) {
    const fields = form.querySelectorAll('.form-control');
    const errorDivs = form.querySelectorAll('.invalid-feedback, .valid-feedback');
    
    fields.forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
    });
    
    errorDivs.forEach(div => {
      div.textContent = '';
    });
  }
}

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately on first call
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(this, args);
  };
}

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Check if an element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Threshold percentage (0-1)
 * @returns {boolean} True if element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                     ((rect.top + rect.height) >= windowHeight * threshold);
  const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                    ((rect.left + rect.width) >= windowWidth * threshold);
  
  return vertInView && horInView;
}

/**
 * Get current viewport size category
 * @returns {string} Viewport category: 'mobile', 'tablet', or 'desktop'
 */
function getViewportCategory() {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
}

/**
 * Sanitize HTML string to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeHTML(str) {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
function formatDate(date, options = { year: 'numeric', month: 'long', day: 'numeric' }) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString('en-US', options);
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID
 */
function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} True if user prefers reduced motion
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll to element
 * @param {HTMLElement|string} target - Element or selector to scroll to
 * @param {Object} options - Scroll options
 */
function smoothScrollTo(target, options = {}) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const defaultOptions = {
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  };

  element.scrollIntoView({ ...defaultOptions, ...options });
}

/**
 * Load image with promise
 * @param {string} src - Image source URL
 * @returns {Promise<HTMLImageElement>} Promise that resolves with loaded image
 */
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Get contrast color (black or white) for a given background color
 * @param {string} hexColor - Hex color string
 * @returns {string} 'black' or 'white'
 */
function getContrastColor(hexColor) {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB using substring instead of deprecated substr
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|HTMLElement|Array} content - Element content
 * @returns {HTMLElement} Created element
 */
function createElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Set content
  if (typeof content === 'string') {
    element.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    element.appendChild(content);
  } else if (Array.isArray(content)) {
    content.forEach(item => {
      if (typeof item === 'string') {
        element.insertAdjacentHTML('beforeend', item);
      } else if (item instanceof HTMLElement) {
        element.appendChild(item);
      }
    });
  }
  
  return element;
}

/**
 * Local storage helper with error handling
 */
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn('Error writing to localStorage:', error);
      return false;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn('Error removing from localStorage:', error);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Make classes available globally for browser use
if (typeof window !== 'undefined') {
  window.ErrorHandler = ErrorHandler;
  window.AccessibilityHelper = AccessibilityHelper;
  window.ImageHelper = ImageHelper;
  window.FormValidator = FormValidator;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ErrorHandler,
    AccessibilityHelper,
    ImageHelper,
    FormValidator,
    debounce,
    throttle,
    isInViewport,
    getViewportCategory,
    sanitizeHTML,
    formatDate,
    generateId,
    deepClone,
    prefersReducedMotion,
    smoothScrollTo,
    loadImage,
    getContrastColor,
    createElement,
    storage
  };
}