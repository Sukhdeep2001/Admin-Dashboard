'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Combobox } from '@/components/ui/combobox'
import { Label } from '@/components/ui/label'
import SectionWrapper from '@/components/SectionWrapper'
import CodeOrTitleInput from '@/components/CodeOrTitleInput'
import { toast } from 'sonner'

const productOptions = ['Shirt', 'Jeans', 'Sneakers', 'Backpack']
const collectionOptions = ['Summer Sale', 'Winter Wear', 'Accessories']
const comboOptions = ['product', 'order', 'shipping']
const statusOptions = ['draft', 'active', 'scheduled']

export default function BuyXGetYPage() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState<'automatic' | 'manual'>('automatic')
  const [discountType, setDiscountType] = useState('percentage')
  const [discountValue, setDiscountValue] = useState('')
  const [buyCondition, setBuyCondition] = useState('quantity')
  const [buyConditionValue, setBuyConditionValue] = useState('')
  const [buyAppliesTo, setBuyAppliesTo] = useState<'products' | 'collections'>('products')
  const [buyItems, setBuyItems] = useState<string[]>([])
  const [purchaseOptionBuy, setPurchaseOptionBuy] = useState('one-time')
  const [getAppliesTo, setGetAppliesTo] = useState<'products' | 'collections'>('products')
  const [getItems, setGetItems] = useState<string[]>([])
  const [purchaseOptionGet, setPurchaseOptionGet] = useState('one-time')
  const [getDiscountType, setGetDiscountType] = useState('free')
  const [getQuantity, setGetQuantity] = useState('1')
  const [combinations, setCombinations] = useState('product')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('draft')
  const [loading, setLoading] = useState(false)

  const getSourceList = (type: 'products' | 'collections') =>
    type === 'products' ? productOptions : collectionOptions

  const handleSubmit = () => {
    setLoading(true)
    const payload = {
      title,
      discountType,
      discountValue,
      buy: {
        condition: buyCondition,
        value: buyConditionValue,
        appliesTo: buyAppliesTo,
        items: buyItems,
        purchaseOption: purchaseOptionBuy
      },
      get: {
        appliesTo: getAppliesTo,
        items: getItems,
        purchaseOption: purchaseOptionGet,
        discountType: getDiscountType,
        quantity: getQuantity
      },
      combinations,
      schedule: { startDate, endDate },
      status
    }
    console.log(payload)
    setTimeout(() => {
      toast.success('✅ Discount saved (mock only)')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6 w-full text-black">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Buy X Get Y Discount</h1>
        <p className="text-sm text-muted-foreground">Set conditions for customers to get free or discounted items when they buy selected products.</p>
      </div>

      <SectionWrapper title="Discount method">
        <div className="grid gap-4">
          <div className="flex flex-col gap-1.5">
          <Select value={method} onValueChange={(val) => setMethod(val as 'automatic' | 'manual')}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Method" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual (Code)</SelectItem>
                </SelectContent>
            </Select>
            <CodeOrTitleInput method={method} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Discount type</Label>
              <Select value={discountType} onValueChange={setDiscountType}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Discount value</Label>
              <Input type="number" value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} placeholder="10" />
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Customer buys">
        <div className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Condition</Label>
              <Select value={buyCondition} onValueChange={setBuyCondition}>
                <SelectTrigger><SelectValue placeholder="Minimum..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="quantity">Minimum quantity</SelectItem>
                  <SelectItem value="amount">Minimum amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Value</Label>
              <Input value={buyConditionValue} onChange={(e) => setBuyConditionValue(e.target.value)} placeholder="e.g. 2" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Applies to</Label>
            <Select value={buyAppliesTo} onValueChange={(val) => setBuyAppliesTo(val as any)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="collections">Collections</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Combobox
            options={getSourceList(buyAppliesTo)}
            selected={buyItems}
            setSelected={setBuyItems}
            multi
            placeholder={`Search ${buyAppliesTo}`}
          />

          <div className="flex flex-col gap-1.5">
            <Label>Purchase option</Label>
            <Select value={purchaseOptionBuy} onValueChange={setPurchaseOptionBuy}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Customer gets">
        <div className="grid gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Applies to</Label>
            <Select value={getAppliesTo} onValueChange={(val) => setGetAppliesTo(val as any)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="collections">Collections</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Combobox
            options={getSourceList(getAppliesTo)}
            selected={getItems}
            setSelected={setGetItems}
            multi
            placeholder={`Search ${getAppliesTo}`}
            
          />

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Discount type</Label>
              <Select value={getDiscountType} onValueChange={setGetDiscountType}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="percentage">Percentage off</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Quantity</Label>
              <Input type="number" value={getQuantity} onChange={(e) => setGetQuantity(e.target.value)} placeholder="e.g. 1" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Purchase option</Label>
            <Select value={purchaseOptionGet} onValueChange={setPurchaseOptionGet}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="one-time">One-time</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Other settings">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Combinations</Label>
            <Select value={combinations} onValueChange={setCombinations}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {comboOptions.map((c) => (
                  <SelectItem key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Start date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>End date</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </SectionWrapper>

      <div className="pt-6">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save Discount'}
        </Button>
      </div>
    </div>
  )
}
