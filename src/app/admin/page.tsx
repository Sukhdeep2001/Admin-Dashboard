'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Site = {
  name: string
  thumbnail: string
  favicon?: string
}

type SEOData = {
  title: string
  description: string
  jsonld: string
}

export default function AdminDashboard() {
  const [username, setUsername] = useState('Sukhdeep')
  const [sites, setSites] = useState<Site[]>([])
  const [seo, setSEO] = useState<SEOData>({
    title: '',
    description: '',
    jsonld: ''
  })

  useEffect(() => {
    fetch('/api/sites')
      .then(res => res.json())
      .then(data => setSites(data))

    fetch('/api/seo')
      .then(res => res.json())
      .then(data => setSEO(data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSEO(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      if (seo.jsonld.trim()) {
        JSON.parse(seo.jsonld)
      }

      await fetch('/api/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(seo),
      })

      alert('SEO data saved successfully!')
    } catch (err) {
      alert('Invalid JSON-LD: Please check the syntax.')
    }
  }

  return (
    <div className="space-y-10 text-black">
      <h1 className="text-2xl font-bold">Welcome, {username} 👋</h1>

      {/* Connected Sites */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Connected Websites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map((site, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  {site.favicon && (
                    <img src={site.favicon} alt="favicon" className="w-6 h-6" />
                  )}
                  <div>
                    <p className="font-semibold">{site.name}</p>
                    <p className="text-xs text-gray-500">Homepage Preview</p>
                  </div>
                </div>
                <img
                  src={site.thumbnail}
                  alt={`${site.name} thumbnail`}
                  className="rounded border w-full h-32 object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SEO Metadata Form */}
      <Card className="max-w-3xl">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-lg font-semibold">SEO Metadata for Homepage</h2>

          <div className="space-y-2">
            <Label>Meta Title</Label>
            <Input
              name="title"
              value={seo.title}
              onChange={handleChange}
              placeholder="Homepage Meta Title"
            />
          </div>

          <div className="space-y-2">
            <Label>Meta Description</Label>
            <Textarea
              name="description"
              value={seo.description}
              onChange={handleChange}
              rows={3}
              placeholder="Homepage meta description for SEO"
            />
          </div>

          <div className="space-y-2">
            <Label>JSON-LD Structured Data</Label>
            <Textarea
              name="jsonld"
              value={seo.jsonld}
              onChange={handleChange}
              rows={10}
              className="font-mono text-sm bg-gray-50"
              spellCheck={false}
              placeholder='{ "@context": "https://schema.org", ... }'
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Metadata
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
