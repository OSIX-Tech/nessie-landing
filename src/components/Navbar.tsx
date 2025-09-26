import { useEffect, useState } from 'react'
import { navItems } from './navItems'

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

  // Track active section via IntersectionObserver
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 safe-top ${
      scrolled ? 'py-3' : 'py-4'
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
          padding: scrolled ? '8px 16px' : '0',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          boxShadow: scrolled ? '0 10px 40px rgba(0, 0, 0, 0.3)' : 'none'
        }}>

          {/* Logo - always visible */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
              className="flex items-center gap-3"
              aria-label="Ir al inicio"
            >
              <img
                src="/NessieLogoSW.svg"
                alt="Nessie"
                className="h-8 w-auto object-contain transition-all duration-500"
                style={{
                  filter: scrolled ? 'brightness(1)' : 'brightness(1.2)'
                }}
              />
              <span className={`font-semibold text-lg transition-all duration-500 ${
                scrolled ? 'hidden md:block' : 'block'
              }`} style={{ color: 'rgb(255, 255, 255)' }}>
                Nessie
              </span>
            </a>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navItems.map((item) => (
              <a key={item.id}
                 href={item.href}
                 aria-current={activeId === item.id ? 'page' : undefined}
                 onClick={(e) => {
                   e.preventDefault()
                   document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                 }}
                 className="text-sm font-medium transition-colors hover:text-white"
                 style={{ color: activeId === item.id ? 'rgb(255,255,255)' : 'rgba(255, 255, 255, 0.7)' }}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Right side - CTA */}
          <div className="flex items-center">
            {/* CTA Button */}
            <a href="#wishlist"
               onClick={(e) => {
                 e.preventDefault()
                 document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
               }}
               className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
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