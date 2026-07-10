import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '../context/ChatContext'
import { Card } from '../components/ui/Card'
import { Button, IconButton } from '../components/ui/Button'
import { Badge, RiskBadge, EmotionBadge } from '../components/ui/Badge'
import { Alert } from '../components/ui/index'
import { EmergencyModal } from '../components/ui/Modal'
import {
  Send, Mic, Trash2, Download, Plus, MessageCircle, AlertTriangle,
  Phone, Smile, X, Paperclip, Volume2, ChevronRight
} from 'lucide-react'
import { cn, EMERGENCY_CONTACTS, formatTime } from '../utils/helpers'

const SUGGESTED = [
  "I've been feeling really anxious lately...",
  "How can I manage stress better?",
  "I can't sleep and feel exhausted",
  "Can you teach me a breathing exercise?",
  "I feel hopeless and alone",
  "What are signs of burnout?",
]

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3" aria-label="AI is typing" role="status">
      <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
        <MessageCircle size={14} className="text-white" />
      </div>
      <div className="bubble-ai px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  const time = formatTime(msg.timestamp)

  // Parse markdown-like bold **text**
  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-end gap-3', isUser && 'flex-row-reverse')}
    >
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold',
        isUser
          ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white'
          : 'bg-gradient-to-br from-primary-600 to-accent-500 text-white'
      )}>
        {isUser ? '👤' : '🤖'}
      </div>
      <div className={cn('max-w-[75%] flex flex-col gap-1', isUser && 'items-end')}>
        <div className={cn(
          'px-4 py-3 text-sm leading-relaxed',
          isUser ? 'bubble-user' : 'bubble-ai text-slate-700 dark:text-slate-200'
        )}>
          {formatContent(msg.content)}
        </div>
        <div className="flex items-center gap-2 px-1">
          <span className="text-[10px] text-slate-400">{time}</span>
          {!isUser && msg.emotion && <EmotionBadge emotion={msg.emotion} />}
          {!isUser && msg.risk && msg.risk !== 'low' && <RiskBadge level={msg.risk} />}
        </div>
      </div>
    </motion.div>
  )
}

function Sidebar({ sessions, onNew, onClear, onExport, currentRisk }) {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-[calc(100vh-64px)] sticky top-16">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <Button fullWidth size="sm" onClick={onNew} icon={<Plus size={16} />}>
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 px-2">History</p>
        {sessions.map(s => (
          <button
            key={s.id}
            className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors truncate"
          >
            {s.title}
          </button>
        ))}
      </div>
      <div className="p-4 space-y-2 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Risk Level</span>
          <RiskBadge level={currentRisk} />
        </div>
        <Button fullWidth variant="ghost" size="sm" onClick={onExport} icon={<Download size={14} />}>
          Export Chat
        </Button>
        <Button fullWidth variant="ghost" size="sm" onClick={onClear} icon={<Trash2 size={14} />} className="text-danger-500">
          Clear Chat
        </Button>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const { messages, isTyping, currentRisk, currentEmotion, sessions, sendMessage, clearChat, newSession, exportChat } = useChat()
  const [input, setInput] = useState('')
  const [showEmergency, setShowEmergency] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (currentRisk === 'high') setShowEmergency(true)
  }, [currentRisk])

  const handleSend = async () => {
    if (!input.trim()) return
    setShowSuggestions(false)
    setInput('')
    await sendMessage(input)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const handleVoice = () => {
    const w = window
    const SRApi = w.webkitSpeechRecognition || w.SpeechRecognition
    if (!SRApi) { alert('Voice input not supported in this browser.'); return }
    const sr = new SRApi()
    sr.lang = 'en-US'
    sr.onresult = (e) => { setInput(prev => prev + ' ' + e.results[0][0].transcript); setIsListening(false) }
    sr.onerror = () => setIsListening(false)
    sr.onend = () => setIsListening(false)
    setIsListening(true)
    sr.start()
  }

  const riskBg = { low: 'text-success-500 bg-green-50 dark:bg-green-950/20', medium: 'text-amber-500 bg-amber-50 dark:bg-amber-950/20', high: 'text-danger-500 bg-red-50 dark:bg-red-950/20' }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <EmergencyModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} />

      {/* Sidebar */}
      <Sidebar sessions={sessions} onNew={newSession} onClear={clearChat} onExport={exportChat} currentRisk={currentRisk} />

      {/* Main Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <MessageCircle size={18} className="text-primary-600" />
                MindGuard AI Chat
              </h1>
              <p className="text-xs text-slate-400">IBM watsonx.ai + Granite • Empathetic Support</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn('text-xs font-semibold px-3 py-1.5 rounded-full border flex items-center gap-1.5', riskBg[currentRisk])}>
                <span className={cn('w-1.5 h-1.5 rounded-full', currentRisk === 'low' ? 'bg-success-500' : currentRisk === 'medium' ? 'bg-amber-500' : 'bg-danger-500 animate-pulse')} />
                {currentRisk.charAt(0).toUpperCase() + currentRisk.slice(1)} Risk
              </span>
              <EmotionBadge emotion={currentEmotion} />
              <IconButton label="Emergency contacts" onClick={() => setShowEmergency(true)} className="text-danger-500">
                <AlertTriangle size={16} />
              </IconButton>
              <div className="flex lg:hidden gap-1">
                <IconButton label="Clear chat" onClick={clearChat}><Trash2 size={16} /></IconButton>
                <IconButton label="Export" onClick={exportChat}><Download size={16} /></IconButton>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {currentRisk === 'medium' && (
            <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <AlertTriangle size={14} />
              Elevated stress detected. I'm here to support you.
            </div>
          )}
          {currentRisk === 'high' && (
            <div className="mt-2 p-2 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 rounded-xl text-xs text-danger-700 dark:text-danger-300 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2"><AlertTriangle size={14} /> Crisis support available — help is here.</div>
              <button onClick={() => setShowEmergency(true)} className="font-bold underline">View resources →</button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800 px-4 py-2">
          <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
            <strong>Disclaimer:</strong> This AI provides educational and emotional support only. It is NOT a replacement for licensed mental health professionals.
          </p>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50 dark:bg-slate-900/50"
          role="log"
          aria-label="Chat messages"
          aria-live="polite"
        >
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {showSuggestions && messages.length <= 1 && (
          <div className="px-4 py-3 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
            <p className="text-xs text-slate-400 font-medium mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q); inputRef.current?.focus() }}
                  className="text-xs bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700 px-3 py-1.5 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-3 sm:p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Share how you're feeling... (Enter to send)"
                rows={2}
                className="w-full bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                aria-label="Type your message"
              />
            </div>
            <div className="flex flex-col gap-2">
              <IconButton
                label={isListening ? 'Stop voice input' : 'Voice input'}
                onClick={handleVoice}
                variant={isListening ? 'filled' : 'ghost'}
                className={isListening ? 'text-danger-500 animate-pulse' : ''}
              >
                <Mic size={18} />
              </IconButton>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="md"
                icon={<Send size={16} />}
                aria-label="Send message"
              >
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>

          {/* Bottom quick actions */}
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-slate-400">In crisis?</span>
            <a href="tel:988" className="text-xs font-semibold text-danger-500 hover:underline flex items-center gap-1">
              <Phone size={11} /> Call 988
            </a>
            <button onClick={() => setShowEmergency(true)} className="text-xs font-semibold text-primary-600 hover:underline">
              Emergency Resources →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
