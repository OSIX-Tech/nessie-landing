import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import FeatureCard3D from './FeatureCard3D'

const features = [
  {
    title: 'Búsqueda inteligente',
    description: 'Encuentra información al instante en miles de documentos con IA que entiende contexto.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    gradient: 'from-gray-600 to-gray-900'
  },
  {
    title: 'Integraciones nativas',
    description: 'Conecta sin esfuerzo con Google Drive, Notion, Slack y más de 50 plataformas.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    gradient: 'from-gray-700 to-black'
  },
  {
    title: 'Seguridad empresarial',
    description: 'Encriptación end-to-end, SOC2/GDPR compliant y controles de acceso granulares.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: 'from-gray-500 to-gray-800'
  },
  {
    title: 'Respuestas precisas',
    description: 'Obtén respuestas contextuales con fuentes verificadas y referencias directas.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    gradient: 'from-gray-800 to-black'
  },
  {
    title: 'Análisis avanzado',
    description: 'Visualiza insights sobre uso, gaps de conocimiento y tendencias en tiempo real.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    gradient: 'from-gray-600 to-gray-900'
  },
  {
    title: 'Velocidad extrema',
    description: 'Respuestas en milisegundos con caché inteligente y arquitectura optimizada.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-gray-700 to-black'
  }
]

function Features() {
  const sectionRef = useScrollAnimation()
  const [currentGroup, setCurrentGroup] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Determine cards per view based on viewport
  const getCardsPerView = () => {
    if (viewportWidth >= 1024) return 3 // Desktop
    if (viewportWidth >= 640) return 2  // Tablet
    return 1 // Mobile
  }

  const cardsPerView = getCardsPerView()
  const totalGroups = Math.ceil(features.length / cardsPerView)

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth)
      // Reset to valid group if current is out of bounds
      const newTotalGroups = Math.ceil(features.length / getCardsPerView())
      if (currentGroup >= newTotalGroups) {
        setCurrentGroup(newTotalGroups - 1)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentGroup])

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % totalGroups)
    }, 7000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, totalGroups])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentGroup((prev) => (prev === 0 ? totalGroups - 1 : prev - 1))
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentGroup((prev) => (prev + 1) % totalGroups)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentGroup(index)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }
  }

  return (
    <section ref={sectionRef} id="features" className="relative py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-20 lg:mb-24">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            CARACTERÍSTICAS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2 sm:px-0" style={{ color: 'rgb(var(--color-white))' }}>
            Diseñado para equipos
            <br />
            que <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>exigen excelencia</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg px-4 sm:px-0" style={{ color: 'rgb(var(--color-gray-400))' }}>
            Cada funcionalidad está pensada para maximizar la productividad
            y minimizar la fricción en el acceso al conocimiento.
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Cards Container - Responsive carousel */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-in-out"
              style={{
                transform: (() => {
                  // Calculate cards to move based on group and cards per view
                  const cardsToMove = currentGroup * cardsPerView

                  if (cardsPerView === 3) {
                    // Desktop: Each card is 33.333%, move by group
                    const percentage = (cardsToMove * 100) / 3
                    const gapOffset = cardsToMove * 24 // 24px gap between cards
                    return `translateX(calc(-${percentage}% - ${gapOffset}px))`
                  } else if (cardsPerView === 2) {
                    // Tablet: Each card is 50%, move by group
                    const percentage = (cardsToMove * 100) / 2
                    const gapOffset = cardsToMove * 16 // 16px gap between cards
                    return `translateX(calc(-${percentage}% - ${gapOffset}px))`
                  } else {
                    // Mobile: Each card is 100%
                    const percentage = cardsToMove * 100
                    const gapOffset = cardsToMove * 16
                    return `translateX(calc(-${percentage}% - ${gapOffset}px))`
                  }
                })()
              }}>
              {/* All cards with extras for smooth loop */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-16px)]"
                >
                  <FeatureCard3D
                    feature={feature}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Hidden on mobile */}
          <div className="hidden sm:flex absolute inset-y-0 left-0 right-0 items-center justify-between pointer-events-none">
            <button
              onClick={handlePrevious}
              className="pointer-events-auto -ml-4 lg:-ml-12 p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="pointer-events-auto -mr-4 lg:-mr-12 p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator - Show one dot per group */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {Array.from({ length: totalGroups }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentGroup
                    ? 'w-6 sm:w-8 bg-white'
                    : 'w-2 sm:w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir a grupo ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile Swipe Hint */}
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                 style={{
                   background: 'rgba(255, 255, 255, 0.05)',
                   border: '1px solid rgba(255, 255, 255, 0.1)'
                 }}>
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12" transform="rotate(-90 12 12)" />
              </svg>
              <span className="text-xs text-white/50">Desliza</span>
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17 13l-5 5m0 0l-5-5m5 5V6" transform="rotate(-90 12 12)" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Features