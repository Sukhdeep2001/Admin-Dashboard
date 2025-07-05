'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

export default function AddGiftCardPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [published, setPublished] = useState(true)
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const giftCardData = {
      id: `gift-${Date.now()}`,
      title,
      description,
      price: parseFloat(price),
      image: '/product.png', // placeholder
      metaTitle,
      metaDescription,
      published,
    }

    console.log('Gift card submitted:', giftCardData)
    alert('✅ Gift card created (mocked)')
  }

  return (
    <div className="text-black max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Gift Card</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">

            <div className="flex flex-col space-y-1">
              <Label>Gift Card Title</Label>
              <Input
                placeholder="Gift Card Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Description</Label>
              <Textarea
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Price (₹)</Label>
              <Input
                type="number"
                placeholder="e.g. 1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Gift Card Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Meta Title</Label>
              <Input
                placeholder="Meta Title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Meta Description</Label>
              <Textarea
                placeholder="Meta Description for SEO"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <Label>Status</Label>
              <Select
                value={published ? 'published' : 'hidden'}
                onValueChange={(val) => setPublished(val === 'published')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Save Gift Card
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
