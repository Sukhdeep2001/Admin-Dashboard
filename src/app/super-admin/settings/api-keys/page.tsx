'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import apiKeysData from '@/lib/mockApiKeys.json';

interface ApiKey {
  id: string;
  adminName: string;
  email: string;
  maskedKey: string;
  permissions: string[];
  status: 'active' | 'revoked';
  createdAt: string;
}

export default function SuperAdminApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    permissions: '',
  });
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKeys(apiKeysData as ApiKey[]);
  }, []);

  const handleCreateKey = () => {
    const newKey: ApiKey = {
      id: `${Date.now()}`,
      adminName: formData.adminName,
      email: formData.email,
      maskedKey: `****${Math.random().toString(36).substring(2, 6)}`,
      permissions: formData.permissions.split(',').map(p => p.trim()),
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setApiKeys(prev => [...prev, newKey]);
    setGeneratedKey(`sk_live_${Math.random().toString(36).substring(2, 16)}`);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">API Key Management</h1>
          <p className="text-muted-foreground text-sm">Manage and issue API keys for admin access to platform resources.</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>Create New API Key</Button>
      </div>

      {/* Responsive: Cards on mobile, table on desktop */}
      <div className="block lg:hidden space-y-4">
        {apiKeys.map((key) => (
          <div key={key.id} className="border p-4 rounded-md shadow-sm space-y-2">
            <div className="font-bold">{key.adminName}</div>
            <div className="text-sm text-muted-foreground">{key.email}</div>
            <div className="text-sm">Key: {key.maskedKey}</div>
            <div className="flex flex-wrap gap-1">
              {key.permissions.map((perm, idx) => (
                <Badge key={idx} className="capitalize">{perm}</Badge>
              ))}
            </div>
            <div className="text-sm">
              Status:{' '}
              <span className={key.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                {key.status}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">Created: {key.createdAt}</div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="outline">View</Button>
              <Button size="sm" variant="secondary">Rotate</Button>
              <Button size="sm" variant="ghost" className="text-red-600">Revoke</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block w-full overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg">
          <thead>
            <tr className="bg-muted text-left">
              <th className="px-4 py-3">Admin Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">API Key</th>
              <th className="px-4 py-3">Permissions</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <tr key={key.id} className="border-t">
                <td className="px-4 py-3 font-medium">{key.adminName}</td>
                <td className="px-4 py-3">{key.email}</td>
                <td className="px-4 py-3">{key.maskedKey}</td>
                <td className="px-4 py-3 space-x-1">
                  {key.permissions.map((perm, idx) => (
                    <Badge key={idx} className="capitalize">{perm}</Badge>
                  ))}
                </td>
                <td className="px-4 py-3">
                  <span className={key.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                    {key.status}
                  </span>
                </td>
                <td className="px-4 py-3">{key.createdAt}</td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="secondary">Rotate</Button>
                  <Button size="sm" variant="ghost" className="text-red-600">Revoke</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Centered Popup for API Key Creation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:max-w-md p-6 space-y-4">
          <DialogHeader>
            <DialogTitle>Create API Key</DialogTitle>
          </DialogHeader>

          {generatedKey ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Copy your API key now. You won’t be able to see it again.</p>
              <div className="bg-muted p-2 rounded text-sm font-mono select-all">{generatedKey}</div>
              <Button onClick={() => setIsDialogOpen(false)}>Done</Button>
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
                <Label htmlFor="adminName" className="pb-3 block">Admin Name</Label>
                <Input id="adminName" value={formData.adminName} onChange={(e) => setFormData({ ...formData, adminName: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="email" className="pb-3 block">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div>
                <Label htmlFor="permissions" className="pb-3 block">Permissions (comma separated)</Label>
                <Input id="permissions" value={formData.permissions} onChange={(e) => setFormData({ ...formData, permissions: e.target.value })} required />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Generate</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
