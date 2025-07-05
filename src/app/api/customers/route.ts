import customers from '@/lib/customer.json'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(customers)
}
