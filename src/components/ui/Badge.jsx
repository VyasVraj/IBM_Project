import { cn } from '../../utils/helpers'

export function Badge({ children, variant = 'default', size = 'sm', dot = false }) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    primary: 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300',
    success: 'bg-green-100 dark:bg-green-900/40 text-success-700 dark:text-green-300',
    warning: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    danger: 'bg-red-100 dark:bg-red-900/40 text-danger-700 dark:text-danger-300',
    info: 'bg-cyan-100 dark:bg-cyan-900/40 text-accent-600 dark:text-accent-400',
    secondary: 'bg-purple-100 dark:bg-purple-900/40 text-secondary-700 dark:text-purple-300',
  }
  const dotColors = {
    default: 'bg-slate-400', primary: 'bg-primary-500',
    success: 'bg-success-500', warning: 'bg-amber-500',
    danger: 'bg-danger-500', info: 'bg-accent-500', secondary: 'bg-secondary-500',
  }
  const sizes = { sm: 'text-xs px-2.5 py-1', md: 'text-sm px-3 py-1.5' }
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-semibold rounded-full', variants[variant], sizes[size])}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  )
}

export function RiskBadge({ level }) {
  const config = {
    low: { variant: 'success', label: '✓ Low Risk' },
    medium: { variant: 'warning', label: '⚠ Medium Risk' },
    high: { variant: 'danger', label: '! High Risk' },
  }
  const { variant, label } = config[level] || config.low
  return <Badge variant={variant} size="md" dot>{label}</Badge>
}

export function EmotionBadge({ emotion }) {
  const map = {
    joy: '😊', sadness: '😢', anger: '😤', fear: '😰',
    anxiety: '😟', hope: '✨', neutral: '😐', burnout: '😔',
    stressed: '😰', hopeful: '🌟',
  }
  return (
    <Badge variant="info">
      {map[emotion] || '💭'} {emotion ? emotion.charAt(0).toUpperCase() + emotion.slice(1) : 'Neutral'}
    </Badge>
  )
}
