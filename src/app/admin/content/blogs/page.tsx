'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

type Blog = {
  id: string
  title: string
  image: string
  status: 'Published' | 'Draft'
  type: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch('/api/content/blogs')
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((b: any) => ({
          id: b.id,
          title: b.title,
          image: b.image,
          type: b.type,
          status: b.published ? 'Published' : 'Draft'
        }))
        setBlogs(formatted)
      })
  }, [])

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-2xl font-bold">📝 All Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs available.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white shadow rounded overflow-x-auto hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map(blog => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <Image
                        src={blog.image || '/product.png'}
                        alt={blog.title}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>
                      <Badge variant={blog.status === 'Published' ? 'default' : 'secondary'}>
                        {blog.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{blog.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {blogs.map(blog => (
              <Card key={blog.id} className="p-4 flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <Image
                    src={blog.image || '/product.png'}
                    alt={blog.title}
                    width={60}
                    height={60}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <p className="font-semibold text-base">{blog.title}</p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span>{' '}
                    <Badge variant={blog.status === 'Published' ? 'default' : 'secondary'}>
                      {blog.status}
                    </Badge>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span> {blog.type}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
