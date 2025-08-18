
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
  return (
    <section id="features" className="py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mb-24">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgb(var(--color-black))'
                }}>
            CARACTERÍSTICAS
          </span>
          <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-black))' }}>
            Diseñado para equipos
            <br />
            que <span className="gradient-text">exigen excelencia</span>
          </h2>
          <p className="text-body">
            Cada funcionalidad está pensada para maximizar la productividad 
            y minimizar la fricción en el acceso al conocimiento.
          </p>
        </div>
        
        {/* Features bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} 
                 className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]"
                 style={{ 
                   background: 'linear-gradient(135deg, rgb(var(--color-gray-50)) 0%, rgb(var(--color-white)) 100%)',
                   border: '1px solid rgb(var(--color-gray-200))'
                 }}>
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.gradient}`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 transition-all duration-500 group-hover:scale-110"
                     style={{ 
                       background: 'rgb(var(--color-black))',
                       color: 'rgb(var(--color-white))'
                     }}>
                  <div className="group-hover:rotate-12 transition-transform duration-500">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 transition-colors duration-500 group-hover:text-white" 
                    style={{ color: 'rgb(var(--color-black))' }}>
                  {feature.title}
                </h3>
                
                <p className="leading-relaxed transition-colors duration-500 group-hover:text-gray-200" 
                   style={{ color: 'rgb(var(--color-gray-600))' }}>
                  {feature.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700"
                   style={{ background: 'rgb(var(--color-black))' }}></div>
            </div>
          ))}
        </div>
        
        {/* AI Conversational section - redesigned for full width image */}
        <div className="mt-32">
          <div className="rounded-3xl overflow-hidden relative py-16"
               style={{ 
                 background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
               }}>
            {/* Section header centered */}
            <div className="text-center mb-12 px-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      color: 'rgb(var(--color-white))'
                    }}>
                POWERED BY GPT-4 & CLAUDE 3
              </span>
              
              <h3 className="text-4xl md:text-5xl font-bold mb-6"
                  style={{ color: 'rgb(255, 255, 255)' }}>
                IA conversacional que entiende
                <br />
                tu <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>conocimiento empresarial</span>
              </h3>
              
              <p className="text-lg leading-relaxed max-w-3xl mx-auto"
                 style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Nessie no solo busca palabras clave. Comprende la intención, 
                el contexto y las relaciones entre documentos para darte 
                exactamente lo que necesitas.
              </p>
            </div>

            {/* Full width screenshot without browser frame */}
            <div className="px-6 md:px-12 lg:px-24 mb-12">
              <div className="rounded-2xl overflow-hidden mx-auto"
                   style={{ 
                     boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     maxWidth: '1200px'
                   }}>
                <img 
                  src="/nessie.png" 
                  alt="Nessie Platform Screenshot"
                  className="w-full h-auto"
                  style={{
                    display: 'block',
                    maxHeight: '600px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </div>

            {/* Stats below image */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto px-6">
              {[
                { metric: '0.3s', label: 'Tiempo de respuesta' },
                { metric: '99.9%', label: 'Precisión' },
                { metric: '50+', label: 'Idiomas soportados' },
                { metric: '∞', label: 'Documentos procesados' }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold mb-1" 
                       style={{ color: 'rgb(255, 255, 255)' }}>{item.metric}</div>
                  <div className="text-sm" 
                       style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features