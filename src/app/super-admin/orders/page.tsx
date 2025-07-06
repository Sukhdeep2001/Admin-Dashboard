'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { GoogleMap, Marker, LoadScriptNext } from '@react-google-maps/api'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
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
  const [isMobile, setIsMobile] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('All')
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const minDate = useMemo(() => {
    return mockCustomers.reduce((min, c) => (c.subscribedAt < min ? c.subscribedAt : min), mockCustomers[0].subscribedAt)
  }, [])

  const maxDate = useMemo(() => {
    return mockCustomers.reduce((max, c) => (c.subscribedAt > max ? c.subscribedAt : max), mockCustomers[0].subscribedAt)
  }, [])

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

// ✅ Update Chart Data

  const chartData = useMemo(() => {
    return pricingPlans.map(plan => {
      const subscriptions = filteredCustomers
        .filter(c => c.plan === plan.plan)
        .map(c => c.subscribedAt)
        .sort()
      return { plan: plan.plan, subscriptions, color: plan.color }
    })
  }, [filteredCustomers])

  const center = selectedCustomer ? selectedCustomer.location : { lat: 20, lng: 0 }
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const mapContainerStyle = { width: '100%', height: '300px' }

  // ✅ Mobile Layout
  if (isMobile) {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-bold">Orders</h1>

        {/* Mobile Filters */}
        <div className="space-y-3">
          <div>
            <label className="block font-semibold text-sm mb-1">Filter by Plan</label>
            <Select value={selectedPlan} onValueChange={setSelectedPlan}>
              <SelectTrigger className="w-full">
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
          <div className="flex flex-col gap-2">
            <div>
              <label className="text-sm font-semibold">Start Date</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md w-full"
                value={startDate}
                max={endDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">End Date</label>
              <input
                type="date"
                className="border px-2 py-1 rounded-md w-full"
                value={endDate}
                min={startDate}
                max={maxDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Subscriptions</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="overflow-x-scroll">
              <SubscriptionBarChart data={chartData} height={260} />
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {filteredCustomers.map(c => (
              <div
                key={c.id}
                className="flex justify-between items-center border-b py-1"
              >
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.plan}</div>
                </div>
                <span className="text-xs">
                  {new Date(c.subscribedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {filteredCustomers.length === 0 && (
              <p className="text-center text-muted-foreground">No results</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ Desktop layout remains unchanged below this line
  return (
    <div className="space-y-6 sm:px-6 md:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold">Orders</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <label htmlFor="plan-select" className="font-semibold text-sm">Filter by Plan:</label>
          <Select value={selectedPlan} onValueChange={value => setSelectedPlan(value)}>
            <SelectTrigger className="w-full sm:w-40">
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

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <div>
            <label className="font-semibold block text-sm">Start Date</label>
            <input
              type="date"
              className="border rounded-md px-2 py-1 w-full sm:w-auto"
              max={endDate}
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold block text-sm">End Date</label>
            <input
              type="date"
              className="border rounded-md px-2 py-1 w-full sm:w-auto"
              min={startDate}
              max={maxDate}
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <Card className="overflow-x-auto">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Subscriptions by Plan</CardTitle>
        </CardHeader>
        <CardContent className="!p-2 sm:!p-4">
          <SubscriptionBarChart data={chartData} height={320} />
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-x-auto">
        <div className="w-full overflow-x-auto">
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
        </div>
      </Card>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Customer Location</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {googleMapsApiKey ? (
            <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={selectedCustomer ? 8 : 2}
                options={{ streetViewControl: false, mapTypeControl: false }}
              >
                {selectedCustomer && <Marker position={center} />}
              </GoogleMap>
            </LoadScriptNext>
          ) : (
            <p className="text-red-600">Google Maps API key missing in .env.local</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
