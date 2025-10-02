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
      poster: '/videos/caso-1.mp4',
      src_mp4: '/videos/caso-1.mp4'
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
      poster: '/videos/caso-2.mp4',
      src_mp4: '/videos/caso-2.mp4'
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
      poster: '/videos/caso-3.mp4',
      src_mp4: '/videos/caso-3.mp4'
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
      poster: '/videos/caso-4.mp4',
      src_mp4: '/videos/caso-4.mp4'
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
      poster: '/videos/caso-5.mp4',
      src_mp4: '/videos/caso-5.mp4'
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
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  // Autoplay deshabilitado en desktop y móvil; solo reproducción por interacción del usuario

  // Ensure first card video is initialized on mount (handles cases where IO doesn't trigger immediately)
  useEffect(() => {
    const firstVideo = videoRefs.current[0]
    if (firstVideo && !loadedVideos.has(0)) {
      firstVideo.src = features[0].video.src_mp4
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
              video.src = features[index].video.src_mp4
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

  // Toggle video play/pause (without expanding)
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

  // Expand video to modal (fullscreen button handler)
  const expandVideo = (index: number) => {
    setExpandedVideo(index)
    const video = videoRefs.current[index]
    if (video && video.paused) {
      video.play().then(() => {
        setPlayingVideos(prev => new Set(prev).add(index))
      }).catch(() => {
        // Ignore play errors
      })
    }
  }

  // Close expanded video
  const closeExpandedVideo = () => {
    if (expandedVideo !== null) {
      const video = videoRefs.current[expandedVideo]
      if (video) {
        // Keep video playing state when closing modal
        if (video.paused) {
          setPlayingVideos(prev => {
            const s = new Set(prev)
            s.delete(expandedVideo)
            return s
          })
        }
        // Don't reset currentTime or pause, keep current state
      }
      setExpandedVideo(null)
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedVideo !== null) {
        closeExpandedVideo()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [expandedVideo])

  // Prevent body scroll and hide navbar when modal is open
  useEffect(() => {
    const navbar = document.querySelector('nav')
    const mobileNavbar = document.querySelector('nav.md\\:hidden')

    if (expandedVideo !== null) {
      document.body.style.overflow = 'hidden'
      if (navbar) (navbar as HTMLElement).style.display = 'none'
      if (mobileNavbar) (mobileNavbar as HTMLElement).style.display = 'none'
    } else {
      document.body.style.overflow = 'unset'
      if (navbar) (navbar as HTMLElement).style.display = ''
      if (mobileNavbar) (mobileNavbar as HTMLElement).style.display = ''
    }

    return () => {
      document.body.style.overflow = 'unset'
      if (navbar) (navbar as HTMLElement).style.display = ''
      if (mobileNavbar) (mobileNavbar as HTMLElement).style.display = ''
    }
  }, [expandedVideo])

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
            background: 'linear-gradient(90deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            funcionalidades
          </span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl max-w-2xl mx-auto px-0 sm:px-0"
           style={{ color: 'rgb(var(--color-gray-400))' }}>
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
              className="feature-card flex-none w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 snap-center flex items-center py-2 sm:py-0"
              aria-current={index === activeIndex}
              style={{ minHeight: 'auto' }}
            >
              <div
                className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden transform transition-all duration-500"
                style={{
                  background: 'rgba(10, 10, 10, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: index === activeIndex
                    ? '0 20px 40px rgba(0, 0, 0, 0.4)'
                    : '0 10px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Card Header - Compact */}
                <div className="p-2 sm:p-3 lg:p-4">
                  <div className="flex items-start justify-between gap-2 sm:gap-2.5 mb-1.5 sm:mb-2">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1">
                      <div
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-0.5 sm:mb-1"
                            style={{ color: 'rgb(var(--color-white))' }}>
                          {feature.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs lg:text-sm leading-snug"
                           style={{ color: 'rgb(var(--color-gray-400))' }}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                    {/* Counter moved here */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] sm:text-xs font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                        {index + 1} / {features.length}
                      </span>
                    </div>
                  </div>

                  {/* Chips - Mobile optimized */}
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {feature.chips.map((chip, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-medium"
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
                    muted={mutedVideos.has(index)}
                    playsInline
                    loop
                    preload={'metadata'}
                    controls={false}
                    onClick={() => togglePlayPause(index)}
                    className="w-full h-full cursor-pointer object-cover"
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
                    {/* Fullscreen/Expand button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        expandVideo(index)
                      }}
                      className="p-2 sm:p-2.5 rounded-full backdrop-blur-md transition-all hover:scale-105"
                      style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      aria-label="Ver en pantalla completa"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>

                    {/* Mute button */}
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

                {/* Minimal Footer - Empty spacer */}
                <div className="py-1.5 sm:py-2 border-t"
                     style={{
                       borderColor: 'rgba(255, 255, 255, 0.05)',
                       background: 'rgba(0, 0, 0, 0.2)'
                     }}>
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

      {/* Expanded Video Modal */}
      {expandedVideo !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
          style={{
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={closeExpandedVideo}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          {/* Close button */}
          <button
            onClick={closeExpandedVideo}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
            aria-label="Cerrar video (ESC)"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video container with animation */}
          <div
            className="relative w-full max-w-7xl aspect-video rounded-xl sm:rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(10, 10, 10, 0.95)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Feature info overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-b from-black/80 to-transparent">
              <h3 id="video-modal-title" className="text-base sm:text-xl font-bold text-white mb-1">
                {features[expandedVideo].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70">
                {features[expandedVideo].description}
              </p>
            </div>

            <video
              ref={el => { if (el && expandedVideo !== null) videoRefs.current[expandedVideo] = el }}
              src={features[expandedVideo].video.src_mp4}
              muted={mutedVideos.has(expandedVideo)}
              playsInline
              loop
              autoPlay
              controls
              controlsList="nodownload"
              className="w-full h-full object-contain bg-black"
            />
          </div>

          {/* Hint text */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-white/50 text-xs sm:text-sm">
            Presiona ESC o haz click fuera para cerrar
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

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