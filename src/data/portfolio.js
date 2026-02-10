export const personalInfo = {
  name: "Yared Gezahegn",
  title: "Frontend Developer",
  bounty: "1,000,000,000",
  image: "/mine.png",
  email: "jaredgezahegn@gmail.com",
  github: "https://github.com/JaredGezahegn",
  linkedin: "https://linkedin.com/in/yared-gezahegn",
  resume: "/Yared Gezahegn – NewDesign.pdf",
  bio: "A passionate frontend developer sailing through the Grand Line of code, seeking the One Piece of perfect software! With a crew of technologies and a spirit of adventure, I build applications that make waves in the digital ocean.",
  quote: "I'm gonna be King of the Pirates!",
  crewRole: "Captain & Developer"
}

export const skills = [
  {
    name: "React",
    level: 90,
    icon: "⚛️",
    crewRole: "First Mate",
    category: "Frontend"
  },
  {
    name: "JavaScript",
    level: 85,
    icon: "📜",
    crewRole: "Navigator",
    category: "Programming"
  },
  {
    name: "Python",
    level: 80,
    icon: "🐍",
    crewRole: "Doctor",
    category: "Programming"
  },
  {
    name: "HTML/CSS",
    level: 90,
    icon: "🎨",
    crewRole: "Artist",
    category: "Frontend"
  },
  {
    name: "Tailwind CSS",
    level: 85,
    icon: "💨",
    crewRole: "Shipwright",
    category: "Styling"
  },
  {
    name: "Bootstrap",
    level: 80,
    icon: "🅱️",
    crewRole: "Cook",
    category: "Styling"
  },
  {
    name: "Supabase",
    level: 70,
    icon: "⚡",
    crewRole: "Sniper",
    category: "Database"
  },
  {
    name: "Git",
    level: 85,
    icon: "🔱",
    crewRole: "Helmsman",
    category: "Tools"
  },
  {
    name: "Telegram Bot API",
    level: 75,
    icon: "🤖",
    crewRole: "Lookout",
    category: "APIs"
  },
  {
    name: "Netlify",
    level: 80,
    icon: "🚀",
    crewRole: "Quartermaster",
    category: "Deployment"
  },
  {
    name: "Vercel",
    level: 80,
    icon: "▲",
    crewRole: "Navigator",
    category: "Deployment"
  }
]

export const projects = [
  {
    id: 1,
    title: "DDU Confession Bot",
    description: "An anonymous confession bot for Dire Dawa University students to share thoughts and experiences.",
    longDescription: "A Telegram bot that allows DDU students to submit anonymous confessions, fostering open communication and community engagement within the university.",
    image: "/img/DDU-confessions.jpg",
    technologies: ["Python", "Telegram API", "Database"],
    category: "Bot Application",
    liveUrl: "https://t.me/DDUVent_bot",
    githubUrl: "https://github.com/JaredGezahegn/newbot.git",
    featured: true
  },
  {
    id: 2,
    title: "Telegram E-learning Bot",
    description: "An educational bot for Telegram with database integration and cloud deployment.",
    longDescription: "An intelligent educational bot that provides interactive learning experiences through Telegram, featuring database storage and cloud deployment for scalable learning solutions.",
    image: "/img/tutor.png",
    technologies: ["Python", "Supabase", "PostgreSQL", "Telegram API"],
    category: "Bot Application",
    liveUrl: "https://t.me/tutordMe",
    githubUrl: "https://github.com/JaredGezahegn/Telegram-E-learning-bot",
    featured: true
  },
  {
    id: 3,
    title: "E-commerce Application",
    description: "A collaborative e-commerce platform with React frontend and Python backend integration.",
    longDescription: "A full-stack e-commerce solution featuring product catalog, shopping cart functionality, and seamless backend integration for a complete online shopping experience.",
    image: "/img/ecommerce.png.png",
    technologies: ["React", "Bootstrap", "Python", "API Integration"],
    category: "Web Application",
    liveUrl: null,
    githubUrl: "https://github.com/JaredGezahegn/Ecomerce-App",
    featured: true
  },
  {
    id: 4,
    title: "React Movie Search App",
    description: "A React.js web application that lets users search movies, view details, and enjoy a clean movie listing interface using the OMDB API.",
    longDescription: "A dynamic movie discovery application built with React.js that integrates with the OMDB API to provide users with comprehensive movie information and search capabilities.",
    image: "/img/react-movie.png",
    technologies: ["React", "JavaScript", "OMDB API", "CSS"],
    category: "Web Application",
    liveUrl: "https://jaredgezahegn.github.io/movie_react_app/",
    githubUrl: "https://github.com/JaredGezahegn/movie_react_app",
    featured: true
  },
  {
    id: 5,
    title: "AmaZone Cafe",
    description: "A static HTML project for a cafe website with responsive layout and modern design.",
    longDescription: "A comprehensive cafe website showcasing modern web development practices with responsive design, cross-browser compatibility, and clean user interface.",
    image: "/img/ama-zone.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Static Website",
    liveUrl: "https://jaredgezahegn.github.io/AmaZone-Cafe/",
    githubUrl: "https://github.com/JaredGezahegn/AmaZone-Cafe",
    featured: true
  },
  {
    id: 6,
    title: "MindKeep",
    description: "A productivity and note-taking application built with React and Tailwind CSS.",
    longDescription: "A modern productivity application that helps users organize their thoughts and tasks with an intuitive interface and responsive design.",
    image: "/img/mindkeep.png",
    technologies: ["React", "Tailwind CSS", "JavaScript"],
    category: "Web Application",
    liveUrl: "https://mindkeepja.netlify.app/",
    githubUrl: "https://github.com/JaredGezahegn/mindkeep",
    featured: false
  },
  {
    id: 7,
    title: "Haile Selassie Historical Project",
    description: "A historical HTML project focused on Emperor Haile Selassie's legacy.",
    longDescription: "An educational website dedicated to preserving and presenting the historical legacy of Emperor Haile Selassie with rich content and historical documentation.",
    image: "/img/haileselassie.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Static Website",
    liveUrl: "http://jaredgezahegn.github.io/first-project/",
    githubUrl: "https://github.com/JaredGezahegn/first-project",
    featured: false
  },
  {
    id: 8,
    title: "JavaScript To-Do List",
    description: "A simple To-Do list app using HTML, CSS, and JavaScript with local storage support.",
    longDescription: "A practical task management application demonstrating vanilla JavaScript capabilities with persistent local storage and intuitive user interface.",
    image: "/img/todolist.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "Web Application",
    liveUrl: "https://jaredgezahegn.github.io/JS-practice-To-Do-List/",
    githubUrl: "https://github.com/JaredGezahegn/JS-practice-To-Do-List",
    featured: false
  }
]

export const categories = ["All", "Web Application", "Static Website", "Bot Application"]
