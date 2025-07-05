import { NextResponse } from 'next/server'
import settingsOptions from '@/lib/settings-options.json'

export async function GET() {
  return NextResponse.json(settingsOptions)
}
