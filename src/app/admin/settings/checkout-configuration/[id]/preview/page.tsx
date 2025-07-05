'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import products from '@/lib/products.json'

export default function CheckoutPreviewPage() {
  const router = useRouter()
  const [country, setCountry] = useState('')
  const [shippingEnabled, setShippingEnabled] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [showProductTable, setShowProductTable] = useState(true)

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Right Side for Mobile */}
      <div className="block lg:hidden bg-gray-100 p-6 space-y-6 overflow-y-auto">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-gray-300 rounded" />
          <div>
            <div className="font-semibold">Product Title</div>
            <div className="text-sm text-gray-600">₹ 999</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Discount Code</Label>
          <div className="flex gap-2">
            <Input placeholder="Enter code" />
            <Button>Apply</Button>
          </div>
        </div>

        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ 999</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingEnabled ? '₹ 50' : '—'}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Taxes</span>
            <span>₹ 80</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>₹ 1129</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Other Products</h3>
          <div className="grid grid-cols-1 gap-4">
            {products.slice(0, 5).map((product, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-2 rounded shadow-sm">
                <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.title}</div>
                  <div className="text-xs text-gray-600">₹ {product.price}</div>
                </div>
                <Button size="lg">Buy Now</Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Left Side */}
      <div className="w-full lg:w-2/3 p-6 space-y-8 overflow-y-auto relative">
        <button
          onClick={() => router.push('/admin/settings/checkout-configuration')}
          className="absolute top-4 left-4 text-sm text-blue-600 underline"
        >
          ← Back
        </button>

        <div className="pt-12 space-y-6">
          {/* Announcement Bar & Product Table Toggle */}
          <div className="space-y-4">
            <Label>Announcement or Sale Text</Label>
            <Input placeholder="Big Sale - 20% Off Today Only!" />
          </div>

          <div className="space-y-4">
            <Label>Show Product Table</Label>
            <Switch defaultChecked checked={showProductTable} onCheckedChange={setShowProductTable} />
          </div>

          {showProductTable && (
            <div className="overflow-auto border rounded-md">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 4).map((product, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">
                        <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                      </td>
                      <td
                        className="px-4 py-2 text-blue-600 hover:underline cursor-pointer"
                        onClick={() => router.push(`/admin/products/${product.id}`)}
                      >
                        {product.title}
                      </td>
                      <td className="px-4 py-2">₹ {product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Contact</h2>
            <Input placeholder="Email or phone number" />
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Address for Delivery</h2>
            <Select onValueChange={setCountry} value={country}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Street address" />
            <Input placeholder="Pincode" />
            <Input placeholder="State" />
            <Input placeholder="Mobile number" />
            <Input placeholder="Street No." />
          </div>

          {/* Shipping */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Shipping Option</h2>
            <Switch checked={shippingEnabled} onCheckedChange={setShippingEnabled} />
          </div>

          {/* Payment */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Payment</h2>
            <div className="flex items-center gap-4">
              <Label>Credit Card</Label>
              <Switch
                checked={paymentMethod === 'credit'}
                onCheckedChange={() => setPaymentMethod('credit')}
              />
              <Label>Paypal</Label>
              <Switch
                checked={paymentMethod === 'paypal'}
                onCheckedChange={() => setPaymentMethod('paypal')}
              />
            </div>

            {paymentMethod === 'credit' && (
              <div className="space-y-4 pt-2">
                <Input placeholder="Cardholder Name" />
                <Input placeholder="Card Number" />
                <Input placeholder="CVV" />
                <Input placeholder="Expiry Date (MM/YY)" />
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="space-y-2 pt-2">
                <Input placeholder="PayPal Email" />
                <Button>Continue to PayPal</Button>
              </div>
            )}

            <Button className="mt-4 w-full">Buy Now</Button>
          </div>
        </div>
      </div>

      {/* Right Side for Desktop */}
      <div className="hidden lg:block w-1/3 bg-gray-100 p-6 space-y-6 overflow-y-auto">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 bg-gray-300 rounded" />
          <div>
            <div className="font-semibold">Product Title</div>
            <div className="text-sm text-gray-600">₹ 999</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Discount Code</Label>
          <div className="flex gap-2">
            <Input placeholder="Enter code" />
            <Button>Apply</Button>
          </div>
        </div>

        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ 999</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shippingEnabled ? '₹ 50' : '—'}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Taxes</span>
            <span>₹ 80</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>₹ 1129</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="pt-4 border-t">
          <h3 className="text-lg font-semibold mb-2">Other Products</h3>
          <div className="grid grid-cols-1 gap-4">
            {products.slice(0, 5).map((product, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-white p-2 rounded shadow-sm">
                <img src={product.image} alt={product.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.title}</div>
                  <div className="text-xs text-gray-600">₹ {product.price}</div>
                </div>
                <Button size="lg">Buy Now</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
