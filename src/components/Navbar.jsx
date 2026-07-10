import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { Button, IconButton } from './ui/Button'
import { Sun, Moon, Menu, X, Heart, Shield, User, LogOut } from 'lucide-react'
import { cn } from '../utils/helpers'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/features', label: 'Features' },
  { to: '/chat', label: 'AI Chat' },
  { to: '/mood-tracker', label: 'Mood Tracker' },
  { to: '/resources', label: 'Resources' },
  { to: '/emergency', label: 'Emergency', className: 'text-danger-500 dark:text-danger-400 font-bold' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    cn(
      'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50" role="navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="MindGuard AI Home">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold gradient-text">MindGuard AI</span>
              <p className="text-[10px] text-slate-400 -mt-0.5">Mental Wellness Companion</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => cn(linkClass({ isActive }), link.className)}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <IconButton label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </IconButton>
            {isAuthenticated ? (
              <>
                <IconButton label="Profile" onClick={() => navigate('/dashboard')}>
                  <User className="w-5 h-5" />
                </IconButton>
                <IconButton label="Logout" onClick={logout}>
                  <LogOut className="w-5 h-5" />
                </IconButton>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="md">Login</Button>
                </Link>
                <Link to="/login">
                  <Button size="md">Get Started</Button>
                </Link>
              </div>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <div className="py-3 space-y-1">
                {NAV_LINKS.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => cn(
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                      isActive ? 'bg-primary-100 dark:bg-primary-900/40 text-primary-700' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
                      link.className
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
                {!isAuthenticated && (
                  <>
                    <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-sm font-semibold text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
