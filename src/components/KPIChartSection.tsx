'use client'

import { ResponsiveBar } from '@nivo/bar'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveLine } from '@nivo/line'

export default function KPIChartSection({ label, value }: { label: string; value: number }) {
  const barData = [{ kpi: label, value }]
  const pieData = [{ id: label, label, value }]

  const lineData = [
    {
      id: label,
      data: [
        { x: 'Day 1', y: value },
        { x: 'Day 2', y: value * 0.9 },
        { x: 'Day 3', y: value * 1.1 },
      ],
    },
  ]

  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-lg font-semibold">{label} (Bar)</h2>
      <div className="h-[600px] bg-white rounded shadow p-4">
        <ResponsiveBar
          data={barData}
          keys={['value']}
          indexBy="kpi"
          margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
          colors={{ scheme: 'category10' }}
        />
      </div>

      <h2 className="text-lg font-semibold">{label} (Pie)</h2>
      <div className="h-[600px] bg-white rounded shadow p-4">
        <ResponsivePie
          data={pieData}
          margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
        />
      </div>

      <h2 className="text-lg font-semibold">{label} (Line)</h2>
      <div className="h-[600px] bg-white rounded shadow p-4">
        <ResponsiveLine
          data={lineData}
          margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false }}
          useMesh
          pointSize={10}
          colors={{ scheme: 'nivo' }}
        />
      </div>
    </div>
  )
}
