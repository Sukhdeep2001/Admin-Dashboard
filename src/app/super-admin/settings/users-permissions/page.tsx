'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'

export default function SuperAdminPanel() {
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/super-admin-users')
      .then((res) => res.json())
      .then(setUsers)
  }, [])

  const handleTerminate = (userId: string) => {
    // Termination logic here
    alert(`User ${userId} has been terminated.`)
  }

  const handlePlanChange = (userId: string, newPlan: string) => {
    // Upgrade/downgrade logic here
    alert(`Updated user ${userId} to plan ${newPlan}`)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">Super Admin – User Access Overview</h1>

      {users.map((user) => (
        <Card key={user.id} className="p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <div className="text-lg font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
              <div className="text-xs italic">Status: {user.status}</div>
            </div>
            <div className="space-y-2 sm:text-right">
              <Label className="text-sm">Plan</Label>
              <Select onValueChange={(v) => handlePlanChange(user.id, v)} defaultValue={user.plan}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-sm">Enabled Features</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                'orders',
                'products',
                'discounts',
                'analytics',
                'settings',
                'api-access',
                'custom-fields',
                'integrations',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <Switch
                    checked={user.features.includes(feature)}
                    onCheckedChange={() => {} /* Add toggle logic */}
                  />
                  <Label className="capitalize">{feature.replace('-', ' ')}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-3 items-center pt-4">
            <Button variant="destructive" onClick={() => handleTerminate(user.id)}>
              Terminate Access
            </Button>
            <span className="text-sm text-muted-foreground">
              Login method: Google / Apple / Email
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}
