'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

type Customer = {
  name: string
  email: string
  plan: string
  cycle: string
  method: string
  amount: string
  nextBilling: string
  status: string
}

// 👇 Local JSON data
const localData: Customer[] = [
  {
    name: "John Doe",
    email: "john@example.com",
    plan: "Pro",
    cycle: "Monthly",
    method: "Stripe",
    amount: "$29",
    nextBilling: "2025-07-30",
    status: "Active"
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Basic",
    cycle: "Yearly",
    method: "PayPal",
    amount: "$199",
    nextBilling: "2026-01-01",
    status: "Active"
  }
]

export default function CurrencyPaymentPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [totalSpent, setTotalSpent] = useState<number>(0)

  const THRESHOLD = 200
  const isBlocked = totalSpent >= THRESHOLD

  useEffect(() => {
    setCustomers(localData)

    const total = localData.reduce((acc, cur) => {
      const amountStr = typeof cur?.amount === "string" ? cur.amount.replace("$", "") : "0"
      const parsedAmount = parseFloat(amountStr)
      return acc + (isNaN(parsedAmount) ? 0 : parsedAmount)
    }, 0)

    setTotalSpent(total)
  }, [])

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Payment Configuration</h1>

      {isBlocked && (
        <Alert variant="destructive">
          <AlertTitle>Threshold Limit Exceeded</AlertTitle>
          <AlertDescription>
            You’ve spent ${totalSpent}. You cannot change payment method or plan. Please contact support.
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label className="mb-1 block">Payment Provider</Label>
            <Select disabled={isBlocked}>
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
            <Label className="mb-1 block">Third Party Provider</Label>
            <Select disabled={isBlocked}>
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
            <Label className="mb-1 block">Manual Payment Method</Label>
            <Select disabled={isBlocked}>
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

      <div className="bg-white p-6 rounded-xl shadow space-y-4">
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>{user.cycle}</TableCell>
                <TableCell>{user.method}</TableCell>
                <TableCell>{user.amount}</TableCell>
                <TableCell>{user.nextBilling}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Link href="/super-admin/settings/plan">
                    <Button variant="outline" size="sm" disabled={isBlocked}>
                      Change
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <h2 className="text-lg font-semibold">Spending Summary</h2>
        <p className="text-sm text-muted-foreground">
          <strong>Total Spent:</strong> ${totalSpent}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Threshold Limit:</strong> ${THRESHOLD}
        </p>
      </div>
    </div>
  )
}
