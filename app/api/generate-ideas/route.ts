import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

interface Message {
  role: 'user' | 'assistant'
  content: string
}

type ThinkingMode = 'first-principles' | 'design-thinking' | 'frameworks' | 'auto'

interface ThinkingContext {
  mode: ThinkingMode
  stage?: string
  framework?: string
  assumptions?: string[]
  insights?: string[]
}

// System prompts for different thinking modes
const getSystemPrompt = (mode: ThinkingMode, context?: ThinkingContext) => {
  const basePrompt = `You are a Super Insightful Brainstorming Assistant, an expert in advanced product thinking methodologies. You guide users through breakthrough problem-solving using multiple thinking frameworks.`

  switch (mode) {
    case 'first-principles':
      return `${basePrompt}

🔬 FIRST PRINCIPLES THINKING MODE:
Your role is to guide users to breakthrough insights by:

1. **Assumption Deconstruction**: Identify and question fundamental assumptions
2. **Truth Identification**: Break problems down to basic, unchangeable truths
3. **Constraint Analysis**: Separate real constraints from artificial limitations
4. **Breakthrough Ideation**: Rebuild solutions from ground up

Process:
- Ask "What assumptions are we making?"
- Challenge each assumption systematically
- Identify fundamental truths (physics, economics, human nature)
- Explore solutions using only these truths
- Guide toward breakthrough innovations

Format responses with:
🔬 **ASSUMPTION BREAKDOWN**
🧬 **FUNDAMENTAL TRUTHS** 
⚖️ **REAL CONSTRAINTS**
💡 **BREAKTHROUGH OPPORTUNITIES**

Be provocative, question everything, seek revolutionary solutions.`

    case 'design-thinking':
      return `${basePrompt}

🎯 DESIGN THINKING MODE:
Guide users through the 5-stage Design Thinking process:

1. **🤝 EMPATHIZE**: Understand users deeply
2. **🎯 DEFINE**: Frame the right problem
3. **💡 IDEATE**: Generate solutions systematically  
4. **🛠️ PROTOTYPE**: Conceptualize solutions
5. **✅ TEST**: Validate with users

Current Stage: ${context?.stage || 'Empathize'}

Use structured frameworks:
- Empathy Mapping for understanding users
- Problem Statement Canvas for defining problems
- SCAMPER/6 Thinking Hats for ideation
- Assumption Mapping for validation

Format with clear stage indicators and guide users through each step systematically.`

    case 'frameworks':
      return `${basePrompt}

🧠 STRUCTURED FRAMEWORKS MODE:
Apply proven brainstorming frameworks systematically:

**Problem Definition**: 5 Whys, Problem Statement Canvas, Jobs-to-be-Done
**Ideation**: SCAMPER, 6 Thinking Hats, How Might We
**User Research**: Persona Canvas, Empathy Mapping, User Journey
**Validation**: ICE Scoring, Assumption Mapping, Lean Canvas

Current Framework: ${context?.framework || 'Auto-detect'}

Guide users through step-by-step framework application with structured outputs.`

    default:
      return `${basePrompt}

🚀 AUTO-ADAPTIVE MODE:
I intelligently detect what type of thinking approach will be most valuable:

- **Complex/Revolutionary problems** → First Principles Thinking
- **User-centered challenges** → Design Thinking Process  
- **Structured brainstorming needs** → Framework Application
- **Stuck/incremental problems** → Hybrid approach

I'll analyze your input and recommend the best thinking approach, then guide you through it systematically.

Ready to tackle any challenge with the right methodology!`
  }
}

// Detect optimal thinking mode based on user input
const detectThinkingMode = (message: string, history: Message[]): { mode: ThinkingMode, context: ThinkingContext } => {
  const lowerMessage = message.toLowerCase()
  
  // First principles indicators
  if (lowerMessage.includes('revolutionize') || 
      lowerMessage.includes('breakthrough') || 
      lowerMessage.includes('completely new') ||
      lowerMessage.includes('from scratch') ||
      lowerMessage.includes('fundamental')) {
    return { 
      mode: 'first-principles', 
      context: { mode: 'first-principles' }
    }
  }
  
  // Design thinking indicators
  if (lowerMessage.includes('user') || 
      lowerMessage.includes('customer') || 
      lowerMessage.includes('experience') ||
      lowerMessage.includes('empathy') ||
      lowerMessage.includes('persona')) {
    return { 
      mode: 'design-thinking', 
      context: { mode: 'design-thinking', stage: 'empathize' }
    }
  }
  
  // Framework indicators
  if (lowerMessage.includes('framework') || 
      lowerMessage.includes('structured') || 
      lowerMessage.includes('systematic') ||
      lowerMessage.includes('canvas') ||
      lowerMessage.includes('scamper')) {
    return { 
      mode: 'frameworks', 
      context: { mode: 'frameworks' }
    }
  }
  
  // Default to auto-adaptive
  return { 
    mode: 'auto', 
    context: { mode: 'auto' }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history, mode: requestedMode, context } = await request.json()

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Determine thinking mode
    const { mode, context: detectedContext } = requestedMode 
      ? { mode: requestedMode, context: context || { mode: requestedMode } }
      : detectThinkingMode(message, history || [])

    // Build context from conversation history
    let contextPrompt = getSystemPrompt(mode, detectedContext)
    
    contextPrompt += `\n\nPrevious conversation context:`
    
    // Add recent conversation history for context
    if (history && history.length > 0) {
      history.slice(-4).forEach((msg: Message) => {
        contextPrompt += `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      })
    }

    contextPrompt += `\n\nUser: ${message}\n\nAssistant:`

    // Generate response
    const result = await model.generateContent(contextPrompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ 
      response: text,
      mode: mode,
      context: detectedContext,
      suggestions: generateNextStepSuggestions(mode, message)
    })

  } catch (error) {
    console.error('Error in brainstorming assistant:', error)
    
    // Handle specific API errors
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      
      if (error.message.includes('API_KEY') || error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key configuration' },
          { status: 401 }
        )
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        )
      }
      if (error.message.includes('model') || error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Model not available. Please try again.' },
          { status: 503 }
        )
      }
      
      // Return the actual error message for debugging
      return NextResponse.json(
        { error: `API Error: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    )
  }
}

// Generate contextual next step suggestions
const generateNextStepSuggestions = (mode: ThinkingMode, message: string): string[] => {
  switch (mode) {
    case 'first-principles':
      return [
        "Question a fundamental assumption",
        "Identify basic physical/economic constraints", 
        "Explore breakthrough alternatives",
        "Challenge conventional wisdom"
      ]
    case 'design-thinking':
      return [
        "Create user personas",
        "Map the user journey",
        "Define the core problem",
        "Generate solution ideas"
      ]
    case 'frameworks':
      return [
        "Apply SCAMPER framework",
        "Use 5 Whys analysis",
        "Create assumption map",
        "Try How Might We questions"
      ]
    default:
      return [
        "Explore with first principles thinking",
        "Apply design thinking process",
        "Use structured frameworks",
        "Deep dive into user needs"
      ]
  }
}