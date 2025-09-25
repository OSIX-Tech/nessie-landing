import { lazy, Suspense } from 'react'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'
import Hero from './Hero'
import Footer from './Footer'
import ProductSection from './ProductSection'
import UseCasesSection from './UseCasesSection'

const Features = lazy(() => import('./Features'))
const Wishlist = lazy(() => import('./Wishlist'))

function Landing() {
  return (
    <main className="min-h-dvh relative"
          style={{
            backgroundColor: 'rgb(0, 0, 0)',
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0'
          }}>
      <div className="relative">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <MobileNavbar />
        <Hero />
        <ProductSection />
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-gray-400">Cargando...</div>
          </div>
        }>
          <Features />
        </Suspense>
        <UseCasesSection />
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-gray-400">Cargando...</div>
          </div>
        }>
          <Wishlist />
        </Suspense>
        <Footer />
      </div>
    </main>
  )
}

export default Landing