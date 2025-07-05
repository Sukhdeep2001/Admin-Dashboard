import { NextResponse } from 'next/server'
import superShippingRules from '@/lib/superShippingRules.json'

export async function GET() {
  return NextResponse.json(superShippingRules)
}
