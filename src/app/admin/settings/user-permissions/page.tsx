'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type StaffUser = {
  id: string
  name: string
  email: string
  role: string
  loginMethod: 'google' | 'apple' | 'email'
}

type PermissionsData = {
  storeOwnerEmail: string
  collaboratorAccess: {
    mode: 'anyone' | 'code_required'
    code: string
  }
  staff: StaffUser[]
}

const availablePermissions = [
  'home',
  'orders',
  'products',
  'discounts',
  'content',
  'integrations',
  'user-permission',
  'collaborator access',
  'settings',
  'api access',
]

export default function UserPermissionsPage() {
  const [data, setData] = useState<PermissionsData | null>(null)
  const [loading, setLoading] = useState(true)

  const [addStaffVisible, setAddStaffVisible] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const [collabMode, setCollabMode] = useState<'anyone' | 'code_required'>('code_required')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/settings/user-permissions')
      const json = await res.json()
      setData(json)
      setCollabMode(json.collaboratorAccess.mode)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handlePermissionToggle = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    )
  }

  const handleSendInvite = () => {
    if (!inviteEmail.trim() || selectedPermissions.length === 0) return
    const newUser: StaffUser = {
      id: `user_${Date.now()}`,
      name: inviteEmail.split('@')[0], // Placeholder for name
      email: inviteEmail,
      role: 'staff',
      loginMethod: 'email',
    }
    setData((prev) =>
      prev ? { ...prev, staff: [...prev.staff, newUser] } : prev
    )
    setInviteEmail('')
    setSelectedPermissions([])
    setAddStaffVisible(false)
  }

  if (loading) return <p className="p-6">Loading permissions...</p>
  if (!data) return <p className="p-6">Failed to load permissions.</p>

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">User Permissions</h1>

      {/* Store Owner */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Store Owner Email</h2>
        <Input value={data.storeOwnerEmail} readOnly disabled />
      </Card>

      {/* Staff Access */}
      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Staff Access</h2>
          <Button onClick={() => setAddStaffVisible(!addStaffVisible)} size="sm">
            {addStaffVisible ? 'Cancel' : 'Add Staff'}
          </Button>
        </div>

        {addStaffVisible && (
          <div className="space-y-4 border p-4 rounded-md bg-muted/20">
            <Input
              placeholder="Enter staff email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              {availablePermissions.map((perm) => (
                <div key={perm} className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedPermissions.includes(perm)}
                    onCheckedChange={() => handlePermissionToggle(perm)}
                  />
                  <Label className="capitalize">{perm}</Label>
                </div>
              ))}
            </div>

            <Button
              disabled={!inviteEmail.trim() || selectedPermissions.length === 0}
              onClick={handleSendInvite}
            >
              Send Invite
            </Button>
          </div>
        )}

        {/* Display staff list */}
        <div className="space-y-2 pt-2">
            {data.staff.map((user) => (
                <Card key={user.id} className="p-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                </Card>
            ))}
        </div>
      </Card>

      {/* Collaborators */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Collaborators</h2>
        <p className="text-sm">Give external designers, developers, and marketers access to your admin.</p>

        <RadioGroup
          value={collabMode}
          onValueChange={(val: 'anyone' | 'code_required') => setCollabMode(val)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="anyone" id="anyone" />
            <Label htmlFor="anyone">Anyone can send a collaborator request</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="code_required" id="code" />
            <Label htmlFor="code">Only people with a collaborator request code can send a request</Label>
          </div>
        </RadioGroup>

        {collabMode === 'code_required' && (
          <div className="pt-2">
            <Label className='pb-3'>Collaborator Request Code</Label>
            <Input value={data.collaboratorAccess.code} readOnly />
            <p className="text-xs text-muted-foreground mt-1">
              Share this code to allow someone to send you a request. You still need to approve it.
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
