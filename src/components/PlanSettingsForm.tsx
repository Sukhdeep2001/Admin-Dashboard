'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function PlanSettingsForm() {
  const [form, setForm] = useState({
    currency: 'USD',
    billingCycles: ['monthly', 'yearly'],
    taxEnabled: true,
    taxRegion: 'India',
    taxRate: 18,
    promoDescription: '',
    dunningEmailEnabled: true,
    invoiceTemplate: '',
    stripeApiKey: '',
    webhookUrl: '',
    prorationRule: 'end-of-cycle',
    cancellationPolicy: 'end-of-cycle',
    downgradeNotificationEmail: true,
  })

  type FormKeys = keyof typeof form

  const handleChange = (field: FormKeys, value: any) => {
   setForm(prev => ({ ...prev, [field]: value }))
  }


  return (
    <form className="space-y-8">
      <div>
        <Label className='mb-3'>Default Currency</Label>
        <Select value={form.currency} onValueChange={val => handleChange('currency', val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="INR">INR</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='mb-3'>Billing Cycles</Label>
        <div className="flex gap-4">
          {['monthly', 'yearly', 'quarterly'].map(cycle => (
            <div key={cycle} className="flex items-center space-x-2">
              <Switch
                checked={form.billingCycles.includes(cycle)}
                onCheckedChange={checked => {
                  const updated = checked
                    ? [...form.billingCycles, cycle]
                    : form.billingCycles.filter(c => c !== cycle)
                  handleChange('billingCycles', updated)
                }}
              />
              <span className="capitalize">{cycle}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className='mb-3'>Enable Tax</Label>
        <Switch checked={form.taxEnabled} onCheckedChange={val => handleChange('taxEnabled', val)} />
        {form.taxEnabled && (
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <Label className='mb-3'>Tax Region</Label>
              <Input value={form.taxRegion} onChange={e => handleChange('taxRegion', e.target.value)} />
            </div>
            <div>
              <Label className='mb-3'>Default Tax Rate (%)</Label>
              <Input type="number" value={form.taxRate} onChange={e => handleChange('taxRate', +e.target.value)} />
            </div>
          </div>
        )}
      </div>

      <div>
        <Label className='mb-3'>Promotions and Discounts</Label>
        <Textarea placeholder="Describe your global promo code policy..." value={form.promoDescription} onChange={e => handleChange('promoDescription', e.target.value)} />
      </div>

      <div>
        <Label className='mb-3'>Dunning Emails (for failed payments)</Label>
        <Switch checked={form.dunningEmailEnabled} onCheckedChange={val => handleChange('dunningEmailEnabled', val)} />
      </div>

      <div>
        <Label className='mb-3'>Invoice Template HTML</Label>
        <Textarea rows={6} placeholder="<html><body>Invoice Template...</body></html>" value={form.invoiceTemplate} onChange={e => handleChange('invoiceTemplate', e.target.value)} />
      </div>

      <div>
        <Label className='mb-3'>Stripe API Key</Label>
        <Input type="password" value={form.stripeApiKey} onChange={e => handleChange('stripeApiKey', e.target.value)} />
      </div>

      <div>
        <Label className='mb-3'>Webhook URL</Label>
        <Input type="url" value={form.webhookUrl} onChange={e => handleChange('webhookUrl', e.target.value)} />
      </div>

      <div>
        <Label className='mb-3'>Proration Rule</Label>
        <Select value={form.prorationRule} onValueChange={val => handleChange('prorationRule', val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="end-of-cycle">End of Billing Cycle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='mb-3'>Cancellation Policy</Label>
        <Select value={form.cancellationPolicy} onValueChange={val => handleChange('cancellationPolicy', val)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="immediate">Immediate</SelectItem>
            <SelectItem value="end-of-cycle">End of Billing Cycle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className='mb-3'>Admin Notification on Downgrade</Label>
        <Switch checked={form.downgradeNotificationEmail} onCheckedChange={val => handleChange('downgradeNotificationEmail', val)} />
      </div>

      <Button type="submit" onClick={() => console.log(form)}>Save Settings</Button>
    </form>
  )
}
