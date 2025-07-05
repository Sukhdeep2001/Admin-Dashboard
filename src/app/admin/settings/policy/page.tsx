'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function PolicyLandingPage() {
  const policies = [
    { label: 'Return Policy', slug: 'return-policy' },
    { label: 'Refund Policy', slug: 'refund-policy' },
    { label: 'Terms & Conditions', slug: 'terms-of-conditions' },
    { label: 'Shipping Policy', slug: 'shipping-policy' },
    { label: 'Contact Information', slug: 'contact-information' },
  ]

  const [showReturnRules, setShowReturnRules] = useState(false)

  return (
    <div className="space-y-8">
      {/* Return Rules Card */}
      <div className="border p-6 rounded-md bg-white shadow-sm space-y-4">
        <div className="pb-3 items-start lg:flex lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-xl font-bold">Return Rules</h2>
            <p className="text-sm text-gray-500">Manage how your returns work</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Add Return Rule</Button>
            <Button onClick={() => setShowReturnRules(prev => !prev)}>
              {showReturnRules ? 'Hide' : 'Manage'}
            </Button>
          </div>
        </div>

        {showReturnRules && (
          <div className="space-y-6">
            {/* Return Window */}
            <div>
              <Label className="block mb-2 font-semibold">Return window</Label>
              <Select defaultValue="30">
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="unlimited">Unlimited</SelectItem>
                  <SelectItem value="custom">Custom days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Shipping Cost */}
            <div>
              <Label className="block mb-2 font-semibold">Return shipping cost</Label>
              <Select defaultValue="customer">
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">Customer provides return shipping</SelectItem>
                  <SelectItem value="free">Free return shipping</SelectItem>
                  <SelectItem value="flat">Flat rate return shipping</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                Does not apply to returns using Point of Sale
              </p>
            </div>

            {/* Restocking Fee */}
            <div className="space-y-2">
              <Label className="font-semibold">Charge restocking fee</Label>
              <div className="flex items-center gap-4">
                <Switch defaultChecked />
                <Input className="w-24" defaultValue="10" type="number" suffix="%" />
              </div>
              <p className="text-xs text-gray-500">
                Does not apply to returns using Point of Sale
              </p>
            </div>

            {/* Final Sale Info */}
            <div className="text-sm text-gray-700 bg-gray-100 p-3 rounded-md">
              Return rules will only apply to items purchased after the return rules were turned on or updated. <br />
              Customers can’t request returns for products set as final sale. Bundles can’t be set as final sale.
            </div>

            {/* Applies to Section */}
            <div className="space-y-2">
              <Label className="font-semibold">Applies to</Label>
              <Select>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collections">Specific collections</SelectItem>
                  <SelectItem value="products">Specific products</SelectItem>
                </SelectContent>
              </Select>
              <Textarea placeholder="Select collections or products here (UI integration TBD)" />
            </div>
          </div>
        )}
      </div>

      {/* Policy Links Card */}
      <div className="border p-6 rounded-md bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-4">Store Policies</h2>
        <ul className="space-y-3">
          {policies.map((policy) => (
            <li key={policy.slug}>
              <Link
                href={`/admin/settings/policy/${policy.slug}`}
                className="block border border-gray-500/70 rounded-[7px] p-4 hover:bg-gray-800 hover:text-white transition-colors"
              >
                {policy.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
