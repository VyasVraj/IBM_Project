/**
 * MindGuard AI – Mood Service
 */

const MOOD_STORAGE_KEY = 'mindguard-moods'

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(MOOD_STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function saveAll(entries) {
  localStorage.setItem(MOOD_STORAGE_KEY, JSON.stringify(entries))
}

export function saveMoodEntry(entry) {
  const entries = getAll()
  const newEntry = {
    id: `mood-${Date.now()}`,
    ...entry,
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
  }
  entries.unshift(newEntry)
  saveAll(entries.slice(0, 90)) // Keep 90 days
  return newEntry
}

export function getMoodHistory(days = 30) {
  return getAll().slice(0, days)
}

export function getMoodStats() {
  const entries = getAll().slice(0, 7)
  if (entries.length === 0) return null

  const avg = entries.reduce((sum, e) => sum + (e.mood || 5), 0) / entries.length
  const avgStress = entries.reduce((sum, e) => sum + (e.stress || 3), 0) / entries.length
  const avgSleep = entries.reduce((sum, e) => sum + (e.sleep || 7), 0) / entries.length

  return {
    avgMood: parseFloat(avg.toFixed(1)),
    avgStress: parseFloat(avgStress.toFixed(1)),
    avgSleep: parseFloat(avgSleep.toFixed(1)),
    trend: avg >= 3.5 ? 'positive' : avg >= 2.5 ? 'stable' : 'declining',
    entryCount: entries.length,
  }
}

export function generateMoodInsight(mood, stress, sleep) {
  if (mood >= 4 && stress <= 3) return 'You\'re having a great day! Keep nurturing these positive conditions — your mental wellness is thriving.'
  if (sleep < 6) return 'Sleep deprivation is significantly impacting your mood and stress. Prioritize 7–9 hours tonight — it\'s the foundation of mental wellness.'
  if (stress >= 7) return 'Your stress level is high. Try 4-7-8 breathing and a short walk — even 10 minutes of movement reduces cortisol by 20%.'
  if (mood <= 2) return 'Your mood is low today. Be gentle with yourself. Consider reaching out to a trusted friend or trying a 5-minute gratitude practice.'
  return 'You\'re maintaining reasonable emotional balance. Consistent small self-care habits compound into significant wellness improvements over time.'
}

// Generate demo chart data
export function getDemoChartData(days = 7) {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, days)
  return labels.map((day, i) => ({
    day,
    mood: parseFloat((3 + Math.sin(i * 0.7) * 1.2 + Math.random() * 0.5).toFixed(1)),
    stress: parseFloat((3.5 + Math.cos(i * 0.5) * 1.5 + Math.random() * 0.5).toFixed(1)),
    sleep: parseFloat((6.5 + Math.sin(i * 0.4) * 1 + Math.random() * 0.3).toFixed(1)),
  }))
}

// Risk trend data for dashboard (14-day window)
export function getRiskTrendData(n = 14) {
  return Array.from({ length: n }, (_, i) => ({
    day: `Day ${i + 1}`,
    stress: Math.round(20 + Math.sin(i * 0.5) * 15 + Math.random() * 10),
    mood: parseFloat((3 + Math.sin(i * 0.4) * 1.2 + Math.random() * 0.5).toFixed(1)),
  }))
}

// Burnout forecast data (7-day window)
export function getBurnoutForecastData() {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
    day,
    burnout: Math.round(30 + i * 6 + Math.random() * 8),
    predicted: i >= 4,
  }))
}

// Monthly overview chart data
export function getMonthlyChartData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return months.map((month, i) => ({
    month,
    mood: parseFloat((3.2 + Math.sin(i * 0.6) * 0.9 + Math.random() * 0.3).toFixed(1)),
    stress: Math.round(35 + Math.cos(i * 0.5) * 12 + Math.random() * 8),
    sessions: Math.round(8 + Math.random() * 6),
  }))
}
