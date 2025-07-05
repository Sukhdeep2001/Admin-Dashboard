'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import settings from '@/lib/settings-options.json'
import {
  User,
  ShoppingCart,
  Shield,
  Badge,
  LifeBuoy,
  MapPin,
  Truck,
  Layers,
  Key,
  Activity,
  FileText,
  ArrowLeft,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ✅ Accept closeDrawer prop
interface Props {
  closeDrawer?: () => void
}

const iconMap = {
  user: User,
  'shopping-cart': ShoppingCart,
  shield: Shield,
  badge: Badge,
  'life-buoy': LifeBuoy,
  'map-pin': MapPin,
  truck: Truck,
  layers: Layers,
  key: Key,
  activity: Activity,
  'file-text': FileText,
  'arrow-left': ArrowLeft,
  settings: Settings,
}

export default function SettingsSidebar({ closeDrawer }: Props) {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r h-full p-4 bg-black text-white">
      <nav className="space-y-2 pt-6">
        {settings.map((item, idx) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Settings
          const href = item.slug === '..' ? '/admin' : `/admin/settings/${item.slug}`
          const active =
            pathname === `/admin/settings/${item.slug}` ||
            (item.slug === '' && pathname === '/admin/settings')

          return (
            <Link
              key={idx}
              href={href}
              onClick={closeDrawer} // ✅ Support closing drawer on mobile
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium',
                active ? 'bg-white text-black' : 'text-white hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
