import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// New landing sections from v0.6
import ProductSection from './components/ProductSection'
import UseCasesSection from './components/UseCasesSection'
import MetricsSection from './components/MetricsSection'

// Original components from v0.5
const Features = lazy(() => import('./components/Features'))
const Pricing = lazy(() => import('./components/Pricing'))
const Wishlist = lazy(() => import('./components/Wishlist'))

function App() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      
      {/* New sections from v0.6 */}
      <ProductSection />
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <Features />
      </Suspense>
      
      <UseCasesSection />
      <MetricsSection />
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <Pricing />
        <Wishlist />
      </Suspense>
      <Footer />
    </main>
  )
}

export default App