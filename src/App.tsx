import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'

const Features = lazy(() => import('./components/Features'))
const Performance = lazy(() => import('./components/Performance'))
const Pricing = lazy(() => import('./components/Pricing'))
const Wishlist = lazy(() => import('./components/Wishlist'))

function App() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <Features />
        <Performance />
        <Pricing />
        <Wishlist />
      </Suspense>
      <Footer />
    </main>
  )
}

export default App