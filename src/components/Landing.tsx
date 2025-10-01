import { lazy, Suspense, useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import MobileNavbar from './MobileNavbar'
import Hero from './Hero'
import Footer from './Footer'
import ProductSection from './ProductSection'
import UseCasesSection from './UseCasesSection'
import ConfirmationDialog from './ConfirmationDialog'

const Features = lazy(() => import('./Features'))
const Wishlist = lazy(() => import('./Wishlist'))

function Landing() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [confirmationType, setConfirmationType] = useState<'success' | 'error'>('success')
  const [confirmationMessage, setConfirmationMessage] = useState<string>('')

  // Manejar parámetros de URL para confirmación
  useEffect(() => {
    const currentPath = window.location.pathname
    const message = searchParams.get('message')

    if (currentPath === '/confirmado') {
      setConfirmationType('success')
      setConfirmationMessage(message || '')
      setShowConfirmationDialog(true)
    } else if (currentPath === '/error') {
      setConfirmationType('error')
      setConfirmationMessage(message || 'Ha ocurrido un error al confirmar tu email')
      setShowConfirmationDialog(true)
    }
  }, [searchParams])

  const handleCloseConfirmation = () => {
    setShowConfirmationDialog(false)
    // Limpiar URL y redirigir al home
    navigate('/', { replace: true })
  }

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

      {/* Diálogo de confirmación */}
      <ConfirmationDialog
        isOpen={showConfirmationDialog}
        type={confirmationType}
        message={confirmationMessage}
        onClose={handleCloseConfirmation}
      />
    </main>
  )
}

export default Landing