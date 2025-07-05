import { NextResponse } from 'next/server'
import data from '@/lib/userPermissions.json'

export async function GET() {
  return NextResponse.json(data)
}
