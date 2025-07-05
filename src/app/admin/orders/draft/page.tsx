'use client'

import { useEffect, useState } from 'react'
import { exportToCSV } from '@/lib/exportCSV'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'

type Order = {
  id: string
  type: string
  status: string
  customer: string
  phone: string
  email: string
  source: string
  total: number
  date: string
}

const getDaysAgo = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

export default function DraftOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data: Order[]) => {
        const filtered = data.filter(
          (o) => o.type.toLowerCase() === 'draft'
        )
        setOrders(filtered)
      })
  }, [])

  const filterByDate = (orders: Order[]) => {
    if (filter === 'All') return orders

    const now = new Date()
    const compareDate =
      filter === 'Today'
        ? new Date(now.toISOString().split('T')[0])
        : filter === 'Last 7 Days'
        ? getDaysAgo(7)
        : getDaysAgo(30)

    return orders.filter((order) => new Date(order.date) >= compareDate)
  }

  const filteredOrders = filterByDate(orders)

  const handleExport = () => {
    exportToCSV(filteredOrders, 'draft-orders.csv')
  }

  return (
    <div className="text-black space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-semibold">Draft Orders</h1>
        <Button variant="default" onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(val) => setFilter(val ?? 'All')}
        className="gap-2 flex-wrap"
      >
        {['All', 'Today', 'Last 7 Days', 'Last 30 Days'].map((label) => (
          <ToggleGroupItem
            key={label}
            value={label}
            className="text-sm px-4 py-2"
          >
            {label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      {/* Desktop Table View */}
      <Card className="p-0 hidden lg:block">
        <CardContent className="p-0 overflow-x-auto">
          <table className="min-w-full text-sm border bg-white">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Source</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3 break-all">{order.email}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">{order.source}</td>
                  <td className="p-3">₹{order.total}</td>
                  <td className="p-3 capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="p-4 bg-white shadow-sm">
            <div className="space-y-1 text-sm">
              <div><strong>ID:</strong> {order.id}</div>
              <div><strong>Date:</strong> {order.date}</div>
              <div><strong>Customer:</strong> {order.customer}</div>
              <div><strong>Email:</strong> <span className="break-words">{order.email}</span></div>
              <div><strong>Phone:</strong> {order.phone}</div>
              <div><strong>Source:</strong> {order.source}</div>
              <div><strong>Total:</strong> ₹{order.total}</div>
              <div><strong>Status:</strong> {order.status}</div>
            </div>
          </Card>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 py-4">No draft orders found.</p>
        )}
      </div>
    </div>
  )
}
