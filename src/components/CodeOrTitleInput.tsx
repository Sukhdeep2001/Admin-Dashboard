// components/CodeOrTitleInput.tsx
'use client'

import { Input } from '@/components/ui/input'

export default function CodeOrTitleInput({ method }: { method: 'manual' | 'automatic' }) {
  return (
    <div className="mt-2 space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {method === 'manual' ? 'Discount Code' : 'Title'}
      </label>
      <Input placeholder={method === 'manual' ? 'Enter Discount Code' : 'Enter Title'} />
    </div>
  )
}
