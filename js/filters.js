/**
 * Interactive Filtering System
 * Manages project filtering by technologies, categories, and status
 */

class FilterSystem {
  constructor(portfolioController) {
    this.portfolioController = portfolioController;
    this.activeFilters = new Set();
    this.availableFilters = {
      technologies: getAllTechnologies(),
      categories: PROJECT_CATEGORIES,
      status: PROJECT_STATUS
    };
    this.filteredProjects = [...PROJECTS_DATA];
    this.isInitialized = false;
  }

  /**
   * Initialize the filtering system
   */
  init() {
    if (this.isInitialized) return;
    
    try {
      this.createFilterUI();
      this.setupFilterEventListeners();
      this.isInitialized = true;
      console.log('Filter system initialized successfully');
    } catch (error) {
      console.error('Failed to initialize filter system:', error);
    }
  }

  /**
   * Create the filter UI elements
   */
  createFilterUI() {
    const projectsSection = document.querySelector('#projects .container');
    if (!projectsSection) {
      console.error('Projects section not found');
      return;
    }

    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container mb-4';
    filterContainer.innerHTML = this.generateFilterHTML();

    // Insert filter container before projects
    const projectsTitle = projectsSection.querySelector('h2');
    if (projectsTitle) {
      projectsTitle.insertAdjacentElement('afterend', filterContainer);
    }
  }

  /**
   * Generate HTML for filter buttons - Only Categories
   */
  generateFilterHTML() {
    return `
      <div class="row">
        <div class="col-12">
          <div class="filter-section mb-3">
            <h5 class="filter-title mb-3">
              <i class="bi bi-funnel"></i> Filter Projects
            </h5>
            
            <!-- All/Reset Filter -->
            <div class="filter-group mb-3">
              <button class="btn btn-primary filter-btn active" data-filter="all" data-filter-type="all">
                <i class="bi bi-grid"></i> All Projects
              </button>
            </div>

            <!-- Category Filters Only -->
            <div class="filter-group mb-3">
              <h6 class="filter-group-title">
                <i class="bi bi-folder"></i> Categories
              </h6>
              <div class="filter-buttons">
                ${this.availableFilters.categories.map(category => 
                  `<button class="btn btn-outline-success filter-btn me-2 mb-2" 
                           data-filter="${category}" 
                           data-filter-type="category">
                     <i class="bi bi-${this.getCategoryIcon(category)}"></i> ${category}
                   </button>`
                ).join('')}
              </div>
            </div>

            <!-- Active Filters Display -->
            <div class="active-filters-container" style="display: none;">
              <h6 class="text-muted">Active Filters:</h6>
              <div class="active-filters-list"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results Message -->
      <div class="no-results-message text-center py-5" style="display: none;">
        <div class="card">
          <div class="card-body">
            <i class="bi bi-search display-4 text-muted mb-3"></i>
            <h4 class="text-muted">No Projects Found</h4>
            <p class="text-muted mb-3">
              No projects match your current filter selection. 
              Try adjusting your filters or view all projects.
            </p>
            <button class="btn btn-primary" data-filter="all" data-filter-type="all">
              <i class="bi bi-grid"></i> Show All Projects
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get icon for category
   */
  getCategoryIcon(category) {
    const icons = {
      'Web Application': 'globe',
      'Static Website': 'file-earmark-code',
      'Bot Application': 'robot'
    };
    return icons[category] || 'folder';
  }

  /**
   * Get icon for status
   */
  getStatusIcon(status) {
    const icons = {
      'Completed': 'check-circle',
      'In Progress': 'clock',
      'Deployed': 'cloud-check'
    };
    return icons[status] || 'question-circle';
  }

  /**
   * Set up event listeners for filter buttons
   */
  setupFilterEventListeners() {
    const filterContainer = document.querySelector('.filter-container');
    if (!filterContainer) return;

    // Add click event listener to filter container (event delegation)
    filterContainer.addEventListener('click', (event) => {
      const filterBtn = event.target.closest('.filter-btn');
      if (!filterBtn) return;

      const filterValue = filterBtn.getAttribute('data-filter');
      const filterType = filterBtn.getAttribute('data-filter-type');

      this.handleFilterClick(filterValue, filterType, filterBtn);
    });

    // Add click event listener to no-results message button
    const noResultsBtn = document.querySelector('.no-results-message .btn');
    if (noResultsBtn) {
      noResultsBtn.addEventListener('click', (event) => {
        const filterValue = event.target.getAttribute('data-filter');
        const filterType = event.target.getAttribute('data-filter-type');
        this.handleFilterClick(filterValue, filterType, event.target);
      });
    }
  }

  /**
   * Handle filter button clicks
   */
  handleFilterClick(filterValue, filterType, buttonElement) {
    if (filterType === 'all') {
      this.showAllProjects();
    } else if (filterType === 'reset') {
      this.resetFilters();
    } else {
      this.toggleFilter(filterValue, filterType, buttonElement);
    }

    // Provide visual feedback
    this.updateFilterButtonStates();
    this.updateActiveFiltersDisplay();
    this.applyFilters();
  }

  /**
   * Show all projects (clear all filters)
   */
  showAllProjects() {
    this.activeFilters.clear();
    this.filteredProjects = [...PROJECTS_DATA];
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.activeFilters.clear();
    this.filteredProjects = [...PROJECTS_DATA];
  }

  /**
   * Toggle a specific filter
   */
  toggleFilter(filterValue, filterType, buttonElement) {
    const filterKey = `${filterType}:${filterValue}`;
    
    if (this.activeFilters.has(filterKey)) {
      // Remove filter
      this.activeFilters.delete(filterKey);
      buttonElement.classList.remove('active');
    } else {
      // Add filter
      this.activeFilters.add(filterKey);
      buttonElement.classList.add('active');
    }
  }

  /**
   * Update visual state of filter buttons - Categories only
   */
  updateFilterButtonStates() {
    const allButton = document.querySelector('[data-filter="all"]');
    const filterButtons = document.querySelectorAll('.filter-btn:not([data-filter="all"])');

    // Update "All" button state
    if (allButton) {
      if (this.activeFilters.size === 0) {
        allButton.classList.add('active');
        allButton.classList.remove('btn-outline-primary');
        allButton.classList.add('btn-primary');
      } else {
        allButton.classList.remove('active');
        allButton.classList.remove('btn-primary');
        allButton.classList.add('btn-outline-primary');
      }
    }

    // Update individual filter button states (categories only)
    filterButtons.forEach(button => {
      const filterValue = button.getAttribute('data-filter');
      const filterType = button.getAttribute('data-filter-type');
      const filterKey = `${filterType}:${filterValue}`;

      if (this.activeFilters.has(filterKey)) {
        button.classList.add('active');
        // Change to solid color when active
        button.classList.remove('btn-outline-success');
        button.classList.add('btn-success');
      } else {
        button.classList.remove('active');
        // Change back to outline when inactive
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-success');
      }
    });
  }

  /**
   * Update active filters display
   */
  updateActiveFiltersDisplay() {
    const activeFiltersContainer = document.querySelector('.active-filters-container');
    const activeFiltersList = document.querySelector('.active-filters-list');
    
    if (!activeFiltersContainer || !activeFiltersList) return;

    if (this.activeFilters.size === 0) {
      activeFiltersContainer.style.display = 'none';
      return;
    }

    activeFiltersContainer.style.display = 'block';
    
    const filterTags = Array.from(this.activeFilters).map(filterKey => {
      const [type, value] = filterKey.split(':');
      return `<span class="badge bg-secondary me-2 mb-1">
                ${value}
                <button class="btn-close btn-close-white ms-1" 
                        data-filter="${value}" 
                        data-filter-type="${type}" 
                        style="font-size: 0.6em;"></button>
              </span>`;
    }).join('');

    activeFiltersList.innerHTML = filterTags;

    // Add event listeners to remove buttons
    activeFiltersList.querySelectorAll('.btn-close').forEach(btn => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const filterValue = btn.getAttribute('data-filter');
        const filterType = btn.getAttribute('data-filter-type');
        const filterKey = `${filterType}:${filterValue}`;
        
        this.activeFilters.delete(filterKey);
        this.updateFilterButtonStates();
        this.updateActiveFiltersDisplay();
        this.applyFilters();
      });
    });
  }

  /**
   * Apply current filters to projects
   */
  applyFilters() {
    if (this.activeFilters.size === 0) {
      this.filteredProjects = [...PROJECTS_DATA];
    } else {
      this.filteredProjects = PROJECTS_DATA.filter(project => {
        return this.projectMatchesFilters(project);
      });
    }

    this.renderFilteredProjects();
    this.updateProjectsVisibility();
  }

  /**
   * Check if a project matches current filters
   */
  projectMatchesFilters(project) {
    const activeFiltersByType = this.groupFiltersByType();
    
    // If no filters are active, show all projects
    if (Object.keys(activeFiltersByType).length === 0) {
      return true;
    }

    // Check each filter type (AND logic between types, OR logic within types)
    for (const [filterType, filterValues] of Object.entries(activeFiltersByType)) {
      let typeMatches = false;

      for (const filterValue of filterValues) {
        if (filterType === 'technology') {
          if (project.technologies.includes(filterValue)) {
            typeMatches = true;
            break;
          }
        } else if (filterType === 'category') {
          if (project.category === filterValue) {
            typeMatches = true;
            break;
          }
        } else if (filterType === 'status') {
          if (project.status === filterValue) {
            typeMatches = true;
            break;
          }
        }
      }

      // If this filter type doesn't match, project is excluded
      if (!typeMatches) {
        return false;
      }
    }

    return true;
  }

  /**
   * Group active filters by type
   */
  groupFiltersByType() {
    const grouped = {};
    
    this.activeFilters.forEach(filterKey => {
      const [type, value] = filterKey.split(':');
      if (!grouped[type]) {
        grouped[type] = [];
      }
      grouped[type].push(value);
    });

    return grouped;
  }

  /**
   * Render filtered projects
   */
  renderFilteredProjects() {
    const projectsContainer = document.querySelector('#projects-container');
    if (!projectsContainer) return;

    // Clear existing projects
    projectsContainer.innerHTML = '';

    // Render filtered projects
    this.filteredProjects.forEach(project => {
      const projectElement = this.portfolioController.createProjectCard(project);
      projectsContainer.appendChild(projectElement);
    });
  }

  /**
   * Update projects visibility and show/hide no results message
   */
  updateProjectsVisibility() {
    const projectsContainer = document.querySelector('#projects-container');
    const noResultsMessage = document.querySelector('.no-results-message');
    
    if (!projectsContainer || !noResultsMessage) return;

    if (this.filteredProjects.length === 0) {
      // Show no results message
      projectsContainer.style.display = 'none';
      noResultsMessage.style.display = 'block';
    } else {
      // Show projects
      projectsContainer.style.display = 'flex';
      noResultsMessage.style.display = 'none';
    }
  }

  /**
   * Get current filtered projects
   */
  getFilteredProjects() {
    return this.filteredProjects;
  }

  /**
   * Get active filters
   */
  getActiveFilters() {
    return new Set(this.activeFilters);
  }

  /**
   * Check if a specific filter is active
   */
  isFilterActive(filterType, filterValue) {
    const filterKey = `${filterType}:${filterValue}`;
    return this.activeFilters.has(filterKey);
  }

  /**
   * Get count of projects matching current filters
   */
  getFilteredProjectsCount() {
    return this.filteredProjects.length;
  }

  /**
   * Clear all filters programmatically
   */
  clearAllFilters() {
    this.activeFilters.clear();
    this.updateFilterButtonStates();
    this.updateActiveFiltersDisplay();
    this.applyFilters();
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FilterSystem;
}