// app/admin/settings/page.tsx
import { redirect } from 'next/navigation'

export default function SettingsRootPage() {
  redirect('/admin/settings/profile')
  return null // still needed to satisfy type, though this won't render
}
