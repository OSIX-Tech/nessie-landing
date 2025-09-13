import { useEffect, useRef, useState } from 'react'

function HeroImproved() {
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
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

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden isolate bg-neutral-950"
    >
      {/* Background Layer 1: Base gradient */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      </div>

      {/* Background Layer 2: Animated radial gradient with breathing effect */}
      <div className="absolute inset-0 -z-20 opacity-40">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] animate-pulse"
          style={{
            background: 'radial-gradient(circle at center, rgb(99 102 241 / 0.15) 0%, transparent 50%)',
            animation: 'breathing 8s ease-in-out infinite'
          }}
        />
      </div>

      {/* Background Layer 3: Grid with animated points */}
      <div className="absolute inset-0 -z-10">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="0" cy="0" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '0s' }} />
              <circle cx="40" cy="0" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '2s' }} />
              <circle cx="0" cy="40" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '4s' }} />
              <circle cx="40" cy="40" r="1" fill="white" className="animate-pulse" style={{ animationDelay: '6s' }} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Background Layer 4: Floating orbs with parallax */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl motion-safe:transition-transform motion-safe:duration-[2000ms]"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl motion-safe:transition-transform motion-safe:duration-[2000ms]"
          style={{
            transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl motion-safe:transition-transform motion-safe:duration-[2000ms]"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        />
      </div>

      {/* Spotlight effect */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950/60" />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[100%]"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center space-y-8">
          
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm
                       motion-safe:animate-fade-in-up motion-safe:animation-delay-0"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-neutral-300">Early Access • Lanzamiento Dic 2025</span>
          </div>

          {/* Headline */}
          <div className="space-y-4 motion-safe:animate-fade-in-up motion-safe:animation-delay-100">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-white">Tu conocimiento empresarial</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
                unificado con IA
              </span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas al instante en todos tus documentos.
              <span className="block text-base text-neutral-500 mt-2">
                Google Drive · Notion · Slack · +50 integraciones
              </span>
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center motion-safe:animate-fade-in-up motion-safe:animation-delay-200">
            <button 
              className="group relative px-8 py-4 bg-white text-neutral-950 font-semibold rounded-full
                         hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 
                         focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950
                         transition-all duration-200 motion-safe:hover:scale-[1.02]"
              aria-label="Únete al Early Access"
            >
              <span className="relative z-10 flex items-center gap-2">
                Únete al Early Access
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-fuchsia-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>
            
            <button 
              className="px-8 py-4 text-neutral-300 font-medium rounded-full border border-white/10
                         hover:bg-white/5 hover:text-white hover:border-white/20
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                         transition-all duration-200"
              aria-label="Descubre más sobre Nessie"
            >
              Descubre más
            </button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-neutral-400 motion-safe:animate-fade-in-up motion-safe:animation-delay-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Setup en 2 minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Cifrado end-to-end</span>
            </div>
          </div>

          {/* Countdown */}
          <div className="pt-8 motion-safe:animate-fade-in-up motion-safe:animation-delay-400">
            <p className="text-xs uppercase tracking-wider text-neutral-500 mb-4">Lanzamiento en</p>
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white tabular-nums">
                    {String(value).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-neutral-500 mt-1 capitalize">{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Mockups with Parallax */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] opacity-20 blur-[1px]
                       motion-safe:transition-transform motion-safe:duration-500 hidden xl:block"
            style={{
              transform: `translateY(${-50 + scrollY * 0.1}%) translateX(${mousePosition.x * 10}px) rotateY(25deg)`
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-white/10" />
          </div>
          
          <div 
            className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[250px] opacity-20 blur-[1px]
                       motion-safe:transition-transform motion-safe:duration-500 hidden xl:block"
            style={{
              transform: `translateY(${-50 - scrollY * 0.1}%) translateX(${mousePosition.x * -10}px) rotateY(-25deg)`
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border border-white/10" />
          </div>
        </div>

        {/* Integration Logos */}
        <div className="mt-20 motion-safe:animate-fade-in-up motion-safe:animation-delay-500">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-8">Integrado con tus herramientas favoritas</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-40">
            {['Gmail', 'Slack', 'Notion', 'Drive', 'Teams', 'Dropbox', 'Jira', 'Confluence'].map((tool) => (
              <div key={tool} className="text-neutral-400 hover:text-neutral-200 transition-colors">
                <span className="text-sm font-medium">{tool}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes breathing {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-0 { animation-delay: 0ms; }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-ping,
          .animate-fade-in-up,
          [class*="motion-safe:"] {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroImproved