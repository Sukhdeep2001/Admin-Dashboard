'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Users, CreditCard, KeyRound } from "lucide-react"
import BarChartSection from "@/components/BarChartSection"

const stats = [
  {
    label: "Total Clients",
    value: 128,
    icon: Users,
  },
  {
    label: "Monthly Revenue",
    value: "$3,420",
    icon: CreditCard,
  },
  {
    label: "Active Plans",
    value: 3,
    icon: BarChart,
  },
  {
    label: "API Keys Issued",
    value: 85,
    icon: KeyRound,
  },
]
const chartTitle = "Revenue Over Time"
const chartData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1800 },
  { label: "Mar", value: 2400 },
  { label: "Apr", value: 2000 },
  { label: "May", value: 3200 },
]


export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
        <BarChartSection title={chartTitle} data={chartData} />

      {/* Recent Signups Table (Placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Signups</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="py-2">Client</th>
                <th className="py-2">Email</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">Ashwin K</td>
                <td className="py-2">ashwin@example.com</td>
                <td className="py-2">Pro ($29)</td>
                <td className="py-2">Jun 12, 2025</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Lena J</td>
                <td className="py-2">lena@example.com</td>
                <td className="py-2">Basic ($19)</td>
                <td className="py-2">Jun 28, 2025</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
