import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'collection.json')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const collections = JSON.parse(data)
    return new Response(JSON.stringify(collections), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to load collections' }), { status: 500 })
  }
}
