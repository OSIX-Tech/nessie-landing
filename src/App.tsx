import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Performance from './components/Performance'
import Pricing from './components/Pricing'
import Wishlist from './components/Wishlist'

function App() {
  return (
    <main className="min-h-dvh pb-20 lg:pb-0">
      <Navbar />
      <Hero />
      <Features />
      <Performance />
      <Pricing />
      <Wishlist />
    </main>
  )
}

export default App