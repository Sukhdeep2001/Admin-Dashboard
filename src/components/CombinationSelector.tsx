'use client'

import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

const options = ['Product Discounts', 'Order Discounts', 'Shipping Discounts']

type Props = {
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CombinationSelector({ selected, onChange }: Props) {
  const toggle = (item: string) => {
    const updated = selected.includes(item)
      ? selected.filter((v) => v !== item)
      : [...selected, item]
    onChange(updated)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Badge
          key={option}
          variant={selected.includes(option) ? 'default' : 'outline'}
          onClick={() => toggle(option)}
          className="cursor-pointer"
        >
          {option}
        </Badge>
      ))}
    </div>
  )
}