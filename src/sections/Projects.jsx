import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import ProjectCard from '../components/ProjectCard'
import { projects, categories } from '../data/portfolio'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects.filter(project => project.featured)
    : projects.filter(project => project.category === activeCategory)

  return (
    <SectionWrapper id="projects">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pirate text-pirate-gold mb-4">
            My Adventures
          </h2>
          <p className="text-xl text-gray-300">
            Treasures I've discovered on my journey
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                activeCategory === category
                  ? 'bg-pirate-red text-white border-2 border-pirate-gold shadow-lg'
                  : 'bg-white/10 text-white border-2 border-white/30 hover:border-pirate-gold'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* No Projects Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-gray-300">
              No adventures found in this category... yet! 🏴‍☠️
            </p>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  )
}

export default Projects
