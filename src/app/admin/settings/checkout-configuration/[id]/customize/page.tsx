'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function CheckoutCustomizePage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  const [config, setConfig] = useState({
    showAnnouncement: true,
    announcementText: 'Big Sale - 20% Off Today Only!',
    showProductTable: true,
    showShipping: true,
    showContact: true,
    addressFields: {
      street: true,
      pincode: true,
      state: true,
      mobile: true,
      streetNo: true,
    },
    payment: {
      credit: true,
      paypal: true,
    },
    showOrderSummary: true,
  })

  // ✅ Fetch saved config
  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch(`/api/checkout-settings/${id}`)
      if (res.ok) {
        const data = await res.json()
        setConfig((prev) => ({ ...prev, ...data })) // merge
      }
      setLoading(false)
    }

    if (id) fetchConfig()
  }, [id])

  // ✅ Save config
  const handleSave = async () => {
    const res = await fetch(`/api/settings/checkout-configuration/checkout-settings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })

    if (res.ok) {
      alert('Configuration saved successfully!')
    } else {
      alert('Failed to save configuration.')
    }
  }

  if (loading) return <p className="p-6">Loading configuration...</p>

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Customize Checkout Page</h1>

      {/* Announcement Bar */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Announcement Bar</h2>
        <div className="flex items-center gap-4">
          <Label>Show Announcement</Label>
          <Switch
            checked={config.showAnnouncement}
            onCheckedChange={(v) => setConfig({ ...config, showAnnouncement: v })}
          />
        </div>
        {config.showAnnouncement && (
          <Input
            value={config.announcementText}
            onChange={(e) => setConfig({ ...config, announcementText: e.target.value })}
            placeholder="Big Sale - 20% Off Today Only!"
          />
        )}
      </section>

      <Separator />

      {/* Product Table */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Product Table</h2>
        <div className="flex items-center gap-4">
          <Label>Show Product Table</Label>
          <Switch
            checked={config.showProductTable}
            onCheckedChange={(v) => setConfig({ ...config, showProductTable: v })}
          />
        </div>
      </section>

      <Separator />

      {/* Shipping */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Shipping Section</h2>
        <div className="flex items-center gap-4">
          <Label>Enable Shipping</Label>
          <Switch
            checked={config.showShipping}
            onCheckedChange={(v) => setConfig({ ...config, showShipping: v })}
          />
        </div>
      </section>

      <Separator />

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Contact Info</h2>
        <div className="flex items-center gap-4">
          <Label>Show Contact Field</Label>
          <Switch
            checked={config.showContact}
            onCheckedChange={(v) => setConfig({ ...config, showContact: v })}
          />
        </div>
      </section>

      <Separator />

      {/* Address Fields */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Delivery Address Fields</h2>
        {Object.entries(config.addressFields).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <Label className="capitalize">{key}</Label>
            <Switch
              checked={value}
              onCheckedChange={(v) =>
                setConfig({
                  ...config,
                  addressFields: { ...config.addressFields, [key]: v },
                })
              }
            />
          </div>
        ))}
      </section>

      <Separator />

      {/* Payment */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Payment Options</h2>
        <div className="flex items-center gap-4">
          <Label>Credit Card</Label>
          <Switch
            checked={config.payment.credit}
            onCheckedChange={(v) =>
              setConfig({ ...config, payment: { ...config.payment, credit: v } })
            }
          />
        </div>
        <div className="flex items-center gap-4">
          <Label>PayPal</Label>
          <Switch
            checked={config.payment.paypal}
            onCheckedChange={(v) =>
              setConfig({ ...config, payment: { ...config.payment, paypal: v } })
            }
          />
        </div>
      </section>

      <Separator />

      {/* Order Summary */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="flex items-center gap-4">
          <Label>Show Summary Panel</Label>
          <Switch
            checked={config.showOrderSummary}
            onCheckedChange={(v) => setConfig({ ...config, showOrderSummary: v })}
          />
        </div>
      </section>

      <Button className="mt-6" onClick={handleSave}>Save Configuration</Button>
    </div>
  )
}
