'use client'

import { useState } from 'react'
import SearchField from './SearchField'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BuyXSelector() {
  const [condition, setCondition] = useState('quantity')

  return (
    <div className="space-y-4">
      <Label>Customer must:</Label>
      <Select value={condition} onValueChange={setCondition}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose condition" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="quantity">Buy minimum quantity of items</SelectItem>
          <SelectItem value="amount">Spend minimum purchase amount</SelectItem>
        </SelectContent>
      </Select>

      {condition === 'quantity' ? (
        <SearchField label="Buy X – Select products/collections" onSearch={(val) => console.log(val)} />
      ) : (
        <SearchField label="Buy X – Set minimum amount" onSearch={(val) => console.log(val)} />
      )}
    </div>
  )
}
