import { cn } from '../../utils/helpers'

/**
 * Button Component
 * Supports: primary, secondary, outline, ghost, danger, success variants
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 select-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-95'

  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:from-primary-700 hover:to-secondary-700 shadow-lg shadow-primary-200 dark:shadow-primary-900/40',
    secondary: 'bg-gradient-to-r from-accent-500 to-primary-600 text-white hover:from-accent-600 hover:to-primary-700 shadow-lg shadow-accent-200/50 dark:shadow-accent-900/40',
    outline: 'border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950',
    ghost: 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
    danger: 'bg-gradient-to-r from-danger-500 to-red-600 text-white hover:from-danger-600 hover:to-red-700 shadow-lg shadow-red-200/50',
    success: 'bg-gradient-to-r from-success-500 to-emerald-500 text-white hover:from-success-600 hover:to-emerald-600 shadow-lg shadow-green-200/50',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5 h-8',
    md: 'text-sm px-4 py-2.5 h-10',
    lg: 'text-base px-6 py-3 h-12',
    xl: 'text-lg px-8 py-4 h-14',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? <span aria-hidden="true">{icon}</span> : null}
      {children}
      {iconRight && !loading && <span aria-hidden="true">{iconRight}</span>}
    </button>
  )
}

export function IconButton({ children, label, variant = 'ghost', size = 'md', className = '', ...props }) {
  const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12' }
  const variants = {
    ghost: 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200',
    filled: 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/60',
    outline: 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800',
  }
  return (
    <button
      aria-label={label}
      title={label}
      className={cn('inline-flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90', sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
