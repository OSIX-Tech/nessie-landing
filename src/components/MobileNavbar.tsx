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

  // Meta de navegación para mejorar el diseño de los ítems (icono + subtítulo)
  const navMeta: Record<string, { subtitle: string; icon: React.ReactNode }> = {
    product: {
      subtitle: 'Visión general y demos',
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7l9-4 9 4-9 4-9-4z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 7v6l-9 4-9-4V7" />
        </svg>
      )
    },
    features: {
      subtitle: 'Lo que puedes hacer',
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      )
    },
    'use-cases': {
      subtitle: 'Ejemplos reales',
      icon: (
        <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h8M6 11h12M4 15h16M10 19h4" />
        </svg>
      )
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
        <div className="px-3 py-2.5">
          <div
            className="relative flex items-center justify-between transition-all duration-300"
            style={{
              background: (isScrolled || isOpen) ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.55)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '9999px',
              boxShadow: (isScrolled || isOpen) ? '0 10px 30px rgba(0,0,0,0.35)' : '0 6px 18px rgba(0,0,0,0.2)',
              padding: (isScrolled || isOpen) ? '8px 12px' : '6px 10px',
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
                src="/loguito.svg"
                alt="Nessie"
                className="h-12 w-auto object-contain"
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
          className="md:hidden fixed inset-0 z-40 transition-all duration-300"
          style={{
            paddingTop: '57px',
            background: 'rgba(0, 0, 0, 0.98)'
          }}
          onClick={() => setIsOpen(false)}
          aria-modal
          role="dialog"
        >
          <div
            className="h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Links */}
            <div className="px-3 pt-7 pb-3 space-y-1 overflow-y-auto flex-1 overscroll-contain">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(item.href)
                  }}
                  className={`group relative flex items-center justify-between rounded-2xl pl-4 pr-5 py-4 transition-all duration-200 ${activeId === item.id ? 'bg-white/10' : 'hover:bg-white/5 active:bg-white/10'}`}
                  style={{
                    opacity: 0,
                    animation: `fadeInUp 0.45s ease-out ${index * 0.04}s forwards`
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center border text-white/80"
                         style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}>
                      <span className="block">{navMeta[item.id]?.icon}</span>
                    </div>
                    <div className="leading-tight">
                      <div className="text-white text-lg font-semibold tracking-tight">{item.label}</div>
                      {navMeta[item.id]?.subtitle && (
                        <div className="text-xs leading-snug text-white/45">{navMeta[item.id].subtitle}</div>
                      )}
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white/70 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {activeId === item.id && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded bg-white/70" />
                  )}
                </a>
              ))}
              
            </div>

            {/* Bottom CTA + copyright */}
            <div className="pt-6" style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
              <div className="mx-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <div className="px-4 pt-6">
                <button
                  className="group relative w-full max-w-[520px] mx-auto px-7 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-white/60 overflow-hidden"
                  style={{ background: 'white', color: 'black', boxShadow: '0 10px 30px rgba(255,255,255,0.15), 0 6px 16px rgba(0,0,0,0.25)' }}
                  onClick={() => {
                    setIsOpen(false)
                    document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span className="relative z-10">Únete a la lista de espera</span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                       style={{
                         backgroundImage: `linear-gradient(105deg, transparent 40%, rgba(0,0,0,0.08) 50%, transparent 60%)`,
                         animation: 'shimmer-slide 1s ease-out'
                       }} />
                </button>
              </div>
              <div className="px-4 pb-3 mt-4">
                <p className="text-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  © 2025 Nessie AI. Todos los derechos reservados.
                </p>
              </div>
              <div className="px-4 pb-3 flex items-center justify-center gap-4 text-[11px] text-white/45">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70">Privacidad</a>
                <span className="opacity-30">•</span>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-white/70">Términos</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="md:hidden h-[50px]" />

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