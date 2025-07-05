import segments from '@/lib/segment.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(segments)
}
