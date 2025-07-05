'use client'

import { useState } from 'react'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  FilePlus2,
  Trash2,
  Edit3,
  Zap,
  UserCircle2
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Activity = {
  id: number
  action: 'added' | 'deleted' | 'updated' | 'created' | 'removed' | 'integrated'
  target: string
  targetType: 'file' | 'api' | 'integration'
  user: string
  timestamp: string
}

const mockLogs: Activity[] = [
  {
    id: 1,
    action: 'added',
    target: 'SEO.json',
    targetType: 'file',
    user: 'admin@example.com',
    timestamp: '2025-07-05 14:23',
  },
  {
    id: 2,
    action: 'deleted',
    target: 'gift-cards.csv',
    targetType: 'file',
    user: 'staff@example.com',
    timestamp: '2025-07-05 13:45',
  },
  {
    id: 3,
    action: 'created',
    target: 'sk_test_f3API123',
    targetType: 'api',
    user: 'admin@example.com',
    timestamp: '2025-07-05 13:00',
  },
  {
    id: 4,
    action: 'integrated',
    target: 'Shopify + Klaviyo',
    targetType: 'integration',
    user: 'dev@example.com',
    timestamp: '2025-07-05 12:22',
  },
  {
    id: 5,
    action: 'updated',
    target: 'ShippingRules.tsx',
    targetType: 'file',
    user: 'admin@example.com',
    timestamp: '2025-07-05 11:05',
  },
]

const getActionIcon = (action: string) => {
  switch (action) {
    case 'added':
    case 'created':
      return <FilePlus2 className="w-4 h-4 text-green-600" />
    case 'deleted':
    case 'removed':
      return <Trash2 className="w-4 h-4 text-red-600" />
    case 'updated':
      return <Edit3 className="w-4 h-4 text-yellow-500" />
    case 'integrated':
      return <Zap className="w-4 h-4 text-indigo-500" />
    default:
      return <UserCircle2 className="w-4 h-4 text-gray-500" />
  }
}

export default function StoreActivityLogPage() {
  const [logs] = useState<Activity[]>(mockLogs)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🧾 Store Activity Log</h1>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <Card className='py-0'>
          <CardContent className="p-4 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map(log => (
                  <TableRow key={log.id}>
                    <TableCell className="whitespace-nowrap">{log.user}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{log.target}</span>
                        <Badge variant="outline" className="w-fit text-xs mt-1 capitalize">
                          {log.targetType}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center gap-2 capitalize whitespace-nowrap">
                      {getActionIcon(log.action)}
                      <span>{log.action}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 whitespace-nowrap">{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {logs.map(log => (
          <div key={log.id} className="border border-gray-200 rounded-md p-3 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">{log.timestamp}</div>
            <div className="font-semibold text-base mb-1">{log.user}</div>
            <div className="text-sm mb-1">
              <span className="font-medium">{log.target}</span>
              <Badge variant="outline" className="ml-2 text-xs capitalize">{log.targetType}</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm capitalize">
              {getActionIcon(log.action)}
              <span>{log.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
