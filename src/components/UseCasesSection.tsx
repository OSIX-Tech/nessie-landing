import React, { useState, useEffect } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area } from 'recharts'
import MobileCarousel from './UseCasesSectionMobile'

type UseCase = { 
  id: string
  audience: string
  category: "Personal" | "Profesional" | "Empresarial"
  title: string
  description: string
  benefits: string[]
  timesSaved: string
  mainMetric: { value: string; label: string }
  visual: { icon: React.ReactNode; color: string }
  metrics: {
    chartType: 'bar' | 'line' | 'area' | 'radar'
    data: Record<string, number | string>[]
    primaryColor: string
    kpis: { label: string; value: string; change?: string }[]
  }
  cta?: { 
    label: string
    href: string
    analyticsId: string 
  }
}

const useCases: UseCase[] = [
  { 
    id: "estudiante", 
    audience: "Estudiantes universitarios",
    category: "Personal",
    title: "Estudio inteligente con IA", 
    description: "Transforma PDFs largos y complejos en resúmenes estructurados con citas verificables. Nessie analiza automáticamente tus documentos académicos, extrae conceptos clave y genera materiales de estudio personalizados. Ideal para estudiantes que manejan grandes volúmenes de literatura académica y necesitan optimizar su tiempo de preparación.", 
    benefits: ["Resúmenes automáticos con estructura jerárquica", "Citas trazables y referencias verificables", "Fichas de estudio personalizadas por tema", "Detección automática de conceptos clave", "Generación de preguntas de repaso", "Integración con gestores bibliográficos"],
    timesSaved: "60% menos tiempo",
    mainMetric: { value: "15min", label: "vs 2 horas antes" },
    visual: { 
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ), 
      color: "rgba(59, 130, 246, 0.1)" 
    },
    metrics: {
      chartType: 'bar',
      primaryColor: '#3B82F6',
      data: [
        { tarea: 'Investigación', antes: 6, despues: 1.5 },
        { tarea: 'Escritura', antes: 4, despues: 2.5 },
        { tarea: 'Revisión', antes: 3, despues: 1 },
        { tarea: 'Citas', antes: 2, despues: 0.5 },
      ],
      kpis: [
        { label: 'Tiempo ahorrado', value: '60%', change: '+12%' },
        { label: 'Papers procesados', value: '156', change: '+89%' },
        { label: 'Notas generadas', value: '340', change: '+156%' }
      ]
    },
    cta: { 
      label: "Probar demo estudiantil", 
      href: "/demo?preset=estudiante", 
      analyticsId: "usecase_demo_student_click" 
    } 
  },
  { 
    id: "researcher", 
    audience: "Investigadores", 
    category: "Profesional",
    title: "Investigación académica acelerada",
    description: "Analiza papers, tesis y documentos científicos para extraer insights y conexiones entre investigaciones. Nessie identifica patrones, tendencias y gaps en la literatura académica, facilitando el descubrimiento de oportunidades de investigación. Perfecto para investigadores que necesitan mantenerse al día con el estado del arte en su campo y encontrar nuevas líneas de investigación.", 
    benefits: ["Análisis sistemático de literatura científica", "Conexiones conceptuales entre estudios", "Referencias automáticas en formato APA/MLA", "Detección de gaps en investigación", "Mapeo de redes de citaciones", "Alertas de nuevas publicaciones relevantes", "Resumen ejecutivo de findings"],
    timesSaved: "70% menos tiempo",
    mainMetric: { value: "3x", label: "más papers analizados" },
    visual: { 
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ), 
      color: "rgba(16, 185, 129, 0.1)" 
    },
    metrics: {
      chartType: 'line',
      primaryColor: '#10B981',
      data: [
        { mes: 'Jun', papersAnalizados: 12, citasEncontradas: 85 },
        { mes: 'Jul', papersAnalizados: 18, citasEncontradas: 142 },
        { mes: 'Agos', papersAnalizados: 24, citasEncontradas: 189 },
        { mes: 'Sep', papersAnalizados: 31, citasEncontradas: 248 },
      ],
      kpis: [
        { label: 'Papers por sesión', value: '15-20', change: '+300%' },
        { label: 'Tiempo por paper', value: '-60%', change: '+20%' },
        { label: 'Precisión citas', value: '99.2%', change: '+35%' }
      ]
    },
    cta: { 
      label: "Ver caso de investigación", 
      href: "/demo?preset=researcher", 
      analyticsId: "usecase_demo_researcher_click" 
    } 
  },
  { 
    id: "general", 
    audience: "General", 
    category: "Personal",
    title: "Organización personal y profesionales independientes", 
    description: "Gestiona tu biblioteca personal de documentos, manuales, recetas, guías y cualquier información importante. Nessie te ayuda a organizar y encontrar rápidamente contenido de tus hobbies, proyectos personales, finanzas domésticas o actividad profesional independiente. Perfecto para freelancers, creativos y cualquier persona que necesite tener su información accesible.", 
    benefits: ["Organización automática de documentos personales", "Búsqueda instantánea en manuales y guías", "Gestión de recetas y proyectos creativos", "Seguimiento de finanzas personales", "Archivo de garantías y documentos importantes", "Base de conocimiento personal", "Sincronización entre dispositivos"],
    timesSaved: "70% menos tiempo buscando",
    mainMetric: { value: "500+", label: "documentos organizados" },
    visual: { 
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v0M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ), 
      color: "rgba(34, 197, 94, 0.1)" 
    },
    metrics: {
      chartType: 'area',
      primaryColor: '#22C55E',
      data: [
        { mes: 'Jun', documentosOrganizados: 45, documentosBuscados: 12 },
        { mes: 'Jul', documentosOrganizados: 128, documentosBuscados: 34 },
        { mes: 'Agos', documentosOrganizados: 285, documentosBuscados: 67 },
        { mes: 'Sep', documentosOrganizados: 520, documentosBuscados: 89 },
      ],
      kpis: [
        { label: 'Documentos indexados', value: '500+', change: '+300%' },
        { label: 'Tiempo búsqueda', value: '-70%', change: '+50%' },
        { label: 'Productividad personal', value: '+45%', change: '+20%' }
      ]
    },
    cta: { 
      label: "Explorar uso personal", 
      href: "/demo?preset=general", 
      analyticsId: "usecase_demo_general_click" 
    } 
  },
  { 
    id: "enterprise", 
    audience: "Empresas Fortune 500", 
    category: "Empresarial",
    title: "Knowledge Management corporativo", 
    description: "Centraliza y hace accesible todo el conocimiento organizacional con seguridad enterprise. Nessie transforma documentación dispersa en un sistema unificado de gestión del conocimiento, permitiendo a equipos encontrar información crítica en segundos. Incluye controles de acceso granulares, auditoría completa y integración nativa con herramientas corporativas existentes.", 
    benefits: ["RAG privado con encriptación end-to-end", "SSO y auditoría completa de accesos", "Integración con sistemas empresariales", "Control de versiones automatizado", "Workflows de aprobación de contenido", "Analytics de uso y engagement", "API para integraciones custom", "Backup y disaster recovery"],
    timesSaved: "52% reducción búsquedas",
    mainMetric: { value: "$2.3M", label: "ahorro anual promedio" },
    visual: { 
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ), 
      color: "rgba(245, 158, 11, 0.1)" 
    },
    metrics: {
      chartType: 'radar',
      primaryColor: '#F59E0B',
      data: [
        { metric: 'Productividad', antes: 60, despues: 85 },
        { metric: 'Satisfacción', antes: 70, despues: 92 },
        { metric: 'Velocidad', antes: 45, despues: 88 },
        { metric: 'Precisión', antes: 75, despues: 95 },
        { metric: 'Colaboración', antes: 55, despues: 80 },
      ],
      kpis: [
        { label: 'Ahorro por empleado/año', value: '€4,800', change: '+180%' },
        { label: 'Tiempo búsqueda', value: '-52%', change: '+25%' },
        { label: 'Adopción usuarios', value: '87%', change: '+67%' }
      ]
    },
    cta: { 
      label: "Consulta empresarial", 
      href: "/empresa#contacto", 
      analyticsId: "usecase_b2b_sales_click" 
    } 
  }
]

// Chart rendering functions
const renderChart = (metrics: UseCase['metrics']) => {
  const { chartType, data, primaryColor } = metrics
  
  switch (chartType) {
    case 'area':
      return (
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="mes" axisLine={false} tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            <Area type="monotone" dataKey="documentosBuscados" stackId="1" 
                  stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.1)" />
            <Area type="monotone" dataKey="documentosOrganizados" stackId="1" 
                  stroke={primaryColor} fill="url(#colorArea)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      )
    
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <XAxis dataKey="tarea" axisLine={false} tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.7)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '12px',
                fontSize: '12px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              animationDuration={200}
            />
            <Bar dataKey="antes" fill="rgba(255,255,255,0.2)" />
            <Bar dataKey="despues" fill={primaryColor} />
          </BarChart>
        </ResponsiveContainer>
      )
    
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <XAxis dataKey="mes" axisLine={false} tickLine={false} 
                   tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,0,0,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                fontSize: '12px'
              }} 
            />
            <Line type="monotone" dataKey="papersAnalizados" stroke={primaryColor} strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="citasEncontradas" stroke="rgba(255,255,255,0.5)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      )
    
    case 'radar':
      return (
        <ResponsiveContainer width="100%" height={240}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 9 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} />
            <Radar name="Antes" dataKey="antes" stroke="rgba(255,255,255,0.3)" fill="rgba(255,255,255,0.1)" strokeWidth={1} />
            <Radar name="Después" dataKey="despues" stroke={primaryColor} fill={`${primaryColor}20`} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      )
    
    default:
      return null
  }
}

function UseCasesSection() {
  const sectionRef = useScrollAnimation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hideInstruction, setHideInstruction] = useState(false)

  // Auto-hide instruction after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHideInstruction(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} id="use-cases" className="relative overflow-x-hidden min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 lg:px-24 opacity-0 md:flex md:flex-col md:justify-center scroll-mt-16 md:scroll-mt-24">
      <div className="md:max-w-[1600px] w-full mx-auto">
        {/* Section header */}
        <div className="text-center md:max-w-3xl mx-auto mb-3 sm:mb-6 md:mb-8">
          <span className="inline-block px-2.5 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold mb-3 sm:mb-6"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            CASOS DE USO
          </span>
          <h2 className="text-3xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 px-3 sm:px-0" style={{ color: 'rgb(var(--color-white))' }}>
            <span className="block md:inline">Transforma tu forma</span>
            <span className="md:hidden"> </span>
            <span className="block md:inline" style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>de trabajar con documentos</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl px-2 sm:px-0" style={{
            color: 'rgb(var(--color-gray-400))',
            lineHeight: 1.6
          }}>
            <span className="hidden md:inline">Descubre cómo profesionales de diferentes sectores están revolucionando
            su productividad con Nessie.</span>
            <span className="md:hidden">Desliza para explorar</span>
          </p>
        </div>

        {/* Mobile Carousel - Only visible on mobile */}
        <MobileCarousel useCases={useCases} />

        {/* Desktop Interactive Use Case Showcase - Hidden on mobile */}
        <div className="hidden md:block relative">
          {/* Section instruction - auto-hide after 5s */}
          <div className={`text-center mb-4 sm:mb-6 transition-all duration-700 ${hideInstruction ? 'opacity-0 h-0 mb-0' : 'opacity-100'}`}>
            <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgb(var(--color-gray-500))' }}>
              ← Haz clic en un perfil para explorar su caso de uso →
            </p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/30 animate-bounce"></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="inline-flex p-2 gap-3 rounded-2xl sm:rounded-3xl overflow-x-auto max-w-full"
                 style={{
                   background: 'rgba(10, 10, 10, 0.9)',
                   border: '1px solid rgba(255, 255, 255, 0.15)',
                   backdropFilter: 'blur(10px)',
                   boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                 }}>
              {useCases.map((useCase, index) => (
                <button
                  key={useCase.id}
                  onClick={() => setActiveIndex(index)}
                  className={`use-case-tab ${activeIndex === index ? 'active' : ''}`}
                >
                  {/* Glow effect for active */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none"
                         style={{ mixBlendMode: 'overlay' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                    </div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 ${
                    activeIndex === index ? 'scale-110 rotate-12' : 'group-hover:scale-110'
                  }`}
                       style={{
                         background: activeIndex === index 
                           ? 'rgba(255, 255, 255, 0.15)' 
                           : 'rgba(255, 255, 255, 0.08)',
                         border: '1px solid rgba(255, 255, 255, 0.2)',
                         transform: 'translateZ(20px)'
                       }}>
                    <div className={`transition-colors duration-300 ${
                      activeIndex === index ? 'text-white' : 'text-white/70'
                    }`}>
                      {useCase.visual.icon && React.isValidElement(useCase.visual.icon) ? React.cloneElement(useCase.visual.icon as React.ReactElement<{className?: string; strokeWidth?: number}>, {
                        className: "w-4 h-4 sm:w-5 sm:h-5",
                        strokeWidth: activeIndex === index ? 2 : 1.5
                      }) : useCase.visual.icon}
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className={`text-[10px] sm:text-sm font-bold mb-1.5 sm:mb-2 transition-colors duration-300 ${
                    activeIndex === index ? 'text-white' : 'text-white/80'
                  }`} style={{ transform: 'translateZ(15px)' }}>
                    {useCase.audience.split(' ')[0]}
                  </div>
                  
                  {/* Category badge */}
                  <div className={`absolute bottom-1.5 sm:bottom-2 left-1/2 transform -translate-x-1/2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-xs font-normal transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-white/5 text-white/60 border border-white/10' 
                      : 'bg-white/3 text-white/40 border border-white/5'
                  }`} style={{ transform: 'translateZ(10px)' }}>
                    {useCase.category}
                  </div>

                  {/* Animated background pattern for active */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 opacity-10 transition-opacity duration-700">
                      <div className="absolute inset-0 rounded-2xl" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(255, 255, 255, 0.03) 12px, rgba(255, 255, 255, 0.03) 24px)`,
                        animation: 'slidePattern 20s linear infinite'
                      }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Use Case Display - Full Viewport */}
          <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] overflow-hidden flex-1">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / useCases.length)}%)`,
                width: `${useCases.length * 100}%`,
                willChange: 'transform'
              }}
            >
              {useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="flex-shrink-0 px-2 sm:px-4 md:px-6"
                  style={{ width: `${100 / useCases.length}%` }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12 items-center h-full">
                    {/* Content Side - 3 columns */}
                  <div className="lg:col-span-3 space-y-6 md:space-y-8 flex flex-col justify-center">
                    {/* Category Badge & Time Saved */}
                    <div className="flex items-center gap-4 sm:-ml-2">
                      <span 
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background: useCase.visual.color,
                          color: 'rgb(var(--color-white))',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {useCase.category}
                      </span>
                      <span className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-400))' }}>
                        {useCase.timesSaved}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4" style={{ color: 'rgb(var(--color-white))' }}>
                        {useCase.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg" style={{ color: 'rgb(var(--color-gray-400))', lineHeight: 1.6 }}>
                        {useCase.description}
                      </p>
                    </div>

                    {/* Benefits List - Compact on mobile */}
                    <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-3">
                      {useCase.benefits.slice(0, 4).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <span className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgb(var(--color-gray-400))' }}>
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    {useCase.cta && (
                      <a
                        href="#wishlist"
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        data-analytics-id={useCase.cta.analyticsId}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 hover:scale-105 cursor-pointer"
                        style={{
                          background: 'rgb(255, 255, 255)',
                          color: 'rgb(0, 0, 0)',
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {useCase.cta.label}
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1"
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* Visual Side - Hidden on mobile, shown on tablet+ */}
                  <div className="hidden sm:block lg:col-span-2 relative sm:flex items-center justify-center">
                    <div className="w-full max-w-lg space-y-4 sm:space-y-6 pt-2">
                      {/* Chart Section - 3D Card Style */}
                      <div className="group relative overflow-hidden rounded-3xl p-8 transition-all duration-300"
                           style={{
                             background: 'rgba(10, 10, 10, 0.95)',
                             border: '1px solid rgba(255, 255, 255, 0.15)',
                             backdropFilter: 'blur(10px)',
                             transformStyle: 'preserve-3d',
                             boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.transform = 'translateY(-4px)'
                             e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)'
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.transform = 'translateY(0)'
                             e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)'
                           }}>
                        
                        {/* Glow effect layer */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                             style={{ mixBlendMode: 'overlay' }}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10"></div>
                        </div>

                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                          <div className="absolute inset-0 rounded-3xl" style={{
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px)`,
                            animation: 'slidePattern 20s linear infinite'
                          }} />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                                 style={{
                                   background: 'rgba(255, 255, 255, 0.1)',
                                   border: '1px solid rgba(255, 255, 255, 0.2)',
                                   transform: 'translateZ(20px)'
                                 }}>
                              <div className="text-white transition-transform duration-500">
                                {useCase.visual.icon && React.isValidElement(useCase.visual.icon) ? React.cloneElement(useCase.visual.icon as React.ReactElement<{className?: string; strokeWidth?: number}>, { className: "w-6 h-6" }) : useCase.visual.icon}
                              </div>
                            </div>
                            <div>
                              <div className="text-lg font-bold transition-colors duration-500" 
                                   style={{ 
                                     color: 'rgb(var(--color-white))',
                                     transform: 'translateZ(15px)'
                                   }}>
                                Métricas de impacto
                              </div>
                              <div className="text-base transition-colors duration-500" 
                                   style={{ 
                                     color: 'rgb(var(--color-gray-400))',
                                     transform: 'translateZ(10px)'
                                   }}>
                                {useCase.mainMetric.value} {useCase.mainMetric.label}
                              </div>
                            </div>
                          </div>
                        
                          {/* Chart */}
                          <div className="mb-8" style={{ transform: 'translateZ(10px)' }}>
                            {renderChart(useCase.metrics)}
                          </div>
                          
                          {/* KPIs Grid */}
                          <div className="grid grid-cols-3 gap-4 mb-4" style={{ transform: 'translateZ(5px)' }}>
                            {useCase.metrics.kpis.map((kpi, idx) => (
                              <div key={idx} className="text-center p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                                   style={{
                                     background: 'rgba(15, 15, 15, 0.9)',
                                     border: '1px solid rgba(255, 255, 255, 0.12)',
                                     backdropFilter: 'blur(5px)',
                                     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                                   }}>
                                <div className="text-xl font-bold mb-2 transition-colors duration-500" 
                                     style={{ 
                                       color: 'rgb(var(--color-white))',
                                       transform: 'translateZ(10px)'
                                     }}>
                                  {kpi.value}
                                </div>
                                <div className="text-sm mb-2 transition-colors duration-500" 
                                     style={{ 
                                       color: 'rgb(var(--color-gray-400))',
                                       transform: 'translateZ(5px)'
                                     }}>
                                  {kpi.label}
                                </div>
                                {kpi.change && (
                                  <div className="text-sm font-medium transition-colors duration-500" 
                                       style={{ 
                                         color: useCase.metrics.primaryColor,
                                         transform: 'translateZ(5px)'
                                       }}>
                                    {kpi.change}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {/* Disclaimer */}
                          <div className="text-center mt-4">
                            <p className="text-xs" style={{ 
                              color: 'rgba(255, 255, 255, 0.4)',
                              fontStyle: 'italic'
                            }}>
                              *Datos estimados
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCasesSection