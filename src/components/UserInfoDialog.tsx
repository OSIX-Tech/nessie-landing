import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface UserInfoDialogProps {
  isOpen: boolean
  onSubmit: (userType: string, expectedPrice: string) => void
  onSkip: () => void
}

function UserInfoDialog({ isOpen, onSubmit, onSkip }: UserInfoDialogProps) {
  const [userType, setUserType] = useState('')
  const [customUserType, setCustomUserType] = useState('')
  const [expectedPrice, setExpectedPrice] = useState('')
  const [step, setStep] = useState(1)
  const [isClosing, setIsClosing] = useState(false)
  const savedScrollY = useRef(0)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  // Resetear estado cuando se abre el diálogo
  useEffect(() => {
    if (isOpen) {
      setUserType('')
      setCustomUserType('')
      setExpectedPrice('')
      setStep(1)
      setIsClosing(false)
      // Focus inicial para accesibilidad
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 0)
    }
  }, [isOpen])

  // Bloquear/desbloquear scroll del body
  useEffect(() => {
    if (isOpen) {
      savedScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      if (savedScrollY.current > 0) {
        window.scrollTo(0, savedScrollY.current)
      }
    }

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

  // Accesibilidad: Escape para cerrar
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onSkip()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onSkip])

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
    setIsClosing(true)
    setTimeout(() => {
      onSubmit(finalUserType, expectedPrice)
    }, 300)
  }

  const userTypeOptions = [
    {
      value: 'estudiante',
      label: 'Estudiante',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
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
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Investigación y análisis de datos'
    },
    {
      value: 'profesional',
      label: 'Profesional',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Uso personal profesional'
    },
    {
      value: 'empresa',
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Otro tipo de uso'
    }
  ]

  const priceOptions = [
    { value: '5-15', label: '5-15€', description: 'Básico' },
    { value: '15-30', label: '15-30€', description: 'Estándar' },
    { value: '30-60', label: '30-60€', description: 'Pro' },
    { value: '60-100', label: '60-100€', description: 'Premium' },
    { value: '100-150', label: '100-150€', description: 'Business' },
    { value: '150+', label: '+150€', description: 'Enterprise' }
  ]

  if (!isOpen) return null

  const dialogContent = (
    <div>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
         @keyframes modalFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
         @keyframes modalScaleOut {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0;
          }
        }
         /* Safe content animations that don't override centering */
         @keyframes contentIn {
           from { opacity: 0; transform: translateY(16px) scale(0.98); }
           to { opacity: 1; transform: translateY(0) scale(1); }
         }
         @keyframes contentOut {
           from { opacity: 1; transform: translateY(0) scale(1); }
           to { opacity: 0; transform: translateY(10px) scale(0.98); }
         }
        .backdrop-entering {
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        .backdrop-closing {
          animation: modalFadeOut 0.2s ease-in forwards;
        }
         .dialog-entering { animation: contentIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
         .dialog-closing { animation: contentOut 0.2s ease-in forwards; }
        .option-hover:hover {
          transform: translateY(-2px);
          transition: all 0.2s ease;
        }
        /* Custom scrollbar for dark theme */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${isClosing ? 'backdrop-closing' : 'backdrop-entering'}`}
        onClick={onSkip}
        style={{
          zIndex: 999999,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      />

      {/* Dialog Container - perfectly centered */}
      <div
        className={`
          fixed
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          max-h-[92vh] md:max-h-[88vh]
          rounded-[32px]
          overflow-hidden
          flex flex-col
        `}
        style={{
          zIndex: 1000000,
          width: 'min(calc(100vw - 16px), 56rem)',
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
      >
        <div className={`${isClosing ? 'dialog-closing' : 'dialog-entering'}`} style={{ willChange: 'transform', display: 'grid', gridTemplateRows: 'auto 1fr auto', minHeight: 0 }}>
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6" style={{ background: '#0f0f0f' }}>
          {/* Step Indicator */}
          <div className="absolute top-6 left-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                Paso
              </span>
              <span className="text-sm font-bold" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {step}
              </span>
              <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                de 2
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onSkip}
            ref={closeButtonRef}
            className="absolute top-6 right-6 w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mt-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
              {step === 1 ? '¿Cómo usarás Nessie?' : '¿Cuánto pagarías?'}
            </h3>
            <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {step === 1
                ? 'Selecciona tu perfil para personalizar la experiencia'
                : 'Ayúdanos a definir el mejor precio'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto custom-scrollbar px-8 py-8 relative" style={{
          background: '#0a0a0a',
          maxHeight: 'calc(90vh - 280px)'
        }}>
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            backgroundPosition: '0 0',
            opacity: 0.5,
            maskImage: 'radial-gradient(ellipse at center, transparent 0%, black 50%)'
          }} />
          {step === 1 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {userTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setUserType(option.value)}
                  className={`option-hover relative p-4 md:p-5 rounded-2xl text-left transition-all ${
                    option.value === 'otros' ? 'md:col-span-2' : ''
                  }`}
                  style={{
                    background: userType === option.value
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: userType === option.value
                      ? '1.5px solid rgba(255, 255, 255, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: userType === option.value
                      ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
                      : '0 2px 8px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className={`flex ${option.value === 'otros' ? 'items-center gap-4' : 'flex-row items-center gap-4 md:flex-col md:items-center md:text-center md:gap-3'}`}>
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                         style={{
                           background: userType === option.value
                             ? 'rgba(255, 255, 255, 0.1)'
                             : 'rgba(255, 255, 255, 0.03)',
                           border: '1px solid rgba(255, 255, 255, 0.08)'
                         }}>
                      <div style={{ color: userType === option.value ? '#ffffff' : 'rgba(255, 255, 255, 0.4)' }}>
                        {option.icon}
                      </div>
                    </div>

                    <div className="flex-1 md:flex-none">
                      <h4 className="font-semibold text-base mb-0.5 md:mb-1"
                          style={{ color: userType === option.value ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}>
                        {option.label}
                      </h4>
                      <p className="text-sm"
                         style={{ color: userType === option.value ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)' }}>
                        {option.description}
                      </p>
                    </div>

                    {/* Checkmark for mobile - inline */}
                    <div className="md:hidden">
                      {userType === option.value && (
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                             style={{ background: '#ffffff' }}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0a0a0a' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkmark for desktop - absolute positioned */}
                  {userType === option.value && (
                    <div className="hidden md:flex absolute top-4 right-4 w-5 h-5 rounded-full items-center justify-center"
                         style={{ background: '#ffffff' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0a0a0a' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

              {userType === 'otros' && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Especifica tu tipo de uso..."
                    value={customUserType}
                    onChange={(e) => setCustomUserType(e.target.value)}
                    className="w-full p-4 text-base rounded-xl outline-none transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {priceOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExpectedPrice(option.value)}
                  className="option-hover p-5 rounded-2xl text-center transition-all"
                  style={{
                    background: expectedPrice === option.value
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: expectedPrice === option.value
                      ? '1.5px solid rgba(255, 255, 255, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: expectedPrice === option.value
                      ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.08)'
                      : '0 2px 8px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <div className="text-xl font-bold mb-1"
                       style={{ color: expectedPrice === option.value ? '#ffffff' : 'rgba(255, 255, 255, 0.8)' }}>
                    {option.label}
                  </div>
                  <div className="text-xs mb-2"
                       style={{ color: expectedPrice === option.value ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.4)' }}>
                    /mes
                  </div>
                  <div className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full inline-block"
                       style={{
                         background: expectedPrice === option.value
                           ? 'rgba(255, 255, 255, 0.1)'
                           : 'rgba(255, 255, 255, 0.03)',
                         color: expectedPrice === option.value
                           ? 'rgba(255, 255, 255, 0.7)'
                           : 'rgba(255, 255, 255, 0.3)'
                       }}>
                    {option.description}
                  </div>
                  {expectedPrice === option.value && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                         style={{ background: '#ffffff' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#0a0a0a' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 flex items-center justify-between"
             style={{
               background: '#0f0f0f',
               borderTop: '1px solid rgba(255, 255, 255, 0.08)'
             }}>
          <div>
            {step === 2 ? (
              <button
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                ← Atrás
              </button>
            ) : (
              <button
                onClick={onSkip}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'transparent',
                  color: 'rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                Omitir
              </button>
            )}
          </div>

          <div>
            {step === 1 ? (
              <button
                onClick={handleNext}
                disabled={!userType || (userType === 'otros' && !customUserType)}
                className="px-7 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                style={{
                  background: userType && (userType !== 'otros' || customUserType)
                    ? '#ffffff'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: userType && (userType !== 'otros' || customUserType)
                    ? '#0a0a0a'
                    : 'rgba(255, 255, 255, 0.3)'
                }}
              >
                Continuar →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!expectedPrice}
                className="px-7 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                style={{
                  background: expectedPrice ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
                  color: expectedPrice ? '#0a0a0a' : 'rgba(255, 255, 255, 0.3)'
                }}
              >
                Finalizar ✓
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  )

  return createPortal(dialogContent, document.body)
}

export default UserInfoDialog