'use client'

import { useEffect, useState } from 'react'
import { exportToCSV } from '@/lib/exportCSV'
import { Button } from '@/components/ui/button'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Order = {
  id: string
  type: string
  status: string
  customer: string
  phone: string
  email: string
  source: string
  total: number
}

const STATUS_FILTERS = ['All', 'Fulfilled', 'Unfulfilled', 'Pending']

export default function LabelOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [])

  const filtered = statusFilter === 'All'
    ? orders
    : orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase())

  const handleExport = () => {
    exportToCSV(filtered, 'labels-orders.csv')
  }

  return (
    <div className="text-black space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Label Orders</h1>
        <Button onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      {/* Status Filter Toggle */}
      <ToggleGroup
        type="single"
        value={statusFilter}
        onValueChange={(val) => setStatusFilter(val || 'All')}
        className="gap-2 flex-wrap"
      >
        {STATUS_FILTERS.map((status) => (
          <ToggleGroupItem
            key={status}
            value={status}
            className="text-sm px-4 py-2 capitalize"
          >
            {status}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Desktop Table */}
      <Card className="p-0 hidden lg:block">
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full text-sm border bg-white">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Source</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3 capitalize">{order.status}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3 break-words">{order.email}</td>
                  <td className="p-3 break-words">{order.source}</td>
                  <td className="p-3">₹{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {filtered.map(order => (
          <Card key={order.id} className="p-4 shadow-sm">
            <div className="text-sm space-y-1">
              <div><strong>ID:</strong> {order.id}</div>
              <div><strong>Status:</strong> <Badge variant="outline">{order.status}</Badge></div>
              <div><strong>Customer:</strong> {order.customer}</div>
              <div><strong>Phone:</strong> {order.phone}</div>
              <div><strong>Email:</strong> <span className="break-words">{order.email}</span></div>
              <div><strong>Source:</strong> <span className="break-words">{order.source}</span></div>
              <div><strong>Total:</strong> ₹{order.total}</div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-4">No label orders found.</p>
        )}
      </div>
    </div>
  )
}
