import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Conecta tus fuentes',
    description: 'Integra Google Drive, Confluence, SharePoint y m\u00e1s en minutos'
  },
  {
    number: '02',
    title: 'Nessie indexa todo',
    description: 'Procesamiento autom\u00e1tico y organizaci\u00f3n inteligente de contenido'
  },
  {
    number: '03',
    title: 'Pregunta lo que necesites',
    description: 'Chat natural con respuestas precisas y fuentes verificadas'
  }
]

function HowItWorks() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            C\u00f3mo funciona
          </h2>
          <p className="text-xl text-gray-400">
            Configuraci\u00f3n en minutos, valor desde el primer d\u00eda
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-600/50 to-purple-600/50"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks