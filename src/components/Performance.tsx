import { useEffect, useRef, useState } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Data for time series with smoother progression
const timeSeriesData = [
  { month: 'Ene', traditional: 52, nessie: 52 },
  { month: 'Feb', traditional: 51, nessie: 45 },
  { month: 'Mar', traditional: 53, nessie: 38 },
  { month: 'Abr', traditional: 52, nessie: 30 },
  { month: 'May', traditional: 54, nessie: 22 },
  { month: 'Jun', traditional: 55, nessie: 16 },
  { month: 'Jul', traditional: 54, nessie: 12 },
  { month: 'Ago', traditional: 56, nessie: 9 },
  { month: 'Sep', traditional: 54, nessie: 7 },
  { month: 'Oct', traditional: 52, nessie: 6 },
  { month: 'Nov', traditional: 55, nessie: 5 },
  { month: 'Dic', traditional: 53, nessie: 5 }
]

// Data for comparison bars with percentage improvements
const comparisonData = [
  { metric: 'Búsqueda', before: 45, after: 8, improvement: 82 },
  { metric: 'Documentación', before: 120, after: 15, improvement: 87 },
  { metric: 'Onboarding', before: 30, after: 7, improvement: 77 },
  { metric: 'Tickets', before: 72, after: 24, improvement: 67 },
  { metric: 'Errores', before: 23, after: 2, improvement: 91 }
]

// Data for radial chart
const satisfactionData = [
  { name: 'Satisfacción', value: 94, fill: 'rgb(0, 0, 0)' }
]

// Data for distribution
const usageData = [
  { name: 'Búsquedas', value: 45, fill: 'rgba(0, 0, 0, 0.9)' },
  { name: 'Análisis', value: 30, fill: 'rgba(0, 0, 0, 0.7)' },
  { name: 'Reportes', value: 15, fill: 'rgba(0, 0, 0, 0.5)' },
  { name: 'Otros', value: 10, fill: 'rgba(0, 0, 0, 0.3)' }
]

// Custom tooltip with enhanced styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-xl"
           style={{ 
             background: 'rgba(255, 255, 255, 0.98)',
             border: '1px solid rgba(0, 0, 0, 0.08)',
             backdropFilter: 'blur(10px)'
           }}>
        <p className="text-[10px] sm:text-xs font-bold mb-1" style={{ color: 'rgb(0, 0, 0)' }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-[10px] sm:text-xs flex items-center gap-1 sm:gap-2" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            <span className="w-2 h-2 rounded-full" style={{ background: entry.color || 'rgb(0, 0, 0)' }}></span>
            <span className="font-medium">{entry.name}:</span>
            <span className="font-bold" style={{ color: 'rgb(0, 0, 0)' }}>
              {entry.value}{entry.name.includes('min') || entry.dataKey === 'before' || entry.dataKey === 'after' ? ' min' : entry.dataKey === 'value' ? '%' : ''}
            </span>
          </p>
        ))}
      </div>
    )
  }
  return null
}

function Performance() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <section ref={sectionRef} id="performance" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24"
             style={{ background: 'linear-gradient(to bottom, rgb(255, 255, 255), rgb(250, 250, 250))' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.05)',
                  color: 'rgb(0, 0, 0)'
                }}>
            MÉTRICAS DE IMPACTO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: 'rgb(0, 0, 0)' }}>
            Transformación
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span className="gradient-text">medible y real</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg px-4 sm:px-0 text-gray-600">
            Datos en tiempo real de más de 500 empresas que ya experimentan 
            el poder de la IA aplicada a su gestión del conocimiento.
          </p>
        </div>

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
          {[
            { value: '87%', label: 'Reducción tiempo', trend: '↓', color: 'rgb(0, 0, 0)', subtitle: 'vs. método tradicional' },
            { value: '3.2x', label: 'Productividad', trend: '↑', color: 'rgb(0, 0, 0)', subtitle: 'incremento promedio' },
            { value: '94%', label: 'Satisfacción', trend: '↑', color: 'rgb(0, 0, 0)', subtitle: 'NPS score' },
            { value: '5min', label: 'Tiempo respuesta', trend: '↓', color: 'rgb(0, 0, 0)', subtitle: 'promedio actual' }
          ].map((kpi, index) => (
            <div key={index} 
                 className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group transition-all duration-500 hover:scale-[1.02]"
                 style={{ 
                   background: 'rgb(255, 255, 255)',
                   border: '1px solid rgba(0, 0, 0, 0.06)'
                 }}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: kpi.color }}>
                    {kpi.value}
                  </div>
                  <span className={`text-base sm:text-lg md:text-xl ${kpi.trend === '↑' ? 'text-green-500' : 'text-gray-400'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                  {kpi.label}
                </p>
                <p className="text-[10px] sm:text-xs mt-1 hidden sm:block" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
                  {kpi.subtitle}
                </p>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-700"
                   style={{ background: kpi.color }}></div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Time series chart - 2 columns */}
          <div className="lg:col-span-2 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8"
               style={{ 
                 background: 'rgb(255, 255, 255)',
                 border: '1px solid rgba(0, 0, 0, 0.06)'
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(0, 0, 0)' }}>
                Evolución temporal
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                Tiempo promedio de respuesta (minutos)
              </p>
            </div>
            
            <ResponsiveContainer width="100%" height={200} className="block sm:hidden">
              <AreaChart data={timeSeriesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNessieMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(0, 0, 0)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="rgb(0, 0, 0)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTraditionalMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(0, 0, 0, 0.05)" stopOpacity={1}/>
                    <stop offset="95%" stopColor="rgba(0, 0, 0, 0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(0, 0, 0, 0.04)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                  interval={2}
                />
                <YAxis 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                  domain={[0, 60]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
                <Area
                  type="monotone"
                  dataKey="traditional"
                  stroke="transparent"
                  fillOpacity={1}
                  fill="url(#colorTraditionalMobile)"
                  name="Método tradicional"
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="nessie" 
                  stroke="rgb(0, 0, 0)" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorNessieMobile)"
                  name="Con Nessie"
                  animationDuration={2000}
                  animationBegin={500}
                />
              </AreaChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNessie" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(0, 0, 0)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="rgb(0, 0, 0)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTraditional" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(0, 0, 0, 0.05)" stopOpacity={1}/>
                    <stop offset="95%" stopColor="rgba(0, 0, 0, 0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(0, 0, 0, 0.04)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                />
                <YAxis 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                  domain={[0, 60]}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
                <Area
                  type="monotone"
                  dataKey="traditional"
                  stroke="transparent"
                  fillOpacity={1}
                  fill="url(#colorTraditional)"
                  name="Método tradicional"
                  animationDuration={1500}
                />
                <Area 
                  type="monotone" 
                  dataKey="nessie" 
                  stroke="rgb(0, 0, 0)" 
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorNessie)"
                  name="Con Nessie"
                  animationDuration={2000}
                  animationBegin={500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Satisfaction Score with modern circular progress */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
               style={{ 
                 background: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(38, 38, 38) 100%)'
               }}>
            {/* Decorative background circles */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                   transform: 'translate(30%, -30%)'
                 }}></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full" 
                 style={{ 
                   background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                   transform: 'translate(-30%, 30%)'
                 }}></div>
            
            <div className="relative z-10">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(255, 255, 255)' }}>
                  Satisfacción
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Net Promoter Score
                </p>
              </div>
              
              {/* Custom circular progress */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
                {/* Background circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 192 192">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="12"
                    fill="none"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="url(#progressGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 80 * 0.94} ${2 * Math.PI * 80}`}
                    strokeLinecap="round"
                    style={{
                      animation: 'drawCircle 2s ease-out forwards',
                      strokeDashoffset: 2 * Math.PI * 80
                    }}
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(255, 255, 255)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold" style={{ color: 'rgb(255, 255, 255)' }}>
                    94
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    puntos
                  </div>
                </div>
              </div>
              
              {/* Stats below */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6">
                <div className="text-center p-2 sm:p-3 rounded-lg" 
                     style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="text-sm sm:text-base md:text-lg font-bold" style={{ color: 'rgb(255, 255, 255)' }}>+12</div>
                  <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>vs. anterior</div>
                </div>
                <div className="text-center p-2 sm:p-3 rounded-lg" 
                     style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="text-sm sm:text-base md:text-lg font-bold" style={{ color: 'rgb(255, 255, 255)' }}>Top 5%</div>
                  <div className="text-[10px] sm:text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>industria</div>
                </div>
              </div>
            </div>
            
            <style>{`
              @keyframes drawCircle {
                to {
                  stroke-dashoffset: ${2 * Math.PI * 80 * (1 - 0.94)};
                }
              }
            `}</style>
          </div>
        </div>

        {/* Comparison Bars Section */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Before/After comparison */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8"
               style={{ 
                 background: 'rgb(255, 255, 255)',
                 border: '1px solid rgba(0, 0, 0, 0.06)'
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(0, 0, 0)' }}>
                Comparación de métricas
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                Tiempo promedio por tarea (minutos)
              </p>
            </div>
            
            {/* Mobile view - simplified bars */}
            <div className="block sm:hidden space-y-3">
              {comparisonData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                      {item.metric}
                    </span>
                    <span className="text-xs font-bold text-green-600">
                      -{item.improvement}%
                    </span>
                  </div>
                  <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${(item.after / item.before) * 100}%`,
                        background: 'rgb(0, 0, 0)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <span className="text-[10px] text-white font-bold">{item.after}</span>
                      <span className="text-[10px] text-gray-600">{item.before}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop view - full bar chart */}
            <ResponsiveContainer width="100%" height={250} className="hidden sm:block">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="0" stroke="rgba(0, 0, 0, 0.04)" vertical={false} />
                <XAxis 
                  dataKey="metric" 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                />
                <YAxis 
                  stroke="rgba(0, 0, 0, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
                <Bar dataKey="before" fill="rgba(0, 0, 0, 0.1)" name="Antes" radius={[8, 8, 0, 0]} />
                <Bar dataKey="after" fill="rgb(0, 0, 0)" name="Con Nessie" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Usage Distribution */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8"
               style={{ 
                 background: 'rgb(255, 255, 255)',
                 border: '1px solid rgba(0, 0, 0, 0.06)'
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(0, 0, 0)' }}>
                Distribución de uso
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                Tipos de consultas más frecuentes
              </p>
            </div>
            
            {/* Mobile view - list format */}
            <div className="block sm:hidden space-y-2">
              {usageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg"
                     style={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.fill }}></div>
                    <span className="text-xs font-medium" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: 'rgb(0, 0, 0)' }}>
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
            
            {/* Desktop view - pie chart */}
            <ResponsiveContainer width="100%" height={250} className="hidden sm:block">
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                  onMouseEnter={onPieEnter}
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12"
             style={{ 
               background: 'linear-gradient(135deg, rgb(250, 250, 250) 0%, rgb(255, 255, 255) 100%)',
               border: '1px solid rgba(0, 0, 0, 0.06)'
             }}>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: 'rgb(0, 0, 0)' }}>
            Resultados desde el día uno
          </h3>
          <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Únete a las empresas que ya han transformado su gestión del conocimiento 
            con resultados medibles y sostenibles.
          </p>
          <button className="btn-shine px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    background: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(38, 38, 38) 100%)',
                  }}>
            Ver caso de estudio completo
          </button>
        </div>
      </div>
    </section>
  )
}

export default Performance