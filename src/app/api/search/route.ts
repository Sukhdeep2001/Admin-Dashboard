import { NextResponse } from 'next/server'
import products from '@/lib/products.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type') // for future filtering

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(query)
  )

  return NextResponse.json(filtered.slice(0, 10)) // limit results
}
