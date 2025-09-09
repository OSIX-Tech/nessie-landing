import { useState, useEffect } from 'react'

function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
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
          ? 'rgba(0, 0, 0, 0.85)'
          : 'transparent',
        borderColor: isScrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        boxShadow: isScrolled ? '0 1px 0 rgba(255, 255, 255, 0.05), 0 10px 40px rgba(0, 0, 0, 0.3)' : 'none',
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none'
      }}>
        <div className="w-full px-6 md:px-12">
          <div className="flex justify-between items-center lg:justify-center">
            {/* Logo for mobile */}
            <div className="lg:hidden">
              <div className="h-8 w-auto flex items-center">
                <span className="text-xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                  Nessie
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { label: 'Inicio', href: '#' },
                { label: 'Características', href: '#features' },
                { label: 'Precios', href: '#pricing' },
                { label: 'Lista de espera', href: '#wishlist' }
              ].map((item, i) => (
                <a key={i}
                   href={item.href}
                   onClick={(e) => {
                     e.preventDefault()
                     const target = item.href === '#' ? 'top' : item.href.slice(1)
                     if (target === 'top') {
                       window.scrollTo({ top: 0, behavior: 'smooth' })
                     } else {
                       document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
                     }
                   }}
                   className="text-sm font-medium transition-all duration-300 hover:opacity-70 relative group"
                   style={{ 
                     color: 'rgb(var(--color-gray-300))',
                     letterSpacing: '-0.01em'
                   }}>
                  {item.label}
                  {/* Premium hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
                        style={{ background: 'rgb(var(--color-white))' }}></span>
                </a>
              ))}
              
              {/* Premium Desktop CTA Button */}
              <a href="#wishlist"
                 onClick={(e) => {
                   e.preventDefault()
                   document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                 }}
                 className="ml-4 px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                 style={{
                   background: 'rgb(var(--color-white))',
                   color: 'rgb(var(--color-black))',
                   boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.08)'
                 }}>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                     style={{
                       background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)'
                     }}></div>
                <span className="relative">Probar gratis</span>
              </a>
            </nav>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{ 
                background: isMobileMenuOpen ? 'rgb(var(--color-white))' : 'rgba(255, 255, 255, 0.1)',
                color: isMobileMenuOpen ? 'rgb(var(--color-black))' : 'rgb(var(--color-white))'
              }}>
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 w-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''
                }`} style={{ background: 'currentColor' }}></span>
                <span className={`block h-0.5 w-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
                }`} style={{ background: 'currentColor' }}></span>
                <span className={`block h-0.5 w-full transition-all duration-300 origin-left ${
                  isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''
                }`} style={{ background: 'currentColor' }}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile menu overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu panel */}
        <div className={`absolute right-0 top-0 h-full w-full max-w-sm transition-transform duration-500 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="flex flex-col h-full pt-20 px-8 pb-8">
            {/* Menu items */}
            <nav className="flex-1">
              <div className="space-y-1">
                {[
                  { label: 'Inicio', href: '#' },
                  { label: 'Características', href: '#features' },
                  { label: 'Precios', href: '#pricing' },
                  { label: 'Lista de espera', href: '#wishlist' }
                ].map((item, i) => (
                  <a key={i}
                     href={item.href}
                     onClick={(e) => {
                       e.preventDefault()
                       setIsMobileMenuOpen(false)
                       const target = item.href === '#' ? 'top' : item.href.slice(1)
                       if (target === 'top') {
                         window.scrollTo({ top: 0, behavior: 'smooth' })
                       } else {
                         document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
                       }
                     }}
                     className="block py-4 text-2xl font-medium transition-all duration-300 hover:translate-x-2"
                     style={{ 
                       color: 'rgb(var(--color-white))'
                     }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
            
            {/* Mobile CTA */}
            <div className="mt-auto space-y-4">
              <a href="#"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block w-full text-center px-8 py-4 text-base font-medium rounded-2xl transition-all duration-300"
                 style={{
                   background: 'rgb(var(--color-white))',
                   color: 'rgb(var(--color-black))'
                 }}>
                Empezar gratis →
              </a>
              
              <a href="#"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block w-full text-center px-8 py-4 text-base font-medium rounded-2xl transition-all duration-300"
                 style={{
                   background: 'rgba(255, 255, 255, 0.1)',
                   color: 'rgb(var(--color-white))'
                 }}>
                Ver demo
              </a>
            </div>
            
            {/* Social links or footer info */}
            <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <p className="text-xs text-center" style={{ color: 'rgb(var(--color-gray-400))' }}>
                © 2024 Nessie. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar