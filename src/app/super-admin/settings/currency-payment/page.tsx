'use client'

import { useState } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

type Customer = {
  name: string
  email: string
  plan: string
  cycle: string
  method: string
  amount: string
  nextBilling: string
  status: string
  threshold?: number
}

const initialCustomers: Customer[] = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    plan: "Pro",
    cycle: "Monthly",
    method: "Credit Card",
    amount: "$29",
    nextBilling: "2025-07-15",
    status: "Active",
    threshold: 200,
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    plan: "Basic",
    cycle: "Yearly",
    method: "PayPal",
    amount: "$199",
    nextBilling: "2026-01-01",
    status: "Active",
    threshold: 200,
  },
]

export default function CurrencyPaymentPage() {
  const [provider, setProvider] = useState("")
  const [thirdParty, setThirdParty] = useState("")
  const [manual, setManual] = useState("")
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [thresholdInputs, setThresholdInputs] = useState<Record<string, number>>({})

  const handleThresholdChange = (email: string, value: number) => {
    setThresholdInputs(prev => ({ ...prev, [email]: value }))
  }

  const handleThresholdUpdate = (email: string) => {
    const newLimit = thresholdInputs[email]
    if (!newLimit) return
    const updated = customers.map(c =>
      c.email === email ? { ...c, threshold: newLimit } : c
    )
    setCustomers(updated)
  }

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">Payment Configuration</h1>

      {/* Payment Method Settings */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="mb-1 pb-3 block">Payment Provider</Label>
            <Select onValueChange={setProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select Payment Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="razorpay">Razorpay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 pb-3 block">Third Party Provider</Label>
            <Select onValueChange={setThirdParty}>
              <SelectTrigger>
                <SelectValue placeholder="Select Third Party Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="googlepay">Google Pay</SelectItem>
                <SelectItem value="applepay">Apple Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1 pb-3 block">Manual Payment Method</Label>
            <Select onValueChange={setManual}>
              <SelectTrigger>
                <SelectValue placeholder="Select Manual Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Customer Billing Summary</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Billing Cycle</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Next Billing</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Threshold Limit</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>{user.cycle}</TableCell>
                <TableCell>{user.method}</TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>{user.nextBilling}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Threshold"
                    defaultValue={user.threshold}
                    onChange={(e) => handleThresholdChange(user.email, parseInt(e.target.value))}
                    className="w-24"
                  />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleThresholdUpdate(user.email)}
                  >
                    Update
                  </Button>
                  <Link href="/super-admin/settings/plan">
                    <Button variant="outline" size="sm">Change</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {customers.map((user) => (
          <div key={user.email} className="bg-white p-4 rounded-lg shadow space-y-2">
            <div className="font-medium text-lg">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div><strong>Plan:</strong> {user.plan}</div>
            <div><strong>Cycle:</strong> {user.cycle}</div>
            <div><strong>Method:</strong> {user.method}</div>
            <div><strong>Amount:</strong> {user.amount}</div>
            <div><strong>Next Billing:</strong> {user.nextBilling}</div>
            <div><strong>Status:</strong> {user.status}</div>
            <div>
              <Label className="pb-3">Threshold</Label>
              <Input
                type="number"
                placeholder="Threshold"
                defaultValue={user.threshold}
                onChange={(e) => handleThresholdChange(user.email, parseInt(e.target.value))}
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleThresholdUpdate(user.email)}>Update</Button>
              <Link href="/super-admin/settings/plan">
                <Button variant="outline" size="sm">Change</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
