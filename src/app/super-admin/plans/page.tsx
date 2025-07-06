'use client'

import { useState, useEffect } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlanModal } from '@/components/PlanModal'
import { Button } from '@/components/ui/button'
import { Plan } from '@/lib/plan'

export default function PlansCatalogPage() {
  const [plans, setPlans] = useState<Plan[]>([])

  useEffect(() => {
    fetch('/api/plans')
      .then(res => res.json())
      .then((data: Plan[]) => {
        const unique = Array.from(new Map(data.map(p => [p.id, p])).values())
        setPlans(unique)
      })
      .catch(err => console.error('Failed to load plans catalog:', err))
  }, [])

  const activePlans = plans.filter(p => p.visibility && !p.archived)
  const hiddenPlans = plans.filter(p => !p.visibility && !p.archived)
  const archivedPlans = plans.filter(p => p.archived)

  const renderPlanCard = (plan: Plan) => (
    <Card key={plan.id} className="border rounded-xl shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{plan.title}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          {plan.trial.enabled && (
            <Badge className="bg-green-500 text-white">
              Trial {plan.trial.durationDays}d
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p>
          <strong>Monthly:</strong> ${plan.monthlyPrice} /{' '}
          <strong>Yearly:</strong> ${plan.yearlyPrice}
        </p>
        <p>
          <strong>Users:</strong> {plan.features.maxUsers},{' '}
          <strong>Storage:</strong> {plan.features.storageLimit}
        </p>
        <p>
          <strong>API:</strong> {plan.limits.apiCallsPerMonth} calls/mo
        </p>
        <p>
          SSO:{' '}
          <span
            className={plan.features.enableSSO ? 'text-green-600' : 'text-red-500'}
          >
            {plan.features.enableSSO ? 'Yes' : 'No'}
          </span>{' '}
          | Priority Support:{' '}
          <span
            className={
              plan.features.prioritySupport ? 'text-green-600' : 'text-red-500'
            }
          >
            {plan.features.prioritySupport ? 'Yes' : 'No'}
          </span>
        </p>

        {/* ✅ Key fix: ensure correct props to PlanModal */}
        <PlanModal
          {...({
            mode: 'edit',
            initialData: plan,
            onSave: (updatedPlan: Plan) =>
              setPlans(prev =>
                prev.map(p => (p.id === updatedPlan.id ? updatedPlan : p))
              )
          } as const)}
        />
      </CardContent>
    </Card>
  )

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Manage Subscription Plans</h1>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="hidden">Hidden</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activePlans.length
              ? activePlans.map(renderPlanCard)
              : <p>No active plans found.</p>}
          </div>
        </TabsContent>

        <TabsContent value="hidden">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hiddenPlans.length
              ? hiddenPlans.map(renderPlanCard)
              : <p>No hidden plans.</p>}
          </div>
        </TabsContent>

        <TabsContent value="archived">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {archivedPlans.length
              ? archivedPlans.map(renderPlanCard)
              : <p>No archived plans.</p>}
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-right">
      <PlanModal
        {...({
          mode: 'add',
          onSave: (newPlan: Plan) => setPlans(prev => [...prev, newPlan])
        } as const)}
      />
      </div>
    </section>
  )
}
