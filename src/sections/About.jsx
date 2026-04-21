import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'
import { personalInfo } from '../data/portfolio'

const About = () => {
  const bioContent = personalInfo.bio || "A full-stack developer sailing the Grand Line of code. 🏴‍☠️";

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
                a Full-Stack Developer sailing the Grand Line of code. Like Luffy assembling his 
                crew, I've built my stack from bow to stern — crafting pixel-perfect frontends 
                and engineering the backend systems that power them. Every application is a ship, 
                and I make sure both the Sails and the Engine Room are running at full force!
              </p>

              <p className="text-lg leading-relaxed">
                My voyage began on the Sails — HTML, CSS, React, and the winds of the frontend. 
                But no great pirate stops at the surface. I descended into the Engine Room, 
                mastering Python and Django to build REST APIs, manage databases, and keep the 
                ship moving even when the seas get rough. Full-stack means owning the whole 
                journey, from the first request to the final response.
              </p>

              <p className="text-lg leading-relaxed">
                A crew is only as strong as its Secure Communications — and I've studied the 
                ways of the Revolutionary Army. With JWT authentication, I ensure that only 
                the right nakama can access protected routes and sensitive data. Whether it's 
                locking down APIs or managing user sessions, I build with security as a 
                first-class citizen, not an afterthought.
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
