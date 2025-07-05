import { NextResponse } from 'next/server'
import metafieldss from '@/lib/metafieldss.json'

export async function GET() {
  return NextResponse.json(metafieldss)
}
