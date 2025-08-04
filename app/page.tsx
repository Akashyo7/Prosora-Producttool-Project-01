'use client'

import { useState } from 'react'
import { Lightbulb, Send, Github, ExternalLink } from 'lucide-react'
import ChatInterface from './components/ChatInterface'
import ModeSelector from './components/ModeSelector'
import ProsoraDashboard from './components/ProsoraDashboard'

type AppMode = 'selection' | 'prosora-dashboard' | 'prosora-chat' | 'guest-chat'
type UserMode = 'prosora' | 'guest'

export default function Home() {
  const [appMode, setAppMode] = useState<AppMode>('selection')
  const [userMode, setUserMode] = useState<UserMode | null>(null)
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)

  const handleModeSelect = (mode: UserMode) => {
    setUserMode(mode)
    if (mode === 'prosora') {
      setAppMode('prosora-dashboard')
    } else {
      setAppMode('guest-chat')
    }
  }

  const handleNewSession = () => {
    setCurrentSessionId(null)
    setAppMode(userMode === 'prosora' ? 'prosora-chat' : 'guest-chat')
  }

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId)
    setAppMode('prosora-chat')
  }

  const handleBackToDashboard = () => {
    if (userMode === 'prosora') {
      setAppMode('prosora-dashboard')
    } else {
      setAppMode('selection')
    }
  }

  const handleSettings = () => {
    // TODO: Implement settings modal
    console.log('Settings clicked')
  }

  // Mode Selection Screen
  if (appMode === 'selection') {
    return <ModeSelector onModeSelect={handleModeSelect} />
  }

  // Prosora Dashboard
  if (appMode === 'prosora-dashboard') {
    return (
      <ProsoraDashboard
        onNewSession={handleNewSession}
        onSessionSelect={handleSessionSelect}
        onSettings={handleSettings}
      />
    )
  }

  // Chat Interface (both modes)
  if (appMode === 'prosora-chat' || appMode === 'guest-chat') {
    return (
      <ChatInterface 
        onBack={handleBackToDashboard}
        mode={userMode}
        sessionId={currentSessionId}
      />
    )
  }

  return (
    <div>This should not render</div>
  )
}