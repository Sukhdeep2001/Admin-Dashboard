'use client'

import * as React from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

interface ComboboxProps {
  options: string[]
  selected: string[]
  setSelected: React.Dispatch<React.SetStateAction<string[]>>
  placeholder?: string
  multi?: boolean
}

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  selected,
  setSelected,
  placeholder = 'Select item...',
  multi = true,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    if (multi) {
      setSelected((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )
    } else {
      setSelected([value])
      setOpen(false)
    }
  }

  const selectedText = selected.length > 0 ? selected.join(', ') : placeholder

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedText}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput className="w-full" placeholder="Search..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="w-full">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => handleSelect(option)}
                  className="w-full"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(option) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
