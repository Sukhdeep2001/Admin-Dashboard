'use client'

import { useEffect, useState } from 'react'
import ChartSection from '@/components/ChartSection'
import PieChartSection from '@/components/PieChartSection'
import BarChartSection from '@/components/BarChartSection'
import DateRangeFilter from '@/components/DateRangePicker'
import KPIChartSection from '@/components/KPIChartSection'

type AnalyticsData = {
  grossSales: string
  returningCustomerRate: string
  ordersFulfilled: string
  orders: string
  salesTimeline: string[]
  salesComparisonDate: string[]
  salesSpikeTime: string
  totalSalesByProduct: {
    product: string
    tags: string
    sales: string
  }
  salesBreakdown: Record<string, string>
  salesByChannel: Record<string, string>
  averageOrderValue: string
  conversionMetrics: {
    conversionRate: string
    sessions: string
    addedToCart: string
    reachedCheckout: string
    completed: string
  }
  sessions: {
    overTime: string
    byDevice: string
    byLocation: {
      location: string
      sessions: string
    }
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analytics')
      .then((res) => res.json())
      .then(setData)
  }, [])

  if (!data) return <p className="p-6 text-gray-600">Loading...</p>

  const allKPIValues = [
    { label: 'Gross Sales', value: parseFloat(data?.grossSales?.replace(/[₹,%↓↑]/g, '') ?? '0') },
    { label: 'Returning Customer Rate', value: parseFloat(data?.returningCustomerRate?.replace('%', '') ?? '0') },
    { label: 'Orders Fulfilled', value: parseFloat(data?.ordersFulfilled?.replace(/[↓↑%]/g, '') ?? '0') },
    { label: 'Orders', value: parseFloat(data?.orders?.replace(/[↓↑%]/g, '') ?? '0') },
    { label: 'Average Order Value', value: parseFloat(data?.averageOrderValue?.replace(/[₹,%↓↑]/g, '') ?? '0') },
    { label: 'Conversion Rate', value: parseFloat(data?.conversionMetrics?.conversionRate?.replace('%', '') ?? '0') },
    { label: 'Sessions', value: parseFloat(data?.conversionMetrics?.sessions?.replace(/[↓↑%]/g, '') ?? '0') },
    { label: 'Added to Cart', value: parseFloat(data?.conversionMetrics?.addedToCart?.replace('%', '') ?? '0') },
    { label: 'Reached Checkout', value: parseFloat(data?.conversionMetrics?.reachedCheckout?.replace('%', '') ?? '0') },
    { label: 'Completed', value: parseFloat(data?.conversionMetrics?.completed?.replace('%', '') ?? '0') },
  ]

  const allKPIObject: Record<string, string> = {
    'Gross Sales': data?.grossSales?.replace(/[₹,%↓↑]/g, '') ?? '0',
    'Returning Customer Rate': data?.returningCustomerRate?.replace('%', '') ?? '0',
    'Orders Fulfilled': data?.ordersFulfilled?.replace(/[↓↑%]/g, '') ?? '0',
    'Orders': data?.orders?.replace(/[↓↑%]/g, '') ?? '0',
    'Average Order Value': data?.averageOrderValue?.replace(/[₹,%↓↑]/g, '') ?? '0',
    'Conversion Rate': data?.conversionMetrics?.conversionRate?.replace('%', '') ?? '0',
    'Sessions': data?.conversionMetrics?.sessions?.replace(/[↓↑%]/g, '') ?? '0',
    'Added to Cart': data?.conversionMetrics?.addedToCart?.replace('%', '') ?? '0',
    'Reached Checkout': data?.conversionMetrics?.reachedCheckout?.replace('%', '') ?? '0',
    'Completed': data?.conversionMetrics?.completed?.replace('%', '') ?? '0',
  }

  const getRawValue = (label: string) =>
    ({
      'Gross Sales': data.grossSales,
      'Returning Customer Rate': data.returningCustomerRate,
      'Orders Fulfilled': data.ordersFulfilled,
      'Orders': data.orders,
      'Average Order Value': data.averageOrderValue,
      'Conversion Rate': data.conversionMetrics.conversionRate,
      'Sessions': data.conversionMetrics.sessions,
      'Added to Cart': data.conversionMetrics.addedToCart,
      'Reached Checkout': data.conversionMetrics.reachedCheckout,
      'Completed': data.conversionMetrics.completed,
    }[label] || '0')

  return (
    <div className="md:p-6 space-y-8 text-sm text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <DateRangeFilter onDateChange={(range) => console.log('Selected range:', range)} />
      </div>

      {/* KPI Top Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {['Gross Sales', 'Returning Customer Rate', 'Orders Fulfilled', 'Orders'].map((label) => (
          <Stat
            key={label}
            label={label}
            value={getRawValue(label)}
            isActive={activeFilter === label}
            onClick={() => setActiveFilter(activeFilter === label ? null : label)}
          />
        ))}
      </section>

      {/* Other KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(getRawValue).map(([label]) => (
          <Stat
            key={label}
            label={label}
            value={getRawValue(label)}
            onClick={() => {}}
            isActive={false}
          />
        ))}
      </section>

      {/* Charts */}
      {activeFilter ? (
        <div className="space-y-6">
          <BarChartSection
            title={`Bar Chart - ${activeFilter}`}
            data={[{ label: activeFilter, value: parseFloat(allKPIObject[activeFilter] || '0') }]}
          />
          <PieChartSection
            title={`Pie Chart - ${activeFilter}`}
            data={{ [activeFilter]: allKPIObject[activeFilter] || '0' }}
          />
          <ChartSection
            timeline={[allKPIObject[activeFilter] || '0', '0', '0', '0']}
            comparison={['10', '20', '30', '40']}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {allKPIValues.map((kpi) => (
            <KPIChartSection key={kpi.label} label={kpi.label} value={kpi.value} />
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  onClick,
  isActive,
}: {
  label: string
  value: string
  onClick: () => void
  isActive: boolean
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded cursor-pointer shadow transition-all duration-200 ${
        isActive ? 'bg-blue-100 border border-blue-400' : 'bg-white'
      } text-left sm:text-center`}
    >
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  )
}
