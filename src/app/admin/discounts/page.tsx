'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type Discount = {
  id: string
  title: string
  status: 'active' | 'draft' | 'scheduled'
  type: 'amount_off_order' | 'buyxgety' | 'amount_off_products'
  method: 'automatic' | 'manual'
  combination: string[]
  used: number
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/discounts')
      .then((res) => res.json())
      .then(setDiscounts)
  }, [])

  const statusColor = {
    active: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
  }

  const formatType = (type: string) => {
    switch (type) {
      case 'amount_off_order':
        return 'Amount off Order'
      case 'buyxgety':
        return 'Buy X Get Y'
      case 'amount_off_products':
        return 'Amount off Products'
      default:
        return type
    }
  }

  return (
    <div className="md:p-6 space-y-6 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">🎟️ Discounts</h1>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="default" className="w-full sm:w-auto">
              + Create Discount
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/discounts/amount-off-products')}
            >
              Amount off Products
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/discounts/amount-off-order')}
            >
              Amount off Order
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => router.push('/admin/discounts/buyxgety')}
            >
              Buy X Get Y
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded border bg-white shadow">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Combination</TableHead>
              <TableHead>Used</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.title}</TableCell>
                <TableCell>
                  <Badge className={`${statusColor[discount.status]} capitalize text-xs`}>
                    {discount.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatType(discount.type)}</TableCell>
                <TableCell className="capitalize">{discount.method}</TableCell>
                <TableCell className="flex flex-wrap gap-1">
                  {(Array.isArray(discount.combination) ? discount.combination : []).map((item) => (
                    <Badge key={item} variant="outline" className="capitalize text-xs">
                      {item.replace('_', ' ')}
                    </Badge>
                  ))}
                </TableCell>
                <TableCell>{discount.used}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden space-y-4">
        {discounts.map((discount) => (
          <div
            key={discount.id}
            className="border rounded-md p-4 bg-white shadow-sm space-y-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{discount.title}</h2>
              <Badge className={`${statusColor[discount.status]} capitalize text-xs`}>
                {discount.status}
              </Badge>
            </div>
            <div><strong>Type:</strong> {formatType(discount.type)}</div>
            <div><strong>Method:</strong> <span className="capitalize">{discount.method}</span></div>
            <div><strong>Used:</strong> {discount.used}</div>
            <div className="flex flex-wrap gap-1">
              <strong>Combination:</strong>
              {(Array.isArray(discount.combination) ? discount.combination : []).map((item) => (
                <Badge key={item} variant="outline" className="capitalize text-xs">
                  {item.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
