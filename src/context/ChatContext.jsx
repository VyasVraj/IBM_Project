import { createContext, useContext, useState, useCallback } from 'react'
import { detectRisk, detectEmotion, generateAIResponse } from '../services/graniteService'

const ChatContext = createContext()

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant',
  content: `Hello! I'm **MindGuard AI**, your compassionate mental wellness companion. 💙

I'm here to listen, support, and share evidence-based mental health information. You can:
- Share how you're feeling
- Ask about coping strategies  
- Learn about stress and anxiety management
- Get connected to crisis resources

*This AI provides educational support only — not a substitute for professional care.*

How are you feeling today?`,
  timestamp: new Date(),
  emotion: 'hope',
  risk: 'low',
}

export function ChatProvider({ children }) {
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [isTyping, setIsTyping] = useState(false)
  const [currentRisk, setCurrentRisk] = useState('low')
  const [currentEmotion, setCurrentEmotion] = useState('neutral')
  const [sessions, setSessions] = useState([{ id: 'session-1', title: 'Current Session', messages: [WELCOME_MSG] }])
  const [activeSession, setActiveSession] = useState('session-1')

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return
    const userMsg = { id: `u-${Date.now()}`, role: 'user', content: text, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    const risk = detectRisk(text)
    const emotion = detectEmotion(text)
    setCurrentRisk(risk)
    setCurrentEmotion(emotion)

    await new Promise(r => setTimeout(r, 1000 + Math.random() * 800))
    const aiContent = generateAIResponse(text, emotion, risk)
    const aiMsg = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: aiContent,
      timestamp: new Date(),
      emotion,
      risk,
    }
    setIsTyping(false)
    setMessages(prev => [...prev, aiMsg])
  }, [])

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MSG])
    setCurrentRisk('low')
    setCurrentEmotion('neutral')
  }, [])

  const newSession = useCallback(() => {
    const id = `session-${Date.now()}`
    setSessions(prev => [...prev, { id, title: `Session ${prev.length + 1}`, messages: [WELCOME_MSG] }])
    setActiveSession(id)
    setMessages([WELCOME_MSG])
    setCurrentRisk('low')
    setCurrentEmotion('neutral')
  }, [])

  const exportChat = useCallback(() => {
    const text = messages
      .map(m => `[${new Date(m.timestamp).toLocaleTimeString()}] ${m.role === 'user' ? 'You' : 'MindGuard AI'}: ${m.content}`)
      .join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mindguard-chat-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [messages])

  return (
    <ChatContext.Provider value={{
      messages, isTyping, currentRisk, currentEmotion,
      sessions, activeSession,
      sendMessage, clearChat, newSession, exportChat,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
