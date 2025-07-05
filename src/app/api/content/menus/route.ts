import { NextResponse } from 'next/server'
import menus from '@/lib/menus.json'

export async function GET() {
  return NextResponse.json(menus)
}
