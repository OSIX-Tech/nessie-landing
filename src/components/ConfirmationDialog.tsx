import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ConfirmationDialogProps {
  isOpen: boolean
  type: 'success' | 'error'
  message?: string
  onClose: () => void
}

function ConfirmationDialog({ isOpen, type, message, onClose }: ConfirmationDialogProps) {
  const savedScrollY = useRef(0)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  // Resetear estado cuando se abre el diálogo
  useEffect(() => {
    if (isOpen) {
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
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const getContent = () => {
    if (type === 'success') {
      return {
        icon: (
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
        iconColor: 'rgb(34, 197, 94)', // green-500
        iconBg: 'rgba(34, 197, 94, 0.1)',
        title: '¡Email confirmado!',
        subtitle: 'Ya formas parte de la lista de espera de Nessie',
        description: message || 'Te notificaremos en cuanto Nessie esté disponible para acceso anticipado. Mientras tanto, síguenos en nuestras redes sociales para estar al día de todas las novedades.',
        buttonText: 'Continuar'
      }
    } else {
      return {
        icon: (
          <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        ),
        iconColor: 'rgb(239, 68, 68)', // red-500
        iconBg: 'rgba(239, 68, 68, 0.1)',
        title: 'Error de confirmación',
        subtitle: 'No pudimos confirmar tu email',
        description: message || 'Ha ocurrido un error al confirmar tu email. Por favor, inténtalo de nuevo o registrate nuevamente.',
        buttonText: 'Entendido'
      }
    }
  }

  const getActionButton = () => {
    const content = getContent()
    
    if (type === 'error' && (message?.includes('expirado') || message?.includes('inválido'))) {
      return (
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onClose()
              // Scroll al formulario de registro
              setTimeout(() => {
                document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: '#ffffff',
              color: '#0a0a0a'
            }}
          >
            Registrarse de nuevo
          </button>
        </div>
      )
    }

    return (
      <button
        onClick={onClose}
        className="px-8 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105"
        style={{
          background: '#ffffff',
          color: '#0a0a0a'
        }}
      >
        {content.buttonText}
      </button>
    )
  }

  if (!isOpen) return null

  const content = getContent()

  const dialogContent = (
    <div>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes contentIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .backdrop-entering {
          animation: modalFadeIn 0.2s ease-out forwards;
        }
        .dialog-entering { 
          animation: contentIn 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards; 
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="backdrop-entering fixed inset-0"
        onClick={onClose}
        style={{
          zIndex: 999999,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      />

      {/* Dialog Container - perfectly centered */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[92vh] md:max-h-[88vh] rounded-[32px] overflow-hidden"
        style={{
          zIndex: 1000000,
          width: 'min(calc(100vw - 16px), 42rem)',
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.02)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
      >
        <div className="dialog-entering p-8 md:p-12 text-center">
          {/* Close Button */}
          <button
            onClick={onClose}
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

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full mb-6"
               style={{
                 background: content.iconBg,
                 border: '1px solid rgba(255, 255, 255, 0.08)'
               }}>
            <div style={{ color: content.iconColor }}>
              {content.icon}
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold mb-3"
              style={{ color: '#ffffff', letterSpacing: '-0.02em' }}>
            {content.title}
          </h2>

          {/* Subtitle */}
          <h3 className="text-lg md:text-xl font-semibold mb-6"
              style={{
                background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(156, 163, 175) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
            {content.subtitle}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed"
             style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            {content.description}
          </p>

          {/* Action Button(s) */}
          <div className="flex justify-center">
            {getActionButton()}
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(dialogContent, document.body)
}

export default ConfirmationDialog