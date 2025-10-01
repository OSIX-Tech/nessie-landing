import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { API_ENDPOINTS, apiRequest } from '../lib/api'

function Confirm() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get('token')
      
      if (!token) {
        // Si no hay token, redirigir a error
        navigate('/error?message=Token de confirmación no válido', { replace: true })
        return
      }

      try {
        // Llamar al backend para confirmar el email
        const confirmUrl = `${API_ENDPOINTS.confirm}?token=${token}`
        console.log('🔍 Llamando a:', confirmUrl)

        const response = await apiRequest(confirmUrl)
        console.log('✅ Respuesta exitosa:', response)

        // Éxito - redirigir a página de confirmación exitosa
        navigate('/confirmado?message=Tu email ha sido confirmado exitosamente', { replace: true })

      } catch (error: unknown) {
        // Error - redirigir a página de error con mensaje específico
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error('❌ Error en confirmación:', error)
        console.error('❌ Error message:', errorMessage)

        let message = 'Ha ocurrido un error al confirmar tu email'

        if (errorMessage.includes('400')) {
          message = 'Token de confirmación inválido'
        } else if (errorMessage.includes('410')) {
          message = 'El enlace de confirmación ha expirado'
        } else if (errorMessage.includes('404')) {
          message = 'Token de confirmación no encontrado'
        } else if (errorMessage.includes('500')) {
          message = 'Error interno del servidor'
        }

        navigate(`/error?message=${encodeURIComponent(message)}`, { replace: true })
      }
    }

    confirmEmail()
  }, [searchParams, navigate])

  // Mostrar loading mientras se procesa la confirmación
  return (
    <main className="min-h-dvh flex items-center justify-center"
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0'
          }}>
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
             style={{
               background: 'rgba(255, 255, 255, 0.1)',
               border: '1px solid rgba(255, 255, 255, 0.2)'
             }}>
          <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"
               style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
          Confirmando tu email...
        </h1>
        
        <p className="text-base max-w-md mx-auto leading-relaxed"
           style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          Por favor espera mientras verificamos tu dirección de correo electrónico.
        </p>
      </div>
    </main>
  )
}

export default Confirm