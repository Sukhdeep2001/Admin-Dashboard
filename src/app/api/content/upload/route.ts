import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Normally handle multipart/form-data or JSON
  return NextResponse.json({ message: 'Upload successful (mocked)' })
}
