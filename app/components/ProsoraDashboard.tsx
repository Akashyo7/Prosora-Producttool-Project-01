'use client'

import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Settings, 
  Brain, 
  Calendar,
  TrendingUp,
  BookOpen,
  Archive,
  Star,
  Clock,
  BarChart3
} from 'lucide-react'

interface Session {
  id: string
  title: string
  domain: string
  stage: string
  framework?: string
  lastAccessed: Date
  messageCount: number
  insightCount: number
  isFavorite: boolean
}

interface ProsoraDashboardProps {
  onNewSession: () => void
  onSessionSelect: (sessionId: string) => void
  onSettings: () => void
}

export default function ProsoraDashboard({ 
  onNewSession, 
  onSessionSelect, 
  onSettings 
}: ProsoraDashboardProps) {
  const [sessions, setSessions] = useState<Session[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDomain, setFilterDomain] = useState<string>('all')

  // Mock data - would come from API
  useEffect(() => {
    const mockSessions: Session[] = [
      {
        id: 'session_1',
        title: 'Fintech Payment Revolution',
        domain: 'fintech',
        stage: 'validation',
        framework: 'first-principles',
        lastAccessed: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        messageCount: 15,
        insightCount: 8,
        isFavorite: true
      },
      {
        id: 'session_2',
        title: 'Healthcare AI Assistant',
        domain: 'healthcare',
        stage: 'ideation',
        framework: 'design-thinking',
        lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        messageCount: 12,
        insightCount: 6,
        isFavorite: false
      },
      {
        id: 'session_3',
        title: 'E-commerce User Experience',
        domain: 'ecommerce',
        stage: 'discovery',
        framework: 'empathy-map',
        lastAccessed: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        messageCount: 8,
        insightCount: 4,
        isFavorite: true
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

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.domain.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDomain = filterDomain === 'all' || session.domain === filterDomain
    return matchesSearch && matchesDomain
  })

  const totalInsights = sessions.reduce((sum, session) => sum + session.insightCount, 0)
  const totalMessages = sessions.reduce((sum, session) => sum + session.messageCount, 0)
  const favoriteSessions = sessions.filter(session => session.isFavorite)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🧠</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Prosora Intelligence</h1>
                <p className="text-gray-600">Your personal AI thinking workspace</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onNewSession}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Session</span>
              </button>
              
              <button
                onClick={onSettings}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                    <p className="text-sm text-gray-600">Total Sessions</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalInsights}</p>
                    <p className="text-sm text-gray-600">AI Insights</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{totalMessages}</p>
                    <p className="text-sm text-gray-600">Messages</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{favoriteSessions.length}</p>
                    <p className="text-sm text-gray-600">Favorites</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Domains</option>
                    <option value="fintech">Fintech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="education">Education</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sessions List */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Your Thinking Sessions</h2>
                <p className="text-gray-600">Continue where you left off or explore past insights</p>
              </div>
              
              <div className="divide-y">
                {filteredSessions.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>No sessions found matching your criteria.</p>
                    <button
                      onClick={onNewSession}
                      className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Start your first session
                    </button>
                  </div>
                ) : (
                  filteredSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onSessionSelect(session.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-xl">{getDomainIcon(session.domain)}</span>
                            <h3 className="font-semibold text-gray-900">{session.title}</h3>
                            {session.isFavorite && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${getStageColor(session.stage)}`}>
                              {session.stage}
                            </span>
                            {session.framework && (
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                {session.framework}
                              </span>
                            )}
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{session.lastAccessed.toLocaleDateString()}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{session.messageCount} messages</span>
                            <span>{session.insightCount} insights</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={onNewSession}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <Plus className="w-4 h-4 text-primary-600" />
                  <span className="text-sm">New Session</span>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm">View Analytics</span>
                </button>
                
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <Download className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Export Data</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {sessions.slice(0, 3).map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => onSessionSelect(session.id)}
                  >
                    <span className="text-sm">{getDomainIcon(session.domain)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {session.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.lastAccessed.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-lg border border-primary-100">
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="w-5 h-5 text-primary-600" />
                <h3 className="font-semibold text-gray-900">AI Insights</h3>
              </div>
              <div className="space-y-3 text-sm">
                <p className="text-gray-700">
                  💡 You tend to use <strong>first-principles thinking</strong> for breakthrough problems
                </p>
                <p className="text-gray-700">
                  📈 Your sessions average <strong>12 messages</strong> and generate <strong>6 insights</strong>
                </p>
                <p className="text-gray-700">
                  🎯 <strong>Fintech</strong> is your most explored domain this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}