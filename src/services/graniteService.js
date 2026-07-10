/**
 * MindGuard AI – IBM Granite Service
 * Production: Replace API_BASE with actual IBM watsonx.ai endpoint
 * and API_KEY with your IBM Cloud API key
 */

const IBM_WATSONX_BASE = 'https://us-south.ml.cloud.ibm.com/ml/v1/text/generation'
const IBM_PROJECT_ID = import.meta.env.VITE_IBM_PROJECT_ID || 'your-project-id'
const IBM_API_KEY = import.meta.env.VITE_IBM_API_KEY || 'your-api-key'
const GRANITE_MODEL = 'ibm/granite-13b-instruct-v2'

// ---- Keyword Sets for Local AI Simulation ----
const HIGH_RISK_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'no reason to live', 'better off dead', 'hurt myself', 'self-harm',
  "don't want to live", 'can\'t go on', 'give up on life', 'end it all',
]

const MEDIUM_RISK_KEYWORDS = [
  'hopeless', 'worthless', 'nobody cares', 'can\'t cope', 'falling apart',
  'overwhelmed', 'exhausted', 'burned out', 'burnout', 'breaking down',
  'depressed', 'depression', 'anxiety attack', 'panic attack', 'isolated',
  'trapped', 'helpless', 'useless', 'can\'t handle',
]

const ANXIETY_WORDS = ['anxious', 'anxiety', 'panic', 'nervous', 'worry', 'fear', 'scared']
const SADNESS_WORDS = ['sad', 'cry', 'crying', 'lonely', 'unhappy', 'miserable', 'grief']
const ANGER_WORDS = ['angry', 'furious', 'rage', 'frustrated', 'irritated', 'mad']
const JOY_WORDS = ['happy', 'joyful', 'great', 'wonderful', 'excited', 'grateful', 'blessed']
const HOPE_WORDS = ['hope', 'better', 'improving', 'hopeful', 'optimistic', 'looking forward']
const BURNOUT_WORDS = ['burnout', 'exhausted', 'drained', 'numb', 'disconnected', 'overwhelmed']

// ---- Knowledge Base (RAG Simulation) ----
const KB = {
  breathing: `**4-7-8 Breathing Technique:**
1. Inhale through nose for **4 counts**
2. Hold breath for **7 counts**
3. Exhale through mouth for **8 counts**
Repeat 4 cycles. This activates your parasympathetic nervous system and reduces anxiety within minutes.`,

  grounding: `**5-4-3-2-1 Grounding Technique:**
• 5 things you can **SEE**
• 4 things you can **TOUCH**  
• 3 things you can **HEAR**
• 2 things you can **SMELL**
• 1 thing you can **TASTE**
This anchors you in the present moment during anxiety or panic.`,

  crisis: `**Immediate Crisis Resources:**
🆘 **988 Suicide & Crisis Lifeline** — Call or text 988 (US, 24/7)
📱 **Crisis Text Line** — Text HOME to 741741
🌍 **International Directory** — iasp.info/resources/Crisis_Centres
🇬🇧 **Samaritans (UK)** — 116 123
🇮🇳 **iCall (India)** — 9152987821
🇦🇺 **Beyond Blue (Australia)** — 1300 22 4636

**You are not alone. Help is available right now.**`,

  sleep: `**Evidence-Based Sleep Hygiene:**
• Keep consistent sleep/wake times (even weekends)
• Avoid screens 1 hour before bed
• Keep bedroom cool (65–68°F / 18–20°C)
• Try progressive muscle relaxation
• Limit caffeine after 2pm
• WHO recommends 7–9 hours per night for adults`,

  stress: `**Stress Management Strategies:**
• Regular physical activity (30 min/day)
• Social connection — reach out to someone you trust
• Mindfulness meditation (10 min daily)
• Journaling to process emotions
• Setting healthy boundaries
• Time management and task prioritization`,

  depression: `**Understanding Depression:**
Depression is a medical condition affecting 280+ million people worldwide (WHO). It's not weakness.

**Evidence-based approaches:**
• Cognitive Behavioral Therapy (CBT) — gold standard treatment
• Regular exercise — as effective as medication for mild-moderate depression
• Social connection and reducing isolation
• Consistent sleep schedule
• Sunlight exposure (at least 30 min/day)

Please speak with a mental health professional for proper diagnosis and treatment.`,

  anxiety: `**Managing Anxiety:**
**Immediate relief:**
• Diaphragmatic breathing (slow, deep breaths)
• Cold water on face or wrists
• Grounding exercises (5-4-3-2-1)

**Long-term strategies:**
• CBT (most evidence-based treatment)
• Regular aerobic exercise
• Limiting caffeine and alcohol
• Mindfulness meditation
• Gradual exposure to anxiety triggers`,
}

// ---- Emotion Detection ----
export function detectEmotion(text) {
  const lower = text.toLowerCase()
  if (BURNOUT_WORDS.some(k => lower.includes(k))) return 'burnout'
  if (ANXIETY_WORDS.some(k => lower.includes(k))) return 'anxiety'
  if (SADNESS_WORDS.some(k => lower.includes(k))) return 'sadness'
  if (ANGER_WORDS.some(k => lower.includes(k))) return 'anger'
  if (JOY_WORDS.some(k => lower.includes(k))) return 'joy'
  if (HOPE_WORDS.some(k => lower.includes(k))) return 'hope'
  return 'neutral'
}

// ---- Risk Detection ----
export function detectRisk(text) {
  const lower = text.toLowerCase()
  if (HIGH_RISK_KEYWORDS.some(k => lower.includes(k))) return 'high'
  const medMatches = MEDIUM_RISK_KEYWORDS.filter(k => lower.includes(k))
  if (medMatches.length >= 2) return 'high'
  if (medMatches.length >= 1) return 'medium'
  return 'low'
}

// ---- Sentiment Score ----
export function getSentiment(text) {
  const lower = text.toLowerCase()
  let score = 0
  const pos = ['good', 'great', 'happy', 'better', 'well', 'love', 'hope', 'grateful', 'calm', 'peaceful', 'improving']
  const neg = ['bad', 'sad', 'terrible', 'awful', 'horrible', 'hate', 'pain', 'hurt', 'cry', 'suffer', 'dark', 'empty']
  pos.forEach(w => { if (lower.includes(w)) score += 0.2 })
  neg.forEach(w => { if (lower.includes(w)) score -= 0.2 })
  return Math.max(-1, Math.min(1, score))
}

// ---- Response Templates ----
const RESPONSES = {
  high: [
    `I hear you, and I'm genuinely concerned about your wellbeing right now. What you're feeling is real, and you absolutely don't have to face this alone.

**Please reach out for immediate support:**

${KB.crisis}

I'm here with you. Can you tell me more about what's happening right now? Are you in a safe place?`,
  ],
  medium: [
    `I can sense you're going through something really difficult, and I want you to know your feelings are completely valid. You're showing courage by reaching out.

${KB.breathing}

Would you like to talk more about what you're experiencing? Sometimes naming our feelings helps us understand them better.`,
    `Thank you for trusting me with this. It sounds genuinely hard, and you deserve support.

${KB.grounding}

Are there trusted people in your life — a friend, family member, or counselor — you could connect with today?`,
  ],
  anxiety: [
    `Anxiety can be absolutely exhausting. Let's try something that helps quickly:

${KB.anxiety}

On a scale of 1–10, how intense is your anxiety feeling right now?`,
  ],
  sleep: [
    `Sleep quality profoundly affects our mental health. When we're sleep-deprived, everything feels harder.

${KB.sleep}

What does your typical evening routine look like right now?`,
  ],
  stress: [
    `Stress is one of the most common mental health challenges. Here's what research shows helps most:

${KB.stress}

What's been the biggest source of stress for you lately?`,
  ],
  depression: [
    `I'm really glad you're talking about this. Depression is a genuine medical condition — what you feel is not your fault, and help is available.

${KB.depression}

Have you been able to speak with a doctor or therapist about how you've been feeling?`,
  ],
  greeting: [
    `Hello! Wonderful to meet you. 💙 I'm MindGuard AI, your compassionate wellness companion.

I'm here to:
👂 Listen actively and without judgment
📚 Share evidence-based mental health information
🧘 Guide you through calming techniques  
🔗 Connect you with professional resources when needed

*I provide support and information — I'm not a replacement for professional mental health care.*

How are you feeling today?`,
  ],
  general: [
    `Thank you for sharing that with me. I'm here to listen and support you through this.

Mental wellness is a journey, not a destination. Every small step forward matters.

What feels most challenging for you right now?`,
    `I appreciate you opening up. What you're feeling makes complete sense given what you're describing.

Here's something that might help when things feel intense:

${KB.breathing}

How long have you been feeling this way?`,
    `You've taken an important step by reaching out. Let's explore this together.

${KB.grounding}

Is there anything specific you'd like support with today?`,
  ],
}

function matchTopic(text) {
  const lower = text.toLowerCase()
  if (['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening'].some(g => lower.includes(g))) return 'greeting'
  if (ANXIETY_WORDS.some(k => lower.includes(k))) return 'anxiety'
  if (['depress', 'sad', 'hopeless', 'worthless'].some(k => lower.includes(k))) return 'depression'
  if (['sleep', 'insomnia', 'tired', "can't sleep"].some(k => lower.includes(k))) return 'sleep'
  if (['stress', 'pressure', 'work'].some(k => lower.includes(k))) return 'stress'
  return 'general'
}

// ---- Main AI Response Generator ----
export function generateAIResponse(userText, emotion, risk) {
  if (risk === 'high') return RESPONSES.high[0]
  if (risk === 'medium') {
    const arr = RESPONSES.medium
    return arr[Math.floor(Math.random() * arr.length)]
  }
  const topic = matchTopic(userText)
  const arr = RESPONSES[topic] || RESPONSES.general
  return arr[Math.floor(Math.random() * arr.length)]
}

// ---- IBM watsonx.ai API (Production Integration) ----
export async function callGraniteAPI(prompt, systemPrompt) {
  /**
   * PRODUCTION: Uncomment and configure for real IBM watsonx.ai calls
   * 
   * const token = await getIBMToken()
   * const response = await fetch(IBM_WATSONX_BASE, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${token}`,
   *   },
   *   body: JSON.stringify({
   *     model_id: GRANITE_MODEL,
   *     project_id: IBM_PROJECT_ID,
   *     input: `<|system|>${systemPrompt}<|user|>${prompt}<|assistant|>`,
   *     parameters: {
   *       decoding_method: 'greedy',
   *       max_new_tokens: 512,
   *       min_new_tokens: 10,
   *       temperature: 0.7,
   *     },
   *   }),
   * })
   * const data = await response.json()
   * return data.results[0].generated_text
   */
  console.log('[IBM Granite] API call (simulation mode)', { prompt: prompt.slice(0, 50) })
  return generateAIResponse(prompt, detectEmotion(prompt), detectRisk(prompt))
}

// ---- IBM Token Helper ----
export async function getIBMToken() {
  /**
   * PRODUCTION: Exchange API key for IAM token
   * 
   * const response = await fetch('https://iam.cloud.ibm.com/identity/token', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
   *   body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${IBM_API_KEY}`,
   * })
   * const data = await response.json()
   * return data.access_token
   */
  return 'simulation-token'
}

export { KB as knowledgeBase }
