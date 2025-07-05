import { NextResponse } from 'next/server'

export async function GET() {
  const domains = [
    { name: 'My Ecom Store', domain: 'myecomstore.com' },
    { name: 'Blog Site', domain: 'blogsite.io' }
  ]

  const sites = domains.map(site => ({
    name: site.name,
    favicon: `https://www.google.com/s2/favicons?sz=64&domain=${site.domain}`,
    thumbnail: `https://www.google.com/s2/favicons?sz=128&domain=${site.domain}` // Simulated thumbnail
  }))

  return NextResponse.json(sites)
}
