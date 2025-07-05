'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  option: string
  value: string
  onOptionChange: (val: string) => void
  onValueChange: (val: string) => void
}

export function MinimumRequirement({ option, value, onOptionChange, onValueChange }: Props) {
  return (
    <div className="space-y-2">
      <Select value={option} onValueChange={onOptionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select requirement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No minimum</SelectItem>
          <SelectItem value="amount">Minimum purchase amount</SelectItem>
          <SelectItem value="quantity">Minimum quantity of items</SelectItem>
        </SelectContent>
      </Select>

      {(option === 'amount' || option === 'quantity') && (
        <Input
          type="number"
          placeholder={option === 'amount' ? 'Enter amount (₹)' : 'Enter quantity'}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
        />
      )}
    </div>
  )
}