"use client"

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface IntegrationTool {
  name: string
  connected: boolean
  description?: string
  placeholder?: string
  apiKey?: string
}

interface AdminIntegration {
  category: string
  tools: IntegrationTool[]
}

export default function SuperAdminIntegrationsPage() {
  const [adminIntegrations, setAdminIntegrations] = useState<AdminIntegration[]>([])
  const [newToolName, setNewToolName] = useState('')
  const [newCategory, setNewCategory] = useState('')

  useEffect(() => {
    fetch('/api/analytics/integrations')
      .then(res => res.json())
      .then(setAdminIntegrations)
  }, [])

  const handleAddIntegration = () => {
    if (!newToolName || !newCategory) return
    const updated = [...adminIntegrations]
    const categoryIndex = updated.findIndex(cat => cat.category === newCategory)
    const newTool: IntegrationTool = {
      name: newToolName,
      connected: false,
      description: '',
      apiKey: ''
    }
    if (categoryIndex !== -1) {
      updated[categoryIndex].tools.push(newTool)
    } else {
      updated.push({ category: newCategory, tools: [newTool] })
    }
    setAdminIntegrations(updated)
    setNewToolName('')
    setNewCategory('')
  }

  const handleDeleteTool = (category: string, name: string) => {
    const updated = adminIntegrations.map(cat => {
      if (cat.category === category) {
        return { ...cat, tools: cat.tools.filter(tool => tool.name !== name) }
      }
      return cat
    })
    setAdminIntegrations(updated)
  }

  return (
    <div className="space-y-8 px-2 md:px-4">
      <h1 className="text-2xl mb-2 font-bold">🧩 Offered Integrations Overview</h1>
      <p className="text-muted-foreground mb-2">
        This is a list of all integrations offered to admin users. You can view, add, or remove them.
      </p>

      <div className="flex flex-wrap gap-2 items-center">
        <Input
          placeholder="Integration Name"
          value={newToolName}
          onChange={(e) => setNewToolName(e.target.value)}
          className="w-full sm:w-48"
        />
        <Input
          placeholder="Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-full sm:w-48"
        />
        <Button onClick={handleAddIntegration}>Add Integration</Button>
      </div>

      {adminIntegrations.map(({ category, tools }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold mt-6">{category}</h2>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm text-left border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 whitespace-nowrap text-left">Tool</th>
                  <th className="px-4 py-2 whitespace-nowrap text-left">Status</th>
                  <th className="px-4 py-2 whitespace-nowrap text-left">Description</th>
                  <th className="px-4 py-2 whitespace-nowrap text-left">API Key</th>
                  <th className="px-4 py-2 whitespace-nowrap text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.name} className="border-b last:border-none">
                    <td className="px-4 py-2 whitespace-nowrap text-base font-medium">{tool.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Badge variant={tool.connected ? 'default' : 'outline'}>
                        {tool.connected ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 max-w-xs break-words text-gray-600 dark:text-gray-400">
                      {tool.description || '-'}
                    </td>
                    <td className="px-4 py-2 max-w-sm break-words text-xs">
                      {tool.apiKey ? (
                        <span className="block bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                          {tool.apiKey}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteTool(category, tool.name)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {tools.map((tool) => (
              <div key={tool.name} className="border rounded-xl p-4 shadow-sm bg-white dark:bg-gray-900">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold">{tool.name}</h3>
                  <Badge variant={tool.connected ? 'default' : 'outline'}>
                    {tool.connected ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {tool.description || 'No description provided'}
                </p>
                <div className="text-xs break-words mb-2">
                  <span className="font-medium">API Key:</span>{' '}
                  {tool.apiKey || '-'}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteTool(category, tool.name)}
                  className="w-full"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
