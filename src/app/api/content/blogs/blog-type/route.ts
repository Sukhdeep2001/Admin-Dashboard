import blogTypes from '@/lib/blogTypes.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(blogTypes)
}
