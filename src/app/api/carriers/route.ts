import { NextResponse } from 'next/server'
import carriers from '@/lib/carriers.json'

export async function GET() {
  return NextResponse.json(carriers)
}
