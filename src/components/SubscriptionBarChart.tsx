'use client'

import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

type SubscriptionChartData = {
  plan: string
  color: string
  subscriptions: string[]
}

type Props = {
  data: SubscriptionChartData[]
  height?: number
}

type ChartDatum = {
  date: string
  [plan: string]: string | number // dynamic keys for each plan
}

export default function SubscriptionTimeSeriesBarChart({ data, height = 420 }: Props) {
  // Unique sorted dates
  const allDatesSet = new Set<string>()
  data.forEach(plan => {
    plan.subscriptions.forEach(date => {
      allDatesSet.add(new Date(date).toISOString().split('T')[0])
    })
  })

  const allDates = Array.from(allDatesSet).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )

  // Construct chart data
  const chartData: ChartDatum[] = allDates.map(date => {
    const entry: ChartDatum = { date }
    data.forEach(plan => {
      const count = plan.subscriptions.filter(
        subDate => new Date(subDate).toISOString().split('T')[0] === date
      ).length
      entry[plan.plan] = count
    })
    return entry
  })

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={date =>
              new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }
            angle={-35}
            textAnchor="end"
            height={50}
            padding={{ left: 0, right: 5 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            allowDecimals={false}
            domain={[0, 'dataMax + 1']}
            width={30}
          />
          <Tooltip
            labelFormatter={label =>
              `Date: ${new Date(label as string).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}`
            }
          />
          {data.map(plan => (
            <Bar
              key={plan.plan}
              dataKey={plan.plan}
              stackId="subscriptions"
              fill={plan.color}
              barSize={80}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
