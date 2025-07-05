'use client'

import React, { useState, useMemo } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import SubscriptionBarChart from '@/components/SubscriptionBarChart'

const pricingPlans = [
  { plan: 'Basic', color: 'rgba(37, 99, 235, 0.7)' },
  { plan: 'Standard', color: 'rgba(220, 38, 38, 0.7)' },
  { plan: 'Advanced', color: 'rgba(202, 138, 4, 0.7)' },
  { plan: 'Enterprise', color: 'rgba(5, 150, 105, 0.7)' }
]

const mockCustomers = [
  {
    id: 1,
    name: 'Alice Johnson',
    plan: 'Basic',
    subscribedAt: '2023-01-10',
    status: 'active',
    location: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: 2,
    name: 'Bob Smith',
    plan: 'Standard',
    subscribedAt: '2023-02-15',
    status: 'disabled',
    location: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 3,
    name: 'Charlie Lee',
    plan: 'Advanced',
    subscribedAt: '2023-03-01',
    status: 'upgrade_requested',
    location: { lat: 51.5074, lng: -0.1278 }
  },
  {
    id: 4,
    name: 'Diana Prince',
    plan: 'Enterprise',
    subscribedAt: '2023-01-20',
    status: 'active',
    location: { lat: 48.8566, lng: 2.3522 }
  },
  {
    id: 5,
    name: 'Evan Wright',
    plan: 'Basic',
    subscribedAt: '2023-02-25',
    status: 'active',
    location: { lat: 35.6895, lng: 139.6917 }
  },
  {
    id: 6,
    name: 'Fiona Green',
    plan: 'Standard',
    subscribedAt: '2023-03-10',
    status: 'active',
    location: { lat: -33.8688, lng: 151.2093 }
  }
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toISOString().split('T')[0]
}

export default function SuperAdminOrdersPage() {
  const [selectedPlan, setSelectedPlan] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)

  const minDate = useMemo(
    () => mockCustomers.reduce((min, c) => (c.subscribedAt < min ? c.subscribedAt : min), mockCustomers[0].subscribedAt),
    []
  )
  const maxDate = useMemo(
    () => mockCustomers.reduce((max, c) => (c.subscribedAt > max ? c.subscribedAt : max), mockCustomers[0].subscribedAt),
    []
  )

  const [startDate, setStartDate] = useState(minDate)
  const [endDate, setEndDate] = useState(maxDate)

  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter(customer => {
      const subDate = customer.subscribedAt
      const inPlan = selectedPlan === 'All' || customer.plan.toLowerCase() === selectedPlan.toLowerCase()
      const inDateRange = subDate >= startDate && subDate <= endDate
      return inPlan && inDateRange
    })
  }, [selectedPlan, startDate, endDate])

  // ✅ UPDATED chartData to show all subscriptions by date per plan
  const chartData = useMemo(() => {
    return pricingPlans.map(plan => {
      const subscriptions = filteredCustomers
        .filter(c => c.plan === plan.plan)
        .map(c => c.subscribedAt)
        .sort()

      return {
        plan: plan.plan,
        subscriptions,
        color: plan.color
      }
    })
  }, [filteredCustomers])

  const center = selectedCustomer ? selectedCustomer.location : { lat: 20, lng: 0 }
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapContainerStyle = { width: '100%', height: '400px' }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="plan-select" className="font-semibold">
            Filter by Plan:
          </label>
          <Select value={selectedPlan} onValueChange={value => setSelectedPlan(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Plans" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Plans</SelectItem>
              {pricingPlans.map(plan => (
                <SelectItem key={plan.plan} value={plan.plan}>
                  {plan.plan}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <div>
            <label className="font-semibold block">Start Date</label>
            <input
              type="date"
              className="border rounded-md px-2 py-1"
              max={endDate}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold block">End Date</label>
            <input
              type="date"
              className="border rounded-md px-2 py-1"
              min={startDate}
              max={maxDate}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Subscription Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Subscriptions by Plan</CardTitle>
        </CardHeader>
        <CardContent className="!p-4">
          <SubscriptionBarChart data={chartData} height={320} />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-x-auto px-3 py-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Subscribed At</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map(customer => (
              <TableRow
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className={`cursor-pointer ${selectedCustomer?.id === customer.id ? 'bg-blue-100' : ''}`}
              >
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.plan}</TableCell>
                <TableCell>{new Date(customer.subscribedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {customer.status === 'active' && <span className="text-green-600">Active</span>}
                  {customer.status === 'disabled' && <span className="text-red-600">Disabled</span>}
                  {customer.status === 'upgrade_requested' && <span className="text-yellow-600">Upgrade Requested</span>}
                </TableCell>
              </TableRow>
            ))}
            {filteredCustomers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500 py-6">
                  No customers found for this plan and date range.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Location</CardTitle>
        </CardHeader>
        <CardContent>
          {googleMapsApiKey ? (
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={selectedCustomer ? 8 : 2}
                options={{ streetViewControl: false, mapTypeControl: false }}
              >
                {selectedCustomer && <Marker position={center} />}
              </GoogleMap>
            </LoadScript>
          ) : (
            <p className="text-red-600">Google Maps API key missing in .env.local</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
