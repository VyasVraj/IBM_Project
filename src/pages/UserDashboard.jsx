import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, GradientCard, StatCard } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/index'
import { Badge, RiskBadge } from '../components/ui/Badge'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { getMoodStats } from '../services/moodService'
import {
  MessageCircle, BookOpen, Brain, Smile, Calendar, Bell,
  TrendingUp, Shield, Heart, Zap, ChevronRight
} from 'lucide-react'

const QUICK_ACTIONS = [
  { icon: <MessageCircle size={20} />, label: 'AI Chat', to: '/chat', color: 'from-primary-600 to-secondary-600' },
  { icon: <Smile size={20} />, label: 'Log Mood', to: '/mood-tracker', color: 'from-accent-500 to-primary-600' },
  { icon: <BookOpen size={20} />, label: 'Resources', to: '/resources', color: 'from-success-500 to-green-500' },
  { icon: <Shield size={20} />, label: 'Emergency', to: '/emergency', color: 'from-danger-500 to-red-600' },
]

export default function UserDashboard() {
  const { user } = useAuth()
  const moodStats = getMoodStats()
  const [riskLevel] = useState('medium')

  const RECENT_JOURNALS = [
    { date: '2 days ago', excerpt: 'Feeling more hopeful today. Had a good conversation with a friend...', mood: 4 },
    { date: '4 days ago', excerpt: 'Work pressure is high this week but managing with breathing exercises...', mood: 3 },
  ]

  const REMINDERS = [
    { time: 'Today 8:00 PM', text: 'Daily mood log reminder', type: 'mood' },
    { time: 'Tomorrow 7:00 AM', text: '10-min morning mindfulness', type: 'wellness' },
    { time: 'This Week', text: 'Weekly wellness report ready', type: 'report' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <GradientCard className="mb-2">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/70 text-sm">Welcome back 👋</p>
                <h1 className="text-3xl font-bold text-white mt-1">{user?.name || 'Alex Johnson'}</h1>
                <p className="text-white/80 mt-1">Here's your mental wellness overview</p>
                <div className="flex items-center gap-2 mt-3">
                  <RiskBadge level={riskLevel} />
                  <span className="text-white/70 text-xs">Current Risk Level</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/70 text-xs">Wellness Score</p>
                <p className="text-4xl font-bold text-white">72</p>
                <p className="text-white/70 text-xs">out of 100</p>
              </div>
            </div>
            <div className="mt-4">
              <ProgressBar value={72} color="gray" size="sm" />
            </div>
          </GradientCard>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {QUICK_ACTIONS.map((a, i) => (
            <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={a.to}>
                <div className={`bg-gradient-to-br ${a.color} text-white rounded-2xl p-4 text-center hover:scale-105 transition-transform shadow-lg`}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2">{a.icon}</div>
                  <p className="font-semibold text-sm">{a.label}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Summary */}
            <Card>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Smile size={16} className="text-primary-600" /> Mood Summary
                </h2>
                <Link to="/mood-tracker" className="text-xs text-primary-600 hover:underline">View Full Chart →</Link>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-5">
                {[
                  { label: 'Avg Mood', value: moodStats?.avgMood || '3.8', sub: 'out of 5' },
                  { label: 'Avg Stress', value: moodStats?.avgStress || '5.2', sub: 'out of 10' },
                  { label: 'Avg Sleep', value: moodStats?.avgSleep || '7.1', sub: 'hours/night' },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                    <p className="text-xs text-slate-400">{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <ProgressBar label="Mood Trend" value={76} showValue color="primary" size="sm" />
                <ProgressBar label="Energy Level" value={62} showValue color="cyan" size="sm" />
                <ProgressBar label="Stress Management" value={55} showValue color="success" size="sm" />
              </div>
            </Card>

            {/* Recent Journals */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen size={16} className="text-primary-600" /> Recent Journals
                </h2>
                <Link to="/journal" className="text-xs text-primary-600 hover:underline">View All →</Link>
              </div>
              <div className="space-y-3">
                {RECENT_JOURNALS.map((j, i) => (
                  <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">{j.date}</span>
                      <Badge variant={j.mood >= 4 ? 'success' : j.mood >= 3 ? 'warning' : 'danger'} size="sm">
                        Mood {j.mood}/5
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{j.excerpt}</p>
                  </div>
                ))}
                <Link to="/journal">
                  <Button variant="outline" fullWidth size="sm">Write New Entry</Button>
                </Link>
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            {/* Risk Score */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Shield size={16} className="text-primary-600" /> Risk Assessment
              </h3>
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-amber-500 mb-1">42</div>
                <p className="text-sm text-slate-500">out of 100</p>
                <RiskBadge level="medium" />
              </div>
              <ProgressBar value={42} color="warning" size="md" />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">Based on recent mood, sleep, and activity patterns</p>
              <Link to="/dashboard" className="block mt-3">
                <Button variant="outline" fullWidth size="sm">View Full Analysis</Button>
              </Link>
            </Card>

            {/* Recommended */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Zap size={16} className="text-amber-500" /> Recommended for You
              </h3>
              <div className="space-y-2">
                {[
                  { text: 'Try the 4-7-8 breathing exercise', icon: '🌬️', to: '/resources' },
                  { text: 'Read: Managing Work Stress', icon: '📖', to: '/resources' },
                  { text: 'Log today\'s mood', icon: '😊', to: '/mood-tracker' },
                ].map((r, i) => (
                  <Link key={i} to={r.to} className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                    <span>{r.icon}</span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 flex-1">{r.text}</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* Reminders */}
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Bell size={16} className="text-primary-600" /> Upcoming Reminders
              </h3>
              <div className="space-y-3">
                {REMINDERS.map((r, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-lg flex-shrink-0">{r.type === 'mood' ? '😊' : r.type === 'wellness' ? '🧘' : '📊'}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{r.text}</p>
                      <p className="text-xs text-slate-400">{r.time}</p>
                    </div>
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
