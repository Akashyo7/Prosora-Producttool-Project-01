import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Product Idea Assistant | AI-Powered Innovation Tool',
  description: 'Generate innovative product ideas using AI. Built with Gemini and LangChain for rapid product ideation.',
  keywords: 'product management, AI, innovation, startup ideas, product development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}