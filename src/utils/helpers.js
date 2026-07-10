// ============================================================
// MindGuard AI – Shared Utilities
// ============================================================

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function formatTime(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function getRiskColor(risk) {
  switch (risk) {
    case 'high': return 'text-danger-500'
    case 'medium': return 'text-yellow-500'
    default: return 'text-success-500'
  }
}

export function getRiskBg(risk) {
  switch (risk) {
    case 'high': return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800 text-danger-600 dark:text-danger-400'
    case 'medium': return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400'
    default: return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800 text-success-600 dark:text-success-400'
  }
}

export function getMoodEmoji(score) {
  if (score >= 4.5) return '😄'
  if (score >= 3.5) return '🙂'
  if (score >= 2.5) return '😐'
  if (score >= 1.5) return '😔'
  return '😭'
}

export function getMoodLabel(score) {
  if (score >= 4.5) return 'Excellent'
  if (score >= 3.5) return 'Good'
  if (score >= 2.5) return 'Neutral'
  if (score >= 1.5) return 'Low'
  return 'Very Low'
}

export function truncate(str, max = 100) {
  return str.length > max ? str.slice(0, max) + '...' : str
}

export const EMERGENCY_CONTACTS = [
  { name: '988 Suicide & Crisis Lifeline', number: '988', country: 'US', available: '24/7', type: 'phone' },
  { name: 'Crisis Text Line', number: '741741', country: 'US', available: '24/7', type: 'text', prefix: 'HOME' },
  { name: 'NAMI HelpLine', number: '1-800-950-6264', country: 'US', available: 'Mon–Fri 10am–10pm ET', type: 'phone' },
  { name: 'Samaritans', number: '116 123', country: 'UK', available: '24/7', type: 'phone' },
  { name: 'iCall', number: '9152987821', country: 'India', available: 'Mon–Sat 8am–10pm', type: 'phone' },
  { name: 'Beyond Blue', number: '1300 22 4636', country: 'Australia', available: '24/7', type: 'phone' },
  { name: 'International Resources', number: 'iasp.info', country: 'Global', available: '24/7', type: 'web' },
]

export const QUOTES = [
  { text: "You don't have to control your thoughts. You just have to stop letting them control you.", author: "Dan Millman" },
  { text: "Mental health needs more sunlight, more candor, and more unashamed conversation.", author: "Glenn Close" },
  { text: "Self-care is not self-indulgence. It is self-preservation.", author: "Audre Lorde" },
  { text: "Recovery is not one and done. It is a lifelong journey, one day at a time.", author: "Unknown" },
  { text: "Asking for help is the first step. You are more capable than you know.", author: "Unknown" },
  { text: "It's okay to not be okay — as long as you don't give up.", author: "Unknown" },
]

export function randomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}
