import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
