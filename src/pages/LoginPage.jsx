import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Input, Checkbox } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Alert } from '../components/ui/index'
import { Heart, Mail, Lock, Eye, EyeOff, User, Shield } from 'lucide-react'

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', remember: false, consent: false })
  const [showPw, setShowPw] = useState(false)
  const [formErr, setFormErr] = useState({})

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required.'
    if (!form.email) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < (mode === 'login' ? 6 : 8)) e.password = `Min ${mode === 'login' ? 6 : 8} characters.`
    if (mode === 'register' && form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    if (mode === 'register' && !form.consent) e.consent = 'Please accept the terms to continue.'
    setFormErr(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    const result = await login(form.email, form.password)
    if (result?.success !== false) navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-12 hero-mesh">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="blob w-80 h-80 top-1/4 left-1/4 bg-primary-600" />
        <div className="blob w-64 h-64 bottom-1/4 right-1/4 bg-secondary-600" style={{ animationDelay: '2s' }} />
      </div>
      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-glow">
              <Heart size={28} className="text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">MindGuard AI</span>
          </Link>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            {mode === 'login' ? 'Welcome back. Your journey continues.' : 'Create your free account.'}
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setFormErr({}) }}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl transition-all ${mode === m ? 'bg-white dark:bg-slate-900 shadow text-primary-600 dark:text-primary-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'}`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <Card>
          {error && <div className="mb-4"><Alert type="danger" title="Authentication failed" onClose={() => {}}>{error}</Alert></div>}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {mode === 'register' && (
              <Input label="Full Name" type="text" value={form.name} onChange={e => up('name', e.target.value)}
                error={formErr.name} icon={<User size={16} />} placeholder="Alex Johnson" required />
            )}
            <Input label="Email Address" type="email" value={form.email} onChange={e => up('email', e.target.value)}
              error={formErr.email} icon={<Mail size={16} />} placeholder="you@example.com" autoComplete="email" required />
            <Input
              label="Password" type={showPw ? 'text' : 'password'}
              value={form.password} onChange={e => up('password', e.target.value)}
              error={formErr.password} icon={<Lock size={16} />}
              iconRight={<button type="button" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide' : 'Show'}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>}
              placeholder="••••••••" autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              hint={mode === 'register' ? 'Minimum 8 characters' : null} required
            />
            {mode === 'register' && (
              <Input label="Confirm Password" type="password" value={form.confirm} onChange={e => up('confirm', e.target.value)}
                error={formErr.confirm} icon={<Lock size={16} />} placeholder="Confirm your password" required />
            )}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</button>
              </div>
            )}
            {mode === 'register' && (
              <Checkbox
                checked={form.consent}
                onChange={e => up('consent', e.target.checked)}
                error={formErr.consent}
                label={<span>I agree to the <Link to="/terms" className="text-primary-600 underline">Terms</Link> and <Link to="/privacy" className="text-primary-600 underline">Privacy Policy</Link>. I understand this is not a medical service.</span>}
              />
            )}
            <Button type="submit" fullWidth size="lg" loading={isLoading}>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
            <p className="text-xs text-slate-500">Demo: any email + 6+ character password</p>
          </div>
          <div className="mt-4 flex items-start gap-2 p-3 bg-primary-50 dark:bg-primary-950/20 border border-primary-200 dark:border-primary-800 rounded-xl">
            <Shield size={14} className="text-primary-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-primary-700 dark:text-primary-300">Your data is encrypted and never shared. Delete your account at any time.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
