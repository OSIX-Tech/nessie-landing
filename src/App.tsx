import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

// New landing sections
import ProductSection from './components/ProductSection'
import FeaturesSection from './components/FeaturesSection'
import UseCasesSection from './components/UseCasesSection'
import MetricsSection from './components/MetricsSection'
import PricingCompact from './components/PricingCompact'

// Keep only wishlist from existing sections
const Wishlist = lazy(() => import('./components/Wishlist'))

function App() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      
      {/* New landing sections - loaded immediately after Hero */}
      <ProductSection />
      <FeaturesSection />
      <UseCasesSection />
      <MetricsSection />
      <PricingCompact />
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <Wishlist />
      </Suspense>
      <Footer />
    </main>
  )
}

export default App