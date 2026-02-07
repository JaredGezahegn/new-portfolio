import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { personalInfo } from '../data/portfolio'

const Hero = () => {
  return (
    <SectionWrapper id="hero" className="flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-pirate text-pirate-gold mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {personalInfo.name}
          </motion.h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {personalInfo.title}
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {personalInfo.bio}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-pirate-gold hover:shadow-lg hover:shadow-pirate-gold/50 transition-all"
            >
              🏴‍☠️ View Adventures
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-pirate-gold text-pirate-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-pirate-gold hover:text-ocean-blue transition-all"
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
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={personalInfo.image}
              alt={personalInfo.name}
              className="max-w-sm w-full rounded-2xl border-4 border-pirate-gold shadow-2xl shadow-pirate-gold/30"
            />
            
            {/* Bounty Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-4 -right-4 bg-pirate-red border-4 border-pirate-gold rounded-full p-4 shadow-xl"
            >
              <p className="text-white font-pirate text-center">
                <span className="text-sm block">Bounty</span>
                <span className="text-xl">฿{personalInfo.bounty}</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default Hero
