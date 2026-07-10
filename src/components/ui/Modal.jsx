import { useEffect } from 'react'
import { cn } from '../../utils/helpers'
import { Button } from './Button'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, title, children, size = 'md', className = '' }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-full mx-4' }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className={cn('relative w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl animate-fade-in-up overflow-hidden', sizes[size], className)}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export function EmergencyModal({ isOpen, onClose }) {
  const CONTACTS = [
    { name: '988 Suicide & Crisis Lifeline', number: '988', note: 'US – Call or text 24/7', href: 'tel:988' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', note: 'US – 24/7 text support', href: 'sms:741741&body=HOME' },
    { name: 'Samaritans UK', number: '116 123', note: 'UK – Free, 24/7', href: 'tel:116123' },
    { name: 'iCall India', number: '9152987821', note: 'India – Mon–Sat 8am–10pm', href: 'tel:9152987821' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-labelledby="emergency-title">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 border-2 border-danger-400 rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl" aria-hidden="true">🚨</span>
          </div>
          <h2 id="emergency-title" className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">I'm Here for You</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            I'm concerned about what you've shared. You're not alone — help is available <strong>right now</strong>.
          </p>
        </div>
        <div className="space-y-3 mb-6">
          {CONTACTS.map(c => (
            <a
              key={c.number}
              href={c.href}
              className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors group"
            >
              <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                <span className="text-danger-600 text-lg">📞</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{c.name}</p>
                <p className="text-xs font-mono text-danger-600 dark:text-danger-400">{c.number}</p>
                <p className="text-xs text-slate-500">{c.note}</p>
              </div>
              <span className="text-slate-400 group-hover:text-danger-500 transition-colors">→</span>
            </a>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="danger" fullWidth className="flex-1">
            <span>📞</span> Call 988 Now
          </Button>
          <Button variant="outline" fullWidth className="flex-1" onClick={onClose}>
            Continue Chat
          </Button>
        </div>
        <p className="text-xs text-center text-slate-400 mt-4">
          💙 You matter. Reaching out is the bravest thing you can do.
        </p>
      </div>
    </div>
  )
}
