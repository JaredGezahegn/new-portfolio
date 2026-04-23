import { motion } from 'framer-motion'

const Skeleton = ({ className, variant = 'default' }) => {
  const variants = {
    default: 'h-4 w-full',
    card: 'h-48 w-full',
    text: 'h-4 w-3/4',
    title: 'h-8 w-2/3',
    button: 'h-10 w-24',
    circle: 'h-12 w-12 rounded-full',
    square: 'h-16 w-16',
  }

  return (
    <motion.div
      className={`bg-glass-light/30 rounded-lg ${variants[variant]} ${className}`}
      animate={{
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="bg-glass-dark backdrop-blur-md border border-pirate-gold/20 rounded-xl overflow-hidden shadow-2xl">
      {/* Image Skeleton */}
      <div className="relative h-48 overflow-hidden">
        <Skeleton variant="card" className="h-full" />
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6 bg-glass-light/50 space-y-4">
        <Skeleton variant="title" className="mb-2" />
        <Skeleton variant="text" className="mb-4" />
        
        {/* Tech Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        
        {/* Category Badge Skeleton */}
        <div className="mb-4">
          <Skeleton className="h-6 w-32 rounded-lg" />
        </div>
        
        {/* Buttons Skeleton */}
        <div className="flex gap-3">
          <Skeleton variant="button" className="flex-1" />
          <Skeleton variant="button" className="flex-1" />
        </div>
      </div>
    </div>
  )
}

export const SkillsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-glass-dark backdrop-blur-md border border-pirate-gold/20 rounded-xl p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton variant="circle" />
            <div className="flex-1">
              <Skeleton variant="title" className="h-6 w-32" />
              <Skeleton variant="text" className="h-4 w-24 mt-2" />
            </div>
          </div>
          <Skeleton className="h-3 w-full rounded-full mb-2" />
          <Skeleton className="h-3 w-3/4 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export default Skeleton
