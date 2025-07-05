import { NextResponse } from 'next/server'
import reports from '@/lib/reports.json' // Make sure this path is correct

export async function GET() {
  return NextResponse.json(reports)
}
