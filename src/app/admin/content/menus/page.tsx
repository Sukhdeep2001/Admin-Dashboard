'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type MenuItem = {
  label: string
  url: string
}

type Menu = {
  id: string
  name: string
  items: MenuItem[]
}

export default function MenuPage() {
  const [menus, setMenus] = useState<Menu[]>([])

  useEffect(() => {
    fetch('/api/content/menus')
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error('Failed to fetch menus:', err))
  }, [])

  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Navigation Menus</h1>

      {menus.length === 0 ? (
        <p className="text-gray-500 text-sm">No menus found.</p>
      ) : (
        menus.map((menu) => (
          <div key={menu.id} className="mb-8">
            <h2 className="text-lg font-semibold mb-3">{menu.name}</h2>
            <div className="rounded border bg-white shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Label</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menu.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell className="text-blue-600 underline">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.url}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
