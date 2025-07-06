'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Product = {
  id: string
  title: string
  description: string
  image: string
  category: string
  collection: string
  url?: string
  metaTitle: string
  metaDescription: string
  tags: string[]
  published: boolean
  salesChannels: string[]
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch products:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="sm:p-6 text-black">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button onClick={() => router.push('/admin/products/add')}>
          + Add Product
        </Button>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No products found.</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full border text-sm bg-white shadow rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Image</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Collection</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Sales Channels</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id || product.title} className="border-t hover:bg-gray-50 transition">
                    <td className="p-3">
                      <Image
                        src={product.image || '/fallback.jpg'}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium">{product.title}</td>
                    <td className="p-3">{product.category || '—'}</td>
                    <td className="p-3">{product.collection || '—'}</td>
                    <td className="p-3">
                      <Badge variant={product.published ? 'default' : 'secondary'}>
                        {product.published ? 'Published' : 'Hidden'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {product.salesChannels?.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {product.salesChannels.map((ch, i) => (
                            <Badge key={i} variant="outline">{ch}</Badge>
                          ))}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden flex flex-col gap-4">
            {products.map(product => (
              <div key={product.id || product.title} className="border rounded-md shadow p-4 bg-white">
                <div className="flex items-center gap-4 mb-3">
                  <Image
                    src={product.image || '/fallback.jpg'}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{product.title}</h2>
                    <Badge variant={product.published ? 'default' : 'secondary'}>
                      {product.published ? 'Published' : 'Hidden'}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <div><strong>Category:</strong> {product.category || '—'}</div>
                  <div><strong>Collection:</strong> {product.collection || '—'}</div>
                  <div><strong>Sales Channels:</strong> {product.salesChannels?.join(', ') || '—'}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
