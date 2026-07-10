import { cn } from '../../utils/helpers'

export function Input({ label, error, hint, icon, iconRight, className = '', id, required, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {label}{required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</div>}
        <input
          id={inputId}
          required={required}
          className={cn(
            'w-full h-11 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            error ? 'border-danger-400 dark:border-danger-500' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600',
            icon ? 'pl-10 pr-4' : 'px-4',
            iconRight ? 'pr-10' : '',
            className
          )}
          {...props}
        />
        {iconRight && <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">{iconRight}</div>}
      </div>
      {error && <p className="mt-1.5 text-xs text-danger-500">⚠ {error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  )
}

export function Textarea({ label, error, hint, className = '', id, required, ...props }) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
          {label}{required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        required={required}
        className={cn(
          'w-full bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none px-4 py-3',
          error ? 'border-danger-400' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger-500">⚠ {error}</p>}
      {hint && !error && <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{hint}</p>}
    </div>
  )
}

export function Checkbox({ label, error, className = '', ...props }) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className={cn('mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary-600 focus:ring-primary-500 cursor-pointer', className)}
          {...props}
        />
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      </label>
      {error && <p className="mt-1 text-xs text-danger-500 ml-7">⚠ {error}</p>}
    </div>
  )
}
