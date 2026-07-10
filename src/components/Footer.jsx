import { Link } from 'react-router-dom'
import { Heart, Mail, GitBranch, Link2, Globe } from 'lucide-react'

export function Footer() {
  const sections = {
    Product: [
      { label: 'AI Chat', to: '/chat' },
      { label: 'Mood Tracker', to: '/mood-tracker' },
      { label: 'Resources', to: '/resources' },
      { label: 'Dashboard', to: '/dashboard' },
    ],
    Company: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
    Support: [
      { label: 'Emergency Help', to: '/emergency' },
      { label: 'Crisis Hotlines', to: '/emergency' },
      { label: 'Features', to: '/features' },
      { label: 'RAG System', to: '/rag' },
    ],
  }

  return (
    <footer className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">MindGuard AI</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
              Agentic AI for Mental Health Awareness & Suicide Prevention. Evidence-based support powered by IBM watsonx.ai & Granite Models.
            </p>
            <div className="flex gap-3">
              {[
                { href: 'https://github.com', Icon: GitBranch, label: 'GitHub' },
                { href: 'https://linkedin.com', Icon: Link2, label: 'LinkedIn' },
                { href: 'mailto:hello@mindguard.ai', Icon: Mail, label: 'Email' },
                { href: '#', Icon: Globe, label: 'Website' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          {/* Links */}
          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* IBM Stack */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Globe size={14} />
              <span>Powered by <strong>IBM watsonx.ai</strong> · <strong>IBM Granite Models</strong> · <strong>IBM Langflow</strong> · <strong>IBM Orchestrate</strong></span>
            </p>
            <p className="text-xs text-slate-400">© {new Date().getFullYear()} MindGuard AI. Support, not medical advice.</p>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
              <strong>⚠️ Disclaimer:</strong> MindGuard AI provides educational and emotional support only. It is NOT a replacement for licensed mental health professionals.
              In crisis: Call <strong>988</strong> (US) or visit your nearest emergency department.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
