
import { NextResponse } from 'next/server'
import pricingPlans from '@/lib/pricingPlans.json'

export async function GET() {
  try {
    return NextResponse.json(pricingPlans)
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch plans' }, { status: 500 })
  }
}
