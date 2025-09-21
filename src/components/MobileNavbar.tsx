import React, { useEffect, useState } from 'react'
import { navItems } from './navItems'

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

  // IO para resaltar sección activa
  const [activeId, setActiveId] = useState<string>('')
  useEffect(() => {
    const sections = navItems.map(n => n.id)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          setActiveId(entry.target.id)
        }
      })
    }, { threshold: [0.5] })

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Focus trap when menu is open
  useEffect(() => {
    if (!isOpen) return
    const focusable = Array.from(document.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen])

  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-top ${className}`}
        aria-label="Navegación principal móvil"
        style={{
          background: 'transparent'
        }}
      >
        <div className="px-3 py-3">
          <div
            className="relative flex items-center justify-between transition-all duration-300"
            style={{
              background: (isScrolled || isOpen) ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '9999px',
              boxShadow: (isScrolled || isOpen) ? '0 10px 30px rgba(0,0,0,0.35)' : '0 6px 18px rgba(0,0,0,0.2)',
              padding: (isScrolled || isOpen) ? '10px 12px' : '8px 12px',
              backdropFilter: (isScrolled || isOpen) ? 'blur(10px)' : 'none'
            }}
          >
            {/* Logo + brand clickable to hero */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
              className="flex items-center gap-2 pl-1 pr-2"
              aria-label="Ir al inicio"
            >
              <img
                src="/favicon.png"
                alt="Nessie"
                className="w-8 h-8"
                style={{ filter: isScrolled || isOpen ? 'brightness(1)' : 'brightness(1.1)' }}
              />
              <span className="text-white font-semibold text-sm">Nessie</span>
            </a>

            {/* Center nav (compact, visible desde sm+) */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={activeId === item.id ? 'page' : undefined}
                  aria-label={`Ir a ${item.label}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                  className="text-[12px] font-medium px-2 py-1 rounded-full transition-colors"
                  style={{
                    color: activeId === item.id ? 'rgb(0,0,0)' : 'rgba(255,255,255,0.85)',
                    background: activeId === item.id ? 'rgb(255,255,255)' : 'transparent',
                    border: activeId === item.id ? '1px solid rgba(255,255,255,0.9)' : '1px solid transparent'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* CTA, estilo similar a desktop pero compacto */}
              <a
                href="#wishlist"
                onClick={(e) => { e.preventDefault(); document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="hidden sm:inline-block px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-100"
                style={{
                  background: isScrolled || isOpen ? 'rgb(255,255,255)' : 'rgba(255,255,255,0.12)',
                  color: isScrolled || isOpen ? 'rgb(0,0,0)' : 'rgb(255,255,255)',
                  border: isScrolled || isOpen ? 'none' : '1px solid rgba(255,255,255,0.25)',
                  boxShadow: isScrolled || isOpen ? '0 6px 16px rgba(255,255,255,0.25)' : 'none'
                }}
              >
                Acceso Anticipado
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: 'transparent',
                  border: '1px solid transparent'
                }}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div className="w-6 h-6 relative" aria-hidden>
                  <span className="absolute left-0 w-full transition-all duration-300 ease-in-out" style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '2px', top: isOpen ? '50%' : '28%', transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'translateY(-50%) rotate(0deg)' }} />
                  <span className="absolute left-0 top-1/2 w-full transition-all duration-300 ease-in-out" style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '2px', transform: 'translateY(-50%)', opacity: isOpen ? 0 : 1 }} />
                  <span className="absolute left-0 w-full transition-all duration-300 ease-in-out" style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '2px', bottom: isOpen ? '50%' : '28%', transform: isOpen ? 'translateY(50%) rotate(-45deg)' : 'translateY(50%) rotate(0deg)' }} />
                </div>
              </button>
            </div>
          </div>
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
            id="mobile-menu"
            className="h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Links */}
            <div className="px-4 py-8 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
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
                  {activeId === item.id && (
                    <span className="ml-2 align-middle inline-block w-2 h-2 rounded-full bg-white/70" />
                  )}
                </a>
              ))}
            </div>

            {/* Divider */}
            <div
              className="mx-6 border-t"
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
            />

            {/* CTA Button */}
            <div className="px-4 py-8">
              <button
                className="w-full px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-gray-100 active:scale-95"
                style={{
                  background: 'white',
                  color: 'black',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease-out 0.4s forwards'
                }}
                onClick={() => {
                  setIsOpen(false)
                  document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Únete a la lista de espera
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