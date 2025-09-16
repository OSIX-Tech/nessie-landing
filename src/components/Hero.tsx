import { useEffect, useState } from 'react'

function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle depth effect */}
      <div className="absolute inset-0 -z-10">
        {/* Center glow */}
        <div className="absolute inset-0"
             style={{
               background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%)'
             }}/>
      </div>

      {/* Content */}
      <div className={`w-full max-w-5xl mx-auto px-6 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>

        {/* Main headline - ultra clean */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}>
          <span style={{ color: 'rgb(var(--color-white))' }}>
            Encuentra cualquier
          </span>
          <br />
          <span style={{ color: 'rgb(var(--color-white))' }}>
            respuesta en
          </span>
          {' '}
          <span className="relative inline-block">
            <span style={{
              color: 'rgb(var(--color-white))',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.5), 0 0 80px rgba(255, 255, 255, 0.3)'
            }}>
              segundos
            </span>
            {/* Subtle glow behind text */}
            <div className="absolute inset-0 blur-3xl opacity-20"
                 style={{
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 70%)'
                 }}/>
          </span>
        </h1>

        {/* Subheadline - minimal */}
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-12"
           style={{
             color: 'rgb(var(--color-gray-500))',
             animation: 'fade-in-up 0.8s ease-out 0.3s both'
           }}>
          IA que lee, entiende y cita tus documentos.
        </p>

        {/* Single CTA */}
        <div className="flex flex-col items-center gap-6"
             style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both' }}>
          <a href="#wishlist"
             onClick={(e) => {
               e.preventDefault()
               document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
             }}
             className="group relative px-10 py-4 rounded-full text-base font-medium transition-all duration-300"
             style={{
               background: 'rgba(255, 255, 255, 0.95)',
               color: 'rgb(var(--color-black))',
               border: '1px solid rgba(255, 255, 255, 0.2)',
               backdropFilter: 'blur(10px)',
               WebkitBackdropFilter: 'blur(10px)',
               boxShadow: '0 10px 40px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
             }}
             onMouseEnter={(e) => {
               e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
               e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
               e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 255, 255, 0.15), 0 10px 20px rgba(0, 0, 0, 0.1)'
             }}
             onMouseLeave={(e) => {
               e.currentTarget.style.transform = 'translateY(0) scale(1)'
               e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
               e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)'
             }}>
            <span className="relative z-10">
              Únete a la lista de espera
            </span>
            {/* Grid pattern overlay on hover */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{
                   backgroundImage: `
                     linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.5) 50%, transparent 60%)
                   `,
                   animation: 'shimmer-slide 1s ease-out'
                 }}></div>
          </a>

          {/* Minimal trust signal */}
          <p className="text-sm flex items-center gap-3"
             style={{ color: 'rgb(var(--color-gray-600))' }}>
            <span>Sin tarjeta</span>
            <span className="opacity-40">•</span>
            <span className="font-medium" style={{ color: 'rgb(var(--color-gray-400))' }}>
              2,847 profesionales esperando
            </span>
          </p>
        </div>

        {/* Grid decoration elements */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 border rounded-lg"
             style={{
               borderColor: 'rgba(255, 255, 255, 0.03)',
               transform: 'rotate(12deg) translateY(-50%)',
               animation: 'float-slow 15s ease-in-out infinite'
             }}/>
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 border rounded-lg"
             style={{
               borderColor: 'rgba(255, 255, 255, 0.03)',
               transform: 'rotate(-12deg) translateY(-50%)',
               animation: 'float-slow 18s ease-in-out infinite reverse'
             }}/>
      </div>

      {/* Minimal scroll indicator with grid style */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2"
           style={{ animation: 'fade-in 1s ease-out 0.8s both' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i}
                   className="w-1 h-1 rounded-full"
                   style={{
                     background: 'rgba(255, 255, 255, 0.3)',
                     animation: `pulse-grid 2s ease-in-out infinite`,
                     animationDelay: `${i * 0.1}s`
                   }}/>
            ))}
          </div>
          <div className="w-[1px] h-8 relative overflow-hidden"
               style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <div className="absolute top-0 left-0 w-full h-3"
                 style={{
                   background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.5), transparent)',
                   animation: 'scroll-indicator 2s ease-in-out infinite'
                 }}/>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-fade {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(-50%) rotate(12deg) scale(1);
          }
          50% {
            transform: translateY(-50%) rotate(12deg) scale(1.05);
          }
        }

        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scroll-indicator {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(5px);
            opacity: 1;
          }
        }

        @keyframes pulse-grid {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.5);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero