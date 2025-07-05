'use client'

import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SectionWrapper from '@/components/SectionWrapper'
import CodeOrTitleInput from '@/components/CodeOrTitleInput'
import SearchField from '@/components/SearchField'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function AmountOffOrderPage() {
  const [method, setMethod] = useState<'automatic' | 'manual'>('automatic')
  const [discountType, setDiscountType] = useState<'fixed' | 'percentage'>('fixed')
  const [purchaseOption, setPurchaseOption] = useState<'one-time' | 'subscription' | 'both'>('one-time')
  const [minRequirement, setMinRequirement] = useState<'none' | 'amount' | 'quantity'>('none')
  const [combination, setCombination] = useState<string[]>([])
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const toggleCombination = (option: string) => {
    setCombination((prev) =>
      prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
    )
  }

  return (
    <div className="md:p-6 space-y-6 text-black">
      <h1 className="text-2xl font-bold">Amount Off Order</h1>

      {/* Method */}
      <SectionWrapper title="Discount Method">
        <div className="space-y-4">
          <Select value={method} onValueChange={(val) => setMethod(val as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automatic">Automatic</SelectItem>
              <SelectItem value="manual">Manual (Discount Code)</SelectItem>
            </SelectContent>
          </Select>
          <CodeOrTitleInput method={method} />
        </div>
      </SectionWrapper>

      {/* Discount Value */}
      <SectionWrapper title="Discount Value">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={discountType} onValueChange={(val) => setDiscountType(val as any)}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectContent>
          </Select>
          <Input className="w-full" placeholder="Enter discount value" />
        </div>
      </SectionWrapper>

      {/* Applies To */}
      <SectionWrapper title="Applies To">
        <div className="space-y-4">
          <SearchField type="product_or_collection" />
          <Select
            value={purchaseOption}
            onValueChange={(val) =>
              setPurchaseOption(val as 'one-time' | 'subscription' | 'both')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose purchase option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="subscription">Subscription</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionWrapper>

      {/* Minimum Requirements */}
      <SectionWrapper title="Minimum Purchase Requirements">
        <div className="space-y-4">
          <Select value={minRequirement} onValueChange={(val) => setMinRequirement(val as any)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No minimum requirements</SelectItem>
              <SelectItem value="amount">Minimum purchase amount</SelectItem>
              <SelectItem value="quantity">Minimum quantity of items</SelectItem>
            </SelectContent>
          </Select>
          {minRequirement === 'amount' && (
            <Input className="w-full" placeholder="Enter minimum amount" />
          )}
          {minRequirement === 'quantity' && (
            <Input className="w-full" placeholder="Enter minimum quantity" />
          )}
        </div>
      </SectionWrapper>

      {/* Combinations */}
      <SectionWrapper title="Combinations">
        <div className="flex flex-wrap gap-2">
          {['Product Discounts', 'Order Discounts', 'Shipping Discounts'].map((option) => (
            <Badge
              key={option}
              variant={combination.includes(option) ? 'default' : 'outline'}
              className="cursor-pointer text-sm px-2 py-1"
              onClick={() => toggleCombination(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </SectionWrapper>

      {/* Schedule */}
      <SectionWrapper title="Schedule">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select value={status} onValueChange={(val) => setStatus(val as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionWrapper>

      {/* Save Button */}
      <div className="pt-6">
        <Button className="w-full md:w-auto px-6 py-2 text-base">Save Discount</Button>
      </div>
    </div>
  )
}
