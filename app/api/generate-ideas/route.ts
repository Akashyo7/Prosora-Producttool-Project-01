import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key not configured' },
        { status: 500 }
      )
    }

    // Get the generative model (try gemini-1.5-flash for better availability)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Build context from conversation history
    let contextPrompt = `You are a Product Idea Assistant, an AI expert in product management and innovation. Your role is to generate creative, practical, and market-viable product ideas based on user inputs.

Guidelines:
- Generate 3-5 specific product ideas per request
- Include brief explanations of the value proposition
- Consider current market trends and technology capabilities
- Focus on problems that genuinely need solving
- Be creative but realistic about implementation
- Format responses clearly with numbered ideas
- Ask follow-up questions to refine ideas when appropriate

Previous conversation context:`

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

    return NextResponse.json({ response: text })

  } catch (error) {
    console.error('Error generating ideas:', error)
    
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
      { error: 'Failed to generate ideas. Please try again.' },
      { status: 500 }
    )
  }
}