import { NextResponse } from 'next/server'
import reports from '@/lib/integrations.json' // Make sure this path is correct

export async function GET() {
  return NextResponse.json(reports)
}
