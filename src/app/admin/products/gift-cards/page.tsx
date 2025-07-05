'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'

type GiftCard = {
  id: string
  title: string
  price: number
  image: string
  published: boolean
}

export default function GiftCardListPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])

  useEffect(() => {
    fetch('/api/gift')
      .then((res) => res.json())
      .then((data) => setGiftCards(data))
  }, [])

  return (
    <div className="text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gift Cards</h1>
        <Link href="/admin/products/gift-cards/add">
          <Button>+ Add Gift Card</Button>
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="rounded-md border bg-white shadow-sm overflow-x-auto hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {giftCards.map((gift) => (
              <TableRow key={gift.id}>
                <TableCell>
                  <Image
                    src={gift.image || '/product.png'}
                    alt={gift.title}
                    width={50}
                    height={50}
                    className="rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{gift.title}</TableCell>
                <TableCell>₹{gift.price}</TableCell>
                <TableCell>
                  {gift.published ? 'Published' : 'Hidden'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        {giftCards.map((gift) => (
          <Card key={gift.id} className="p-4 flex flex-row items-center gap-4">
            <Image
              src={gift.image || '/product.png'}
              alt={gift.title}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{gift.title}</h3>
              <p className="text-sm text-muted-foreground">₹{gift.price}</p>
              <p className="text-sm mt-1 text-gray-600">
                {gift.published ? 'Published' : 'Hidden'}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
