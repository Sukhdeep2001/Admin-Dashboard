'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MobileSidebar() {
  const pathname = usePathname()
  const isSettings = pathname.startsWith('/super-admin/settings')

  const navItems = [
    { name: 'Dashboard', href: '/super-admin' },
    { name: 'Products', href: '/super-admin/products' },
    { name: 'Orders', href: '/super-admin/orders' },
    { name: 'Customers', href: '/super-admin/customers' },
    { name: 'Discounts', href: '/super-admin/discounts' },
    { name: 'Plans', href: '/super-admin/plans' },
    { name: 'Integrations', href: '/super-admin/integrations' },
    { name: 'Settings', href: '/super-admin/settings' },
  ]

  const settingsLinks = [
    { name: 'Profile Settings', href: '/super-admin/settings/profile-settings' },
    { name: 'Payment Method', href: '/super-admin/settings/currency-payment' },
    { name: 'Plan', href: '/super-admin/settings/plan' },
    { name: 'Metafields', href: '/super-admin/settings/metafields' },
    { name: 'Shipping & Delivery', href: '/super-admin/settings/shipping-delivery' },
    { name: 'API Keys', href: '/super-admin/settings/api-keys' },
    { name: 'User Permissions', href: '/super-admin/settings/users-permissions' },
    { name: 'Locations', href: '/super-admin/settings/locations' },
    { name: 'Product Docs', href: '/super-admin/settings/product-docs' },
    { name: 'Support', href: '/super-admin/settings/support' },
  ]

  const activeMenu = isSettings ? settingsLinks : navItems

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 text-white md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-64 bg-black text-white border-none"
      >
        <ScrollArea className="h-full p-4">
          <h2 className="text-xl font-bold mb-6">
            {isSettings ? 'Settings' : 'Super Admin'}
          </h2>
          <nav className="space-y-2">
            {activeMenu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm font-medium rounded px-3 py-2 transition-colors ${
                  pathname === item.href
                    ? 'bg-white text-black'
                    : 'hover:bg-white/10 text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
