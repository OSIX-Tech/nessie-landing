
import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const plansData = [
  {
    name: 'Starter',
    price: '299',
    priceAnnual: '239',
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
    priceAnnual: '799',
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
    priceAnnual: 'Custom',
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
  const [isAnnual, setIsAnnual] = useState(false)
  const sectionRef = useScrollAnimation()
  
  return (
    <section ref={sectionRef} id="pricing" className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0" style={{ background: 'rgb(var(--color-gray-50))' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgb(var(--color-black))'
                }}>
            PRECIOS
          </span>
          <h2 className="heading-lg mb-4 md:mb-6" style={{ color: 'rgb(var(--color-black))' }}>
            Inversión que
            <br />
            <span className="gradient-text">se paga sola</span>
          </h2>
          <p className="text-body">
            Ahorra horas de búsqueda, reduce duplicación de trabajo 
            y acelera la toma de decisiones desde el día uno.
          </p>
        </div>

        {/* Premium Pricing toggle with hover effects */}
        <div className="flex justify-center mb-8 md:mb-16">
          <div className="relative inline-flex items-center p-1 md:p-1.5 rounded-full"
               style={{ 
                 background: 'linear-gradient(135deg, rgb(var(--color-gray-100)) 0%, rgb(var(--color-white)) 100%)',
                 boxShadow: `
                   0 10px 30px rgba(0, 0, 0, 0.08),
                   inset 0 1px 0 rgba(255, 255, 255, 0.9),
                   inset 0 -1px 0 rgba(0, 0, 0, 0.05)
                 `
               }}>
            {/* Sliding background indicator */}
            <div className="absolute h-[calc(100%-8px)] md:h-[calc(100%-12px)] top-1 md:top-1.5 rounded-full transition-all duration-500 ease-out"
                 style={{ 
                   background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)',
                   width: 'calc(50% - 4px)',
                   left: isAnnual ? 'calc(50% + 2px)' : '4px',
                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                 }}></div>
            
            <button 
                    onClick={() => setIsAnnual(false)}
                    className="relative z-10 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm hover:scale-105"
                    style={{ 
                      color: !isAnnual ? 'rgb(var(--color-white))' : 'rgb(var(--color-gray-600))'
                    }}>
              Mensual
            </button>
            <button 
                    onClick={() => setIsAnnual(true)}
                    className="relative z-10 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 text-xs md:text-sm flex items-center gap-2 hover:scale-105"
                    style={{ 
                      color: isAnnual ? 'rgb(var(--color-white))' : 'rgb(var(--color-gray-600))'
                    }}>
              Anual
              <span className="px-2 py-1 text-xs font-bold rounded-full"
                    style={{ 
                      background: isAnnual 
                        ? 'rgba(255, 255, 255, 0.2)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      color: isAnnual ? 'rgb(var(--color-white))' : 'rgb(var(--color-gray-700))'
                    }}>
                -20%
              </span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards with fixed height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {plansData.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl md:rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                plan.highlight ? 'lg:-mt-8' : ''
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
              <div className="flex flex-col h-full p-6 md:p-8">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-2" 
                      style={{ color: plan.highlight ? 'rgb(var(--color-white))' : 'rgb(var(--color-black))' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm mb-4 md:mb-6" 
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
                    <span className="text-4xl md:text-5xl font-bold tracking-tight" 
                          style={{ color: plan.highlight ? 'rgb(var(--color-white))' : 'rgb(var(--color-black))' }}>
                      {isAnnual ? plan.priceAnnual : plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-sm" 
                            style={{ color: plan.highlight ? 'rgba(255, 255, 255, 0.5)' : 'rgb(var(--color-gray-500))' }}>
                        {plan.period}
                        {isAnnual && plan.price !== 'Custom' && (
                          <span className="ml-1 text-xs opacity-70">(facturado anual)</span>
                        )}
                      </span>
                    )}
                  </div>
                  {/* Indicador de ahorro anual */}
                  {isAnnual && plan.price !== 'Custom' && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                         style={{ 
                           background: plan.highlight ? 'rgba(255, 255, 255, 0.15)' : 'rgba(16, 185, 129, 0.1)',
                           color: plan.highlight ? 'rgb(255, 255, 255)' : 'rgb(16, 185, 129)'
                         }}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ahorras ${parseInt(plan.price) * 12 - parseInt(plan.priceAnnual) * 12}/año
                    </div>
                  )}
                </div>
                
                {/* Features list - flex-grow to fill space */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-grow">
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
                <button className="w-full py-3 md:py-4 px-6 rounded-full text-sm md:text-base font-semibold transition-all hover:scale-[1.02] hover:shadow-xl"
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