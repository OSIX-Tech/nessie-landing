import React, { useState, useEffect } from 'react'

interface MobileNavbarProps {
  className?: string
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { label: 'Producto', href: '#product' },
    { label: 'Características', href: '#features' },
    { label: 'Casos de uso', href: '#use-cases' },
    { label: 'Precios', href: '#pricing' }
  ]

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${className}`}
        style={{
          background: isScrolled || isOpen
            ? 'rgba(0, 0, 0, 0.95)'
            : 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: isScrolled || isOpen
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid transparent'
        }}
      >
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="/favicon.png"
              alt="Nessie"
              className="w-8 h-8"
              style={{
                filter: isScrolled || isOpen ? 'brightness(1)' : 'brightness(1.2)'
              }}
            />
            <span className="text-white font-semibold text-base">Nessie</span>
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{
              background: isOpen ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <div className="w-6 h-6 relative">
              {/* Top line */}
              <span
                className="absolute left-0 w-full transition-all duration-300 ease-in-out"
                style={{
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  top: isOpen ? '50%' : '25%',
                  transform: isOpen
                    ? 'translateY(-50%) rotate(45deg)'
                    : 'translateY(-50%) rotate(0deg)'
                }}
              />
              {/* Middle line */}
              <span
                className="absolute left-0 top-1/2 w-full transition-all duration-300 ease-in-out"
                style={{
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  transform: 'translateY(-50%)',
                  opacity: isOpen ? 0 : 1
                }}
              />
              {/* Bottom line */}
              <span
                className="absolute left-0 w-full transition-all duration-300 ease-in-out"
                style={{
                  height: '2px',
                  backgroundColor: 'white',
                  borderRadius: '1px',
                  bottom: isOpen ? '50%' : '25%',
                  transform: isOpen
                    ? 'translateY(50%) rotate(-45deg)'
                    : 'translateY(50%) rotate(0deg)'
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 transition-all duration-500"
          style={{
            paddingTop: '57px',
            background: 'rgba(0, 0, 0, 0.98)',
            backdropFilter: 'blur(20px)'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Links */}
            <div className="px-4 py-8 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className="block py-4 px-4 rounded-2xl transition-all duration-200 hover:bg-white/5 active:bg-white/10"
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  <span className="text-white text-lg font-medium">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div
              className="mx-6 border-t"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            />

            {/* CTA Buttons */}
            <div className="px-4 py-8 space-y-3">
              <button
                className="w-full px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10 active:scale-95"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease-out 0.4s forwards'
                }}
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </button>

              <button
                className="w-full px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100 active:scale-95"
                style={{
                  background: 'white',
                  color: 'black',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease-out 0.5s forwards'
                }}
                onClick={() => setIsOpen(false)}
              >
                Probar gratis
              </button>
            </div>

            {/* Footer Info */}
            <div className="px-4 pb-8">
              <p
                className="text-center text-xs"
                style={{
                  color: 'rgba(255, 255, 255, 0.4)',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease-out 0.6s forwards'
                }}
              >
                © 2024 Nessie AI. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="md:hidden h-[57px]" />

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}

export default MobileNavbar