import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-black/50 border-t-2 border-pirate-gold py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Copyright */}
          <p className="text-gray-300 mb-2">
            © {currentYear} Yared Gezahegn. All rights reserved.
          </p>
          
          {/* One Piece Credit */}
          <motion.p
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-pirate-gold text-sm mb-3"
          >
            🏴‍☠️ Design inspired by One Piece anime / Luffy 🏴‍☠️
          </motion.p>
        
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://github.com/JaredGezahegn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pirate-gold hover:text-pirate-gold-dark transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yared-gezahegn-224368388"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pirate-gold hover:text-pirate-gold-dark transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jaredgezahegn@gmail.com"
              className="text-pirate-gold hover:text-pirate-gold-dark transition-colors"
            >
              Email
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
