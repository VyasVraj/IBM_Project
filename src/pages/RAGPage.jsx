import { useState, useMemo } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar, SectionHeader, Alert } from '../components/ui/index'
import { ragQuery, processDocument, KNOWLEDGE_BASE } from '../services/ragService'
import { Upload, Search, Brain, FileText, RefreshCw, CheckCircle, Database, Zap } from 'lucide-react'
import { cn } from '../utils/helpers'

export default function RAGPage() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState([])
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('query')

  const handleQuery = async () => {
    if (!query.trim()) return
    setLoading(true)
    const res = await ragQuery(query)
    setResult(res)
    setLoading(false)
  }

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const doc = await processDocument(file)
    setUploadedDocs(prev => [...prev, doc])
    setUploading(false)
  }

  const formatContent = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionHeader
          badge="RAG System"
          title="Retrieval-Augmented Generation"
          subtitle="Upload your journals and documents, then ask questions. MindGuard AI retrieves relevant knowledge before generating a personalized, evidence-based response."
          className="mb-8"
        />

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'query', label: 'Query AI', icon: <Search size={16} /> },
            { key: 'upload', label: 'Upload Documents', icon: <Upload size={16} /> },
            { key: 'knowledge', label: 'Knowledge Base', icon: <Database size={16} /> },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                activeTab === tab.key
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              )}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Query Tab */}
        {activeTab === 'query' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card>
                <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Search size={16} className="text-primary-600" />
                  Ask the Knowledge Base
                </h2>
                <textarea
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g. How can I manage anxiety without medication? What are signs of burnout?"
                  rows={5}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none mb-4"
                  aria-label="RAG query"
                />
                <Button fullWidth loading={loading} onClick={handleQuery} icon={<Brain size={16} />}>
                  {loading ? 'Retrieving & Generating...' : 'Query with RAG'}
                </Button>
              </Card>

              {/* RAG Pipeline Diagram */}
              <Card>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-amber-500" />
                  RAG Pipeline
                </h3>
                <div className="space-y-2">
                  {[
                    { step: '1', label: 'User Input', desc: 'Natural language query', icon: '📝', color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' },
                    { step: '2', label: 'Embedding', desc: 'Convert to vector representation', icon: '🔢', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
                    { step: '3', label: 'Vector Search', desc: 'Find similar documents', icon: '🔍', color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20' },
                    { step: '4', label: 'Retrieval', desc: 'Top-K relevant documents', icon: '📚', color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
                    { step: '5', label: 'Granite LLM', desc: 'IBM Granite generates response', icon: '⚡', color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' },
                    { step: '6', label: 'Response', desc: 'Empathetic, cited answer', icon: '💙', color: 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' },
                  ].map((s, i, arr) => (
                    <div key={s.step}>
                      <div className={cn('flex items-center gap-3 p-2.5 rounded-xl', s.color)}>
                        <span className="text-lg">{s.icon}</span>
                        <div>
                          <p className="text-xs font-bold">{s.step}. {s.label}</p>
                          <p className="text-xs opacity-75">{s.desc}</p>
                        </div>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex justify-center my-0.5 text-slate-300 dark:text-slate-600 text-xs">↓</div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Result Panel */}
            <div className="space-y-4">
              {loading ? (
                <Card className="flex flex-col items-center justify-center min-h-64 gap-4">
                  <RefreshCw size={32} className="text-primary-500 animate-spin" />
                  <div className="text-center">
                    <p className="font-semibold text-slate-700 dark:text-slate-300">Retrieving documents...</p>
                    <p className="text-xs text-slate-400 mt-1">IBM Granite is processing your query</p>
                  </div>
                </Card>
              ) : result ? (
                <>
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <Brain size={16} className="text-primary-600" />
                        AI Response
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="success" dot>
                          {Math.round(result.confidence * 100)}% Confidence
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-primary-50 to-cyan-50 dark:from-primary-950/20 dark:to-cyan-950/20 border border-primary-100 dark:border-primary-800 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {formatContent(result.response)}
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-primary-600" />
                      Retrieved Documents ({result.sources.length})
                    </h3>
                    <div className="space-y-3">
                      {result.sources.map((s, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900/40 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{s.title}</p>
                            <Badge variant="info" size="sm">{s.category}</Badge>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold text-primary-600">{Math.round(s.relevance * 100)}%</p>
                            <p className="text-[10px] text-slate-400">relevance</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                      <ProgressBar
                        label="Overall Confidence Score"
                        value={result.confidence * 100}
                        showValue
                        color={result.confidence > 0.7 ? 'success' : 'warning'}
                        size="sm"
                      />
                    </div>
                  </Card>
                </>
              ) : (
                <Card className="flex flex-col items-center justify-center min-h-64 gap-4 text-center">
                  <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center">
                    <Brain size={32} className="text-primary-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-300">RAG System Ready</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-48">Type a question and click Query to retrieve relevant documents and generate a response.</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h2 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <Upload size={16} className="text-primary-600" />
                Upload Document for RAG
              </h2>
              <label
                htmlFor="doc-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-2xl cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors"
              >
                <Upload size={32} className="text-primary-400 mb-3" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Drop file here or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">Supports TXT, PDF (max 10MB)</p>
                <input id="doc-upload" type="file" accept=".txt,.pdf" onChange={handleUpload} className="hidden" />
              </label>
              {uploading && (
                <div className="mt-4 flex items-center gap-3 text-sm text-primary-600">
                  <RefreshCw size={16} className="animate-spin" />
                  Processing and embedding document...
                </div>
              )}
            </Card>
            <Card>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <FileText size={16} className="text-primary-600" />
                Uploaded Documents ({uploadedDocs.length})
              </h3>
              {uploadedDocs.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">No documents uploaded yet</div>
              ) : (
                <div className="space-y-3">
                  {uploadedDocs.map(doc => (
                    <div key={doc.id} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <CheckCircle size={18} className="text-success-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{doc.title}</p>
                        <p className="text-xs text-slate-400">{doc.wordCount} words • {doc.embeddingDimensions}d embedding</p>
                        <Badge variant="success" size="sm">{doc.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Knowledge Base Tab */}
        {activeTab === 'knowledge' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KNOWLEDGE_BASE.map(doc => (
              <Card key={doc.id} hover>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="primary" size="sm">{doc.category}</Badge>
                  <Database size={14} className="text-slate-400 mt-0.5" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 text-sm">{doc.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">{doc.content}</p>
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <p className="text-xs text-slate-400">Embedding dims: <span className="font-mono font-bold">768</span></p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
