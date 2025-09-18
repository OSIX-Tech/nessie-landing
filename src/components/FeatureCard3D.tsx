import { useRef, useEffect } from 'react'

interface FeatureCard3DProps {
  feature: {
    title: string
    description: string
    icon: React.ReactNode
    gradient: string
  }
}

function FeatureCard3D({ feature }: FeatureCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      
      // Move glow effect
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
      glow.style.background = 'transparent'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 h-full"
      style={{
        background: 'rgba(10, 10, 10, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        transformStyle: 'preserve-3d',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
      }}>
      
      {/* Glow effect layer */}
      <div 
        ref={glowRef}
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`}></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px)`,
          animation: 'slidePattern 20s linear infinite'
        }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl mb-4 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
             style={{ 
               background: 'rgba(255, 255, 255, 0.1)',
               color: 'rgb(var(--color-white))',
               border: '1px solid rgba(255, 255, 255, 0.2)',
               transform: 'translateZ(20px)'
             }}>
          <div className="transition-transform duration-500">
            {feature.icon}
          </div>
        </div>
        
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 transition-colors duration-500" 
            style={{ 
              color: 'rgb(var(--color-white))',
              transform: 'translateZ(15px)'
            }}>
          {feature.title}
        </h3>
        
        <p className="text-sm md:text-base leading-relaxed transition-colors duration-500 group-hover:text-gray-200" 
           style={{ 
             color: 'rgb(var(--color-gray-400))',
             transform: 'translateZ(10px)'
           }}>
          {feature.description}
        </p>
        
        {/* Interactive indicator */}
        <div className="mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">Explorar</span>
            <svg className="w-5 h-5 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Decorative floating elements */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700"
           style={{ 
             background: 'rgb(var(--color-black))',
             transform: 'translateZ(-10px)'
           }} />
      
      {/* Animated particles on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
              animation: `float ${3 + i}s ease-in-out infinite ${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slidePattern {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(20px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-5px);
          }
        }
      `}</style>
    </div>
  )
}

export default FeatureCard3D