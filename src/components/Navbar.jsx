import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const audioRef = useRef(null)

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Crew (Skills)', href: '#skills' },
    { name: 'Adventures', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleLinkClick = (href) => {
    // Play Luffy stretch sound
    if (!audioRef.current) {
      audioRef.current = new Audio('/sound/anime-arm-stretch-one-piece-luffy-sound-effect-for-editing.mp3')
      audioRef.current.volume = 0.3
    }
    
    // Reset audio to beginning and play
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(err => console.log('Audio play failed:', err))

    // Set active link for animation
    setActiveLink(href)
    
    // Wait for animation then scroll
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
      setActiveLink('')
      setIsOpen(false)
    }, 600)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-ocean-blue/95 backdrop-blur-md border-b-2 border-pirate-gold shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-pirate text-pirate-gold"
          >
            🏴‍☠️ Yared's Crew
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                animate={activeLink === link.href ? {
                  scaleX: 2.5,
                  scaleY: 0.7,
                } : {
                  scaleX: 1,
                  scaleY: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 8
                }}
                whileHover={{ scale: 1.1 }}
                className="text-white hover:text-pirate-gold transition-colors font-semibold cursor-pointer"
              >
                {link.name}
              </motion.button>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-pirate-gold text-ocean-blue hover:bg-pirate-gold-dark transition-colors"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle Mobile */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-pirate-gold text-ocean-blue"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                animate={activeLink === link.href ? {
                  scaleX: 2,
                  scaleY: 0.7,
                } : {
                  scaleX: 1,
                  scaleY: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 8
                }}
                className="block w-full text-left py-2 px-4 text-white hover:bg-pirate-red/20 hover:text-pirate-gold transition-colors"
              >
                {link.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
