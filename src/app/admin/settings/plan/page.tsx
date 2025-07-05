'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import pricingPlans from '@/lib/pricingPlans.json'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export default function PricingPlans() {
  const router = useRouter()
  const [isYearly, setIsYearly] = useState(false)

  const handleSelect = (plan: any) => {
    const planId = plan.id
    router.push(`/admin/settings/checkout?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`)
  }

  return (
    <section className="p-6 space-y-6">
      <div className="flex items-center justify-center gap-4">
        <Label htmlFor="billing-toggle" className="text-lg font-semibold">
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={setIsYearly}
        />
        <Label htmlFor="billing-toggle" className="text-lg font-semibold">
          Yearly
        </Label>
      </div>

      <h2 className="text-3xl font-bold text-center">Choose Your Plan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice
          const pricePeriod = isYearly ? "/year" : "/month"

          return (
            <Card
              key={plan.id}
              className={`relative flex flex-col justify-between ${
                plan.isPopular ? 'border-blue-600' : ''
              }`}
            >
              {plan.isPopular && (
                <Badge className="absolute top-4 right-4 bg-blue-600 text-white">Popular</Badge>
              )}

              <CardHeader className="text-center space-y-1">
                <CardTitle className="text-xl">{plan.title}</CardTitle>

                <div className="min-h-[32px] text-2xl font-semibold">
                  {price}
                </div>
                <div className="text-muted-foreground text-sm min-h-[20px]">
                  {pricePeriod}
                </div>

                <p className="text-sm text-muted-foreground min-h-[48px]">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="flex flex-col justify-start gap-4 h-full">
                <div className="text-center">
                  <Button
                    onClick={() => handleSelect(plan)}
                    className={`w-full ${
                      plan.id === 'basic' || plan.id === 'enterprise'
                        ? 'bg-black text-white hover:bg-black/90'
                        : ''
                    }`}
                    variant={
                      plan.id === 'basic' || plan.id === 'enterprise'
                        ? 'default'
                        : plan.isPopular
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {plan.buttonText}
                  </Button>
                </div>

                <ul className="text-sm space-y-1 mt-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span>{feature.icon}</span>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
