import React from 'react'

const testimonials = [
  {
    name: 'Laura Mart\u00ednez',
    role: 'CTO en TechCorp',
    company: 'TechCorp Solutions',
    content: 'Nessie redujo nuestro tiempo de b\u00fasqueda en un 90%. Es como tener un experto disponible 24/7.',
    avatar: 'LM',
    rating: 5
  },
  {
    name: 'Carlos Rodr\u00edguez',
    role: 'Director de Operaciones',
    company: 'Innovation Labs',
    content: 'La mejor inversi\u00f3n del a\u00f1o. ROI demostrado en solo 2 meses. Imprescindible para equipos grandes.',
    avatar: 'CR',
    rating: 5
  },
  {
    name: 'Ana Garc\u00eda',
    role: 'Head of Knowledge',
    company: 'Global Consulting',
    content: 'Integraci\u00f3n perfecta con nuestro stack. El soporte es excepcional y las actualizaciones constantes.',
    avatar: 'AG',
    rating: 5
  }
]

function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Empresas que conf\u00edan en Nessie
          </h2>
          <p className="text-xl text-gray-400">
            M\u00e1s de 500 empresas optimizan su conocimiento con nosotros
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/20 border border-gray-800 hover:border-purple-500/50 transition-all"
            >
              {/* Rating stars */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Logo cloud */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 mb-8">Confiado por equipos l\u00edderes en:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-2xl font-bold text-gray-400">Microsoft</div>
            <div className="text-2xl font-bold text-gray-400">Google</div>
            <div className="text-2xl font-bold text-gray-400">Amazon</div>
            <div className="text-2xl font-bold text-gray-400">Meta</div>
            <div className="text-2xl font-bold text-gray-400">Apple</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials