'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PolicyForm({ title }: { title: string }) {
  const [policyText, setPolicyText] = useState('')

  return (
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
      <div className="text-left">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Add detailed information about your {title.toLowerCase()}.
        </p>
      </div>

      <Card className="border border-gray-200 shadow-sm gap-0 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">
            Policy Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="policy" className="text-sm text-gray-600">
              Write your policy details
            </Label>
            <Textarea
              id="policy"
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              placeholder="e.g. Our return policy lasts 30 days..."
              rows={12}
              className="resize-none border border-gray-300 focus:border-black focus:ring-1 focus:ring-black rounded-lg bg-gray-50 text-sm transition-all"
            />
          </div>
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button className="px-6">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
