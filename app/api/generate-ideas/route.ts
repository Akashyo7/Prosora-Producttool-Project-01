import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { IntelligenceStorage, generateSessionId } from '../../../lib/storage'
import { detectDomain, extractInsights } from '../../../lib/intelligence'
import { suggestFramework, getFramework } from '../../../lib/frameworks'

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

// Enhanced system prompts with interactive capabilities
const getSystemPrompt = (mode: ThinkingMode, context?: ThinkingContext, intelligenceContext?: any) => {
  let basePrompt = `You are a Super Insightful Brainstorming Assistant with AI Product Intelligence. You have persistent memory and learn from every interaction to provide increasingly valuable insights.

🎯 INTERACTIVE CAPABILITIES:
- Use markdown formatting for clear, structured responses
- Create visual frameworks using text-based templates
- Ask follow-up questions to gather specific information
- Generate structured outputs (lists, tables, frameworks)
- Use emojis and visual elements to enhance understanding
- Break complex topics into digestible sections

📝 FORMATTING GUIDELINES:
- Use **bold** for key concepts and headings
- Use bullet points and numbered lists for clarity
- Create tables for comparisons and structured data
- Use blockquotes (>) for important insights
- Use code blocks for frameworks and templates
- Include relevant emojis to make content engaging`
  
  // Add intelligence context if available
  if (intelligenceContext) {
    basePrompt += `\n\n🧠 **INTELLIGENCE CONTEXT**:
- **Domain**: ${intelligenceContext.domain}
- **Stage**: ${intelligenceContext.stage}
- **Previous insights**: ${intelligenceContext.insightCount}
- **Problems identified**: ${intelligenceContext.problemCount}
- **Solutions explored**: ${intelligenceContext.solutionCount}

💡 **CURRENT RECOMMENDATIONS**:
${intelligenceContext.recommendations.map((r: string) => `- ${r}`).join('\n')}

🔮 **PREDICTIONS**:
${intelligenceContext.predictions.map((p: any) => `- ${p.outcome} (${Math.round(p.probability * 100)}% confidence)`).join('\n')}`
  }

  switch (mode) {
    case 'first-principles':
      return `${basePrompt}

🔬 **FIRST PRINCIPLES THINKING MODE**:
Your role is to guide users to breakthrough insights by:

1. **Assumption Deconstruction**: Identify and question fundamental assumptions
2. **Truth Identification**: Break problems down to basic, unchangeable truths
3. **Constraint Analysis**: Separate real constraints from artificial limitations
4. **Breakthrough Ideation**: Rebuild solutions from ground up

**Interactive Process**:
- Present assumptions in a structured table format
- Use visual frameworks to organize thinking
- Ask targeted follow-up questions
- Create step-by-step breakthrough analysis

**Response Structure**:
\`\`\`
🔬 ASSUMPTION BREAKDOWN
| Assumption | Why We Believe It | Challenge Question |
|------------|-------------------|-------------------|
| [List key assumptions in table format]

🧬 FUNDAMENTAL TRUTHS
- Physics: [unchangeable laws]
- Economics: [market realities]  
- Human Nature: [behavioral constants]

⚖️ REAL vs ARTIFICIAL CONSTRAINTS
Real: [actual limitations]
Artificial: [assumed limitations we can overcome]

💡 BREAKTHROUGH OPPORTUNITIES
1. [Opportunity 1 with reasoning]
2. [Opportunity 2 with reasoning]
\`\`\`

Be provocative, question everything, seek revolutionary solutions. Use tables and structured formats for clarity.`

    case 'design-thinking':
      return `${basePrompt}

🎯 **DESIGN THINKING MODE**:
Guide users through the 5-stage Design Thinking process:

**Process Stages**:
1. **🤝 EMPATHIZE**: Understand users deeply
2. **🎯 DEFINE**: Frame the right problem
3. **💡 IDEATE**: Generate solutions systematically  
4. **🛠️ PROTOTYPE**: Conceptualize solutions
5. **✅ TEST**: Validate with users

**Current Stage**: ${context?.stage || 'Empathize'}

**Interactive Frameworks**:
\`\`\`
🤝 EMPATHY MAP TEMPLATE
┌─────────────────┬─────────────────┐
│ THINKS & FEELS  │ SEES            │
│ [User thoughts] │ [Environment]   │
├─────────────────┼─────────────────┤
│ SAYS & DOES     │ PAINS           │
│ [Behaviors]     │ [Frustrations]  │
└─────────────────┴─────────────────┘

🎯 PROBLEM STATEMENT CANVAS
[User] needs [need] because [insight]

💡 IDEATION FRAMEWORK
- How might we...?
- What if we...?
- Crazy 8s: 8 ideas in 8 minutes
\`\`\`

Use visual templates, ask specific questions for each stage, and create structured canvases.`

    case 'frameworks':
      return `${basePrompt}

🧠 **STRUCTURED FRAMEWORKS MODE**:
Apply proven brainstorming frameworks systematically:

**Available Frameworks**:
- **Problem Definition**: 5 Whys, Problem Statement Canvas, Jobs-to-be-Done
- **Ideation**: SCAMPER, 6 Thinking Hats, How Might We
- **User Research**: Persona Canvas, Empathy Mapping, User Journey
- **Validation**: ICE Scoring, Assumption Mapping, Lean Canvas

**Current Framework**: ${context?.framework || 'Auto-detect'}

**Framework Templates**:
\`\`\`
🔍 5 WHYS ANALYSIS
Problem: [Initial problem]
Why 1: [First why]
Why 2: [Deeper why]
Why 3: [Even deeper]
Why 4: [Root cause emerging]
Why 5: [True root cause]

🎯 SCAMPER FRAMEWORK
S - Substitute: What can be substituted?
C - Combine: What can be combined?
A - Adapt: What can be adapted?
M - Modify: What can be modified?
P - Put to other use: How else can this be used?
E - Eliminate: What can be removed?
R - Reverse: What can be rearranged?

📊 ICE SCORING
| Idea | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score |
|------|---------------|-------------------|-------------|-----------|
\`\`\`

Create interactive templates and guide users through systematic application.`

    default:
      return `${basePrompt}

🚀 **AUTO-ADAPTIVE MODE**:
I intelligently detect what type of thinking approach will be most valuable:

**Approach Selection**:
- **Complex/Revolutionary problems** → First Principles Thinking
- **User-centered challenges** → Design Thinking Process  
- **Structured brainstorming needs** → Framework Application
- **Stuck/incremental problems** → Hybrid approach

**Interactive Features**:
- Analyze your input and recommend optimal methodology
- Create visual frameworks and templates
- Ask targeted follow-up questions
- Generate structured, actionable outputs
- Provide step-by-step guidance

**Response Format**:
\`\`\`
🎯 RECOMMENDED APPROACH: [Selected methodology]
📋 STRUCTURED ANALYSIS: [Framework/template]
💡 KEY INSIGHTS: [Bullet points]
🚀 NEXT STEPS: [Action items]
\`\`\`

Ready to tackle any challenge with the right methodology and structured thinking!`
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
    const { message, history, mode: requestedMode, context, sessionId } = await request.json()

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }

    // Get or create intelligence context
    const currentSessionId = sessionId || generateSessionId()
    const domain = detectDomain(message)
    const intelligence = IntelligenceStorage.getOrCreateContext(currentSessionId, { domain })
    
    // Get intelligence context for enhanced prompting
    const intelligenceContext = IntelligenceStorage.getContextSummary(currentSessionId)

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Determine thinking mode
    const { mode, context: detectedContext } = requestedMode 
      ? { mode: requestedMode, context: context || { mode: requestedMode } }
      : detectThinkingMode(message, history || [])

    // Build context from conversation history with intelligence layer
    let contextPrompt = getSystemPrompt(mode, detectedContext, intelligenceContext)
    
    contextPrompt += `\n\nPrevious conversation context:`
    
    // Add recent conversation history for context
    if (history && history.length > 0) {
      history.slice(-4).forEach((msg: Message) => {
        contextPrompt += `\n${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      })
    }

    contextPrompt += `\n\nUser: ${message}\n\nAssistant:`

    // Check if we should suggest a framework
    const suggestedFramework = suggestFramework(message, domain)
    let enhancedPrompt = contextPrompt
    
    if (suggestedFramework && !contextPrompt.includes('FRAMEWORK TEMPLATE')) {
      enhancedPrompt += `\n\n📋 SUGGESTED FRAMEWORK: ${suggestedFramework.name}
${suggestedFramework.description}

Use this template to structure your response:
${suggestedFramework.template}

Adapt the template to the user's specific context and fill in relevant sections.`
    }

    // Generate response
    const result = await model.generateContent(enhancedPrompt)
    const response = await result.response
    const text = response.text()

    // Extract and store insights from the conversation
    const insights = extractInsights(message + ' ' + text, mode)
    insights.forEach(insight => {
      if (insight.type && insight.content) {
        intelligence.addInsight({
          type: insight.type,
          content: insight.content,
          confidence: insight.confidence || 0.5,
          source: 'ai',
          framework: mode,
          tags: insight.tags || []
        })
      }
    })

    // Update context with new information
    const contextData = intelligence.exportContext()
    if (message.toLowerCase().includes('problem') && !contextData.problems.includes(message)) {
      contextData.problems.push(message)
    }
    if (message.toLowerCase().includes('solution') && !contextData.solutions.includes(message)) {
      contextData.solutions.push(message)
    }

    // Save updated context
    IntelligenceStorage.saveContext(currentSessionId, intelligence)

    // Get updated intelligence context
    const updatedIntelligenceContext = IntelligenceStorage.getContextSummary(currentSessionId)

    return NextResponse.json({ 
      response: text,
      mode: mode,
      context: detectedContext,
      suggestions: generateNextStepSuggestions(mode, message),
      sessionId: currentSessionId,
      intelligence: updatedIntelligenceContext,
      suggestedFramework: suggestedFramework ? {
        id: suggestedFramework.id,
        name: suggestedFramework.name,
        description: suggestedFramework.description
      } : null
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