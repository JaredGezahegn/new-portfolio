// Simple Portfolio Implementation
document.addEventListener('DOMContentLoaded', function() {
  
  // Render Skills with Icons
  function renderSkills() {
    const skillsContainer = document.querySelector('#skills-container');
    if (!skillsContainer) return;
    
    let skillsHTML = '<div class="skills-wrapper mt-4"><h6 class="text-muted mb-3"><i class="bi bi-tools"></i> Technical Skills</h6>';
    
    Object.entries(SKILLS_DATA).forEach(([category, skills]) => {
      skillsHTML += `<div class="skill-category mb-3">`;
      skillsHTML += `<small class="text-muted fw-semibold mb-2 d-block">${category}</small>`;
      skillsHTML += `<div class="skill-tags d-flex flex-wrap gap-2">`;
      
      skills.forEach(skill => {
        skillsHTML += `<span class="badge bg-primary skill-badge">
          <i class="${skill.icon} me-1"></i>${skill.name}
        </span>`;
      });
      
      skillsHTML += `</div></div>`;
    });
    
    skillsHTML += '</div>';
    skillsContainer.innerHTML = skillsHTML;
  }
  
  // Render Projects with Images When Available
  function renderProjects() {
    const projectsContainer = document.querySelector('#projects-container');
    if (!projectsContainer) return;
    
    let projectsHTML = '';
    
    PROJECTS_DATA.forEach(project => {
      const liveButton = project.liveUrl ? 
        `<a href="${project.liveUrl}" class="btn btn-primary btn-sm me-2" target="_blank">
          <i class="bi bi-eye"></i> Live Demo
        </a>` : 
        (project.status === 'In Progress' ? 
          `<span class="btn btn-secondary btn-sm me-2 disabled">
            <i class="bi bi-clock"></i> In Progress
          </span>` : '');
      
      const techTags = project.technologies.map(tech => 
        `<span class="badge bg-info me-1 mb-1">${tech}</span>`
      ).join('');
      
      // Show image if available, otherwise show placeholder
      const imageSection = project.image ? 
        `<img src="${project.image}" class="card-img-top" alt="${project.title}" style="height: 220px; object-fit: cover;">` :
        `<div class="image-placeholder d-flex align-items-center justify-content-center" style="height: 220px; background: var(--card-bg-secondary, #f8f9fa); border-bottom: 1px solid var(--border-color, #dee2e6);">
          <div class="text-center">
            <i class="bi bi-code-square" style="font-size: 3rem; color: var(--primary-color, #0d6efd);"></i>
            <br>
            <small class="text-muted">${project.category}</small>
          </div>
        </div>`;
      
      projectsHTML += `
        <div class="project-card-wrapper">
          <div class="card h-100 project-card">
            ${imageSection}
            <div class="card-body d-flex flex-direction-column">
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text text-muted small">${project.description}</p>
              <div class="mb-3">
                <h6 class="text-muted small mb-2"><i class="bi bi-tools"></i> Tech Stack</h6>
                <div>${techTags}</div>
              </div>
              <div class="mt-auto pt-3 text-center border-top">
                ${liveButton}
                <a href="${project.githubUrl}" class="btn btn-outline-secondary btn-sm" target="_blank">
                  <i class="bi bi-github"></i> Code
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    
    projectsContainer.innerHTML = projectsHTML;
  }
  
  // Render Simple Category Filter
  function renderFilters() {
    const projectsSection = document.querySelector('#projects .container');
    if (!projectsSection) return;
    
    const filterHTML = `
      <div class="filter-container mb-4">
        <h5 class="mb-3"><i class="bi bi-funnel"></i> Filter Projects</h5>
        <div class="filter-buttons">
          <button class="btn btn-primary filter-btn active" data-category="all">All Projects</button>
          ${PROJECT_CATEGORIES.map(cat => 
            `<button class="btn btn-outline-success filter-btn ms-2" data-category="${cat}">${cat}</button>`
          ).join('')}
        </div>
      </div>
    `;
    
    const projectsTitle = projectsSection.querySelector('h2');
    if (projectsTitle) {
      projectsTitle.insertAdjacentHTML('afterend', filterHTML);
    }
    
    // Add filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update button states
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active', 'btn-primary', 'btn-success');
          if (b.dataset.category === 'all') {
            b.classList.add('btn-primary');
          } else {
            b.classList.add('btn-outline-success');
          }
        });
        
        this.classList.add('active');
        if (category === 'all') {
          this.classList.add('btn-primary');
        } else {
          this.classList.remove('btn-outline-success');
          this.classList.add('btn-success');
        }
        
        // Filter projects
        const projectCards = document.querySelectorAll('.project-card-wrapper');
        projectCards.forEach(card => {
          if (category === 'all') {
            card.style.display = 'block';
          } else {
            const projectData = PROJECTS_DATA.find(p => 
              card.querySelector('.card-title').textContent === p.title
            );
            card.style.display = projectData && projectData.category === category ? 'block' : 'none';
          }
        });
      });
    });
  }
  
  // Contact Form with EmailJS API
  function setupContactForm() {
    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.init("3fJbP1acWUm4ct5RG"); // Your EmailJS user ID
    }
    
    const contactForm = document.querySelector('#contact form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameField = this.querySelector('#name');
      const emailField = this.querySelector('#email');
      const messageField = this.querySelector('#message');
      const submitButton = this.querySelector('button[type="submit"]');
      const statusDiv = this.querySelector('#submit-status');
      
      // Get form data
      const formData = {
        from_name: nameField.value.trim(),
        from_email: emailField.value.trim(),
        message: messageField.value.trim()
      };
      
      // Basic validation
      if (!formData.from_name || !formData.from_email || !formData.message) {
        statusDiv.innerHTML = '<div class="alert alert-danger">Please fill in all fields.</div>';
        return;
      }
      
      // Show loading state
      submitButton.disabled = true;
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
      statusDiv.innerHTML = '<div class="text-info">Sending your message...</div>';
      
      try {
        if (typeof emailjs !== 'undefined') {
          // Send email using EmailJS
          await emailjs.send("service_lg1u5l6", "template_o4h08r9", formData);
          
          // Success
          statusDiv.innerHTML = '<div class="alert alert-success"><i class="bi bi-check-circle me-2"></i>Message sent successfully! I\'ll get back to you soon.</div>';
          contactForm.reset();
        } else {
          throw new Error('EmailJS not available');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        statusDiv.innerHTML = '<div class="alert alert-danger"><i class="bi bi-exclamation-triangle me-2"></i>Sorry, there was an error sending your message. Please try again or contact me directly.</div>';
      } finally {
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="bi bi-send me-2"></i>Send Message';
      }
    });
  }
  // Theme Toggle Fix
  function fixThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        const icon = this.querySelector('i');
        if (isLight) {
          icon.className = 'bi bi-sun-fill';
          localStorage.setItem('theme', 'light');
        } else {
          icon.className = 'bi bi-moon-fill';
          localStorage.setItem('theme', 'dark');
        }
      });
    }
    
    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      const icon = themeToggle?.querySelector('i');
      if (icon) icon.className = 'bi bi-sun-fill';
    }
  }
  
  // Initialize everything
  renderSkills();
  renderProjects();
  renderFilters();
  setupContactForm();
  fixThemeToggle();
  
  // Update project count
  const projectCount = document.querySelector('#project-count');
  if (projectCount) {
    projectCount.textContent = `${PROJECTS_DATA.length}+`;
  }
});