/**
 * Animation Controller
 * Manages smooth scroll animations, hover effects, intersection observer animations,
 * and visual feedback for interactive elements
 */

class AnimationController {
  constructor() {
    this.intersectionObserver = null;
    this.animatedElements = new Set();
    this.isInitialized = false;
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.animationQueue = [];
    this.isAnimating = false;
  }

  /**
   * Initialize the animation system
   */
  init() {
    if (this.isInitialized) return;
    
    try {
      this.setupIntersectionObserver();
      this.setupScrollAnimations();
      this.setupHoverEffects();
      this.setupTechnologyTagInteractions();
      this.setupReducedMotionListener();
      this.setupAnimationStyles();
      this.optimizeForPerformance();
      this.isInitialized = true;
      console.log('Animation system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize animation system:', error);
    }
  }

  /**
   * Set up CSS animation styles dynamically
   */
  setupAnimationStyles() {
    if (this.prefersReducedMotion) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Fade-in animations with GPU acceleration */
      .animate-fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
        will-change: transform, opacity;
        backface-visibility: hidden;
      }

      .animate-fade-in.animated {
        opacity: 1;
        transform: translateY(0);
      }

      .animate-slide-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        will-change: transform, opacity;
        backface-visibility: hidden;
      }

      .animate-slide-up.animated {
        opacity: 1;
        transform: translateY(0);
      }

      .animate-slide-left {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.7s ease, transform 0.7s ease;
        will-change: transform, opacity;
        backface-visibility: hidden;
      }

      .animate-slide-left.animated {
        opacity: 1;
        transform: translateX(0);
      }

      .animate-slide-right {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.7s ease, transform 0.7s ease;
        will-change: transform, opacity;
        backface-visibility: hidden;
      }

      .animate-slide-right.animated {
        opacity: 1;
        transform: translateX(0);
      }

      .animate-scale-in {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.5s ease, transform 0.5s ease;
        will-change: transform, opacity;
        backface-visibility: hidden;
      }

      .animate-scale-in.animated {
        opacity: 1;
        transform: scale(1);
      }

      /* Staggered animation delays */
      .animate-delay-1 { transition-delay: 0.1s; }
      .animate-delay-2 { transition-delay: 0.2s; }
      .animate-delay-3 { transition-delay: 0.3s; }
      .animate-delay-4 { transition-delay: 0.4s; }
      .animate-delay-5 { transition-delay: 0.5s; }

      /* Enhanced hover effects with GPU acceleration */
      .enhanced-hover {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: transform;
        backface-visibility: hidden;
      }

      .enhanced-hover:hover:not(.touch-device *):not(.reduce-motion *) {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      /* Technology tag animations with performance optimization */
      .tech-tag-interactive {
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        will-change: transform;
        backface-visibility: hidden;
      }

      .tech-tag-interactive::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s ease;
        will-change: left;
      }

      .tech-tag-interactive:hover::before:not(.touch-device *):not(.reduce-motion *) {
        left: 100%;
      }

      .tech-tag-interactive:hover:not(.touch-device *):not(.reduce-motion *) {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .tech-tag-interactive:active {
        transform: scale(0.95);
        transition-duration: 0.1s;
      }

      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }

      /* Loading animation with containment */
      .loading-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
        contain: layout style paint;
      }

      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      /* Pulse animation for interactive elements */
      .pulse-on-focus:focus {
        animation: pulse 0.6s ease-in-out;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }

      /* Performance optimizations for low-end devices */
      @media (max-width: 768px) {
        .enhanced-hover:hover {
          transform: translateY(-2px);
        }
        
        .tech-tag-interactive:hover {
          transform: scale(1.02);
        }
      }

      /* Lazy loaded images fade-in */
      .lazy-load {
        transition: opacity 0.3s ease;
      }

      .lazy-load.loaded {
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Set up intersection observer for fade-in animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window) || this.prefersReducedMotion) {
      // Fallback: show all elements immediately
      this.showAllElements();
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, options);

    // Observe elements that should animate on scroll
    this.observeAnimatableElements();
  }

  /**
   * Observe elements that should animate when they come into view
   */
  observeAnimatableElements() {
    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
      if (section.id !== 'home') { // Don't animate the hero section
        section.classList.add('animate-fade-in');
        if (index > 0) {
          section.classList.add(`animate-delay-${Math.min(index, 5)}`);
        }
        this.intersectionObserver.observe(section);
      }
    });

    // Animate project cards with staggered effect
    setTimeout(() => {
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        card.classList.add('animate-slide-up');
        card.classList.add(`animate-delay-${(index % 3) + 1}`);
        this.intersectionObserver.observe(card);
      });
    }, 100);

    // Animate skill buttons
    setTimeout(() => {
      const skillButtons = document.querySelectorAll('.skill-btn');
      skillButtons.forEach((btn, index) => {
        btn.classList.add('animate-scale-in');
        btn.classList.add(`animate-delay-${(index % 5) + 1}`);
        this.intersectionObserver.observe(btn);
      });
    }, 200);

    // Animate filter buttons
    setTimeout(() => {
      const filterButtons = document.querySelectorAll('.filter-btn');
      filterButtons.forEach((btn, index) => {
        btn.classList.add('animate-fade-in');
        btn.classList.add(`animate-delay-${(index % 4) + 1}`);
        this.intersectionObserver.observe(btn);
      });
    }, 300);
  }

  /**
   * Animate an element when it comes into view
   */
  animateElement(element) {
    if (this.prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Add animated class to trigger CSS transition
    element.classList.add('animated');

    // Add enhanced hover effects to interactive elements
    if (element.classList.contains('project-card') || 
        element.classList.contains('skill-btn') ||
        element.classList.contains('filter-btn')) {
      element.classList.add('enhanced-hover');
    }
  }

  /**
   * Show all elements immediately (fallback for no intersection observer)
   */
  showAllElements() {
    const animatableElements = document.querySelectorAll('[class*="animate-"]');
    animatableElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      element.classList.add('animated');
    });
  }

  /**
   * Set up smooth scroll animations
   */
  setupScrollAnimations() {
    // Smooth scrolling is handled by CSS scroll-behavior: smooth
    // Add additional scroll-based animations here if needed
    
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    if (!this.prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }

  /**
   * Update animations based on scroll position
   */
  updateScrollAnimations() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Parallax effect for hero section (subtle)
    const heroSection = document.querySelector('#home');
    if (heroSection && scrollY < windowHeight) {
      const parallaxOffset = scrollY * 0.5;
      heroSection.style.transform = `translateY(${parallaxOffset}px)`;
    }

    // Navbar background opacity based on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      const opacity = Math.min(scrollY / 100, 1);
      navbar.style.backgroundColor = `rgba(0, 0, 0, ${0.8 * opacity})`;
    }
  }

  /**
   * Set up hover effects for project cards and interactive elements
   */
  setupHoverEffects() {
    if (this.isTouch) {
      document.body.classList.add('touch-device');
      return;
    }

    // Enhanced hover effects are handled by CSS classes added during intersection observer
    // Additional JavaScript-based hover effects can be added here

    // Add hover sound effect (optional)
    this.setupHoverSounds();
  }

  /**
   * Set up subtle hover sound effects (optional)
   */
  setupHoverSounds() {
    // This is optional and can be enabled based on user preference
    // For now, we'll skip audio to avoid accessibility issues
  }

  /**
   * Set up technology tag interactions with visual feedback
   */
  setupTechnologyTagInteractions() {
    // Use event delegation for dynamically added elements
    document.addEventListener('mouseenter', (event) => {
      if (event.target.classList.contains('tech-tag')) {
        this.handleTechTagHover(event.target, true);
      }
    }, true);

    document.addEventListener('mouseleave', (event) => {
      if (event.target.classList.contains('tech-tag')) {
        this.handleTechTagHover(event.target, false);
      }
    }, true);

    document.addEventListener('click', (event) => {
      if (event.target.classList.contains('tech-tag')) {
        this.handleTechTagClick(event.target);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.target.classList.contains('tech-tag') && 
          (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        this.handleTechTagClick(event.target);
      }
    });
  }

  /**
   * Handle technology tag hover effects
   */
  handleTechTagHover(tagElement, isHovering) {
    if (this.prefersReducedMotion || this.isTouch) return;

    if (isHovering) {
      tagElement.classList.add('tech-tag-interactive');
      
      // Highlight related technology tags
      const technology = tagElement.dataset.tech;
      if (technology) {
        this.highlightRelatedTags(technology, true);
      }
    } else {
      // Remove highlight from related tags
      const technology = tagElement.dataset.tech;
      if (technology) {
        this.highlightRelatedTags(technology, false);
      }
    }
  }

  /**
   * Handle technology tag click interactions
   */
  handleTechTagClick(tagElement) {
    const technology = tagElement.dataset.tech;
    
    if (!technology) return;

    // Add click animation
    tagElement.classList.add('pulse-on-focus');
    setTimeout(() => {
      tagElement.classList.remove('pulse-on-focus');
    }, 600);

    // Trigger filter if filter system is available
    if (window.portfolioController && window.portfolioController.filterSystem) {
      window.portfolioController.filterSystem.toggleFilter(technology);
    }

    // Provide visual feedback
    this.showTechTagFeedback(tagElement, technology);
  }

  /**
   * Highlight related technology tags
   */
  highlightRelatedTags(technology, highlight) {
    const allTechTags = document.querySelectorAll(`[data-tech="${technology}"]`);
    
    allTechTags.forEach(tag => {
      if (highlight) {
        tag.style.boxShadow = '0 0 10px rgba(13, 110, 253, 0.5)';
        tag.style.borderColor = '#0d6efd';
      } else {
        tag.style.boxShadow = '';
        tag.style.borderColor = '';
      }
    });
  }

  /**
   * Show visual feedback for technology tag interaction
   */
  showTechTagFeedback(tagElement, technology) {
    // Create a temporary tooltip or feedback element
    const feedback = document.createElement('div');
    feedback.className = 'tech-tag-feedback';
    feedback.textContent = `Filtering by ${technology}`;
    feedback.style.cssText = `
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.7rem;
      pointer-events: none;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    const rect = tagElement.getBoundingClientRect();
    feedback.style.left = `${rect.left + rect.width / 2}px`;
    feedback.style.top = `${rect.top - 30}px`;
    feedback.style.transform = 'translateX(-50%)';

    document.body.appendChild(feedback);

    // Animate in
    requestAnimationFrame(() => {
      feedback.style.opacity = '1';
    });

    // Remove after delay
    setTimeout(() => {
      feedback.style.opacity = '0';
      setTimeout(() => {
        if (feedback.parentNode) {
          feedback.parentNode.removeChild(feedback);
        }
      }, 300);
    }, 1500);
  }

  /**
   * Set up reduced motion preference listener
   */
  setupReducedMotionListener() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e) => {
      this.prefersReducedMotion = e.matches;
      
      if (this.prefersReducedMotion) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    };

    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
  }

  /**
   * Disable all animations for reduced motion preference
   */
  disableAnimations() {
    const style = document.createElement('style');
    style.id = 'reduced-motion-override';
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Show all elements immediately
    this.showAllElements();
  }

  /**
   * Re-enable animations when reduced motion preference is turned off
   */
  enableAnimations() {
    const overrideStyle = document.getElementById('reduced-motion-override');
    if (overrideStyle) {
      overrideStyle.remove();
    }

    // Re-initialize intersection observer
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.animatedElements.clear();
      this.setupIntersectionObserver();
    }
  }

  /**
   * Animate new elements added to the DOM
   */
  animateNewElements(container) {
    if (this.prefersReducedMotion) return;

    const newElements = container.querySelectorAll('.project-card, .filter-btn');
    newElements.forEach((element, index) => {
      element.classList.add('animate-fade-in');
      element.classList.add(`animate-delay-${(index % 3) + 1}`);
      
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(element);
      } else {
        // Fallback: animate immediately
        setTimeout(() => {
          this.animateElement(element);
        }, (index % 3 + 1) * 100);
      }
    });
  }

  /**
   * Clean up animation system
   */
  destroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    
    // Remove scroll event listener
    window.removeEventListener('scroll', this.updateScrollAnimations);
    
    // Clean up animation references
    this.animatedElements.clear();
    
    // Remove will-change properties to free up GPU memory
    const animatedElements = document.querySelectorAll('[style*="will-change"]');
    animatedElements.forEach(element => {
      element.style.willChange = 'auto';
    });
    
    // Remove dynamic styles
    const dynamicStyles = document.querySelectorAll('style[data-animation-controller]');
    dynamicStyles.forEach(style => style.remove());
    
    this.isInitialized = false;
  }

  /**
   * Optimize animations for performance
   */
  optimizeForPerformance() {
    // Use requestIdleCallback for non-critical animations
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.setupNonCriticalAnimations();
      });
    } else {
      setTimeout(() => {
        this.setupNonCriticalAnimations();
      }, 100);
    }

    // Monitor frame rate and adjust animations accordingly
    this.monitorPerformance();
  }

  /**
   * Setup non-critical animations during idle time
   */
  setupNonCriticalAnimations() {
    // Add subtle animations that don't affect core functionality
    const decorativeElements = document.querySelectorAll('.badge, .skill-badge');
    decorativeElements.forEach(element => {
      element.style.transition = 'all 0.2s ease';
    });
  }

  /**
   * Monitor animation performance
   */
  monitorPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerformance = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          this.reduceAnimationComplexity();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      if (this.isInitialized) {
        requestAnimationFrame(checkPerformance);
      }
    };

    requestAnimationFrame(checkPerformance);
  }

  /**
   * Reduce animation complexity for better performance
   */
  reduceAnimationComplexity() {
    document.body.classList.add('low-performance');
    
    // Disable complex animations
    const style = document.createElement('style');
    style.setAttribute('data-animation-controller', 'performance');
    style.textContent = `
      .low-performance .enhanced-hover:hover {
        transform: none !important;
        box-shadow: none !important;
      }
      .low-performance .tech-tag-interactive:hover {
        transform: none !important;
      }
      .low-performance .animate-fade-in,
      .low-performance .animate-slide-up {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.AnimationController = AnimationController;
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationController;
}