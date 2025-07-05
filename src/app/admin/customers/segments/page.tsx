'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

type Customer = {
  name: string
  email: string
  subscription: boolean
  address: string
  orders: number
  amountSpent: number
}

type Segment = {
  id: string
  segmentType: string
  behavior: string
  location: string
  customer?: Customer
}

export default function SegmentsPage() {
  const [segments, setSegments] = useState<Segment[]>([])

  useEffect(() => {
    fetch('/api/customers/segment')
      .then(res => res.json())
      .then(data => setSegments(data))
  }, [])

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-bold">🎯 Customer Segments</h1>
        <p className="text-sm text-gray-500">View all behavior- and location-based segments with linked customer data.</p>
      </div>

      {segments.length === 0 ? (
        <p className="text-sm text-gray-500">No segment data available.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-auto border rounded-lg bg-white shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Segment</TableHead>
                  <TableHead>Behavior</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Amount Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {segments.map((seg) => (
                  <TableRow key={seg.id}>
                    <TableCell>{seg.segmentType}</TableCell>
                    <TableCell>{seg.behavior}</TableCell>
                    <TableCell>{seg.location}</TableCell>
                    <TableCell>{seg.customer?.name || '—'}</TableCell>
                    <TableCell>{seg.customer?.email || '—'}</TableCell>
                    <TableCell>
                      <Badge variant={seg.customer?.subscription ? 'default' : 'outline'}>
                        {seg.customer?.subscription ? 'Subscribed' : 'Not Subscribed'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{seg.customer?.orders ?? '—'}</TableCell>
                    <TableCell className="text-right">₹{seg.customer?.amountSpent ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {segments.map((seg) => (
              <Card key={seg.id} className="p-4 space-y-2">
                <p className="text-base font-semibold text-black">{seg.segmentType}</p>
                <p className="text-sm text-gray-600">Behavior: {seg.behavior}</p>
                <p className="text-sm text-gray-600">Location: {seg.location}</p>

                <div className="pt-2 text-sm space-y-1">
                  <p className="font-medium">{seg.customer?.name || '—'}</p>
                  <p className="text-gray-500">{seg.customer?.email || '—'}</p>
                  <Badge variant={seg.customer?.subscription ? 'default' : 'outline'}>
                    {seg.customer?.subscription ? 'Subscribed' : 'Not Subscribed'}
                  </Badge>
                </div>

                <div className="flex justify-between text-sm pt-1 text-gray-700">
                  <span><strong>Orders:</strong> {seg.customer?.orders ?? '—'}</span>
                  <span><strong>Spent:</strong> ₹{seg.customer?.amountSpent ?? '—'}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
