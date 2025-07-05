'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type Item = {
  title: string
  image?: string
}

type SearchFieldProps = {
  type: 'product_or_collection' | 'customer' | 'segment'
  onChange?: (selected: Item[]) => void
}

export default function SearchField({ type, onChange }: SearchFieldProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    fetch(`/api/search?q=${query}&type=${type}`)
      .then((res) => res.json())
      .then((data) => setResults(data || []))
  }, [query, type])

  const addItem = (item: Item) => {
    if (!selectedItems.find((i) => i.title === item.title)) {
      const updated = [...selectedItems, item]
      setSelectedItems(updated)
      onChange?.(updated)
    }
    setQuery('')
    setResults([])
  }

  const removeItem = (item: Item) => {
    const updated = selectedItems.filter((i) => i.title !== item.title)
    setSelectedItems(updated)
    onChange?.(updated)
  }

  const placeholderText = {
    product_or_collection: 'Search products or collections...',
    customer: 'Search customers...',
    segment: 'Search customer segments...',
  }[type]

  return (
    <div className="space-y-3">
      <Input
        placeholder={placeholderText}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="border rounded bg-white shadow text-sm space-y-1 max-h-52 overflow-auto">
          {results.map((item) => (
            <div
              key={item.title}
              className="flex justify-between items-center p-2 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                    ?
                  </div>
                )}
                <span>{item.title}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => addItem(item)}
              >
                Select
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-3">
          {selectedItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 border rounded-lg p-2 bg-gray-50"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-10 h-10 rounded object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                  ?
                </div>
              )}
              <span className="text-sm">{item.title}</span>
              <X
                size={14}
                className="ml-auto cursor-pointer text-red-500"
                onClick={() => removeItem(item)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
