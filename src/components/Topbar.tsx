'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Bell, UserCircle2 } from 'lucide-react'
import Link from 'next/link'
import ResponsiveSidebar from '@/components/ResponsiveSidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

type SearchResult = {
  id: string
  label: string
  href: string
}

export default function Topbar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [searchItems, setSearchItems] = useState<SearchResult[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const discounts = (await import('@/lib/discounts.json')).default || []
        const products = (await import('@/lib/products.json')).default || []
        const customers = (await import('@/lib/customer.json')).default || []
        const orders = (await import('@/lib/orders.json')).default || []
        const segments = (await import('@/lib/segment.json')).default || []
        const blogs = (await import('@/lib/blogs.json')).default || []
        const metafields = (await import('@/lib/metafields.json')).default || []
        const integrations = (await import('@/lib/integrations.json')).default || []

        const merged: SearchResult[] = [
          ...discounts.map((d: any) => ({
            id: d.id?.toString() || '',
            label: d.title || `Discount: ${d.id}`,
            href: '/admin/discounts',
          })),
          ...products.map((p: any) => ({
            id: p.id?.toString() || '',
            label: p.title || `Product: ${p.id}`,
            href: '/admin/products',
          })),
          ...customers.map((c: any) => ({
            id: c.id?.toString() || '',
            label: c.name || `Customer: ${c.id}`,
            href: '/admin/customers',
          })),
          ...orders.map((o: any) => ({
            id: o.id?.toString() || '',
            label: o.orderNumber ? `Order #${o.orderNumber}` : `Order: ${o.id}`,
            href: '/admin/orders',
          })),
          ...segments.map((s: any) => ({
            id: s.id?.toString() || '',
            label: s.name || `Segment: ${s.id}`,
            href: '/admin/customers/segments',
          })),
          ...blogs.map((b: any) => ({
            id: b.id?.toString() || '',
            label: b.title || `Blog: ${b.id}`,
            href: '/admin/content/blogs',
          })),
          ...metafields.map((m: any) => ({
            id: m.id?.toString() || '',
            label: m.key || `Metafield: ${m.id}`,
            href: '/admin/content/metafields',
          })),
          ...integrations.map((i: any) => ({
            id: i.id?.toString() || '',
            label: i.name || `Integration: ${i.id}`,
            href: '/admin/analytics/integrations',
          })),
        ]

        // Filter out invalid results (missing id/label)
        const validResults = merged.filter(
          (item) => item.id && item.label
        )

        setSearchItems(validResults)
      } catch (err) {
        console.error('Error loading search data:', err)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([])
      return
    }

    const lowerQuery = query.toLowerCase()
    const results = searchItems.filter(
      (item) =>
        item.label?.toLowerCase().includes(lowerQuery) ||
        item.id?.toLowerCase().includes(lowerQuery)
    )
    setFilteredResults(results)
  }, [query, searchItems])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredResults.length > 0) {
      router.push(filteredResults[0].href)
    } else {
      alert('No results found')
    }
  }

  return (
    <header className="w-full h-16 bg-black gap-3 text-white px-3 lg:px-6 flex items-center justify-between relative z-50">
      {/* Left: Store Name */}
      <div className="text-lg block md:hidden flex font-semibold">
        <ResponsiveSidebar />
      </div>

      {/* Center: Search Bar */}
      <form onSubmit={handleSearch} className="w-full relative">
        <Input
          type="text"
          placeholder="Search orders, products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-black border-white text-white placeholder-gray-300"
        />
        {query && (
          <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg rounded z-50 mt-1 max-h-64 overflow-y-auto">
            {filteredResults.length > 0 ? (
              filteredResults.map((res) => (
                <Link
                  href={res.href}
                  key={res.id}
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  {res.label}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
            )}
          </div>
        )}
      </form>

      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <button className="hover:text-gray-300 transition">
          <Bell className="text-white w-5 h-5" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:text-gray-300 transition">
              <UserCircle2 className="w-7 h-7 text-white" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white text-black mt-2">
            <DropdownMenuItem asChild>
              <Link href="/admin/profile" className="w-full">Profile Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/help" className="w-full">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem('auth_token')
                localStorage.removeItem('username')
                window.location.href = '/'
              }}
              className="cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
