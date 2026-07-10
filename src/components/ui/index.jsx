import { cn } from '../../utils/helpers'

export function ProgressBar({ value = 0, max = 100, label, showValue = false, size = 'md', color = 'primary', animated = true }) {
  const pct = Math.round((value / max) * 100)
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const tracks = {
    primary: 'bg-primary-100 dark:bg-primary-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    warning: 'bg-amber-100 dark:bg-amber-900/30',
    danger: 'bg-red-100 dark:bg-red-900/30',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/30',
    gray: 'bg-slate-100 dark:bg-slate-800',
  }
  const fills = {
    primary: 'from-primary-500 to-primary-600',
    success: 'from-success-500 to-green-500',
    warning: 'from-amber-400 to-amber-500',
    danger: 'from-danger-400 to-danger-500',
    cyan: 'from-accent-400 to-accent-500',
    gray: 'from-slate-300 to-slate-400',
  }
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn('w-full rounded-full overflow-hidden', tracks[color] || tracks.primary, heights[size])}
      >
        <div
          className={cn('h-full rounded-full bg-gradient-to-r', fills[color] || fills.primary, animated && 'transition-all duration-700 ease-out')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function Loader({ size = 'md', color = 'text-primary-600' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div role="status" aria-label="Loading" className="flex items-center justify-center">
      <svg className={cn('animate-spin', color, sizes[size])} viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  )
}

export function Skeleton({ className = '' }) {
  return <div className={cn('animate-pulse bg-slate-200 dark:bg-slate-700 rounded-xl', className)} />
}

export function Divider({ label, className = '' }) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-3 my-4', className)}>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        <span className="text-xs text-slate-400 font-medium">{label}</span>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
      </div>
    )
  }
  return <hr className={cn('border-slate-200 dark:border-slate-700 my-4', className)} />
}

export function SectionHeader({ title, subtitle, badge, className = '', center = true }) {
  return (
    <div className={cn('max-w-2xl', center && 'mx-auto text-center', className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">{subtitle}</p>}
    </div>
  )
}

export function Alert({ type = 'info', title, children, onClose }) {
  const styles = {
    info: 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-200',
    success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    danger: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-danger-800 dark:text-danger-200',
  }
  const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', danger: '🚨' }
  return (
    <div role="alert" className={cn('flex gap-3 items-start p-4 border rounded-2xl', styles[type])}>
      <span className="text-lg flex-shrink-0 mt-0.5">{icons[type]}</span>
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        <div className="text-sm mt-0.5">{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity">✕</button>
      )}
    </div>
  )
}
