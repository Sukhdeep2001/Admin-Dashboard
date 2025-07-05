// components/ResponsiveSettingsSidebar.tsx
'use client'

import SettingsSidebar from './SettingsSidebar'

export default function ResponsiveSettingsSidebar({ closeDrawer }: { closeDrawer?: () => void }) {
  return <SettingsSidebar closeDrawer={closeDrawer} />
}
