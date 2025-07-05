'use client'

import { useState } from 'react'
import { MetafieldDefinition } from '@/lib/type'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const defaultForm: Omit<MetafieldDefinition, 'id' | 'createdAt' | 'createdBy'> = {
  name: '',
  key: '',
  namespace: 'product',
  resourceTypes: ['products'],
  type: 'single_line_text',
  description: '',
  apiAccess: 'private',
  customerAccess: false,
  visible: true,
}

export default function MetafieldForm({ onSave }: { onSave: (meta: MetafieldDefinition) => void }) {
  const [form, setForm] = useState(defaultForm)

  const handleChange = (field: keyof typeof form, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newMeta: MetafieldDefinition = {
      ...form,
      id: `meta_${Date.now()}`,
      createdAt: new Date().toISOString(),
      createdBy: 'superadmin@example.com', // Static for now
    }

    onSave(newMeta)
    setForm(defaultForm)
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl">
      <div>
        <Label className='pb-3'>Name</Label>
        <Input value={form.name} onChange={e => handleChange('name', e.target.value)} required />
      </div>
      <div>
        <Label className='pb-3'>Key</Label>
        <Input value={form.key} onChange={e => handleChange('key', e.target.value)} required />
      </div>
      <div>
        <Label className='pb-3'>Namespace</Label>
        <Input value={form.namespace} onChange={e => handleChange('namespace', e.target.value)} />
      </div>
      <div>
        <Label className='pb-3'>Type</Label>
        <Select value={form.type} onValueChange={val => handleChange('type', val)}>
          <SelectTrigger><SelectValue placeholder="Select Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="single_line_text">Single Line Text</SelectItem>
            <SelectItem value="multi_line_text">Multi Line Text</SelectItem>
            <SelectItem value="file">File</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2">
        <Label className='pb-3'>Description</Label>
        <Textarea rows={3} value={form.description} onChange={e => handleChange('description', e.target.value)} />
      </div>
      <div>
        <Label className='pb-3'>API Access</Label>
        <Select value={form.apiAccess} onValueChange={val => handleChange('apiAccess', val)}>
          <SelectTrigger><SelectValue placeholder="API Access" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="private">Private</SelectItem>
            <SelectItem value="public">Public</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className='pb-3'>Customer Access</Label>
        <Switch checked={form.customerAccess} onCheckedChange={val => handleChange('customerAccess', val)} />
      </div>
      <div>
        <Label className='pb-3'>Visible</Label>
        <Switch checked={form.visible} onCheckedChange={val => handleChange('visible', val)} />
      </div>
      <div className="col-span-2 text-right">
        <Button type="submit">Save Metafield</Button>
      </div>
    </form>
  )
}
