import { useEffect, useRef, useState } from 'react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll('.animate-on-load')
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slide-up')
      }, index * 100)
    })

    // Subtle parallax mouse effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight
      setMousePosition({ x: x * 10, y: y * 10 })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen w-full flex items-center overflow-hidden py-12 md:py-20">
      {/* Premium layered background with subtle depth */}
      <div className="absolute inset-0 w-full">
        <div className="absolute top-1/4 -left-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] rounded-full opacity-[0.12]"
             style={{ 
               background: 'radial-gradient(circle, rgb(var(--color-gray-400)) 0%, transparent 60%)',
               filter: 'blur(80px)',
               transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
               transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
             }} />
        <div className="absolute bottom-0 -right-1/4 w-[500px] md:w-[800px] lg:w-[1000px] h-[500px] md:h-[800px] lg:h-[1000px] rounded-full opacity-[0.06]"
             style={{ 
               background: 'radial-gradient(circle, rgb(var(--color-black)) 0%, transparent 60%)',
               filter: 'blur(100px)',
               transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
               transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
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
              
              {/* Premium CTA Buttons with enhanced interactions */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-on-load opacity-0">
                <a href="#wishlist" 
                   onClick={(e) => {
                     e.preventDefault()
                     document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                   }}
                   className="group btn-primary inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base relative overflow-hidden"
                   style={{
                     boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                     transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                   }}>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                       style={{
                         background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)'
                       }}></div>
                  <span className="relative font-medium">Empezar ahora</span>
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 relative" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#features" 
                   onClick={(e) => {
                     e.preventDefault()
                     document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                   }}
                   className="btn-secondary inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base group relative"
                   style={{
                     borderWidth: '1.5px',
                     transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                   }}>
                  <svg className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Ver demo</span>
                </a>
              </div>
            </div>

            {/* Right visual - Premium floating cards */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] hidden md:flex items-center justify-end pr-4 lg:pr-8">
              <div className="relative w-full max-w-[700px] h-full flex items-center justify-center group/cards"
                   style={{ 
                     perspective: '1400px',
                     perspectiveOrigin: '50% 40%',
                     transform: 'translateZ(0)',
                     transformStyle: 'preserve-3d'
                   }}>
                
                {/* Screenshot 1 - Dashboard/Home */}
                <div className="absolute group/card hover:!z-10"
                     style={{
                       width: '500px',
                       height: '310px',
                       transform: 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(-100px) translateX(-70px) translateY(50px)',
                       transformStyle: 'preserve-3d',
                       transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                       willChange: 'transform, filter',
                       zIndex: 1
                     }}>
                  <div className="relative w-full h-full"
                       style={{
                         transform: 'translateZ(0)',
                         transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)'
                       }}>
                    {/* Glow effect */}
                    <div className="absolute -inset-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
                         style={{
                           background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.15), transparent 70%)',
                           filter: 'blur(20px)'
                         }} />
                    
                    {/* Card container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover/cards:opacity-30 group-hover/card:!opacity-100"
                         style={{
                           background: 'linear-gradient(145deg, rgba(25, 25, 30, 0.95) 0%, rgba(35, 35, 42, 0.95) 100%)',
                           border: '1px solid rgba(255, 255, 255, 0.1)',
                           boxShadow: `
                             0 50px 100px -20px rgba(0, 0, 0, 0.5),
                             0 30px 60px -30px rgba(0, 0, 0, 0.6),
                             0 10px 20px -10px rgba(0, 0, 0, 0.7),
                             inset 0 1px 0 rgba(255, 255, 255, 0.08)
                           `,
                           opacity: 0.65,
                           filter: 'brightness(0.92) saturate(0.9) contrast(1.05)',
                           transition: 'all 0.6s ease'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.opacity = '1'
                           e.currentTarget.style.filter = 'brightness(1.1) saturate(1.15) contrast(1.1)'
                           e.currentTarget.style.boxShadow = `
                             0 32px 64px rgba(0, 0, 0, 0.5),
                             0 16px 32px rgba(0, 0, 0, 0.4),
                             inset 0 2px 0 rgba(255, 255, 255, 0.1),
                             inset 0 -2px 0 rgba(0, 0, 0, 0.4)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(-2deg) rotateY(8deg) rotateZ(-1deg) translateZ(-20px) translateX(-90px) translateY(-30px) scale(1.03)'
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.opacity = '0.65'
                           e.currentTarget.style.filter = 'brightness(0.92) saturate(0.9) contrast(1.05)'
                           e.currentTarget.style.boxShadow = `
                             0 24px 48px rgba(0, 0, 0, 0.4),
                             0 12px 24px rgba(0, 0, 0, 0.3),
                             inset 0 1px 0 rgba(255, 255, 255, 0.06),
                             inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(-100px) translateX(-70px) translateY(50px)'
                         }}>
                      {/* Screenshot */}
                      <div className="relative w-full h-full">
                        <img src="/nessieb.png" 
                             alt="Nessie Dashboard" 
                             className="w-full h-full object-cover object-top"
                             loading="lazy"
                             onError={(e) => {
                               const target = e.target as HTMLImageElement
                               target.style.display = 'none'
                               if (target.parentElement) {
                                 target.parentElement.innerHTML = `
                                   <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(40, 40, 45, 1) 0%, rgba(30, 30, 35, 1) 100%);">
                                     <div class="text-gray-500 text-6xl opacity-20">📊</div>
                                   </div>
                                 `
                               }
                             }}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshot 2 - Search/Features */}
                <div className="absolute group/card hover:!z-10"
                     style={{
                       width: '540px',
                       height: '335px',
                       transform: 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(-50px) translateX(0px) translateY(35px)',
                       transformStyle: 'preserve-3d',
                       transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                       willChange: 'transform, filter',
                       zIndex: 2
                     }}>
                  <div className="relative w-full h-full"
                       style={{
                         transform: 'translateZ(0)',
                         transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)'
                       }}>
                    {/* Glow effect */}
                    <div className="absolute -inset-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
                         style={{
                           background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.15), transparent 70%)',
                           filter: 'blur(20px)'
                         }} />
                    
                    {/* Card container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover/cards:opacity-30 group-hover/card:!opacity-100"
                         style={{
                           background: 'linear-gradient(145deg, rgba(30, 30, 36, 0.96) 0%, rgba(40, 40, 48, 0.96) 100%)',
                           border: '1px solid rgba(255, 255, 255, 0.12)',
                           boxShadow: `
                             0 55px 110px -20px rgba(0, 0, 0, 0.55),
                             0 35px 70px -30px rgba(0, 0, 0, 0.65),
                             0 15px 30px -10px rgba(0, 0, 0, 0.75),
                             inset 0 1px 0 rgba(255, 255, 255, 0.1)
                           `,
                           opacity: 0.72,
                           filter: 'brightness(0.96) saturate(0.95) contrast(1.08)',
                           transition: 'all 0.6s ease'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.opacity = '1'
                           e.currentTarget.style.filter = 'brightness(1.12) saturate(1.2) contrast(1.12)'
                           e.currentTarget.style.boxShadow = `
                             0 36px 72px rgba(0, 0, 0, 0.55),
                             0 18px 36px rgba(0, 0, 0, 0.45),
                             inset 0 2px 0 rgba(255, 255, 255, 0.12),
                             inset 0 -2px 0 rgba(0, 0, 0, 0.45)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(0deg) rotateY(6deg) rotateZ(-1deg) translateZ(20px) translateX(-10px) translateY(-45px) scale(1.04)'
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.opacity = '0.72'
                           e.currentTarget.style.filter = 'brightness(0.96) saturate(0.95) contrast(1.08)'
                           e.currentTarget.style.boxShadow = `
                             0 28px 56px rgba(0, 0, 0, 0.45),
                             0 14px 28px rgba(0, 0, 0, 0.35),
                             inset 0 1px 0 rgba(255, 255, 255, 0.08),
                             inset 0 -1px 0 rgba(0, 0, 0, 0.35)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(-50px) translateX(0px) translateY(35px)'
                         }}>
                      {/* Screenshot */}
                      <div className="relative w-full h-full">
                        <img src="/nessiebb.jpg" 
                             alt="Nessie Search Interface" 
                             className="w-full h-full object-cover object-top"
                             loading="lazy"
                             onError={(e) => {
                               const target = e.target as HTMLImageElement
                               target.style.display = 'none'
                               if (target.parentElement) {
                                 target.parentElement.innerHTML = `
                                   <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(35, 35, 40, 1) 0%, rgba(25, 25, 30, 1) 100%);">
                                     <div class="text-gray-500 text-6xl opacity-20">🔍</div>
                                   </div>
                                 `
                               }
                             }}/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Screenshot 3 - Analytics/AI */}
                <div className="absolute group/card hover:!z-10"
                     style={{
                       width: '580px',
                       height: '360px',
                       transform: 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(0px) translateX(70px) translateY(20px)',
                       transformStyle: 'preserve-3d',
                       transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                       willChange: 'transform, filter',
                       zIndex: 3
                     }}>
                  <div className="relative w-full h-full"
                       style={{
                         transform: 'translateZ(0)',
                         transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)'
                       }}>
                    {/* Glow effect */}
                    <div className="absolute -inset-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
                         style={{
                           background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.15), transparent 70%)',
                           filter: 'blur(20px)'
                         }} />
                    
                    {/* Card container with glass effect */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 group-hover/cards:opacity-30 group-hover/card:!opacity-100"
                         style={{
                           background: 'linear-gradient(145deg, rgba(35, 35, 42, 0.98) 0%, rgba(45, 45, 54, 0.98) 100%)',
                           border: '1px solid rgba(255, 255, 255, 0.15)',
                           boxShadow: `
                             0 60px 120px -20px rgba(0, 0, 0, 0.6),
                             0 40px 80px -30px rgba(0, 0, 0, 0.7),
                             0 20px 40px -10px rgba(0, 0, 0, 0.8),
                             inset 0 1px 0 rgba(255, 255, 255, 0.12)
                           `,
                           opacity: 0.8,
                           filter: 'brightness(1.02) saturate(1.05) contrast(1.1)',
                           transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                           backdropFilter: 'blur(12px)'
                         }}
                         onMouseEnter={(e) => {
                           e.currentTarget.style.opacity = '1'
                           e.currentTarget.style.filter = 'brightness(1.15) saturate(1.25) contrast(1.15)'
                           e.currentTarget.style.boxShadow = `
                             0 40px 80px rgba(0, 0, 0, 0.6),
                             0 20px 40px rgba(0, 0, 0, 0.5),
                             inset 0 2px 0 rgba(255, 255, 255, 0.15),
                             inset 0 -2px 0 rgba(0, 0, 0, 0.5)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(2deg) rotateY(4deg) rotateZ(0deg) translateZ(80px) translateX(60px) translateY(-70px) scale(1.05)'
                           e.currentTarget.parentElement.parentElement.style.zIndex = '20'
                         }}
                         onMouseLeave={(e) => {
                           e.currentTarget.style.opacity = '0.8'
                           e.currentTarget.style.filter = 'brightness(1.02) saturate(1.05) contrast(1.1)'
                           e.currentTarget.style.boxShadow = `
                             0 32px 64px rgba(0, 0, 0, 0.5),
                             0 16px 32px rgba(0, 0, 0, 0.4),
                             inset 0 1px 0 rgba(255, 255, 255, 0.1),
                             inset 0 -1px 0 rgba(0, 0, 0, 0.4)
                           `
                           e.currentTarget.parentElement.parentElement.style.transform = 'rotateX(-8deg) rotateY(10deg) rotateZ(-2deg) translateZ(0px) translateX(70px) translateY(20px)'
                           e.currentTarget.parentElement.parentElement.style.zIndex = '3'
                         }}>
                      {/* Screenshot with reflection */}
                      <div className="relative w-full h-full">
                        <img src="/nessieebbb.jpg" 
                             alt="Nessie Analytics Dashboard" 
                             className="w-full h-full object-cover object-top"
                             loading="lazy"
                             onError={(e) => {
                               const target = e.target as HTMLImageElement
                               target.style.display = 'none'
                               if (target.parentElement) {
                                 target.parentElement.innerHTML = `
                                   <div class="w-full h-full flex items-center justify-center" style="background: linear-gradient(135deg, rgba(38, 38, 43, 1) 0%, rgba(28, 28, 33, 1) 100%);">
                                     <div class="text-gray-500 text-6xl opacity-20">🤖</div>
                                   </div>
                                 `
                               }
                             }}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero