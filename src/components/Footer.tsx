import React from 'react'

function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ 
      background: 'linear-gradient(to bottom, rgb(var(--color-white)), rgb(var(--color-gray-50)))'
    }}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 opacity-30"
           style={{
             background: 'radial-gradient(circle at 20% 80%, rgba(0, 0, 0, 0.02) 0%, transparent 50%)'
           }}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Logo and brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                   style={{ 
                     background: 'linear-gradient(135deg, rgb(var(--color-black)) 0%, rgb(var(--color-gray-800)) 100%)',
                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
                   }}>
                <span className="text-white font-bold text-base">N</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight" style={{ color: 'rgb(var(--color-black))' }}>
                Nessie
              </h3>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-[280px]" style={{ color: 'rgb(var(--color-gray-600))' }}>
              Transformando la gestión del conocimiento empresarial con inteligencia artificial avanzada.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-2">
              {[
                { icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                { icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z' }
              ].map((social, i) => (
                <a key={i}
                   href="#"
                   className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                   style={{ 
                     background: 'rgba(0, 0, 0, 0.04)',
                     color: 'rgb(var(--color-gray-500))'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.background = 'rgb(var(--color-black))'
                     e.currentTarget.style.color = 'rgb(var(--color-white))'
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.background = 'rgba(0, 0, 0, 0.04)'
                     e.currentTarget.style.color = 'rgb(var(--color-gray-500))'
                   }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon}/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider mb-4" 
                style={{ color: 'rgb(var(--color-gray-900))' }}>
              Producto
            </h4>
            <ul className="space-y-3">
              {['Características', 'Integraciones', 'Precios', 'Changelog'].map((item, i) => (
                <li key={i}>
                  <a href="#" 
                     className="text-sm transition-all duration-200 inline-block"
                     style={{ color: 'rgb(var(--color-gray-600))' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-black))'
                       e.currentTarget.style.transform = 'translateX(2px)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-gray-600))'
                       e.currentTarget.style.transform = 'translateX(0)'
                     }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider mb-4" 
                style={{ color: 'rgb(var(--color-gray-900))' }}>
              Empresa
            </h4>
            <ul className="space-y-3">
              {['Sobre nosotros', 'Blog', 'Carreras', 'Contacto'].map((item, i) => (
                <li key={i}>
                  <a href="#" 
                     className="text-sm transition-all duration-200 inline-block"
                     style={{ color: 'rgb(var(--color-gray-600))' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-black))'
                       e.currentTarget.style.transform = 'translateX(2px)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-gray-600))'
                       e.currentTarget.style.transform = 'translateX(0)'
                     }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider mb-4" 
                style={{ color: 'rgb(var(--color-gray-900))' }}>
              Recursos
            </h4>
            <ul className="space-y-3">
              {['Documentación', 'API', 'Guías', 'Soporte'].map((item, i) => (
                <li key={i}>
                  <a href="#" 
                     className="text-sm transition-all duration-200 inline-block"
                     style={{ color: 'rgb(var(--color-gray-600))' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-black))'
                       e.currentTarget.style.transform = 'translateX(2px)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-gray-600))'
                       e.currentTarget.style.transform = 'translateX(0)'
                     }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-wider mb-4" 
                style={{ color: 'rgb(var(--color-gray-900))' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {['Privacidad', 'Términos', 'Cookies', 'Licencias'].map((item, i) => (
                <li key={i}>
                  <a href="#" 
                     className="text-sm transition-all duration-200 inline-block"
                     style={{ color: 'rgb(var(--color-gray-600))' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-black))'
                       e.currentTarget.style.transform = 'translateX(2px)'
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.color = 'rgb(var(--color-gray-600))'
                       e.currentTarget.style.transform = 'translateX(0)'
                     }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="py-6 border-t" style={{ borderColor: 'rgba(0, 0, 0, 0.06)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-xs" style={{ color: 'rgb(var(--color-gray-500))' }}>
                © 2024 Nessie, Inc. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4">
                <button className="text-xs transition-opacity hover:opacity-70"
                        style={{ color: 'rgb(var(--color-gray-500))' }}>
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Español
                  </span>
                </button>
              </div>
            </div>
            
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse"
                     style={{ background: 'rgb(var(--color-emerald-500))' }}></div>
                <span className="text-xs" style={{ color: 'rgb(var(--color-gray-500))' }}>
                  Todos los sistemas operativos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer