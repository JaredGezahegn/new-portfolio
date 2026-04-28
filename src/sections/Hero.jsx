import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { personalInfo } from '../data/portfolio'

const Hero = () => {
  return (
    <SectionWrapper id="hero" className="flex items-center justify-center px-4 xs:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-fluid-lg items-center max-w-7xl mx-auto">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <motion.h1
            className="fluid-5xl font-pirate text-pirate-gold mb-fluid-sm"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              lineHeight: 'clamp(2.2rem, 8.8vw, 4.4rem)'
            }}
          >
            {personalInfo.name}
          </motion.h1>

          <h2 className="fluid-3xl font-bold text-white mb-fluid-md">
            {personalInfo.title}
          </h2>

          <p className="fluid-lg text-gray-300 mb-fluid-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            {personalInfo.bio}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white px-8 py-4 rounded-xl font-bold fluid-base border-2 border-pirate-gold hover:shadow-lg hover:shadow-pirate-gold/50 transition-all min-h-[3.5rem] flex items-center justify-center touch-manipulation"
            >
              🏴‍☠️ View Adventures
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-pirate-gold text-pirate-gold px-8 py-4 rounded-xl font-bold fluid-base hover:bg-pirate-gold hover:text-ocean-blue transition-all min-h-[3.5rem] flex items-center justify-center touch-manipulation"
            >
              📬 Contact Me
            </motion.a>
          </div>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center order-1 lg:order-2 mb-fluid-lg lg:mb-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-sm"
          >
            <img
              src={personalInfo.image}
              alt={personalInfo.name}
              className="w-full h-auto rounded-2xl border-4 border-pirate-gold shadow-2xl shadow-pirate-gold/30"
              style={{ maxHeight: 'clamp(20rem, 50vh, 30rem)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Hero
