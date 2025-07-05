'use client'

import SearchField from './SearchField'
import { Label } from '@/components/ui/label'

export default function GetYSelector() {
  return (
    <div className="space-y-4">
      <Label>Customer gets:</Label>
      <SearchField
        label="Get Y – Select products/collections"
        onSearch={(val) => console.log(val)}
      />
    </div>
  )
}
