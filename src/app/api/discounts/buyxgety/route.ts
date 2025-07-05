import buyxgety from '@/lib/discounts.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(buyxgety)
}
