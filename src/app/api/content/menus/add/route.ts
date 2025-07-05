import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  // Ideally save the data here (mocked for now)
  return NextResponse.json({ message: 'Menu added successfully', data: body })
}
