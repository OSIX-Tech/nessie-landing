import { useEffect, useState } from 'react'
import { API_ENDPOINTS, apiRequest } from '../lib/api'

function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [confirmedCount, setConfirmedCount] = useState(2847) // Valor por defecto

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  // Cargar contador al montar el componente
  useEffect(() => {
    const loadCount = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.count)
        setConfirmedCount(response.confirmed || 2847)
      } catch {
        // Mantener el valor por defecto si falla
      }
    }
    loadCount()
  }, [])

  return (
    <section id="hero" className="relative pt-16 md:pt-0 min-h-[85vh] md:min-h-screen md:flex md:items-center md:justify-center md:pb-0 overflow-hidden">
      {/* Subtle depth effect */}
      <div className="absolute inset-0 -z-10">
        {/* Center glow */}
        <div className="absolute inset-0"
             style={{
               background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 60%)'
             }}/>
      </div>

      {/* Nessie background image - visible on desktop */}
      <img
        src="/NessieUP.png"
        alt=""
        className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[12%] xl:w-[15%] 2xl:w-[18%] h-auto opacity-90 pointer-events-none"
        style={{
          animation: 'float-subtle 12s ease-in-out infinite',
          filter: 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.15))',
          zIndex: 0
        }}
      />

      {/* Content */}
      <div className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center transition-all duration-1000 flex flex-col justify-center md:justify-center min-h-[85vh] md:min-h-0 md:py-0 md:mt-8 lg:mt-12 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>


          {/* Main headline - ultra clean, optimized */}
          <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl xl:text-8xl md:font-bold md:leading-[0.95] lg:leading-[0.9] tracking-tight mb-4 md:mb-8 px-2"
              style={{ animation: 'fade-in-up 0.5s ease-out 0.1s both' }}>
            <span className="block" style={{ color: 'rgb(var(--color-white))' }}>
              Encuentra cualquier respuesta en{' '}
            <span className="relative inline-block pb-1">
              <span style={{
                background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-300)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                segundos
              </span>
              {/* Optimized glow - better performance */}
              <div className="absolute inset-0 blur-2xl opacity-30 pointer-events-none will-change-opacity"
                   style={{
                     background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.8) 0%, transparent 60%)'
                   }}/>
            </span>
            </span>
          </h1>

          {/* Subheadline - minimal */}
          <p className="text-[15px] sm:text-base text-neutral-400 mt-2 mb-10 md:text-2xl md:max-w-2xl mx-auto md:mb-12 md:px-0"
             style={{
               color: 'rgb(var(--color-gray-400))',
               animation: 'fade-in-up 0.5s ease-out 0.2s both'
             }}>
            IA que lee, entiende y cita tus documentos.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col items-center gap-4 mt-4 md:mt-10 lg:mt-12"
               style={{ animation: 'fade-in-up 0.5s ease-out 0.3s both' }}>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">

            {/* Primary CTA */}
            <a href="#wishlist"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
               }}
              className="hero-cta-primary group relative w-full sm:flex-1 py-3 text-sm rounded-full font-medium text-center">
              <span className="relative z-10">
                Únete
              </span>
              {/* Shimmer effect on hover */}
              <div className="hero-shimmer"></div>
            </a>

            {/* Secondary CTA */}
            <a href="#features"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
               }}
              className="hero-cta-secondary group relative w-full sm:flex-1 py-3 text-sm rounded-full font-medium text-center">
              <span className="relative z-10">
                Ver características
              </span>
            </a>
            </div>

            {/* Enhanced trust signal with icons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-2 text-xs md:text-sm"
                 style={{ color: 'rgb(var(--color-gray-400))' }}>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sin tarjeta
              </span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
  {confirmedCount.toLocaleString()} esperando
              </span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Acceso en 2 min
              </span>
            </div>
          </div>
      </div>

      {/* Grid decoration elements - hidden on mobile */}
      <div className="hidden md:block absolute -left-20 top-1/2 -translate-y-1/2 w-32 md:w-40 h-32 md:h-40 border rounded-lg"
           style={{
             borderColor: 'rgba(255, 255, 255, 0.03)',
             transform: 'rotate(12deg) translateY(-50%)',
             animation: 'float-slow 15s ease-in-out infinite'
           }}/>
      <div className="hidden md:block absolute -right-20 top-1/2 -translate-y-1/2 w-32 md:w-40 h-32 md:h-40 border rounded-lg"
           style={{
             borderColor: 'rgba(255, 255, 255, 0.03)',
             transform: 'rotate(-12deg) translateY(-50%)',
             animation: 'float-slow 18s ease-in-out infinite reverse'
           }}/>

      {/* Scroll indicator - subtle and minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
           style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>
        <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
        </svg>
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

        @keyframes float-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes scroll-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.4;
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