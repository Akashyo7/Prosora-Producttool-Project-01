'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Lightbulb, Copy, Check } from 'lucide-react'
import EnhancedMessage from './EnhancedMessage'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  mode?: string
  suggestions?: string[]
  needsInput?: {
    type: 'text' | 'choice' | 'rating'
    prompt: string
    options?: string[]
  }
}

interface IntelligenceContext {
  domain: string
  stage: string
  insightCount: number
  problemCount: number
  solutionCount: number
  recommendations: string[]
  predictions: { outcome: string; probability: number }[]
}

interface ChatInterfaceProps {
  onBack: () => void
}

export default function ChatInterface({ onBack }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your Super Insightful Brainstorming Assistant. I can help you think through problems using:\n\n🔬 **First Principles** - Question assumptions and find breakthrough solutions\n🎯 **Design Thinking** - User-centered innovation process\n🧠 **Structured Frameworks** - Proven brainstorming methodologies\n\nI'll automatically detect the best approach for your challenge, or you can specify your preferred thinking mode. What would you like to explore?",
      timestamp: new Date(),
      mode: 'auto'
    }
  ])
  const [currentMode, setCurrentMode] = useState<string>('auto')
  const [sessionId, setSessionId] = useState<string>('')
  const [intelligence, setIntelligence] = useState<IntelligenceContext | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          history: messages.slice(-5), // Send last 5 messages for context
          mode: currentMode === 'auto' ? undefined : currentMode,
          sessionId: sessionId
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate ideas')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        mode: data.mode,
        suggestions: data.suggestions
      }
      
      // Update current mode if detected
      if (data.mode && data.mode !== currentMode) {
        setCurrentMode(data.mode)
      }
      
      // Update session ID and intelligence context
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
      }
      
      if (data.intelligence) {
        setIntelligence(data.intelligence)
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble generating ideas right now. Please try again in a moment.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedId(messageId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const examplePrompts = [
    "🔬 Revolutionize urban transportation from first principles",
    "🎯 Design a user-centered fintech experience", 
    "🧠 Use SCAMPER to improve remote collaboration",
    "❓ Question assumptions about food delivery",
    "🚀 Create breakthrough solutions for climate change",
    "👥 Apply design thinking to elderly healthcare"
  ]

  const getModeIcon = (mode?: string) => {
    switch (mode) {
      case 'first-principles': return '🔬'
      case 'design-thinking': return '🎯'
      case 'frameworks': return '🧠'
      default: return '🚀'
    }
  }

  const getModeLabel = (mode?: string) => {
    switch (mode) {
      case 'first-principles': return 'First Principles'
      case 'design-thinking': return 'Design Thinking'
      case 'frameworks': return 'Structured Frameworks'
      default: return 'Auto-Adaptive'
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="text-2xl">{getModeIcon(currentMode)}</div>
            <h2 className="text-xl font-semibold">AI Product Intelligence</h2>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {getModeLabel(currentMode)}
          </div>
          {intelligence && (
            <div className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {intelligence.domain} • {intelligence.stage}
            </div>
          )}
        </div>
      </div>

      {/* Intelligence Dashboard */}
      {intelligence && (
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 mb-6 border border-primary-100">
          <div className="flex items-center space-x-2 mb-3">
            <div className="text-lg">🧠</div>
            <h3 className="font-semibold text-gray-900">AI Intelligence Layer</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{intelligence.insightCount}</div>
              <div className="text-xs text-gray-600">Insights Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{intelligence.problemCount}</div>
              <div className="text-xs text-gray-600">Problems Identified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{intelligence.solutionCount}</div>
              <div className="text-xs text-gray-600">Solutions Explored</div>
            </div>
          </div>

          {intelligence.recommendations.length > 0 && (
            <div className="mb-3">
              <div className="text-sm font-medium text-gray-700 mb-2">💡 AI Recommendations:</div>
              <div className="space-y-1">
                {intelligence.recommendations.map((rec, index) => (
                  <div key={index} className="text-sm text-gray-600 bg-white px-3 py-1 rounded">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {intelligence.predictions.length > 0 && (
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">🔮 Predictions:</div>
              <div className="space-y-1">
                {intelligence.predictions.map((pred, index) => (
                  <div key={index} className="text-sm text-gray-600 bg-white px-3 py-1 rounded flex justify-between">
                    <span>{pred.outcome}</span>
                    <span className="font-medium text-primary-600">{Math.round(pred.probability * 100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chat Messages */}
      <div className="bg-white rounded-lg shadow-sm border min-h-[500px] flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <EnhancedMessage
              key={message.id}
              message={message}
              onCopy={copyToClipboard}
              onInputResponse={(response) => {
                setInput(response)
                // Auto-submit if it's a suggestion click
                if (message.suggestions?.includes(response)) {
                  handleSubmit(new Event('submit') as any)
                }
              }}
              copiedId={copiedId}
            />
          ))}
          
          {isLoading && (
            <div className="chat-message assistant-message">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">Assistant</span>
                <div className="loading-dots">
                  <div style={{'--i': 0} as React.CSSProperties}></div>
                  <div style={{'--i': 1} as React.CSSProperties}></div>
                  <div style={{'--i': 2} as React.CSSProperties}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Example Prompts */}
        {messages.length === 1 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">Try these example prompts:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-primary-300 hover:bg-primary-50 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe an industry, problem, or market you want to explore..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}