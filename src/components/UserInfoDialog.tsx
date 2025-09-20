import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface UserInfoDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (userType: string, expectedPrice: string) => void
  onSkip: () => void
}

function UserInfoDialog({ isOpen, onClose, onSubmit, onSkip }: UserInfoDialogProps) {
  const [userType, setUserType] = useState('')
  const [customUserType, setCustomUserType] = useState('')
  const [expectedPrice, setExpectedPrice] = useState('')
  const [step, setStep] = useState(1)
  const [isClosing, setIsClosing] = useState(false)
  const savedScrollY = useRef(0)

  // Resetear estado cuando se abre el diálogo
  useEffect(() => {
    if (isOpen) {
      // Resetear todos los estados del diálogo
      setUserType('')
      setCustomUserType('')
      setExpectedPrice('')
      setStep(1)
      setIsClosing(false)
    }
  }, [isOpen])

  // Bloquear/desbloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      // Guardar la posición actual del scroll
      savedScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restaurar el scroll a la posición guardada
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current)
      }
    }

    // Cleanup al desmontar - restaurar scroll si está bloqueado
    return () => {
      if (document.body.style.position === 'fixed') {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        
        if (savedScrollY.current > 0) {
          window.scrollTo(0, savedScrollY.current)
        }
      }
    }
  }, [isOpen])

  const handleNext = () => {
    if (step === 1 && userType) {
      setStep(2)
    }
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    }
  }

  const handleSubmit = () => {
    const finalUserType = userType === 'otros' ? customUserType : userType
    
    // Mostrar animación de cierre
    setIsClosing(true)
    
    // Esperar la animación antes de cerrar
    setTimeout(() => {
      onSubmit(finalUserType, expectedPrice)
    }, 600)
  }

  const userTypeOptions = [
    { 
      value: 'estudiante', 
      label: 'Estudiante',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: 'Uso académico y aprendizaje'
    },
    { 
      value: 'investigador', 
      label: 'Investigador',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      description: 'Investigación y análisis'
    },
    { 
      value: 'profesional-individual', 
      label: 'Profesional',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: 'Uso personal profesional'
    },
    { 
      value: 'profesional-empresa', 
      label: 'Empresa',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      description: 'Equipo y organización'
    },
    { 
      value: 'otros', 
      label: 'Otros',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Otro tipo de uso'
    }
  ]

  const priceOptions = [
    { value: '5-15', label: '5€ - 15€', subtitle: '/mes', description: 'Básico' },
    { value: '15-30', label: '15€ - 30€', subtitle: '/mes', description: 'Estándar' },
    { value: '30-60', label: '30€ - 60€', subtitle: '/mes', description: 'Profesional' },
    { value: '60-100', label: '60€ - 100€', subtitle: '/mes', description: 'Premium' },
    { value: '100-150', label: '100€ - 150€', subtitle: '/mes', description: 'Enterprise' },
    { value: '150+', label: '+150€', subtitle: '/mes', description: 'Custom' }
  ]

  if (!isOpen) return null

  const dialogContent = (
    <>
      <style>{`
        @keyframes slide-out {
          from { transform: scale(1) translateY(0); opacity: 1; }
          to { transform: scale(0.95) translateY(-20px); opacity: 0; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .dialog-closing {
          animation: slide-out 0.6s ease-in-out forwards;
        }
        .backdrop-closing {
          animation: fade-out 0.6s ease-in-out forwards;
        }
      `}</style>
      <div className={`fixed inset-0 flex items-center justify-center p-4 ${isClosing ? 'backdrop-closing' : ''}`}
           onClick={onSkip}
           style={{ 
             zIndex: 999999,
             background: 'rgba(0, 0, 0, 0.8)',
             backdropFilter: 'blur(8px)',
             isolation: 'isolate'
           }}>
      <div className={`relative w-full max-w-2xl rounded-3xl overflow-hidden ${isClosing ? 'dialog-closing' : ''}`}
           onClick={(e) => e.stopPropagation()}
           style={{ 
             zIndex: 1000000,
             background: 'linear-gradient(145deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-50)) 100%)',
             boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)'
           }}>
        
        {/* Header con progreso */}
        <div className="relative px-8 pt-8 pb-6"
             style={{
               background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
             }}>
          
          {/* Progress bar */}
          <div className="absolute top-0 left-0 h-1 transition-all duration-500"
               style={{ 
                 width: step === 1 ? '50%' : '100%',
                 background: 'linear-gradient(90deg, rgb(var(--color-white)) 0%, rgba(255, 255, 255, 0.7) 100%)'
               }}></div>

          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ color: 'rgb(var(--color-white))' }}>
              ¡Gracias por unirte! 🎉
            </h3>
            <p className="text-sm opacity-80"
               style={{ color: 'rgb(var(--color-white))' }}>
              {step === 1 ? 'Ayúdanos a personalizar Nessie para ti' : 'Último paso: precio esperado'}
            </p>
          </div>

          {/* Skip button */}
          <button
            onClick={onSkip}
            className="absolute top-4 right-4 text-sm px-4 py-2 rounded-full transition-all hover:scale-105 hover:bg-white hover:bg-opacity-20"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'rgb(var(--color-white))',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
            Omitir
          </button>
        </div>

        <div className="p-8">
          {step === 1 ? (
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-center mb-8"
                  style={{ color: 'rgb(var(--color-black))' }}>
                ¿Qué tipo de usuario eres?
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setUserType(option.value)}
                    className="relative p-6 rounded-2xl text-left transition-all duration-300 hover:scale-105 group"
                    style={{
                      background: userType === option.value 
                        ? 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
                        : 'rgb(var(--color-white))',
                      border: userType === option.value 
                        ? '2px solid rgb(var(--color-black))'
                        : '2px solid rgb(var(--color-gray-200))',
                      boxShadow: userType === option.value 
                        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg"
                           style={{
                             background: userType === option.value 
                               ? 'rgba(255, 255, 255, 0.2)' 
                               : 'rgba(255, 255, 255, 0.1)',
                             border: '1px solid rgba(255, 255, 255, 0.2)'
                           }}>
                        <div style={{ 
                          color: userType === option.value 
                            ? 'rgb(var(--color-white))' 
                            : 'rgb(var(--color-gray-400))' 
                        }}>
                          {option.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-lg mb-1"
                            style={{ 
                              color: userType === option.value 
                                ? 'rgb(var(--color-white))' 
                                : 'rgb(var(--color-black))' 
                            }}>
                          {option.label}
                        </h5>
                        <p className="text-sm opacity-75"
                           style={{ 
                             color: userType === option.value 
                               ? 'rgb(var(--color-white))' 
                               : 'rgb(var(--color-gray-600))' 
                           }}>
                          {option.description}
                        </p>
                      </div>
                      
                      {userType === option.value && (
                        <div className="absolute top-4 right-4">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                               style={{ color: 'rgb(var(--color-white))' }}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {userType === 'otros' && (
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Especifica tu tipo de uso..."
                    value={customUserType}
                    onChange={(e) => setCustomUserType(e.target.value)}
                    className="w-full p-4 text-base rounded-xl outline-none transition-all focus:scale-105"
                    style={{ 
                      border: '2px solid rgb(var(--color-gray-200))',
                      background: 'rgb(var(--color-white))',
                      color: 'rgb(var(--color-black))',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}
                  />
                </div>
              )}

              <div className="flex justify-center pt-6">
                <button
                  onClick={handleNext}
                  disabled={!userType || (userType === 'otros' && !customUserType)}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: userType && (userType !== 'otros' || customUserType)
                      ? 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
                      : 'rgb(var(--color-gray-300))',
                    color: 'rgb(var(--color-white))',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                  }}>
                  Continuar →
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full transition-all hover:scale-105"
                  style={{ 
                    background: 'rgb(var(--color-gray-100))',
                    color: 'rgb(var(--color-black))'
                  }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h4 className="text-xl font-bold flex-1"
                    style={{ color: 'rgb(var(--color-black))' }}>
                  ¿Qué precio esperarías?
                </h4>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {priceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setExpectedPrice(option.value)}
                    className="relative p-5 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                    style={{
                      background: expectedPrice === option.value 
                        ? 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
                        : 'rgb(var(--color-white))',
                      border: expectedPrice === option.value 
                        ? '2px solid rgb(var(--color-black))'
                        : '2px solid rgb(var(--color-gray-200))',
                      boxShadow: expectedPrice === option.value 
                        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                        : '0 4px 12px rgba(0, 0, 0, 0.05)'
                    }}>
                    
                    <div className="text-lg font-bold mb-1"
                         style={{ 
                           color: expectedPrice === option.value 
                             ? 'rgb(var(--color-white))' 
                             : 'rgb(var(--color-black))' 
                         }}>
                      {option.label}
                    </div>
                    
                    <div className="text-xs opacity-75 mb-2"
                         style={{ 
                           color: expectedPrice === option.value 
                             ? 'rgb(var(--color-white))' 
                             : 'rgb(var(--color-gray-600))' 
                         }}>
                      {option.subtitle}
                    </div>
                    
                    <div className="text-xs px-2 py-1 rounded-full"
                         style={{ 
                           background: expectedPrice === option.value 
                             ? 'rgba(255, 255, 255, 0.2)' 
                             : 'rgb(var(--color-gray-100))',
                           color: expectedPrice === option.value 
                             ? 'rgb(var(--color-white))' 
                             : 'rgb(var(--color-gray-600))'
                         }}>
                      {option.description}
                    </div>

                    {expectedPrice === option.value && (
                      <div className="absolute top-3 right-3">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"
                             style={{ color: 'rgb(var(--color-white))' }}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-6">
                <button
                  onClick={handleSubmit}
                  disabled={!expectedPrice}
                  className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{
                    background: expectedPrice
                      ? 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)'
                      : 'rgb(var(--color-gray-300))',
                    color: 'rgb(var(--color-white))',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                  }}>
                  Finalizar 🎉
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )

  return createPortal(dialogContent, document.body)
}

export default UserInfoDialog