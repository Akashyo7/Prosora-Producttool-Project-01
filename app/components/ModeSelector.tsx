'use client'

import { useState } from 'react'
import { User, Users, Lock, Zap, Database, Download, Brain } from 'lucide-react'

interface ModeSelectorProps {
  onModeSelect: (mode: 'prosora' | 'guest') => void
}

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<'prosora' | 'guest' | null>(null)

  const handleModeSelect = (mode: 'prosora' | 'guest') => {
    setSelectedMode(mode)
    // Add a small delay for visual feedback
    setTimeout(() => {
      onModeSelect(mode)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="text-4xl">🧠</div>
            <h1 className="text-4xl font-bold text-gray-900">AI Product Intelligence</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your experience: Personal workspace with full features or quick guest access
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Prosora Mode */}
          <div 
            className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedMode === 'prosora' 
                ? 'border-primary-500 shadow-primary-200' 
                : 'border-gray-200 hover:border-primary-300'
            }`}
            onClick={() => handleModeSelect('prosora')}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Prosora Mode</h3>
                  <p className="text-primary-600 font-medium">Personal AI Workspace</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Database className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Persistent Sessions</p>
                    <p className="text-sm text-gray-600">Save and continue your thinking sessions</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Personalized AI</p>
                    <p className="text-sm text-gray-600">AI learns your thinking patterns and preferences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Download className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Export & Share</p>
                    <p className="text-sm text-gray-600">Export to PDF, Notion, or share with teams</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Private & Secure</p>
                    <p className="text-sm text-gray-600">Your data stays private and encrypted</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-primary-50 rounded-lg p-4 text-center">
                <p className="text-sm text-primary-700 mb-2">
                  <strong>Perfect for:</strong> Product managers, entrepreneurs, and serious thinkers
                </p>
                <div className="text-xs text-primary-600">
                  Sign in required • Full feature access
                </div>
              </div>
            </div>
          </div>

          {/* Guest Mode */}
          <div 
            className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedMode === 'guest' 
                ? 'border-green-500 shadow-green-200' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleModeSelect('guest')}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Guest Mode</h3>
                  <p className="text-green-600 font-medium">Try It Now</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Instant Access</p>
                    <p className="text-sm text-gray-600">No signup required, start immediately</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Full AI Features</p>
                    <p className="text-sm text-gray-600">Access all thinking frameworks and AI capabilities</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Privacy First</p>
                    <p className="text-sm text-gray-600">No data collection, anonymous usage</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Demo Experience</p>
                    <p className="text-sm text-gray-600">Perfect for exploring and testing features</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-green-700 mb-2">
                  <strong>Perfect for:</strong> First-time users, demos, and quick brainstorming
                </p>
                <div className="text-xs text-green-600">
                  No signup • Temporary session • Full features
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Built by{' '}
            <a href="https://prosora.in" className="text-primary-600 hover:underline font-medium">
              Prosora
            </a>{' '}
            • Powered by Google Gemini & Advanced AI
          </p>
        </div>
      </div>
    </div>
  )
}