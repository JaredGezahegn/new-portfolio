import { useState } from 'react'
import { motion } from 'framer-motion'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  sizes = '100vw',
  priority = false,
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate WebP and fallback sources
  const generateSrcSet = (baseSrc) => {
    const extensions = ['webp', 'jpg', 'png']
    const widths = [320, 640, 768, 1024, 1280, 1536]
    
    return extensions.map(ext => 
      widths.map(width => `${baseSrc.replace(/\.[^/.]+$/, '')}-${width}w.${ext} ${width}w`).join(', ')
    )
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className={`bg-glass-light/30 rounded-lg flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-glass-light/30 rounded-lg animate-pulse" />
      )}
      
      <picture>
        {/* WebP source for modern browsers */}
        <source
          type="image/webp"
          srcSet={generateSrcSet(src)[0]}
          sizes={sizes}
        />
        
        {/* Fallback for older browsers */}
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      </picture>
    </div>
  )
}

export default OptimizedImage
