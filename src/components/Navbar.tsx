import { useState, useEffect } from 'react'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? 'py-4' : 'py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(0, 0, 0, 0.5)'
            : 'transparent',
          borderRadius: scrolled ? '9999px' : '0',
          padding: scrolled ? '12px 24px' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none'
        }}>

          {/* Logo - always visible */}
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="Nessie"
              className="w-9 h-9 transition-all duration-500"
              style={{
                filter: scrolled ? 'brightness(1)' : 'brightness(1.2)'
              }}
            />
            <span className={`font-semibold text-lg transition-all duration-500 ${
              scrolled ? 'hidden md:block' : 'block'
            }`} style={{ color: 'rgb(255, 255, 255)' }}>
              Nessie
            </span>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            <a href="#product"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="text-sm font-medium transition-colors hover:text-white"
               style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Producto
            </a>
            <a href="#features"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="text-sm font-medium transition-colors hover:text-white"
               style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Características
            </a>
            <a href="#use-cases"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('use-cases')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="text-sm font-medium transition-colors hover:text-white"
               style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Casos de uso
            </a>
          </div>

          {/* Right side - CTA */}
          <div className="flex items-center">
            {/* CTA Button */}
            <a href="#wishlist"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
               style={{
                 background: scrolled
                   ? 'rgb(255, 255, 255)'
                   : 'rgba(255, 255, 255, 0.1)',
                 color: scrolled
                   ? 'rgb(0, 0, 0)'
                   : 'rgb(255, 255, 255)',
                 backdropFilter: 'blur(10px)',
                 border: scrolled
                   ? 'none'
                   : '1px solid rgba(255, 255, 255, 0.2)',
                 boxShadow: scrolled
                   ? '0 4px 12px rgba(255, 255, 255, 0.1)'
                   : 'none'
               }}>
              Acceso Anticipado
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar