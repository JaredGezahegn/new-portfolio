import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { personalInfo } from '../data/portfolio'

const About = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const bioContent = personalInfo.bio || "A full-stack developer sailing the Grand Line of code. 🏴‍☠️";

  const message = [
    `Ahoy! I'm ${personalInfo.name}, a Full-Stack Developer sailing the Grand Line of code. Like Luffy assembling his crew, I've built my stack from bow to stern — crafting pixel-perfect frontends and engineering the backend systems that power them. Every application is a ship, and I make sure both the Sails and the Engine Room are running at full force!`,

    `My voyage began on the Sails — HTML, CSS, React, and the winds of the frontend. But no great pirate stops at the surface. I descended into the Engine Room, mastering Python and Django to build REST APIs, manage databases, and keep the ship moving even when the seas get rough. Full-stack means owning the whole journey, from the first request to the final response.`,

    `A crew is only as strong as its Secure Communications — and I've studied the ways of the Revolutionary Army. With JWT authentication, I ensure that only the right nakama can access protected routes and sensitive data. Whether it's locking down APIs or managing user sessions, I build with security as a first-class citizen, not an afterthought.`
  ]

  return (
    <>
      <SectionWrapper id="about">
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
              Message in a Bottle
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              A captain's tale from the Grand Line of code
            </motion.p>
          </div>

          {/* Bottle Only */}
          <div className="max-w-6xl mx-auto relative flex justify-center items-center min-h-[400px]">
            {/* Bottle Floating */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <motion.div
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                {/* Bottle Image */}
                <div className="relative w-[180px] h-[360px]">
                  <img
                    src="/img/bottle.png"
                    alt="Message in a Bottle"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />

                  {/* Message overlay to maintain the "Help Find Me" text */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[80px] h-[100px] bg-amber-100/90 rounded-md shadow-inner rotate-6 flex items-center justify-center pointer-events-none">
                    <div className="text-[8px] text-gray-700 leading-tight px-2 text-center font-bold">
                      Help
                      <br />
                      Find Me
                    </div>
                  </div>

                  {/* Glass highlight effect */}
                  <div className="absolute left-4 top-20 w-4 h-32 bg-white/20 rounded-full blur-sm pointer-events-none"></div>
                </div>
              </motion.div>
            </motion.div>

            {/* Instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-0 left-0 right-0 text-center mt-8"
            >
              <p className="text-gray-300 dark:text-gray-400 text-sm animate-pulse">
                🍾 Click the bottle to read the message
              </p>
            </motion.div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Large Bottle */}
              <div className="relative bg-gradient-to-br from-green-200/30 via-green-300/40 to-green-400/30 rounded-t-full rounded-b-3xl border-4 border-green-600/50 shadow-2xl backdrop-blur-sm p-8">

                {/* Cork */}
                <motion.div
                  initial={{ y: -30, rotate: 0 }}
                  animate={{ y: -50, rotate: 15 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-full border-4 border-amber-900 shadow-2xl z-10"
                >
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-amber-900 rounded-full"></div>
                </motion.div>

                {/* Water inside */}
                <div className="relative h-[70vh] bg-gradient-to-t from-blue-500/40 via-blue-400/30 to-transparent rounded-b-3xl">
                  {/* Message Paper */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute inset-8 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg shadow-inner p-8 overflow-hidden"
                  >
                    <div className="h-full overflow-y-auto custom-scrollbar">
                      <div className="space-y-6 text-amber-900">
                        {message.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.2 }}
                            className="text-lg leading-relaxed font-serif"
                          >
                            {paragraph}
                          </motion.p>
                        ))}

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.5 }}
                          className="text-center pt-8"
                        >
                          <motion.a
                            href={personalInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white px-8 py-3 rounded-lg font-bold text-lg border-2 border-pirate-gold hover:shadow-lg hover:shadow-pirate-gold/50 transition-all"
                          >
                            📜 View My Resume
                          </motion.a>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Glass Reflection */}
                <div className="absolute top-8 left-8 w-12 h-32 bg-white/20 rounded-full blur-md"></div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setIsModalOpen(false)}
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

export default About
