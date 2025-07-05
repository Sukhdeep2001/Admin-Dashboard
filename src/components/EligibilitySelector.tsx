'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'

type Option = 'all' | 'customers' | 'segments'

type Item = {
  id: string
  name: string
}

export default function EligibilitySelector() {
  const [option, setOption] = useState<Option>('all')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Item[]>([])
  const [selected, setSelected] = useState<Item[]>([])

  useEffect(() => {
    if (query.length < 2 || option === 'all') {
      setResults([])
      return
    }

    fetch(`/api/search-eligibility?q=${query}&type=${option}`)
      .then((res) => res.json())
      .then((data) =>
        setResults(
          (data || []).map((item: any) => ({
            id: String(item.id),
            name: item.name,
          }))
        )
      )
  }, [query, option])

  const addItem = (item: Item) => {
    if (!selected.find((s) => s.id === item.id)) {
      setSelected([...selected, item])
    }
    setQuery('')
    setResults([])
  }

  const removeItem = (id: string) => {
    setSelected(selected.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Eligibility</label>
        <Select value={option} onValueChange={(value) => setOption(value as Option)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select eligibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            <SelectItem value="customers">Specific Customers</SelectItem>
            <SelectItem value="segments">Specific Segments</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {option !== 'all' && (
        <>
          <Input
            placeholder={`Search ${option === 'customers' ? 'customers' : 'segments'}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {results.length > 0 && (
            <div className="border p-2 rounded bg-white shadow text-sm space-y-1 max-h-40 overflow-auto">
              {results.map((item) => (
                <div
                  key={`${option}-${item.id}`}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded"
                  onClick={() => addItem(item)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}

          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selected.map((item) => (
                <Badge
                    key={`${option}-${item.id}`}
                    variant="secondary"
                    className="flex items-center gap-1"
                >
                    <span>{item.name}</span>
                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        removeItem(item.id)
                    }}
                    >
                    <X size={12} className="cursor-pointer ml-1" />
                    </button>
                </Badge>
              
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
