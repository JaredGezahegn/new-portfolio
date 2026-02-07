import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { skills } from '../data/portfolio'

const Skills = () => {
  return (
    <SectionWrapper id="skills">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pirate text-pirate-gold mb-4">
            My Crew (Skills)
          </h2>
          <p className="text-xl text-gray-300">
            Every great pirate needs a skilled crew!
          </p>
        </div>

        {/* Skills Grid - Compact Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-ocean-blue/30 backdrop-blur-sm border-2 border-pirate-gold rounded-lg p-4 text-center shadow-lg"
            >
              {/* Icon */}
              <div className="text-4xl mb-2">{skill.icon}</div>
              
              {/* Skill Name */}
              <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
              
              {/* Crew Role */}
              <p className="text-pirate-gold text-xs mb-3 font-semibold">{skill.crewRole}</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.05 }}
                  className="bg-gradient-to-r from-pirate-gold to-pirate-red h-2 rounded-full"
                />
              </div>
              
              {/* Percentage */}
              <p className="text-white text-xs font-bold">{skill.level}%</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

export default Skills
