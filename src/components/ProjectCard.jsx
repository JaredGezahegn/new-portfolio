import { motion } from 'framer-motion'

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      className="bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-blue-900/80 backdrop-blur-md border border-pirate-gold/20 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-pirate-gold/40"
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(project.title)
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {project.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-2 right-2 bg-pirate-red text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
          >
            ⭐ Featured
          </motion.div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 bg-gradient-to-br from-blue-800/60 via-blue-700/50 to-blue-800/60 backdrop-blur-sm">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-pirate text-white mb-2"
        >
          {project.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mb-4 text-sm leading-relaxed"
        >
          {project.description}
        </motion.p>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mb-4"
        >
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-gradient-to-br from-blue-700/80 via-blue-600/70 to-blue-700/80 backdrop-blur-sm border border-pirate-gold/30 text-pirate-gold rounded-full text-xs font-semibold hover:border-pirate-gold/60 transition-all"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Category Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <span className="inline-block px-3 py-1 bg-ocean-blue/80 backdrop-blur-sm border border-ocean-blue/30 text-white rounded-lg text-xs font-semibold">
            {project.category}
          </span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-3"
        >
          {project.liveUrl ? (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white py-2 px-4 rounded-lg font-bold text-center hover:shadow-lg transition-all duration-300 border border-pirate-red/50"
            >
              🌊 Live Demo
            </motion.a>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex-1 bg-gray-600/50 backdrop-blur-sm border border-gray-500/30 text-gray-300 py-2 px-4 rounded-lg font-bold text-center cursor-not-allowed"
            >
              🚧 In Progress
            </motion.div>
          )}

          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 bg-gradient-to-br from-blue-700/80 via-blue-600/70 to-blue-700/80 backdrop-blur-sm border border-pirate-gold/30 text-pirate-gold py-2 px-4 rounded-lg font-bold text-center hover:from-blue-800/90 hover:via-blue-700/80 hover:to-blue-800/90 hover:border-pirate-gold/60 transition-all duration-300"
          >
            💀 Code
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
