import { cn } from '../../utils/helpers'

export function Card({ children, className = '', hover = false, glass = false, padding = 'md', ...props }) {
  const paddings = { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' }
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        glass
          ? 'glass-card'
          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card',
        hover && 'card-hover cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function GradientCard({ children, from = 'from-primary-600', to = 'to-secondary-600', className = '' }) {
  return (
    <div className={cn('relative overflow-hidden rounded-2xl p-6 text-white', `bg-gradient-to-br ${from} ${to}`, className)}>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.4) 0%, transparent 60%)' }} />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function StatCard({ label, value, icon, trend, color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400',
    cyan: 'bg-cyan-100 dark:bg-cyan-900/40 text-accent-500 dark:text-accent-400',
    green: 'bg-green-100 dark:bg-green-900/40 text-success-500 dark:text-green-400',
    amber: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400',
    red: 'bg-red-100 dark:bg-red-900/40 text-danger-500 dark:text-danger-400',
  }
  return (
    <Card hover>
      <div className="flex items-start gap-4">
        {icon && <div className={cn('p-3 rounded-xl flex-shrink-0', colorMap[color])}>{icon}</div>}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-0.5">{value}</p>
          {trend && (
            <p className={cn('text-xs font-medium mt-1', trend.positive ? 'text-success-500' : 'text-danger-500')}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% vs last week
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
