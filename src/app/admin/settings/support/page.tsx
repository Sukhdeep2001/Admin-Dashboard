'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

// Message type
type Message = {
  id: number
  user: 'customer' | 'admin'
  text: string
  timestamp: string
}

export default function HelpCenterPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [selectedSupport, setSelectedSupport] = useState<'chat' | 'email' | 'call' | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [attachment, setAttachment] = useState<File | null>(null)

  const memberName = 'Alex'

  const addSupportGreeting = () => {
    const id = Date.now()
    const timestamp = new Date().toLocaleString()

    setMessages([
      {
        id,
        user: 'admin',
        text: '🕒 Support Team in line, please wait for 5 minutes...',
        timestamp,
      },
    ])

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: id + 1,
          user: 'admin',
          text: `Hi ${memberName}, how can we help you?`,
          timestamp: new Date().toLocaleString(),
        },
      ])
    }, 5000)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      user: 'customer',
      text: input,
      timestamp: new Date().toLocaleString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('/api/help-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      const data = await res.json()

      const botReply: Message = {
        id: Date.now(),
        user: 'admin',
        text: data.response || 'Sorry, no response.',
        timestamp: new Date().toLocaleString(),
      }

      setMessages((prev) => [...prev, botReply])
    } catch (err) {
      console.error('AI Error', err)
    }
  }

  const handleFormSubmit = () => {
    setShowForm(false)
    setShowPopup(true)
    addSupportGreeting()
  }

  return (
    <div className="max-w-3xl lg:mx-auto lg:py-10 lg:px-4 space-y-6 relative">
      <h1 className="text-2xl font-bold">Support Center</h1>

      {/* Top Support Options */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="text-gray-600">How would you like to contact support?</p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => { setSelectedSupport('chat'); setShowForm(true); }}>💬 Live Chat</Button>
            <Button onClick={() => { setSelectedSupport('email'); setShowPopup(false); }} variant="outline">📩 Email Support</Button>
            <Button onClick={() => setSelectedSupport('call')} variant="outline">📞 Call Support</Button>
          </div>

          {selectedSupport === 'email' && (
            <p className="text-sm text-blue-600">Email us at: <strong>support@admin.ai</strong></p>
          )}
          {selectedSupport === 'call' && (
            <p className="text-sm text-blue-600">Call us at: <strong>+1 (800) 555-ADMIN</strong></p>
          )}
        </CardContent>
      </Card>

      {/* Ticket Form Popup */}
      {showForm && (
        <Card className="border p-4 space-y-4">
          <h2 className="text-lg font-semibold">Raise a Ticket</h2>
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief subject" />
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue..." rows={4} />
            <Label>Attach Screenshot or Video (optional)</Label>
            <Input type="file" onChange={(e) => setAttachment(e.target.files?.[0] || null)} />
            <Button onClick={handleFormSubmit}>Submit Ticket</Button>
          </div>
        </Card>
      )}

      {/* Floating Chat Icon */}
      <Button
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 p-0 shadow-lg text-white bg-blue-600 hover:bg-blue-700"
        onClick={() => { setSelectedSupport('chat'); setShowPopup(true); setMessages([]); addSupportGreeting(); }}
      >
        💬
      </Button>

      {/* Chat Popup */}
      {showPopup && (
        <div className="fixed bottom-20 right-6 w-80 max-w-full bg-white border rounded-lg shadow-lg z-50 flex flex-col h-[520px]">
          <div className="flex items-center justify-between px-4 py-2 border-b bg-blue-100">
            <h2 className="font-semibold text-sm text-blue-800">Admin.ai Support</h2>
            <button onClick={() => setShowPopup(false)} className="text-gray-600 hover:text-black">
              <X className="w-4 h-4" />
            </button>
          </div>

          <ScrollArea className="flex-1 px-3 py-2 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`text-sm px-3 py-2 rounded-xl max-w-[75%] ${
                  msg.user === 'customer' ? 'ml-auto bg-blue-100 text-right' : 'bg-gray-100 text-left'
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {msg.user === 'customer' ? 'You' : 'Admin'} • {msg.timestamp}
                </p>
              </div>
            ))}
          </ScrollArea>

          <div className="border-t px-3 py-2 flex gap-2 items-center">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="text-sm"
            />
            <Button size="sm" onClick={sendMessage}>Send</Button>
          </div>
        </div>
      )}
    </div>
  )
}
