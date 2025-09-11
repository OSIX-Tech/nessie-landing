import { type ReactNode } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

type Feature = { 
  id: string
  title: string
  benefit: string
  example: string
  icon?: ReactNode 
}

const features: Feature[] = [
  { 
    id: "citadas", 
    title: "Respuestas con citas", 
    benefit: "Confianza y trazabilidad", 
    example: "Según «Contrato_v6.pdf», cláusula 4...",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    id: "semantica", 
    title: "Búsqueda semántica", 
    benefit: "Encuentra conceptos, no solo palabras", 
    example: "Detecta 'periodo de prueba' aunque ponga 'fase inicial'.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  { 
    id: "resumen", 
    title: "Resumen inteligente", 
    benefit: "Ahorra tiempo en documentos largos", 
    example: "Resumen en 5 puntos con enlaces a páginas.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  { 
    id: "extraccion", 
    title: "Extracción estructurada", 
    benefit: "Tablas y campos listos para exportar", 
    example: "Fechas e importes a CSV en un clic.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  { 
    id: "integraciones", 
    title: "Integraciones", 
    benefit: "Conecta Drive, OneDrive y Gmail", 
    example: "Autorización granular solo lectura.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    )
  },
  { 
    id: "privacidad", 
    title: "Privacidad y control", 
    benefit: "Datos en la UE y sin entrenamiento con tu info", 
    example: "Borrado inmediato por documento.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  }
]

function FeaturesSection() {
  const sectionRef = useScrollAnimation()

  const handleFeatureHover = (featureId: string) => {
    // Analytics tracking for hover
    const element = document.querySelector(`[data-feature-id="${featureId}"]`)
    if (element) {
      element.setAttribute('data-analytics-id', 'features_card_hover')
    }
  }

  const handleCTAClick = () => {
    // Scroll to use cases section since demo section doesn't exist yet
    document.getElementById('use-cases')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            CARACTERÍSTICAS
          </span>
          <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-white))' }}>
            Funcionalidades que 
            <br />
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>marcan la diferencia</span>
          </h2>
          <p className="text-xl" style={{ 
            color: 'rgb(var(--color-gray-400))',
            lineHeight: 1.6
          }}>
            Cada funcionalidad está diseñada para maximizar la productividad 
            y minimizar la fricción en el acceso al conocimiento.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id}
              data-feature-id={feature.id}
              className="group p-6 md:p-8 rounded-3xl transition-all duration-300 cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={() => handleFeatureHover(feature.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                   style={{
                     background: 'rgba(255, 255, 255, 0.1)',
                     color: 'rgb(var(--color-white))'
                   }}>
                {feature.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3" style={{ color: 'rgb(var(--color-white))' }}>
                {feature.title}
              </h3>
              <p className="text-base mb-4" style={{ 
                color: 'rgb(var(--color-gray-400))',
                lineHeight: 1.5
              }}>
                {feature.benefit}
              </p>
              <p className="text-sm" style={{ 
                color: 'rgb(var(--color-gray-500))',
                lineHeight: 1.4,
                fontStyle: 'italic'
              }}>
                {feature.example}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button 
            onClick={handleCTAClick}
            data-analytics-id="features_cta_how_click"
            className="group px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
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
            }}
          >
            <span className="flex items-center justify-center gap-2">
              Ver cómo funciona
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection