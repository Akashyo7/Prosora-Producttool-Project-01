// Simple in-memory storage for Product Intelligence
// In production, this would be a proper database

import { ProductContext, ProductIntelligence } from './intelligence'

// In-memory storage
const contextStore = new Map<string, ProductContext>()
const intelligenceStore = new Map<string, ProductIntelligence>()

export class IntelligenceStorage {
  // Create or get existing context
  static getOrCreateContext(sessionId: string, initialData?: Partial<ProductContext>): ProductIntelligence {
    let context = contextStore.get(sessionId)
    
    if (!context) {
      context = {
        id: sessionId,
        domain: initialData?.domain || 'general',
        stage: 'discovery',
        problems: [],
        solutions: [],
        assumptions: [],
        insights: [],
        decisions: [],
        learnings: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...initialData
      }
      contextStore.set(sessionId, context)
    }
    
    let intelligence = intelligenceStore.get(sessionId)
    if (!intelligence) {
      intelligence = new ProductIntelligence(context)
      intelligenceStore.set(sessionId, intelligence)
    }
    
    return intelligence
  }

  // Save context updates
  static saveContext(sessionId: string, intelligence: ProductIntelligence): void {
    const context = intelligence.exportContext()
    contextStore.set(sessionId, context)
    intelligenceStore.set(sessionId, intelligence)
  }

  // Get context summary for API responses
  static getContextSummary(sessionId: string): {
    domain: string
    stage: string
    insightCount: number
    problemCount: number
    solutionCount: number
    recommendations: string[]
    predictions: { outcome: string; probability: number }[]
  } | null {
    const intelligence = intelligenceStore.get(sessionId)
    if (!intelligence) return null
    
    const context = intelligence.exportContext()
    const recommendations = intelligence.generateRecommendations()
    const predictions = intelligence.predictOutcomes()
    
    return {
      domain: context.domain,
      stage: context.stage,
      insightCount: context.insights.length,
      problemCount: context.problems.length,
      solutionCount: context.solutions.length,
      recommendations: recommendations.slice(0, 3), // Top 3 recommendations
      predictions: predictions.slice(0, 2) // Top 2 predictions
    }
  }

  // Get all contexts (for debugging/admin)
  static getAllContexts(): ProductContext[] {
    return Array.from(contextStore.values())
  }

  // Clear old contexts (cleanup)
  static cleanup(olderThanDays: number = 7): void {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)
    
    for (const [sessionId, context] of contextStore.entries()) {
      if (context.updatedAt < cutoffDate) {
        contextStore.delete(sessionId)
        intelligenceStore.delete(sessionId)
      }
    }
  }
}

// Generate session ID
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}