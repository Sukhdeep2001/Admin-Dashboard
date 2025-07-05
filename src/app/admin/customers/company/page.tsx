'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Company = {
  id: string
  name: string
  approved: boolean
  location: string
  contactPerson: string
  totalOrders: number
  totalSales: number
}

export default function CompanyPage() {
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    fetch('/api/customers/company')
      .then(res => res.json())
      .then(data => setCompanies(data))
  }, [])

  return (
    <div className="text-black space-y-6">
      <h1 className="text-2xl font-bold">🏢 Customer Companies</h1>

      {companies.length === 0 ? (
        <p>No company data found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden sm:block bg-white shadow rounded-md overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Approval</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>
                      <Badge variant={c.approved ? 'default' : 'outline'}>
                        {c.approved ? 'Approved' : 'Not Approved'}
                      </Badge>
                    </TableCell>
                    <TableCell>{c.location}</TableCell>
                    <TableCell>{c.contactPerson}</TableCell>
                    <TableCell>{c.totalOrders}</TableCell>
                    <TableCell>₹{c.totalSales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 sm:hidden">
            {companies.map((c) => (
              <Card key={c.id} className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{c.name}</h2>
                  <Badge variant={c.approved ? 'default' : 'outline'}>
                    {c.approved ? 'Approved' : 'Not Approved'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">
                  <strong>Location:</strong> {c.location}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Contact:</strong> {c.contactPerson}
                </p>
                <div className="flex justify-between text-sm text-gray-700">
                  <span><strong>Orders:</strong> {c.totalOrders}</span>
                  <span><strong>Sales:</strong> ₹{c.totalSales}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
