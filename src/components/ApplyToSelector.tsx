'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

const mockProducts = ['T-Shirt', 'Sneakers', 'Hat', 'Hoodie']
const mockCollections = ['Summer Sale', 'Winter Collection', 'Best Sellers']

export default function ApplyToSelector() {
  const [applyTo, setApplyTo] = useState<'products' | 'collections'>('products')
  const [search, setSearch] = useState('')
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const list = applyTo === 'products' ? mockProducts : mockCollections

  const addItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item])
    }
    setSearch('')
  }

  const removeItem = (item: string) => {
    setSelectedItems(selectedItems.filter((i) => i !== item))
  }

  const filtered = list.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <Label>Applies to</Label>
      <div className="flex gap-2">
        <Button
          type="button"
          variant={applyTo === 'products' ? 'default' : 'outline'}
          onClick={() => setApplyTo('products')}
        >
          Specific Products
        </Button>
        <Button
          type="button"
          variant={applyTo === 'collections' ? 'default' : 'outline'}
          onClick={() => setApplyTo('collections')}
        >
          Specific Collections
        </Button>
      </div>

      <Input
        placeholder={`Search ${applyTo}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <ul className="border rounded-md p-2 space-y-1 bg-white shadow max-h-40 overflow-auto">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                onClick={() => addItem(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500 px-2">No match found</li>
          )}
        </ul>
      )}

      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map((item) => (
            <Badge key={item} variant="outline" className="flex items-center gap-1">
              {item}
              <X size={12} className="cursor-pointer" onClick={() => removeItem(item)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
