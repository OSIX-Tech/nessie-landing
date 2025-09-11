import { useScrollAnimation } from '../hooks/useScrollAnimation'

function ProductSection() {
  const sectionRef = useScrollAnimation()
  
  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-white))' }}>
              Habla con tus documentos
            </h2>
            <p className="text-xl mb-8" style={{ 
              color: 'rgb(var(--color-gray-400))',
              lineHeight: 1.6
            }}>
              Encuentra respuestas citadas a partir de tus archivos en segundos.
            </p>
            
            {/* Features bullets */}
            <div className="space-y-4 mb-8">
              {[
                'Conecta Drive o sube tus PDFs',
                'Pregunta en lenguaje natural', 
                'Respuestas con citas y acciones'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" 
                       style={{ background: 'rgb(var(--color-white))' }} />
                  <span className="text-lg" style={{ color: 'rgb(var(--color-gray-300))' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgb(var(--color-white))'
                    }}>
                RGPD en UE
              </span>
              <span className="inline-block px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'rgb(var(--color-white))'
                    }}>
                Funciona con Google Drive y OneDrive
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/demo" 
                 data-analytics-id="product_cta_demo_click"
                 className="group px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
                 style={{
                   background: 'rgb(var(--color-white))',
                   color: 'rgb(var(--color-black))',
                   boxShadow: '0 4px 14px rgba(255, 255, 255, 0.25)',
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)'
                   e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)'
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)'
                   e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.25)'
                 }}>
                <span className="flex items-center justify-center gap-2">
                  Probar demo
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
              
              <a href="/empresa" 
                 data-analytics-id="product_cta_b2b_click"
                 className="px-8 py-4 rounded-full font-semibold text-base transition-all duration-300"
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
                 }}>
                Plan Empresa
              </a>
            </div>

            {/* Microcopy */}
            <div className="mt-6 space-y-2">
              <p className="text-sm" style={{ color: 'rgb(var(--color-gray-500))' }}>
                <strong>B2C:</strong> Sin configuraciones. Empieza gratis.
              </p>
              <p className="text-sm" style={{ color: 'rgb(var(--color-gray-500))' }}>
                <strong>B2B:</strong> SSO, auditoría y roles disponibles.
              </p>
            </div>
          </div>

          {/* Visual mockup */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden"
                 style={{
                   background: 'rgba(255, 255, 255, 0.05)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
                 }}>
              {/* TODO: Replace with actual chat mockup asset */}
              <div className="aspect-[4/3] p-8 flex flex-col justify-center space-y-6">
                {/* Chat bubbles mockup */}
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-br-md px-6 py-4 max-w-xs">
                      <p className="text-sm" style={{ color: 'rgb(var(--color-white))' }}>
                        ¿Cuál es el plazo de entrega según el contrato?
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl rounded-bl-md px-6 py-4 max-w-md">
                      <p className="text-sm mb-3" style={{ color: 'rgb(var(--color-gray-300))' }}>
                        Según el <strong>Contrato_v6.pdf</strong>, el plazo de entrega es de 30 días hábiles.
                      </p>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                        <div className="w-2 h-2 rounded-full bg-emerald-400/60"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Citation cards mockup */}
                <div className="flex gap-3 mt-6">
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-gray-400"></div>
                      <span className="text-xs" style={{ color: 'rgb(var(--color-gray-400))' }}>
                        Contrato_v6.pdf
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgb(var(--color-gray-300))' }}>
                      Página 12, Cláusula 4.1
                    </p>
                  </div>
                  <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 rounded bg-gray-400"></div>
                      <span className="text-xs" style={{ color: 'rgb(var(--color-gray-400))' }}>
                        Anexo_legal.pdf  
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'rgb(var(--color-gray-300))' }}>
                      Página 3, Artículo 2
                    </p>
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