import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import { MainLayout } from './layouts/MainLayout'
import { Toaster } from 'react-hot-toast'

// Pages
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ChatPage from './pages/ChatPage'
import MoodTrackerPage from './pages/MoodTrackerPage'
import RAGPage from './pages/RAGPage'
import DashboardPage from './pages/DashboardPage'
import ResourcesPage from './pages/ResourcesPage'
import EmergencyPage from './pages/EmergencyPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import UserDashboard from './pages/UserDashboard'

// Features page (simple)
function FeaturesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center max-w-2xl p-8">
        <h1 className="text-4xl font-bold gradient-text mb-4">Features</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Explore MindGuard AI's comprehensive features for mental wellness support.
        </p>
        <div className="grid grid-cols-2 gap-4 text-left">
          {['AI Chat', 'Mood Tracker', 'RAG System', 'Risk Dashboard', 'Resources', 'Emergency Help'].map(f => (
            <div key={f} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JournalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold gradient-text mb-3">AI Journal</h1>
        <p className="text-slate-500 dark:text-slate-400">Use the RAG page to upload and analyze your journal entries.</p>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="text-center p-8">
        <div className="text-8xl mb-6">😔</div>
        <h1 className="text-4xl font-bold gradient-text mb-4">Page Not Found</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="text-primary-600 font-semibold hover:underline">Go back home →</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                className: '',
                style: {
                  borderRadius: '16px',
                  fontFamily: 'Poppins, system-ui, sans-serif',
                  fontSize: '14px',
                },
              }}
            />
            <Routes>
              {/* Pages with no footer (chat has its own layout) */}
              <Route path="/login" element={<LoginPage />} />

              {/* Main layout pages */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/mood-tracker" element={<MoodTrackerPage />} />
                <Route path="/rag" element={<RAGPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/emergency" element={<EmergencyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/journal" element={<JournalPage />} />
                <Route path="/privacy" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center p-8"><h1 className="text-3xl font-bold gradient-text mb-3">Privacy Policy</h1><p className="text-slate-500 dark:text-slate-400">Your data is encrypted and never shared. You can delete your account at any time.</p></div></div>} />
                <Route path="/terms" element={<div className="min-h-screen flex items-center justify-center"><div className="text-center p-8"><h1 className="text-3xl font-bold gradient-text mb-3">Terms of Service</h1><p className="text-slate-500 dark:text-slate-400">By using MindGuard AI, you agree that this is an educational support tool, not a medical service.</p></div></div>} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
