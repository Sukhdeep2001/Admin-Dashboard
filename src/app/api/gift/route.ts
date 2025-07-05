import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'gift.json') // adjust if your file is in a different location

  try {
    const data = await fs.readFile(filePath, 'utf-8')
    const giftcards = JSON.parse(data)

    return new Response(JSON.stringify(giftcards), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to load gift cards' }), {
      status: 500,
    })
  }
}
