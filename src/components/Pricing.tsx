
const plans = [
  {
    name: 'Starter',
    price: '299',
    period: '/mes',
    description: 'Perfecto para equipos pequeños',
    features: [
      'Hasta 10 usuarios',
      '100 GB almacenamiento',
      '5 integraciones',
      'Búsqueda básica',
      'Soporte por email',
      'Actualizaciones mensuales'
    ],
    cta: 'Empezar gratis',
    highlight: false
  },
  {
    name: 'Professional',
    price: '999',
    period: '/mes',
    description: 'Para empresas en crecimiento',
    features: [
      'Hasta 100 usuarios',
      '1 TB almacenamiento',
      'Integraciones ilimitadas',
      'IA avanzada GPT-4',
      'Soporte prioritario 24/7',
      'Analytics y reportes',
      'SSO y 2FA',
      'API access'
    ],
    popular: true,
    cta: 'Empezar prueba',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'Soluciones a medida',
    features: [
      'Usuarios ilimitados',
      'Almacenamiento ilimitado',
      'Deployment on-premise',
      'IA personalizada',
      'Soporte dedicado',
      'SLA 99.9%',
      'Compliance HIPAA/SOC2',
      'Training incluido'
    ],
    cta: 'Contactar ventas',
    highlight: false
  }
]

function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 md:px-12 lg:px-24" style={{ background: 'rgb(var(--color-gray-50))' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgb(var(--color-black))'
                }}>
            PRECIOS
          </span>
          <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-black))' }}>
            Inversión que
            <br />
            <span className="gradient-text">se paga sola</span>
          </h2>
          <p className="text-body">
            Ahorra horas de búsqueda, reduce duplicación de trabajo 
            y acelera la toma de decisiones desde el día uno.
          </p>
        </div>

        {/* Pricing toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-2 rounded-full"
               style={{ 
                 background: 'rgb(var(--color-white))',
                 boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
               }}>
            <button className="px-8 py-3 rounded-full font-medium transition-all text-sm"
                    style={{ 
                      background: 'rgb(var(--color-black))',
                      color: 'rgb(var(--color-white))'
                    }}>
              Mensual
            </button>
            <button className="px-8 py-3 rounded-full font-medium transition-all text-sm flex items-center gap-2"
                    style={{ color: 'rgb(var(--color-gray-600))' }}>
              Anual
              <span className="px-2 py-1 text-xs font-bold rounded-full"
                    style={{ 
                      background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-600)) 100%)',
                      color: 'rgb(var(--color-white))'
                    }}>
                -20%
              </span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards with fixed height */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                plan.highlight ? 'md:-mt-8' : ''
              }`}
              style={{ 
                background: plan.highlight 
                  ? 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)' 
                  : 'rgb(var(--color-white))',
                border: plan.highlight ? 'none' : '1px solid rgb(var(--color-gray-200))',
                boxShadow: plan.highlight 
                  ? '0 30px 60px rgba(0, 0, 0, 0.2)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.05)',
                minHeight: '650px'
              }}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full"
                        style={{ 
                          background: 'rgb(var(--color-black))',
                          color: 'rgb(var(--color-white))',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}>
                    Recomendado
                  </span>
                </div>
              )}
              
              {/* Card content - flex-grow to push button down */}
              <div className="flex flex-col h-full p-8">
                {/* Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2" 
                      style={{ color: plan.highlight ? 'rgb(var(--color-white))' : 'rgb(var(--color-black))' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm mb-6" 
                     style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.7)' : 'rgb(var(--color-gray-600))' }}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    {plan.price !== 'Custom' && (
                      <span className="text-xs" 
                            style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.5)' : 'rgb(var(--color-gray-500))' }}>
                        $
                      </span>
                    )}
                    <span className="text-5xl font-bold tracking-tight" 
                          style={{ color: plan.highlight ? 'rgb(var(--color-white))' : 'rgb(var(--color-black))' }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm" 
                            style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.5)' : 'rgb(var(--color-gray-500))' }}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Features list - flex-grow to fill space */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                           style={{ 
                             background: plan.highlight 
                               ? 'rgba(255, 255, 255, 0.2)' 
                               : 'rgba(0, 0, 0, 0.05)'
                           }}>
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                             style={{ color: plan.highlight ? 'rgb(var(--color-white))' : 'rgb(var(--color-black))' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm" 
                            style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.9)' : 'rgb(var(--color-gray-700))' }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button - stays at bottom */}
                <button className="w-full py-4 px-6 rounded-full font-semibold transition-all hover:scale-[1.02] hover:shadow-xl"
                        style={plan.highlight ? {
                          background: 'rgb(var(--color-white))',
                          color: 'rgb(var(--color-black))'
                        } : {
                          background: 'rgb(var(--color-black))',
                          color: 'rgb(var(--color-white))'
                        }}>
                  {plan.cta}
                  {plan.cta === 'Empezar gratis' && ' →'}
                  {plan.cta === 'Empezar prueba' && ' →'}
                  {plan.cta === 'Contactar ventas' && ' ↗'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        

        
      </div>
    </section>
  )
}

export default Pricing