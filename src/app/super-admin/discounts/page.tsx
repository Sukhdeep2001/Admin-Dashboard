'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Trash2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

type Entry = {
  id: number
  name: string
  description?: string
  status: boolean
  createdAt: string
  createdBy: string
}

type RuleEntry = Entry & {
  requiredFields: string[]
}

const FIELD_OPTIONS = [
  'Customer eligibility',
  'Minimum purchase',
  'Discount amount',
  'Applicable products',
  'Start date',
  'End date',
  'Usage limit',
]

export default function ManageDiscountSettingsPage() {
  const [discountTypes, setDiscountTypes] = useState<Entry[]>([
    {
      id: 1,
      name: 'Manual',
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
    },
    {
      id: 2,
      name: 'Automatic',
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
    },
  ])

  const [discountRules, setDiscountRules] = useState<RuleEntry[]>([
    {
      id: 3,
      name: 'Amount off order',
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
      requiredFields: ['Discount amount', 'Minimum purchase'],
    },
    {
      id: 4,
      name: 'Amount off products',
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
      requiredFields: ['Discount amount', 'Applicable products'],
    },
    {
      id: 5,
      name: 'Buy X Get Y',
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
      requiredFields: ['Applicable products', 'Discount amount', 'Customer eligibility'],
    },
  ])  

  const [newType, setNewType] = useState('')
  const [newRule, setNewRule] = useState('')
  const [selectedFields, setSelectedFields] = useState<string[]>([])

  const handleAddType = () => {
    if (!newType.trim()) return
    const newEntry: Entry = {
      id: Date.now(),
      name: newType.trim(),
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
    }
    setDiscountTypes([...discountTypes, newEntry])
    setNewType('')
  }

  const handleAddRule = () => {
    if (!newRule.trim()) return
    const newEntry: RuleEntry = {
      id: Date.now(),
      name: newRule.trim(),
      status: true,
      createdAt: new Date().toISOString(),
      createdBy: 'SuperAdmin',
      requiredFields: selectedFields,
    }
    setDiscountRules([...discountRules, newEntry])
    setNewRule('')
    setSelectedFields([])
  }

  const toggleTypeStatus = (id: number) => {
    const updated = discountTypes.map(type =>
      type.id === id ? { ...type, status: !type.status } : type
    )
    setDiscountTypes(updated)
  }

  const toggleRuleStatus = (id: number) => {
    const updated = discountRules.map(rule =>
      rule.id === id ? { ...rule, status: !rule.status } : rule
    )
    setDiscountRules(updated)
  }

  const deleteType = (id: number) => {
    setDiscountTypes(discountTypes.filter(type => type.id !== id))
  }

  const deleteRule = (id: number) => {
    setDiscountRules(discountRules.filter(rule => rule.id !== id))
  }

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev =>
      prev.includes(field)
        ? prev.filter(f => f !== field)
        : [...prev, field]
    )
  }

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold mb-4">Manage Discount Settings</h1>

      {/* --- TYPES --- */}
      <Card>
        <CardHeader>
          <CardTitle>Discount Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className='pb-3'>New Type</Label>
              <Input
                placeholder="e.g., Manual"
                value={newType}
                onChange={e => setNewType(e.target.value)}
              />
            </div>
            <Button onClick={handleAddType}>Add</Button>
          </div>

          <div className="space-y-2">
            {discountTypes.length > 0 &&
              discountTypes.map(type => (
                <div key={type.id} className="flex justify-between items-center border rounded-md px-3 py-2">
                  <div>
                    <p className="font-medium">{type.name}</p>
                    <p className="text-sm text-muted-foreground">Created by: {type.createdBy}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch checked={type.status} onCheckedChange={() => toggleTypeStatus(type.id)} />
                    <Button variant="ghost" size="icon" onClick={() => deleteType(type.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* --- RULES --- */}
      <Card>
        <CardHeader>
          <CardTitle>Discount Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label className='pb-3'>New Rule</Label>
              <Input
                placeholder="e.g., Buy X Get Y"
                value={newRule}
                onChange={e => setNewRule(e.target.value)}
              />
            </div>
            <Button onClick={handleAddRule}>Add</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-2">
            {FIELD_OPTIONS.map(field => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox
                  id={field}
                  checked={selectedFields.includes(field)}
                  onCheckedChange={() => handleFieldToggle(field)}
                />
                <Label htmlFor={field}>{field}</Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {discountRules.length > 0 &&
              discountRules.map(rule => (
                <div key={rule.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Fields: {rule.requiredFields.join(', ') || 'None'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={rule.status}
                        onCheckedChange={() => toggleRuleStatus(rule.id)}
                      />
                      <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
