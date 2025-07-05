'use client'

import { ReactNode } from "react"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex min-h-screen bg-muted">
      {/* Main content with padding */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}