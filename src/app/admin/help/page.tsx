'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = {
  id: number
  user: 'customer' | 'admin'
  text: string
  timestamp: string
  fileName?: string
}

export default function HelpCenterPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    setMessages([
      {
        id: 1,
        user: 'admin',
        text: 'Hi! How can we help you today?',
        timestamp: new Date().toLocaleString(),
      },
    ])
  }, [])

  const sendMessage = async () => {
    if (!input.trim() && !file) return
  
    const userMessage: Message = {
      id: messages.length + 1,
      user: 'customer',
      text: input,
      timestamp: new Date().toLocaleString(),
      fileName: file?.name,
    }
  
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setFile(null)
  
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
  

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6 text-black">
      <h1 className="text-2xl font-bold">Admin.ai Support</h1>

      {/* Chat Box */}
      <Card className="h-[400px] bg-white">
        <CardContent className="p-4 h-full">
          <ScrollArea className="h-full space-y-4 pr-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`max-w-[70%] px-4 py-2 rounded-md text-sm ${
                  msg.user === 'customer'
                    ? 'bg-blue-100 ml-auto text-right'
                    : 'bg-gray-100 text-left'
                }`}
              >
                <p>{msg.text}</p>
                {msg.fileName && (
                  <p className="text-xs text-blue-600 mt-1 underline">
                    📎 {msg.fileName}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  {msg.user === 'customer' ? 'You' : 'Admin'} • {msg.timestamp}
                </p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Message Input */}
      <div className="flex items-center gap-2">
        <div className="relative w-full">
          <label
            htmlFor="fileUpload"
            className="absolute left-3 top-2.5 text-xl text-gray-500 cursor-pointer hover:text-black"
          >
            📎
          </label>
          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={(e) => {
              const selected = e.target.files?.[0]
              if (selected && selected.size <= 50 * 1024 * 1024) {
                setFile(selected)
              } else {
                alert('File must be 50MB or smaller.')
                e.target.value = ''
              }
            }}
          />
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="pl-10"
          />
        </div>
        <Button onClick={sendMessage}>Send</Button>
      </div>

      {/* File Preview */}
      {file && (
        <p className="text-sm text-gray-600">
          Attached: <span className="text-blue-600 underline">{file.name}</span>
        </p>
      )}
    </div>
  )
}
