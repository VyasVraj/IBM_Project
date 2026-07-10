import { useState, useMemo } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { SectionHeader } from '../components/ui/index'
import { Search, BookOpen, Play, Headphones, BookMarked, ExternalLink, Shield, Phone } from 'lucide-react'
import { EMERGENCY_CONTACTS, cn } from '../utils/helpers'

const CATEGORIES = ['All', 'Anxiety', 'Depression', 'Stress', 'Mindfulness', 'Meditation', 'Self Care', 'Sleep', 'Breathing']

const RESOURCES = [
  { id: 1, title: 'Mindfulness-Based Stress Reduction (MBSR)', desc: 'An 8-week evidence-based program using mindfulness meditation to alleviate suffering and reduce chronic stress.', category: 'Mindfulness', type: 'article', author: 'Jon Kabat-Zinn', time: '8 min', featured: true },
  { id: 2, title: 'Understanding Anxiety: WHO Perspective', desc: 'Comprehensive guide on anxiety disorders, prevalence, treatment options, and self-management from the World Health Organization.', category: 'Anxiety', type: 'article', author: 'WHO', time: '12 min', featured: true },
  { id: 3, title: 'The Science of Sleep & Mental Health', desc: 'How sleep quality impacts emotional regulation, anxiety, depression risk, and cognitive function — plus proven improvement techniques.', category: 'Sleep', type: 'article', author: 'Sleep Foundation', time: '10 min', featured: false },
  { id: 4, title: 'Box Breathing for Immediate Calm', desc: 'A Navy SEAL–approved 4-count breathing technique proven in clinical settings to reduce anxiety within minutes.', category: 'Breathing', type: 'article', author: 'Dr. Andrew Huberman', time: '5 min', featured: true },
  { id: 5, title: 'CBT: A Complete Guide', desc: 'Introduction to Cognitive Behavioral Therapy — the gold-standard evidence-based treatment for depression, anxiety, and PTSD.', category: 'Depression', type: 'article', author: 'Beck Institute', time: '15 min', featured: false },
  { id: 6, title: 'Exercise as Medicine for Depression', desc: '30 minutes of aerobic exercise 3–5× per week is as effective as antidepressants for mild-to-moderate depression.', category: 'Self Care', type: 'article', author: 'Harvard Medical School', time: '7 min', featured: false },
  { id: 7, title: 'Guided Body Scan Meditation', desc: 'A 20-minute guided mindfulness practice focusing on progressive body awareness and tension release.', category: 'Meditation', type: 'video', author: 'Tara Brach', time: '20 min', featured: true },
  { id: 8, title: 'Nutrition and the Gut-Brain Axis', desc: 'Emerging research on how diet influences mental health through the microbiome and practical dietary recommendations.', category: 'Self Care', type: 'article', author: 'Drew Ramsey MD', time: '11 min', featured: false },
  { id: 9, title: 'Managing Stress in the Modern World', desc: 'Evidence-based strategies for chronic stress management: boundary setting, time management, nervous system regulation.', category: 'Stress', type: 'podcast', author: 'Dr. Robert Sapolsky', time: '45 min', featured: false },
  { id: 10, title: '5-4-3-2-1 Grounding Technique', desc: 'Simple yet powerful sensory grounding technique for anxiety and panic attacks, used in trauma-informed therapy.', category: 'Anxiety', type: 'article', author: 'DBT Therapy Guide', time: '4 min', featured: false },
  { id: 11, title: 'Progressive Muscle Relaxation', desc: 'Systematic tensing and relaxing muscle groups to release physical stress and prepare for deep sleep.', category: 'Sleep', type: 'video', author: 'Dr. Edmund Jacobson', time: '15 min', featured: false },
  { id: 12, title: 'Understanding Burnout', desc: 'WHO-recognized occupational burnout: causes, symptoms, and the road to recovery through boundary setting.', category: 'Stress', type: 'article', author: 'WHO / HBR', time: '9 min', featured: false },
]

const TYPE_ICON = {
  article: <BookOpen size={14} />,
  video: <Play size={14} />,
  podcast: <Headphones size={14} />,
  book: <BookMarked size={14} />,
}
const TYPE_COLOR = { article: 'primary', video: 'success', podcast: 'info', book: 'warning' }

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() =>
    RESOURCES.filter(r => {
      const matchCat = activeCategory === 'All' || r.category === activeCategory
      const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    }), [activeCategory, search])

  const featured = useMemo(() => RESOURCES.filter(r => r.featured), [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          badge="Knowledge Hub"
          title="Mental Health Resources"
          subtitle="Evidence-based articles, videos, and podcasts curated from WHO guidelines and leading mental health organizations."
          className="mb-8"
        />

        {/* Crisis section */}
        <section id="crisis" className="mb-8 p-5 bg-red-50 dark:bg-red-950/20 border-2 border-red-300 dark:border-red-700 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-danger-600 dark:text-danger-400" />
            <h2 className="font-bold text-danger-800 dark:text-danger-200 text-lg">Crisis Support — Available 24/7</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {EMERGENCY_CONTACTS.slice(0, 6).map(c => (
              <a
                key={c.number}
                href={c.type === 'phone' ? `tel:${c.number.replace(/\D/g, '')}` : `https://${c.number}`}
                target={c.type === 'web' ? '_blank' : undefined}
                rel={c.type === 'web' ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-xl hover:border-red-400 transition-all group"
              >
                <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg flex-shrink-0">
                  <Phone size={14} className="text-danger-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{c.name}</p>
                  <p className="text-xs text-danger-600 font-mono">{c.number}</p>
                  <p className="text-[10px] text-slate-400">{c.country} · {c.available}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Featured */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">⭐ Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map(r => (
              <Card key={r.id} hover className="flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={TYPE_COLOR[r.type]}>{TYPE_ICON[r.type]}{r.type}</Badge>
                  <Badge variant="default">{r.category}</Badge>
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm">{r.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex-1 leading-relaxed">{r.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-400">{r.author} · {r.time}</p>
                  <button className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                    Open <ExternalLink size={11} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full h-11 pl-10 pr-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                aria-pressed={activeCategory === c}
                className={cn(
                  'px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex-shrink-0',
                  activeCategory === c
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* All Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-400">No resources found. Try a different search.</div>
          ) : filtered.map(r => (
            <Card key={r.id} hover className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={TYPE_COLOR[r.type]}>{TYPE_ICON[r.type]}{r.type}</Badge>
                <Badge variant="default" size="sm">{r.category}</Badge>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm">{r.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex-1 leading-relaxed mb-3">{r.desc}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-400">{r.author} · {r.time}</p>
                <button className="flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                  Read More <ExternalLink size={11} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
