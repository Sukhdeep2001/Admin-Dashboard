'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Plan } from '@/lib/plan' 

type PlanModalProps =
  | {
      mode: 'add'
      onSave: (plan: Plan) => void
    }
  | {
      mode: 'edit'
      initialData: Plan
      onSave: (plan: Plan) => void
    }

export function PlanModal(props: PlanModalProps) {
  const { mode, onSave } = props
  const initialData = mode === 'edit' ? props.initialData : undefined
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<Partial<Plan>>({
    title: '',
    description: '',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: {
      maxUsers: '',
      storageLimit: '',
      enableSSO: false,
      prioritySupport: false,
    },
    limits: {
      apiCallsPerMonth: '',
    },
    trial: {
      enabled: false,
      durationDays: 0,
    },
    visibility: true,
    archived: false,
  })

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm(initialData)
    } else if (!open && mode === 'add') {
      // Reset form when closing in add mode
      setForm({
        title: '',
        description: '',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: {
          maxUsers: '',
          storageLimit: '',
          enableSSO: false,
          prioritySupport: false,
        },
        limits: {
          apiCallsPerMonth: '',
        },
        trial: {
          enabled: false,
          durationDays: 0,
        },
        visibility: true,
        archived: false,
      })
    }
  }, [open, mode, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFeatureChange = (field: keyof Plan['features'], value: any) => {
    setForm(prev => ({
      ...prev,
      features: { ...prev.features, [field]: value },
    }))
  }

  const handleLimitChange = (field: keyof Plan['limits'], value: any) => {
    setForm(prev => ({
      ...prev,
      limits: { ...prev.limits, [field]: value },
    }))
  }

  const handleTrialChange = (field: keyof Plan['trial'], value: any) => {
    setForm(prev => ({
      ...prev,
      trial: { ...prev.trial, [field]: value },
    }))
  }

  const submitForm = () => {
    const finalPlan: Plan = {
      ...form,
      id: form.id || crypto.randomUUID(),
      createdAt: form.createdAt || new Date().toISOString(),
      monthlyPrice: Number(form.monthlyPrice),
      yearlyPrice: Number(form.yearlyPrice),
      features: {
        ...form.features,
        maxUsers:
          form.features?.maxUsers === 'Unlimited'
            ? 'Unlimited'
            : Number(form.features?.maxUsers || 0),
      },
      limits: {
        ...form.limits,
        apiCallsPerMonth:
          form.limits?.apiCallsPerMonth === 'Unlimited'
            ? 'Unlimited'
            : Number(form.limits?.apiCallsPerMonth || 0),
      },
      trial: {
        enabled: !!form.trial?.enabled,
        durationDays: Number(form.trial?.durationDays || 0),
      },
      visibility: !!form.visibility,
      archived: !!form.archived,
    }

    onSave(finalPlan)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'add' ? (
          <Button variant="default">+ Add Plan</Button>
        ) : (
          <Button variant="outline">Edit</Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Plan' : 'Edit Plan'}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title || ''} onChange={handleChange} />
          </div>
          <div>
            <Label>Description</Label>
            <Input name="description" value={form.description || ''} onChange={handleChange} />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Monthly Price</Label>
              <Input
                name="monthlyPrice"
                type="number"
                value={form.monthlyPrice || ''}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <Label>Yearly Price</Label>
              <Input
                name="yearlyPrice"
                type="number"
                value={form.yearlyPrice || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="border p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-2">Features</h4>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Max Users</Label>
                <Input
                  value={form.features?.maxUsers || ''}
                  onChange={e => handleFeatureChange('maxUsers', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label>Storage Limit</Label>
                <Input
                  value={form.features?.storageLimit || ''}
                  onChange={e => handleFeatureChange('storageLimit', e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch
                checked={!!form.features?.enableSSO}
                onCheckedChange={val => handleFeatureChange('enableSSO', val)}
              />
              <Label>Enable SSO</Label>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Switch
                checked={!!form.features?.prioritySupport}
                onCheckedChange={val => handleFeatureChange('prioritySupport', val)}
              />
              <Label>Priority Support</Label>
            </div>
          </div>

          <div className="border p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-2">Limits</h4>
            <Label>API Calls / Month</Label>
            <Input
              value={form.limits?.apiCallsPerMonth || ''}
              onChange={e => handleLimitChange('apiCallsPerMonth', e.target.value)}
            />
          </div>

          <div className="border p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-2">Trial</h4>
            <div className="flex items-center gap-2 mb-2">
              <Switch
                checked={!!form.trial?.enabled}
                onCheckedChange={val => handleTrialChange('enabled', val)}
              />
              <Label>Enable Trial</Label>
            </div>
            <Label>Trial Duration (days)</Label>
            <Input
              type="number"
              value={form.trial?.durationDays || 0}
              onChange={e => handleTrialChange('durationDays', Number(e.target.value))}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Switch
                checked={!!form.visibility}
                onCheckedChange={val => setForm(prev => ({ ...prev, visibility: val }))}
              />
              <Label>Visible</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={!!form.archived}
                onCheckedChange={val => setForm(prev => ({ ...prev, archived: val }))}
              />
              <Label>Archived</Label>
            </div>
          </div>
        </div>

        <div className="text-right">
          <Button onClick={submitForm}>{mode === 'add' ? 'Create Plan' : 'Update Plan'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
