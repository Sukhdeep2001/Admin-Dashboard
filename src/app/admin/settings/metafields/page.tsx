'use client'

import { Card, CardContent } from '@/components/ui/card'

export default function MetafieldsPage() {
  return (
    <div className="text-black">
      <h1 className="text-2xl font-bold mb-6">Metafields</h1>

      <Card className="border-dashed border-2 border-gray-300 bg-gray-50 text-center">
        <CardContent className="p-6 space-y-2">
          <p className="text-lg">🔧 This feature is not available yet.</p>
          <p className="text-gray-600">Stay tuned — we'll be launching this feature soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
