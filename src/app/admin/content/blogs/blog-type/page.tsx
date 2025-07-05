'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function BlogTypePage() {
  const [types, setTypes] = useState<string[]>([])
  const [newType, setNewType] = useState('')

  useEffect(() => {
    fetch('/api/blogTypes')
      .then(res => res.json())
      .then(data => setTypes(data.map((t: any) => t.name)))
  }, [])

  const handleAddType = () => {
    if (!newType.trim()) return
    const updated = [...types, newType.trim()]
    setTypes(updated)
    setNewType('')
    alert('✅ Blog type added (mocked)')
  }

  return (
    <div className="max-w-xl text-black space-y-6">
      <h1 className="text-2xl font-bold">📝 Blog Types</h1>

      <div className="space-y-2">
        <Label htmlFor="blog-type">New Blog Type</Label>
        <div className="flex gap-2">
          <Input
            id="blog-type"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="Enter blog type (e.g. SEO, Tutorial)"
          />
          <Button onClick={handleAddType}>Add</Button>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Available Types</h2>
        {types.length === 0 ? (
          <p className="text-gray-500 text-sm">No blog types added yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1 text-sm">
            {types.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
