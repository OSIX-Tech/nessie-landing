import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Wishlist from './components/Wishlist'

function App() {
  return (
    <main className="min-h-dvh">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Wishlist />
    </main>
  )
}

export default App