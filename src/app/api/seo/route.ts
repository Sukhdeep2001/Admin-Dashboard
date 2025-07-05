import { NextRequest, NextResponse } from 'next/server'

let seoData = {
  title: 'My Homepage',
  description: 'Welcome to my site. Best products here.',
  jsonld: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "My Homepage",
  "url": "https://example.com"
}`
}

// GET SEO Metadata
export async function GET() {
  return NextResponse.json(seoData)
}

// POST to update SEO Metadata
export async function POST(req: NextRequest) {
  const body = await req.json()
  seoData = { ...seoData, ...body }
  return NextResponse.json({ success: true })
}
