import analytics from '@/lib/analytics.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(analytics)
}
