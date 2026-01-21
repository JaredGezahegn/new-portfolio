/**
 * Centralized Project Data Configuration
 * Contains all 7 projects with complete information including technologies, categories, and collaboration details
 */

// Project data structure following the design specification
const PROJECTS_DATA = [
  {
    id: 'amazone-cafe',
    title: 'AmaZone Cafe',
    description: 'A static HTML project for a cafe website with responsive layout and modern design.',
    longDescription: 'A comprehensive cafe website showcasing modern web development practices with responsive design, cross-browser compatibility, and clean user interface.',
    image: 'img/amazon.png',
    liveUrl: 'https://jaredgezahegn.github.io/AmaZone-Cafe/',
    githubUrl: 'https://github.com/JaredGezahegn/AmaZone-Cafe',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Static Website',
    status: 'Completed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['Full-stack development', 'UI/UX design', 'Responsive implementation']
    },
    timeline: {
      startDate: '2023-08',
      endDate: '2023-09',
      duration: '1 month',
      developmentPhase: 'Completed'
    },
    features: ['Responsive Design', 'Modern Layout', 'Cross-browser Compatibility', 'Clean UI/UX'],
    deploymentPlatform: 'GitHub Pages'
  },
  {
    id: 'mindkeep',
    title: 'MindKeep',
    description: 'A productivity and note-taking application built with React and Tailwind CSS.',
    longDescription: 'A modern productivity application that helps users organize their thoughts and tasks with an intuitive interface and responsive design.',
    image: null, // Remove image - will use placeholder
    liveUrl: 'https://mindkeepja.netlify.app/',
    githubUrl: 'https://github.com/JaredGezahegn/mindkeep',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    category: 'Web Application',
    status: 'Deployed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['React development', 'Component architecture', 'State management', 'Tailwind CSS styling']
    },
    deploymentPlatform: 'Netlify'
  },
  {
    id: 'ecommerce-app',
    title: 'E-commerce Application',
    description: 'A collaborative e-commerce platform with React frontend and Python backend integration.',
    longDescription: 'A full-stack e-commerce solution featuring product catalog, shopping cart functionality, and seamless backend integration for a complete online shopping experience.',
    image: null, // Remove image - will use placeholder
    githubUrl: 'https://github.com/JaredGezahegn/Ecomerce-App',
    technologies: ['React', 'Bootstrap', 'Python', 'API Integration'],
    category: 'Web Application',
    status: 'In Progress',
    collaboration: {
      isCollaborative: true,
      role: 'Frontend Developer',
      teamSize: 2,
      individualContributions: ['React frontend development', 'Component design', 'API integration', 'Responsive UI implementation']
    }
  },
  {
    id: 'telegram-bot',
    title: 'Telegram E-learning Bot',
    description: 'An educational bot for Telegram with database integration and cloud deployment.',
    longDescription: 'An intelligent educational bot that provides interactive learning experiences through Telegram, featuring database storage and cloud deployment for scalable learning solutions.',
    image: null, // Remove image - will use placeholder
    liveUrl: 'https://t.me/tutordMe',
    githubUrl: 'https://github.com/JaredGezahegn/Telegram-E-learning-bot',
    technologies: ['Python', 'Supabase', 'PostgreSQL', 'Telegram API'],
    category: 'Bot Application',
    status: 'Deployed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['Bot architecture design', 'Telegram API integration', 'Database schema design', 'Cloud deployment setup']
    },
    deploymentPlatform: 'Render'
  },
  {
    id: 'todo-app',
    title: 'JavaScript To-Do List',
    description: 'A simple To-Do list app using HTML, CSS, and JavaScript with local storage support.',
    longDescription: 'A practical task management application demonstrating vanilla JavaScript capabilities with persistent local storage and intuitive user interface.',
    image: 'img/to-do.png',
    liveUrl: 'https://jaredgezahegn.github.io/JS-practice-To-Do-List/',
    githubUrl: 'https://github.com/JaredGezahegn/JS-practice-To-Do-List',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Application',
    status: 'Completed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['JavaScript logic implementation', 'Local storage integration', 'DOM manipulation', 'CSS styling']
    },
    timeline: {
      startDate: '2023-06',
      endDate: '2023-07',
      duration: '1 month',
      developmentPhase: 'Completed'
    },
    features: ['Task Management', 'Local Storage', 'Responsive Design', 'CRUD Operations'],
    deploymentPlatform: 'GitHub Pages'
  },
  {
    id: 'haile-selassie',
    title: 'Haile Selassie Historical Project',
    description: 'A historical HTML project focused on Emperor Haile Selassie\'s legacy.',
    longDescription: 'An educational website dedicated to preserving and presenting the historical legacy of Emperor Haile Selassie with rich content and historical documentation.',
    image: 'img/ja.png',
    liveUrl: 'http://jaredgezahegn.github.io/first-project/',
    githubUrl: 'https://github.com/JaredGezahegn/first-project',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Static Website',
    status: 'Completed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['Historical research', 'Content creation', 'Web development', 'Educational design']
    },
    timeline: {
      startDate: '2023-03',
      endDate: '2023-04',
      duration: '1 month',
      developmentPhase: 'Completed'
    },
    features: ['Historical Content', 'Educational Design', 'Responsive Layout', 'Rich Media Integration'],
    deploymentPlatform: 'GitHub Pages'
  },
  {
    id: 'movie-app',
    title: 'React Movie Search App',
    description: 'A React.js web application that lets users search movies, view details, and enjoy a clean movie listing interface using the OMDB API.',
    longDescription: 'A dynamic movie discovery application built with React.js that integrates with the OMDB API to provide users with comprehensive movie information and search capabilities.',
    image: 'img/All-movie.png',
    liveUrl: 'https://jaredgezahegn.github.io/movie_react_app/',
    githubUrl: 'https://github.com/JaredGezahegn/movie_react_app',
    technologies: ['React', 'JavaScript', 'OMDB API', 'CSS'],
    category: 'Web Application',
    status: 'Deployed',
    collaboration: {
      isCollaborative: false,
      role: 'Solo Developer',
      teamSize: 1,
      individualContributions: ['React component development', 'API integration', 'Search functionality', 'Responsive design']
    },
    timeline: {
      startDate: '2024-08',
      endDate: '2024-09',
      duration: '2 months',
      developmentPhase: 'Deployed'
    },
    features: ['Movie Search', 'API Integration', 'Responsive Design', 'Dynamic Content', 'Clean UI'],
    deploymentPlatform: 'GitHub Pages'
  }
];

// Skills configuration organized by categories with icons
const SKILLS_DATA = {
  'Frontend': [
    { name: 'React', icon: 'bi-react' },
    { name: 'JavaScript', icon: 'bi-filetype-js' },
    { name: 'HTML', icon: 'bi-filetype-html' },
    { name: 'CSS', icon: 'bi-filetype-css' }
  ],
  'Styling': [
    { name: 'Bootstrap', icon: 'bi-bootstrap' },
    { name: 'Tailwind CSS', icon: 'bi-palette' }
  ],
  'Programming': [
    { name: 'Python', icon: 'bi-filetype-py' }
  ],
  'Database': [
    { name: 'PostgreSQL', icon: 'bi-database' },
    { name: 'Supabase', icon: 'bi-server' }
  ],
  'Deployment': [
    { name: 'Netlify', icon: 'bi-cloud-upload' },
    { name: 'Render', icon: 'bi-cloud-check' },
    { name: 'GitHub Pages', icon: 'bi-github' }
  ],
  'APIs': [
    { name: 'REST APIs', icon: 'bi-api' },
    { name: 'Telegram Bot API', icon: 'bi-telegram' },
    { name: 'OMDB API', icon: 'bi-film' }
  ]
};

// Project categories for filtering
const PROJECT_CATEGORIES = [
  'Web Application',
  'Static Website', 
  'Bot Application'
];

// Project status options
const PROJECT_STATUS = [
  'Completed',
  'In Progress',
  'Deployed'
];

// Get all unique technologies from projects
function getAllTechnologies() {
  const technologies = new Set();
  PROJECTS_DATA.forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech));
  });
  return Array.from(technologies).sort();
}

// Get projects by category
function getProjectsByCategory(category) {
  return PROJECTS_DATA.filter(project => project.category === category);
}

// Get projects by technology
function getProjectsByTechnology(technology) {
  return PROJECTS_DATA.filter(project => 
    project.technologies.includes(technology)
  );
}

// Get projects by status
function getProjectsByStatus(status) {
  return PROJECTS_DATA.filter(project => project.status === status);
}

// Get collaborative projects
function getCollaborativeProjects() {
  return PROJECTS_DATA.filter(project => 
    project.collaboration && project.collaboration.isCollaborative
  );
}

// Get deployed projects (with live URLs)
function getDeployedProjects() {
  return PROJECTS_DATA.filter(project => project.liveUrl);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PROJECTS_DATA,
    SKILLS_DATA,
    PROJECT_CATEGORIES,
    PROJECT_STATUS,
    getAllTechnologies,
    getProjectsByCategory,
    getProjectsByTechnology,
    getProjectsByStatus,
    getCollaborativeProjects,
    getDeployedProjects
  };
}