'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-10">
      <h1 className="text-2xl mb-3 font-bold">Profile Settings</h1>

      {/* Section 1: Personal Info */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>

        <div className="flex items-center gap-4">
          <img
            src="/placeholder.jpg"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <Button variant="outline">Upload New</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-1">
            <Label>Product ID (Username)</Label>
            <Input disabled value="admin_872648" />
          </div>
          <div className="space-y-1">
            <Label>Name</Label>
            <Input placeholder="Client Name" />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input placeholder="client@email.com" type="email" />
          </div>
          <div className="space-y-1">
            <Label>Contact Number</Label>
            <Input placeholder="+91 9876543210" />
          </div>
          <div className="md:col-span-2 space-y-1">
            <Label>Address</Label>
            <Textarea placeholder="123 Main St, City, ZIP, Country" />
          </div>
        </div>
      </div>

      {/* Section 2: Business Info */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-2">Business Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label>Business Name</Label>
            <Input placeholder="My Business Pvt. Ltd." />
          </div>
          <div className="space-y-1">
            <Label>Business Email</Label>
            <Input placeholder="biz@email.com" type="email" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <Label>Business Address</Label>
            <Textarea placeholder="Office Address, Area, City, ZIP" />
          </div>
          <div className="space-y-1">
            <Label>Business Location</Label>
            <Input placeholder="India / US / UK" />
          </div>
          <div className="space-y-1">
            <Label>Number of Employees</Label>
            <Input type="number" placeholder="25" />
          </div>
          <div className="space-y-1">
            <Label>Tax / VAT / GST Number</Label>
            <Input placeholder="GSTIN1234ABC567" />
          </div>
          <div className="space-y-1">
            <Label>Plan Subscribed</Label>
            <Input disabled value="Pro Plan ($29/month)" />
          </div>
          <div className="space-y-1">
            <Label>Business Type</Label>
            <Input placeholder="E-commerce, SaaS, Agency..." />
          </div>
          <div className="space-y-1">
            <Label>Monthly Revenue / Sales</Label>
            <Input type="text" placeholder="$12,000" />
          </div>
          <div className="space-y-1">
            <Label>Payment Method</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit Card</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
                <SelectItem value="gpay">Google Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  )
}
