import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, StatCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar, SectionHeader, Alert } from '../components/ui/index'
import { saveMoodEntry, getDemoChartData, generateMoodInsight } from '../services/moodService'
import { Smile, Zap, Activity, Moon, Droplets, Dumbbell, Save, Brain, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { cn } from '../utils/helpers'

const EMOJIS = [
  { emoji: '😁', label: 'Excellent', value: 5 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😔', label: 'Low', value: 2 },
  { emoji: '😭', label: 'Very Low', value: 1 },
]

const MOOD_COLORS = { 5: 'bg-green-100', 4: 'bg-cyan-100', 3: 'bg-yellow-100', 2: 'bg-orange-100', 1: 'bg-red-100' }

export default function MoodTrackerPage() {
  const [selectedEmoji, setSelectedEmoji] = useState(2)
  const [stress, setStress] = useState(5)
  const [sleep, setSleep] = useState(7)
  const [journal, setJournal] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('weekly')
  const [calMonth, setCalMonth] = useState(new Date())

  const chartData = useMemo(() => getDemoChartData(), [])
  const moodValue = EMOJIS[selectedEmoji].value
  const insight = generateMoodInsight(moodValue, stress, sleep)

  const handleSave = async () => {
    setSaving(true)
    await saveMoodEntry({ mood: moodValue, stress, sleep, journal, emoji: EMOJIS[selectedEmoji].emoji })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  // Calendar
  const year = calMonth.getFullYear(), month = calMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()
  const today = new Date()

  const moodForDay = (day) => {
    // Demo: random mood data
    return day % 3 === 0 ? 5 : day % 3 === 1 ? 3 : 2
  }

  const calMoodColor = (m) => {
    if (!m) return 'bg-slate-100 dark:bg-slate-800'
    if (m >= 4) return 'bg-green-200 dark:bg-green-800'
    if (m >= 3) return 'bg-yellow-200 dark:bg-yellow-800'
    return 'bg-red-200 dark:bg-red-800'
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          badge="Daily Wellness"
          title="Mood Tracker"
          subtitle="Track your daily mood, energy, stress, and habits. Get AI-powered insights from IBM Granite."
          className="mb-8"
        />

        {saved && (
          <div className="mb-4">
            <Alert type="success" title="Entry Saved!" onClose={() => setSaved(false)}>
              Today's wellness entry has been logged successfully.
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Input */}
          <div className="xl:col-span-1 space-y-5">
            <Card>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
                <Smile size={18} className="text-primary-600" />
                Today's Check-In
              </h2>

              {/* Emoji selector */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">How are you feeling?</p>
                <div className="flex justify-between" role="radiogroup" aria-label="Mood selection">
                  {EMOJIS.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedEmoji(i)}
                      role="radio"
                      aria-checked={selectedEmoji === i}
                      aria-label={e.label}
                      title={e.label}
                      className={cn(
                        'text-3xl p-2 rounded-xl transition-all',
                        selectedEmoji === i ? 'bg-primary-100 dark:bg-primary-900/40 scale-125' : 'opacity-50 hover:opacity-80 hover:scale-110'
                      )}
                    >
                      {e.emoji}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center mt-2 font-medium text-slate-500">{EMOJIS[selectedEmoji].label}</p>
              </div>

              {/* Stress Slider */}
              {[
                { label: 'Stress Level', value: stress, onChange: setStress, max: 10, icon: <Activity size={14} />, color: stress >= 7 ? 'danger' : stress >= 5 ? 'warning' : 'success' },
                { label: 'Sleep Hours', value: sleep, onChange: setSleep, max: 12, step: 0.5, icon: <Moon size={14} />, color: 'cyan', suffix: 'h' },
              ].map(({ label, value, onChange, max, step, icon, color, suffix }) => (
                <div key={label} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span className="text-primary-600">{icon}</span>{label}
                    </span>
                    <span className="text-sm font-bold text-primary-600">{value}{suffix || ''}</span>
                  </div>
                  <input
                    type="range" min={0} max={max} step={step || 1} value={value}
                    onChange={e => onChange(Number(e.target.value))}
                    className="w-full" aria-label={label}
                  />
                  <ProgressBar value={(value / max) * 100} color={color} size="sm" />
                </div>
              ))}

              {/* Journal */}
              <div className="mb-4">
                <label htmlFor="mood-journal" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Daily Journal Note
                </label>
                <textarea
                  id="mood-journal"
                  value={journal}
                  onChange={e => setJournal(e.target.value)}
                  placeholder="How was your day? What's on your mind?"
                  rows={3}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <Button fullWidth loading={saving} onClick={handleSave} icon={<Save size={16} />}>
                Save Today's Entry
              </Button>
            </Card>

            {/* AI Insight */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
                <Brain size={16} className="text-primary-600" />
                IBM Granite Insight
              </h3>
              <div className="bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-950/20 dark:to-cyan-950/20 border border-primary-100 dark:border-primary-800 rounded-xl p-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{insight}</p>
              </div>
            </Card>
          </div>

          {/* Right: Charts */}
          <div className="xl:col-span-2 space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Avg Mood (7d)" value="3.8/5" trend={{ value: 5, positive: true }} color="primary" icon={<Smile size={18} />} />
              <StatCard label="Avg Sleep" value="7.1h" trend={{ value: 3, positive: true }} color="cyan" icon={<Moon size={18} />} />
              <StatCard label="Avg Stress" value="5.2/10" trend={{ value: 8, positive: false }} color="amber" icon={<Activity size={18} />} />
              <StatCard label="Streak" value="5 days" trend={{ value: 12, positive: true }} color="green" icon={<TrendingUp size={18} />} />
            </div>

            {/* Mood Chart */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary-600" />
                  Mood Timeline
                </h3>
                <div className="flex gap-2">
                  {['weekly', 'monthly'].map(v => (
                    <button
                      key={v}
                      onClick={() => setView(v)}
                      aria-pressed={view === v}
                      className={cn('px-3 py-1 text-xs font-semibold rounded-lg transition-all', view === v ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300')}
                    >
                      {v.charAt(0).toUpperCase() + v.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="mood" stroke="#4F46E5" strokeWidth={2.5} dot={{ fill: '#4F46E5', r: 4 }} name="Mood" />
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Stress" strokeDasharray="4 4" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Sleep Chart */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Moon size={16} className="text-primary-600" />
                Sleep & Energy (Weekly)
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.15)" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="sleep" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Sleep (hrs)" maxBarSize={40} />
                  <Bar dataKey="mood" fill="#06B6D4" radius={[6, 6, 0, 0]} name="Mood" maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Mood Calendar */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Mood Calendar</h3>
                <div className="flex items-center gap-3">
                  <button onClick={() => setCalMonth(new Date(year, month - 1, 1))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Previous month">
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {calMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </span>
                  <button onClick={() => setCalMonth(new Date(year, month + 1, 1))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" aria-label="Next month">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className="text-xs font-bold text-slate-400 py-1">{d}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const m = moodForDay(day)
                  const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                  return (
                    <div
                      key={day}
                      title={`Mood: ${m}/5`}
                      className={cn('aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all', calMoodColor(m), isToday && 'ring-2 ring-primary-500 ring-offset-1')}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
              <div className="flex items-center gap-4 mt-3 justify-center">
                {[{ color: 'bg-green-300', label: 'Good' }, { color: 'bg-yellow-300', label: 'Fair' }, { color: 'bg-red-300', label: 'Low' }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${l.color}`} />
                    <span className="text-xs text-slate-500">{l.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
