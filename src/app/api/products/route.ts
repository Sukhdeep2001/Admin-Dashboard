import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'lib', 'products.json')

  try {
    const data = await fs.readFile(filePath, 'utf8')
    const products = JSON.parse(data)
    return NextResponse.json(products)
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
}
