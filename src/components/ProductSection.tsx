import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Definir los 4 casos de uso principales
const useCases = [
  {
    id: 'research',
    title: 'Investigación Instantánea',
    subtitle: 'Analiza miles de documentos en segundos',
    description: 'Encuentra patrones, conexiones y respuestas en toda tu base de conocimiento con IA que entiende contexto y relaciones complejas.',
    features: ['Búsqueda semántica', 'Referencias cruzadas', 'Resúmenes automáticos'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 'compliance',
    title: 'Compliance Automatizado',
    subtitle: 'Auditoría continua sin esfuerzo',
    description: 'Monitorea automáticamente el cumplimiento normativo, detecta riesgos y mantén tu documentación siempre actualizada con las regulaciones.',
    features: ['Detección proactiva', 'Alertas en tiempo real', 'Audit trail completo'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 'collaboration',
    title: 'Knowledge Sharing',
    subtitle: 'Colaboración sin fricciones',
    description: 'Facilita el intercambio de conocimiento entre equipos con espacios de trabajo compartidos, versionado automático y contexto enriquecido.',
    features: ['Workspaces compartidos', 'Co-edición en tiempo real', 'Historial completo'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'analytics',
    title: 'Analytics Inteligente',
    subtitle: 'Insights automáticos de tus datos',
    description: 'Obtén análisis profundos y visualizaciones automáticas de toda tu información empresarial con IA que identifica tendencias y oportunidades.',
    features: ['Dashboards automáticos', 'Predicciones ML', 'Reportes personalizados'],
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  }
]

function ProductSection() {
  const sectionRef = useScrollAnimation()
  const [activeCase, setActiveCase] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleCaseChange = (index: number) => {
    if (index !== activeCase) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveCase(index)
        setIsTransitioning(false)
      }, 200)
    }
  }

  return (
    <section ref={sectionRef} id="product" className="relative py-20 md:py-28 lg:py-36 px-6 md:px-12 lg:px-20 opacity-0">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 backdropFilter: 'blur(10px)'
               }}>
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"/>
            <span className="text-xs md:text-sm font-medium uppercase tracking-wider leading-none"
                  style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Producto
            </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: 'rgb(var(--color-white))' }}>
            Un asistente para cada
            <br />
            <span className="relative inline-block">
              <span style={{
                background: 'linear-gradient(90deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-500)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                necesidad empresarial
              </span>
            </span>
          </h2>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto"
             style={{ color: 'rgb(var(--color-gray-500))' }}>
            Cuatro formas poderosas de transformar tu gestión del conocimiento
          </p>
        </div>

        {/* Main Content Grid - Equal Heights */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: Selectors */}
          <div className="flex flex-col">
            <div className="flex-1 flex flex-col justify-center space-y-4">
              {useCases.map((useCase, index) => (
                <button
                  key={useCase.id}
                  onClick={() => handleCaseChange(index)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                    activeCase === index ? 'scale-[1.02]' : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    background: activeCase === index
                      ? 'rgba(20, 20, 20, 0.9)'
                      : 'rgba(10, 10, 10, 0.8)',
                    border: activeCase === index
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: activeCase === index
                      ? '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 4px 12px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="relative flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${
                      activeCase === index ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                         style={{
                           background: activeCase === index
                             ? 'rgba(255, 255, 255, 0.1)'
                             : 'rgba(255, 255, 255, 0.05)',
                           border: '1px solid rgba(255, 255, 255, 0.15)'
                         }}>
                      <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                        {useCase.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1 transition-colors duration-300"
                          style={{
                            color: activeCase === index
                              ? 'rgb(var(--color-white))'
                              : 'rgb(var(--color-gray-400))'
                          }}>
                        {useCase.title}
                      </h3>
                      <p className="text-xs mb-3 transition-colors duration-300"
                         style={{
                           color: activeCase === index
                             ? 'rgb(var(--color-gray-400))'
                             : 'rgb(var(--color-gray-600))'
                         }}>
                        {useCase.subtitle}
                      </p>

                      {/* Features Pills - Always visible but with different opacity */}
                      <div className="flex flex-wrap gap-1.5">
                        {useCase.features.map((feature, i) => (
                          <span key={i}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-300 ${
                                  activeCase === index ? 'opacity-100' : 'opacity-50'
                                }`}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  color: 'rgb(var(--color-gray-300))',
                                  border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Active Indicator */}
                    <div className={`flex items-center justify-center transition-all duration-500 ${
                      activeCase === index ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-white"/>
                        <div className="absolute inset-0 w-2 h-2 rounded-full bg-white animate-ping"/>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Video Display - Clean without chrome */}
          <div className="flex flex-col">
            <div className="flex-1 relative rounded-3xl overflow-hidden flex flex-col"
                 style={{
                   background: 'rgba(15, 15, 15, 0.95)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                   backdropFilter: 'blur(20px)'
                 }}>

              {/* Video Content Area */}
              <div className="relative flex-1">
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                     style={{
                       background: 'rgba(0, 0, 0, 0.5)'
                     }}>
                  {/* Video Placeholder - Replace with actual video */}
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                         style={{
                           background: 'rgba(255, 255, 255, 0.1)',
                           backdropFilter: 'blur(10px)',
                           border: '1px solid rgba(255, 255, 255, 0.2)'
                         }}>
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-medium text-white mb-2">{useCases[activeCase].title}</h4>
                    <p className="text-sm text-gray-400 max-w-md mx-auto px-6">Video Demo</p>
                  </div>
                </div>

                {/* Interactive Badge */}
                <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2"
                     style={{
                       background: 'rgba(0, 0, 0, 0.5)',
                       border: '1px solid rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"/>
                  <span className="text-xs font-medium" style={{ color: 'rgb(var(--color-white))' }}>
                    Demo Interactiva
                  </span>
                </div>
              </div>

              {/* Bottom Description Bar */}
              <div className="p-6 border-t"
                   style={{
                     borderColor: 'rgba(255, 255, 255, 0.08)',
                     background: 'rgba(0, 0, 0, 0.2)'
                   }}>
                <p className="text-sm leading-relaxed mb-4"
                   style={{ color: 'rgb(var(--color-gray-400))' }}>
                  {useCases[activeCase].description}
                </p>

                <div className="flex items-center justify-between">
                  <a href="#wishlist"
                     onClick={(e) => {
                       e.preventDefault()
                       document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                     }}
                     className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                     style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Probar esta funcionalidad
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <div className="flex gap-1.5">
                    {useCases.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleCaseChange(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeCase
                            ? 'w-8 bg-white'
                            : 'w-1.5 bg-white/30 hover:bg-white/50'
                        }`}
                      />
                    ))}
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

export default ProductSection