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
  id: string
  name: string
  email: string
  subscription: boolean
  address: string
  orders: number
  amountSpent: number
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
  }, [])

  return (
    <div className="space-y-6 text-black">
      <div>
        <h1 className="text-2xl font-bold">👥 Customers</h1>
        <p className="text-gray-500 text-sm">Manage all customer records and details.</p>
      </div>

      {customers.length === 0 ? (
        <p className="text-sm text-gray-500">No customers found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block overflow-auto border rounded-lg bg-white shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead className="text-right">Amount Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>
                      <Badge variant={c.subscription ? 'default' : 'outline'}>
                        {c.subscription ? 'Subscribed' : 'Not Subscribed'}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.address}</TableCell>
                    <TableCell className="text-right">{c.orders}</TableCell>
                    <TableCell className="text-right">₹{c.amountSpent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {customers.map((c) => (
              <Card key={c.id} className="p-4 space-y-2">
                <div className="text-left">
                  <p className="font-semibold text-base">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <Badge variant={c.subscription ? 'default' : 'outline'}>
                    {c.subscription ? 'Subscribed' : 'Not Subscribed'}
                  </Badge>
                  <span className="text-gray-600">{c.address}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700 pt-1">
                  <span><strong>Orders:</strong> {c.orders}</span>
                  <span><strong>Spent:</strong> ₹{c.amountSpent}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
