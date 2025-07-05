import { NextResponse } from 'next/server'
import data from '@/lib/super-users.json'

export async function GET() {
  return NextResponse.json(data)
}
