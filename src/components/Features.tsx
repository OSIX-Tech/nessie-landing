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
  
  return (
    <section ref={sectionRef} id="features" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header - centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20 lg:mb-24">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgb(var(--color-black))'
                }}>
            CARACTERÍSTICAS
          </span>
          <h2 className="heading-lg mb-4 md:mb-6" style={{ color: 'rgb(var(--color-black))' }}>
            Diseñado para equipos
            <br />
            que <span className="gradient-text">exigen excelencia</span>
          </h2>
          <p className="text-body">
            Cada funcionalidad está pensada para maximizar la productividad 
            y minimizar la fricción en el acceso al conocimiento.
          </p>
        </div>
        
        {/* Features bento grid with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard3D key={index} feature={feature} index={index} />
          ))}
        </div>
        
        {/* AI Conversational section - Clean white design */}
        <div className="mt-16 md:mt-24 lg:mt-32">
          <div className="relative py-12 md:py-16">
            {/* Section header centered */}
            <div className="text-center mb-8 md:mb-12 px-4 md:px-6">
              <span className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold mb-4 md:mb-6"
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: 'rgb(var(--color-black))'
                    }}>
                POWERED BY GPT-4 & CLAUDE 3
              </span>
              
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
                  style={{ color: 'rgb(var(--color-black))' }}>
                IA conversacional que entiende
                <br />
                tu <span className="gradient-text">conocimiento empresarial</span>
              </h3>
              
              <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
                 style={{ color: 'rgb(var(--color-gray-600))' }}>
                Nessie no solo busca palabras clave. Comprende la intención, 
                el contexto y las relaciones entre documentos para darte 
                exactamente lo que necesitas.
              </p>
            </div>

            {/* Clean white screenshot frame */}
            <div className="px-4 md:px-8 lg:px-12 mb-8 md:mb-12">
              {/* Small title */}
              <p className="text-center text-sm font-medium mb-6" 
                 style={{ color: 'rgb(var(--color-gray-500))' }}>
                Interfaz intuitiva y poderosa
              </p>
              
              <div className="mx-auto max-w-6xl">
                {/* Clean macOS-style window frame */}
                <div className="rounded-xl md:rounded-2xl overflow-hidden"
                     style={{ 
                       background: 'rgb(var(--color-white))',
                       boxShadow: `
                         0 30px 60px rgba(0, 0, 0, 0.12),
                         0 10px 20px rgba(0, 0, 0, 0.08)
                       `,
                       border: '1px solid rgb(var(--color-gray-200))'
                     }}>
                  {/* Window header bar */}
                  <div className="flex items-center gap-2 px-4 py-3"
                       style={{ 
                         background: 'rgb(var(--color-gray-50))',
                         borderBottom: '1px solid rgb(var(--color-gray-200))'
                       }}>
                    {/* Traffic lights */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }}></div>
                      <div className="w-3 h-3 rounded-full" style={{ background: '#28ca42' }}></div>
                    </div>
                    {/* Title bar */}
                    <div className="flex-1 text-center">
                      <span className="text-xs font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
                        Nessie AI - Knowledge Platform
                      </span>
                    </div>
                  </div>
                  
                  {/* Content area with subtle animation */}
                  <div className="relative overflow-hidden"
                       style={{ 
                         background: 'linear-gradient(135deg, rgb(var(--color-gray-50)) 0%, rgb(var(--color-white)) 100%)'
                       }}>
                    <img 
                      src="/nessie.png" 
                      alt="Nessie Platform Interface"
                      className="w-full h-auto block"
                      style={{
                        maxHeight: '600px',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        // Premium fallback UI
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.parentElement!.innerHTML = `
                          <div style="
                            width: 100%;
                            height: 500px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.05) 100%);
                            position: relative;
                            overflow: hidden;
                          ">
                            <!-- Animated background pattern -->
                            <div style="
                              position: absolute;
                              inset: 0;
                              opacity: 0.03;
                              background-image: repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 35px,
                                rgba(0, 0, 0, 0.03) 35px,
                                rgba(0, 0, 0, 0.03) 70px
                              );
                            "></div>
                            
                            <!-- Content placeholder -->
                            <div style="
                              width: 80%;
                              max-width: 400px;
                              space-y: 16px;
                              z-index: 1;
                            ">
                              <!-- Search bar mockup -->
                              <div style="
                                height: 48px;
                                background: rgba(0, 0, 0, 0.05);
                                border-radius: 24px;
                                display: flex;
                                align-items: center;
                                padding: 0 24px;
                                margin-bottom: 24px;
                              ">
                                <div style="
                                  width: 20px;
                                  height: 20px;
                                  border: 2px solid rgba(0, 0, 0, 0.2);
                                  border-radius: 50%;
                                  margin-right: 12px;
                                "></div>
                                <div style="
                                  height: 8px;
                                  width: 120px;
                                  background: rgba(0, 0, 0, 0.08);
                                  border-radius: 4px;
                                "></div>
                              </div>
                              
                              <!-- Results mockup -->
                              <div style="space-y: 12px;">
                                <div style="
                                  height: 60px;
                                  background: rgba(0, 0, 0, 0.03);
                                  border-radius: 12px;
                                  padding: 16px;
                                  margin-bottom: 12px;
                                ">
                                  <div style="height: 8px; width: 60%; background: rgba(0, 0, 0, 0.08); border-radius: 4px; margin-bottom: 8px;"></div>
                                  <div style="height: 6px; width: 90%; background: rgba(0, 0, 0, 0.05); border-radius: 3px;"></div>
                                </div>
                                <div style="
                                  height: 60px;
                                  background: rgba(0, 0, 0, 0.03);
                                  border-radius: 12px;
                                  padding: 16px;
                                  margin-bottom: 12px;
                                ">
                                  <div style="height: 8px; width: 50%; background: rgba(0, 0, 0, 0.08); border-radius: 4px; margin-bottom: 8px;"></div>
                                  <div style="height: 6px; width: 85%; background: rgba(0, 0, 0, 0.05); border-radius: 3px;"></div>
                                </div>
                                <div style="
                                  height: 60px;
                                  background: rgba(0, 0, 0, 0.03);
                                  border-radius: 12px;
                                  padding: 16px;
                                ">
                                  <div style="height: 8px; width: 70%; background: rgba(0, 0, 0, 0.08); border-radius: 4px; margin-bottom: 8px;"></div>
                                  <div style="height: 6px; width: 80%; background: rgba(0, 0, 0, 0.05); border-radius: 3px;"></div>
                                </div>
                              </div>
                            </div>
                            
                            <!-- Loading indicator -->
                            <div style="
                              position: absolute;
                              bottom: 20px;
                              left: 50%;
                              transform: translateX(-50%);
                              display: flex;
                              gap: 4px;
                            ">
                              <div style="width: 8px; height: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 50%; animation: pulse 1.5s infinite;"></div>
                              <div style="width: 8px; height: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 50%; animation: pulse 1.5s infinite 0.3s;"></div>
                              <div style="width: 8px; height: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 50%; animation: pulse 1.5s infinite 0.6s;"></div>
                            </div>
                          </div>
                        `
                      }}
                    />
                    
                    {/* Subtle reflection effect */}
                    <div className="absolute inset-0 pointer-events-none"
                         style={{
                           background: 'linear-gradient(135deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)',
                           transform: 'translateX(-100%)',
                           animation: 'shimmer 8s infinite'
                         }}></div>
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

export default Features