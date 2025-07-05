'use client'

import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import Link from 'next/link'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function CheckoutConfigurationPage() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/settings/checkout-configuration')
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (!data) return <p className="p-6">Loading...</p>

  return (
    <div className="md:p-6 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-sm text-gray-500">Customize checkout and customer accounts</p>
      </div>

      {/* Configuration Info */}
      <div className="border p-4 rounded-md space-y-4">
        <h2 className="font-semibold text-lg">{data.title}</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 gap-4">
          <span>{data.status}</span>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" asChild>
              <Link href={`/admin/settings/checkout-configuration/${data.id}/customize`}>Customize</Link>
            </Button>
            <Button asChild>
              <Link href={`/admin/settings/checkout-configuration/${data.id}/preview`}>View Checkout</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Method */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Customer Contact Method</h2>
        <Select defaultValue={data.contactMethod}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue placeholder="Select method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone_or_email">Phone number or email</SelectItem>
          </SelectContent>
        </Select>
        <Label className="text-sm text-gray-500">
          To send SMS updates, you need to install an SMS App
        </Label>
      </section>

      {/* Shop Tracking */}
      <section className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Label>Show link to track orders with Shop</Label>
        <Switch defaultChecked={data.trackWithShop ?? false} />
      </section>

      {/* Require Login */}
      <section className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Label>Require customers to log in before checkout</Label>
        <Switch defaultChecked={data.loginRequired ?? false} />
      </section>

      {/* Customer Info Fields */}
      <section className="space-y-4">
        <h2 className="font-semibold text-lg">Customer Information</h2>

        {[
          { label: 'Full Name', value: data.nameRequirement, name: 'nameRequirement', options: [
            { label: 'Only require last name', value: 'last_only' },
            { label: 'Require first and last name', value: 'full' },
          ]},
          { label: 'Company Name', value: data.company, name: 'company', options: [
            { label: "Don't include", value: 'hidden' },
            { label: 'Optional', value: 'optional' },
            { label: 'Required', value: 'required' },
          ]},
          { label: 'Address Line 2', value: data.addressLine2, name: 'addressLine2', options: [
            { label: "Don't include", value: 'hidden' },
            { label: 'Optional', value: 'optional' },
            { label: 'Required', value: 'required' },
          ]},
          { label: 'Shipping Phone', value: data.shippingPhone, name: 'shippingPhone', options: [
            { label: "Don't include", value: 'hidden' },
            { label: 'Optional', value: 'optional' },
            { label: 'Required', value: 'required' },
          ]},
        ].map((field, idx) => (
          <div key={idx}>
            <Label className="block pb-2">{field.label}</Label>
            <Select defaultValue={field.value}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {field.options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </section>

      {/* Marketing Options */}
      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Marketing Options</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Label>Email Marketing</Label>
          <Switch defaultChecked={data.marketing?.email ?? false} />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Label>SMS Marketing</Label>
          <Switch defaultChecked={data.marketing?.sms ?? false} />
        </div>
      </section>

      {/* Tipping */}
      <section className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Label>Show tipping options at checkout</Label>
        <Switch defaultChecked={data.tipping ?? false} />
      </section>

      {/* Abandoned Checkout Emails */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Abandoned Checkout Emails</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Label>Send Automatically</Label>
          <Switch defaultChecked={data.abandoned?.enabled ?? false} />
        </div>

        <div>
          <Label className="block pb-2">Send To</Label>
          <Select defaultValue={data.abandoned?.sendTo ?? 'anyone'}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="anyone">Anyone who abandons</SelectItem>
              <SelectItem value="subscribers">Email subscribers only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block pb-2">Send After</Label>
          <Select defaultValue={data.abandoned?.sendAfter ?? '10h'}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 hour</SelectItem>
              <SelectItem value="6h">6 hours</SelectItem>
              <SelectItem value="10h">10 hours</SelectItem>
              <SelectItem value="24h">24 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Language */}
      <section>
        <h2 className="text-lg pb-3 font-semibold">Checkout Language</h2>
        <Select defaultValue={data.language ?? 'en'}>
          <SelectTrigger className="w-full max-w-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <Button className="mt-6">Save Settings</Button>
    </div>
  )
}
