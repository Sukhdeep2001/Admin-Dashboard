import { NextResponse } from 'next/server'
import shippingZones from '@/lib/shippingZones.json'

export async function GET() {
  return NextResponse.json(shippingZones)
}
