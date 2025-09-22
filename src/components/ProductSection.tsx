import { useState, useRef, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Definir las funcionalidades core de Nessie
const features = [
  {
    id: 'busqueda-inteligente',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Búsqueda Inteligente',
    description: 'Búsqueda inteligente en toda tu base documental usando lenguaje natural.',
    chips: ['Búsqueda semántica', 'Múltiples formatos', 'Resultados instantáneos'],
    video: {
      poster: '/videos/busqueda/poster.jpg',
      src_mp4: '/videos/busqueda/preview.mp4'
    },
    cta: {
      label: 'Probar búsqueda',
      href: '/demo/busqueda'
    }
  },
  {
    id: 'respuestas-precisas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Respuestas Precisas',
    description: 'Respuestas precisas con citas y referencias exactas a los documentos fuente.',
    chips: ['Citas automáticas', 'Trazabilidad completa', 'Verificación de fuentes'],
    video: {
      poster: '/videos/respuestas/poster.jpg',
      src_mp4: '/videos/respuestas/preview.mp4'
    },
    cta: {
      label: 'Ver precisión',
      href: '/demo/respuestas'
    }
  },
  {
    id: 'analisis-sintesis',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Análisis y Síntesis',
    description: 'Análisis y síntesis del contenido con resúmenes y comparaciones automáticas.',
    chips: ['Resúmenes automáticos', 'Análisis comparativo', 'Insights inteligentes'],
    video: {
      poster: '/videos/analisis/poster.jpg',
      src_mp4: '/videos/analisis/preview.mp4'
    },
    cta: {
      label: 'Ver análisis',
      href: '/demo/analisis'
    }
  },
  {
    id: 'generacion-documentos',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    title: 'Generación de Contenido',
    description: 'Generación de ideas y documentos basados en tu base de conocimiento.',
    chips: ['Generación automática', 'Templates inteligentes', 'Consistencia de marca'],
    video: {
      poster: '/videos/generacion/poster.jpg',
      src_mp4: '/videos/generacion/preview.mp4'
    },
    cta: {
      label: 'Crear contenido',
      href: '/demo/generacion'
    }
  },
  {
    id: 'integracion-herramientas',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    title: 'Integración Externa',
    description: 'Integración de herramientas externas para un flujo de trabajo unificado.',
    chips: ['APIs nativas', 'Sincronización automática', 'Workflow integrado'],
    video: {
      poster: '/videos/integracion/poster.jpg',
      src_mp4: '/videos/integracion/preview.mp4'
    },
    cta: {
      label: 'Ver integraciones',
      href: '/demo/integracion'
    }
  }
]

function ProductSection() {
  const sectionRef = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [playingVideos, setPlayingVideos] = useState<Set<number>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set(features.map((_, i) => i)))
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Autoplay deshabilitado en desktop y móvil; solo reproducción por interacción del usuario

  // Ensure first card video is initialized on mount (handles cases where IO doesn't trigger immediately)
  useEffect(() => {
    const firstVideo = videoRefs.current[0]
    if (firstVideo && !loadedVideos.has(0)) {
      firstVideo.src = '/video.mp4'
      try {
        firstVideo.preload = 'auto'
        firstVideo.load()
      } catch {
        // Ignore load errors
      }
      setLoadedVideos(prev => new Set(prev).add(0))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync overlay visibility with native video controls via play/pause events
  useEffect(() => {
    const playHandlers: Array<(() => void) | null> = []
    const pauseHandlers: Array<(() => void) | null> = []

    videoRefs.current.forEach((video, idx) => {
      if (!video) { playHandlers[idx] = null; pauseHandlers[idx] = null; return }
      const onPlay = () => {
        setPlayingVideos(prev => new Set(prev).add(idx))
      }
      const onPause = () => {
        setPlayingVideos(prev => {
          const s = new Set(prev)
          s.delete(idx)
          return s
        })
      }
      video.addEventListener('play', onPlay)
      video.addEventListener('pause', onPause)
      playHandlers[idx] = onPlay
      pauseHandlers[idx] = onPause
    })

    return () => {
      videoRefs.current.forEach((video, idx) => {
        if (!video) return
        if (playHandlers[idx]) video.removeEventListener('play', playHandlers[idx] as () => void)
        if (pauseHandlers[idx]) video.removeEventListener('pause', pauseHandlers[idx] as () => void)
      })
    }
  }, [features.length])

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

        // Lazy load video if visible and not loaded
        if (visibilityRatio >= 0.6) {
          // Load video source if not already loaded
          if (!loadedVideos.has(index) && videoRefs.current[index]) {
            const video = videoRefs.current[index]!
            if (!video.src) {
              // Cargar el video de la carpeta public
              video.src = '/video.mp4'
              setLoadedVideos(prev => new Set(prev).add(index))
            }
          }
        } else {
          const video = videoRefs.current[index]
          if (video) {
            // Pause and reset time
            if (!video.paused) video.pause()
            try { video.currentTime = 0 } catch {
        // Ignore errors
      }

            // Reset to poster: drop src and reload
            if (video.src) {
              video.removeAttribute('src')
              try { video.load() } catch {
        // Ignore errors
      }
            }

            // Update tracking sets
            if (playingVideos.has(index)) {
              setPlayingVideos(prev => {
                const newSet = new Set(prev)
                newSet.delete(index)
                return newSet
              })
            }
            if (loadedVideos.has(index)) {
              setLoadedVideos(prev => {
                const newSet = new Set(prev)
                newSet.delete(index)
                return newSet
              })
            }
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
      video.play().then(() => {
        setPlayingVideos(prev => new Set(prev).add(index))
      }).catch(() => {
        // Ignore play errors
      })
    } else {
      video.pause()
      setPlayingVideos(prev => {
        const s = new Set(prev)
        s.delete(index)
        return s
      })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="product"
      className="relative py-12 sm:py-18 md:py-20 lg:py-24 opacity-0 scroll-mt-16 md:scroll-mt-24"
      role="region"
      aria-label="Carrusel de funcionalidades"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Section Header - Mobile optimized */}
      <div className="text-center max-w-4xl mx-auto mb-4 sm:mb-8 lg:mb-12 px-5 sm:px-6">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative inline-flex px-5 sm:px-6 py-1.5 sm:py-2 rounded-full"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 backdropFilter: 'blur(10px)'
               }}>
            <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" aria-hidden="true"/>
            <span className="block w-full text-center text-xs sm:text-sm lg:text-base font-medium uppercase tracking-wider leading-none"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Funcionalidades
            </span>
          </div>
        </div>
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 lg:mb-6"
            style={{ color: 'rgb(var(--color-white))' }}>
          Explora nuestras{' '}
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
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl max-w-2xl mx-auto px-0 sm:px-0"
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
              className="feature-card flex-none w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48 snap-center flex items-center py-2 sm:py-0"
              aria-current={index === activeIndex}
              style={{ minHeight: 'min(58vh, 520px)' }}
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
                <div className="p-3 sm:p-6 lg:p-10">
                  <div className="flex items-start gap-2 sm:gap-4 lg:gap-5 mb-3 sm:mb-6">
                    <div
                      className="w-9 h-9 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-xl lg:text-3xl font-bold mb-0.5 sm:mb-2"
                          style={{ color: 'rgb(var(--color-white))' }}>
                        {feature.title}
                      </h3>
                      <p className="text-[11px] sm:text-sm lg:text-lg leading-relaxed"
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
                        className="px-2 py-0.5 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 rounded-full text-[9px] sm:text-xs lg:text-sm font-medium"
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
                <div className="relative aspect-video bg-black">
                  <video
                    ref={el => { videoRefs.current[index] = el }}
                    poster={'/nessie.png'}
                    muted={mutedVideos.has(index)}
                    playsInline
                    loop
                    preload={'metadata'}
                    controls={false}
                    onClick={() => togglePlayPause(index)}
                    className="w-full h-full cursor-pointer object-contain sm:object-cover"
                    aria-label={`Video demo de ${feature.title}`}
                  >
                    {/* Source will be set dynamically via lazy loading */}
                  </video>

                  {/* Play/Pause Overlay */}
                  {!playingVideos.has(index) && (
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

      {/* Dots Pagination - estilo unificado con Casos de Uso */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-6 px-4" role="tablist">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToCard(index)}
            className="transition-all duration-300"
            style={{
              width: index === activeIndex ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: index === activeIndex
                ? 'rgb(var(--color-white))'
                : 'rgba(255, 255, 255, 0.2)'
            }}
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Ir a funcionalidad ${index + 1}`}
          />
        ))}
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
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