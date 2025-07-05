import companies from '@/lib/company.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(companies)
}
