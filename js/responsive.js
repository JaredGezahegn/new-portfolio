/**
 * Responsive Design Controller
 * Handles responsive behavior, viewport changes, and adaptive layouts
 */

class ResponsiveController {
  constructor() {
    this.breakpoints = {
      mobile: 768,
      tablet: 1200,
      desktop: 1600
    };
    this.currentViewport = this.getViewportCategory();
    this.resizeHandlers = [];
    this.orientationHandlers = [];
    this.isInitialized = false;
  }

  /**
   * Initialize responsive controller
   */
  init() {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.handleInitialLayout();
    this.optimizeForTouch();
    this.setupAccessibilityFeatures();
    this.optimizeForDevice();
    this.isInitialized = true;
    
    console.log('Responsive controller initialized');
  }

  /**
   * Set up event listeners for responsive behavior
   */
  setupEventListeners() {
    // Throttled resize handler
    const throttledResize = throttle(() => {
      this.handleViewportChange();
    }, 250);

    window.addEventListener('resize', throttledResize);
    window.addEventListener('orientationchange', () => {
      // Delay to allow orientation change to complete
      setTimeout(() => {
        this.handleOrientationChange();
      }, 100);
    });

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', this.handleMotionPreferenceChange.bind(this));
  }

  /**
   * Handle viewport size changes
   */
  handleViewportChange() {
    const newViewport = this.getViewportCategory();
    
    if (newViewport !== this.currentViewport) {
      const previousViewport = this.currentViewport;
      this.currentViewport = newViewport;
      
      this.updateLayoutForViewport(newViewport, previousViewport);
      this.notifyResizeHandlers(newViewport, previousViewport);
    }

    this.updateContainerPadding();
    this.adjustProjectCardSizes();
  }

  /**
   * Handle orientation changes
   */
  handleOrientationChange() {
    this.handleViewportChange();
    this.notifyOrientationHandlers();
    
    // Force layout recalculation
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  }

  /**
   * Get current viewport category
   */
  getViewportCategory() {
    const width = window.innerWidth;
    if (width < this.breakpoints.mobile) return 'mobile';
    if (width < this.breakpoints.tablet) return 'tablet';
    if (width < this.breakpoints.desktop) return 'desktop';
    return 'large-desktop';
  }

  /**
   * Update layout based on viewport
   */
  updateLayoutForViewport(newViewport, previousViewport) {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Enhanced grid columns configuration based on viewport
    const columnConfig = {
      'mobile': 1,
      'tablet': 2,
      'desktop': 3,
      'large-desktop': 4
    };

    const columns = columnConfig[newViewport] || 3;
    
    // Apply CSS Grid with improved responsive behavior
    projectsContainer.style.display = 'grid';
    projectsContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    projectsContainer.style.gridAutoRows = 'minmax(auto, 1fr)';
    
    // Enhanced gap configuration for better spacing
    const gapConfig = {
      'mobile': '1.5rem',
      'tablet': '2rem',
      'desktop': '2.5rem',
      'large-desktop': '2.5rem'
    };

    projectsContainer.style.gap = gapConfig[newViewport] || '2rem';
    
    // Ensure proper alignment and distribution
    projectsContainer.style.alignItems = 'stretch';
    projectsContainer.style.justifyItems = 'stretch';
    
    // Add responsive class for CSS targeting
    projectsContainer.className = `projects-grid viewport-${newViewport}`;

    // Update container max-width for large screens
    if (newViewport === 'large-desktop') {
      projectsContainer.style.maxWidth = '1800px';
      projectsContainer.style.margin = '0 auto';
    } else {
      projectsContainer.style.maxWidth = '';
      projectsContainer.style.margin = '';
    }

    // Dispatch custom event for other components
    document.dispatchEvent(new CustomEvent('viewportChanged', {
      detail: { newViewport, previousViewport, columns }
    }));
  }

  /**
   * Update container padding based on viewport
   */
  updateContainerPadding() {
    const containers = document.querySelectorAll('.container');
    const viewport = this.currentViewport;
    
    // Enhanced padding configuration for better spacing
    const paddingConfig = {
      'mobile': '1rem',
      'tablet': '1.5rem',
      'desktop': '2rem',
      'large-desktop': '2rem'
    };

    const padding = paddingConfig[viewport] || '1.5rem';
    
    containers.forEach(container => {
      container.style.paddingLeft = padding;
      container.style.paddingRight = padding;
    });

    // Update projects container specific padding
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
      const projectsPaddingConfig = {
        'mobile': '0 1rem',
        'tablet': '0 1.5rem',
        'desktop': '0 2rem',
        'large-desktop': '0 2rem'
      };
      
      const projectsPadding = projectsPaddingConfig[viewport] || '0 1.5rem';
      projectsContainer.style.padding = projectsPadding;
    }
  }

  /**
   * Adjust project card sizes based on viewport
   */
  adjustProjectCardSizes() {
    const projectCards = document.querySelectorAll('.project-card');
    const viewport = this.currentViewport;
    
    // Enhanced height configuration for better card proportions
    const heightConfig = {
      'mobile': '450px',
      'tablet': '520px',
      'desktop': '550px',
      'large-desktop': '550px'
    };

    const imageHeightConfig = {
      'mobile': '180px',
      'tablet': '190px',
      'desktop': '200px',
      'large-desktop': '200px'
    };

    const minHeight = heightConfig[viewport] || '520px';
    const imageHeight = imageHeightConfig[viewport] || '190px';

    projectCards.forEach(card => {
      // Set consistent card height
      card.style.minHeight = minHeight;
      card.style.height = '100%';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      
      // Ensure card body takes remaining space
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        cardBody.style.flex = '1';
        cardBody.style.display = 'flex';
        cardBody.style.flexDirection = 'column';
      }
      
      // Adjust image height
      const image = card.querySelector('.card-img-top');
      if (image) {
        image.style.height = imageHeight;
        image.style.objectFit = 'cover';
        image.style.width = '100%';
      }

      // Ensure proper spacing for card content
      const cardText = card.querySelector('.card-text');
      if (cardText) {
        cardText.style.flex = '1';
      }
    });
  }

  /**
   * Handle initial layout setup
   */
  handleInitialLayout() {
    this.updateLayoutForViewport(this.currentViewport, null);
    this.updateContainerPadding();
    this.adjustProjectCardSizes();
  }

  /**
   * Optimize interface for touch devices
   */
  optimizeForTouch() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
      
      // Enhanced touch target sizes for better accessibility
      const touchTargets = document.querySelectorAll('.tech-tag, .filter-btn, .btn, .nav-link, .navbar-toggler');
      touchTargets.forEach(target => {
        const currentHeight = parseInt(getComputedStyle(target).minHeight) || 0;
        const currentWidth = parseInt(getComputedStyle(target).minWidth) || 0;
        
        // Ensure minimum 44px touch targets (WCAG AA standard)
        if (currentHeight < 44) {
          target.style.minHeight = '44px';
        }
        if (currentWidth < 44 && !target.classList.contains('btn-block')) {
          target.style.minWidth = '44px';
        }
        
        // Add proper padding for touch targets
        if (target.classList.contains('tech-tag')) {
          target.style.padding = '0.5rem 0.75rem';
          target.style.display = 'inline-flex';
          target.style.alignItems = 'center';
          target.style.justifyContent = 'center';
        }
        
        if (target.classList.contains('filter-btn')) {
          target.style.padding = '0.5rem 1rem';
          target.style.fontSize = '0.9rem';
        }
      });

      // Add touch-specific event handlers
      this.setupTouchHandlers();
      
      // Optimize scrolling for touch devices
      this.optimizeTouchScrolling();
    }
  }

  /**
   * Setup touch-specific event handlers
   */
  setupTouchHandlers() {
    // Enhanced touch feedback for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('touchstart', (e) => {
        card.style.transform = 'scale(0.98)';
        card.style.transition = 'transform 0.1s ease';
      }, { passive: true });
      
      card.addEventListener('touchend', () => {
        setTimeout(() => {
          card.style.transform = '';
          card.style.transition = 'transform 0.3s ease';
        }, 150);
      }, { passive: true });
      
      card.addEventListener('touchcancel', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.3s ease';
      }, { passive: true });
    });

    // Enhanced touch feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.tech-tag, .filter-btn, .btn');
    
    interactiveElements.forEach(element => {
      element.addEventListener('touchstart', (e) => {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
      }, { passive: true });
      
      element.addEventListener('touchend', () => {
        setTimeout(() => {
          element.style.transform = '';
          element.style.transition = 'transform 0.2s ease';
        }, 100);
      }, { passive: true });
      
      element.addEventListener('touchcancel', () => {
        element.style.transform = '';
        element.style.transition = 'transform 0.2s ease';
      }, { passive: true });
    });
  }

  /**
   * Optimize scrolling behavior for touch devices
   */
  optimizeTouchScrolling() {
    // Enable smooth scrolling with momentum on iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Prevent zoom on double tap for better UX
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    // Optimize scroll performance
    const scrollElements = document.querySelectorAll('.projects-grid, .container');
    scrollElements.forEach(element => {
      element.style.scrollBehavior = 'smooth';
    });
  }

  /**
   * Setup accessibility features
   */
  setupAccessibilityFeatures() {
    // Enhanced focus management
    this.setupFocusManagement();
    
    // Keyboard navigation
    this.setupKeyboardNavigation();
    
    // Screen reader announcements
    this.setupScreenReaderSupport();
  }

  /**
   * Setup focus management for better accessibility
   */
  setupFocusManagement() {
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
      element.addEventListener('focus', (e) => {
        e.target.classList.add('focused');
      });

      element.addEventListener('blur', (e) => {
        e.target.classList.remove('focused');
      });
    });
  }

  /**
   * Setup keyboard navigation
   */
  setupKeyboardNavigation() {
    // Arrow key navigation for technology tags
    const techTags = document.querySelectorAll('.tech-tag');
    
    techTags.forEach((tag, index) => {
      tag.addEventListener('keydown', (e) => {
        let targetIndex;
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            targetIndex = (index + 1) % techTags.length;
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            targetIndex = (index - 1 + techTags.length) % techTags.length;
            break;
          case 'Home':
            targetIndex = 0;
            break;
          case 'End':
            targetIndex = techTags.length - 1;
            break;
          default:
            return;
        }
        
        e.preventDefault();
        techTags[targetIndex].focus();
      });
    });
  }

  /**
   * Setup screen reader support
   */
  setupScreenReaderSupport() {
    // Create live region for dynamic announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }

  /**
   * Announce message to screen readers
   */
  announceToScreenReader(message) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
      
      // Clear after announcement
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }

  /**
   * Handle motion preference changes
   */
  handleMotionPreferenceChange(e) {
    const prefersReducedMotion = e.matches;
    document.body.classList.toggle('reduce-motion', prefersReducedMotion);
    
    if (prefersReducedMotion) {
      // Disable animations
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      style.id = 'reduced-motion-styles';
      document.head.appendChild(style);
    } else {
      // Re-enable animations
      const existingStyle = document.getElementById('reduced-motion-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  }

  /**
   * Register resize handler
   */
  onResize(handler) {
    this.resizeHandlers.push(handler);
  }

  /**
   * Register orientation change handler
   */
  onOrientationChange(handler) {
    this.orientationHandlers.push(handler);
  }

  /**
   * Notify resize handlers
   */
  notifyResizeHandlers(newViewport, previousViewport) {
    this.resizeHandlers.forEach(handler => {
      try {
        handler(newViewport, previousViewport);
      } catch (error) {
        console.error('Error in resize handler:', error);
      }
    });
  }

  /**
   * Notify orientation change handlers
   */
  notifyOrientationHandlers() {
    this.orientationHandlers.forEach(handler => {
      try {
        handler(this.currentViewport);
      } catch (error) {
        console.error('Error in orientation handler:', error);
      }
    });
  }

  /**
   * Get current breakpoint info
   */
  getCurrentBreakpoint() {
    return {
      viewport: this.currentViewport,
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: this.currentViewport === 'mobile',
      isTablet: this.currentViewport === 'tablet',
      isDesktop: this.currentViewport === 'desktop' || this.currentViewport === 'large-desktop'
    };
  }

  /**
   * Check if device supports hover
   */
  supportsHover() {
    return window.matchMedia('(hover: hover)').matches;
  }

  /**
   * Check if device has coarse pointer (touch)
   */
  hasCoarsePointer() {
    return window.matchMedia('(pointer: coarse)').matches;
  }

  /**
   * Destroy responsive controller
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('resize', this.handleViewportChange);
    window.removeEventListener('orientationchange', this.handleOrientationChange);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.removeEventListener('change', this.handleMotionPreferenceChange);
    
    // Clean up handlers
    this.resizeHandlers = [];
    this.orientationHandlers = [];
    
    // Remove performance monitoring styles
    const performanceStyles = document.getElementById('reduced-motion-styles');
    if (performanceStyles) {
      performanceStyles.remove();
    }
    
    // Clean up live region
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.remove();
    }
    
    this.isInitialized = false;
  }

  /**
   * Optimize performance for current device
   */
  optimizeForDevice() {
    // Check device capabilities
    const isLowEndDevice = this.detectLowEndDevice();
    
    if (isLowEndDevice) {
      document.body.classList.add('low-end-device');
      this.applyLowEndOptimizations();
    }

    // Optimize based on connection speed
    this.optimizeForConnection();
  }

  /**
   * Detect low-end devices
   */
  detectLowEndDevice() {
    // Check for indicators of low-end devices
    const indicators = {
      lowMemory: navigator.deviceMemory && navigator.deviceMemory < 4,
      slowCPU: navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4,
      slowConnection: navigator.connection && navigator.connection.effectiveType === 'slow-2g',
      oldBrowser: this.isOldBrowser()
    };

    return Object.values(indicators).some(indicator => indicator);
  }

  /**
   * Check if browser is old/unsupported
   */
  isOldBrowser() {
    // Check for modern features
    const modernFeatures = [
      'IntersectionObserver',
      'requestIdleCallback',
      'CSS.supports'
    ];

    return modernFeatures.some(feature => !(feature in window));
  }

  /**
   * Apply optimizations for low-end devices
   */
  applyLowEndOptimizations() {
    const style = document.createElement('style');
    style.id = 'low-end-optimizations';
    style.textContent = `
      .low-end-device .project-card:hover {
        transform: none !important;
      }
      
      .low-end-device .enhanced-hover:hover {
        transform: translateY(-2px) !important;
      }
      
      .low-end-device .tech-tag:hover {
        transform: none !important;
      }
      
      .low-end-device .animate-fade-in,
      .low-end-device .animate-slide-up {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Optimize for connection speed
   */
  optimizeForConnection() {
    if (navigator.connection) {
      const connection = navigator.connection;
      
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Disable non-essential features for slow connections
        document.body.classList.add('slow-connection');
        
        // Reduce image quality or disable lazy loading
        const images = document.querySelectorAll('.lazy-load');
        images.forEach(img => {
          img.loading = 'eager'; // Load immediately for slow connections
        });
      }
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ResponsiveController;
}