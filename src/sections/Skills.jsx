import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { skills } from '../data/portfolio'

const Skills = () => {
  const [isTreasureOpen, setIsTreasureOpen] = useState(false)

  const getBountyColor = (level) => {
    if (level >= 90) return 'from-red-600 to-red-800'
    if (level >= 80) return 'from-orange-600 to-orange-800'
    if (level >= 70) return 'from-yellow-600 to-yellow-800'
    return 'from-gray-600 to-gray-800'
  }

  return (
    <>
      <SectionWrapper id="skills">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-pirate text-pirate-gold mb-4"
            >
              Pirate's Treasure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              Click the treasure chest to reveal my crew!
            </motion.p>
          </div>

          {/* Treasure Chest */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <motion.div
                onClick={() => setIsTreasureOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isTreasureOpen ? { scale: 1.1, rotate: 2 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="relative cursor-pointer"
              >
                {/* Treasure Chest Image */}
                <div className="relative w-96 h-72 md:w-[400px] md:h-[300px]">
                  <img
                    src="/img/treasure-chest.png"
                    alt="Treasure Chest"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />

                  {/* Glow effect when hovered */}
                  <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </motion.div>

              {/* Instruction */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8"
              >
                <p className="text-gray-300 text-sm animate-pulse">
                  Click the treasure chest to reveal the crew!
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Treasure Modal */}
      <AnimatePresence>
        {isTreasureOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsTreasureOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Treasure Chest Modal Container */}
              <div className="relative bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 rounded-xl border-4 border-amber-700 shadow-2xl p-8">

                {/* Modal Header */}
                <div className="text-center mb-8">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-pirate text-pirate-gold mb-2"
                  >
                    My Treasure Crew
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-amber-200"
                  >
                    The skilled crew that powers my adventures!
                  </motion.p>
                </div>

                {/* Crew Grid */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                        whileHover={{
                          scale: 1.05,
                          y: -5,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                        }}
                        className="relative group"
                      >
                        {/* Treasure Item */}
                        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-400 rounded-lg border-2 border-amber-600 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">

                          {/* Treasure Content */}
                          <div className="relative p-4">
                            {/* Treasure Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/50 to-transparent rounded-lg animate-pulse"></div>

                            {/* Skill Icon in Gold Frame */}
                            <div className="flex justify-center mb-3">
                              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full border-3 border-amber-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full border-2 border-amber-600 flex items-center justify-center">
                                  <span className="text-xl">{skill.icon}</span>
                                </div>
                              </div>
                            </div>

                            {/* Name */}
                            <div className="text-center">
                              <h4 className="text-sm font-bold text-amber-900 truncate">{skill.name}</h4>
                              <p className="text-xs text-amber-700 truncate">{skill.crewRole}</p>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-1 right-1">
                              <div className="px-1.5 py-0.5 bg-amber-700 text-yellow-200 text-xs rounded font-bold">
                                {skill.category}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setIsTreasureOpen(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-pirate-red text-white rounded-full flex items-center justify-center hover:bg-pirate-red-dark transition-colors z-20"
                >
                  ✕
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Skills
