'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface EnhancedMessageProps {
  message: {
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
  onCopy?: (content: string, messageId: string) => void
  onInputResponse?: (response: string) => void
  copiedId?: string | null
}

export default function EnhancedMessage({ 
  message, 
  onCopy, 
  onInputResponse, 
  copiedId 
}: EnhancedMessageProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedChoice, setSelectedChoice] = useState('')

  const handleInputSubmit = () => {
    if (message.needsInput?.type === 'text' && inputValue.trim()) {
      onInputResponse?.(inputValue.trim())
      setInputValue('')
    } else if (message.needsInput?.type === 'choice' && selectedChoice) {
      onInputResponse?.(selectedChoice)
      setSelectedChoice('')
    }
  }

  const getModeIcon = (mode?: string) => {
    switch (mode) {
      case 'first-principles': return '🔬'
      case 'design-thinking': return '🎯'
      case 'frameworks': return '🧠'
      default: return '🚀'
    }
  }

  return (
    <div
      className={`chat-message ${
        message.role === 'user' ? 'user-message' : 'assistant-message'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-medium text-sm flex items-center space-x-1">
              {message.role === 'assistant' && (
                <span className="text-lg">{getModeIcon(message.mode)}</span>
              )}
              <span>{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
            </span>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          {/* Enhanced Content Rendering */}
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom components for better styling
                h1: ({children}) => <h1 className="text-xl font-bold text-gray-900 mb-3">{children}</h1>,
                h2: ({children}) => <h2 className="text-lg font-semibold text-gray-800 mb-2">{children}</h2>,
                h3: ({children}) => <h3 className="text-md font-medium text-gray-700 mb-2">{children}</h3>,
                p: ({children}) => <p className="mb-2 text-gray-700 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                li: ({children}) => <li className="text-gray-700">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-primary-200 pl-4 py-2 bg-primary-50 rounded-r mb-3">
                    {children}
                  </blockquote>
                ),
                code: ({children, className}) => {
                  const isInline = !className
                  if (isInline) {
                    return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                  }
                  return (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-3">
                      <code>{children}</code>
                    </pre>
                  )
                },
                table: ({children}) => (
                  <div className="overflow-x-auto mb-3">
                    <table className="min-w-full border border-gray-200 rounded-lg">{children}</table>
                  </div>
                ),
                th: ({children}) => (
                  <th className="border border-gray-200 px-3 py-2 bg-gray-50 font-medium text-left">{children}</th>
                ),
                td: ({children}) => (
                  <td className="border border-gray-200 px-3 py-2">{children}</td>
                ),
                strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                em: ({children}) => <em className="italic text-gray-700">{children}</em>
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Interactive Input Section */}
          {message.needsInput && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">
                {message.needsInput.prompt}
              </p>
              
              {message.needsInput.type === 'text' && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your response..."
                    onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                  />
                  <button
                    onClick={handleInputSubmit}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Submit
                  </button>
                </div>
              )}

              {message.needsInput.type === 'choice' && message.needsInput.options && (
                <div className="space-y-2">
                  {message.needsInput.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedChoice(option)
                        onInputResponse?.(option)
                      }}
                      className="block w-full text-left px-3 py-2 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Show suggestions for assistant messages */}
          {message.role === 'assistant' && message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">💡 Try these next:</p>
              <div className="flex flex-wrap gap-2">
                {message.suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onInputResponse?.(suggestion)}
                    className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full hover:bg-primary-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Copy Button */}
        {message.role === 'assistant' && onCopy && (
          <button
            onClick={() => onCopy(message.content, message.id)}
            className="ml-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy to clipboard"
          >
            {copiedId === message.id ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}