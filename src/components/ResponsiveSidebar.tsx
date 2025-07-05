'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import ResponsiveSettingsSidebar from './ResponsiveSettingsSidebar'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function ResponsiveSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isSettingsPage = pathname.startsWith('/admin/settings') // ✅ Key logic

  return (
    <>
      {/* Topbar with Hamburger (Mobile) */}
      <div className="lg:hidden flex justify-between bg-black text-white lg:px-4 lg:py-3 border-b border-white/10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white px-0">
              <Menu />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="fixed left-0 top-0 w-64 h-screen bg-black text-white p-0 m-0 rounded-none border-none shadow-xl data-[state=open]:animate-slideIn z-50"
          >
            <DialogTitle asChild>
              <VisuallyHidden>Sidebar navigation</VisuallyHidden>
            </DialogTitle>

            {/* ✅ Show settings sidebar if on settings page */}
            {isSettingsPage ? (
              <ResponsiveSettingsSidebar closeDrawer={() => setOpen(false)} />
            ) : (
              <Sidebar closeDrawer={() => setOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Sidebar (lg and up) */}
      <div className="hidden lg:block">
        {isSettingsPage ? (
          <ResponsiveSettingsSidebar />
        ) : (
          <Sidebar />
        )}
      </div>
    </>
  )
}
