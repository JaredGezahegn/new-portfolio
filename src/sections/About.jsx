import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { personalInfo } from '../data/portfolio'

const About = () => {
  return (
    <SectionWrapper id="about">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pirate text-pirate-gold mb-4">
            About the Captain
          </h2>
          <p className="text-xl text-gray-300">
            My journey through the Grand Line of code
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="paper-texture rounded-lg p-8 border-2 border-ink-black shadow-xl"
          >
            <div className="space-y-6 text-ink-black">
              <p className="text-lg leading-relaxed">
                Ahoy! I'm <span className="font-bold text-pirate-red">{personalInfo.name}</span>, 
                a passionate frontend developer sailing through the vast ocean of technology. 
                Like Luffy searching for the One Piece, I'm on a quest to master the art of 
                creating exceptional web applications!
              </p>

              <p className="text-lg leading-relaxed">
                My journey started with HTML and CSS, and has evolved into a grand adventure 
                involving React, modern JavaScript, and cutting-edge CSS frameworks. Each project is 
                a new island to explore, each bug a challenge to overcome, and each successful 
                deployment a treasure worth celebrating!
              </p>

              <p className="text-lg leading-relaxed">
                I believe in writing clean, maintainable code and creating user experiences 
                that are as smooth as sailing with a favorable wind. Whether it's building 
                responsive interfaces, crafting beautiful designs, or optimizing performance, 
                I approach every challenge with the determination of a true pirate!
              </p>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <motion.a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block bg-gradient-to-r from-pirate-red to-pirate-red-dark text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-pirate-gold hover:shadow-lg hover:shadow-pirate-gold/50 transition-all"
                >
                  📜 View My Resume
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

export default About
