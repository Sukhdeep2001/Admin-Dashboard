'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ✅ ADDED INTERFACE FOR PROPS
interface SidebarProps {
  closeDrawer?: () => void
}

const navItems = [
  { name: 'Dashboard', href: '/admin' },
  {
    name: 'Orders',
    href: '/admin/orders',
    children: [
      { name: 'Draft', href: '/admin/orders/draft' },
      { name: 'Abandoned', href: '/admin/orders/abandoned' },
      { name: 'Labels', href: '/admin/orders/labels' },
    ],
  },
  {
    name: 'Products',
    href: '/admin/products',
    children: [
      { name: 'Add Product', href: '/admin/products/add' },
      {
        name: 'Collections',
        href: '/admin/products/collections',
        children: [
          { name: 'Add Collection', href: '/admin/products/collections/add' },
        ],
      },
      { name: 'Inventory', href: '/admin/products/inventory' },
      {
        name: 'Gift Cards',
        href: '/admin/products/gift-cards',
        children: [
          { name: 'Add Gift Card', href: '/admin/products/gift-cards/add' },
        ],
      },
    ],
  },
  {
    name: 'Content',
    href: '/admin/content',
    children: [
      { name: 'Blogs', href: '/admin/content/blogs' },
      { name: 'Blog Post', href: '/admin/content/blogs/blog-post' },
      { name: 'Blog Type', href: '/admin/content/blogs/blog-type' },
      {
        name: 'Menu',
        href: '/admin/content/menus',
        children: [
          { name: 'Add Menu', href: '/admin/content/menus/add' },
        ],
      },
      { name: 'Upload', href: '/admin/content/upload' },
    ],
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    children: [
      { name: 'Segments', href: '/admin/customers/segments' },
      { name: 'Company', href: '/admin/customers/company' },
    ],
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    children: [
      { name: 'Reports', href: '/admin/analytics/reports' },
      { name: 'Integrations', href: '/admin/analytics/integrations' },
    ],
  },
  {
    name: 'Discounts',
    href: '/admin/discounts',
    children: [
      {
        name: 'Amount Off Products',
        href: '/admin/discounts/amount-off-products',
      },
      {
        name: 'Amount Off Order',
        href: '/admin/discounts/amount-off-order',
      },
      {
        name: 'Buy X Get Y',
        href: '/admin/discounts/buyxgety',
      },
    ],
  },
  { name: 'Settings', href: '/admin/settings' },
]

// ✅ ADDED closeDrawer PROP HERE
export default function Sidebar({ closeDrawer }: SidebarProps) {
  const pathname = usePathname()
  const [openParent, setOpenParent] = useState<string | null>('Orders')
  const [openChild, setOpenChild] = useState<string | null>(null)

  const toggleParent = (name: string) => {
    setOpenParent(prev => (prev === name ? null : name))
    setOpenChild(null)
  }

  const toggleChild = (name: string) => {
    setOpenChild(prev => (prev === name ? null : name))
  }

  const renderChildren = (children: any[]) =>
    children.map(child => {
      const isActive = pathname === child.href
      const hasSubChildren = !!child.children

      return (
        <div key={child.href || child.name} className="ml-4">
          <div className="flex items-center justify-between">
            <Link
              href={child.href}
              onClick={closeDrawer} // ✅ ADD
              className={cn(
                'block px-3 py-1 rounded-md text-sm',
                isActive
                  ? 'bg-white text-black font-semibold'
                  : 'hover:bg-white/10 text-white'
              )}
            >
              {child.name}
            </Link>
            {hasSubChildren && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleChild(child.name)}
                className="w-6 h-6 p-0 ml-1 text-white"
              >
                {openChild === child.name ? <Minus size={14} /> : <Plus size={14} />}
              </Button>
            )}
          </div>
          {hasSubChildren && openChild === child.name && (
            <div className="ml-4 mt-1 space-y-1">{renderChildren(child.children)}</div>
          )}
        </div>
      )
    })

  return (
    <aside className="lg:block md:hidden w-64 bg-black text-white h-screen border-r border-white/10 p-4">
      <Link href="/admin" className="hover:underline,text-decoration:none">
        <div className="text-xl font-semibold mb-6 flex items-center gap-2">
          Admin.ai
        </div>
      </Link>
      <ScrollArea className="h-[calc(100vh-80px)] pr-2">
        <nav className="space-y-2">
          {navItems.map(item => {
            const isExact = pathname === item.href
            const isChildActive = item.children?.some((child: any) =>
              pathname.startsWith(child.href)
            )
            const isActive = isExact || isChildActive

            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeDrawer} // ✅ ADD
                  className={cn(
                    'block px-4 py-2 rounded-md text-sm font-medium',
                    isActive
                      ? 'bg-white text-black font-semibold'
                      : 'hover:bg-white/10 text-white'
                  )}
                >
                  {item.name}
                </Link>
              )
            }

            return (
              <div key={item.name}>
                <div className="flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10">
                  <Link
                    href={item.href}
                    onClick={closeDrawer} // ✅ ADD
                    className="flex-1 text-white"
                  >
                    {item.name}
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleParent(item.name)}
                    className="w-6 h-6 p-0 ml-1 text-white"
                  >
                    {openParent === item.name ? <Minus size={16} /> : <Plus size={16} />}
                  </Button>
                </div>
                {openParent === item.name && (
                  <div className="ml-4 mt-1 space-y-1">{renderChildren(item.children)}</div>
                )}
              </div>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
