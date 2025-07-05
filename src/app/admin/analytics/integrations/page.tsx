'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Integration = {
  category: string
  tools: {
    name: string
    connected: boolean
    description?: string
    placeholder?: string
    apiKey?: string
  }[]
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([])

  useEffect(() => {
    fetch('/api/analytics/integrations')
      .then((res) => res.json())
      .then(setIntegrations)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">🧩 Integrations</h1>
      <p className="text-gray-600">Connect your store with analytics, marketing, payment, and other tools.</p>

      {integrations.map(({ category, tools }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold mt-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <Card key={tool.name} className="shadow rounded-2xl border p-4">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-lg">{tool.name}</span>
                    <Badge variant={tool.connected ? 'default' : 'outline'}>
                      {tool.connected ? 'Connected' : 'Not Connected'}
                    </Badge>
                  </div>

                  {tool.description && (
                    <p className="text-sm text-gray-500">{tool.description}</p>
                  )}

                  <div className="space-y-2">
                  {tool.name && (
                    <>
                        <label className="text-sm font-medium block">
                        {tool.name} API Key
                        </label>
                        <Input
                        placeholder={`Enter ${tool.name} API Key`}
                        defaultValue={tool.apiKey || ''}
                        />
                    </>
                    )}
                    <Button variant="default" className="mt-2 w-full">
                      {tool.connected ? 'Update' : 'Connect'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
