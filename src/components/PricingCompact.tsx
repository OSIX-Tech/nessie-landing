import { useScrollAnimation } from '../hooks/useScrollAnimation'

const plansData = [
  {
    name: 'Starter',
    price: '299',
    period: '/mes',
    description: 'Para equipos pequeños',
    features: [
      'Hasta 10 usuarios',
      '100 GB almacenamiento', 
      'Búsqueda básica',
      'Soporte por email'
    ],
    cta: 'Empezar gratis'
  },
  {
    name: 'Professional',
    price: '999',
    period: '/mes',
    description: 'Para empresas en crecimiento',
    features: [
      'Hasta 100 usuarios',
      '1 TB almacenamiento',
      'IA avanzada GPT-4',
      'Soporte 24/7',
      'Analytics y reportes',
      'SSO y 2FA'
    ],
    popular: true,
    cta: 'Empezar prueba'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Soluciones a medida',
    features: [
      'Usuarios ilimitados',
      'Almacenamiento ilimitado',
      'Integraciones personalizadas',
      'Soporte dedicado',
      'On-premise disponible'
    ],
    cta: 'Contactar ventas'
  }
]

function PricingCompact() {
  const sectionRef = useScrollAnimation()
  
  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header - more compact */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            PRECIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'rgb(var(--color-white))' }}>
            Elige tu plan
          </h2>
          <p className="text-lg" style={{ color: 'rgb(var(--color-gray-400))' }}>
            Soluciones escalables para cada tipo de empresa
          </p>
        </div>
        
        {/* Pricing cards - more compact grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plansData.map((plan, index) => (
            <div key={index} 
                 className={`relative rounded-2xl p-6 transition-all duration-300 ${plan.popular ? 'scale-105' : ''}`}
                 style={{
                   background: plan.popular ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.05)',
                   border: plan.popular ? '2px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: plan.popular ? '0 20px 60px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.2)'
                 }}
                 onMouseOver={(e) => {
                   if (!plan.popular) {
                     e.currentTarget.style.transform = 'translateY(-4px)'
                     e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)'
                   }
                 }}
                 onMouseLeave={(e) => {
                   if (!plan.popular) {
                     e.currentTarget.style.transform = 'translateY(0)'
                     e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.2)'
                   }
                 }}>
              
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: 'rgb(var(--color-white))',
                          color: 'rgb(var(--color-black))'
                        }}>
                    MÁS POPULAR
                  </span>
                </div>
              )}
              
              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(var(--color-white))' }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgb(var(--color-gray-400))' }}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl md:text-3xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {plan.price === 'Custom' ? plan.price : `€${plan.price}`}
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    {plan.period}
                  </span>
                </div>
              </div>
              
              {/* Features - more compact */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    <span className="text-sm" style={{ color: 'rgb(var(--color-gray-300))' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <button className="w-full py-3 rounded-full font-semibold text-sm transition-all duration-300"
                      style={{
                        background: plan.popular ? 'rgb(var(--color-white))' : 'transparent',
                        color: plan.popular ? 'rgb(var(--color-black))' : 'rgb(var(--color-white))',
                        border: plan.popular ? 'none' : '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      onMouseEnter={(e) => {
                        if (!plan.popular) {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        } else {
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!plan.popular) {
                          e.currentTarget.style.background = 'transparent'
                        } else {
                          e.currentTarget.style.transform = 'translateY(0)'
                        }
                      }}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingCompact