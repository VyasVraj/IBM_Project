import { useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea, Checkbox } from '../components/ui/Input'
import { SectionHeader } from '../components/ui/index'
import { Mail, Phone, MapPin, MessageCircle, Heart, Send } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', newsletter: false })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1000))
    setSending(false)
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          badge="Contact Us"
          title="Get in Touch"
          subtitle="Have questions, feedback, or need support? We'd love to hear from you."
          className="mb-12"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Send a Message</h2>
            {sent ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">We'll respond within 24 hours.</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setSent(false)}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Your Name" value={form.name} onChange={e => up('name', e.target.value)} placeholder="Alex Johnson" required icon={<Heart size={14} />} />
                <Input label="Email" type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@example.com" required icon={<Mail size={14} />} />
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Subject</label>
                  <select id="subject" value={form.subject} onChange={e => up('subject', e.target.value)}
                    className="w-full h-11 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="">Select a topic...</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Partnership</option>
                    <option>Mental Health Professional</option>
                    <option>Media & Press</option>
                    <option>Crisis Support</option>
                  </select>
                </div>
                <Textarea label="Message" value={form.message} onChange={e => up('message', e.target.value)} placeholder="How can we help?" rows={4} required />
                <Checkbox checked={form.newsletter} onChange={e => up('newsletter', e.target.checked)} label="Subscribe to our wellness newsletter" />
                <Button type="submit" fullWidth loading={sending} icon={<Send size={16} />}>Send Message</Button>
              </form>
            )}
          </Card>
          <div className="space-y-5">
            {[
              { icon: <Mail size={20} />, title: 'Email', value: 'hello@mindguard.ai', sub: 'We respond within 24 hours' },
              { icon: <Phone size={20} />, title: 'Crisis Helpline', value: '988', sub: 'For immediate US crisis support' },
              { icon: <MapPin size={20} />, title: 'Headquarters', value: 'San Francisco, CA', sub: 'IBM Innovation Hub' },
              { icon: <MessageCircle size={20} />, title: 'Support Chat', value: 'Live Chat Available', sub: 'Mon–Fri 9am–6pm PT' },
            ].map(c => (
              <Card key={c.title} hover className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/40 text-primary-600 rounded-xl">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{c.title}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium text-sm">{c.value}</p>
                  <p className="text-xs text-slate-400">{c.sub}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
