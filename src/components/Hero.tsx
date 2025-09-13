import { useEffect, useRef, useState } from 'react'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown timer logic
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

          {/* Countdown Timer */}
          <div className="animate-on-load opacity-0 mt-20 mb-16">
            <div className="text-center">
              {/* Countdown numbers */}
              <div className="flex justify-center items-start">
                {[
                  { value: timeLeft.days, label: 'Days' },
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' }
                ].map((item, index) => (
                  <>
                    <div key={`time-${index}`} className="flex flex-col items-center px-6 md:px-10">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-2"
                           style={{ 
                             color: 'rgb(var(--color-white))',
                             fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
                             fontWeight: 600
                           }}>
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-600 tracking-wide">
                        {item.label}
                      </div>
                    </div>
                    {index < 3 && (
                      <div key={`separator-${index}`} className="flex items-start pt-3 md:pt-4 lg:pt-5">
                        <div className="w-[1px] h-12 md:h-14 lg:h-16"
                             style={{ 
                               background: 'rgba(255, 255, 255, 0.2)'
                             }}></div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>

          {/* Logos Section */}
          <div className="animate-on-load opacity-0 mt-20">
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">
              Integrado con tus herramientas favoritas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {/* Gmail */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </div>
              
              {/* Outlook */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.88 12.04q0 .45-.11.87-.1.41-.33.74-.22.33-.58.52-.37.2-.87.2t-.85-.2q-.35-.21-.57-.55-.22-.33-.33-.75-.1-.42-.1-.86t.1-.87q.1-.43.34-.76.22-.34.59-.54.36-.2.87-.2t.86.2q.35.21.57.55.22.34.31.77.1.43.1.88zM24 12v9.38q0 .46-.33.8-.33.32-.8.32H7.13q-.46 0-.8-.33-.32-.33-.32-.8V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h6.5V2.55q0-.44.3-.75.3-.3.75-.3h12.9q.44 0 .75.3.3.3.3.75V11h1.05q.42 0 .71.29.3.3.3.71z"/>
                </svg>
              </div>

              {/* Google Calendar */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>

              {/* Spotify */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>

              {/* YouTube */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>

              {/* Slack */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
                </svg>
              </div>

              {/* Notion */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
                </svg>
              </div>

              {/* Google Drive */}
              <div className="group transition-all duration-300 hover:scale-110">
                <svg className="w-8 h-8 md:w-10 md:h-10 opacity-40 group-hover:opacity-60 transition-opacity" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.01 5.5L4.3 18.5h7.71l7.71-13H12.01zm-1.93 1L6.38 13h7.71l3.7-6.5h-7.71zm11.57 7l-3.86 6.5H24l-3.86-6.5h-7.71l3.86 6.5h3.86l1.5-2.5 1.5 2.5h.86l-2.36-4 2.36-4h-.86l-1.5 2.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero