'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

type AdminApiKey = {
  id: string;
  label: string;
  maskedKey: string;
  type: 'public' | 'private';
  permissions: { resource: string; access: string }[];
  status: 'active' | 'revoked';
  createdAt: string;
};

const defaultResources = ['products', 'orders', 'collections', 'customers', 'discounts', 'metafields'];

export default function AdminApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<AdminApiKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    type: 'public',
    permissions: {} as Record<string, { read: boolean; write: boolean }>
  });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    // Initial mock data
    setApiKeys([
      {
        id: '1',
        label: 'Frontend Key',
        maskedKey: '****abcd',
        type: 'public',
        permissions: [],
        status: 'active',
        createdAt: '2025-07-01'
      },
      {
        id: '2',
        label: 'Automation Private Key',
        maskedKey: '****e9d2',
        type: 'private',
        permissions: [],
        status: 'active',
        createdAt: '2025-06-30'
      }
    ]);
  }, []);

  const handleCheckbox = (resource: string, action: 'read' | 'write') => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [resource]: {
          ...prev.permissions[resource],
          [action]: !prev.permissions[resource]?.[action]
        }
      }
    }));
  };

  const handleCreateKey = () => {
    const permissions = Object.entries(formData.permissions)
      .filter(([_, access]) => access.read || access.write)
      .map(([resource, access]) => ({
        resource,
        access: `${access.read ? 'read' : ''}${access.write ? ' & write' : ''}`
      }));

    const newKey: AdminApiKey = {
      id: `${Date.now()}`,
      label: formData.label,
      maskedKey: '****' + Math.random().toString(36).substring(2, 6),
      type: formData.type as 'public' | 'private',
      permissions,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setApiKeys(prev => [...prev, newKey]);
    setGeneratedKey('ak_' + Math.random().toString(36).substring(2, 16));
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-sm text-muted-foreground">Generate and manage API keys for your admin account.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Create New API Key</Button>
      </div>

      <div className="space-y-4">
        {apiKeys.map(key => (
          <div key={key.id} className="border p-4 rounded-md shadow-sm flex flex-col sm:flex-row justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-semibold">{key.label}</h3>
              <div className="text-xs text-muted-foreground">{key.maskedKey} • Created on {key.createdAt}</div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={key.type === 'private' ? 'bg-red-600 text-white' : 'bg-blue-500 text-white'}>
                {key.type === 'private' ? '🔐 Private' : '🔓 Public'}
              </Badge>
              <span className={`text-sm ${key.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>{key.status}</span>
              <Button size="sm" variant="ghost" onClick={() =>
                setApiKeys(prev =>
                  prev.map(k => k.id === key.id ? { ...k, status: 'revoked' } : k)
                )
              }>Revoke</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4">
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
          </DialogHeader>

          {generatedKey ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">Your new key (only shown once):</p>
              <div className="p-2 bg-muted font-mono rounded text-sm select-all">{generatedKey}</div>
              <Button onClick={() => {
                setIsDialogOpen(false);
                setGeneratedKey(null);
                setFormData({ label: '', type: 'public', permissions: {} });
              }}>Done</Button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateKey();
              }}
              className="space-y-4"
            >
              <div>
                <Label className="pb-3 block">Label</Label>
                <Input
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label className="pb-3 block">Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as 'public' | 'private' })}
                  className="flex gap-4"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="pb-3 block">Permissions</Label>
                <div className="grid grid-cols-2 gap-2">
                  {defaultResources.map((resource) => (
                    <div key={resource} className="text-sm space-y-1 border p-2 rounded">
                      <div className="font-medium capitalize">{resource}</div>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          checked={formData.permissions[resource]?.read || false}
                          onCheckedChange={() => handleCheckbox(resource, 'read')}
                          id={`${resource}-read`}
                        />
                        <Label htmlFor={`${resource}-read`} className="text-xs">Read</Label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          checked={formData.permissions[resource]?.write || false}
                          onCheckedChange={() => handleCheckbox(resource, 'write')}
                          id={`${resource}-write`}
                        />
                        <Label htmlFor={`${resource}-write`} className="text-xs">Write</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Generate</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
