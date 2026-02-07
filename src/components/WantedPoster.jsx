import { motion } from 'framer-motion'

const WantedPoster = ({ name, bounty, image }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8 }}
      className="wanted-poster max-w-md mx-auto p-6 relative"
    >
      {/* WANTED Header */}
      <div className="text-center mb-4">
        <h2 className="text-5xl font-pirate text-ink-black mb-2">WANTED</h2>
        <div className="border-t-4 border-b-4 border-ink-black py-2">
          <p className="text-2xl font-bold text-ink-black">DEAD OR ALIVE</p>
        </div>
      </div>

      {/* Image */}
      <div className="mb-4 border-4 border-ink-black overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-auto"
        />
      </div>

      {/* Name */}
      <div className="text-center mb-4">
        <h3 className="text-3xl font-pirate text-ink-black">{name}</h3>
      </div>

      {/* Bounty */}
      <div className="text-center border-4 border-ink-black bg-white p-4">
        <p className="text-sm text-gray-600 mb-1">BOUNTY</p>
        <p className="text-4xl font-pirate text-pirate-red">
          ฿{bounty}
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-ink-black"></div>
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-ink-black"></div>
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-ink-black"></div>
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-ink-black"></div>
    </motion.div>
  )
}

export default WantedPoster
