'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  value: string
  onChange: (val: string) => void
}

export function PurchaseOptionDropdown({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="one-time">One-time purchase</SelectItem>
        <SelectItem value="subscription">Subscription</SelectItem>
      </SelectContent>
    </Select>
  )
}