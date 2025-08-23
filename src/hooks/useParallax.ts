import { useEffect, useRef, useState } from 'react'

interface UseParallaxOptions {
  speed?: number
  offset?: number
}

export function useParallax({ speed = 0.5, offset = 0 }: UseParallaxOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const element = elementRef.current
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate if element is in viewport
      const elementTop = rect.top
      const elementBottom = rect.bottom
      
      if (elementBottom >= 0 && elementTop <= windowHeight) {
        // Element is in viewport
        const scrolled = window.scrollY
        const elementOffset = element.offsetTop
        const parallax = (scrolled - elementOffset + offset) * speed
        
        setTransform(parallax)
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed, offset])

  return { ref: elementRef, transform }
}