'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Bell, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { routes } from '@/lib/route'
import { ScrollArea } from '@/components/ui/scroll-area'
import MobileSidebar from '@/components/MobileSidebar' // ✅ IMPORTED MOBILE SIDEBAR

const navItems = [
  { name: 'Dashboard', href: '/super-admin' },
  { name: 'Products', href: '/super-admin/products' },
  { name: 'Orders', href: '/super-admin/orders' },
  { name: 'Customers', href: '/super-admin/customers' },
  { name: 'Discounts', href: '/super-admin/discounts' },
  { name: 'Plans', href: '/super-admin/plans' },
  { name: 'Integrations', href: '/super-admin/integrations' },
  { name: 'Settings', href: '/super-admin/settings' }
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
  { name: 'Back to Admin', href: '/super-admin' }
]

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isSettingsPage = pathname.startsWith('/super-admin/settings')

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-black border-r">
        <ScrollArea className="w-full h-full p-4">
          <Link href="/super-admin">
            <h2 className="text-xl font-bold mb-6 text-white">Admin.ai</h2>
          </Link>
          <nav className="space-y-2">
            {(isSettingsPage ? settingsLinks : navItems).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block text-sm font-medium px-3 py-2 rounded transition-colors',
                  pathname === item.href
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white/10'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-4 py-4 bg-black text-white shadow md:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <MobileSidebar />
            </div>
            <h1 className="text-lg font-semibold">Super Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white" />

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <UserCircle className="w-6 h-6 text-white cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/super-admin/settings/profile-settings">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/super-admin/settings/support">
                    Support Page
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/super-admin/settings/users-permissions">
                    Manage Clients
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>


        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted">{children}</div>
      </main>
    </div>
  )
}
