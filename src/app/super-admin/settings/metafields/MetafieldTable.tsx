'use client'

import { useEffect, useState } from 'react'

type Metafield = {
  id: string
  name: string
  namespace: string
  key: string
  resourceTypes: string[]
  type: string
  description: string
  apiAccess: string
  customerAccess: boolean
  visible: boolean
  createdAt: string
}

interface MetafieldsPageProps {
  data?: Metafield[]
}

export default function MetafieldsPage({ data: propData }: MetafieldsPageProps) {
  const [data, setData] = useState<Metafield[]>(propData || [])

  useEffect(() => {
    if (!propData) {
      fetch('/api/metafields')
        .then(res => res.json())
        .then(setData)
        .catch(err => console.error('Failed to fetch metafields:', err))
    }
  }, [propData])

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border rounded-md">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr className="border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Key</th>
              <th className="px-4 py-2">Resource Types</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">API Access</th>
              <th className="px-4 py-2">Customer Access</th>
              <th className="px-4 py-2">Visible</th>
              <th className="px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map(meta => (
              <tr key={meta.id} className="border-t">
                <td className="px-4 py-2">{meta.name}</td>
                <td className="px-4 py-2">{meta.namespace}.{meta.key}</td>
                <td className="px-4 py-2">{meta.resourceTypes.join(', ')}</td>
                <td className="px-4 py-2">{meta.type}</td>
                <td className="px-4 py-2">{meta.apiAccess}</td>
                <td className="px-4 py-2">{meta.customerAccess ? '✅' : '❌'}</td>
                <td className="px-4 py-2">{meta.visible ? '✅' : '❌'}</td>
                <td className="px-4 py-2">{new Date(meta.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.map(meta => (
          <div key={meta.id} className="border rounded-md p-4 shadow-sm">
            <div className="font-semibold text-lg">{meta.name}</div>
            <div className="text-sm text-muted-foreground mb-2">{meta.namespace}.{meta.key}</div>
            <div className="text-sm"><strong>Resources:</strong> {meta.resourceTypes.join(', ')}</div>
            <div className="text-sm"><strong>Type:</strong> {meta.type}</div>
            <div className="text-sm"><strong>API Access:</strong> {meta.apiAccess}</div>
            <div className="text-sm"><strong>Customer Access:</strong> {meta.customerAccess ? '✅' : '❌'}</div>
            <div className="text-sm"><strong>Visible:</strong> {meta.visible ? '✅' : '❌'}</div>
            <div className="text-sm"><strong>Created:</strong> {new Date(meta.createdAt).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
