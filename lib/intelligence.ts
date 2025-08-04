// AI Product Intelligence Layer
export interface ProductContext {
  id: string
  userId?: string
  domain: string // e.g., "fintech", "healthcare", "e-commerce"
  stage: 'discovery' | 'ideation' | 'validation' | 'planning' | 'execution'
  problems: string[]
  solutions: string[]
  assumptions: string[]
  insights: Insight[]
  decisions: Decision[]
  learnings: Learning[]
  createdAt: Date
  updatedAt: Date
}

export interface Insight {
  id: string
  type: 'assumption' | 'opportunity' | 'risk' | 'pattern' | 'prediction'
  content: string
  confidence: number // 0-1
  source: 'user' | 'ai' | 'external'
  framework: string // e.g., "first-principles", "design-thinking"
  tags: string[]
  createdAt: Date
}

export interface Decision {
  id: string
  question: string
  decision: string
  reasoning: string
  confidence: number
  outcome?: 'success' | 'failure' | 'mixed' | 'pending'
  createdAt: Date
}

export interface Learning {
  id: string
  pattern: string
  evidence: string[]
  applicability: string[] // domains where this applies
  confidence: number
  createdAt: Date
}

export interface IntelligenceSignal {
  type: 'market_trend' | 'competitor_move' | 'user_behavior' | 'tech_advancement'
  content: string
  relevance: number // 0-1
  urgency: 'low' | 'medium' | 'high'
  source: string
  createdAt: Date
}

// Intelligence Layer Class
export class ProductIntelligence {
  private context: ProductContext
  
  constructor(context: ProductContext) {
    this.context = context
  }

  // Add new insight and update context
  addInsight(insight: Omit<Insight, 'id' | 'createdAt'>): Insight {
    const newInsight: Insight = {
      ...insight,
      id: `insight_${Date.now()}`,
      createdAt: new Date()
    }
    
    this.context.insights.push(newInsight)
    this.updateContext()
    
    return newInsight
  }

  // Record decision and learn from it
  recordDecision(decision: Omit<Decision, 'id' | 'createdAt'>): Decision {
    const newDecision: Decision = {
      ...decision,
      id: `decision_${Date.now()}`,
      createdAt: new Date()
    }
    
    this.context.decisions.push(newDecision)
    this.updateContext()
    
    return newDecision
  }

  // Generate contextual recommendations
  generateRecommendations(): string[] {
    const recommendations: string[] = []
    
    // Based on current stage
    switch (this.context.stage) {
      case 'discovery':
        recommendations.push("Consider first principles analysis to question fundamental assumptions")
        recommendations.push("Explore user pain points using empathy mapping")
        break
      case 'ideation':
        recommendations.push("Apply SCAMPER framework to generate more solution variants")
        recommendations.push("Use 'How Might We' questions to reframe problems")
        break
      case 'validation':
        recommendations.push("Create testable hypotheses for your key assumptions")
        recommendations.push("Design lean experiments to validate core value propositions")
        break
    }

    // Based on domain patterns
    if (this.context.domain === 'fintech') {
      recommendations.push("Consider regulatory compliance early in design")
      recommendations.push("Explore trust and security as core value propositions")
    }

    // Based on insight patterns
    const assumptionCount = this.context.insights.filter(i => i.type === 'assumption').length
    if (assumptionCount > 5) {
      recommendations.push("You have many assumptions - consider prioritizing which to test first")
    }

    return recommendations
  }

  // Predict likely outcomes based on patterns
  predictOutcomes(): { outcome: string; probability: number; reasoning: string }[] {
    const predictions: { outcome: string; probability: number; reasoning: string }[] = []
    
    // Simple pattern-based predictions (would be ML-powered in production)
    const problemCount = this.context.problems.length
    const solutionCount = this.context.solutions.length
    const insightCount = this.context.insights.length
    
    if (problemCount > 0 && solutionCount > 0 && insightCount > 3) {
      predictions.push({
        outcome: "High likelihood of finding product-market fit",
        probability: 0.75,
        reasoning: "Strong problem definition with multiple solutions and deep insights"
      })
    }
    
    if (this.context.assumptions.length > 10) {
      predictions.push({
        outcome: "Risk of analysis paralysis",
        probability: 0.6,
        reasoning: "Many unvalidated assumptions may slow decision making"
      })
    }
    
    return predictions
  }

  // Get relevant past learnings
  getRelevantLearnings(currentTopic: string): Learning[] {
    return this.context.learnings.filter(learning => 
      learning.applicability.includes(this.context.domain) ||
      learning.pattern.toLowerCase().includes(currentTopic.toLowerCase())
    )
  }

  // Update context based on new information
  private updateContext(): void {
    this.context.updatedAt = new Date()
    
    // Auto-detect stage progression
    if (this.context.problems.length > 0 && this.context.stage === 'discovery') {
      this.context.stage = 'ideation'
    }
    
    if (this.context.solutions.length > 0 && this.context.stage === 'ideation') {
      this.context.stage = 'validation'
    }
  }

  // Export context for persistence
  exportContext(): ProductContext {
    return { ...this.context }
  }
}

// Helper functions for intelligence processing
export const detectDomain = (content: string): string => {
  const domainKeywords = {
    fintech: ['payment', 'banking', 'finance', 'money', 'transaction', 'credit', 'loan'],
    healthcare: ['health', 'medical', 'patient', 'doctor', 'treatment', 'diagnosis'],
    ecommerce: ['shopping', 'retail', 'marketplace', 'seller', 'buyer', 'product catalog'],
    education: ['learning', 'student', 'teacher', 'course', 'education', 'training'],
    transportation: ['transport', 'mobility', 'vehicle', 'travel', 'logistics', 'delivery']
  }
  
  const lowerContent = content.toLowerCase()
  
  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    if (keywords.some(keyword => lowerContent.includes(keyword))) {
      return domain
    }
  }
  
  return 'general'
}

export const extractInsights = (content: string, framework: string): Partial<Insight>[] => {
  const insights: Partial<Insight>[] = []
  
  // Pattern matching for different types of insights
  if (content.includes('assumption') || content.includes('assume')) {
    insights.push({
      type: 'assumption',
      content: 'User assumption detected in conversation',
      confidence: 0.7,
      framework,
      tags: ['assumption', 'validation-needed']
    })
  }
  
  if (content.includes('opportunity') || content.includes('potential')) {
    insights.push({
      type: 'opportunity',
      content: 'Market opportunity identified',
      confidence: 0.6,
      framework,
      tags: ['opportunity', 'market']
    })
  }
  
  return insights
}