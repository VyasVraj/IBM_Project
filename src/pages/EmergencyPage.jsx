import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { SectionHeader } from '../components/ui/index'
import { EMERGENCY_CONTACTS } from '../utils/helpers'
import { Phone, MessageCircle, Mail, MapPin, AlertTriangle, Heart, Globe } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      {/* Red alert banner */}
      <div className="bg-gradient-to-r from-danger-500 to-red-600 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <AlertTriangle size={20} className="animate-pulse flex-shrink-0" />
          <p className="text-sm font-semibold text-center">
            If you or someone you know is in immediate danger, call <strong>911</strong> (US) or your local emergency number immediately.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SectionHeader
          badge="Emergency Support"
          title="Crisis Help & Emergency Resources"
          subtitle="You are not alone. Help is available right now — free, confidential, and available 24/7."
          className="mb-10"
        />

        {/* Big Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Call Helpline', desc: '988 Suicide & Crisis Lifeline', icon: <Phone size={24} />, href: 'tel:988', bg: 'from-danger-500 to-red-600', action: 'Call 988 Now' },
            { label: 'Text Crisis Line', desc: 'Text HOME to 741741', icon: <MessageCircle size={24} />, href: 'sms:741741&body=HOME', bg: 'from-amber-500 to-orange-500', action: 'Send Text' },
            { label: 'Talk to AI', desc: 'Get immediate empathetic support', icon: <Heart size={24} />, href: '/chat', bg: 'from-primary-600 to-secondary-600', action: 'Open AI Chat', internal: true },
          ].map((a, i) => (
            <motion.div key={a.label} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
              {a.internal ? (
                <Link to={a.href}>
                  <div className={`bg-gradient-to-br ${a.bg} text-white rounded-2xl p-6 text-center card-hover shadow-xl`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">{a.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{a.label}</h3>
                    <p className="text-sm text-white/80 mb-4">{a.desc}</p>
                    <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl">{a.action}</span>
                  </div>
                </Link>
              ) : (
                <a href={a.href}>
                  <div className={`bg-gradient-to-br ${a.bg} text-white rounded-2xl p-6 text-center card-hover shadow-xl`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">{a.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{a.label}</h3>
                    <p className="text-sm text-white/80 mb-4">{a.desc}</p>
                    <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-xl">{a.action}</span>
                  </div>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* International Helplines */}
        <Card className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-2">
            <Globe size={18} className="text-primary-600" />
            International Crisis Helplines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EMERGENCY_CONTACTS.map((c, i) => (
              <motion.a
                key={c.number}
                href={c.type === 'phone' ? `tel:${c.number.replace(/\D/g, '')}` : `https://${c.number}`}
                target={c.type === 'web' ? '_blank' : undefined}
                rel={c.type === 'web' ? 'noopener noreferrer' : undefined}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary-400 dark:hover:border-primary-500 transition-all group"
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900/40 rounded-xl flex-shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/60 transition-colors">
                  <Phone size={16} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{c.name}</p>
                  <p className="text-sm font-mono font-bold text-primary-600 dark:text-primary-400">{c.number}</p>
                  <p className="text-xs text-slate-500">{c.country} · {c.available}</p>
                </div>
                <span className="text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors text-lg">→</span>
              </motion.a>
            ))}
          </div>
        </Card>

        {/* Warning signs + what to do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-500" />
              Warning Signs to Watch For
            </h2>
            <ul className="space-y-2.5">
              {[
                'Talking about wanting to die or self-harm',
                'Expressing feelings of hopelessness or having no reason to live',
                'Withdrawing from friends, family, and activities',
                'Giving away prized possessions',
                'Extreme mood swings or sudden calmness after depression',
                'Increasing use of alcohol or drugs',
                'Talking about being a burden to others',
                'Researching methods of self-harm',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">⚠</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{s}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
              <Heart size={18} className="text-primary-600" />
              How to Help Someone in Crisis
            </h2>
            <ul className="space-y-2.5">
              {[
                'Stay calm and listen without judgment',
                'Ask directly: "Are you thinking about suicide?"',
                'Take all talk of suicide seriously',
                'Remove access to means if possible and safe',
                'Do not leave them alone if risk is immediate',
                'Call 988 or 911 together if needed',
                'Connect them with professional support',
                'Follow up — your continued care matters enormously',
              ].map((s, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="w-5 h-5 bg-green-100 dark:bg-green-900/30 text-success-600 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">{s}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Map placeholder */}
        <Card className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-primary-600" />
            Find Nearby Counselors & Hospitals
          </h2>
          <div className="h-56 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
            <div className="text-center">
              <MapPin size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Google Maps Integration</p>
              <p className="text-xs text-slate-400 mt-1">Connect VITE_GOOGLE_MAPS_KEY to enable nearby provider search</p>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl text-center">
          <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            <strong>💙 Remember:</strong> Suicidal thoughts are a medical emergency. Asking for help is an act of tremendous courage.
            MindGuard AI provides support and resources, but is not a substitute for professional crisis intervention.
          </p>
        </div>
      </div>
    </div>
  )
}
