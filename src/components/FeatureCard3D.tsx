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
  const iconRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  

  useEffect(() => {
    const glow = glowRef.current
    if (glow) {
      glow.style.background = 'radial-gradient(300px 300px at 50% 40%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 30%, transparent 65%)'
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className="group relative overflow-hidden rounded-xl md:rounded-3xl p-4 md:p-8 transition-all duration-300 h-full md:hover:scale-[1.02]"
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
        <div ref={iconRef} className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl mb-3 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
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
        
        <h3 ref={titleRef} className="text-lg md:text-xl font-bold mb-1.5 md:mb-3 transition-colors duration-500" 
            style={{ 
              color: 'rgb(var(--color-white))',
              transform: 'translateZ(15px)'
            }}>
          {feature.title}
        </h3>
        
        <p ref={descRef} className="text-sm md:text-base leading-relaxed transition-colors duration-500 group-hover:text-gray-200" 
           style={{ 
             color: 'rgb(var(--color-gray-400))',
             transform: 'translateZ(10px)'
           }}>
          {feature.description}
        </p>
        
        {/* Interactive indicator */}
        <div className="mt-3 md:mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-white">Explorar</span>
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