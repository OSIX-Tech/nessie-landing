import { useEffect, useRef } from 'react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.animate-on-load')
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in')
      }, index * 100)
    })
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01]"
           style={{
             backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
             backgroundSize: '50px 50px'
           }} />
      
      {/* Gradient orbs for depth */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.15]"
           style={{ 
             background: 'radial-gradient(circle, rgb(var(--color-gray-600)) 0%, transparent 70%)',
             filter: 'blur(100px)'
           }} />
      <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-[0.1]"
           style={{ 
             background: 'radial-gradient(circle, rgb(var(--color-gray-700)) 0%, transparent 70%)',
             filter: 'blur(120px)'
           }} />

      <div className="relative w-full px-6 md:px-12 lg:px-24 z-10">
        <div className="max-w-[1200px] mx-auto text-center">
          
          {/* Main headline */}
          <h1 className="animate-on-load opacity-0 mt-16 md:mt-20"
              style={{ 
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'rgb(var(--color-white))',
                marginBottom: '1.5rem'
              }}>
            Tu conocimiento empresarial
            <br />
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>potenciado con IA</span>
          </h1>
          
          {/* Subheadline */}
          <p className="animate-on-load opacity-0 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10"
             style={{ 
               color: 'rgb(var(--color-gray-400))',
               lineHeight: 1.6
             }}>
            Centraliza toda la información de tu empresa en un solo lugar. 
            Busca, comprende y genera insights con IA de última generación. 
            Sin configuración compleja, sin curva de aprendizaje.
          </p>
          
          {/* CTA Buttons */}
          <div className="animate-on-load opacity-0 flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a href="#wishlist" 
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="group px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
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
               }}>
              <span className="flex items-center gap-2">
                Empezar ahora
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            
            <a href="#features" 
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
               style={{
                 background: 'transparent',
                 color: 'rgb(var(--color-white))',
                 border: '1px solid rgba(255, 255, 255, 0.3)',
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.background = 'transparent'
                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
               }}>
              Explorar funciones
            </a>
          </div>

          {/* Tech stack icons */}
          <div className="animate-on-load opacity-0 flex items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="rgb(var(--color-gray-500))" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                React
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="rgb(var(--color-gray-500))" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                TypeScript
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="rgb(var(--color-gray-500))" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                Tailwind CSS
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="rgb(var(--color-gray-500))" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                Vite
              </span>
            </div>
          </div>

          {/* Screenshot preview */}
          <div className="animate-on-load opacity-0 mt-20 relative">
            <div className="relative mx-auto max-w-5xl">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 opacity-50"
                   style={{
                     background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.1), transparent 70%)',
                     filter: 'blur(100px)',
                     transform: 'scale(0.8)'
                   }} />
              
              {/* Main screenshot */}
              <div className="relative rounded-2xl overflow-hidden"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                   }}>
                <img 
                  src="/nessieebbb.jpg" 
                  alt="Nessie Platform Preview" 
                  className="w-full h-auto block"
                  style={{
                    opacity: 0.9,
                    filter: 'brightness(0.95)'
                  }}
                />
                
                {/* Overlay gradient for fade effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                     style={{
                       background: 'linear-gradient(to top, rgb(var(--color-black)), transparent)'
                     }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero