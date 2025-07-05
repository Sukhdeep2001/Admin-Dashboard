'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'

type InventoryItem = {
  id: string
  title: string
  sku: string
  barcode: string
  location: string
  stock: number
  trackQuantity: boolean
  status: string
  image: string
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setInventory(data))
      .catch(err => console.error('Error loading inventory:', err))
  }, [])

  const handleStockChange = (id: string, newStock: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, stock: newStock } : item
      )
    )
  }

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      {/* Desktop Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-x-auto hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Barcode</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Image
                    src={item.image || '/product.png'}
                    alt={item.title}
                    width={40}
                    height={40}
                    className="rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.barcode}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min={0}
                    value={item.stock}
                    onChange={(e) =>
                      handleStockChange(item.id, parseInt(e.target.value))
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="flex flex-col gap-4 sm:hidden">
        {inventory.map(item => (
          <Card key={item.id} className="p-4">
            <div className="flex gap-4 items-center">
              <Image
                src={item.image || '/product.png'}
                alt={item.title}
                width={50}
                height={50}
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.sku}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Barcode</p>
                <p>{item.barcode}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Location</p>
                <p>{item.location}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status</p>
                <p>{item.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Stock</p>
                <Input
                  type="number"
                  min={0}
                  value={item.stock}
                  onChange={(e) =>
                    handleStockChange(item.id, parseInt(e.target.value))
                  }
                  className="mt-1 w-full"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
