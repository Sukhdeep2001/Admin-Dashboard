import blogPosts from '@/lib/blogPosts.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(blogPosts)
}
