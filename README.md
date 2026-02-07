# One Piece Themed Portfolio

A One Piece anime-themed portfolio website built with React, Tailwind CSS, and Framer Motion.

## Features

- 🏴‍☠️ One Piece themed design with pirate aesthetics
- 🌓 Dark/Light mode toggle
- ⚡ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 📧 Contact form with EmailJS integration
- 🎵 Luffy stretch sound effect on navbar clicks
- 🎨 Custom Tailwind CSS styling

## Tech Stack

- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **EmailJS** - Contact form functionality

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the react-portfolio folder
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build

Create a production build:

```bash
npm run build
```

### Preview

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
react-portfolio/
├── public/
│   ├── img/              # Project images
│   ├── sound/            # Sound effects
│   ├── resume.pdf        # Resume file
│   └── mine.png          # Profile image
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SkillCard.jsx
│   │   ├── SectionWrapper.jsx
│   │   └── WantedPoster.jsx
│   ├── sections/         # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── portfolio.js  # Portfolio data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Customization

### Update Personal Information

Edit `src/data/portfolio.js` to update:
- Personal info (name, title, bio, etc.)
- Skills and crew roles
- Projects and their details
- Categories

### Update EmailJS Configuration

In `src/sections/Contact.jsx`, update the EmailJS credentials:
- User ID
- Service ID
- Template ID

### Add Images

Place your images in the `public/img/` folder and update the paths in `portfolio.js`

### Add Resume

Place your resume PDF in the `public/` folder as `resume.pdf`

## Deployment

This project can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## License

MIT License - feel free to use this for your own portfolio!

## Credits

Design inspired by One Piece anime created by Eiichiro Oda.
