/**
 * Main Portfolio Controller
 * Manages the overall portfolio functionality and coordinates between modules
 */

class PortfolioController {
  constructor() {
    this.projects = PROJECTS_DATA;
    this.skills = SKILLS_DATA;
    this.currentFilters = new Set();
    this.filterSystem = null;
    this.responsiveController = null;
    this.animationController = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the portfolio system
   */
  init() {
    if (this.isInitialized) return;
    
    try {
      this.setupEventListeners();
      this.renderProjects();
      this.renderSkills();
      this.updateProjectCount();
      this.initializeFilterSystem();
      this.initializeResponsiveController();
      this.initializeAnimationController();
      this.initializeLazyLoading();
      this.optimizePerformance();
      this.isInitialized = true;
      console.log('Portfolio system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize portfolio:', error);
    }
  }

  /**
   * Initialize the filter system
   */
  initializeFilterSystem() {
    if (typeof FilterSystem !== 'undefined') {
      this.filterSystem = new FilterSystem(this);
      this.filterSystem.init();
    } else {
      console.warn('FilterSystem not available');
    }
  }

  /**
   * Initialize the responsive controller
   */
  initializeResponsiveController() {
    if (typeof ResponsiveController !== 'undefined') {
      this.responsiveController = new ResponsiveController();
      this.responsiveController.init();
      
      // Register for viewport change notifications
      this.responsiveController.onResize((newViewport, previousViewport) => {
        this.handleViewportChange(newViewport, previousViewport);
      });
    } else {
      console.warn('ResponsiveController not available');
    }
  }

  /**
   * Initialize the animation controller
   */
  initializeAnimationController() {
    if (typeof AnimationController !== 'undefined') {
      this.animationController = new AnimationController();
      this.animationController.init();
    } else {
      console.warn('AnimationController not available');
    }
  }

  /**
   * Handle viewport changes
   */
  handleViewportChange(newViewport, previousViewport) {
    // Re-render projects if needed for new viewport
    if (previousViewport && newViewport !== previousViewport) {
      this.optimizeProjectsForViewport(newViewport);
    }
  }

  /**
   * Optimize projects display for current viewport
   */
  optimizeProjectsForViewport(viewport) {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Adjust image loading strategy based on viewport
      const img = card.querySelector('.card-img-top');
      if (img && viewport === 'mobile') {
        // Optimize images for mobile
        img.loading = 'lazy';
      }
      
      // Adjust feature list display
      const featuresList = card.querySelector('.features-list');
      if (featuresList) {
        const features = featuresList.querySelectorAll('li');
        const maxFeatures = viewport === 'mobile' ? 2 : 4;
        
        features.forEach((feature, index) => {
          feature.style.display = index < maxFeatures ? 'block' : 'none';
        });
      }
    });
  }

  /**
   * Set up event listeners for portfolio interactions
   */
  setupEventListeners() {
    // Theme toggle (existing functionality)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', this.handleThemeToggle.bind(this));
    }

    // Contact form (existing functionality)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
      contactForm.addEventListener('submit', this.handleContactForm.bind(this));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
    });
  }

  /**
   * Render all projects in the projects section
   */
  renderProjects() {
    const projectsContainer = document.querySelector('#projects-container');
    if (!projectsContainer) {
      console.error('Projects container not found');
      return;
    }

    // Clear existing projects
    projectsContainer.innerHTML = '';

    // Render each project
    this.projects.forEach(project => {
      const projectElement = this.createProjectCard(project);
      projectsContainer.appendChild(projectElement);
    });

    // Initialize lazy loading for new images
    if (this.lazyImageObserver) {
      this.observeLazyImages();
    }

    // Trigger animations for new projects if animation controller is available
    if (this.animationController) {
      setTimeout(() => {
        this.animationController.animateNewElements(projectsContainer);
      }, 100);
    }
  }

  /**
   * Create a project card element with enhanced responsive layout and error handling
   */
  createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card-wrapper';
    
    // Validate project data and provide fallbacks
    const safeProject = this.validateProjectData(project);
    
    const liveUrlButton = safeProject.liveUrl 
      ? `<a href="${safeProject.liveUrl}" 
           class="btn btn-primary btn-sm me-2" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="View live demo of ${safeProject.title}">
           <i class="bi bi-eye" aria-hidden="true"></i> Live Demo
         </a>`
      : '';

    const statusBadge = this.getStatusBadge(safeProject.status);
    const collaborationBadge = this.getCollaborationBadge(safeProject.collaboration);
    const categoryBadge = this.getCategoryBadge(safeProject.category);
    const deploymentInfo = this.getDeploymentInfo(safeProject.deploymentPlatform);
    const contributionsInfo = this.getIndividualContributions(safeProject.collaboration);

    projectCard.innerHTML = `
      <div class="card h-100 project-card" 
           data-project-id="${safeProject.id}" 
           role="article" 
           aria-labelledby="project-title-${safeProject.id}"
           tabindex="0">
        <!-- Project Image Placeholder -->
        <div class="position-relative">
          <div class="image-placeholder" style="height: 220px;" role="img" aria-label="Project placeholder">
            <i class="bi bi-code-square" style="font-size: 3rem;" aria-hidden="true"></i>
            <br>
            <small class="text-muted">${safeProject.category}</small>
          </div>
          <div class="position-absolute top-0 end-0 p-2">
            ${statusBadge}
          </div>
        </div>
        
        <div class="card-body d-flex flex-column">
          <!-- Project Header -->
          <div class="mb-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="card-title mb-0" id="project-title-${safeProject.id}">${safeProject.title}</h5>
              ${categoryBadge}
            </div>
            ${collaborationBadge}
          </div>

          <!-- Project Description -->
          <div class="mb-3">
            <p class="card-text text-muted small">${safeProject.description}</p>
          </div>

          <!-- Technology Stack -->
          <div class="mb-3">
            <h6 class="text-muted small mb-2">
              <i class="bi bi-tools" aria-hidden="true"></i> Tech Stack
            </h6>
            <div class="technology-tags" role="list" aria-label="Technologies used in ${safeProject.title}">
              ${this.renderTechnologyTags(safeProject.technologies)}
            </div>
          </div>

          <!-- Individual Contributions -->
          ${contributionsInfo}

          <!-- Deployment Info -->
          ${deploymentInfo}

          <!-- Action Buttons -->
          <div class="mt-auto pt-3 text-center border-top">
            ${liveUrlButton}
            <a href="${safeProject.githubUrl}" 
               class="btn btn-outline-secondary btn-sm" 
               target="_blank" 
               rel="noopener noreferrer"
               aria-label="View source code for ${safeProject.title} on GitHub">
              <i class="bi bi-github" aria-hidden="true"></i> Code
            </a>
          </div>
        </div>
      </div>
    `;

    // Add keyboard navigation support
    this.addKeyboardNavigation(projectCard);

    return projectCard;
  }

  /**
   * Validate project data and provide safe fallbacks
   */
  validateProjectData(project) {
    if (!project || typeof project !== 'object') {
      console.warn('Invalid project data provided, using fallback');
      return this.getProjectFallback();
    }

    return {
      id: project.id || `project-${Date.now()}`,
      title: project.title || 'Untitled Project',
      description: project.description || 'No description available.',
      image: project.image || this.getPlaceholderImage(),
      liveUrl: this.validateUrl(project.liveUrl),
      githubUrl: this.validateUrl(project.githubUrl) || '#',
      technologies: Array.isArray(project.technologies) ? project.technologies : ['Unknown'],
      category: project.category || 'Web Application',
      status: project.status || 'Unknown',
      collaboration: project.collaboration || { isCollaborative: false, role: 'Solo Developer' },
      timeline: project.timeline || null,
      features: Array.isArray(project.features) ? project.features : [],
      deploymentPlatform: project.deploymentPlatform || null
    };
  }

  /**
   * Get fallback project data for error cases
   */
  getProjectFallback() {
    return {
      id: 'fallback-project',
      title: 'Project Data Unavailable',
      description: 'This project\'s information could not be loaded.',
      image: this.getPlaceholderImage(),
      liveUrl: null,
      githubUrl: '#',
      technologies: ['Unknown'],
      category: 'Web Application',
      status: 'Unknown',
      collaboration: { isCollaborative: false, role: 'Solo Developer' },
      timeline: null,
      features: [],
      deploymentPlatform: null
    };
  }

  /**
   * Get placeholder image for missing project images
   */
  getPlaceholderImage() {
    // SVG placeholder image as data URI
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyMCIgdmlld0JveD0iMCAwIDQwMCAyMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjIwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Ik0yMDAgODBjMjIuMDkxIDAgNDAgMTcuOTA5IDQwIDQwcy0xNy45MDkgNDAtNDAgNDAtNDAtMTcuOTA5LTQwLTQwIDE3LjkwOS00MCA0MC00MHptMCA2MGMtMTEuMDQ2IDAtMjAgOC45NTQtMjAgMjBzOC45NTQgMjAgMjAgMjAgMjAtOC45NTQgMjAtMjAtOC45NTQtMjAtMjAtMjB6IiBmaWxsPSIjOWNhM2FmIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjc3NDgxIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCI+UHJvamVjdCBJbWFnZTwvdGV4dD4KPC9zdmc+';
  }

  /**
   * Validate URL and return safe URL or null
   */
  validateUrl(url) {
    if (!url || typeof url !== 'string') return null;
    
    try {
      // Check if it's a valid URL
      new URL(url);
      return url;
    } catch (error) {
      console.warn(`Invalid URL provided: ${url}`);
      return null;
    }
  }

  /**
   * Add keyboard navigation support to project cards
   */
  addKeyboardNavigation(projectCard) {
    const card = projectCard.querySelector('.project-card');
    if (!card) return;

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        
        // Find the primary action button (live demo or GitHub)
        const liveButton = card.querySelector('.btn-primary');
        const githubButton = card.querySelector('.btn-outline-secondary');
        
        if (liveButton) {
          liveButton.click();
        } else if (githubButton) {
          githubButton.click();
        }
      }
    });

    // Add focus management
    card.addEventListener('focus', () => {
      card.classList.add('keyboard-navigation');
    });

    card.addEventListener('blur', () => {
      card.classList.remove('keyboard-navigation');
    });
  }

  /**
   * Render technology tags for a project with enhanced styling and accessibility
   */
  renderTechnologyTags(technologies) {
    return technologies.map(tech => {
      const techClass = this.getTechnologyClass(tech);
      return `<span class="badge ${techClass} me-1 mb-1 tech-tag" 
                    data-tech="${tech}" 
                    role="listitem" 
                    tabindex="0"
                    aria-label="Technology: ${tech}">${tech}</span>`;
    }).join('');
  }

  /**
   * Get appropriate CSS class for technology badge
   */
  getTechnologyClass(tech) {
    const techClasses = {
      'React': 'bg-info',
      'JavaScript': 'bg-warning text-dark',
      'Python': 'bg-success',
      'HTML': 'bg-danger',
      'CSS': 'bg-primary',
      'Bootstrap': 'bg-secondary',
      'Tailwind CSS': 'bg-info',
      'PostgreSQL': 'bg-dark',
      'Supabase': 'bg-success',
      'Netlify': 'bg-primary',
      'Render': 'bg-dark',
      'GitHub Pages': 'bg-secondary',
      'API Integration': 'bg-warning text-dark',
      'Telegram API': 'bg-info',
      'OMDB API': 'bg-warning text-dark',
      'REST APIs': 'bg-secondary'
    };
    
    return techClasses[tech] || 'bg-secondary';
  }

  /**
   * Get status badge HTML with enhanced styling
   */
  getStatusBadge(status) {
    const badgeConfig = {
      'Completed': { class: 'bg-success', icon: 'check-circle' },
      'In Progress': { class: 'bg-warning text-dark', icon: 'clock' },
      'Deployed': { class: 'bg-primary', icon: 'cloud-check' }
    };
    
    const config = badgeConfig[status] || { class: 'bg-secondary', icon: 'question-circle' };
    return `<span class="badge ${config.class}">
              <i class="bi bi-${config.icon}"></i> ${status}
            </span>`;
  }

  /**
   * Get collaboration badge HTML with enhanced team information
   */
  getCollaborationBadge(collaboration) {
    if (!collaboration || !collaboration.isCollaborative) {
      return `<div class="collaboration-info mb-2">
                <span class="badge bg-secondary me-2">
                  <i class="bi bi-person"></i> Solo Project
                </span>
                <small class="text-muted">Individual Development</small>
              </div>`;
    }

    const teamInfo = collaboration.teamSize 
      ? `Team of ${collaboration.teamSize}` 
      : 'Collaborative';

    return `<div class="collaboration-info mb-2">
              <span class="badge bg-info me-2">
                <i class="bi bi-people"></i> ${teamInfo}
              </span>
              <small class="text-muted d-block">Role: ${collaboration.role}</small>
            </div>`;
  }

  /**
   * Get timeline information HTML
   */
  getTimelineInfo(timeline) {
    if (!timeline) return '';

    const timelineIcon = this.getTimelineIcon(timeline.developmentPhase);
    const durationText = timeline.endDate 
      ? `${timeline.duration}` 
      : `${timeline.duration}`;

    const dateRange = timeline.endDate 
      ? `${timeline.startDate} - ${timeline.endDate}`
      : `${timeline.startDate} - Present`;

    return `<div class="timeline-info mb-3">
              <h6 class="text-muted small mb-2">
                <i class="bi bi-clock-history"></i> Timeline
              </h6>
              <div class="timeline-details">
                <div class="d-flex align-items-center mb-1">
                  <span class="badge bg-outline-primary me-2">
                    ${timelineIcon} ${timeline.developmentPhase}
                  </span>
                </div>
                <small class="text-muted d-block">
                  <i class="bi bi-calendar3"></i> ${dateRange}
                </small>
                <small class="text-muted d-block">
                  <i class="bi bi-stopwatch"></i> Duration: ${durationText}
                </small>
              </div>
            </div>`;
  }

  /**
   * Get timeline icon based on development phase
   */
  getTimelineIcon(phase) {
    const icons = {
      'Completed': '<i class="bi bi-check-circle-fill text-success"></i>',
      'Deployed': '<i class="bi bi-cloud-check-fill text-primary"></i>',
      'Active Development': '<i class="bi bi-gear-fill text-warning"></i>',
      'Planning': '<i class="bi bi-lightbulb-fill text-info"></i>'
    };
    return icons[phase] || '<i class="bi bi-circle text-secondary"></i>';
  }

  /**
   * Get individual contributions HTML
   */
  getIndividualContributions(collaboration) {
    if (!collaboration || !collaboration.individualContributions || collaboration.individualContributions.length === 0) {
      return '';
    }

    const contributionsList = collaboration.individualContributions.slice(0, 3).map(contribution => 
      `<li class="small text-muted">
         <i class="bi bi-arrow-right text-primary"></i> ${contribution}
       </li>`
    ).join('');

    const moreContributions = collaboration.individualContributions.length > 3 
      ? `<li class="small text-muted">
           <i class="bi bi-plus"></i> +${collaboration.individualContributions.length - 3} more contributions
         </li>` 
      : '';

    return `<div class="contributions-info mb-3">
              <h6 class="text-muted small mb-2">
                <i class="bi bi-person-check"></i> My Contributions
              </h6>
              <ul class="list-unstyled mb-0 contributions-list">
                ${contributionsList}
                ${moreContributions}
              </ul>
            </div>`;
  }
  getCategoryBadge(category) {
    const categoryConfig = {
      'Web Application': { class: 'bg-primary', icon: 'globe' },
      'Static Website': { class: 'bg-secondary', icon: 'file-earmark-code' },
      'Bot Application': { class: 'bg-success', icon: 'robot' }
    };
    
    const config = categoryConfig[category] || { class: 'bg-secondary', icon: 'folder' };
    return `<span class="badge ${config.class} category-badge">
              <i class="bi bi-${config.icon}"></i> ${category}
            </span>`;
  }

  /**
   * Render project features
   */
  renderFeatures(features) {
    if (!features || features.length === 0) return '';

    const featuresList = features.slice(0, 4).map(feature => 
      `<li class="small text-muted">
         <i class="bi bi-check2 text-success"></i> ${feature}
       </li>`
    ).join('');

    const moreFeatures = features.length > 4 
      ? `<li class="small text-muted">
           <i class="bi bi-plus"></i> +${features.length - 4} more features
         </li>` 
      : '';

    return `<div class="mb-3">
              <h6 class="text-muted small mb-2">
                <i class="bi bi-star"></i> Key Features
              </h6>
              <ul class="list-unstyled mb-0 features-list">
                ${featuresList}
                ${moreFeatures}
              </ul>
            </div>`;
  }

  /**
   * Get deployment information
   */
  getDeploymentInfo(deploymentPlatform) {
    if (!deploymentPlatform) return '';

    const platformConfig = {
      'Netlify': { class: 'text-info', icon: 'cloud-arrow-up' },
      'Render': { class: 'text-success', icon: 'server' },
      'GitHub Pages': { class: 'text-secondary', icon: 'github' },
      'Vercel': { class: 'text-dark', icon: 'lightning' }
    };

    const config = platformConfig[deploymentPlatform] || { class: 'text-muted', icon: 'cloud' };

    return `<div class="deployment-info mb-2">
              <small class="${config.class}">
                <i class="bi bi-${config.icon}"></i> Deployed on ${deploymentPlatform}
              </small>
            </div>`;
  }

  /**
   * Render enhanced skills section with categorization and proficiency levels
   */
  renderSkills() {
    const skillsContainer = document.querySelector('#skills-container');
    if (!skillsContainer) return;

    // Clear existing skills
    skillsContainer.innerHTML = '';

    // Create skills section with enhanced categorization
    const skillsSection = this.createEnhancedSkillsSection();
    skillsContainer.appendChild(skillsSection);
  }

  /**
   * Create enhanced skills section with categories and proficiency levels
   */
  createEnhancedSkillsSection() {
    const skillsWrapper = document.createElement('div');
    skillsWrapper.className = 'skills-wrapper mt-4';
    skillsWrapper.setAttribute('role', 'region');
    skillsWrapper.setAttribute('aria-label', 'Technical Skills');

    // Add skills title
    const skillsTitle = document.createElement('h6');
    skillsTitle.className = 'text-muted mb-3';
    skillsTitle.innerHTML = '<i class="bi bi-tools"></i> Technical Skills';
    skillsWrapper.appendChild(skillsTitle);

    // Get synchronized skills from projects
    const synchronizedSkills = this.getSynchronizedSkills();

    // Create skills categories container
    const categoriesContainer = document.createElement('div');
    categoriesContainer.className = 'skills-categories';

    // Render each skill category
    Object.entries(synchronizedSkills).forEach(([category, skills]) => {
      if (skills.length > 0) {
        const categorySection = this.createSkillCategory(category, skills);
        categoriesContainer.appendChild(categorySection);
      }
    });

    skillsWrapper.appendChild(categoriesContainer);
    return skillsWrapper;
  }

  /**
   * Create a skill category section with proficiency indicators
   */
  createSkillCategory(categoryName, skills) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category mb-3';

    // Category title
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'skill-category-title mb-2';
    categoryTitle.innerHTML = `
      <small class="text-muted fw-semibold">
        ${this.getCategoryIcon(categoryName)} ${categoryName}
      </small>
    `;
    categoryDiv.appendChild(categoryTitle);

    // Skills container
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skill-tags d-flex flex-wrap gap-2';
    skillsContainer.setAttribute('role', 'list');
    skillsContainer.setAttribute('aria-label', `${categoryName} skills`);

    // Render each skill with proficiency indicator
    skills.forEach(skill => {
      const skillElement = this.createSkillElement(skill, categoryName);
      skillsContainer.appendChild(skillElement);
    });

    categoryDiv.appendChild(skillsContainer);
    return categoryDiv;
  }

  /**
   * Create individual skill element with proficiency indicator and accessibility
   */
  createSkillElement(skill, category) {
    const skillElement = document.createElement('span');
    const proficiency = this.getSkillProficiency(skill.name || skill);
    const skillClass = this.getTechnologyClass(skill.name || skill);
    
    skillElement.className = `badge ${skillClass} skill-badge position-relative`;
    skillElement.setAttribute('data-skill', skill.name || skill);
    skillElement.setAttribute('data-category', category);
    skillElement.setAttribute('role', 'listitem');
    skillElement.setAttribute('tabindex', '0');
    skillElement.setAttribute('aria-label', `${skill.name || skill} - ${proficiency.level} proficiency. Click to filter projects.`);
    skillElement.setAttribute('title', `${skill.name || skill} - ${proficiency.description}`);

    // Skill content with icon and proficiency indicator
    const skillIcon = skill.icon ? `<i class="bi ${skill.icon} me-1" aria-hidden="true"></i>` : '';
    const skillName = skill.name || skill;
    
    skillElement.innerHTML = `
      ${skillIcon}
      <span class="skill-name">${skillName}</span>
      <span class="skill-proficiency-indicator ms-1" aria-hidden="true">
        ${this.getProficiencyIndicator(proficiency.level)}
      </span>
    `;

    // Add click handler for filtering (if filter system is available)
    skillElement.addEventListener('click', () => {
      if (this.filterSystem && typeof this.filterSystem.toggleFilter === 'function') {
        this.filterSystem.toggleFilter(skillName);
        this.announceFilterChange(skillName, true);
      }
    });

    // Add keyboard support
    skillElement.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        skillElement.click();
      }
    });

    // Add focus management
    skillElement.addEventListener('focus', () => {
      skillElement.classList.add('keyboard-navigation');
    });

    skillElement.addEventListener('blur', () => {
      skillElement.classList.remove('keyboard-navigation');
    });

    return skillElement;
  }

  /**
   * Announce filter changes to screen readers
   */
  announceFilterChange(filter, isActive) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = isActive 
      ? `Filter applied: ${filter}` 
      : `Filter removed: ${filter}`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }

  /**
   * Get synchronized skills from project data with automatic categorization
   */
  getSynchronizedSkills() {
    // Start with base skills structure
    const synchronizedSkills = {
      'Frontend': new Set(),
      'Styling': new Set(),
      'Programming': new Set(),
      'Database': new Set(),
      'Deployment': new Set(),
      'APIs': new Set()
    };

    // Add skills from SKILLS_DATA (now with icons)
    Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
      if (synchronizedSkills[category]) {
        skills.forEach(skill => {
          // Handle both old format (string) and new format (object with icon)
          if (typeof skill === 'string') {
            synchronizedSkills[category].add(skill);
          } else {
            synchronizedSkills[category].add(skill);
          }
        });
      }
    });

    // Automatically add technologies from projects (as strings for backward compatibility)
    this.projects.forEach(project => {
      project.technologies.forEach(tech => {
        const category = this.categorizeSkill(tech);
        if (synchronizedSkills[category]) {
          // Check if skill already exists as object, if not add as string
          const existingSkill = Array.from(synchronizedSkills[category]).find(skill => 
            (typeof skill === 'string' ? skill : skill.name) === tech
          );
          if (!existingSkill) {
            synchronizedSkills[category].add(tech);
          }
        }
      });
    });

    // Convert Sets to sorted arrays
    const result = {};
    Object.entries(synchronizedSkills).forEach(([category, skillsSet]) => {
      result[category] = Array.from(skillsSet).sort((a, b) => {
        const nameA = typeof a === 'string' ? a : a.name;
        const nameB = typeof b === 'string' ? b : b.name;
        return nameA.localeCompare(nameB);
      });
    });

    return result;
  }

  /**
   * Automatically categorize a skill based on its name
   */
  categorizeSkill(skill) {
    const categoryMappings = {
      'Frontend': ['React', 'JavaScript', 'HTML', 'CSS'],
      'Styling': ['Bootstrap', 'Tailwind CSS', 'Tailwind'],
      'Programming': ['Python'],
      'Database': ['PostgreSQL', 'Supabase'],
      'Deployment': ['Netlify', 'Render', 'GitHub Pages'],
      'APIs': ['REST APIs', 'Telegram API', 'OMDB API', 'API Integration', 'Telegram Bot API']
    };

    for (const [category, skills] of Object.entries(categoryMappings)) {
      if (skills.includes(skill)) {
        return category;
      }
    }

    // Default categorization based on common patterns
    if (skill.toLowerCase().includes('api')) return 'APIs';
    if (skill.toLowerCase().includes('css') || skill.toLowerCase().includes('style')) return 'Styling';
    if (skill.toLowerCase().includes('deploy') || skill.toLowerCase().includes('host')) return 'Deployment';
    if (skill.toLowerCase().includes('database') || skill.toLowerCase().includes('sql')) return 'Database';
    
    return 'Frontend'; // Default category
  }

  /**
   * Get skill proficiency level based on project usage
   */
  getSkillProficiency(skill) {
    const skillName = typeof skill === 'string' ? skill : skill.name;
    const projectsUsingSkill = this.projects.filter(project => 
      project.technologies.includes(skillName)
    ).length;

    const deployedProjectsUsingSkill = this.projects.filter(project => 
      project.technologies.includes(skillName) && project.liveUrl
    ).length;

    // Calculate proficiency based on usage and deployment
    if (projectsUsingSkill >= 3 || deployedProjectsUsingSkill >= 2) {
      return {
        level: 'advanced',
        description: 'Advanced - Used in multiple projects'
      };
    } else if (projectsUsingSkill >= 2 || deployedProjectsUsingSkill >= 1) {
      return {
        level: 'intermediate',
        description: 'Intermediate - Used in several projects'
      };
    } else {
      return {
        level: 'beginner',
        description: 'Beginner - Learning and exploring'
      };
    }
  }

  /**
   * Get proficiency indicator visual element
   */
  getProficiencyIndicator(level) {
    const indicators = {
      'advanced': '●●●',
      'intermediate': '●●○',
      'beginner': '●○○'
    };
    return indicators[level] || '●○○';
  }

  /**
   * Get category icon for skill categories
   */
  getCategoryIcon(category) {
    const icons = {
      'Frontend': '<i class="bi bi-code-slash"></i>',
      'Styling': '<i class="bi bi-palette"></i>',
      'Programming': '<i class="bi bi-terminal"></i>',
      'Database': '<i class="bi bi-database"></i>',
      'Deployment': '<i class="bi bi-cloud-arrow-up"></i>',
      'APIs': '<i class="bi bi-plug"></i>'
    };
    return icons[category] || '<i class="bi bi-gear"></i>';
  }

  /**
   * Update project count in about section
   */
  updateProjectCount() {
    const projectCountElement = document.querySelector('#project-count');
    if (projectCountElement) {
      projectCountElement.textContent = `${this.projects.length}+`;
    }
  }

  /**
   * Handle theme toggle with enhanced accessibility
   */
  handleThemeToggle(event) {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    
    document.body.classList.toggle('light-mode');
    
    // Update button state and accessibility attributes
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (newTheme === 'light') {
      icon.className = 'bi bi-sun-fill';
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', 'Switch to dark theme');
      button.title = 'Switch to dark theme';
    } else {
      icon.className = 'bi bi-moon-fill';
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', 'Switch to light theme');
      button.title = 'Switch to light theme';
    }
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Announce theme change to screen readers
    this.announceThemeChange(newTheme);
  }

  /**
   * Announce theme change to screen readers
   */
  announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} theme`;
    
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Handle contact form submission with enhanced validation and error handling
   */
  handleContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const nameField = form.querySelector('#name');
    const emailField = form.querySelector('#email');
    const messageField = form.querySelector('#message');
    const submitButton = form.querySelector('button[type="submit"]');
    const statusDiv = form.querySelector('#submit-status');
    
    // Clear previous validation states
    this.clearFormValidation(form);
    
    // Validate form fields
    const validation = this.validateContactForm(nameField, emailField, messageField);
    
    if (!validation.isValid) {
      this.displayFormErrors(validation.errors);
      // Focus on first invalid field
      const firstInvalidField = form.querySelector('.is-invalid');
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    // Show loading state
    this.setFormLoadingState(submitButton, statusDiv, true);

    const params = {
      from_name: nameField.value.trim(),
      from_email: emailField.value.trim(),
      message: messageField.value.trim()
    };

    if (typeof emailjs !== 'undefined') {
      emailjs.send("service_lg1u5l6", "template_o4h08r9", params)
        .then(() => {
          this.displayFormSuccess(statusDiv, 'Your message has been sent successfully!');
          form.reset();
          this.clearFormValidation(form);
        })
        .catch((err) => {
          console.error("Failed to send message:", err);
          this.displayFormError(statusDiv, 'Oops! Something went wrong. Please try again later or contact me directly.');
        })
        .finally(() => {
          this.setFormLoadingState(submitButton, statusDiv, false);
        });
    } else {
      // Fallback when EmailJS is not available
      this.displayFormError(statusDiv, 'Email service is currently unavailable. Please contact me directly at your-email@example.com');
      this.setFormLoadingState(submitButton, statusDiv, false);
    }
  }

  /**
   * Validate contact form fields
   */
  validateContactForm(nameField, emailField, messageField) {
    const errors = [];
    let isValid = true;

    // Validate name
    const name = nameField.value.trim();
    if (!name) {
      errors.push({ field: nameField, message: 'Name is required.' });
      isValid = false;
    } else if (name.length < 2) {
      errors.push({ field: nameField, message: 'Name must be at least 2 characters long.' });
      isValid = false;
    }

    // Validate email
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.push({ field: emailField, message: 'Email is required.' });
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.push({ field: emailField, message: 'Please enter a valid email address.' });
      isValid = false;
    }

    // Validate message
    const message = messageField.value.trim();
    if (!message) {
      errors.push({ field: messageField, message: 'Message is required.' });
      isValid = false;
    } else if (message.length < 10) {
      errors.push({ field: messageField, message: 'Message must be at least 10 characters long.' });
      isValid = false;
    }

    return { isValid, errors };
  }

  /**
   * Clear form validation states
   */
  clearFormValidation(form) {
    const fields = form.querySelectorAll('.form-control');
    const errorDivs = form.querySelectorAll('.invalid-feedback');
    
    fields.forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
    });
    
    errorDivs.forEach(div => {
      div.textContent = '';
    });
  }

  /**
   * Display form validation errors
   */
  displayFormErrors(errors) {
    errors.forEach(error => {
      const field = error.field;
      const errorDiv = document.querySelector(`#${field.id}-error`);
      
      field.classList.add('is-invalid');
      if (errorDiv) {
        errorDiv.textContent = error.message;
      }
    });
  }

  /**
   * Set form loading state
   */
  setFormLoadingState(submitButton, statusDiv, isLoading) {
    if (isLoading) {
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
      statusDiv.innerHTML = '<div class="text-info" role="status" aria-live="polite"><i class="bi bi-clock" aria-hidden="true"></i> Sending your message...</div>';
    } else {
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="bi bi-send me-2" aria-hidden="true"></i>Send Message';
    }
  }

  /**
   * Display form success message
   */
  displayFormSuccess(statusDiv, message) {
    statusDiv.innerHTML = `<div class="alert alert-success" role="alert" aria-live="polite">
      <i class="bi bi-check-circle me-2" aria-hidden="true"></i>${message}
    </div>`;
  }

  /**
   * Display form error message
   */
  displayFormError(statusDiv, message) {
    statusDiv.innerHTML = `<div class="alert alert-danger" role="alert" aria-live="assertive">
      <i class="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>${message}
    </div>`;
  }

  /**
   * Create message box for contact form
   */
  createMessageBox(form) {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.style.marginTop = '15px';
    form.appendChild(messageBox);
    return messageBox;
  }

  /**
   * Handle smooth scrolling for navigation
   */
  handleSmoothScroll(event) {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * Get project by ID
   */
  getProjectById(id) {
    return this.projects.find(project => project.id === id);
  }

  /**
   * Get projects count
   */
  getProjectsCount() {
    return this.projects.length;
  }

  /**
   * Get skills by category
   */
  getSkillsByCategory(category) {
    return this.skills[category] || [];
  }

  /**
   * Initialize lazy loading for images
   */
  initializeLazyLoading() {
    // Create intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      this.lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImageLazily(img);
            this.lazyImageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      // Observe all lazy load images
      this.observeLazyImages();
    } else {
      // Fallback for browsers without IntersectionObserver
      this.loadAllImagesImmediately();
    }
  }

  /**
   * Observe lazy load images
   */
  observeLazyImages() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
      this.lazyImageObserver.observe(img);
    });
  }

  /**
   * Load image lazily with error handling
   */
  loadImageLazily(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Create a new image to preload
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      // Image loaded successfully
      img.src = src;
      img.classList.add('loaded');
      
      // Add fade-in animation if motion is not reduced
      if (!this.prefersReducedMotion) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        requestAnimationFrame(() => {
          img.style.opacity = '1';
        });
      }
    };

    imageLoader.onerror = () => {
      // Image failed to load, show placeholder
      this.handleImageError(img);
    };

    imageLoader.src = src;
  }

  /**
   * Handle image loading errors
   */
  handleImageError(img) {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder image-error';
    placeholder.style.height = '220px';
    placeholder.setAttribute('role', 'img');
    placeholder.setAttribute('aria-label', 'Project image not available');
    
    placeholder.innerHTML = `
      <i class="bi bi-image" style="font-size: 2rem;" aria-hidden="true"></i>
      <br>
      <small>Image not available</small>
    `;
    
    if (img.parentNode) {
      img.parentNode.replaceChild(placeholder, img);
    }
  }

  /**
   * Load all images immediately (fallback)
   */
  loadAllImagesImmediately() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    lazyImages.forEach(img => {
      const src = img.dataset.src;
      if (src) {
        img.src = src;
      }
    });
  }

  /**
   * Optimize performance settings
   */
  optimizePerformance() {
    // Check user preferences
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Optimize animations based on device capabilities
    this.optimizeAnimations();
    
    // Setup memory management
    this.setupMemoryManagement();
    
    // Optimize event listeners
    this.optimizeEventListeners();
    
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
  }

  /**
   * Optimize animations for performance
   */
  optimizeAnimations() {
    if (this.prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.body.classList.add('reduce-motion');
      
      const style = document.createElement('style');
      style.id = 'reduced-motion-override';
      style.textContent = `
        .reduce-motion *,
        .reduce-motion *::before,
        .reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Use CSS containment for better performance
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.style.contain = 'layout style paint';
    });

    // Optimize transform animations to use GPU acceleration
    const animatedElements = document.querySelectorAll('.hover-lift, .tech-tag, .filter-btn');
    animatedElements.forEach(element => {
      element.style.willChange = 'transform';
      element.style.backfaceVisibility = 'hidden';
      element.style.perspective = '1000px';
    });
  }

  /**
   * Setup memory management
   */
  setupMemoryManagement() {
    // Store references to event listeners for cleanup
    this.eventListeners = new Map();
    
    // Setup cleanup on page unload
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });

    // Setup periodic cleanup for long-running sessions
    this.cleanupInterval = setInterval(() => {
      this.performPeriodicCleanup();
    }, 300000); // Every 5 minutes
  }

  /**
   * Optimize event listeners
   */
  optimizeEventListeners() {
    // Use passive listeners where appropriate
    const passiveEvents = ['scroll', 'touchstart', 'touchmove', 'wheel'];
    
    passiveEvents.forEach(eventType => {
      const existingListeners = this.eventListeners.get(eventType) || [];
      existingListeners.forEach(listener => {
        if (listener.element && listener.handler) {
          listener.element.removeEventListener(eventType, listener.handler);
          listener.element.addEventListener(eventType, listener.handler, { passive: true });
        }
      });
    });

    // Debounce resize events
    const debouncedResize = this.debounce(() => {
      if (this.responsiveController) {
        this.responsiveController.handleViewportChange();
      }
    }, 250);

    window.addEventListener('resize', debouncedResize, { passive: true });
    this.addEventListenerReference(window, 'resize', debouncedResize);
  }

  /**
   * Add event listener reference for cleanup
   */
  addEventListenerReference(element, event, handler) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push({ element, handler });
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor frame rate
    if ('requestIdleCallback' in window) {
      this.monitorFrameRate();
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      this.monitorMemoryUsage();
    }

    // Monitor long tasks (if available)
    if ('PerformanceObserver' in window) {
      this.monitorLongTasks();
    }
  }

  /**
   * Monitor frame rate for performance issues
   */
  monitorFrameRate() {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          console.warn(`Low frame rate detected: ${fps} FPS`);
          this.handleLowPerformance();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFrameRate);
    };

    requestAnimationFrame(checkFrameRate);
  }

  /**
   * Monitor memory usage
   */
  monitorMemoryUsage() {
    const checkMemory = () => {
      if (performance.memory) {
        const memoryInfo = performance.memory;
        const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1048576);
        const limitMB = Math.round(memoryInfo.jsHeapSizeLimit / 1048576);
        
        if (usedMB > limitMB * 0.8) {
          console.warn(`High memory usage: ${usedMB}MB / ${limitMB}MB`);
          this.handleHighMemoryUsage();
        }
      }
    };

    setInterval(checkMemory, 30000); // Check every 30 seconds
  }

  /**
   * Monitor long tasks that block the main thread
   */
  monitorLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.log('Long task monitoring not supported');
    }
  }

  /**
   * Handle low performance situations
   */
  handleLowPerformance() {
    // Reduce animation complexity
    document.body.classList.add('low-performance');
    
    // Disable non-essential animations
    const style = document.createElement('style');
    style.textContent = `
      .low-performance .hover-lift:hover {
        transform: none !important;
      }
      .low-performance .tech-tag:hover {
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Handle high memory usage
   */
  handleHighMemoryUsage() {
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
    
    // Clean up unused references
    this.performPeriodicCleanup();
  }

  /**
   * Perform periodic cleanup
   */
  performPeriodicCleanup() {
    // Clean up animation references
    if (this.animationController && this.animationController.animatedElements) {
      this.animationController.animatedElements.clear();
    }
    
    // Clean up observer references
    const observers = document.querySelectorAll('[data-observed]');
    observers.forEach(element => {
      if (!element.isConnected) {
        element.removeAttribute('data-observed');
      }
    });
  }

  /**
   * Debounce function for performance optimization
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    // Clean up intersection observers
    if (this.lazyImageObserver) {
      this.lazyImageObserver.disconnect();
    }

    // Clean up event listeners
    this.eventListeners.forEach((listeners, eventType) => {
      listeners.forEach(({ element, handler }) => {
        if (element && handler) {
          element.removeEventListener(eventType, handler);
        }
      });
    });
    this.eventListeners.clear();

    // Clean up intervals
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Clean up controllers
    if (this.animationController && typeof this.animationController.destroy === 'function') {
      this.animationController.destroy();
    }

    if (this.responsiveController && typeof this.responsiveController.destroy === 'function') {
      this.responsiveController.destroy();
    }

    if (this.filterSystem && typeof this.filterSystem.destroy === 'function') {
      this.filterSystem.destroy();
    }

    this.isInitialized = false;
  }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from localStorage with accessibility support
  const currentTheme = localStorage.getItem('theme');
  const toggleBtn = document.getElementById('themeToggle');
  
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (toggleBtn) {
      toggleBtn.innerHTML = '<i class="bi bi-sun-fill" aria-hidden="true"></i>';
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      toggleBtn.title = 'Switch to dark theme';
    }
  } else {
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', 'false');
      toggleBtn.setAttribute('aria-label', 'Switch to light theme');
      toggleBtn.title = 'Switch to light theme';
    }
  }

  // Initialize EmailJS if available
  if (typeof emailjs !== 'undefined') {
    emailjs.init("3fJbP1acWUm4ct5RG");
  } else {
    console.warn('EmailJS not available - contact form will show fallback message');
  }

  // Add global error handling for images
  document.addEventListener('error', (event) => {
    if (event.target.tagName === 'IMG') {
      handleImageError(event.target);
    }
  }, true);

  // Add global keyboard navigation support
  document.addEventListener('keydown', (event) => {
    // Handle escape key to close any open modals or reset focus
    if (event.key === 'Escape') {
      const focusedElement = document.activeElement;
      if (focusedElement && focusedElement.blur) {
        focusedElement.blur();
      }
    }
  });

  // Create and initialize portfolio controller
  try {
    window.portfolioController = new PortfolioController();
    window.portfolioController.init();
  } catch (error) {
    console.error('Failed to initialize portfolio:', error);
    // Show user-friendly error message
    showGlobalError('Portfolio failed to load. Please refresh the page or contact support.');
  }
});

/**
 * Handle image loading errors globally
 */
function handleImageError(img) {
  console.warn(`Failed to load image: ${img.src}`);
  
  // Create placeholder element
  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.style.height = img.style.height || '220px';
  placeholder.setAttribute('role', 'img');
  placeholder.setAttribute('aria-label', 'Project image not available');
  placeholder.innerHTML = `
    <i class="bi bi-image" style="font-size: 2rem;" aria-hidden="true"></i>
    <br>
    <small>Image not available</small>
  `;
  
  // Replace image with placeholder
  if (img.parentNode) {
    img.parentNode.replaceChild(placeholder, img);
  }
}

/**
 * Show global error message to users
 */
function showGlobalError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3';
  errorDiv.style.zIndex = '9999';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.setAttribute('aria-live', 'assertive');
  errorDiv.innerHTML = `
    <i class="bi bi-exclamation-triangle me-2" aria-hidden="true"></i>
    ${message}
    <button type="button" class="btn-close ms-2" aria-label="Close error message"></button>
  `;
  
  document.body.appendChild(errorDiv);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(errorDiv)) {
      document.body.removeChild(errorDiv);
    }
  }, 10000);
  
  // Add close button functionality
  const closeBtn = errorDiv.querySelector('.btn-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    });
  }
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioController;
}