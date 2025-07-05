import { NextResponse } from 'next/server'
import shippingProfiles from '@/lib/shippingProfiles.json'

export async function GET() {
  return NextResponse.json(shippingProfiles)
}
