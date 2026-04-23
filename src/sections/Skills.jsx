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
                className="relative cursor-pointer"
              >
                {/* Treasure Chest Body */}
                <div className="relative">
                  {/* Chest Body */}
                  <div className="relative w-72 h-52 md:w-80 md:h-56">
                    <div className="absolute bottom-0 w-full h-[180px] bg-[radial-gradient(circle_at_30%_30%,#4a3426,#2c1e15)] rounded-md shadow-2xl border-4 border-yellow-700">
                      {/* Vertical Straps with Gradients */}
                      <div className="absolute left-6 top-0 h-full w-6 bg-gradient-to-b from-yellow-400 to-yellow-700 border border-yellow-800" />
                      <div className="absolute right-6 top-0 h-full w-6 bg-gradient-to-b from-yellow-400 to-yellow-700 border border-yellow-800" />
                      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-6 bg-gradient-to-b from-yellow-400 to-yellow-700 border border-yellow-800" />

                      {/* Studs with Gradients */}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-md border border-yellow-600"
                          style={{ top: `${20 + i * 25}px`, left: "12px" }}
                        />
                      ))}
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-md border border-yellow-600"
                          style={{ top: `${20 + i * 25}px`, right: "12px" }}
                        />
                      ))}

                      {/* Skull Emoji */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-gray-300 to-gray-100 rounded-full flex items-center justify-center shadow-xl border-2 border-gray-500">
                        <span className="text-6xl">☠️</span>
                      </div>

                      {/* Curved Pearls */}
                      <div className="absolute left-10 top-2">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full shadow-sm"
                            style={{
                              position: 'absolute',
                              top: `${i * 8}px`,
                              left: `${Math.sin(i * 0.3) * 3}px`
                            }}
                          />
                        ))}
                      </div>
                      <div className="absolute right-10 top-2">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-white rounded-full shadow-sm"
                            style={{
                              position: 'absolute',
                              top: `${i * 8}px`,
                              right: `${Math.sin(i * 0.3) * 3}px`
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Lid */}
                    <motion.div
                      animate={isTreasureOpen ? { rotateX: -110 } : { rotateX: 0 }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="absolute top-0 w-full h-[120px] bg-[radial-gradient(circle_at_30%_30%,#4a3426,#2c1e15)] rounded-t-[100%] border-4 border-yellow-700 overflow-hidden"
                      style={{ transformOrigin: 'bottom center' }}
                    >
                      {/* Gold Rim */}
                      <div className="absolute top-0 w-full h-6 bg-gradient-to-b from-yellow-400 to-yellow-700 border-b border-yellow-800 shadow-md"></div>

                      {/* Better Gems */}
                      <div className="absolute top-2 left-4 flex gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-300 to-red-600 ring-2 ring-white/40 shadow-sm"></div>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 ring-2 ring-white/40 shadow-sm"></div>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-300 to-green-600 ring-2 ring-white/40 shadow-sm"></div>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-300 to-purple-600 ring-2 ring-white/40 shadow-sm"></div>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 ring-2 ring-white/40 shadow-sm"></div>
                      </div>

                      {/* Coins with Gradients */}
                      <div className="absolute top-6 w-full flex flex-wrap px-4 gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-700 rounded-full shadow-sm border border-yellow-600"
                          />
                        ))}
                      </div>

                      {/* Highlight Strip */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </motion.div>
                  </div>

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
