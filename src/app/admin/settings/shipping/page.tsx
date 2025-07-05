'use client'

import { useEffect, useState } from 'react'
import shippingData from '@/lib/shipping-settings.json'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import countryList from 'world-countries'
import { Trash2 } from 'lucide-react'

export default function ShippingDeliveryPage() {
  const [data, setData] = useState(shippingData)
  const [newZone, setNewZone] = useState({
    name: '',
    country: '',
    methods: [
      { type: 'Standard', estimated_delivery: '', rate: '' },
      { type: 'Premium', estimated_delivery: '', rate: '' },
    ],
    free_shipping_over: ''
  })
  const [showZoneForm, setShowZoneForm] = useState(false)

  const isZoneValid = newZone.name && newZone.country && newZone.methods.every(m => m.estimated_delivery && m.rate) && newZone.free_shipping_over

  const handleAddZone = () => {
    if (!isZoneValid) return

    setData(prev => ({
      ...prev,
      shipping_zones: [...prev.shipping_zones, { id: Date.now(), ...newZone }]
    }))
    setNewZone({
      name: '',
      country: '',
      methods: [
        { type: 'Standard', estimated_delivery: '', rate: '' },
        { type: 'Premium', estimated_delivery: '', rate: '' },
      ],
      free_shipping_over: ''
    })
    setShowZoneForm(false)
  }

  const handleRemoveZone = (id: number) => {
    setData(prev => ({
      ...prev,
      shipping_zones: prev.shipping_zones.filter(zone => zone.id !== id)
    }))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🚚 Shipping & Delivery</h1>

      {/* Shipping Zones */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Shipping Zones</h2>
            <Button size="sm" onClick={() => setShowZoneForm(!showZoneForm)}>+ Add Zone</Button>
          </div>

          {showZoneForm && (
            <div className="space-y-3 border rounded-md p-4 bg-gray-50">
              <Label className="pb-3">Zone Name</Label>
              <Input className="pb-3" value={newZone.name} onChange={(e) => setNewZone({ ...newZone, name: e.target.value })} />

              <Label className="pb-3">Country</Label>
              <Select value={newZone.country} onValueChange={(value) => setNewZone({ ...newZone, country: value })}>
                <SelectTrigger className="pb-3">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countryList.map((country) => (
                    <SelectItem key={country.cca2} value={country.name.common}>
                      {country.name.common}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {newZone.methods.map((method, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <Label className="pb-3">{method.type} Estimated Delivery</Label>
                    <Input className="pb-3" value={method.estimated_delivery} onChange={(e) => {
                      const updated = [...newZone.methods]
                      updated[index].estimated_delivery = e.target.value
                      setNewZone({ ...newZone, methods: updated })
                    }} />
                  </div>
                  <div>
                    <Label className="pb-3">{method.type} Rate (₹)</Label>
                    <Input className="pb-3" value={method.rate} onChange={(e) => {
                      const updated = [...newZone.methods]
                      updated[index].rate = e.target.value
                      setNewZone({ ...newZone, methods: updated })
                    }} />
                  </div>
                </div>
              ))}

              <Label className="pb-3">Free Shipping Over (₹)</Label>
              <Input className="pb-3" value={newZone.free_shipping_over} onChange={(e) => setNewZone({ ...newZone, free_shipping_over: e.target.value })} />

              <Button onClick={handleAddZone} disabled={!isZoneValid}>Save Zone</Button>
            </div>
          )}

          {data.shipping_zones.map((zone) => (
            <div key={zone.id} className="border rounded-lg p-4 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-base">{zone.name}</h3>
                  <p className="text-sm text-gray-600">{zone.country}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveZone(zone.id)}>
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-1">
                {zone.methods.map((method, i) => (
                  <div key={i} className="text-sm flex justify-between">
                    <span>{method.type} ({method.estimated_delivery})</span>
                    <span>₹{method.rate}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Free shipping over ₹{zone.free_shipping_over}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Local Delivery */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Local Delivery</h2>
            <Switch checked={data.local_delivery.enabled} />
          </div>
          <div className="text-sm space-y-1">
            <Label className="pb-3 pt-2">Pincode Range</Label>
            <Input className="pb-3" defaultValue={data.local_delivery.pincode_range} />
            <Label className="pb-3 pt-2">Time Window</Label>
            <Input className="pb-3" defaultValue={data.local_delivery.delivery_window} />
            <Label className="pb-3 pt-2">Minimum Order (₹)</Label>
            <Input className="pb-3" defaultValue={data.local_delivery.min_order_value} />
          </div>
        </CardContent>
      </Card>

      {/* Local Pickup */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Local Pickup</h2>
            <Switch checked={data.local_pickup.enabled} />
          </div>
          <div className="text-sm space-y-1">
            <Label className="pb-3 pt-2">Location</Label>
            <Input className="pb-3" defaultValue={data.local_pickup.location_name} />
            <Label className="pb-3 pt-2">Address</Label>
            <Textarea className="pb-3" defaultValue={data.local_pickup.address} rows={2} />
            <Label className="pb-3 pt-2">Instructions</Label>
            <Textarea className="pb-3" defaultValue={data.local_pickup.instructions} rows={2} />
          </div>
        </CardContent>
      </Card>

      {/* General Settings */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <h2 className="text-lg font-semibold">General Settings</h2>
          <div className="text-sm space-y-1">
            <Label className="pb-3 pt-2">Label Format</Label>
            <Input className="pb-3" defaultValue={data.general_settings.label_format} />
            <Label className="pb-3 pt-2">Package Dimensions (L x W x H in cm)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input className="pb-3" defaultValue={data.general_settings.default_package_dimensions.length} />
              <Input className="pb-3" defaultValue={data.general_settings.default_package_dimensions.width} />
              <Input className="pb-3" defaultValue={data.general_settings.default_package_dimensions.height} />
            </div>
            <Label className="pb-3 pt-2">Delivery Message</Label>
            <Textarea className="pb-3" defaultValue={data.general_settings.delivery_estimate_text} rows={2} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
