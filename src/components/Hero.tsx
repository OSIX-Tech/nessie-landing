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
            Acceso directo a toda
            <br />
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>tu base documental</span>
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
              Nessie Enterprise
            </a>
            
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
                Prueba la demo
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
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