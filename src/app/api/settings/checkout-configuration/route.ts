import { NextResponse } from 'next/server'
import checkoutSettings from '@/lib/checkout-settings.json'

export async function GET() {
  return NextResponse.json(checkoutSettings)
}
