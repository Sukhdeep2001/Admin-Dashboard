'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type RequestType = 'chat' | 'email' | 'call'

type SupportRequest = {
  id: number
  type: RequestType
  user: string
  message: string
  time: string
  assignedTo?: string
}

const mockRequests: SupportRequest[] = [
  {
    id: 1,
    type: 'chat',
    user: 'merchant1@example.com',
    message: 'Hi, I need help with my product page.',
    time: '2 min ago',
  },
  {
    id: 2,
    type: 'email',
    user: 'store@example.com',
    message: 'Can I update my billing info?',
    time: '10 min ago',
  },
  {
    id: 3,
    type: 'call',
    user: 'support@brand.com',
    message: 'Call ended. Notes needed.',
    time: '1 hr ago',
    assignedTo: 'Alex (Agent)',
  },
]

export default function SuperAdminSupportPage() {
  const [activeTab, setActiveTab] = useState<RequestType | 'all'>('all')
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null)

  const filtered = activeTab === 'all'
    ? mockRequests
    : mockRequests.filter(r => r.type === activeTab)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {/* Request List */}
      <Card className="md:col-span-1">
        <CardContent className="p-4 space-y-4">
          <Tabs defaultValue="all" className="w-full" onValueChange={(val) => setActiveTab(val as any)}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="call">Call</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {filtered.map(req => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{req.user}</div>
                  <Badge variant="outline" className="capitalize text-xs">
                    {req.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 truncate">{req.message}</p>
                <p className="text-xs text-gray-400">{req.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Request Details */}
      <Card className="md:col-span-2">
        <CardContent className="p-4 space-y-4">
          {!selectedRequest ? (
            <div className="text-gray-500 text-sm italic">Select a request to view details</div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{selectedRequest.user}</h2>
                  <Badge className="mt-1 capitalize">{selectedRequest.type}</Badge>
                </div>
                <div className="text-sm text-gray-400">{selectedRequest.time}</div>
              </div>

              <div className="p-3 bg-gray-100 rounded text-sm text-gray-800">
                {selectedRequest.message}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assign to Agent</label>
                <Input placeholder="e.g. Priya (Agent)" defaultValue={selectedRequest.assignedTo} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Add Internal Note</label>
                <Textarea rows={3} placeholder="e.g. Merchant asked about..." />
              </div>

              <Button className="mt-2">Save</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
