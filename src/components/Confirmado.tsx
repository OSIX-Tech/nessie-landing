import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Confirmado() {
  const sectionRef = useScrollAnimation()

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-10 sm:py-16 md:py-24 relative overflow-hidden opacity-0">
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 opacity-30"
           style={{
             background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
           }}></div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-6 md:px-12 text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mb-6 sm:mb-8"
             style={{
               background: 'rgba(34, 197, 94, 0.1)',
               border: '1px solid rgba(34, 197, 94, 0.2)'
             }}>
          <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" 
               style={{ color: 'rgb(34, 197, 94)' }}
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ color: 'rgb(var(--color-white))' }}>
          ¡Email confirmado!
        </h1>

        {/* Subheading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 sm:mb-8"
            style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
          Ya formas parte de la lista de espera
        </h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed"
           style={{ color: 'rgb(var(--color-gray-400))' }}>
          Te notificaremos en cuanto Nessie esté disponible para acceso anticipado.
          Mientras tanto, síguenos en redes sociales para estar al día de todas las novedades.
        </p>

        {/* Back to Home Button */}
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base transition-all hover:scale-105"
          style={{
            background: 'rgb(var(--color-white))',
            color: 'rgb(var(--color-black))',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al inicio
        </a>

        {/* Social Media Links */}
        <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4">
          <span className="text-sm" style={{ color: 'rgb(var(--color-gray-500))' }}>
            Síguenos en:
          </span>
          <div className="flex items-center gap-3">
            {/* Twitter */}
            <a href="#" 
               className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.1)',
                 color: 'rgb(var(--color-gray-400))'
               }}
               aria-label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            
            {/* LinkedIn */}
            <a href="#" 
               className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.1)',
                 color: 'rgb(var(--color-gray-400))'
               }}
               aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Confirmado