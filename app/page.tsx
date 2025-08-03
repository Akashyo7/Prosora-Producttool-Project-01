'use client'

import { useState } from 'react'
import { Lightbulb, Send, Github, ExternalLink } from 'lucide-react'
import ChatInterface from './components/ChatInterface'

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Product Idea Assistant</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://prosora.in" 
              target="_blank"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>prosora.in</span>
            </a>
            <a 
              href="https://github.com/yourusername/product-idea-assistant" 
              target="_blank"
              className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!showChat ? (
          /* Landing Section */
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Super Insightful Brainstorming Assistant
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Breakthrough product thinking using First Principles, Design Thinking, and Structured Frameworks. 
                From revolutionary insights to systematic validation - all powered by advanced AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary-600 font-bold text-lg">🔬</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">First Principles</h3>
                <p className="text-gray-600 text-sm">
                  Question assumptions, identify fundamental truths, and discover breakthrough solutions
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary-600 font-bold text-lg">🎯</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Design Thinking</h3>
                <p className="text-gray-600 text-sm">
                  Empathize, Define, Ideate, Prototype, Test - complete user-centered innovation process
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-primary-600 font-bold text-lg">🧠</div>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Structured Frameworks</h3>
                <p className="text-gray-600 text-sm">
                  SCAMPER, 5 Whys, Persona Canvas, and more proven brainstorming methodologies
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowChat(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
            >
              <div className="text-lg">🧠</div>
              <span>Start Breakthrough Thinking</span>
            </button>

            <div className="text-sm text-gray-500 max-w-2xl mx-auto">
              <p>
                <strong>Try these approaches:</strong> "Revolutionize urban transportation from first principles", 
                "Design a user-centered fintech experience", 
                "Use SCAMPER to improve remote collaboration", "Question assumptions about food delivery"
              </p>
            </div>
          </div>
        ) : (
          /* Chat Interface */
          <ChatInterface onBack={() => setShowChat(false)} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>
            Built by{' '}
            <a href="https://prosora.in" className="text-primary-600 hover:underline">
              Prosora
            </a>{' '}
            • Powered by Google Gemini & LangChain
          </p>
        </div>
      </footer>
    </div>
  )
}