'use client'

import { useEffect, useState } from 'react'
import { MetafieldDefinition } from '@/lib/type'
import MetafieldTable from './MetafieldTable'
import MetafieldForm from './MetafieldForm'
import { Button } from '@/components/ui/button'

export default function SuperAdminMetafieldsPage() {
  const [metafields, setMetafields] = useState<MetafieldDefinition[]>([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('/api/metafields')
      .then(res => res.json())
      .then(setMetafields)
      .catch(err => console.error('Error loading metafields:', err))
  }, [])

  return (
    <div className="sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-3xl font-bold">Metafield Definitions</h1>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto"
        >
          {showForm ? 'Close Form' : 'Add New'}
        </Button>
      </div>

      {/* Form Toggle */}
      {showForm && (
        <MetafieldForm
          onSave={(newMeta) => {
            setMetafields(prev => [...prev, newMeta])
            setShowForm(false)
          }}
        />
      )}

      {/* Metafields Table */}
      <div className="overflow-x-auto">
        <MetafieldTable data={metafields} />
      </div>
    </div>
  )
}
