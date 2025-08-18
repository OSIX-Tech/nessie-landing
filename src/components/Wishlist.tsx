import { useState } from 'react'

function Wishlist() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section id="wishlist" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0"
           style={{
             background: 'linear-gradient(to bottom, rgb(var(--color-white)), rgb(var(--color-gray-50)))'
           }}>
        <div className="absolute inset-0 opacity-30"
             style={{
               background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.02) 0%, transparent 70%)'
             }}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
             style={{ 
               background: 'rgba(0, 0, 0, 0.03)',
               border: '1px solid rgba(0, 0, 0, 0.06)'
             }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: 'rgb(var(--color-emerald-500))' }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: 'rgb(var(--color-emerald-500))' }}></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider" 
                style={{ color: 'rgb(var(--color-gray-700))' }}>
            Acceso anticipado
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" 
            style={{ color: 'rgb(var(--color-black))' }}>
          Sé de los primeros
          <br />
          <span style={{
            background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-500)) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>en experimentar Nessie</span>
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed" 
           style={{ color: 'rgb(var(--color-gray-600))' }}>
          Únete a la lista de espera y obtén acceso prioritario cuando lancemos. 
          Sin spam, solo actualizaciones importantes.
        </p>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-6 md:mb-8">
          <div className="relative flex items-center p-2 rounded-full transition-all duration-300"
               style={{ 
                 background: 'rgb(var(--color-white))',
                 border: isFocused ? '2px solid rgb(var(--color-black))' : '2px solid rgb(var(--color-gray-200))',
                 boxShadow: isFocused ? '0 0 0 4px rgba(0, 0, 0, 0.05)' : 'none'
               }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ingresa tu email corporativo"
              className="flex-1 px-4 md:px-6 py-2 bg-transparent text-sm md:text-base outline-none"
              style={{
                color: 'rgb(var(--color-black))'
              }}
              required
            />
            <button
              type="submit"
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all hover:scale-105 whitespace-nowrap"
              style={{
                background: isSubscribed ? 'rgb(var(--color-emerald-500))' : 'rgb(var(--color-black))',
                color: 'rgb(var(--color-white))',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}>
              {isSubscribed ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M5 13l4 4L19 7" />
                  </svg>
                  ¡Listo!
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} 
                     className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white"
                     style={{ 
                       background: `rgb(var(--color-gray-${i * 2}00))`
                     }}></div>
              ))}
            </div>
            <span className="text-sm" style={{ color: 'rgb(var(--color-gray-600))' }}>
              <span className="font-semibold" style={{ color: 'rgb(var(--color-black))' }}>
                2,847
              </span> personas esperando
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" style={{ color: 'rgb(var(--color-gray-500))' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm" style={{ color: 'rgb(var(--color-gray-600))' }}>
              No compartimos tu email
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" style={{ color: 'rgb(var(--color-gray-500))' }} 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm" style={{ color: 'rgb(var(--color-gray-600))' }}>
              Acceso prioritario garantizado
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Wishlist