'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { useState } from 'react'

export default function DateRangeFilter({ onDateChange }: { onDateChange: (range: [Date, Date]) => void }) {
  const [range, setRange] = useState<[Date, Date]>([new Date(), new Date()])

  return (
    <div className="flex gap-4 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {format(range[0], 'PPP')} - {format(range[1], 'PPP')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="range"
            selected={{ from: range[0], to: range[1] }} // ✅ Convert tuple to DateRange
            onSelect={(range: any) => {
              if (range?.from && range?.to) {
                setRange([range.from, range.to])
                onDateChange([range.from, range.to])
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
