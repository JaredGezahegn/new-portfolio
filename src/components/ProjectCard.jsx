import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="wanted-poster rounded-lg overflow-hidden shadow-xl"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=' + project.title
          }}
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-pirate-red text-white px-3 py-1 rounded-full text-sm font-bold">
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-2xl font-pirate text-ink-black mb-2">
          {project.title}
        </h3>
        
        <p className="text-gray-700 mb-4 text-sm">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-pirate-gold/20 text-ink-black rounded-full text-xs font-semibold border border-pirate-gold"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-ocean-blue text-white rounded text-xs font-semibold">
            {project.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white py-2 px-4 rounded-lg font-bold text-center hover:shadow-lg transition-all"
            >
              🌊 Live Demo
            </a>
          ) : (
            <div className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg font-bold text-center cursor-not-allowed">
              🚧 In Progress
            </div>
          )}
          
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-ink-black text-white py-2 px-4 rounded-lg font-bold text-center hover:bg-gray-800 transition-all"
          >
            💀 Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
