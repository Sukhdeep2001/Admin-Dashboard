'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'

const mockCustomers = [
  {
    id: 1,
    name: 'Alice Johnson',
    location: 'New York, USA',
    product: 'Admin.ai',
    plan: 'Basic',
    billing: 'Monthly',
    price: 29
  },
  {
    id: 2,
    name: 'Bob Smith',
    location: 'London, UK',
    product: 'Admin.ai',
    plan: 'Advanced',
    billing: 'Yearly',
    price: 899
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    location: 'São Paulo, Brazil',
    product: 'Admin.ai',
    plan: 'Enterprise',
    billing: 'Yearly',
    price: 1099
  },
  {
    id: 4,
    name: 'Diana Prince',
    location: 'Paris, France',
    product: 'Admin.ai',
    plan: 'Standard',
    billing: 'Monthly',
    price: 109
  }
]

export default function SuperAdminCustomersPage() {
  return (
    <div className="max-w-7xl sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block">
        <Card className='py-3 px-3'>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Billing</TableHead>
                  <TableHead>Price (USD)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCustomers.map(c => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.location}</TableCell>
                    <TableCell>{c.product}</TableCell>
                    <TableCell>{c.plan}</TableCell>
                    <TableCell>{c.billing}</TableCell>
                    <TableCell>${c.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* MOBILE CARDS */}
      <div className="block md:hidden space-y-4">
        {mockCustomers.map(c => (
          <Card key={c.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">{c.name}</CardTitle>
              <p className="text-sm text-gray-500">{c.location}</p>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div><strong>Product:</strong> {c.product}</div>
              <div><strong>Plan:</strong> {c.plan}</div>
              <div><strong>Billing:</strong> {c.billing}</div>
              <div><strong>Price:</strong> ${c.price}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
