'use client'

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import pricingPlans from "@/lib/pricingPlans.json"
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function CheckoutClient() {
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")
  const billing = searchParams.get("billing") || "monthly"

  const plan = pricingPlans.find(p => p.id === planId)
  const title = plan?.title || "Unknown Plan"

  const price =
    billing === "yearly"
      ? plan?.yearlyPrice?.replace("$", "").trim()
      : plan?.monthlyPrice?.replace("$", "").trim()

  const pricePeriod = billing === "yearly" ? "/year" : "/month"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNo: "",
    businessName: "",
    businessAddress: "",
    message: "",
    businessTaxId: "",
    businessLocation: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const rate = parseFloat(price || "0")
    const gst = rate * 0.18
    setTotal(rate + gst)
  }, [price])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const router = useRouter()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert("Payment simulated successfully")
    router.push('/admin')
  }

  return (
    <div className="p-6 grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-muted-foreground">
            {pricePeriod ? `Billed ${pricePeriod}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>GST (18%):</strong> ${(parseFloat(price || "0") * 0.18).toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Billing Info</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Label className="mb-3">Full Name</Label>
              <Input name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Email</Label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Mobile Number</Label>
              <Input name="mobileNo" type="tel" value={formData.mobileNo} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Business Name</Label>
              <Input name="businessName" value={formData.businessName} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Business Address</Label>
              <Textarea name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Business Tax Identification Number</Label>
              <Input name="businessTaxId" value={formData.businessTaxId} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Business Location</Label>
              <Input name="businessLocation" value={formData.businessLocation} onChange={handleChange} required />
            </div>
            <div>
              <Label className="mb-3">Message</Label>
              <Textarea name="message" value={formData.message} onChange={handleChange} />
            </div>

            <div>
              <Label className="mb-2 block">Payment Method</Label>
              <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="credit">Credit Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                </TabsList>

                <TabsContent value="credit" className="mt-4 space-y-3">
                  <div>
                    <Label className="mb-3">Card Holder Name</Label>
                    <Input type="text" placeholder="Enter your name mentioned on card" required />
                  </div>
                  <div>
                    <Label className="mb-3">Card Number</Label>
                    <Input type="text" placeholder="xxxx xxxx xxxx xxxx" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-3">Expiry Date</Label>
                      <Input type="text" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label className="mb-3">CVV</Label>
                      <Input type="text" placeholder="123" required />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="paypal" className="mt-4">
                  <p className="text-sm mb-2 text-muted-foreground">
                    You’ll be redirected to PayPal to complete your purchase.
                  </p>
                  <a
                    href="https://www.paypal.com/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Click here to connect PayPal
                  </a>
                </TabsContent>
              </Tabs>
            </div>

            <Button type="submit" className="w-full mt-4">
              Pay Now
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
