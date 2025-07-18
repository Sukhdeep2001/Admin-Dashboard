'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

type Zone = { name: string }
type Carrier = { name: string; apiKey?: string }
type CustomerUsage = {
  store: string
  zone: string
  profile: string
  pickup: boolean
  delivery: boolean
  carrier: string
}

export default function SuperAdminShippingPage() {
  const [isMobile, setIsMobile] = useState(false)
  const [zones, setZones] = useState<Zone[]>([])
  const [zoneName, setZoneName] = useState('')
  const [enabledPickup, setEnabledPickup] = useState(true)
  const [enabledDelivery, setEnabledDelivery] = useState(true)
  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [profiles, setProfiles] = useState([])
  const [rules, setRules] = useState([])

  const mockCustomerUsage: CustomerUsage[] = [
    {
      store: 'MyShop India',
      zone: 'India & SAARC',
      profile: 'Standard Profile',
      pickup: true,
      delivery: false,
      carrier: 'Shiprocket'
    },
    {
      store: 'GlobalWear',
      zone: 'Global',
      profile: 'Express Shipping',
      pickup: false,
      delivery: true,
      carrier: 'FedEx'
    },
    {
      store: 'QuickMart',
      zone: 'USA',
      profile: 'Economy',
      pickup: true,
      delivery: true,
      carrier: 'UPS'
    }
  ]

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768)
    }

    fetch('/api/shipping-zones').then(res => res.json()).then(setZones)
    fetch('/api/carriers').then(res => res.json()).then(setCarriers)
    fetch('/api/shipping-profiles').then(res => res.json()).then(setProfiles)
    fetch('/api/super-shipping-rules').then(res => res.json()).then(setRules)
  }, [])

  const handleCreateZone = () => {
    const trimmed = zoneName.trim()
    if (trimmed && !zones.some(z => z.name.toLowerCase() === trimmed.toLowerCase())) {
      setZones(prev => [...prev, { name: trimmed }])
      setZoneName('')
    }
  }

  // ✅ Mobile Layout
  if (isMobile) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-bold text-center">Shipping & Delivery (Mobile)</h1>

        {/* Zones */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Zones</h2>
          <div className="space-y-2">
            <Input
              placeholder="New zone name..."
              value={zoneName}
              onChange={e => setZoneName(e.target.value)}
            />
            <Button onClick={handleCreateZone} className="w-full">Add Zone</Button>
          </div>
          <ul className="list-disc pl-4 text-sm">
            {zones.map((zone, idx) => (
              <li key={idx}>{zone.name}</li>
            ))}
          </ul>
        </section>

        {/* Toggles */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Features</h2>
          <div className="flex justify-between">
            <Label>Pickup</Label>
            <Switch checked={enabledPickup} onCheckedChange={setEnabledPickup} />
          </div>
          <div className="flex justify-between">
            <Label>Delivery</Label>
            <Switch checked={enabledDelivery} onCheckedChange={setEnabledDelivery} />
          </div>
        </section>

        {/* Carriers */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Carriers</h2>
          <ul className="text-sm space-y-2">
            {carriers.map((carrier, idx) => (
              <li key={idx} className="border-b pb-1 flex justify-between">
                <span>{carrier.name}</span>
                <span className="text-xs">{carrier.apiKey ? '✅' : '❌'}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Usage Cards */}
        <section className="space-y-3">
          <h2 className="font-semibold text-lg">Customer Usage</h2>
          <div className="space-y-4">
            {mockCustomerUsage.map((c, idx) => (
              <div key={idx} className="border p-3 rounded-md shadow-sm">
                <p><strong>Store:</strong> {c.store}</p>
                <p><strong>Zone:</strong> {c.zone}</p>
                <p><strong>Profile:</strong> {c.profile}</p>
                <p><strong>Pickup:</strong> {c.pickup ? '✅' : '❌'}</p>
                <p><strong>Delivery:</strong> {c.delivery ? '✅' : '❌'}</p>
                <p><strong>Carrier:</strong> {c.carrier}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  // ✅ Desktop layout (Untouched)
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Shipping & Delivery Settings (Super Admin)</h1>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default Shipping Zones</h2>
        <div className="flex gap-2">
          <Input
            placeholder="New zone name..."
            value={zoneName}
            onChange={e => setZoneName(e.target.value)}
          />
          <Button onClick={handleCreateZone}>Add Zone</Button>
        </div>
        <ul className="list-disc pl-6 text-sm text-gray-600">
          {zones.map((zone, idx) => (
            <li key={idx}>{zone.name}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Feature Controls</h2>
        <div className="flex items-center gap-4">
          <Label>Enable Local Pickup</Label>
          <Switch checked={enabledPickup} onCheckedChange={setEnabledPickup} />
        </div>
        <div className="flex items-center gap-4">
          <Label>Enable Local Delivery</Label>
          <Switch checked={enabledDelivery} onCheckedChange={setEnabledDelivery} />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Global Carrier Integrations</h2>
        <ul className="text-sm space-y-1">
          {carriers.map((carrier, idx) => (
            <li key={idx} className="flex justify-between border-b py-2">
              <span>{carrier.name}</span>
              <span className="text-xs text-gray-500">
                {carrier.apiKey ? '✅ Active' : '❌ Not Set'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Customer Shipping Usage</h2>
        <div className="overflow-auto border rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 font-semibold">Store</th>
                <th className="px-4 py-2 font-semibold">Zone</th>
                <th className="px-4 py-2 font-semibold">Profile</th>
                <th className="px-4 py-2 font-semibold">Pickup</th>
                <th className="px-4 py-2 font-semibold">Delivery</th>
                <th className="px-4 py-2 font-semibold">Carrier</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomerUsage.map((c, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2 px-4">{c.store}</td>
                  <td className="py-2 px-4">{c.zone}</td>
                  <td className="py-2 px-4">{c.profile}</td>
                  <td className="py-2 px-4">{c.pickup ? '✅' : '❌'}</td>
                  <td className="py-2 px-4">{c.delivery ? '✅' : '❌'}</td>
                  <td className="py-2 px-4">{c.carrier}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
