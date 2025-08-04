'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Lock, Unlock, Calendar } from 'lucide-react'

interface Session {
  id: string
  title: string
  domain: string
  stage: string
  isPrivate: boolean
  lastAccessed: Date
  messageCount: number
}

interface SessionManagerProps {
  currentSessionId?: string
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
  onDeleteSession: (sessionId: string) => void
}

export default function SessionManager({
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession
}: SessionManagerProps) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [showManager, setShowManager] = useState(false)

  // Mock sessions for now - would come from API
  useEffect(() => {
    const mockSessions: Session[] = [
      {
        id: 'session_1',
        title: 'Fintech Payment Revolution',
        domain: 'fintech',
        stage: 'validation',
        isPrivate: true,
        lastAccessed: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        messageCount: 15
      },
      {
        id: 'session_2', 
        title: 'Healthcare AI Assistant',
        domain: 'healthcare',
        stage: 'ideation',
        isPrivate: false,
        lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        messageCount: 8
      }
    ]
    setSessions(mockSessions)
  }, [])

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case 'fintech': return '💰'
      case 'healthcare': return '🏥'
      case 'ecommerce': return '🛒'
      case 'education': return '📚'
      default: return '🚀'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'discovery': return 'bg-blue-100 text-blue-800'
      case 'ideation': return 'bg-green-100 text-green-800'
      case 'validation': return 'bg-yellow-100 text-yellow-800'
      case 'planning': return 'bg-purple-100 text-purple-800'
      case 'execution': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (!showManager) {
    return (
      <button
        onClick={() => setShowManager(true)}
        className="fixed top-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50"
        title="Manage Sessions"
      >
        <Plus className="w-5 h-5" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Thinking Sessions</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onNewSession}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Session</span>
            </button>
            <button
              onClick={() => setShowManager(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sessions List */}
        <div className="p-6 overflow-y-auto max-h-96">
          {sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">🧠</div>
              <p>No thinking sessions yet.</p>
              <p className="text-sm">Start a new session to begin your AI-powered brainstorming journey!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    currentSessionId === session.id
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    onSessionSelect(session.id)
                    setShowManager(false)
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{getDomainIcon(session.domain)}</span>
                        <h3 className="font-medium text-gray-900">{session.title}</h3>
                        {session.isPrivate ? (
                          <Lock className="w-4 h-4 text-gray-400" title="Private session" />
                        ) : (
                          <Unlock className="w-4 h-4 text-gray-400" title="Contributes to global learning" />
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStageColor(session.stage)}`}>
                          {session.stage}
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{session.lastAccessed.toLocaleDateString()}</span>
                        </span>
                        <span>{session.messageCount} messages</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteSession(session.id)
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Delete session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Private sessions stay yours</span>
              </div>
              <div className="flex items-center space-x-1">
                <Unlock className="w-3 h-3" />
                <span>Public sessions help train the AI</span>
              </div>
            </div>
            <span>{sessions.length} total sessions</span>
          </div>
        </div>
      </div>
    </div>
  )
}