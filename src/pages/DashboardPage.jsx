import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, StatCard } from '../components/ui/Card'
import { ProgressBar, SectionHeader } from '../components/ui/index'
import { Badge, RiskBadge } from '../components/ui/Badge'
import { getRiskTrendData, getBurnoutForecastData, getMonthlyChartData } from '../services/moodService'
import { TrendingUp, Brain, AlertTriangle, Shield, Target, Lightbulb, Activity, Calendar } from 'lucide-react'

// generate local data since moodService doesn't export these yet
function generateTrendData(n = 14) {
  return Array.from({ length: n }, (_, i) => ({
    day: `Day ${i + 1}`,
    stress: Math.round(20 + Math.sin(i * 0.5) * 15 + Math.random() * 10),
    mood: parseFloat((3 + Math.sin(i * 0.4) * 1.2 + Math.random() * 0.5).toFixed(1)),
  }))
}

function generateBurnout(n = 7) {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, n).map((day, i) => ({
    day,
    burnout: Math.round(30 + i * 6 + Math.random() * 8),
    predicted: i >= 4,
  }))
}

const RISK_PIE = [
  { name: 'Low Risk', value: 65, color: '#10B981' },
  { name: 'Medium Risk', value: 26, color: '#F59E0B' },
  { name: 'High Risk', value: 9, color: '#EF4444' },
]

const STRESS_FACTORS = [
  { label: 'Work Pressure', value: 72 },
  { label: 'Sleep Quality', value: 45 },
  { label: 'Social Stress', value: 38 },
  { label: 'Financial', value: 55 },
  { label: 'Physical Health', value: 30 },
]

const RECOMMENDATIONS = [
  'Schedule 10 minutes of mindfulness each morning',
  'Limit caffeine after 2 pm to improve sleep quality',
  'Reach out to one trusted person in your network this week',
  'Take a 20-minute walk daily — reduces cortisol by 20%',
  'Practice 4-7-8 breathing when stress exceeds 7/10',
  'Log your mood consistently to identify personal stress triggers',
]

export default function DashboardPage() {
  const trendData = useMemo(() => generateTrendData(), [])
  const burnoutData = useMemo(() => generateBurnout(), [])
  const [timeframe, setTimeframe] = useState('7d')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <SectionHeader
            badge="Risk Prediction"
            title="AI Wellness Dashboard"
            subtitle="Predictive analytics to help you stay ahead of stress peaks and mental health challenges."
            center={false}
          />
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                aria-pressed={timeframe === t}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${timeframe === t ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
              >
                {t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Risk Alert */}
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-2xl flex gap-3 items-start">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex-shrink-0">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-amber-800 dark:text-amber-200">Medium Risk — Elevated Stress Detected</h3>
              <RiskBadge level="medium" />
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Sustained stress pattern over the past 5 days with declining sleep quality. Burnout risk is increasing. Proactive self-care recommended.
            </p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Current Risk" value="Medium" icon={<Shield size={18} />} color="amber" trend={{ value: 5, positive: false }} />
          <StatCard label="Avg Stress (7d)" value="5.8/10" icon={<Activity size={18} />} color="amber" trend={{ value: 8, positive: false }} />
          <StatCard label="Burnout Score" value="42/100" icon={<Brain size={18} />} color="red" trend={{ value: 3, positive: false }} />
          <StatCard label="Mood Trend" value="↑ Improving" icon={<TrendingUp size={18} />} color="green" trend={{ value: 12, positive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stress Trend */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Activity size={16} className="text-primary-600" />
                  Stress & Risk Trend
                </h3>
                <Badge variant="warning" dot>Moderate</Badge>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2.5} fill="url(#stressGrad)" name="Risk Score" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Mood Trend */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-primary-600" />
                Mood Trend
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="mood" stroke="#4F46E5" strokeWidth={2.5} dot={false} name="Mood" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Burnout Forecast */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Brain size={16} className="text-danger-500" />
                  Burnout Forecast (7 Days)
                </h3>
                <Badge variant="danger" dot>At Risk</Badge>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={burnoutData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="burnoutGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="burnout" stroke="#7C3AED" strokeWidth={2} fill="url(#burnoutGrad)" name="Burnout Score" />
                </AreaChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 text-center mt-2">📈 Projected peak on Friday — plan recovery activities in advance</p>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Risk Distribution */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie data={RISK_PIE} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={4} dataKey="value">
                    {RISK_PIE.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5">
                {RISK_PIE.map(d => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{d.value}%</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stress Factors */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Target size={16} className="text-primary-600" />
                Stress Contributors
              </h3>
              <div className="space-y-3">
                {STRESS_FACTORS.map(f => (
                  <ProgressBar
                    key={f.label}
                    label={f.label}
                    value={f.value}
                    showValue
                    color={f.value >= 60 ? 'danger' : f.value >= 40 ? 'warning' : 'success'}
                    size="sm"
                  />
                ))}
              </div>
            </Card>

            {/* Predictions */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Calendar size={16} className="text-primary-600" />
                AI Predictions
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-800 rounded-xl">
                  <p className="text-xs font-bold text-primary-700 dark:text-primary-300 mb-1">📅 This Week</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Stress likely to peak mid-week. Wednesday self-care block recommended.</p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-800 rounded-xl">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">📆 This Month</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Burnout risk decreasing if current sleep improvement trend continues.</p>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Lightbulb size={16} className="text-amber-500" />
                AI Recommendations
              </h3>
              <ul className="space-y-2.5">
                {RECOMMENDATIONS.slice(0, 4).map((r, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
