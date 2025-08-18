import { useState, useEffect } from 'react'

function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      
      // Show navbar only after scrolling past hero section
      setIsVisible(scrollY > heroHeight - 100)
      
      // Add background when scrolled
      setIsScrolled(scrollY > heroHeight + 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-700 ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0 pointer-events-none'
    } ${
      isScrolled
        ? 'py-3 backdrop-blur-xl border-b'
        : 'py-5 bg-transparent'
    }`}
    style={{
      background: isScrolled 
        ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.9))'
        : 'transparent',
      borderColor: isScrolled ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
      boxShadow: isScrolled ? '0 1px 20px rgba(0, 0, 0, 0.05)' : 'none'
    }}>
      <div className="w-full flex justify-center">
        {/* Centered Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Inicio', href: '#' },
            { label: 'Características', href: '#features' },
            { label: 'Precios', href: '#pricing' },
            { label: 'Lista de espera', href: '#wishlist' }
          ].map((item, i) => (
            <a key={i}
               href={item.href}
               className="text-sm font-medium transition-all duration-300 hover:opacity-60"
               style={{ 
                 color: 'rgb(var(--color-gray-700))'
               }}>
              {item.label}
            </a>
          ))}
          
          {/* CTA Button */}
          <a href="#"
             className="ml-4 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105"
             style={{
               background: 'rgb(var(--color-black))',
               color: 'rgb(var(--color-white))',
               boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)'
             }}>
            Probar gratis
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.04)',
                  color: 'rgb(var(--color-black))'
                }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Navbar