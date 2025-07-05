'use client'

import PlanSettingsForm from '@/components/PlanSettingsForm'

export default function PlanSettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Subscription Settings</h1>
      <PlanSettingsForm />
    </div>
  )
}
