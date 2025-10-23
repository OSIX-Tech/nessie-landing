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

  // Track active section based on scroll position
  const [activeId, setActiveId] = useState<string>('')
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const element = document.getElementById(item.id)
        if (!element) return null
        const rect = element.getBoundingClientRect()
        return {
          id: item.id,
          top: rect.top,
          bottom: rect.bottom,
          height: rect.height
        }
      }).filter((s): s is NonNullable<typeof s> => s !== null)

      if (sections.length === 0) return

      // Find the section that is most visible in the viewport
      const viewportCenter = window.innerHeight / 2
      let closestSection = sections[0]
      let closestDistance = Math.abs(sections[0].top - viewportCenter)

      sections.forEach(section => {
        const distance = Math.abs(section.top - viewportCenter)
        if (distance < closestDistance && section.top < viewportCenter && section.bottom > 0) {
          closestDistance = distance
          closestSection = section
        }
      })

      setActiveId(closestSection.id)
    }

    handleScroll() // Initial call
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 safe-top ${
      scrolled ? 'py-3 px-6 md:px-12' : 'py-4 px-4 md:px-12'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className={`relative flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl pl-4 pr-1' : ''
        }`}
        style={{
          background: scrolled
            ? 'rgba(0, 0, 0, 0.5)'
            : 'transparent',
          borderRadius: scrolled ? '9999px' : '0',
          paddingTop: scrolled ? '8px' : '0',
          paddingBottom: scrolled ? '8px' : '0',
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