import { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { API_ENDPOINTS, apiRequest } from '../lib/api'
import UserInfoDialog from './UserInfoDialog'

function Wishlist() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmedCount, setConfirmedCount] = useState(2847) // Valor por defecto
  const [showDialog, setShowDialog] = useState(false)
  const [currentEmailId, setCurrentEmailId] = useState<number | null>(null)
  const sectionRef = useScrollAnimation()

  // Cargar contador al montar el componente
  useEffect(() => {
    const loadCount = async () => {
      try {
        const response = await apiRequest(API_ENDPOINTS.count)
        setConfirmedCount(response.confirmed || 2847)
      } catch {
        // Mantener el valor por defecto si falla
      }
    }
    loadCount()
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(email)) {
      return 'Email inválido'
    }
    
    return ''
  }

  const getMetadata = () => {
    const urlParams = new URLSearchParams(window.location.search)
    
    return {
      browser_language: navigator.language || navigator.languages?.[0] || 'unknown',
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      country_code: null, // Se podría obtener con un servicio de geolocalización
      utm_source: urlParams.get('utm_source'),
      utm_medium: urlParams.get('utm_medium'),
      utm_campaign: urlParams.get('utm_campaign'),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screen_resolution: `${screen.width}x${screen.height}`
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }
    
    if (!email) return

    setIsLoading(true)
    setEmailError('')

    try {
      const metadata = getMetadata()
      const payload = {
        email,
        browser_language: metadata.browser_language,
        user_agent: metadata.user_agent,
        referrer: metadata.referrer,
        utm_source: metadata.utm_source,
        utm_medium: metadata.utm_medium,
        utm_campaign: metadata.utm_campaign,
        timezone: metadata.timezone,
        screen_resolution: metadata.screen_resolution
      }

      console.log('📤 Enviando datos al backend:', payload)

      const response = await apiRequest(API_ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(payload)
      })

      console.log('📥 Respuesta del backend:', response)

      // Éxito - mostrar mensaje de confirmación y diálogo
      setIsSubscribed(true)
      setEmailError('')
      setCurrentEmailId(response.id || null)
      
      // Mostrar diálogo después de un momento
      setTimeout(() => {
        setShowDialog(true)
      }, 1000)
      
      // Limpiar el formulario después de mostrar el diálogo
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 1500)

    } catch (error: unknown) {
      // Manejo de errores específicos del backend
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('400')) {
        setEmailError('Este email ya está registrado')
      } else if (errorMessage.includes('422')) {
        setEmailError('Email inválido')
      } else {
        setEmailError('Error al registrar. Inténtalo de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDialogSubmit = async (userType: string, expectedPrice: string) => {
    if (!currentEmailId) return

    const updatePayload = {
      user_type: userType,
      expected_price: expectedPrice
    }

    console.log('📤 Enviando datos de encuesta al backend:', updatePayload)
    console.log('📬 ID del usuario:', currentEmailId)
    console.log('🔗 URL de actualización:', API_ENDPOINTS.updateUser(currentEmailId))

    try {
      const response = await apiRequest(API_ENDPOINTS.updateUser(currentEmailId), {
        method: 'PUT',
        body: JSON.stringify(updatePayload)
      })

      console.log('📥 Respuesta de actualización:', response)

      setShowDialog(false)
      setCurrentEmailId(null)
    } catch (error) {
      console.error('❌ Error updating user info:', error)
      // Por ahora solo cerramos el diálogo aunque falle
      setShowDialog(false)
      setCurrentEmailId(null)
    }
  }

  const handleDialogSkip = () => {
    setShowDialog(false)
    setCurrentEmailId(null)
  }


  return (
    <section ref={sectionRef} id="wishlist" className="py-10 sm:py-16 md:py-24 relative overflow-hidden opacity-0 scroll-mt-16 md:scroll-mt-24">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 opacity-30"
           style={{
             background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
           }}></div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
             style={{
               background: 'rgba(255, 255, 255, 0.1)',
               border: '1px solid rgba(255, 255, 255, 0.2)'
             }}>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
                style={{ color: 'rgb(var(--color-white))' }}>
            Acceso anticipado
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 px-0 sm:px-0"
            style={{ color: 'rgb(var(--color-white))' }}>
          Sé de los primeros
          <br />
          <span style={{
            background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>en experimentar Nessie</span>
        </h2>

        {/* Description */}
        <p className="text-[13px] sm:text-base md:text-lg lg:text-xl mb-5 sm:mb-8 md:mb-12 max-w-[280px] sm:max-w-md md:max-w-2xl mx-auto leading-relaxed px-0 sm:px-0"
           style={{ color: 'rgb(var(--color-gray-400))' }}>
          Únete a la lista de espera y obtén acceso prioritario cuando lancemos.
          Sin spam, solo actualizaciones importantes.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-3 sm:mb-6 md:mb-8 px-0 sm:px-0">
          {emailError && (
            <div className="mb-3 p-3 rounded-xl text-center text-sm text-red-600 bg-red-50 border border-red-200">
              {emailError}
            </div>
          )}
          <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-2 rounded-2xl sm:rounded-full transition-all duration-300"
               style={{
                 background: 'rgb(var(--color-white))',
                 border: isFocused ? '2px solid rgb(var(--color-black))' : '2px solid rgb(var(--color-gray-400))',
                 boxShadow: isFocused ? '0 0 0 4px rgba(0, 0, 0, 0.05)' : 'none'
               }}>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ingresa tu email"
              className="flex-1 px-3 sm:px-4 md:px-6 py-2.5 sm:py-2 bg-transparent text-[16px] sm:text-[15px] md:text-base outline-none rounded-xl sm:rounded-none"
              style={{
                color: 'rgb(var(--color-black))'
              }}
              inputMode="email"
              autoComplete="email"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto mt-1.5 sm:mt-0 px-5 md:px-8 py-2.5 sm:py-2.5 md:py-3 rounded-xl sm:rounded-full font-semibold text-[13px] md:text-base transition-all hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: isSubscribed ? 'rgb(var(--color-emerald-500))' : 'rgb(var(--color-black))',
                color: 'rgb(var(--color-white))',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Enviando...
                </span>
              ) : isSubscribed ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5 13l4 4L19 7" />
                  </svg>
                  Revisa tu correo
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Unirse
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </form>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}
                     className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white"
                     style={{ 
                       background: 'rgb(var(--color-gray-400))'
                     }}></div>
              ))}
            </div>
            <span className="text-[11px] sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
              <span className="font-semibold" style={{ color: 'rgb(var(--color-white))' }}>
                {confirmedCount.toLocaleString()}
              </span> personas esperando
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: 'rgb(var(--color-gray-400))' }}
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[11px] sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
              No compartimos tu email
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: 'rgb(var(--color-gray-400))' }}
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[11px] sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
              Acceso prioritario garantizado
            </span>
          </div>
        </div>
      </div>

      {/* Diálogo de información adicional */}
      <UserInfoDialog
        isOpen={showDialog}
        onSubmit={handleDialogSubmit}
        onSkip={handleDialogSkip}
      />
    </section>
  )
}

export default Wishlist