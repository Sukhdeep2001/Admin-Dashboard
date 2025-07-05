'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

type UploadedFile = {
  id: string
  name: string
  type: string
  url: string
}

export default function UploadContentPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploads, setUploads] = useState<UploadedFile[]>([])
  const [error, setError] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file && file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB')
      setSelectedFile(null)
    } else {
      setError('')
      setSelectedFile(file)
    }
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    const newUpload: UploadedFile = {
      id: `file-${Date.now()}`,
      name: selectedFile.name,
      type: selectedFile.type,
      url: '/product.png', // Mocked
    }

    setUploads((prev) => [...prev, newUpload])
    setSelectedFile(null)
    alert('✅ File uploaded successfully (mocked)')
  }

  return (
    <div className="text-black max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Upload Content</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Select a file (Max 50MB)</Label>
          <Input
            id="file"
            type="file"
            accept="image/*,video/*,application/pdf"
            onChange={handleFileChange}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <Button type="submit" disabled={!selectedFile}>
          Upload
        </Button>
      </form>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        {uploads.length === 0 ? (
          <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
          <div className="space-y-3">
            {uploads.map((file) => (
              <Card key={file.id} className="bg-white shadow-sm">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-600">{file.type}</p>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
