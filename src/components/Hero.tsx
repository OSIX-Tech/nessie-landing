import { useEffect, useRef, useState } from 'react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown timer
  useEffect(() => {
    const launchDate = new Date('2025-12-01T00:00:00').getTime()
    
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = launchDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      setMousePosition({
        x: (clientX - innerWidth / 2) / innerWidth,
        y: (clientY - innerHeight / 2) / innerHeight
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Fade in animation on mount
  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.animate-on-load')
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in')
      }, index * 100)
    })
  }, [])

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden isolate"
    >
      {/* Background Layer 1: Very subtle radial gradient for depth */}
      <div className="absolute inset-0 -z-30">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%]"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)'
          }}
        />
      </div>

      {/* Background Layer 4: Side images with 3D depth */}
      {!isMobile && (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          {/* Left image */}
          <div 
            className="absolute left-[8%] top-[55%] -translate-y-1/2 w-[500px] h-[350px] opacity-[0.65]"
            style={{
              transform: `perspective(1200px) rotateY(25deg) rotateX(5deg) translateZ(-100px) translateY(${scrollY * 0.15}px)`,
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              filter: 'drop-shadow(-20px 30px 40px rgba(0, 0, 0, 0.5))',
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img 
                src="/nessiebb.jpg" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent)'
                }}
              />
            </div>
          </div>

          {/* Right image */}
          <div 
            className="absolute right-[8%] top-[55%] -translate-y-1/2 w-[500px] h-[350px] opacity-[0.65]"
            style={{
              transform: `perspective(1200px) rotateY(-25deg) rotateX(5deg) translateZ(-100px) translateY(${-scrollY * 0.15}px)`,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              filter: 'drop-shadow(20px 30px 40px rgba(0, 0, 0, 0.5))',
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <img 
                src="/nessiebb.jpg" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent)'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Background Layer 5: Floating orbs for atmosphere */}
      <div className="absolute inset-0 -z-15">
        <div 
          className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 50%)',
            filter: 'blur(80px)',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 4s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.015) 0%, transparent 50%)',
            filter: 'blur(100px)',
            transform: `translate(${-mousePosition.x * 25}px, ${-mousePosition.y * 25}px)`,
            transition: 'transform 4s ease-out'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center space-y-8">

          {/* Headline */}
          <div className="animate-on-load opacity-0 space-y-4 pt-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Tu conocimiento empresarial</span>
              <br />
              <span 
                className="text-white relative inline-block"
                style={{
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1)'
                }}
              >
                unificado con IA
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas al instante en todos tus documentos.
              <span className="block text-base text-zinc-500 mt-2">
                Google Drive · Notion · Slack · +50 integraciones
              </span>
            </p>
          </div>

          {/* CTAs */}
          <div className="animate-on-load opacity-0 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#wishlist"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group px-8 py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                background: 'rgb(var(--color-white))',
                color: 'rgb(var(--color-black))',
                boxShadow: '0 4px 14px rgba(255, 255, 255, 0.25)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.25)'
              }}
              aria-label="Únete al Early Access"
            >
              <span className="flex items-center gap-2">
                Únete al Early Access
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            
            <button 
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full font-medium transition-all duration-300"
              style={{
                background: 'transparent',
                color: 'rgb(var(--color-gray-400))',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.currentTarget.style.color = 'rgb(var(--color-white))'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.color = 'rgb(var(--color-gray-400))'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
              aria-label="Descubre más sobre Nessie"
            >
              Descubre más
            </button>
          </div>

          {/* Benefits */}
          <div className="animate-on-load opacity-0 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Setup en 2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cifrado end-to-end</span>
            </div>
          </div>


          {/* Countdown */}
          <div className="animate-on-load opacity-0 pt-8">
            <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">Lanzamiento en</p>
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center px-2">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-zinc-600 mt-1 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Logos */}
          <div className="animate-on-load opacity-0 mt-16">
            <p className="text-xs uppercase tracking-wider text-zinc-600 mb-8">Integrado con tus herramientas favoritas</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-20 hover:opacity-30 transition-opacity duration-500">
              {/* Gmail */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </div>
              
              {/* Slack */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
                </svg>
              </div>

              {/* Notion */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933z"/>
                </svg>
              </div>

              {/* Google Drive */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M12.01 5.5L4.3 18.5h7.71l7.71-13H12.01zm-1.93 1L6.38 13h7.71l3.7-6.5h-7.71zm11.57 7l-3.86 6.5H24l-3.86-6.5h-7.71l3.86 6.5h3.86l1.5-2.5 1.5 2.5h.86l-2.36-4 2.36-4h-.86l-1.5 2.5z"/>
                </svg>
              </div>

              {/* YouTube */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>

              {/* Spotify */}
              <div className="transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="white" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-fade-in {
            animation: none !important;
          }
          
          .transition-transform {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero