'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Props = {
  value: string
  onChange: (val: string) => void
}

export function StatusSelector({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="scheduled">Scheduled</SelectItem>
          <SelectItem value="published">Published</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
