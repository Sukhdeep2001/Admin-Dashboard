import uploads from '@/lib/uploads.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(uploads)
}
