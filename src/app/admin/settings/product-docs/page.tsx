'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

const mockDocs: Doc[] = [
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
  },
  {
    id: 3,
    category: 'Products',
    title: 'Manage Inventory',
    description: 'Track and update product stock levels.',
    tags: ['inventory'],
    steps: [
      'Go to Products → Inventory',
      'Update stock quantities and location',
      'Changes are auto-saved'
    ]
  },
  {
    id: 4,
    category: 'Products',
    title: 'Create a Gift Card',
    description: 'How to create and send gift cards.',
    tags: ['giftcard'],
    steps: [
      'Go to Products → Gift Cards',
      'Click Add Gift Card',
      'Add title, amount, and expiry',
      'Publish to make it available'
    ]
  },
  {
    id: 5,
    category: 'Orders',
    title: 'Handle Draft Orders',
    description: 'Create custom draft orders for customers.',
    tags: ['orders', 'draft'],
    steps: [
      'Go to Orders → Draft',
      'Create new draft order with custom items and price',
      'Send invoice or mark as paid'
    ]
  },
  {
    id: 6,
    category: 'Orders',
    title: 'Abandoned Checkouts',
    description: 'Recover potential lost sales.',
    tags: ['checkout', 'recovery'],
    steps: [
      'Navigate to Orders → Abandoned',
      'Send recovery emails to those users',
      'Track recovered sales'
    ]
  },
  {
    id: 7,
    category: 'Customers',
    title: 'Customer Segmentation',
    description: 'Create segments based on behavior and purchase.',
    tags: ['customer', 'segments'],
    steps: [
      'Go to Customers → Segments',
      'Click Add Segment and set filters',
      'Save and use for email marketing'
    ]
  },
  {
    id: 8,
    category: 'Analytics',
    title: 'Reports Overview',
    description: 'Understand your business performance.',
    tags: ['reports'],
    steps: [
      'Navigate to Analytics → Reports',
      'Use filters for date, product, customer type',
      'Export reports to CSV'
    ]
  },
  {
    id: 9,
    category: 'Analytics',
    title: 'Integrate with Third-Party Tools',
    description: 'Connect APIs for analytics and automation.',
    tags: ['integration', 'api'],
    steps: [
      'Go to Analytics → Integrations',
      'Click Connect for desired tool',
      'Enter API Key and save'
    ]
  },
  {
    id: 10,
    category: 'Content',
    title: 'Manage Blogs and Menus',
    description: 'Create blog posts, blog types, menus, and media.',
    tags: ['content', 'cms'],
    steps: [
      'Go to Content → Blogs or Menu',
      'Add blog or menu items as needed',
      'Use Upload tab to upload images or files'
    ]
  },
  {
    id: 11,
    category: 'Discounts',
    title: 'Create Automatic Discounts',
    description: 'Set up Buy X Get Y or amount-based discounts.',
    tags: ['discount', 'buyxgety'],
    steps: [
      'Go to Discounts → Automatic',
      'Choose type: order amount, product discount, or Buy X Get Y',
      'Define conditions and schedule',
      'Save and activate'
    ]
  },
  {
    id: 12,
    category: 'Settings',
    title: 'Profile & Permissions',
    description: 'Manage profile info and staff user roles.',
    tags: ['settings', 'users'],
    steps: [
      'Go to Settings → Profile / Users',
      'Edit your profile or add new staff users',
      'Set permissions per user'
    ]
  },
  {
    id: 13,
    category: 'Settings',
    title: 'API Keys & Checkout',
    description: 'Create API keys and customize checkout config.',
    tags: ['api', 'checkout'],
    steps: [
      'Go to Settings → API Keys or Checkout',
      'Generate keys and limit by scope',
      'Edit checkout fields and validation rules'
    ]
  },
  {
    id: 14,
    category: 'Settings',
    title: 'Policies & Store Activity',
    description: 'Define store policy and track activity logs.',
    tags: ['policy', 'logs'],
    steps: [
      'Go to Settings → Policy or Store Activity',
      'Create refund/shipping/privacy policies',
      'Track who changed what, and when'
    ]
  }
]

export default function AdminProductDocsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const categories = [...new Set(mockDocs.map(doc => doc.category))]
  const [mobileCategory, setMobileCategory] = useState('Getting Started')

  const filteredDocs = mockDocs.filter(
    doc =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6 max-w-screen-xl">
      <h1 className="text-2xl font-bold">📘 Product Documentation</h1>
      <p className="text-sm text-muted-foreground">
        Step-by-step guides and videos for Admin.ai dashboard.
      </p>

      <Input
        placeholder="Search features or guides..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full sm:max-w-md"
      />

      {/* Desktop Tabs */}
      <div className="hidden sm:block">
        <Tabs defaultValue={categories[0]} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex gap-2 mt-4 px-2 w-max sm:w-full sm:flex-wrap">
              {categories.map(cat => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="whitespace-nowrap text-xs sm:text-sm md:text-base px-3 py-1"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(cat => (
            <TabsContent key={cat} value={cat} className="space-y-4 mt-4">
              {filteredDocs
                .filter(doc => doc.category === cat)
                .map(doc => (
                  <DocCard key={doc.id} doc={doc} />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Mobile Dropdown */}
      <div className="block sm:hidden">
        <select
          value={mobileCategory}
          onChange={(e) => setMobileCategory(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className="space-y-4 mt-4">
          {filteredDocs
            .filter(doc => doc.category === mobileCategory)
            .map(doc => (
              <DocCard key={doc.id} doc={doc} />
            ))}
        </div>
      </div>
    </div>
  )
}

function DocCard({ doc }: { doc: Doc }) {
  return (
    <Card className="rounded-lg py-0 border shadow-sm bg-white w-full">
      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-base sm:text-lg">{doc.title}</h3>
        <p className="text-sm text-muted-foreground">{doc.description}</p>

        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-4">
          {doc.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>

        {doc.videoUrl && (
          <div className="mt-4 aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={doc.videoUrl}
              title="Tutorial"
              allowFullScreen
              className="rounded-md"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {doc.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
