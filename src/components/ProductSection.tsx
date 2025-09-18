import { useState, useRef, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Definir los casos de uso con placeholders para videos
const features = [
  {
    id: 'investigacion-instantanea',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Investigación Instantánea',
    description: 'Analiza miles de documentos en segundos y encuentra conexiones ocultas.',
    chips: ['Búsqueda semántica', 'Referencias cruzadas', 'Resúmenes automáticos'],
    video: {
      poster: '/videos/investigacion/poster.jpg',
      src_mp4: '/videos/investigacion/preview.mp4'
    },
    cta: {
      label: 'Probar esta funcionalidad',
      href: '/demo/investigacion'
    }
  },
  {
    id: 'compliance-automatizado',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Compliance Automatizado',
    description: 'Auditoría continua con alertas en tiempo real y audit trail completo.',
    chips: ['Detección proactiva', 'Alertas en tiempo real', 'Audit trail'],
    video: {
      poster: '/videos/compliance/poster.jpg',
      src_mp4: '/videos/compliance/preview.mp4'
    },
    cta: {
      label: 'Ver demo',
      href: '/demo/compliance'
    }
  },
  {
    id: 'knowledge-sharing',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: 'Knowledge Sharing',
    description: 'Colaboración sin fricciones con workspaces compartidos y co-edición.',
    chips: ['Workspaces', 'Tiempo real', 'Versionado'],
    video: {
      poster: '/videos/sharing/poster.jpg',
      src_mp4: '/videos/sharing/preview.mp4'
    },
    cta: {
      label: 'Empezar gratis',
      href: '/demo/sharing'
    }
  },
  {
    id: 'analytics-inteligente',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Analytics Inteligente',
    description: 'Insights automáticos con dashboards y predicciones ML de tu data.',
    chips: ['Dashboards', 'ML Predictions', 'Reportes'],
    video: {
      poster: '/videos/analytics/poster.jpg',
      src_mp4: '/videos/analytics/preview.mp4'
    },
    cta: {
      label: 'Ver capacidades',
      href: '/demo/analytics'
    }
  }
]

function ProductSection() {
  const sectionRef = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set(features.map((_, i) => i)))
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Handle scroll to update active index and video playback
  useEffect(() => {
    const handleScroll = () => {
      if (!carouselRef.current) return

      const container = carouselRef.current
      const scrollLeft = container.scrollLeft
      const cardWidth = container.offsetWidth
      const newIndex = Math.round(scrollLeft / cardWidth)

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }

      // Handle video autoplay based on visibility
      const cards = container.querySelectorAll('.feature-card')
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const visibilityRatio = Math.max(0, Math.min(1,
          (Math.min(rect.right, containerRect.right) - Math.max(rect.left, containerRect.left)) / rect.width
        ))

        // Play video if more than 60% visible
        if (visibilityRatio >= 0.6) {
          if (!playingVideos.has(index) && videoRefs.current[index]) {
            videoRefs.current[index]?.play().catch(() => {})
            setPlayingVideos(prev => new Set(prev).add(index))
          }
        } else {
          if (playingVideos.has(index) && videoRefs.current[index]) {
            videoRefs.current[index]?.pause()
            videoRefs.current[index]!.currentTime = 0
            setPlayingVideos(prev => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        }
      })
    }

    const container = carouselRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
      // Initial check
      handleScroll()
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [activeIndex, playingVideos])

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const cardWidth = container.offsetWidth
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth'
    })
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && activeIndex > 0) {
      scrollToCard(activeIndex - 1)
    } else if (e.key === 'ArrowRight' && activeIndex < features.length - 1) {
      scrollToCard(activeIndex + 1)
    }
  }

  // Toggle video mute
  const toggleMute = (index: number) => {
    setMutedVideos(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })

    if (videoRefs.current[index]) {
      videoRefs.current[index]!.muted = !videoRefs.current[index]!.muted
    }
  }

  // Toggle video play/pause
  const togglePlayPause = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative py-16 sm:py-20 md:py-28 lg:py-36 opacity-0"
      role="region"
      aria-label="Carrusel de funcionalidades"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Section Header - Mobile optimized */}
      <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-6">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 backdropFilter: 'blur(10px)'
               }}>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse"/>
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium uppercase tracking-wider"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Funcionalidades
            </span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6"
            style={{ color: 'rgb(var(--color-white))' }}>
          Explora nuestras
          <br className="sm:hidden" />
          <span className="sm:hidden"> </span>
          <span style={{
            background: 'linear-gradient(90deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-500)) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            funcionalidades
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl max-w-2xl mx-auto px-2 sm:px-0"
           style={{ color: 'rgb(var(--color-gray-500))' }}>
          Desliza para ver demos cortas
        </p>
      </div>

      {/* Navigation Buttons (Desktop only) */}
      <div className="hidden lg:flex justify-center gap-4 mb-8">
        <button
          onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
          className="p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            opacity: activeIndex === 0 ? 0.3 : 1
          }}
          disabled={activeIndex === 0}
          aria-label="Anterior"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollToCard(Math.min(features.length - 1, activeIndex + 1))}
          className="p-3 rounded-full transition-all hover:scale-110"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            opacity: activeIndex === features.length - 1 ? 0.3 : 1
          }}
          disabled={activeIndex === features.length - 1}
          aria-label="Siguiente"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card flex-none w-full px-3 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48 snap-center flex items-center py-4 sm:py-0"
              aria-current={index === activeIndex}
              style={{ minHeight: '70vh', minHeight: 'min(70vh, 600px)' }}
            >
              <div
                className="w-full max-w-5xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-500"
                style={{
                  background: 'rgba(10, 10, 10, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: index === activeIndex
                    ? '0 20px 40px rgba(0, 0, 0, 0.4)'
                    : '0 10px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Card Header */}
                <div className="p-4 sm:p-6 lg:p-10">
                  <div className="flex items-start gap-3 sm:gap-4 lg:gap-5 mb-4 sm:mb-6">
                    <div
                      className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-3xl font-bold mb-1 sm:mb-2"
                          style={{ color: 'rgb(var(--color-white))' }}>
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm lg:text-lg leading-relaxed"
                         style={{ color: 'rgb(var(--color-gray-500))' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* Chips - Mobile optimized */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {feature.chips.map((chip, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'rgb(var(--color-gray-400))',
                          border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Video Container - Mobile optimized */}
                <div className="relative aspect-[4/3] sm:aspect-video bg-black">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    poster={feature.video.poster}
                    muted={mutedVideos.has(index)}
                    playsInline
                    loop
                    preload="metadata"
                    data-src={feature.video.src_mp4}
                    onClick={() => togglePlayPause(index)}
                    className="w-full h-full object-cover cursor-pointer"
                    aria-label={`Video demo de ${feature.title}`}
                  >
                    <source src={feature.video.src_mp4} type="video/mp4" />
                  </video>

                  {/* Play/Pause Overlay */}
                  {videoRefs.current[index]?.paused && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                           style={{
                             background: 'rgba(0, 0, 0, 0.7)',
                             backdropFilter: 'blur(10px)',
                             border: '1px solid rgba(255, 255, 255, 0.1)'
                           }}>
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMute(index)
                      }}
                      className="p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-105"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      aria-label={mutedVideos.has(index) ? "Activar sonido" : "Silenciar"}
                    >
                      {mutedVideos.has(index) ? (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* CTA Section - Mobile optimized */}
                <div className="p-4 sm:p-6 lg:p-10 border-t"
                     style={{
                       borderColor: 'rgba(255, 255, 255, 0.05)',
                       background: 'rgba(0, 0, 0, 0.3)'
                     }}>
                  <div className="flex items-center justify-between">
                    <a
                      href="#wishlist"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm lg:text-base font-medium transition-all duration-300"
                      style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      {feature.cta.label}
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs" style={{ color: 'rgb(var(--color-gray-600))' }}>
                        {index + 1} / {features.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Pagination - Mobile optimized */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-6 px-4" role="tablist">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className={`transition-all duration-300 ${
              index === activeIndex
                ? 'w-6 h-1.5 sm:w-8 sm:h-2 bg-white rounded-full'
                : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 hover:bg-white/30 rounded-full'
            }`}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Ir a funcionalidad ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex justify-center mt-2 sm:mt-4 lg:hidden">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
             style={{
               background: 'rgba(255, 255, 255, 0.03)',
               border: '1px solid rgba(255, 255, 255, 0.08)'
             }}>
          <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12" transform="rotate(-90 12 12)" />
          </svg>
          <span className="text-[10px] text-white/50">Desliza</span>
          <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 13l-5 5m0 0l-5-5m5 5V6" transform="rotate(-90 12 12)" />
          </svg>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .feature-card {
            scroll-snap-align: center;
          }
        }

        @media (max-width: 767px) {
          .feature-card {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  )
}

export default ProductSection