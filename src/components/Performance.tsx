import { useRef } from 'react'
import {
  Area,
  BarChart,
  Bar,
  LineChart,
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
  Legend,
} from 'recharts'

// ROI & Revenue Impact Data
const roiData = [
  { month: 'M1', roi: -20, revenue: 95000, savings: 15000, efficiency: 100 },
  { month: 'M2', roi: 5, revenue: 125000, savings: 28000, efficiency: 115 },
  { month: 'M3', roi: 35, revenue: 180000, savings: 45000, efficiency: 128 },
  { month: 'M4', roi: 78, revenue: 245000, savings: 67000, efficiency: 142 },
  { month: 'M5', roi: 145, revenue: 340000, savings: 98000, efficiency: 165 },
  { month: 'M6', roi: 235, revenue: 485000, savings: 142000, efficiency: 195 },
  { month: 'M7', roi: 340, revenue: 620000, savings: 195000, efficiency: 220 },
  { month: 'M8', roi: 460, revenue: 780000, savings: 260000, efficiency: 250 },
  { month: 'M9', roi: 595, revenue: 950000, savings: 340000, efficiency: 285 },
  { month: 'M10', roi: 745, revenue: 1150000, savings: 435000, efficiency: 320 },
  { month: 'M11', roi: 910, revenue: 1380000, savings: 545000, efficiency: 360 },
  { month: 'M12', roi: 1090, revenue: 1650000, savings: 670000, efficiency: 400 }
]

// Enterprise Performance Radar
const radarData = [
  { metric: 'Velocidad decisiones', nessie: 95, industry: 45, max: 100 },
  { metric: 'Precisión datos', nessie: 98, industry: 62, max: 100 },
  { metric: 'Colaboración', nessie: 92, industry: 58, max: 100 },
  { metric: 'Compliance', nessie: 99, industry: 75, max: 100 },
  { metric: 'Seguridad', nessie: 97, industry: 70, max: 100 },
  { metric: 'Adopción', nessie: 94, industry: 40, max: 100 },
  { metric: 'Escalabilidad', nessie: 96, industry: 55, max: 100 },
  { metric: 'Innovación', nessie: 91, industry: 48, max: 100 }
]

// Cost Reduction Categories
const costData = [
  { category: 'Tiempo búsqueda', savings: 127000, percentage: 32, color: 'rgb(0, 0, 0)' },
  { category: 'Duplicación trabajo', savings: 89000, percentage: 22, color: 'rgba(0, 0, 0, 0.8)' },
  { category: 'Errores documentación', savings: 76000, percentage: 19, color: 'rgba(0, 0, 0, 0.6)' },
  { category: 'Onboarding', savings: 58000, percentage: 15, color: 'rgba(0, 0, 0, 0.4)' },
  { category: 'Decisiones lentas', savings: 48000, percentage: 12, color: 'rgba(0, 0, 0, 0.2)' }
]

// Productivity Impact Timeline
const productivityData = [
  { week: 'S1', team: 100, individual: 100 },
  { week: 'S2', team: 108, individual: 112 },
  { week: 'S3', team: 118, individual: 125 },
  { week: 'S4', team: 132, individual: 138 },
  { week: 'S5', team: 148, individual: 152 },
  { week: 'S6', team: 167, individual: 168 },
  { week: 'S7', team: 188, individual: 185 },
  { week: 'S8', team: 212, individual: 204 }
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


  return (
    <section ref={sectionRef} id="performance" className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24">
          <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'rgb(var(--color-white))'
                }}>
            VALOR EMPRESARIAL
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: 'rgb(var(--color-white))' }}>
            ROI demostrado
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            <span style={{
              background: 'linear-gradient(135deg, rgb(var(--color-white)) 0%, rgb(var(--color-gray-400)) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>desde el mes 2</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg px-4 sm:px-0" style={{ color: 'rgb(var(--color-gray-400))' }}>
            Métricas verificadas de Fortune 500 que generan un retorno 
            de inversión del 235% en solo 6 meses.
          </p>
        </div>

        {/* Main KPI Cards with Business Value metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
          {[
            { value: '+235%', label: 'ROI en 6 meses', trend: '↑', subtitle: 'retorno inversión' },
            { value: '$485K', label: 'Ingresos extra', trend: '↑', subtitle: 'generados/mes' },
            { value: '2100 hrs', label: 'Horas ahorradas', trend: '↑', subtitle: 'mensualmente' },
            { value: '$398K/año', label: 'Ahorro total', trend: '↑', subtitle: 'reducción costos' }
          ].map((kpi, index) => (
            <div key={index} 
                 className="relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
                 style={{ 
                   background: 'rgba(255, 255, 255, 0.05)',
                   backdropFilter: 'blur(20px)',
                   WebkitBackdropFilter: 'blur(20px)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   boxShadow: `
                     0 10px 40px rgba(0, 0, 0, 0.3),
                     inset 0 1px 0 rgba(255, 255, 255, 0.1)
                   `
                 }}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-1 sm:mb-2">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>
                    {kpi.value}
                  </div>
                  <span className={`text-base sm:text-lg md:text-xl ${kpi.trend === '↑' ? 'text-green-500' : 'text-gray-400'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium" style={{ color: 'rgb(var(--color-gray-300))' }}>
                  {kpi.label}
                </p>
                <p className="text-[10px] sm:text-xs mt-1 hidden sm:block" style={{ color: 'rgb(var(--color-gray-500))' }}>
                  {kpi.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid - Enterprise Metrics */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* ROI Growth Chart - 2 columns */}
          <div className="lg:col-span-2 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.03)',
                 backdropFilter: 'blur(20px) saturate(180%)',
                 WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: `
                   0 20px 60px rgba(0, 0, 0, 0.3),
                   inset 0 1px 0 rgba(255, 255, 255, 0.1)
                 `
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                Crecimiento del ROI
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                Retorno de inversión y ahorro acumulado
              </p>
            </div>
            
            <ResponsiveContainer width="100%" height={200} className="block sm:hidden">
              <ComposedChart data={roiData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="roiGradientMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="savingsGradientMobile" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(0, 0, 0)" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="rgb(0, 0, 0)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  interval={1}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  domain={[-50, 1200]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="roi"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#roiGradientMobile)"
                  name="ROI"
                  animationDuration={0}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="efficiency"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth={2}
                  dot={false}
                  name="Eficiencia"
                  animationDuration={0}
                />
              </ComposedChart>
            </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height={300} className="hidden sm:block">
              <ComposedChart data={roiData} margin={{ top: 10, right: 70, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="roiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  domain={[-50, 1200]}
                  tickFormatter={(value) => `${value}%`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickFormatter={(value) => `$${value/1000}K`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="line"
                  wrapperStyle={{ fontSize: '11px' }}
                />
                <Bar
                  yAxisId="right"
                  dataKey="savings"
                  fill="rgba(255, 255, 255, 0.1)"
                  name="Ahorro mensual"
                  radius={[4, 4, 0, 0]}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="roi"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#roiGradient)"
                  name="ROI %"
                  animationDuration={0}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="revenue"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2}
                  dot={{ fill: 'rgb(59, 130, 246)', r: 3 }}
                  name="Ingresos extra"
                  animationDuration={0}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Enterprise Impact Radar */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden"
               style={{ 
                 background: 'linear-gradient(135deg, rgb(0, 0, 0) 0%, rgb(41, 37, 36) 100%)',
                 boxShadow: `
                   0 30px 80px rgba(0, 0, 0, 0.2),
                   inset 0 1px 0 rgba(255, 255, 255, 0.05)
                 `
               }}>
            
            <div className="relative z-10">
              <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(255, 255, 255)' }}>
                  Impacto empresarial
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Nessie vs. promedio industria
                </p>
              </div>
              
              {/* Radar Chart for Enterprise Metrics */}
              <ResponsiveContainer width="100%" height={240}>
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid 
                    gridType="polygon" 
                    radialLines={false}
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 9 }}
                    className="text-[8px] sm:text-[10px]"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar 
                    name="Promedio industria" 
                    dataKey="industry" 
                    stroke="rgba(255, 255, 255, 0.3)"
                    fill="rgba(255, 255, 255, 0.05)"
                    strokeWidth={1}
                  />
                  <Radar 
                    name="Nessie" 
                    dataKey="nessie" 
                    stroke="rgb(255, 255, 255)"
                    fill="rgba(255, 255, 255, 0.15)"
                    strokeWidth={2}
                    animationDuration={0}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                    iconType="line"
                  />
                </RadarChart>
              </ResponsiveContainer>
              
              {/* Key metric highlight */}
              <div className="mt-4 p-3 rounded-lg" 
                   style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    Ventaja competitiva promedio
                  </span>
                  <span className="text-lg font-bold" style={{ color: 'rgb(255, 255, 255)' }}>
                    +52%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Impact Section */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {/* Cost Savings Breakdown */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 relative"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.03)',
                 backdropFilter: 'blur(15px)',
                 WebkitBackdropFilter: 'blur(15px)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: `
                   0 15px 50px rgba(0, 0, 0, 0.3),
                   inset 0 1px 0 rgba(255, 255, 255, 0.1)
                 `
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                Reducción de costos
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                Ahorro anual por categoría ($USD)
              </p>
            </div>
            
            {/* Mobile view - cost categories */}
            <div className="block sm:hidden space-y-3">
              {costData.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium" style={{ color: 'rgb(var(--color-gray-300))' }}>
                      {item.category}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'rgb(16, 185, 129)' }}>
                      ${(item.savings/1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="relative h-6 rounded-full overflow-hidden" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
                    <div 
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${item.percentage}%`,
                        background: 'rgba(255, 255, 255, 0.3)'
                      }}
                    />
                    <div className="absolute inset-0 flex items-center px-2">
                      <span className="text-[10px] text-white font-bold">{item.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Desktop view - horizontal bar chart */}
            <ResponsiveContainer width="100%" height={250} className="hidden sm:block">
              <BarChart 
                data={costData} 
                layout="horizontal"
                margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="0" stroke="rgba(255, 255, 255, 0.05)" horizontal={false} />
                <XAxis 
                  type="number"
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  tickFormatter={(value) => `$${value/1000}K`}
                />
                <YAxis 
                  type="category"
                  dataKey="category" 
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  width={75}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ fill: 'rgba(0, 0, 0, 0.02)' }}
                  formatter={(value: any) => [`$${(value/1000).toFixed(0)}K/año`, 'Ahorro']}
                />
                <Bar 
                  dataKey="savings" 
                  fill="rgba(255, 255, 255, 0.4)"
                  radius={[0, 8, 8, 0]}
                  animationDuration={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Productivity Timeline */}
          <div className="rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 relative"
               style={{ 
                 background: 'rgba(255, 255, 255, 0.03)',
                 backdropFilter: 'blur(15px)',
                 WebkitBackdropFilter: 'blur(15px)',
                 border: '1px solid rgba(255, 255, 255, 0.1)',
                 boxShadow: `
                   0 15px 50px rgba(0, 0, 0, 0.3),
                   inset 0 1px 0 rgba(255, 255, 255, 0.1)
                 `
               }}>
            <div className="mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'rgb(var(--color-white))' }}>
                Crecimiento productividad
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'rgb(var(--color-gray-400))' }}>
                Evolución semanal del rendimiento
              </p>
            </div>
            
            {/* Mobile view - productivity stats */}
            <div className="block sm:hidden space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg" 
                   style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                <span className="text-xs" style={{ color: 'rgb(var(--color-gray-400))' }}>Semana 1</span>
                <span className="text-sm font-bold" style={{ color: 'rgb(var(--color-white))' }}>100%</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg" 
                   style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <span className="text-xs" style={{ color: 'rgb(var(--color-gray-400))' }}>Semana 8</span>
                <span className="text-sm font-bold" style={{ color: 'rgb(16, 185, 129)' }}>+212%</span>
              </div>
              <div className="text-center pt-2">
                <div className="text-2xl font-bold" style={{ color: 'rgb(var(--color-white))' }}>2.12x</div>
                <div className="text-xs" style={{ color: 'rgb(var(--color-gray-400))' }}>Multiplicador productividad</div>
              </div>
            </div>
            
            {/* Desktop view - productivity growth lines */}
            <ResponsiveContainer width="100%" height={250} className="hidden sm:block">
              <LineChart data={productivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="teamGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(16, 185, 129)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="rgb(16, 185, 129)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
                <XAxis 
                  dataKey="week" 
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                />
                <YAxis 
                  stroke="rgba(255, 255, 255, 0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255, 255, 255, 0.1)' }}
                  domain={[80, 220]}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: 'rgba(0, 0, 0, 0.1)' }}
                  formatter={(value: any) => [`${value}%`, '']}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="line"
                  wrapperStyle={{ fontSize: '11px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="team" 
                  stroke="rgb(16, 185, 129)" 
                  strokeWidth={2.5}
                  dot={{ fill: 'rgb(16, 185, 129)', r: 4 }}
                  name="Productividad equipo"
                  animationDuration={0}
                />
                <Line 
                  type="monotone" 
                  dataKey="individual" 
                  stroke="rgba(255, 255, 255, 0.6)" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: 'rgba(255, 255, 255, 0.6)', r: 3 }}
                  name="Productividad individual"
                  animationDuration={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Performance