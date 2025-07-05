'use client'

import { useEffect, useState, useRef } from 'react'
import { exportToCSV } from '@/lib/exportCSV'
import {
  Button,
} from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

const DATE_OPTIONS = ['Today', 'Last 30 Days', 'Last Month', 'Last Year']
const ORDER_TYPES = ['All', 'Draft', 'Abandoned', 'Label']
const STATUS_FILTERS = ['All', 'Fulfilled', 'Unfulfilled', 'Pending']

type Order = {
  id: string
  type: string
  status: string
  customer: string
  phone: string
  email: string
  source: string
  total: number
  date?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        const withDates = data.map((order: Order) => ({
          ...order,
          date: order.date || new Date().toISOString(),
        }))
        setOrders(withDates)
        setFilteredOrders(withDates)
      })
  }, [])

  useEffect(() => {
    let result = [...orders]

    if (typeFilter !== 'All' && typeFilter !== 'Label') {
      result = result.filter(order => order.type.toLowerCase() === typeFilter.toLowerCase())
    }

    if (typeFilter === 'Label' && statusFilter !== 'All') {
      result = result.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase())
    }

    if (dateFilter !== 'All') {
      const now = new Date()
      result = result.filter((order) => {
        const orderDate = new Date(order.date || '')
        switch (dateFilter) {
          case 'Today':
            return orderDate.toDateString() === now.toDateString()
          case 'Last 30 Days':
            return now.getTime() - orderDate.getTime() <= 30 * 24 * 60 * 60 * 1000
          case 'Last Month': {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            return orderDate >= lastMonth && orderDate < new Date(now.getFullYear(), now.getMonth(), 1)
          }
          case 'Last Year':
            return now.getFullYear() - orderDate.getFullYear() <= 1
          default:
            return true
        }
      })
    }

    setFilteredOrders(result)
  }, [typeFilter, statusFilter, dateFilter, orders])

  const handleExport = (format: 'csv' | 'json') => {
    if (format === 'csv') exportToCSV(filteredOrders, 'orders.csv')
    else {
      const blob = new Blob([JSON.stringify(filteredOrders, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'orders.json'
      a.click()
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        const isCSV = file.name.endsWith('.csv')
        let imported: Order[] = []

        if (isCSV) {
          const lines = content.split('\n')
          const headers = lines[0].split(',').map(h => h.trim())
          imported = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
            const obj: any = {}
            headers.forEach((h, i) => (obj[h] = values[i]))
            return obj as Order
          })
        } else {
          imported = JSON.parse(content)
        }

        setOrders(imported)
        setFilteredOrders(imported)
        alert('Orders imported successfully!')
      } catch (err) {
        alert('Failed to import file.')
      }
    }

    reader.readAsText(file)
  }

  return (
    <div className="space-y-6 text-black">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex flex-wrap gap-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Dates</SelectItem>
              {DATE_OPTIONS.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>Export as JSON</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={() => fileInputRef.current?.click()} variant="success">
            Import
          </Button>
          <Input
            type="file"
            accept=".json,.csv"
            onChange={handleImport}
            ref={fileInputRef}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {ORDER_TYPES.map(type => (
          <Badge
            key={type}
            onClick={() => {
              setTypeFilter(type)
              setStatusFilter('All')
            }}
            className={`cursor-pointer px-3 py-1 ${
              typeFilter === type ? 'bg-blue-600 text-white' : ''
            }`}
            variant={typeFilter === type ? 'default' : 'outline'}
          >
            {type}
          </Badge>
        ))}
      </div>

      {typeFilter === 'Label' && (
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(status => (
            <Badge
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`cursor-pointer px-3 py-1 ${
                statusFilter === status ? 'bg-purple-600 text-white' : ''
              }`}
              variant={statusFilter === status ? 'default' : 'outline'}
            >
              {status}
            </Badge>
          ))}
        </div>
      )}

      <div className="overflow-x-auto hidden lg:block">
        <table className="min-w-full text-sm border rounded bg-white">
          <thead className="bg-gray-100 text-xs">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Source</th>
              <th className="p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2 text-xs">{new Date(order.date || '').toLocaleDateString()}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.customer}</td>
                <td className="p-2">{order.phone}</td>
                <td className="p-2 break-all">{order.email}</td>
                <td className="p-2">{order.source}</td>
                <td className="p-2">₹{order.total}</td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Card Layout */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="border rounded-md p-4 bg-white shadow-sm">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="font-semibold text-black">Order ID:</span>
              <span>{order.id}</span>
            </div>
            <div className="text-sm space-y-1">
              <div><span className="font-medium">Date:</span> {new Date(order.date || '').toLocaleDateString()}</div>
              <div><span className="font-medium">Status:</span> {order.status}</div>
              <div><span className="font-medium">Customer:</span> {order.customer}</div>
              <div><span className="font-medium">Phone:</span> {order.phone}</div>
              <div><span className="font-medium">Email:</span> {order.email}</div>
              <div><span className="font-medium">Source:</span> {order.source}</div>
              <div><span className="font-medium">Total:</span> ₹{order.total}</div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 py-4">No orders found.</p>
        )}
      </div>
    </div>
  )
}
