'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export default function AddProductPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')
  const [includeTax, setIncludeTax] = useState(false)
  const [taxRate, setTaxRate] = useState('')
  const [shippingInfo, setShippingInfo] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [thumbnails, setThumbnails] = useState<FileList | null>(null)
  const [cost, setCost] = useState('')
  const [margin, setMargin] = useState('')
  const [profit, setProfit] = useState('')
  const [sku, setSku] = useState('')
  const [barcode, setBarcode] = useState('')
  const [trackQty, setTrackQty] = useState(false)
  const [location, setLocation] = useState('')
  const [variant, setVariant] = useState('')
  const [subscription, setSubscription] = useState(false)
  const [category, setCategory] = useState('')
  const [collection, setCollection] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [tags, setTags] = useState('')
  const [published, setPublished] = useState(true)
  const [salesChannels, setSalesChannels] = useState<string[]>([])
  const [productType, setProductType] = useState('')
  const [vendor, setVendor] = useState('')
  const [salesCount, setSalesCount] = useState('')
  const [ordersCount, setOrdersCount] = useState('')

  const handleSalesChannelChange = (channel: string) => {
    setSalesChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      id: `prod-${Date.now()}`,
      title,
      description,
      price,
      compareAtPrice,
      includeTax,
      taxRate,
      shippingInfo,
      image,
      thumbnails,
      cost,
      margin,
      profit,
      sku,
      barcode,
      trackQty,
      location,
      variant,
      subscription,
      category,
      collection,
      metaTitle,
      metaDescription,
      tags: tags.split(',').map(t => t.trim()),
      published,
      salesChannels,
      productType,
      vendor,
      salesCount,
      ordersCount,
    }

    console.log('Product Submitted:', productData)
    alert('✅ Product submitted. (Mock submission)')
  }

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Section */}
        <div className="md:col-span-2 space-y-4">
          <Input placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

          <Textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="flex gap-4">
            <Input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input placeholder="Compare at Price" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} />
          </div>

          <div className="flex items-center gap-4">
            <Checkbox checked={includeTax} onCheckedChange={(val) => setIncludeTax(!!val)} />
            <Label>Include tax in price</Label>
            <Input placeholder="Tax Rate %" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-1/2" />
          </div>

          <Input placeholder="Shipping and Delivery Info" value={shippingInfo} onChange={(e) => setShippingInfo(e.target.value)} />

          <div>
            <Label className='pb-3'>Product Image</Label>
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
          </div>

          <div>
            <Label className='pb-3'>Thumbnail Images</Label>
            <Input type="file" multiple accept="image/*" onChange={(e) => setThumbnails(e.target.files)} />
          </div>

          <div className="flex gap-4">
            <Input placeholder="Cost per Item" value={cost} onChange={(e) => setCost(e.target.value)} />
            <Input placeholder="Margin %" value={margin} onChange={(e) => setMargin(e.target.value)} />
            <Input placeholder="Profit" value={profit} onChange={(e) => setProfit(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <Input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
            <Input placeholder="Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox checked={trackQty} onCheckedChange={(val) => setTrackQty(!!val)} />
            <Label>Track Quantity</Label>
          </div>

          <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

          <Input placeholder="Variants (e.g. Size, Color)" value={variant} onChange={(e) => setVariant(e.target.value)} />

          <div className="flex items-center gap-2">
            <Checkbox checked={subscription} onCheckedChange={(val) => setSubscription(!!val)} />
            <Label>Enable Subscription Purchase</Label>
          </div>

          <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

          <Input placeholder="Collection" value={collection} onChange={(e) => setCollection(e.target.value)} />

          <Input placeholder="Meta Title" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />

          <Textarea placeholder="Meta Description" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4 lg:border-l lg:pl-6 pl-0 border-none">
          <Input placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />

          <Input placeholder="Product Type" value={productType} onChange={(e) => setProductType(e.target.value)} />

          <Input placeholder="Vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />

          <Input placeholder="Sales on this Product" value={salesCount} onChange={(e) => setSalesCount(e.target.value)} />

          <Input placeholder="Orders on this Product" value={ordersCount} onChange={(e) => setOrdersCount(e.target.value)} />

          <div>
            <Label className="pb-3">Status</Label>
            <Select value={published ? 'published' : 'hidden'} onValueChange={(v) => setPublished(v === 'published')}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="pb-3">Sales Channels</Label>
            {['Online Store', 'Facebook', 'Instagram'].map((channel) => (
              <div key={channel} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={salesChannels.includes(channel)}
                  onCheckedChange={() => handleSalesChannelChange(channel)}
                />
                <span>{channel}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Visible on: {salesChannels.join(', ') || 'None'}
          </p>

          <Button type="submit" className="w-full mt-4">Save Product</Button>
        </div>

      </form>
    </div>
  )
}
