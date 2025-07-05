// /app/api/search-eligibility/route.ts
import { NextResponse } from 'next/server'
import customers from '@/lib/customer.json'
import segments from '@/lib/segment.json'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')?.toLowerCase() || ''
  const type = searchParams.get('type')

  let results: { id: string; name: string }[] = []

  if (type === 'customers') {
    results = customers
      .filter((c) => c.name.toLowerCase().includes(query))
      .map((c) => ({ id: c.id, name: c.name }))
  }

  if (type === 'segments') {
    results = segments
      .filter((s) => s.name.toLowerCase().includes(query))
      .map((s) => ({ id: s.id, name: s.name }))
  }

  return NextResponse.json(results)
}
