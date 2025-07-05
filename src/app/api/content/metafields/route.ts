import metafields from '@/lib/metafields.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(metafields)
}
