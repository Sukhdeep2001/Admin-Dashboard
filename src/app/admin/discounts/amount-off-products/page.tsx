'use client'

import { useState } from 'react'
import CodeOrTitleInput from '@/components/CodeOrTitleInput'
import SectionWrapper from '@/components/SectionWrapper'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import SearchField from '@/components/SearchField'
import EligibilitySelector from '@/components/EligibilitySelector'

export default function AmountOffProductsPage() {
  const [method, setMethod] = useState<'automatic' | 'manual'>('automatic')
  const [valueType, setValueType] = useState<'percentage' | 'fixed'>('percentage')
  const [purchaseOption, setPurchaseOption] = useState<'one-time' | 'subscription'>('one-time')
  const [minRequirementType, setMinRequirementType] = useState<'none' | 'amount' | 'quantity'>('none')
  const [status, setStatus] = useState<'active' | 'draft' | 'scheduled'>('draft')

  return (
    <div className="space-y-6 md:p-6">
      <h1 className="text-2xl font-bold">Amount Off Products</h1>

      {/* Discount Method */}
      <SectionWrapper title="Discount Method">
        <div className="space-y-4">
          <Select value={method} onValueChange={(val) => setMethod(val as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual (Code)</SelectItem>
            </SelectContent>
          </Select>
          <CodeOrTitleInput method={method} />
        </div>
      </SectionWrapper>

      {/* Discount Value */}
      <SectionWrapper title="Discount Value">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={valueType} onValueChange={(v) => setValueType(v as any)}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Enter discount value" className="w-full md:w-48" />
        </div>
      </SectionWrapper>

      {/* Applies To */}
      <SectionWrapper title="Applies To">
        <div className="space-y-4">
          <SearchField type="product_or_collection" />
          <Select value={purchaseOption} onValueChange={(v) => setPurchaseOption(v as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select purchase option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time Purchase</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionWrapper>

      {/* Minimum Purchase Requirements */}
      <SectionWrapper title="Minimum Purchase Requirements">
        <div className="space-y-4">
          <Select value={minRequirementType} onValueChange={(v) => setMinRequirementType(v as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose requirement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No minimum</SelectItem>
              <SelectItem value="amount">Minimum Purchase Amount</SelectItem>
              <SelectItem value="quantity">Minimum Quantity</SelectItem>
            </SelectContent>
          </Select>
          {minRequirementType === 'amount' && (
            <Input placeholder="Enter minimum amount" className="w-full" />
          )}
          {minRequirementType === 'quantity' && (
            <Input placeholder="Enter minimum quantity" className="w-full" />
          )}
        </div>
      </SectionWrapper>

      {/* Combinations */}
      <SectionWrapper title="Combinations">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="w-full sm:w-auto">Product Discounts</Button>
          <Button variant="outline" className="w-full sm:w-auto">Order Discounts</Button>
          <Button variant="outline" className="w-full sm:w-auto">Shipping Discounts</Button>
        </div>
      </SectionWrapper>

      {/* Eligibility */}
      <EligibilitySelector />

      {/* Scheduling */}
      <SectionWrapper title="Status & Schedule">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Choose status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" className="w-full md:w-48" />
          <Input type="date" className="w-full md:w-48" />
        </div>
      </SectionWrapper>

      {/* Save Button */}
      <div className="pt-4">
        <Button className="w-full md:w-auto">Save Discount</Button>
      </div>
    </div>
  )
}
