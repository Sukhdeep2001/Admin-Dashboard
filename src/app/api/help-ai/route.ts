import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ response: 'No message provided.' })
    }

    // Use latest model and API call
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent([message])
    const text = result.response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('❌ Gemini error:', error)
    return NextResponse.json({ response: 'Failed to get response from Gemini.' }, { status: 500 })
  }
}
