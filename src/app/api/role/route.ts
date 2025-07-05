import { NextResponse } from 'next/server'
import roles from '@/lib/role.json'

export async function GET() {
  return NextResponse.json(roles)
}
