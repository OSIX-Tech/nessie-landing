import React from 'react'

function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 md:p-16 text-center">
          {/* Pattern overlay */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
          }} />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Transforma tu documentaci\u00f3n hoy
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              \u00danete a m\u00e1s de 500 empresas que ya optimizan su conocimiento con Nessie
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                Empezar prueba gratuita
              </button>
              <button className="px-8 py-4 bg-white/20 backdrop-blur border border-white/30 rounded-lg font-semibold text-lg text-white hover:bg-white/30 transition-all">
                Agenda una demo
              </button>
            </div>
            
            <p className="mt-6 text-sm text-white/70">
              No requiere tarjeta de cr\u00e9dito • Setup en 5 minutos • Cancela cuando quieras
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA