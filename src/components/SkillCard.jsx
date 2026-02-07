import { motion } from 'framer-motion'

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
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
      <h3 className="text-lg font-bold text-white mb-1">{skill.name}</h3>
      
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
      <p className="text-white text-sm font-bold">{skill.level}%</p>
    </motion.div>
  )
}

export default SkillCard
