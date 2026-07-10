import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Card, GradientCard, StatCard } from '../components/ui/Card'
import { SectionHeader } from '../components/ui/index'
import { Brain, Search, Heart, BarChart2, Phone, MessageCircle, Shield, Zap, Users, Globe, Lock, Star, ArrowRight } from 'lucide-react'
import { QUOTES } from '../utils/helpers'

const FEATURES = [
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'Awareness & Education',
    desc: 'Explore mindfulness practices, coping strategies, and evidence-based mental wellness resources curated from WHO guidelines.',
    bg: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600',
    href: '/resources',
    badge: 'Education',
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: 'RAG Early Detection',
    desc: 'Our Retrieval-Augmented Generation engine analyzes conversations and journals to detect emotional distress patterns early.',
    bg: 'bg-purple-100 dark:bg-purple-900/30 text-secondary-600',
    href: '/rag',
    badge: 'AI-Powered',
  },
  {
    icon: <Heart className="w-7 h-7" />,
    title: 'Empathetic AI',
    desc: 'Compassionate AI conversations powered by IBM Granite — listening actively, validating feelings, never judging.',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30 text-accent-500',
    href: '/chat',
    badge: 'Live Chat',
    disclaimer: true,
  },
  {
    icon: <BarChart2 className="w-7 h-7" />,
    title: 'Stress Prediction',
    desc: 'AI-powered forecasting of emotional trends, burnout risk, and mood patterns — up to 7 days ahead.',
    bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
    href: '/dashboard',
    badge: 'Predictive',
  },
  {
    icon: <Phone className="w-7 h-7" />,
    title: 'Emergency Support',
    desc: 'Instant connection to international crisis helplines, licensed counselors, and emergency resources — always available.',
    bg: 'bg-red-100 dark:bg-red-900/30 text-danger-500',
    href: '/emergency',
    badge: 'Crisis',
  },
]

const STATS = [
  { label: 'People Supported', value: '12,500+', icon: <Users size={24} />, color: 'primary' },
  { label: 'AI Sessions', value: '48,200+', icon: <MessageCircle size={24} />, color: 'cyan' },
  { label: 'Resources', value: '350+', icon: <Globe size={24} />, color: 'green' },
  { label: 'Emergency Contacts', value: '24/7', icon: <Phone size={24} />, color: 'amber' },
]

const WORKFLOW = [
  { step: '01', title: 'User Message', desc: 'You share how you\'re feeling in natural language', icon: <MessageCircle size={20} /> },
  { step: '02', title: 'Emotion Detection', desc: 'IBM Granite analyzes emotional tone & sentiment', icon: <Brain size={20} /> },
  { step: '03', title: 'RAG Retrieval', desc: 'WHO knowledge base documents retrieved', icon: <Search size={20} /> },
  { step: '04', title: 'Risk Analysis', desc: 'AI assesses low / medium / high risk level', icon: <Shield size={20} /> },
  { step: '05', title: 'Granite LLM', desc: 'IBM Granite generates empathetic response', icon: <Zap size={20} /> },
  { step: '06', title: 'Safe Response', desc: 'Safety-filtered, compassionate reply delivered', icon: <Heart size={20} /> },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' } }),
}

function HeroSection() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setQuoteIdx(i => (i + 1) % QUOTES.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="blob w-96 h-96 top-1/4 left-1/4 bg-primary-600" />
        <div className="blob w-80 h-80 bottom-1/4 right-1/4 bg-secondary-600" style={{ animationDelay: '1.5s' }} />
        <div className="blob w-64 h-64 top-1/2 right-1/3 bg-accent-500" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-primary-700 dark:text-primary-300 text-xs font-bold px-5 py-2 rounded-full border border-primary-200 dark:border-primary-700 mb-8 shadow-lg">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            Powered by IBM watsonx.ai & Granite Models
            <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-800 dark:text-white leading-[1.1] mb-6"
        >
          Agentic AI for{' '}
          <span className="gradient-text">Mental Health</span>
          <br />& Suicide Prevention
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Helping people through empathy, education, and intelligent early intervention powered by IBM AI.
        </motion.p>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {['Early Detection', 'Empathetic Support', 'Risk Prediction', 'Human Connection'].map(p => (
            <span key={p} className="inline-flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
              ✓ {p}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link to="/chat">
            <Button size="xl" icon={<MessageCircle size={20} />}>
              Start Conversation
            </Button>
          </Link>
          <Link to="/resources">
            <Button size="xl" variant="outline" icon={<Globe size={20} />}>
              Explore Resources
            </Button>
          </Link>
        </motion.div>

        {/* Quote card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="max-w-xl mx-auto glass-card rounded-2xl p-5 mb-12"
          role="complementary"
          aria-label="Inspirational quote"
        >
          <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{QUOTES[quoteIdx].text}"</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">— {QUOTES[quoteIdx].author}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { v: '280M+', l: 'People with Depression (WHO)' },
            { v: '94%', l: 'AI Emotion Accuracy' },
            { v: '24/7', l: 'Support Available' },
            { v: 'Free', l: 'Always Free to Use' },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-bold gradient-text">{v}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="section-pad bg-slate-50/50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Core Features"
          title="Everything You Need for Mental Wellness"
          subtitle="From early detection to empathetic support — powered by Agentic AI and IBM watsonx."
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <Link to={f.href}>
                <Card hover className="h-full group">
                  <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    {f.icon}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{f.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${f.bg}`}>{f.badge}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                  {f.disclaimer && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-2.5">
                      ⚠️ Not a substitute for professional medical advice.
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={s.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <StatCard label={s.label} value={s.value} icon={s.icon} color={s.color} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkflowSection() {
  return (
    <section className="section-pad bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)' }} aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          badge="IBM Agentic AI Workflow"
          title="How MindGuard AI Works"
          subtitle="A multi-step agentic pipeline ensuring every response is safe, empathetic, and evidence-based."
          className="mb-16 [&_h2]:text-white [&_p]:text-white/80"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORKFLOW.map((w, i) => (
            <motion.div
              key={w.step}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="flex gap-4 items-start bg-white/15 backdrop-blur border border-white/20 rounded-2xl p-5 hover:-translate-y-1 hover:bg-white/20 transition-all"
            >
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">{w.step}</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="opacity-80">{w.icon}</span>
                  <h3 className="font-bold">{w.title}</h3>
                </div>
                <p className="text-sm text-white/75">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="section-pad">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="p-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-8 animate-float">
            <Heart size={36} className="text-white" />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Your Mental Health Journey Starts Here</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
            You deserve support, understanding, and tools that help you thrive. MindGuard AI is free, private, and available whenever you need it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login"><Button size="xl" icon={<Heart size={18} />}>Start Your Journey — Free</Button></Link>
            <Link to="/emergency"><Button size="xl" variant="outline" icon={<Shield size={18} />}>Crisis Resources</Button></Link>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <WorkflowSection />
      <CTASection />
    </>
  )
}
