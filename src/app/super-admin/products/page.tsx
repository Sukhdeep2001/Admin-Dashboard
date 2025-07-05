'use client';

import { useState } from 'react';
import pricingPlans from '@/lib/pricingPlans.json';
import type { PricingPlan, PricingFeature } from '@/lib/types/pricing';

import {
  Card, CardHeader, CardTitle, CardContent, CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const SuperAdminProducts = () => {
  const [products, setProducts] = useState<PricingPlan[]>(pricingPlans);
  const [editingProduct, setEditingProduct] = useState<PricingPlan | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleEdit = (product: PricingPlan) => setEditingProduct(product);
  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.error('Plan deleted', { description: 'The pricing plan has been removed.' });
  };

  const handleSave = (updatedProduct: PricingPlan) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
      toast.success('Plan updated', { description: 'Your changes have been saved.' });
    } else {
      setProducts([...products, updatedProduct]);
      toast.success('Plan created', { description: 'New pricing plan has been added.' });
    }
    setEditingProduct(null);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center my-8 flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold">Subscription Plan Manager</h1>
          <p className="text-muted-foreground">Manage what plans are offered to your customers</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create New Plan</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((plan) => (
          <Card key={plan.id} className="relative border rounded-lg shadow-sm hover:shadow-md transition-all">
            <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 p-4 pb-0">
              <div>
                <CardTitle className="text-xl font-semibold">{plan.title}</CardTitle>
                <p className="text-sm text-muted-foreground">ID: {plan.id}</p>
              </div>
              {plan.isPopular && (
                <Badge className="bg-yellow-400 text-yellow-900 self-start">POPULAR</Badge>
              )}
            </CardHeader>

            <CardContent className="p-4 pt-2 space-y-2">
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Monthly</p>
                  <p className="font-semibold">{plan.monthlyPrice || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Yearly</p>
                  <p className="font-semibold">{plan.yearlyPrice || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Subscribers</p>
                  <p className="font-semibold">{Number(plan.subscriberCount) || 0}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground">Features</p>
                <p className="text-sm text-foreground mt-2">
                  {plan.features.map(f => f.text).join(', ')}
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2 p-4 pt-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(plan)}>Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(plan.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ProductFormModal
        product={editingProduct || undefined}
        isOpen={!!editingProduct || isCreateModalOpen}
        onSave={handleSave}
        onClose={() => {
          setEditingProduct(null);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
};

interface ProductFormModalProps {
  product?: PricingPlan;
  isOpen: boolean;
  onSave: (product: PricingPlan) => void;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ product, isOpen, onSave, onClose }) => {
  const [formData, setFormData] = useState<Omit<PricingPlan, 'features'> & { features: PricingFeature[] }>({
    id: product?.id || '',
    title: product?.title || '',
    monthlyPrice: product?.monthlyPrice || '',
    yearlyPrice: product?.yearlyPrice || '',
    subscriberCount: product?.subscriberCount || '0',
    description: product?.description || '',
    buttonText: product?.buttonText || 'Buy Now',
    isPopular: product?.isPopular || false,
    features: product?.features || []
  });

  const [newFeature, setNewFeature] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { icon: '✅', text: newFeature.trim() }]
    }));
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id.trim() || !formData.title.trim()) {
      toast.error('Please fill all required fields');
      return;
    }
    onSave(formData as PricingPlan);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 bg-background rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="id" className="pb-3">Plan ID*</Label>
              <Input id="id" name="id" value={formData.id} onChange={handleChange} required disabled={!!product?.id} />
            </div>
            <div>
              <Label htmlFor="title" className="pb-3">Title*</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="monthlyPrice" className="pb-3">Monthly Price</Label>
              <Input id="monthlyPrice" name="monthlyPrice" value={formData.monthlyPrice} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="yearlyPrice" className="pb-3">Yearly Price</Label>
              <Input id="yearlyPrice" name="yearlyPrice" value={formData.yearlyPrice} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="subscriberCount" className="pb-3">Subscribers</Label>
              <Input id="subscriberCount" name="subscriberCount" value={formData.subscriberCount} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="description" className="pb-3">Description*</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={2} required />
          </div>
          <div>
            <Label htmlFor="buttonText" className="pb-3">Button Text</Label>
            <Input id="buttonText" name="buttonText" value={formData.buttonText} onChange={handleChange} />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isPopular" name="isPopular" checked={formData.isPopular || false} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: Boolean(checked) }))} />
            <Label htmlFor="isPopular" className="pb-3">Mark as Popular Plan</Label>
          </div>
          <div>
            <Label className="pb-3">Features</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto p-2 border rounded">
              {formData.features.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No features added yet</p>
              ) : (
                formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-2 hover:bg-accent rounded">
                    <span className="flex-grow ml-2">{feature.text}</span>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => handleRemoveFeature(index)}>✕</Button>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 mt-2">
              <Input value={newFeature} onChange={(e) => setNewFeature(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())} placeholder="New feature" className="flex-grow" />
              <Button type="button" onClick={handleAddFeature} disabled={!newFeature.trim()}>Add</Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? 'Update Plan' : 'Create Plan'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SuperAdminProducts;
