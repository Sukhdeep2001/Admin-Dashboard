'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function AddMenuPage() {
  const [name, setName] = useState('')
  const [items, setItems] = useState([{ label: '', url: '' }])
  const router = useRouter()

  const handleAddItem = () => {
    setItems([...items, { label: '', url: '' }])
  }

  const handleChangeItem = (index: number, field: 'label' | 'url', value: string) => {
    const newItems = [...items]
    newItems[index][field] = value
    setItems(newItems)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newMenu = {
      id: `menu-${Date.now()}`,
      name,
      items: items.filter(item => item.label && item.url),
    }

    console.log('📦 Created Menu:', newMenu)
    alert('✅ Menu created successfully (mocked)')
    router.push('/admin/content/menus')
  }

  return (
    <div className="max-w-2xl text-black space-y-6">
      <h1 className="text-2xl font-bold">Add New Menu</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Menu Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Main Menu"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Menu Items</h2>
            <Button type="button" variant="ghost" onClick={handleAddItem}>
              + Add Another Link
            </Button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex gap-3">
              <Input
                value={item.label}
                onChange={(e) => handleChangeItem(index, 'label', e.target.value)}
                placeholder="Label (e.g. Home)"
              />
              <Input
                value={item.url}
                onChange={(e) => handleChangeItem(index, 'url', e.target.value)}
                placeholder="URL (e.g. /home)"
              />
            </div>
          ))}
        </div>

        <Separator />

        <Button type="submit" className="w-full">
          Save Menu
        </Button>
      </form>
    </div>
  )
}
