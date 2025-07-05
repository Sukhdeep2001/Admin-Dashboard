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
import { Button } from '@/components/ui/button'

type ContentItem = {
  id: string
  name: string
  type: string
  url: string
}

export default function ContentPage() {
  const [contentList, setContentList] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item: ContentItem) =>
          ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf', 'video/mp4'].includes(item.type)
        )
        setContentList(filtered)
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-6 text-black">
      <h1 className="text-2xl font-bold">🗂️ Content Library</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : contentList.length === 0 ? (
        <div className="text-gray-500 text-center py-10">No content available.</div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white shadow rounded-md overflow-auto hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contentList.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.type.startsWith('image') ? (
                        <Image
                          src={item.url}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded object-cover"
                        />
                      ) : item.type === 'application/pdf' ? (
                        <span className="text-xl">📄</span>
                      ) : item.type.startsWith('video') ? (
                        <span className="text-xl">🎥</span>
                      ) : (
                        <span>📁</span>
                      )}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="flex flex-col gap-4 sm:hidden">
            {contentList.map((item) => (
              <Card key={item.id} className="p-4 flex gap-4">
                <div className="flex-shrink-0">
                  {item.type.startsWith('image') ? (
                    <Image
                      src={item.url}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded object-cover"
                    />
                  ) : item.type === 'application/pdf' ? (
                    <span className="text-2xl">📄</span>
                  ) : item.type.startsWith('video') ? (
                    <span className="text-2xl">🎥</span>
                  ) : (
                    <span className="text-2xl">📁</span>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="w-fit text-xs">
                      View
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
