import { useEffect, useRef } from 'react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.animate-on-load')
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up')
      }, index * 100)
    })
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden py-12 md:py-20">
      {/* Background gradient orbs - full width */}
      <div className="absolute inset-0 w-full">
        <div className="absolute top-1/4 -left-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] rounded-full opacity-[0.15]"
             style={{ 
               background: 'radial-gradient(circle, rgb(var(--color-gray-400)) 0%, transparent 60%)',
               filter: 'blur(80px)'
             }} />
        <div className="absolute bottom-0 -right-1/4 w-[500px] md:w-[800px] lg:w-[1000px] h-[500px] md:h-[800px] lg:h-[1000px] rounded-full opacity-[0.08]"
             style={{ 
               background: 'radial-gradient(circle, rgb(var(--color-black)) 0%, transparent 60%)',
               filter: 'blur(100px)'
             }} />
      </div>

      <div className="relative w-full px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left content */}
            <div>
              {/* Main headline */}
              <h1 className="heading-xl animate-on-load opacity-0 mb-4 md:mb-6 mt-0 lg:-mt-8" 
                  style={{ color: 'rgb(var(--color-black))' }}>
                Tu conocimiento
                <br />
                empresarial,
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-500)) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>reinventado.</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-lg md:text-xl lg:text-2xl animate-on-load opacity-0 mb-6 md:mb-10 max-w-xl leading-relaxed"
                 style={{ color: 'rgb(var(--color-gray-600))' }}>
                Centraliza, busca y comprende toda la información de tu empresa con IA 
                de última generación. Sin configuración compleja.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-on-load opacity-0">
                <a href="#" 
                   className="group btn-primary inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base">
                  Empezar ahora
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#" 
                   className="btn-secondary inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base group">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Ver demo 
                </a>
              </div>
            </div>

            {/* Right visual - Abstract geometric composition */}
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] hidden md:flex items-center justify-center">
              <div className="relative w-full max-w-[600px] h-full">
                {/* Large circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] lg:w-[400px] h-[250px] md:h-[350px] lg:h-[400px] rounded-full"
                     style={{ 
                       background: 'radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)',
                       animation: 'pulse 4s ease-in-out infinite'
                     }}></div>
                
                {/* Rotating ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[300px] lg:w-[350px] h-[220px] md:h-[300px] lg:h-[350px] rounded-full"
                     style={{ 
                       border: '2px solid rgba(0, 0, 0, 0.1)',
                       animation: 'rotate 20s linear infinite'
                     }}></div>
                
                {/* Center logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center p-3 md:p-4"
                       style={{ 
                         background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-700)) 100%)',
                         boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
                         animation: 'float 6s ease-in-out infinite'
                       }}>
                    <img src="/logo_w.png" alt="Nessie Logo" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Orbiting dots */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[380px] lg:w-[450px] h-[280px] md:h-[380px] lg:h-[450px]"
                     style={{ animation: 'rotate 15s linear infinite reverse' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 rounded-full"
                       style={{ background: 'rgb(var(--color-black))' }}></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 rounded-full"
                       style={{ background: 'rgb(var(--color-gray-500))' }}></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 rounded-full"
                       style={{ background: 'rgb(var(--color-gray-700))' }}></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 md:w-2.5 lg:w-3 h-2 md:h-2.5 lg:h-3 rounded-full"
                       style={{ background: 'rgb(var(--color-gray-300))' }}></div>
                </div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{
                       backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgb(var(--color-black)) 39px, rgb(var(--color-black)) 40px),
                                         repeating-linear-gradient(90deg, transparent, transparent 39px, rgb(var(--color-black)) 39px, rgb(var(--color-black)) 40px)`
                     }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-20px) rotate(1deg);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.03;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.05;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero