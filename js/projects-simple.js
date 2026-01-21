// Simple Skills Data with Icons
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

// Simple Projects Data - Only remove images for specific projects
const PROJECTS_DATA = [
  {
    id: 'telegram-bot',
    title: 'Telegram E-learning Bot',
    description: 'An educational bot for Telegram with database integration and cloud deployment.',
    technologies: ['Python', 'Supabase', 'PostgreSQL', 'Telegram API'],
    category: 'Bot Application',
    status: 'Deployed',
    liveUrl: 'https://t.me/tutordMe',
    githubUrl: 'https://github.com/JaredGezahegn/Telegram-E-learning-bot',
    image: 'img/tutorme.png'
  },
  {
    id: 'ecommerce-app',
    title: 'E-commerce Application',
    description: 'A collaborative e-commerce platform with React frontend and Python backend integration.',
    technologies: ['React', 'Bootstrap', 'Python', 'API Integration'],
    category: 'Web Application',
    status: 'In Progress',
    githubUrl: 'https://github.com/JaredGezahegn/Ecomerce-App',
    image: 'img/ecommerce.png'
  },
  {
    id: 'mindkeep',
    title: 'MindKeep',
    description: 'A productivity and note-taking application built with React and Tailwind CSS.',
    technologies: ['React', 'Tailwind CSS', 'JavaScript'],
    category: 'Web Application',
    status: 'Deployed',
    liveUrl: 'https://mindkeepja.netlify.app/',
    githubUrl: 'https://github.com/JaredGezahegn/mindkeep',
    image: 'img/mindkeep.png'
  },
  {
    id: 'amazone-cafe',
    title: 'AmaZone Cafe',
    description: 'A static HTML project for a cafe website with responsive layout and modern design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Static Website',
    status: 'Completed',
    liveUrl: 'https://jaredgezahegn.github.io/AmaZone-Cafe/',
    githubUrl: 'https://github.com/JaredGezahegn/AmaZone-Cafe',
    image: 'img/amazon.png' // Keep existing image
  },
  {
    id: 'movie-app',
    title: 'React Movie Search App',
    description: 'A React.js web application that lets users search movies using the OMDB API.',
    technologies: ['React', 'JavaScript', 'OMDB API', 'CSS'],
    category: 'Web Application',
    status: 'Deployed',
    liveUrl: 'https://jaredgezahegn.github.io/movie_react_app/',
    githubUrl: 'https://github.com/JaredGezahegn/movie_react_app',
    image: 'img/All-movie.png' // Keep existing image
  },
  {
    id: 'todo-app',
    title: 'JavaScript To-Do List',
    description: 'A simple To-Do list app using HTML, CSS, and JavaScript with local storage support.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Application',
    status: 'Completed',
    liveUrl: 'https://jaredgezahegn.github.io/JS-practice-To-Do-List/',
    githubUrl: 'https://github.com/JaredGezahegn/JS-practice-To-Do-List',
    image: 'img/to-do.png' // Keep existing image
  },
  {
    id: 'haile-selassie',
    title: 'Haile Selassie Historical Project',
    description: 'A historical HTML project focused on Emperor Haile Selassie\'s legacy.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Static Website',
    status: 'Completed',
    liveUrl: 'http://jaredgezahegn.github.io/first-project/',
    githubUrl: 'https://github.com/JaredGezahegn/first-project',
    image: 'img/ja.png' // Keep existing image
  }
];

const PROJECT_CATEGORIES = ['Web Application', 'Static Website', 'Bot Application'];