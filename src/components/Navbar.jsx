import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass-dark backdrop-blur-lg border-b border-pirate-gold/30 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 xs:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl xs:text-2xl font-pirate text-pirate-gold touch-manipulation"
          >
            🏴‍☠️ Yared's Crew
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                animate={activeLink === link.href ? {
                  scaleX: 1.1,
                  scaleY: 0.9,
                } : {
                  scaleX: 1,
                  scaleY: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 8
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-pirate-gold transition-colors font-semibold cursor-pointer touch-manipulation py-2 px-1"
              >
                {link.name}
              </motion.button>
            ))}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-glass-light backdrop-blur-md border border-pirate-gold/30 text-pirate-gold hover:bg-glass-dark hover:border-pirate-gold/50 transition-all duration-300 shadow-lg touch-manipulation min-w-[3rem] min-h-[3rem] flex items-center justify-center"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Theme Toggle Mobile */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full bg-glass-light backdrop-blur-md border border-pirate-gold/30 text-pirate-gold hover:bg-glass-dark hover:border-pirate-gold/50 transition-all duration-300 touch-manipulation min-w-[2.5rem] min-h-[2.5rem] flex items-center justify-center"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="text-white focus:outline-none p-2 rounded-lg hover:bg-pirate-red/20 transition-colors touch-manipulation min-w-[3rem] min-h-[3rem] flex items-center justify-center"
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
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isOpen ? {
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.3, ease: "easeInOut" }
          } : {
            height: 0,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeInOut" }
          }}
          className="overflow-hidden lg:hidden"
        >
          <div className="pb-4">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.98 }}
                className={`block w-full text-left py-4 px-4 text-white hover:bg-pirate-red/20 hover:text-pirate-gold transition-all touch-manipulation text-lg font-medium rounded-lg mb-2 ${activeLink === link.href ? 'bg-pirate-red/30 text-pirate-gold' : ''
                  }`}
              >
                {link.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  )
}

export default Navbar
