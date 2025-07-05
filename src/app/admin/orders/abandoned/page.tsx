'use client'

import { useEffect, useState } from 'react'
import { exportToCSV } from '@/lib/exportCSV'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

export default function AbandonedOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then((data: Order[]) => {
        const abandoned = data.filter(o => o.type.toLowerCase() === 'abandoned')
        setOrders(abandoned)
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

    return orders.filter(order => new Date(order.date) >= compareDate)
  }

  const filteredOrders = filterByDate(orders)

  const handleExport = () => {
    exportToCSV(filteredOrders, 'abandoned-orders.csv')
  }

  return (
    <div className="text-black space-y-4">
      {/* Top header + export */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Abandoned Checkouts</h1>
        <Button variant="default" onClick={handleExport}>
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="mb-2 flex flex-wrap gap-2">
          {['All', 'Today', 'Last 7 Days', 'Last 30 Days'].map((label) => (
            <TabsTrigger key={label} value={label}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Table view for desktop */}
      <Card className="p-0 hidden lg:block">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Source</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-t hover:bg-muted/40">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3 break-words">{order.email}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3 break-words">{order.source}</td>
                  <td className="p-3">₹{order.total}</td>
                  <td className="p-3">
                    <Badge variant="outline">{order.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Mobile view: cards */}
      <div className="space-y-4 lg:hidden">
        {filteredOrders.map(order => (
          <Card key={order.id} className="p-4 shadow-sm">
            <div className="text-sm space-y-1">
              <div><strong>ID:</strong> {order.id}</div>
              <div><strong>Date:</strong> {order.date}</div>
              <div><strong>Customer:</strong> {order.customer}</div>
              <div><strong>Email:</strong> <span className="break-words">{order.email}</span></div>
              <div><strong>Phone:</strong> {order.phone}</div>
              <div><strong>Source:</strong> <span className="break-words">{order.source}</span></div>
              <div><strong>Total:</strong> ₹{order.total}</div>
              <div><strong>Status:</strong> <Badge variant="outline">{order.status}</Badge></div>
            </div>
          </Card>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 py-4">No abandoned checkouts found.</p>
        )}
      </div>
    </div>
  )
}
