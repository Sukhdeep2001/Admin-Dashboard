'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

type Product = {
  id: string
  title: string
  image: string
  published: boolean
}

export default function AddCollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [productSearch, setProductSearch] = useState('')
  const [sortType, setSortType] = useState('az')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  useEffect(() => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    setUrl(slug)
  }, [name])

  const addProductToCollection = () => {
    const found = products.find(
      (p) =>
        p.title.toLowerCase() === productSearch.trim().toLowerCase() ||
        p.id === productSearch.trim()
    )
    if (found && !selectedProducts.some((p) => p.id === found.id)) {
      setSelectedProducts((prev) => [...prev, found])
    }
    setProductSearch('')
  }

  const sortedProducts = [...selectedProducts].sort((a, b) => {
    if (sortType === 'az') return a.title.localeCompare(b.title)
    if (sortType === 'za') return b.title.localeCompare(a.title)
    return 0
  })

  return (
    <div className="text-black grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Form Section */}
      <form className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Add New Collection</h1>

        <Input
          placeholder="Collection Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Textarea
          placeholder="Collection Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <Label>Search Products</Label>
          <div className="flex gap-2 mt-1">
            <Input
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              placeholder="Enter product name or ID"
            />
            <Button type="button" onClick={addProductToCollection}>
              Add
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Label>Selected Products</Label>
          <Select value={sortType} onValueChange={setSortType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="az">Sort A–Z</SelectItem>
              <SelectItem value="za">Sort Z–A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedProducts.length > 0 && (
          <div className="rounded border bg-white shadow-sm mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Image
                        src={product.image || '/product.png'}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                      {product.published ? 'Active' : 'Draft'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <Input
          placeholder="Meta Title"
          className="mt-4"
        />
        <Textarea
          placeholder="Meta Description"
        />

        <div>
          <Label className="block mb-1">Collection URL</Label>
          <Input
            value={url}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>
      </form>

      {/* Sidebar Section */}
      <div className="space-y-4 lg:border-l lg:pl-6 pl-0 border-none">
        <h3 className="text-lg font-semibold">Settings</h3>

        <div className="space-y-2">
          <Label>Sales Channels</Label>
          <Select defaultValue="Online Store">
            <SelectTrigger>
              <SelectValue placeholder="Select channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Online Store">Online Store</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Collection Type</Label>
          <Select defaultValue="Manual">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="Automated">Automated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Vendor</Label>
          <Input placeholder="Vendor Name" />
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <Input placeholder="Add tags" />
        </div>

        <div className="space-y-2">
          <Label>Collection Image</Label>
          <Input type="file" accept="image/*" />
        </div>

        <Button type="submit" className="w-full mt-4">
          Save Collection
        </Button>
      </div>
    </div>
  )
}
