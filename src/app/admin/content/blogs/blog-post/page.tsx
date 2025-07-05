'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'


type BlogStatus = 'Published' | 'Draft'

export default function AddBlogPostPage() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [status, setStatus] = useState<BlogStatus>('Draft')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [description, setDescription] = useState('')
  const [blogTypes, setBlogTypes] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/blogPosts')
      .then(res => res.json())
      .then(data => setBlogTypes(data.map((t: any) => t.name)))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPost = {
      id: `blog-${Date.now()}`,
      title,
      image: '/product.png',
      description,
      metaTitle,
      metaDescription,
      status,
      type
    }

    console.log('📄 Blog Post Created:', newPost)
    alert('✅ Blog post added (mocked)')
  }

  return (
    <div className="text-black grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Section */}
      <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
        <h1 className="text-2xl font-bold">➕ Add New Blog Post</h1>

        <div className="space-y-2">
          <Label>Blog Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to Build a Hydrogen Storefront"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="You can use markdown or HTML..."
            className="min-h-[160px]"
          />
        </div>

        <div className="space-y-2">
          <Label>Meta Title</Label>
          <Input
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Meta title for SEO"
          />
        </div>

        <div className="space-y-2">
          <Label>Meta Description</Label>
          <Textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Write SEO-friendly meta description"
            className="min-h-[100px]"
          />
        </div>

        <Button type="submit" className="w-full md:w-fit">
          💾 Save Blog Post
        </Button>
      </form>

      {/* Right Sidebar */}
      <div className="space-y-4 lg:border-l lg:pl-6 pl-0 border-none">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as BlogStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Published">Published</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Blog Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="space-y-2">
          <Label>Blog Type</Label>
          <Select value={type} onValueChange={(v) => setType(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blog type" />
            </SelectTrigger>
            <SelectContent>
              {blogTypes.map((bt, idx) => (
                <SelectItem key={idx} value={bt}>
                  {bt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
