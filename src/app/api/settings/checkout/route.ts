import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { name, email, planId, planTitle, billingCycle, price } = body

    // Validate required fields
    if (!name || !email || !planId || !billingCycle || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate saving order to database
    const newOrder = {
      id: Date.now().toString(),
      name,
      email,
      planId,
      planTitle,
      billingCycle,
      price,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // You can push this into DB instead (e.g., MySQL, Mongo, etc.)
    console.log('New checkout order:', newOrder)

    return NextResponse.json({ message: 'Checkout successful', order: newOrder }, { status: 200 })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
