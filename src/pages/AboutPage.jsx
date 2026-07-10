import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { SectionHeader } from '../components/ui/index'
import { Heart, Brain, Shield, Globe, Users, MessageCircle, BookOpen, Activity, Lock, Star } from 'lucide-react'

const VALUES = [
  { icon: <Shield size={24} />, title: 'Safety First', desc: 'Every feature is designed with user safety as the absolute priority.' },
  { icon: <Heart size={24} />, title: 'Genuine Empathy', desc: 'We build AI that treats every person with dignity, compassion, and respect.' },
  { icon: <Globe size={24} />, title: 'Universal Access', desc: 'Mental health support should be available to everyone, regardless of background.' },
  { icon: <Brain size={24} />, title: 'Evidence-Based', desc: 'All content and recommendations are grounded in peer-reviewed research.' },
  { icon: <Lock size={24} />, title: 'Privacy & Trust', desc: 'Your data is encrypted. We never sell or share your information.' },
  { icon: <Star size={24} />, title: 'Continuous Improvement', desc: 'We constantly improve our AI to serve users more effectively.' },
]

const IBM_TECH = [
  { name: 'IBM watsonx.ai', desc: 'Foundation model platform powering our AI responses', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  { name: 'IBM Granite Models', desc: 'Enterprise-grade LLMs for safe, empathetic responses', color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300' },
  { name: 'IBM Langflow', desc: 'Visual workflow builder for our agentic AI pipeline', color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300' },
  { name: 'IBM Orchestrate', desc: 'Intelligent workflow automation for crisis routing', color: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300' },
  { name: 'RAG Pipeline', desc: 'Retrieval-Augmented Generation from WHO knowledge base', color: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' },
  { name: 'IBM Carbon Design', desc: 'Accessibility-first design system for our UI', color: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300' },
]

const TEAM = [
  { name: 'Dr. Sarah Chen', role: 'Chief AI Officer', desc: 'PhD Computational Neuroscience, 12 years in mental health tech.' },
  { name: 'Dr. James Rivera', role: 'Clinical Psychologist', desc: 'Licensed psychologist specializing in digital therapeutics and CBT.' },
  { name: 'Priya Sharma', role: 'IBM AI Engineer', desc: 'Lead engineer for IBM watsonx.ai & Granite model integration.' },
  { name: 'Marcus Thompson', role: 'UX & Accessibility Lead', desc: 'Passionate about building tech that serves every human equitably.' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="blob w-80 h-80 top-1/4 left-1/4 bg-primary-600" />
          <div className="blob w-64 h-64 bottom-1/4 right-1/4 bg-secondary-600" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow animate-float">
              <Heart size={40} className="text-white" />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            About <span className="gradient-text">MindGuard AI</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            MindGuard AI was built in response to the global mental health crisis — where 1 in 4 people experience a mental health condition in their lifetime, yet 75% never receive treatment due to barriers of cost, stigma, and access.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="py-12">
          <Card className="max-w-4xl mx-auto text-center p-10">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              To democratize mental health support by leveraging Agentic AI, IBM Foundation Models, and evidence-based psychology —
              creating a compassionate companion that meets people where they are, detects early warning signs, and bridges the gap to professional care.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat"><Button icon={<MessageCircle size={16} />}>Talk to MindGuard AI</Button></Link>
              <Link to="/resources"><Button variant="outline" icon={<BookOpen size={16} />}>Explore Resources</Button></Link>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section className="py-12">
          <SectionHeader badge="Our Values" title="What We Stand For" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card hover className="h-full">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IBM Technologies */}
        <section className="py-12">
          <SectionHeader badge="Powered by IBM" title="IBM Technologies" subtitle="Built on IBM's enterprise-grade AI infrastructure for reliability, safety, and scale." className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IBM_TECH.map((t, i) => (
              <motion.div key={t.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className={`flex gap-3 items-start p-4 rounded-2xl ${t.color}`}>
                  <Brain size={20} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm">{t.name}</h3>
                    <p className="text-xs mt-0.5 opacity-80">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-12">
          <SectionHeader badge="The Team" title="Built by Mental Health & AI Experts" className="mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Card hover className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                    {m.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{m.name}</h3>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2">{m.role}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 mb-8">
          <Card className="max-w-4xl mx-auto bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <h2 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-3 flex items-center gap-2">
              <Shield size={18} /> Important Disclaimer
            </h2>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed mb-2">
              MindGuard AI is an educational and emotional support tool. It is <strong>not a licensed medical service, therapist, or crisis counselor</strong>.
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
              <strong>In a mental health crisis:</strong> Call <strong>988</strong> (US Suicide & Crisis Lifeline) or visit your nearest emergency department immediately.
            </p>
          </Card>
        </section>
      </div>
    </div>
  )
}
