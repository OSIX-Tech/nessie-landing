import { useScrollAnimation } from '../hooks/useScrollAnimation'

type UseCase = { 
  id: string
  audience: "Estudiante" | "Opositor" | "Freelancer" | "Empresa"
  pain: string
  value: string
  outcome: string
  cta?: { 
    label: string
    href: string
    analyticsId: string 
  }
}

const useCases: UseCase[] = [
  { 
    id: "estudiante", 
    audience: "Estudiante", 
    pain: "PDFs largos y poca trazabilidad", 
    value: "Resúmenes con citas y fichas de estudio", 
    outcome: "De 2 horas a 15 minutos por tema", 
    cta: { 
      label: "Probar con este caso", 
      href: "/demo?preset=estudiante", 
      analyticsId: "usecase_demo_student_click" 
    } 
  },
  { 
    id: "opositor", 
    audience: "Opositor", 
    pain: "Normativa dispersa y difícil de relacionar", 
    value: "Búsqueda por conceptos con referencias", 
    outcome: "Encuentra artículos relevantes en segundos", 
    cta: { 
      label: "Probar con este caso", 
      href: "/demo?preset=opositor", 
      analyticsId: "usecase_demo_opositor_click" 
    } 
  },
  { 
    id: "freelancer", 
    audience: "Freelancer", 
    pain: "Contratos y propuestas repetitivas", 
    value: "Plantillas con extracción de datos y redacción asistida", 
    outcome: "Entrega más rápida con menos errores", 
    cta: { 
      label: "Probar con este caso", 
      href: "/demo?preset=freelancer", 
      analyticsId: "usecase_demo_freelancer_click" 
    } 
  },
  { 
    id: "empresa", 
    audience: "Empresa", 
    pain: "Conocimiento repartido en carpetas y correo", 
    value: "RAG privado con roles, auditoría y SSO", 
    outcome: "Reducción de tiempo de búsqueda y riesgo", 
    cta: { 
      label: "Hablar con ventas", 
      href: "/empresa#contacto", 
      analyticsId: "usecase_b2b_sales_click" 
    } 
  }
]

const audienceIcons = {
  "Estudiante": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "Opositor": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
    </svg>
  ),
  "Freelancer": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0H8m8 0v6a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
    </svg>
  ),
  "Empresa": (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function UseCasesSection() {
  const sectionRef = useScrollAnimation()
  
  return (
    <section ref={sectionRef} id="use-cases" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            CASOS DE USO
          </span>
          <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-white))' }}>
            Soluciones para cada
            <br />
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>tipo de usuario</span>
          </h2>
          <p className="text-xl" style={{ 
            color: 'rgb(var(--color-gray-400))',
            lineHeight: 1.6
          }}>
            Desde estudiantes hasta grandes empresas, Nessie se adapta 
            a las necesidades específicas de cada perfil.
          </p>
        </div>
        
        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {useCases.map((useCase) => (
            <div 
              key={useCase.id}
              className="group p-6 md:p-8 rounded-3xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
              }}
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
              {/* Header with icon and audience */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                     style={{
                       background: 'rgba(255, 255, 255, 0.1)',
                       color: 'rgb(var(--color-white))'
                     }}>
                  {audienceIcons[useCase.audience]}
                </div>
                <h3 className="text-xl font-semibold" style={{ color: 'rgb(var(--color-white))' }}>
                  {useCase.audience}
                </h3>
              </div>
              
              {/* Content */}
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    Problema
                  </h4>
                  <p className="text-base" style={{ color: 'rgb(var(--color-gray-300))' }}>
                    {useCase.pain}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    Valor que aporta Nessie
                  </h4>
                  <p className="text-base" style={{ color: 'rgb(var(--color-gray-300))' }}>
                    {useCase.value}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    Resultado
                  </h4>
                  <p className="text-base font-medium" style={{ color: 'rgb(var(--color-white))' }}>
                    {useCase.outcome}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              {useCase.cta && (
                <a 
                  href={useCase.cta.href}
                  data-analytics-id={useCase.cta.analyticsId}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300"
                  style={{
                    background: useCase.audience === 'Empresa' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'transparent',
                    color: 'rgb(var(--color-white))',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = useCase.audience === 'Empresa' 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {useCase.cta.label}
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection