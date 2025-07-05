import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'inventory.json')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const inventory = JSON.parse(data)
    return new Response(JSON.stringify(inventory), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to load inventory' }), { status: 500 })
  }
}
