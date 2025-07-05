
import { NextResponse } from 'next/server'
import planData from '@/lib/plansCatalog.json'

export async function GET() {
  try {
    return NextResponse.json(planData)
  } catch (error) {
    return NextResponse.json({ message: 'Failed to fetch plans' }, { status: 500 })
  }
}
