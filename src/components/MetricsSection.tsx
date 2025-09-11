import { useEffect, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts'

type Metrics = { 
  traction: { 
    waitlist: number
    demoQuestions: number
    exampleDocs: number 
  }
  performance: { 
    avgResponseSec: number
    perceivedAccuracyPct: number
    citedAnswersPct: number 
  }
  trust: { 
    demoSatisfaction: number
    demoReturnRatePct: number
    privacyIncidents: number 
  }
  lastUpdatedIso: string 
}

// ROI & Revenue Impact Data from Performance section
const roiData = [
  { month: 'M1', roi: -20, revenue: 95000, savings: 15000 },
  { month: 'M2', roi: 5, revenue: 125000, savings: 28000 },
  { month: 'M3', roi: 35, revenue: 180000, savings: 45000 },
  { month: 'M4', roi: 78, revenue: 245000, savings: 67000 },
  { month: 'M5', roi: 145, revenue: 340000, savings: 98000 },
  { month: 'M6', roi: 235, revenue: 485000, savings: 142000 }
]

// Enterprise Performance Radar
const radarData = [
  { metric: 'Velocidad', nessie: 95, industry: 45, max: 100 },
  { metric: 'Precisión', nessie: 98, industry: 62, max: 100 },
  { metric: 'Colaboración', nessie: 92, industry: 58, max: 100 },
  { metric: 'Compliance', nessie: 99, industry: 75, max: 100 },
  { metric: 'Seguridad', nessie: 97, industry: 70, max: 100 },
  { metric: 'Adopción', nessie: 94, industry: 40, max: 100 }
]


// Metrics data - combining previous metrics with ROI data
const metricsData: Metrics = {
  traction: {
    waitlist: 2847,
    demoQuestions: 45892,
    exampleDocs: 12456
  },
  performance: {
    avgResponseSec: 1.3,
    perceivedAccuracyPct: 94,
    citedAnswersPct: 89
  },
  trust: {
    demoSatisfaction: 4.8,
    demoReturnRatePct: 73,
    privacyIncidents: 0
  },
  lastUpdatedIso: "2024-12-01T10:30:00Z"
}

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl p-3 shadow-xl"
           style={{ 
             background: 'rgba(255, 255, 255, 0.98)',
             border: '1px solid rgba(0, 0, 0, 0.08)',
             backdropFilter: 'blur(10px)'
           }}>
        <p className="text-xs font-bold mb-1" style={{ color: 'rgb(0, 0, 0)' }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs flex items-center gap-2" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color || 'rgb(0, 0, 0)' }}></span>
            <span className="font-medium">{entry.name}:</span>
            <span className="font-bold" style={{ color: 'rgb(0, 0, 0)' }}>
              {entry.name === 'roi' ? `${entry.value}%` : 
               entry.name === 'revenue' || entry.name === 'savings' ? `$${(entry.value/1000).toFixed(0)}k` :
               entry.value}
            </span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

function MetricsSection() {
  const sectionRef = useScrollAnimation()
  const analyticsRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Intersection Observer for analytics tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-analytics-id', 'metrics_seen')
            // In a real app, you'd send analytics event here
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    
    if (analyticsRef.current) {
      observer.observe(analyticsRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const formatLastUpdated = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }
  
  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-24 opacity-0">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            VALOR EMPRESARIAL
          </span>
          <h2 className="heading-lg mb-6" style={{ color: 'rgb(var(--color-white))' }}>
            ROI demostrado
            <br />
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>desde el mes 2</span>
          </h2>
          <p className="text-xl mb-4" style={{ 
            color: 'rgb(var(--color-gray-400))',
            lineHeight: 1.6
          }}>
            Métricas verificadas de Fortune 500 que generan un retorno de inversión del 235% en solo 6 meses.
          </p>
          <p className="text-sm" style={{ color: 'rgb(var(--color-gray-500))' }}>
            Última actualización: {formatLastUpdated(metricsData.lastUpdatedIso)}
          </p>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {[
            { value: '+235%', label: 'ROI en 6 meses', trend: '↑', subtitle: 'retorno inversión' },
            { value: '$485K', label: 'Ingresos extra', trend: '↑', subtitle: 'generados/mes' },
            { value: '2100 hrs', label: 'Horas ahorradas', trend: '↑', subtitle: 'mensualmente' },
            { value: '$398K/año', label: 'Ahorro total', trend: '↑', subtitle: 'reducción costos' }
          ].map((kpi, index) => (
            <div key={index} 
                 className="relative overflow-hidden rounded-2xl p-6 md:p-8 group transition-all duration-500 hover:scale-[1.02]"
                 style={{ 
                   background: 'rgba(255, 255, 255, 0.05)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                 }}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-2xl md:text-4xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {kpi.value}
                  </div>
                  <span className={`text-lg md:text-xl ${kpi.trend === '↑' ? 'text-green-500' : 'text-gray-400'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'rgb(var(--color-gray-300))' }}>
                  {kpi.label}
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgb(var(--color-gray-500))' }}>
                  {kpi.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {/* ROI Growth Chart */}
          <div className="lg:col-span-2 rounded-2xl md:rounded-3xl p-6 md:p-8"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.03)',
                 backdropFilter: 'blur(20px)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
               }}>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                Crecimiento del ROI
              </h3>
              <p className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                Retorno de inversión y ahorro acumulado
              </p>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(255, 255, 255, 0.3)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="rgba(255, 255, 255, 0.1)" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.6)" fontSize={12} />
                <YAxis stroke="rgba(255, 255, 255, 0.6)" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="roi" fill="url(#roiGradient)" radius={[2, 2, 0, 0]} />
                <Line type="monotone" dataKey="revenue" stroke="rgba(255, 255, 255, 0.8)" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Radar Chart */}
          <div className="rounded-2xl p-6 md:p-8"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.03)',
                 backdropFilter: 'blur(20px)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
               }}>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                vs. Competencia
              </h3>
              <p className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                Comparación con industria
              </p>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid gridType="polygon" stroke="rgba(255, 255, 255, 0.1)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'rgba(255, 255, 255, 0.6)', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} tickCount={6} />
                <Radar name="Nessie" dataKey="nessie" stroke="rgba(255, 255, 255, 0.8)" fill="rgba(255, 255, 255, 0.2)" strokeWidth={2} />
                <Radar name="Industria" dataKey="industry" stroke="rgba(255, 255, 255, 0.4)" fill="rgba(255, 255, 255, 0.05)" strokeWidth={1} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Metrics grid */}
        <div ref={analyticsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Tracción */}
          <div className="p-6 md:p-8 rounded-3xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
               }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{
                     background: 'rgba(16, 185, 129, 0.1)',
                     color: 'rgb(16, 185, 129)'
                   }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'rgb(var(--color-white))' }}>
                Tracción
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {formatNumber(metricsData.traction.waitlist)}
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    en lista de espera
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {formatNumber(metricsData.traction.demoQuestions)}
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    preguntas en demo
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {formatNumber(metricsData.traction.exampleDocs)}
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    documentos analizados
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rendimiento */}
          <div className="p-6 md:p-8 rounded-3xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
               }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{
                     background: 'rgba(59, 130, 246, 0.1)',
                     color: 'rgb(59, 130, 246)'
                   }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'rgb(var(--color-white))' }}>
                Rendimiento
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.performance.avgResponseSec}s
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    tiempo promedio de respuesta
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.performance.perceivedAccuracyPct}%
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    precisión percibida
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.performance.citedAnswersPct}%
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    respuestas con citas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confianza */}
          <div className="p-6 md:p-8 rounded-3xl"
               style={{
                 background: 'rgba(255, 255, 255, 0.05)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
               }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{
                     background: 'rgba(168, 85, 247, 0.1)',
                     color: 'rgb(168, 85, 247)'
                   }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold" style={{ color: 'rgb(var(--color-white))' }}>
                Confianza
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.trust.demoSatisfaction}/5
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    satisfacción con demo
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.trust.demoReturnRatePct}%
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    usuarios regresan
                  </span>
                </div>
              </div>
              
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {metricsData.trust.privacyIncidents}
                  </span>
                  <span className="text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                    incidentes de privacidad
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MetricsSection