import { useEffect, useRef, useState } from 'react'
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
  const mobileCarouselRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Detect active card on mobile via IntersectionObserver
  useEffect(() => {
    if (!mobileCarouselRef.current) return
    const root = mobileCarouselRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        let bestIdx = 0
        let bestRatio = 0
        for (const entry of entries) {
          const idx = cardRefs.current.findIndex((el) => el === entry.target)
          if (idx !== -1 && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIdx = idx
          }
        }
        setActiveIndex(bestIdx)
      },
      { root, threshold: [0.5, 0.75, 1] }
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToIndex = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <section ref={sectionRef} id="features" className="relative py-10 sm:py-16 md:py-24 lg:py-32 px-5 sm:px-6 md:px-12 lg:px-24 opacity-0 scroll-mt-16 md:scroll-mt-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12 md:mb-20 lg:mb-24">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            CARACTERÍSTICAS
          </span>
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 px-0 sm:px-0" style={{ color: 'rgb(var(--color-white))' }}>
            Diseñado para equipos
            <br />
            que <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>exigen excelencia</span>
          </h2>
          <p className="text-[13px] sm:text-base md:text-lg px-2 sm:px-0" style={{ color: 'rgb(var(--color-gray-400))' }}>
            Cada funcionalidad está pensada para maximizar la productividad
            y minimizar la fricción en el acceso al conocimiento.
          </p>
        </div>

        {/* Vista móvil: scroll-snap horizontal con dots controlados por IO */}
        <div className="md:hidden">
          <div
            id="features-carousel"
            ref={mobileCarouselRef}
            className="overflow-x-auto snap-x snap-mandatory px-4"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el }}
                  className="snap-center w-[88%] flex-shrink-0"
                >
                  <FeatureCard3D feature={feature} />
                </div>
              ))}
            </div>
          </div>
          {/* Dots móviles */}
          <div className="flex justify-center gap-1.5 mt-6" role="tablist">
            {features.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="features-carousel"
                onClick={() => scrollToIndex(index)}
                className="transition-all duration-300"
                style={{
                  width: activeIndex === index ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: activeIndex === index ? 'rgb(var(--color-white))' : 'rgba(255, 255, 255, 0.3)'
                }}
                aria-label={`Ver feature ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Vista tablet/desktop: grid simple */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard3D key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features