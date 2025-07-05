'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

type Doc = {
  id: number
  category: string
  title: string
  description: string
  tags: string[]
  steps: string[]
  videoUrl?: string
}

const initialDocs: Doc[] = [
  {
    id: 1,
    category: 'Getting Started',
    title: 'Onboarding Your Store',
    description: 'Connect your store and start using Admin.ai dashboard.',
    tags: ['setup', 'store'],
    steps: [
      'Go to Settings → Store',
      'Fill in your store details and logo',
      'Click Save to connect your store',
      'Dashboard is now live for your store'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    category: 'Products',
    title: 'Add a New Product',
    description: 'How to create and publish a product.',
    tags: ['product', 'catalog'],
    steps: [
      'Navigate to Products → Add Product',
      'Fill in product details, images, price, etc.',
      'Assign it to collections and publish'
    ]
  }
  // Add more docs as needed
]

export default function SuperAdminProductDocs() {
  const [docs, setDocs] = useState<Doc[]>(initialDocs)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDoc, setEditingDoc] = useState<Doc | null>(null)

  const categories = ['All', ...Array.from(new Set(docs.map(d => d.category)))]

  // Filter docs by search and category
  const filteredDocs = docs.filter(doc => {
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Open modal for new doc
  function openNewDocModal() {
    setEditingDoc({
      id: Date.now(),
      category: '',
      title: '',
      description: '',
      tags: [],
      steps: [],
      videoUrl: ''
    })
    setModalOpen(true)
  }

  // Open modal to edit existing doc
  function openEditDocModal(doc: Doc) {
    setEditingDoc({ ...doc })
    setModalOpen(true)
  }

  // Save doc (add new or update)
  function saveDoc(doc: Doc) {
    setDocs(prev => {
      const exists = prev.find(d => d.id === doc.id)
      if (exists) {
        return prev.map(d => (d.id === doc.id ? doc : d))
      } else {
        return [...prev, doc]
      }
    })
    setModalOpen(false)
  }

  // Delete doc with confirmation
  function deleteDoc(id: number) {
    if (confirm('Are you sure you want to delete this documentation?')) {
      setDocs(prev => prev.filter(d => d.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Super Admin — Product Documentation Settings</h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-3 flex-wrap">
          <Input
            placeholder="Search docs..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="sm:w-64"
          />
          <div className="relative inline-block w-48">
                <select
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                    className="block appearance-none w-full border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {categories.map(cat => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                    ))}
                </select>

                {/* Custom Chevron Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>
        </div>

        <Button onClick={openNewDocModal} className="whitespace-nowrap">
          + Add New Documentation
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.length === 0 && <p>No documentation found.</p>}
        {filteredDocs.map(doc => (
          <Card key={doc.id} className="border rounded-lg shadow-sm">
            <CardContent className="space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{doc.title}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditDocModal(doc)}
                    aria-label="Edit doc"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteDoc(doc.id)}
                    aria-label="Delete doc"
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{doc.description}</p>

              <div>
                <strong>Category:</strong> {doc.category}
              </div>

              <div className="flex flex-wrap gap-2">
                {doc.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div>
                <strong>Steps:</strong>
                <ol className="list-decimal list-inside mt-1 space-y-1 text-sm text-gray-700">
                  {doc.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              {doc.videoUrl && (
                <div className="mt-4 aspect-video w-full">
                  <iframe
                    src={doc.videoUrl}
                    title="Tutorial Video"
                    allowFullScreen
                    className="rounded-md w-full h-48 sm:h-64"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {modalOpen && editingDoc && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-3xl mx-auto">
            <DialogTitle>{editingDoc.id && docs.find(d => d.id === editingDoc.id) ? 'Edit Documentation' : 'Add New Documentation'}</DialogTitle>
            <DialogDescription>
              Fill in the fields below to {docs.find(d => d.id === editingDoc.id) ? 'update' : 'add'} the product documentation.
            </DialogDescription>

            <form
              onSubmit={e => {
                e.preventDefault()
                // Clean tags and steps arrays by splitting on commas/newlines, trimming spaces
                const cleanTags = editingDoc.tags
                  .map(t => t.trim())
                  .filter(Boolean)
                const cleanSteps = editingDoc.steps
                  .map(s => s.trim())
                  .filter(Boolean)
                saveDoc({ ...editingDoc, tags: cleanTags, steps: cleanSteps })
              }}
              className="space-y-4 mt-4"
            >
              <div>
                <label className="block font-medium">Title</label>
                <Input
                  required
                  value={editingDoc.title}
                  onChange={e => setEditingDoc({ ...editingDoc, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <Input
                  required
                  value={editingDoc.category}
                  onChange={e => setEditingDoc({ ...editingDoc, category: e.target.value })}
                  placeholder="E.g., Products, Orders, Settings"
                />
              </div>

              <div>
                <label className="block font-medium">Description</label>
                <Input
                  required
                  value={editingDoc.description}
                  onChange={e => setEditingDoc({ ...editingDoc, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block font-medium">Tags (comma separated)</label>
                <Input
                  value={editingDoc.tags.join(', ')}
                  onChange={e =>
                    setEditingDoc({
                      ...editingDoc,
                      tags: e.target.value.split(',').map(t => t.trim())
                    })
                  }
                  placeholder="e.g. product, inventory, setup"
                />
              </div>

              <div>
                <label className="block font-medium">Steps (one per line)</label>
                <textarea
                  className="w-full border rounded-md px-3 py-2"
                  rows={6}
                  value={editingDoc.steps.join('\n')}
                  onChange={e =>
                    setEditingDoc({
                      ...editingDoc,
                      steps: e.target.value.split('\n').map(s => s.trim())
                    })
                  }
                  placeholder="Step 1&#10;Step 2&#10;Step 3"
                />
              </div>

              <div>
                <label className="block font-medium">Video URL (optional)</label>
                <Input
                  value={editingDoc.videoUrl || ''}
                  onChange={e => setEditingDoc({ ...editingDoc, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
