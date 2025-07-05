'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Pencil } from 'lucide-react'

type Location = {
  id: number
  name: string
  address: string
  contact: string
  enabled: boolean
}

const defaultLocations: Location[] = [
  {
    id: 1,
    name: 'Main Warehouse',
    address: 'Plot 45, Industrial Area, Delhi',
    contact: '+91 9876543210',
    enabled: true,
  },
  {
    id: 2,
    name: 'Retail Outlet - Mumbai',
    address: 'Floor 2, Mall Street, Mumbai',
    contact: '+91 9123456780',
    enabled: false,
  },
]

export default function AdminLocationPage() {
  const [locations, setLocations] = useState<Location[]>(defaultLocations)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', address: '', contact: '' })

  const toggleLocation = (id: number) => {
    setLocations(prev =>
      prev.map(loc => (loc.id === id ? { ...loc, enabled: !loc.enabled } : loc))
    )
  }

  const handleEdit = (location: Location) => {
    setEditingId(location.id)
    setFormData({
      name: location.name,
      address: location.address,
      contact: location.contact,
    })
  }

  const handleSaveEdit = (id: number) => {
    setLocations(prev =>
      prev.map(loc =>
        loc.id === id
          ? { ...loc, name: formData.name, address: formData.address, contact: formData.contact }
          : loc
      )
    )
    setEditingId(null)
    setFormData({ name: '', address: '', contact: '' })
  }

  const handleDelete = (id: number) => {
    setLocations(prev => prev.filter(loc => loc.id !== id))
  }

  const handleAdd = () => {
    if (!formData.name || !formData.address || !formData.contact) return
    setLocations(prev => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name,
        address: formData.address,
        contact: formData.contact,
        enabled: true,
      },
    ])
    setFormData({ name: '', address: '', contact: '' })
  }

  const mainLocations = locations.filter(loc => !loc.name.toLowerCase().includes('retail'))
  const retailLocations = locations.filter(loc => loc.name.toLowerCase().includes('retail'))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📍 Locations</h1>

      {/* Main Locations */}
      {mainLocations.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-700">🏢 Main Locations</h2>
          {mainLocations.map(location => (
            <Card key={location.id}>
              <CardContent className="space-y-2 p-4">
                {editingId === location.id ? (
                  <>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <Textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} />
                    <Input value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                    <Button size="sm" onClick={() => handleSaveEdit(location.id)}>Save</Button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold text-lg">{location.name}</h2>
                      <div className="flex items-center gap-2">
                        <Switch checked={location.enabled} onCheckedChange={() => toggleLocation(location.id)} />
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(location)}><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(location.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{location.address}</p>
                    <p className="text-sm text-gray-600">📞 {location.contact}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* Retail Locations */}
      {retailLocations.length > 0 && (
        <>
          <h2 className="text-lg font-semibold text-gray-700">🏬 Retail Locations</h2>
          {retailLocations.map(location => (
            <Card key={location.id}>
              <CardContent className="space-y-2 p-4">
                {editingId === location.id ? (
                  <>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <Textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} />
                    <Input value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
                    <Button size="sm" onClick={() => handleSaveEdit(location.id)}>Save</Button>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold text-lg">{location.name}</h2>
                      <div className="flex items-center gap-2">
                        <Switch checked={location.enabled} onCheckedChange={() => toggleLocation(location.id)} />
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(location)}><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDelete(location.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{location.address}</p>
                    <p className="text-sm text-gray-600">📞 {location.contact}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {/* Add New Location */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <h2 className="text-lg font-semibold">➕ Add New Location</h2>
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Retail Outlet - Bengaluru" />
            <Label>Address</Label>
            <Textarea rows={2} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            <Label>Contact</Label>
            <Input value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} placeholder="+91 9876XXXXXX" />
            <Button onClick={handleAdd}>Add Location</Button>
          </div>
        </CardContent>
       </Card>

      {/* Request New Location Form (Unchanged) */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-medium text-base">Request New Location</h3>
          <div className="space-y-2">
            <Label className="pb-1">Location Name</Label>
            <Input placeholder="e.g. Retail Outlet - Bengaluru" />
            <Label className="pb-1">Address</Label>
            <Textarea rows={3} />
            <Label className="pb-1">Contact</Label>
            <Input placeholder="+91 9876XXXXXX" />
            <Button>Submit Request</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
