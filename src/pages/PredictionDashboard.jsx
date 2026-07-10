import { useState, useMemo } from 'react'
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, StatCard } from '../components/ui/Card'
import { ProgressBar, SectionHeader } from '../components/ui/index'
import { Badge, RiskBadge } from '../components/ui/Badge'
import { getRiskTrendData, getBurnoutForecastData, getMonthlyChartData } from '../services/ragService'
import { TrendingUp, Brain, AlertTriangle, Shield, Lightbulb, Activity } from 'lucide-react'
import { cn } from '../utils/helpers'

const RISK_DATA = Array.from({ length: 14 }, (_, i) => ({
  day: `Day ${i + 1}`,
  risk: Math.round(20 + Math.sin(i * 0.5) * 15 + Math.random() * 10),
  stress: Math.round(25 + Math.cos(i * 0.4) * 12 + Math.random() * 8),
}))

const BURNOUT_DATA = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  score: Math.round(30 + i * 4 + Math.random() * 10),
  label: i >= 5 ? 'Predicted' : 'Actual',
}))

const PIE_DATA = [
  { name: 'Low Risk', value: 68, color: '#10B981' },
  { name: 'Medium Risk', value: 24, color: '#F59E0B' },
  { name: 'High Risk', value: 8, color: '#EF4444' },
]

const RECOMMENDATIONS = [
  '🧘 Practice 10 minutes of daily mindfulness meditation',
  '🚶 Take a 20-minute walk — reduces cortisol by 20%',
  '💧 Drink 8 glasses of water throughout the day',
  '😴 Sleep before 11pm to improve emotional regulation',
  '📞 Reach out to one trusted person this week',
  '🌱 Practice box breathing when stress spikes',
]

export default function PredictionDashboard() {
  const [timeframe, setTimeframe] = useState('7d')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
              <Shield size={12} /> Risk Prediction Dashboard
            </div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">AI Risk & Wellness Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Powered by IBM watsonx.ai Predictive Models</p>
          </div>
          <div className="flex gap-2">
            {['7d', '30d', '90d'].map(t => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                aria-pressed={timeframe === t}
                className={cn('px-3 py-2 text-xs font-semibold rounded-xl transition-all', timeframe === t ? 'bg-primary-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50')}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-2xl flex gap-4 items-start">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl"><AlertTriangle size={18} className="text-amber-600" /></div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-amber-800 dark:text-amber-200">Medium Risk — Elevated Stress Pattern Detected</h3>
              <RiskBadge level="medium" />
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300">AI analysis indicates a sustained stress pattern over the past 5 days with declining sleep quality. Burnout risk is increasing.</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard label="Current Risk" value="Medium" icon={<Shield size={18} />} color="amber" trend={{ value: 5, positive: false }} />
          <StatCard label="Burnout Score" value="42/100" icon={<Brain size={18} />} color="red" trend={{ value: 3, positive: false }} />
          <StatCard label="Avg Stress (7d)" value="5.8/10" icon={<Activity size={18} />} color="amber" trend={{ value: 8, positive: false }} />
          <StatCard label="Mood Trend" value="↑ Improving" icon={<TrendingUp size={18} />} color="green" trend={{ value: 12, positive: true }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Stress Trend */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"><Activity size={16} className="text-primary-600" /> Stress & Risk Trend</h3>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={RISK_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2.5} fill="url(#riskGrad)" name="Risk Score" />
                  <Area type="monotone" dataKey="stress" stroke="#F59E0B" strokeWidth={2} fill="none" name="Stress" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Burnout Forecast */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Brain size={16} className="text-secondary-600" /> Burnout Forecast (7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={BURNOUT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="burnGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2} fill="url(#burnGrad)" name="Burnout Score" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <div className="space-y-5">
            {/* Pie */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                    {PIE_DATA.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={v => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              {PIE_DATA.map(d => (
                <div key={d.name} className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: d.color }} /><span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span></div>
                  <span className="text-xs font-bold">{d.value}%</span>
                </div>
              ))}
            </Card>

            {/* Stress Contributors */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Activity size={14} className="text-primary-600" /> Stress Contributors
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Work Pressure', value: 72, color: 'danger' },
                  { label: 'Sleep Quality', value: 45, color: 'warning' },
                  { label: 'Social Stress', value: 38, color: 'primary' },
                  { label: 'Financial', value: 55, color: 'warning' },
                ].map(f => (
                  <ProgressBar key={f.label} label={f.label} value={f.value} showValue color={f.color} size="sm" />
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Lightbulb size={14} className="text-amber-500" /> AI Recommendations
              </h3>
              <ul className="space-y-2">
                {RECOMMENDATIONS.slice(0, 4).map((r, i) => (
                  <li key={i} className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">{r}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
