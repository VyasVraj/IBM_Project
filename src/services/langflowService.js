/**
 * MindGuard AI – IBM Langflow Service
 * Production: Connect to your deployed Langflow instance
 * VITE_LANGFLOW_BASE=https://your-langflow-instance.com/api/v1
 */

const LANGFLOW_BASE = import.meta.env.VITE_LANGFLOW_BASE || 'https://api.langflow.astra.datastax.com'
const LANGFLOW_FLOW_ID = import.meta.env.VITE_LANGFLOW_FLOW_ID || 'your-flow-id'
const LANGFLOW_TOKEN = import.meta.env.VITE_LANGFLOW_TOKEN || 'your-token'

/**
 * Calls IBM Langflow mental health AI workflow
 * @param {string} userMessage - The user's message
 * @param {Object} context - Session context (emotion, history, etc.)
 * @returns {Promise<string>} AI response
 */
export async function callLangflowChat(userMessage, context = {}) {
  /**
   * PRODUCTION IMPLEMENTATION:
   * 
   * const response = await fetch(`${LANGFLOW_BASE}/lf/${LANGFLOW_FLOW_ID}/api/v1/run/chat`, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
   *   },
   *   body: JSON.stringify({
   *     input_value: userMessage,
   *     output_type: 'chat',
   *     input_type: 'chat',
   *     tweaks: {
   *       'ChatInput-XYZ': { input_value: userMessage },
   *       'PromptTemplate-XYZ': {
   *         template: buildMentalHealthPrompt(context),
   *       },
   *       'GraniteModel-XYZ': {
   *         model_name: 'ibm/granite-13b-instruct-v2',
   *         project_id: process.env.IBM_PROJECT_ID,
   *       },
   *     },
   *   }),
   * })
   * const data = await response.json()
   * return data.outputs[0].outputs[0].results.message.text
   */

  console.log('[Langflow] Workflow called (simulation mode)', { message: userMessage.slice(0, 50) })
  await new Promise(r => setTimeout(r, 600))
  return null // Falls back to graniteService locally
}

/**
 * Run RAG-enhanced mental health query
 */
export async function runRAGWorkflow(query, uploadedDocs = []) {
  /**
   * PRODUCTION IMPLEMENTATION:
   * 
   * const response = await fetch(`${LANGFLOW_BASE}/lf/${LANGFLOW_FLOW_ID}/api/v1/run/rag`, {
   *   method: 'POST',
   *   headers: {
   *     'Content-Type': 'application/json',
   *     'Authorization': `Bearer ${LANGFLOW_TOKEN}`,
   *   },
   *   body: JSON.stringify({
   *     input_value: query,
   *     tweaks: {
   *       'VectorStoreRetriever-XYZ': { search_kwargs: { k: 5 } },
   *       'GraniteModel-XYZ': { model_name: 'ibm/granite-13b-instruct-v2' },
   *     },
   *   }),
   * })
   * const data = await response.json()
   * return { response: data.outputs[0].text, sources: data.sources }
   */

  console.log('[Langflow RAG] Query (simulation mode)', { query: query.slice(0, 50) })
  await new Promise(r => setTimeout(r, 1200))

  // Simulated RAG response
  const ragDocs = [
    { title: 'WHO Mental Health Guidelines 2023', relevance: 0.94, excerpt: 'Mental health is a fundamental human right and is crucial to personal, community and socio-economic development.' },
    { title: 'Mindfulness-Based Stress Reduction', relevance: 0.87, excerpt: 'MBSR is an evidence-based program using mindfulness meditation to alleviate suffering and reduce stress.' },
    { title: 'Cognitive Behavioral Therapy Guide', relevance: 0.82, excerpt: 'CBT helps identify and change negative thought patterns that influence emotions and behaviors.' },
  ]

  return {
    response: `Based on ${ragDocs.length} retrieved documents from the mental health knowledge base:\n\n${query.includes('anxiet') ? 'Anxiety is a normal human response to stress. Evidence-based treatments include CBT, mindfulness, and in some cases medication. Practice daily relaxation techniques for best results.' : 'Mental health support involves a combination of professional care, evidence-based self-help strategies, and strong social connections.'}`,
    sources: ragDocs,
    confidence: 0.89,
  }
}

/**
 * Analyze journal text for emotional patterns (Langflow workflow)
 */
export async function analyzeJournalLangflow(journalText) {
  console.log('[Langflow] Journal analysis (simulation mode)')
  await new Promise(r => setTimeout(r, 1000))

  // Simulated analysis
  const words = journalText.toLowerCase()
  const stressScore = ['stress', 'overwhelmed', 'pressure', 'anxious', 'worried'].filter(w => words.includes(w)).length * 15
  const hopeScore = ['hope', 'better', 'grateful', 'positive', 'improving'].filter(w => words.includes(w)).length * 20

  return {
    emotion: stressScore > 20 ? 'stressed' : hopeScore > 20 ? 'hopeful' : 'neutral',
    stressLevel: Math.min(100, stressScore + 20),
    hopeScore: Math.min(100, hopeScore + 30),
    sentiment: stressScore > hopeScore ? -0.3 : 0.4,
    summary: `Your journal shows ${stressScore > 20 ? 'elevated stress patterns' : 'relatively stable emotional state'} with ${hopeScore > 20 ? 'positive coping indicators' : 'room for self-care improvement'}.`,
    suggestions: [
      'Practice 10 minutes of daily mindfulness meditation',
      'Schedule one enjoyable activity this week',
      'Reach out to a trusted person in your support network',
    ],
  }
}

export function buildMentalHealthPrompt(context) {
  return `You are MindGuard AI, a compassionate mental health awareness companion powered by IBM Granite. 
Your role is to provide empathetic, evidence-based emotional support and psychoeducation.
NEVER diagnose conditions or prescribe medication.
ALWAYS recommend professional help for clinical concerns.
ALWAYS prioritize safety and provide crisis resources when risk is detected.
Current user emotion: ${context.emotion || 'unknown'}
Risk level: ${context.risk || 'low'}
Respond with warmth, validation, and practical evidence-based guidance.`
}
