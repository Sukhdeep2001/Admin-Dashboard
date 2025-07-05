'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  value: string
  type: 'percentage' | 'fixed'
  onTypeChange: (type: 'percentage' | 'fixed') => void
  onValueChange: (value: string) => void
}

export function DiscountValueInput({ value, type, onTypeChange, onValueChange }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <Select value={type} onValueChange={(val) => onTypeChange(val as 'percentage' | 'fixed')}>
        <SelectTrigger className="w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="percentage">%</SelectItem>
          <SelectItem value="fixed">₹</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Enter value"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className="w-full"
      />
    </div>
  )
}