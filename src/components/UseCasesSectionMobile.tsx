import React, { useState, useEffect, useRef } from 'react'

type UseCase = {
  id: string
  audience: string
  category: "Personal" | "Profesional" | "Empresarial"
  title: string
  description: string
  benefits: string[]
  timesSaved: string
  mainMetric: { value: string; label: string }
  visual: { icon: React.ReactNode; color: string }
  metrics: {
    chartType: 'bar' | 'line' | 'area' | 'radar'
    data: Record<string, number | string>[]
    primaryColor: string
    kpis: { label: string; value: string; change?: string }[]
  }
  cta?: {
    label: string
    href: string
    analyticsId: string
  }
}

interface MobileCarouselProps {
  useCases: UseCase[]
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ useCases }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])


  // Intersection Observer for detecting active card
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const index = cardRefs.current.findIndex(ref => ref === entry.target)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      {
        root: carouselRef.current,
        threshold: [0.5]
      }
    )

    cardRefs.current.forEach((card) => {
      if (card) observerRef.current?.observe(card)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [useCases])

  const scrollToCard = (index: number) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div className="md:hidden w-full" role="region" aria-label="Casos de uso">
      {/* Mobile Carousel Container */}
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
          {useCases.map((useCase, index) => (
            <div
              key={useCase.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className="flex-none w-full px-4 snap-center flex items-center justify-center min-h-[450px]"
              aria-current={activeIndex === index ? 'true' : 'false'}
            >
              <div
                className="relative w-full max-w-[320px] mx-auto rounded-2xl p-4 flex flex-col justify-between"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: activeIndex === index
                    ? '0 20px 40px rgba(0, 0, 0, 0.3)'
                    : '0 10px 30px rgba(0, 0, 0, 0.2)',
                  minHeight: '420px'
                }}
              >
                {/* Top Content */}
                <div>
                  {/* Profile Badge & Time Saved */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3.5 py-1.5 text-sm font-semibold rounded-full"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      {useCase.audience.split(' ')[0].toUpperCase()}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {useCase.timesSaved}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold mb-2 leading-tight text-center" style={{ color: 'rgb(var(--color-white))' }}>
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm mb-3 line-clamp-3 leading-relaxed text-center" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {useCase.description}
                  </p>
                </div>

                {/* Middle Content */}
                <div className="flex-grow flex flex-col justify-center">
                  {/* Main Metric Highlight */}
                  <div
                    className="rounded-xl p-3 mb-2"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                        {useCase.mainMetric.value}
                      </div>
                      <div className="text-xs uppercase tracking-wide" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                        {useCase.mainMetric.label}
                      </div>
                    </div>
                  </div>

                  {/* Key Benefits - Compact List */}
                  <div className="mb-3">
                    <div className="space-y-1.5">
                      {useCase.benefits.slice(0, 3).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div
                            className="w-1 h-1 rounded-full flex-shrink-0 mt-1"
                            style={{ background: 'rgba(255, 255, 255, 0.4)' }}
                          />
                          <span className="text-sm leading-tight" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs Row */}
                  <div
                    className="grid grid-cols-3 gap-2 rounded-xl p-3"
                    style={{
                      background: 'rgba(0, 0, 0, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    {useCase.metrics.kpis.slice(0, 3).map((kpi, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                          {kpi.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>
                          {kpi.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4">
                  {useCase.cta && (
                    <a
                      href={useCase.cta.href}
                      data-analytics-id={useCase.cta.analyticsId}
                      className="block w-full text-center px-4 py-3 rounded-full text-sm font-semibold transition-all duration-200"
                      style={{
                        background: 'rgb(var(--color-white))',
                        color: 'rgb(var(--color-black))'
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = 'scale(0.98)'
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    >
                      {useCase.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-6" role="tablist">
        {useCases.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeIndex === index}
            onClick={() => scrollToCard(index)}
            className="transition-all duration-300"
            style={{
              width: activeIndex === index ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: activeIndex === index
                ? 'rgb(var(--color-white))'
                : 'rgba(255, 255, 255, 0.2)'
            }}
            aria-label={`Ver ${useCases[index].audience}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MobileCarousel