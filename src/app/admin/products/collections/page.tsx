'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'

type Collection = {
  id: string
  name: string
  description: string
  products: string[]
}

export default function CollectionsListPage() {
  const [collections, setCollections] = useState<Collection[]>([])

  useEffect(() => {
    fetch('/api/collections')
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.error('Failed to fetch collections:', err))
  }, [])

  return (
    <div className="p-4 sm:p-6 text-black space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">All Collections</h1>
        <Link href="/admin/products/collections/add">
          <Button>Add Collection</Button>
        </Link>
      </div>

      {collections.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No collections available.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto rounded border bg-white shadow-sm">
            <Table className="min-w-[700px] text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead>Collection Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Total Products</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collections.map((col) => (
                  <TableRow key={col.id}>
                    <TableCell className="font-medium">{col.name}</TableCell>
                    <TableCell>{col.description || '—'}</TableCell>
                    <TableCell>{col.products.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {collections.map((col) => (
              <Card
                key={col.id}
                className="p-4 flex justify-between items-start border rounded shadow-sm"
              >
                {/* Left Column */}
                <div className="flex-1 pr-2">
                  <div className="font-semibold text-base mb-1">{col.name}</div>
                  <div className="text-sm text-gray-600">
                    {col.description || 'No description'}
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col items-end justify-center text-right min-w-[80px]">
                  <div className="text-xl font-bold text-gray-800">
                    <div className="text-xs text-gray-500">Products {col.products.length}</div> 
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
